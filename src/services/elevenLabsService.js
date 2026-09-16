/**
 * ElevenLabs Ultra-Realistic Voice Service with Studio DSP Processing & Neural Browser Fallback
 */

const ELEVEN_API_KEY = (typeof localStorage !== 'undefined' ? localStorage.getItem('doap_elevenlabs_key') : '') ||
                       'sk_49242a8b562bd43cd0c8ff30db444b69216a64c89ef7d3d2' ||
                       (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_ELEVENLABS_KEY) ||
                       'sk_5f91a262d00d2924db057bf3fd48a71b8857415c268c9452';

/// Official ElevenLabs Studio Voices configured for DOAP AI Voice Engine (Female-First with Hindi/Hinglish/English support)
export const ELEVEN_VOICES = {
  swara: { id: '21m00Tcm4TlvDq8ikWAM', name: 'Swara Neural (Hindi / Hinglish / English - Female)' },
  neerja: { id: 'AZnzlk1XvdvUeBnXmlld', name: 'Neerja Neural (Indian English / Hinglish - Female)' },
  doap: { id: '21m00Tcm4TlvDq8ikWAM', name: 'DOAP AI Swara (Hindi / Hinglish / English - Female)' },
  charon: { id: '21m00Tcm4TlvDq8ikWAM', name: 'DOAP AI Swara (Female)' },
  conversational: { id: '21m00Tcm4TlvDq8ikWAM', name: 'DOAP AI Swara Natural Tutor (Female)' },
  prabhat: { id: 'TX3LPaxmHKxFdv7VOQHJ', name: 'DOAP AI Prabhat Neural (Indian Male)' },
  guy: { id: 'ErXwobaYiN019PkySvjV', name: 'DOAP AI Guy Neural (Male)' },
  brian: { id: 'nPczCjzI2devNBz1zQrb', name: 'DOAP AI Brian Academic (Male)' }
};

let sharedAudioCtx = null;
let currentSource = null;
let currentAudioElement = null;
let currentUtterance = null;
let isAudioCancelled = false;

export function unlockAudioContext() {
  if (typeof window === 'undefined') return;
  const AudioCtx = window.AudioContext || window.webkitAudioContext;
  if (AudioCtx) {
    if (!sharedAudioCtx) {
      sharedAudioCtx = new AudioCtx();
    }
    if (sharedAudioCtx.state === 'suspended') {
      sharedAudioCtx.resume().catch(() => {});
    }
  }

  // Prime HTMLAudioElement to satisfy iOS Safari & Chrome Android Autoplay Policy
  try {
    const silentAudio = new Audio('data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA');
    silentAudio.volume = 0.001;
    const playPromise = silentAudio.play();
    if (playPromise !== undefined) {
      playPromise.then(() => {
        silentAudio.pause();
      }).catch(() => {});
    }
  } catch (e) {}
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
 * Prioritizes high-definition Indian Female neural voices (Swara / Neerja)
 * with native fluency in Hindi, English, and code-mixed Hinglish.
 */
export function getBestNaturalVoice(synth, mode = 'indian') {
  if (!synth) return null;
  const voices = synth.getVoices ? synth.getVoices() : [];
  if (!voices || voices.length === 0) return null;

  // 1. Highest Priority: Authentic Microsoft Edge Online Natural Indian Female Voices (Swara / Neerja)
  // Swara is Microsoft's premier neural model for Hindi, English, and code-mixed Hinglish
  const edgeNaturalFemale = voices.find(v => {
    const n = (v.name || '').toLowerCase();
    return (n.includes('online (natural)') || n.includes('natural') || n.includes('neural')) &&
           (n.includes('swara') || n.includes('neerja'));
  });
  if (edgeNaturalFemale) return edgeNaturalFemale;

  // 2. Google Hindi / Indian Voices (Google हिन्दी, Google हिन्दी (महिला), Google en-IN)
  const googleIndianVoice = voices.find(v => {
    const n = (v.name || '').toLowerCase();
    const lang = (v.lang || '').toLowerCase().replace('_', '-');
    return (lang === 'hi-in' || lang.startsWith('hi') || n.includes('हिन्दी') || n.includes('hindi')) &&
           (n.includes('google') || n.includes('female') || n.includes('swara') || !n.includes('male'));
  });
  if (googleIndianVoice) return googleIndianVoice;

  // 3. Any Indian English Female Voice (Neerja, Heera, Kalpana, Veena)
  const indianFemaleVoice = voices.find(v => {
    const n = (v.name || '').toLowerCase();
    const lang = (v.lang || '').toLowerCase().replace('_', '-');
    return (lang === 'en-in' || n.includes('india')) &&
           (n.includes('neerja') || n.includes('heera') || n.includes('kalpana') || n.includes('veena') || n.includes('female') || !n.includes('david'));
  });
  if (indianFemaleVoice) return indianFemaleVoice;

  // 4. Any Hindi Voice in the system
  const anyHindi = voices.find(v => {
    const lang = (v.lang || '').toLowerCase().replace('_', '-');
    return lang.startsWith('hi') || (v.name || '').toLowerCase().includes('hindi') || (v.name || '').toLowerCase().includes('हिन्दी');
  });
  if (anyHindi) return anyHindi;

  // 5. Any Natural Female voice (Zira, Jenny, Samantha, Victoria)
  const anyFemale = voices.find(v => {
    const n = (v.name || '').toLowerCase();
    return n.includes('zira') || n.includes('jenny') || n.includes('samantha') || n.includes('victoria') || n.includes('female');
  });
  if (anyFemale) return anyFemale;

  return voices[0] || null;
}

/**
 * Universal Emoji & Symbol Stripping Regex
 * Strips all Unicode emojis, emoticons, pictographs, variation selectors, and dingbats
 * so TTS engines never speak emoji descriptions aloud.
 */
const EMOJI_AND_SYMBOLS_REGEX = /[\u{1F300}-\u{1F9FF}\u{1FA00}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F000}-\u{1F02F}\u{1F0A0}-\u{1F0FF}\u{1F100}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{FE00}-\u{FE0F}\p{Extended_Pictographic}\p{Emoji_Presentation}]/gu;

/**
 * Advanced Humanoid Phonetic Normalizer for AI Voice Engines
 * Strips all emojis, formats code/math, and normalizes into crystal-clear spoken English.
 */
export function humanizeTextForSpeech(rawText) {
  if (!rawText) return '';

  let text = String(rawText);

  // 1. NEVER read emojis aloud: Completely strip all emojis, pictographs, and dingbats
  text = text.replace(EMOJI_AND_SYMBOLS_REGEX, ' ');

  // 2. Strip <think> reasoning blocks, <details>, markdown code blocks, links, and formatting symbols
  text = text
    .replace(/<think>[\s\S]*?<\/think>/gi, '')
    .replace(/<think>[\s\S]*$/gi, '')
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
    if (!spokenHumanText || !spokenHumanText.trim()) {
      if (onComplete) onComplete();
      return;
    }

    const utterance = new SpeechSynthesisUtterance(spokenHumanText);
    utterance.rate = 1.0;
    utterance.pitch = 1.05;

    const naturalVoice = getBestNaturalVoice(window.speechSynthesis, 'indian');
    if (naturalVoice) {
      utterance.voice = naturalVoice;
      utterance.lang = naturalVoice.lang || 'en-IN';
    } else {
      utterance.lang = 'en-IN';
    }

    currentUtterance = utterance;
    if (typeof window !== 'undefined') window._doapActiveUtterance = utterance;

    // Chrome SpeechSynthesis watchdog: prevents Chrome from silently pausing or cutting off after 14 seconds
    const keepAlivePing = setInterval(() => {
      if (typeof window === 'undefined' || !window.speechSynthesis || !window.speechSynthesis.speaking) {
        clearInterval(keepAlivePing);
      } else {
        try {
          window.speechSynthesis.pause();
          window.speechSynthesis.resume();
        } catch (e) {}
      }
    }, 8000);

    let finished = false;
    const safeFinish = (e) => {
      if (finished) return;
      if (e && (e.error === 'interrupted' || e.error === 'canceled')) {
        clearInterval(keepAlivePing);
        return;
      }
      finished = true;
      clearInterval(keepAlivePing);
      currentUtterance = null;
      if (typeof window !== 'undefined') window._doapActiveUtterance = null;
      if (onComplete) onComplete();
    };

    utterance.onend = safeFinish;
    utterance.onerror = safeFinish;

    window.speechSynthesis.speak(utterance);
  } catch (e) {
    if (onComplete) onComplete();
  }
}

/**
 * Unified DOAP AI Neural Voice Engine
 * Speaks crystal-clear English with deep, resonant, human-grade studio clarity.
 * Uses DOAP Neural Studio Voice Engine (powered by Azure/Edge Neural via /api/ai/tts),
 * Kokoro local open-weights, or personal ElevenLabs key.
 */
export async function speakDOAPVoice(text, onComplete, onError, voiceKey = 'swara') {
  if (!text || !text.trim()) {
    if (onComplete) onComplete();
    return;
  }

  stopElevenLabsAudio();
  isAudioCancelled = false;
  unlockAudioContext();

  const cleanText = humanizeTextForSpeech(text);
  const ttsProvider = (typeof localStorage !== 'undefined' ? localStorage.getItem('doap_tts_provider') : 'neural') || 'neural';
  const customElevenKey = typeof localStorage !== 'undefined' ? localStorage.getItem('doap_elevenlabs_key') : '';
  const kokoroUrl = (typeof localStorage !== 'undefined' ? localStorage.getItem('doap_kokoro_url') : '') || 'http://localhost:8880/v1/audio/speech';

  // 1. Support Open-Source Local TTS Engine (Kokoro TTS / Kokoro-FastAPI)
  if (ttsProvider === 'kokoro') {
    try {
      const kokoroVoice = (typeof localStorage !== 'undefined' ? localStorage.getItem('doap_kokoro_voice') : '') || 'af_bella';
      const kokoroRes = await fetch(kokoroUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'kokoro',
          input: cleanText,
          voice: kokoroVoice,
          response_format: 'mp3'
        })
      });

      if (kokoroRes.ok) {
        const audioBlob = await kokoroRes.blob();
        if (isAudioCancelled) return;
        const audioBlobUrl = URL.createObjectURL(audioBlob);
        const audio = new Audio(audioBlobUrl);
        currentAudioElement = audio;

        audio.onended = () => {
          URL.revokeObjectURL(audioBlobUrl);
          currentAudioElement = null;
          if (onComplete) onComplete();
        };

        audio.onerror = () => {
          URL.revokeObjectURL(audioBlobUrl);
          fallbackBrowserSpeech(cleanText, onComplete);
        };

        await audio.play();
        return;
      }
    } catch (kokoroErr) {
      console.warn("[DOAP TTS] Kokoro Local TTS endpoint unreachable, falling back:", kokoroErr);
    }
  }

  // 2. Personal ElevenLabs API Key if user configured one in Settings
  if (ttsProvider === 'elevenlabs' && customElevenKey) {
    try {
      const elevenVoiceId = ELEVEN_VOICES[voiceKey]?.id || 'pNInz6obpgDQGcFmaJgB';
      const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${elevenVoiceId}/stream`, {
        method: 'POST',
        headers: {
          'Accept': 'audio/mpeg',
          'Content-Type': 'application/json',
          'xi-api-key': customElevenKey
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

      if (response.ok) {
        const blob = await response.blob();
        if (isAudioCancelled) return;
        const audioUrl = URL.createObjectURL(blob);
        const audio = new Audio(audioUrl);
        currentAudioElement = audio;
        audio.onended = () => {
          URL.revokeObjectURL(audioUrl);
          currentAudioElement = null;
          if (onComplete) onComplete();
        };
        audio.onerror = () => {
          URL.revokeObjectURL(audioUrl);
          currentAudioElement = null;
          fallbackBrowserSpeech(cleanText, onComplete);
        };
        await audio.play();
        return;
      }
    } catch (err) {
      console.warn("[DOAP TTS] Custom ElevenLabs failed, falling back:", err);
    }
  }

  // 3. DOAP High-Fidelity Studio Neural Voice Engine (via /api/ai/tts)
  // Powered by Azure / Microsoft Edge Neural Voices: 100% human-grade, zero API keys, unlimited characters!
  try {
    let activePersona = (typeof localStorage !== 'undefined' ? localStorage.getItem('doap_voice_persona') : '') || voiceKey || 'swara';
    // If legacy male default was saved or blank, default to female Indian Swara
    if (!activePersona || activePersona === 'charon' || activePersona === 'doap') {
      activePersona = 'swara';
    }
    const ttsRes = await fetch('/api/ai/tts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: cleanText,
        voice: activePersona
      })
    });

    const contentType = (ttsRes.headers && ttsRes.headers.get('content-type')) || '';
    if (ttsRes.ok && contentType.includes('audio')) {
      const blob = await ttsRes.blob();
      if (isAudioCancelled) return;
      const audioUrl = URL.createObjectURL(blob);
      const audio = new Audio(audioUrl);
      currentAudioElement = audio;

      let playedDone = false;
      const handleDone = () => {
        if (playedDone) return;
        playedDone = true;
        try { URL.revokeObjectURL(audioUrl); } catch (e) {}
        currentAudioElement = null;
        if (onComplete) onComplete();
      };

      audio.onended = handleDone;
      audio.onerror = () => {
        if (playedDone) return;
        playedDone = true;
        try { URL.revokeObjectURL(audioUrl); } catch (e) {}
        currentAudioElement = null;
        fallbackBrowserSpeech(cleanText, onComplete);
      };

      try {
        const playPromise = audio.play();
        if (playPromise !== undefined) {
          await playPromise;
        }
        return; // High-fidelity neural speech active!
      } catch (playErr) {
        if (playedDone) return;
        playedDone = true;
        try { URL.revokeObjectURL(audioUrl); } catch (e) {}
        currentAudioElement = null;
        fallbackBrowserSpeech(cleanText, onComplete);
        return;
      }
    }
  } catch (neuralErr) {
    // Silently fall through to browser speech without crashing
  }

  // 4. Final Fallback: Browser Native SpeechSynthesis with softened pitch & rate
  if (!isAudioCancelled) {
    fallbackBrowserSpeech(cleanText, onComplete);
  }
}

/**
 * Backward-compatible alias for all DOAP components
 */
export async function speakElevenLabs(text, voiceKey = 'swara', onComplete, onError) {
  if (typeof voiceKey === 'function') {
    onError = onComplete;
    onComplete = voiceKey;
    voiceKey = 'swara';
  }
  return speakDOAPVoice(text, onComplete, onError, voiceKey);
}
