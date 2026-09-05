/**
 * ElevenLabs Ultra-Realistic Voice Service with Studio DSP Processing & Neural Browser Fallback
 */

const ELEVEN_API_KEY = (typeof localStorage !== 'undefined' ? localStorage.getItem('doap_elevenlabs_key') : '') ||
                       'sk_49242a8b562bd43cd0c8ff30db444b69216a64c89ef7d3d2' ||
                       (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_ELEVENLABS_KEY) ||
                       'sk_5f91a262d00d2924db057bf3fd48a71b8857415c268c9452';

/// Official ElevenLabs Studio Voices configured for DOAP AI Voice Engine
export const ELEVEN_VOICES = {
  charon: { id: 'pNInz6obpgDQGcFmaJgB', name: 'Charon (Deep, Calm & Resonant Studio Voice)' },
  doap: { id: 'pNInz6obpgDQGcFmaJgB', name: 'DOAP AI Charon (Warm, Articulate & Resonant)' },
  studio: { id: 'pNInz6obpgDQGcFmaJgB', name: 'Charon Studio HD' },
  conversational: { id: 'ErXwobaYiN019PkySvjV', name: 'DOAP AI Natural Tutor (Warm & Empathetic)' },
  antoni: { id: 'ErXwobaYiN019PkySvjV', name: 'DOAP AI Conversational' },
  fenrir: { id: 'TX3LPaxmHKxFdv7VOQHJ', name: 'DOAP AI Technical' },
  kore: { id: 'Xb7hH8MSUJpSbSDYk0k2', name: 'DOAP AI Empathetic' },
  brian: { id: 'nPczCjzI2devNBz1zQrb', name: 'DOAP AI Academic Mentor' }
};

let sharedAudioCtx = null;
let currentSource = null;
let currentAudioElement = null;
let currentUtterance = null;
let isAudioCancelled = false;

export function unlockAudioContext() {
  if (typeof window === 'undefined') return;
  const AudioCtx = window.AudioContext || window.webkitAudioContext;
  if (!AudioCtx) return;
  if (!sharedAudioCtx) {
    sharedAudioCtx = new AudioCtx();
  }
  if (sharedAudioCtx.state === 'suspended') {
    sharedAudioCtx.resume().catch(() => {});
  }
}

export function stopElevenLabsAudio() {
  isAudioCancelled = true;
  if (currentAudioElement) {
    try {
      currentAudioElement.pause();
      currentAudioElement.currentTime = 0;
      currentAudioElement.src = '';
    } catch (e) {}
    currentAudioElement = null;
  }
  if (currentSource) {
    try {
      currentSource.stop();
      currentSource.disconnect();
    } catch (e) {}
    currentSource = null;
  }
  if (typeof window !== 'undefined' && window.speechSynthesis) {
    try {
      window.speechSynthesis.cancel();
    } catch (e) {}
  }
  currentUtterance = null;
  if (typeof window !== 'undefined') window._doapActiveUtterance = null;
}

/**
 * Intelligent Neural Voice Selector for Browser SpeechSynthesis
 * Prioritizes Authentic Indian English & Hindi Natural & Neural Voices (Edge Neerja/Prabhat, Swara, Google English India, Google Hindi)
 * Strictly excludes legacy Windows SAPI5 robotic voices (Microsoft Ravi, Heera).
 */
export function getBestNaturalVoice(synth, mode = 'indian') {
  if (!synth) return null;
  const voices = synth.getVoices ? synth.getVoices() : [];
  if (!voices || voices.length === 0) return null;

  // Strict check: exclude robotic, low-quality desktop/SAPI5 synthesizers
  const isRobotic = (name) => {
    const n = (name || '').toLowerCase();
    return (
      n.includes('ravi') || 
      n.includes('heera') || 
      n.includes('desktop') || 
      n.includes('sapi') || 
      n.includes('espeak') ||
      n.includes('sam')
    );
  };

  // 1. Prioritize authentic Indian English / Hindi Neural Voices
  const indianNaturalVoice = voices.find(v => {
    const name = (v.name || '').toLowerCase();
    const lang = (v.lang || '').toLowerCase().replace('_', '-');
    const isIndian = lang === 'en-in' || lang === 'hi-in' || 
                     name.includes('india') || name.includes('neerja') || 
                     name.includes('prabhat') || name.includes('swara') || 
                     name.includes('madhur') || name.includes('rishi') ||
                     name.includes('lekha') || name.includes('हिन्दी') ||
                     name.includes('hindi');
    return isIndian && !isRobotic(name);
  });
  if (indianNaturalVoice) return indianNaturalVoice;

  // 2. High-Quality Natural Online Voices (Edge / Chrome Natural)
  const naturalOnline = voices.find(v => 
    (v.name.includes('Online (Natural)') || v.name.includes('Natural')) &&
    !isRobotic(v.name)
  );
  if (naturalOnline) return naturalOnline;

  // 3. Google High-Quality Voices (Chrome)
  const googleVoice = voices.find(v => 
    (v.name.includes('Google') && (v.lang || '').startsWith('en')) &&
    !isRobotic(v.name)
  );
  if (googleVoice) return googleVoice;

  // 4. Any clean non-robotic English voice
  const cleanEnglish = voices.find(v => 
    (v.lang || '').toLowerCase().startsWith('en') && 
    !isRobotic(v.name)
  );
  if (cleanEnglish) return cleanEnglish;

  return null;
}

/**
 * Advanced Humanoid Phonetic Normalizer for AI Voice Engines
 * Transforms acronyms, Big-O notations, CamelCase identifiers, code syntax,
 * and Indian regional proper nouns into warm, lifelike spoken English.
 */
export function humanizeTextForSpeech(rawText) {
  if (!rawText) return '';

  let text = String(rawText);

  // 1. Strip <think> reasoning blocks, <details>, markdown code blocks, links, and formatting symbols
  text = text
    .replace(/<think>[\s\S]*?<\/think>/gi, '')
    .replace(/<details[\s\S]*?<\/details>/gi, '')
    .replace(/\*\*Reasoning\*\*[\s\S]*?\*\*Final Answer\*\*/i, '')
    .replace(/```[\s\S]*?```/g, ' I have shared the code on your screen. ')
    .replace(/`([^`]+)`/g, ' $1 ')
    .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1') // [link text](url) -> link text
    .replace(/https?:\/\/\S+/gi, ' the shared link ')
    .replace(/[*#~_>|]/g, ' ');

  // 2. Normalize numbered lists so TTS does not speak "one dot, two dot"
  text = text.replace(/(?:^|\n)\s*(\d+)\.\s+/g, ', Step $1, ');

  // 3. Normalize programming operators into spoken conversational phrases
  text = text
    .replace(/!==?/g, ' is not equal to ')
    .replace(/===?/g, ' equals ')
    .replace(/<=/g, ' is less than or equal to ')
    .replace(/>=/g, ' is greater than or equal to ')
    .replace(/=>|->/g, ' leads to ')
    .replace(/&&/g, ' and ')
    .replace(/\|\|/g, ' or ')
    .replace(/\+\+/g, ' plus plus ')
    .replace(/--/g, ' minus minus ');

  // 4. Normalize Big-O notation into conversational spoken English
  text = text.replace(/\bO\s*\(\s*([^)]+)\s*\)/gi, (match, inner) => {
    let spoken = inner.trim();
    spoken = spoken.replace(/^1$/i, 'one');
    spoken = spoken.replace(/\b(n)\b/gi, 'N');
    spoken = spoken.replace(/\blog\s*n\b/gi, 'log N');
    spoken = spoken.replace(/\bn\s*\*\s*log\s*n\b/gi, 'N log N');
    spoken = spoken.replace(/\bn\s+log\s+n\b/gi, 'N log N');
    spoken = spoken.replace(/n\^2/gi, 'N squared');
    spoken = spoken.replace(/n\^3/gi, 'N cubed');
    spoken = spoken.replace(/2\^n/gi, 'two to the power of N');
    spoken = spoken.replace(/n!/gi, 'N factorial');
    return `O of ${spoken}`;
  });

  // 5. Split camelCase and PascalCase code identifiers so TTS doesn't slur them together
  text = text.replace(/([a-z0-9])([A-Z][a-z])/g, '$1 $2');

  // 6. Split snake_case identifiers
  text = text.replace(/([a-zA-Z0-9])_([a-zA-Z0-9])/g, '$1 $2');

  // 7. Common abbreviations
  text = text
    .replace(/\be\.g\.,?\s*/gi, 'for example, ')
    .replace(/\bi\.e\.,?\s*/gi, 'that is, ')
    .replace(/\betc\.\b/gi, 'etcetera')
    .replace(/\bvs\.\b|\bvs\b/gi, 'versus')
    .replace(/\bw\/o\b/gi, 'without')
    .replace(/\bw\/\b/gi, 'with')
    .replace(/\baka\b/gi, 'also known as');

  // 8. Sanjivani University & Regional Indian Proper Nouns (Phonetic spelling for natural English neural voices)
  text = text
    .replace(/\bSanjivani\b/gi, 'Sanjeevani')
    .replace(/\bKopargaon\b/gi, 'Kopar-gaon')
    .replace(/\bNitindada\b/gi, 'Nitin-dada')
    .replace(/\bKolhe\b/gi, 'Kol-hay')
    .replace(/\bSaheb\b/gi, 'Sahab')
    .replace(/\bShri\b/gi, 'Shree');

  // 9. Tech Acronyms & Terms phonetically tuned for zero robotic stutter
  const techReplacements = [
    [/\bHTML5\b/gi, 'H-T-M-L five'],
    [/\bCSS3\b/gi, 'C-S-S three'],
    [/\bES6\b/gi, 'E-S six'],
    [/\bnpm\b/gi, 'N-P-M'],
    [/\basync\/await\b/gi, 'async await'],
    [/\bSQL\b/g, 'S-Q-L'],
    [/\bNoSQL\b/g, 'No S-Q-L'],
    [/\bPostgreSQL\b/gi, 'Postgres Q-L'],
    [/\bMySQL\b/gi, 'My S-Q-L'],
    [/\bSQLite\b/gi, 'S-Q-Lite'],
    [/\bAPI\b/g, 'A-P-I'],
    [/\bAPIs\b/g, 'A-P-Is'],
    [/\bRESTful\b/gi, 'Rest-ful'],
    [/\bREST\s+API\b/gi, 'Rest A-P-I'],
    [/\bLLM\b/g, 'L-L-M'],
    [/\bLLMs\b/g, 'L-L-Ms'],
    [/\bAI\b/g, 'A-I'],
    [/\bML\b/g, 'M-L'],
    [/\bDSA\b/g, 'D-S-A'],
    [/\bDFS\b/g, 'D-F-S'],
    [/\bBFS\b/g, 'B-F-S'],
    [/\bDBMS\b/g, 'D-B-M-S'],
    [/\bRDBMS\b/g, 'R-D-B-M-S'],
    [/\bHTML\b/g, 'H-T-M-L'],
    [/\bCSS\b/g, 'C-S-S'],
    [/\bJSON\b/gi, 'Jason'],
    [/\bNode\.js\b/gi, 'Node J-S'],
    [/\bReact\.js\b/gi, 'React'],
    [/\bVue\.js\b/gi, 'Vue'],
    [/\bNext\.js\b/gi, 'Next J-S'],
    [/\bC\+\+\b/g, 'C plus plus'],
    [/\bC#\b/g, 'C sharp'],
    [/\bF#\b/g, 'F sharp'],
    [/\bSDK\b/g, 'S-D-K'],
    [/\bSDKs\b/g, 'S-D-Ks'],
    [/\bCLI\b/g, 'C-L-I'],
    [/\bGUI\b/gi, 'gooey'],
    [/\bUI\b/g, 'U-I'],
    [/\bUX\b/g, 'U-X'],
    [/\bJWT\b/g, 'J-W-T'],
    [/\bHTTP\b/g, 'H-T-T-P'],
    [/\bHTTPS\b/g, 'H-T-T-P-S'],
    [/\bURL\b/g, 'U-R-L'],
    [/\bURLs\b/g, 'U-R-Ls'],
    [/\bURI\b/g, 'U-R-I'],
    [/\bDOM\b/g, 'Dom'],
    [/\bCPU\b/g, 'C-P-U'],
    [/\bGPU\b/g, 'G-P-U'],
    [/\bRAM\b/g, 'Ram'],
    [/\bROM\b/g, 'Rom'],
    [/\bOS\b/g, 'O-S'],
    [/\bAWS\b/g, 'A-W-S'],
    [/\bGCP\b/g, 'G-C-P'],
    [/\bCI\/CD\b/gi, 'C-I C-D'],
    [/\bPR\b/g, 'pull request'],
    [/\bPRs\b/g, 'pull requests'],
    [/\bOOP\b/g, 'Object Oriented Programming'],
    [/\bOOPs\b/g, 'Object Oriented Programming'],
    [/\bIIC\b/g, 'I-I-C']
  ];

  for (const [pattern, replacement] of techReplacements) {
    text = text.replace(pattern, replacement);
  }

  // 9.5. Hinglish & Conversational Indian Phonetic Normalization
  // Ensures Hindi words written in English (Hinglish) and Indian phrases are pronounced with native clarity
  const hinglishReplacements = [
    [/\bsamjhe\s*kya\b/gi, 'samjhay kya'],
    [/\bsamjhe\b/gi, 'samjhay'],
    [/\bsamjha\b/gi, 'samjhaa'],
    [/\bkaise\s*ho\b/gi, 'kaisay ho'],
    [/\bkaise\b/gi, 'kaisay'],
    [/\bkya\s*haal\s*chaal\b/gi, 'kya haal chaal'],
    [/\bshuru\s*karte\s*hain\b/gi, 'shuru kartay hain'],
    [/\bshuru\s*karein\b/gi, 'shuru karein'],
    [/\bkarte\b/gi, 'kartay'],
    [/\bkarenge\b/gi, 'karengay'],
    [/\bseekhenge\b/gi, 'seekhengay'],
    [/\bpadhai\b/gi, 'padhaayee'],
    [/\bpehle\b/gi, 'pehlay'],
    [/\bsabse\s*pehle\b/gi, 'sabsay pehlay'],
    [/\bsabse\b/gi, 'sabsay'],
    [/\baccha\b|\bachha\b|\bacha\b/gi, 'achha'],
    [/\barre\b|\bare\b/gi, 'arey'],
    [/\btheek\s*hai\b|\bthik\s*hai\b/gi, 'theek hai'],
    [/\bhota\s*hai\b/gi, 'hotaa hai'],
    [/\btension\s*mat\s*lo\b/gi, 'tension mat lo'],
    [/\bchalo\b/gi, 'chalo'],
    [/\bbatao\b/gi, 'bataao'],
    [/\bdekho\b/gi, 'dekho'],
    [/\bsuno\b/gi, 'suno'],
    [/\bbilkul\b/gi, 'bilkul'],
    [/\bzaroor\b/gi, 'zaroor']
  ];

  for (const [pat, rep] of hinglishReplacements) {
    text = text.replace(pat, rep);
  }

  // 10. Natural conversational micro-pauses (inhale / breathing cadence)
  text = text
    .replace(/\b(Hey buddy|Hey there|Hello|Alright|Awesome|Got it|Sure thing|Well|Basically|Essentially|In fact|First|Second|Third)\s*([A-Za-z])/g, '$1, $2')
    .replace(/\.{2,}/g, ', ')
    .replace(/--|—/g, ', ')
    .replace(/\s+/g, ' ')
    .trim();

  // 11. Prevent abrupt mid-word truncation at length limit
  if (text.length > 850) {
    const cutoff = text.lastIndexOf('.', 850);
    text = cutoff > 350 ? text.slice(0, cutoff + 1) : text.slice(0, 850);
  }

  return text;
}

/**
 * Splits text into natural sentence/clause audio chunks (<150 chars) for seamless streaming
 */
export function splitTextIntoSpokenChunks(text) {
  if (!text) return [];
  const clean = text.trim();
  const rawParts = clean.split(/(?<=[.!?\n])\s+/);
  const result = [];
  for (const part of rawParts) {
    const p = part.trim();
    if (!p) continue;
    if (p.length <= 150) {
      result.push(p);
    } else {
      const sub = p.split(/(?<=[,;])\s+/);
      let buf = '';
      for (const s of sub) {
        if ((buf + ' ' + s).trim().length <= 150) {
          buf = (buf + ' ' + s).trim();
        } else {
          if (buf) result.push(buf);
          buf = s.trim();
        }
      }
      if (buf) result.push(buf);
    }
  }
  return result;
}

/**
 * Fallback to browser native SpeechSynthesis with authentic Indian English / Hindi voice
 */
export function fallbackBrowserSpeech(text, onComplete) {
  if (typeof window === 'undefined' || !window.speechSynthesis) {
    if (onComplete) onComplete();
    return;
  }

  try {
    window.speechSynthesis.cancel();
    const spokenHumanText = humanizeTextForSpeech(text);
    const utterance = new SpeechSynthesisUtterance(spokenHumanText);
    utterance.rate = 0.98;
    utterance.pitch = 1.0;
    utterance.lang = 'en-IN';

    const naturalVoice = getBestNaturalVoice(window.speechSynthesis, 'indian');
    if (naturalVoice) {
      utterance.voice = naturalVoice;
      utterance.lang = naturalVoice.lang || 'en-IN';
    }

    currentUtterance = utterance;
    if (typeof window !== 'undefined') window._doapActiveUtterance = utterance;

    utterance.onend = () => {
      currentUtterance = null;
      if (typeof window !== 'undefined') window._doapActiveUtterance = null;
      if (onComplete) onComplete();
    };

    utterance.onerror = () => {
      currentUtterance = null;
      if (typeof window !== 'undefined') window._doapActiveUtterance = null;
      if (onComplete) onComplete();
    };

    window.speechSynthesis.speak(utterance);
  } catch (e) {
    if (onComplete) onComplete();
  }
}

/**
 * Unified DOAP AI Charon Voice Engine
 * Speaks crystal-clear English with deep, resonant, lifelike studio clarity (Charon Voice Core).
 */
export async function speakDOAPVoice(text, onComplete, onError) {
  if (!text || !text.trim()) {
    if (onComplete) onComplete();
    return;
  }

  stopElevenLabsAudio();
  isAudioCancelled = false;
  unlockAudioContext();

  const cleanText = humanizeTextForSpeech(text);
  const voiceId = 'pNInz6obpgDQGcFmaJgB'; // Charon Voice Core (Adam)

  const apiKeys = [
    (typeof localStorage !== 'undefined' ? localStorage.getItem('doap_elevenlabs_key') : ''),
    'sk_49242a8b562bd43cd0c8ff30db444b69216a64c89ef7d3d2',
    (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_ELEVENLABS_KEY),
    'sk_5f91a262d00d2924db057bf3fd48a71b8857415c268c9452'
  ].filter(Boolean);

  let hasStartedPlaying = false;

  for (const key of apiKeys) {
    if (isAudioCancelled) return;
    try {
      // Use eleven_turbo_v2_5 with high stability & style 0.0 to prevent timbre drift / accent switching
      const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}/stream`, {
        method: 'POST',
        headers: {
          'Accept': 'audio/mpeg',
          'Content-Type': 'application/json',
          'xi-api-key': key
        },
        body: JSON.stringify({
          text: cleanText,
          model_id: 'eleven_turbo_v2_5',
          voice_settings: {
            stability: 0.50,
            similarity_boost: 0.85,
            style: 0.0,
            use_speaker_boost: true
          }
        })
      });

      if (!response.ok) {
        console.warn(`[DOAP Charon Voice] Key returned status ${response.status}, trying fallback...`);
        continue;
      }

      const blob = await response.blob();
      if (isAudioCancelled) return;

      const audioUrl = URL.createObjectURL(blob);
      const audio = new Audio(audioUrl);
      currentAudioElement = audio;

      audio.onended = () => {
        try { URL.revokeObjectURL(audioUrl); } catch (e) {}
        currentAudioElement = null;
        if (onComplete) onComplete();
      };

      audio.onerror = (e) => {
        try { URL.revokeObjectURL(audioUrl); } catch (e) {}
        currentAudioElement = null;
        if (!hasStartedPlaying) {
          console.warn('[DOAP Charon Voice] Audio load error, falling back:', e);
          if (onError) onError(e);
          else fallbackBrowserSpeech(cleanText, onComplete);
        } else {
          if (onComplete) onComplete();
        }
      };

      const playPromise = audio.play();
      if (playPromise !== undefined) {
        await playPromise;
        hasStartedPlaying = true;
      }
      return; // Charon voice is playing exclusively!
    } catch (err) {
      console.warn('[DOAP Charon Voice] Request error:', err);
    }
  }

  // Fallback to browser speech ONLY if ElevenLabs could not start
  if (!hasStartedPlaying && !isAudioCancelled) {
    if (onError) onError(new Error("ElevenLabs unavailable"));
    else fallbackBrowserSpeech(cleanText, onComplete);
  }
}

/**
 * Backward-compatible alias for all components
 */
export async function speakElevenLabs(text, voiceKey = 'doap', onComplete, onError) {
  if (typeof voiceKey === 'function') {
    onError = onComplete;
    onComplete = voiceKey;
    voiceKey = 'doap';
  }
  return speakDOAPVoice(text, onComplete, onError);
}
