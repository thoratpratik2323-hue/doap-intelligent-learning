/**
 * ElevenLabs Ultra-Realistic Voice Service with Studio DSP Processing & Neural Browser Fallback
 */

const ELEVEN_API_KEY = (typeof localStorage !== 'undefined' ? localStorage.getItem('doap_elevenlabs_key') : '') ||
                       'sk_49242a8b562bd43cd0c8ff30db444b69216a64c89ef7d3d2' ||
                       (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_ELEVENLABS_KEY) ||
                       'sk_5f91a262d00d2924db057bf3fd48a71b8857415c268c9452';

/// Official ElevenLabs Studio Voices configured for DOAP AI Voice Engine
export const ELEVEN_VOICES = {
  aoede: { id: 'EXAVITQu4vr4xnSDxMaL', name: 'Myraa Aoede (Sweet, Warm & Soft-Spoken Companion - Female)' },
  myraa: { id: 'EXAVITQu4vr4xnSDxMaL', name: 'Myraa Aoede (Sweet, Warm & Soft-Spoken Companion - Female)' },
  sarah: { id: 'EXAVITQu4vr4xnSDxMaL', name: 'Myraa Sarah (Sweet & Gentle Female)' }
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

// Strictly exclude all female voice identifiers across Windows, Edge, Google, Apple, and Android
const FEMALE_VOICE_KEYWORDS = [
  'neerja', 'jenny', 'aria', 'swara', 'lekha', 'zira', 'samantha',
  'victoria', 'karen', 'catherine', 'heera', 'priya', 'kalpana',
  'sangeeta', 'female', 'woman', 'girl', 'hazel', 'susan', 'linda',
  'eva', 'mary', 'ana', 'mia', 'emma', 'stephanie', 'clara', 'natalie',
  'sarah', 'ava', 'alva', 'kendra', 'joanna', 'salli', 'ivy', 'ayanda'
];

/**
 * Intelligent Sweet Anime Heroine Voice Selector for Myraa
 * Selects the sweetest, warmest, and most expressive female neural voice available.
 * Prioritizes Microsoft Ana, Jenny, Aria, Neerja, Google US English Female, Apple Samantha/Victoria.
 */
export function getMyraaVoice(synth) {
  if (!synth) return null;
  const voices = synth.getVoices ? synth.getVoices() : [];
  if (!voices || voices.length === 0) return null;

  // 1. Highest Priority: Microsoft Edge / Azure Natural Neural Female Voices (Ana, Jenny, Aria, Sonia, Neerja)
  const edgeNaturalFemale = voices.find(v => {
    const n = (v.name || '').toLowerCase();
    return (n.includes('online (natural)') || n.includes('natural') || n.includes('neural')) &&
           (n.includes('ana') || n.includes('jenny') || n.includes('aria') || n.includes('sonia') || n.includes('neerja') || n.includes('samantha'));
  });
  if (edgeNaturalFemale) return edgeNaturalFemale;

  // 2. Google Chrome Natural Studio/Female Voices (Google US English, Google UK English Female)
  const googleFemale = voices.find(v => {
    const n = (v.name || '').toLowerCase();
    return (n.includes('google') || n.includes('chrome')) &&
           (n.includes('female') || n.includes('us english') || n.includes('uk english female') || n.includes('english united states'));
  });
  if (googleFemale) return googleFemale;

  // 3. Apple Natural Female Voices (Samantha, Victoria, Karen, Tessa)
  const appleFemale = voices.find(v => {
    const n = (v.name || '').toLowerCase();
    return (n.includes('samantha') || n.includes('victoria') || n.includes('karen') || n.includes('tessa')) &&
           (v.lang || '').startsWith('en');
  });
  if (appleFemale) return appleFemale;

  // 4. Microsoft Natural / Neural Female (Ana, Jenny, Sonia) without old legacy mechanical Zira
  const msNatural = voices.find(v => {
    const n = (v.name || '').toLowerCase();
    return (n.includes('ana') || n.includes('jenny') || n.includes('sonia') || n.includes('samantha')) && !n.includes('desktop');
  });
  if (msNatural) return msNatural;

  // 5. Any English voice strictly matching verified female keywords (excluding all male names)
  const anyFemale = voices.find(v => {
    const n = (v.name || '').toLowerCase();
    const isMale = n.includes('david') || n.includes('mark') || n.includes('george') || n.includes('male') || n.includes('guy') || n.includes('stefan');
    return !isMale && (v.lang || '').toLowerCase().startsWith('en') && FEMALE_VOICE_KEYWORDS.some(kw => n.includes(kw));
  });
  if (anyFemale) return anyFemale;

  // 6. Safe fallback: any English voice that is explicitly not male
  const safeNonMale = voices.find(v => {
    const n = (v.name || '').toLowerCase();
    return !n.includes('david') && !n.includes('mark') && !n.includes('george') && !n.includes('male') && (v.lang || '').toLowerCase().startsWith('en');
  });
  return safeNonMale || voices[0] || null;
}

/**
 * Intelligent Neural Voice Selector for Browser SpeechSynthesis
 * Exclusively selects masculine / male neural voices across the entire platform.
 * Prioritizes Microsoft Edge Neural Male (Andrew, Prabhat, Guy, Brian), Google Male, or Microsoft David.
 */
export function getBestNaturalVoice(synth) {
  // Pure Aoede Voice: Exclusively returns the sweetest, warmest natural female voice
  return getMyraaVoice(synth);
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
 * Fallback to browser native SpeechSynthesis with authentic Indian English / Hindi voice or Myraa Anime voice
 */
export function fallbackBrowserSpeech(text, onComplete, persona = 'aoede') {
  if (typeof window === 'undefined' || !window.speechSynthesis) {
    if (onComplete) onComplete();
    return;
  }

  // Clear any existing audio playback so browser TTS can speak cleanly without being blocked
  if (currentSource) {
    try { currentSource.stop(); currentSource.disconnect(); } catch (e) {}
    currentSource = null;
  }
  if (currentAudioElement) {
    try { currentAudioElement.pause(); currentAudioElement.src = ''; } catch (e) {}
    currentAudioElement = null;
  }
  isAudioCancelled = false;

  try {
    window.speechSynthesis.cancel();
    window.speechSynthesis.resume();
    const spokenHumanText = humanizeTextForSpeech(text);
    const utterance = new SpeechSynthesisUtterance(spokenHumanText);

    // Myraa Aoede Voice: Sweet, warm, high-pitched anime heroine companion
    // Pitch: +25% higher pitch (light and airy tone)
    // Speed: 0.95x speed (delicate, calm, and comforting pace)
    utterance.pitch = 1.25;
    utterance.rate = 0.95;
    utterance.volume = 1.0;
    utterance.lang = 'en-US';

    const myraaVoice = getMyraaVoice(window.speechSynthesis);
    if (myraaVoice) {
      utterance.voice = myraaVoice;
      utterance.lang = myraaVoice.lang || 'en-US';
    }

    currentUtterance = utterance;
    if (typeof window !== 'undefined') window._doapActiveUtterance = utterance;

    // Chrome SpeechSynthesis watchdog: prevents Chrome from silently pausing or cutting off
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

    const safeFinish = () => {
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
 * Convert Gemini raw PCM (16-bit, 24kHz mono) to playable standard WAV Blob
 */
let myraaOutputAnalyser = null;

export function getMyraaAudioAnalyser() {
  return myraaOutputAnalyser;
}

/**
 * Convert Base64 Raw PCM (16-bit signed Little-Endian, 24kHz mono) to Float32Array
 */
function pcm16ToFloats(uint8Array) {
  const numSamples = Math.floor(uint8Array.byteLength / 2);
  const floats = new Float32Array(numSamples);
  const dataView = new DataView(uint8Array.buffer, uint8Array.byteOffset, uint8Array.byteLength);
  for (let i = 0; i < numSamples; i++) {
    floats[i] = dataView.getInt16(i * 2, true) / 32768.0;
  }
  return floats;
}

/**
 * Convert raw 16-bit PCM (24kHz Mono) into standard playable RIFF WAV Blob
 */
function pcm16ToWavBlob(uint8Array, sampleRate = 24000, numChannels = 1) {
  const dataLength = uint8Array.byteLength;
  const buffer = new ArrayBuffer(44 + dataLength);
  const view = new DataView(buffer);

  // "RIFF" chunk descriptor
  view.setUint32(0, 0x52494646, false); // "RIFF"
  view.setUint32(4, 36 + dataLength, true); // file size - 8
  view.setUint32(8, 0x57415645, false); // "WAVE"

  // "fmt " sub-chunk
  view.setUint32(12, 0x666d7420, false); // "fmt "
  view.setUint32(16, 16, true); // Subchunk1Size (16 for PCM)
  view.setUint16(20, 1, true); // AudioFormat (1 = PCM)
  view.setUint16(22, numChannels, true); // NumChannels
  view.setUint32(24, sampleRate, true); // SampleRate
  view.setUint32(28, sampleRate * numChannels * 2, true); // ByteRate
  view.setUint16(32, numChannels * 2, true); // BlockAlign
  view.setUint16(34, 16, true); // BitsPerSample (16-bit)

  // "data" sub-chunk
  view.setUint32(36, 0x64617461, false); // "data"
  view.setUint32(40, dataLength, true); // data size

  // Write PCM samples
  new Uint8Array(buffer, 44).set(uint8Array);

  return new Blob([buffer], { type: 'audio/wav' });
}

function base64ToUint8Array(base64) {
  const binaryString = (typeof window !== 'undefined' && typeof window.atob === 'function') 
    ? window.atob(base64) 
    : (typeof atob === 'function' ? atob(base64) : '');
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

/**
 * Official Gemini Live Aoede Voice Engine for Myraa
 * Direct Web Audio API AudioBuffer & HTML5 WAV playback at 24kHz.
 * Connects directly to hardware audio destination and real-time frequency analyser.
 * Cascades across gemini-2.5-flash-preview-tts, gemini-2.5-pro-preview-tts, and gemini-3.1-flash-tts-preview.
 */
export async function speakGeminiAoedeVoice(text, onComplete, onError) {
  try {
    const apiKey = (typeof localStorage !== 'undefined' ? (localStorage.getItem('gemini_api_key') || localStorage.getItem('doap_gemini_key')) : '') ||
                   (typeof import.meta !== 'undefined' && import.meta.env?.VITE_GEMINI_API_KEY) ||
                   (typeof atob === 'function' ? atob("QVEuQWI4Uk42SlBnYzFMSUVKYlBpSlZFUXl5WlhkUi1aVE9CQXVTRW91NnBiMDE0RWtCWFE=") : '');

    if (!apiKey) return false;

    const cleanText = humanizeTextForSpeech(text);
    if (!cleanText) {
      if (onComplete) onComplete();
      return true;
    }

    isAudioCancelled = false;

    // Direct target models for Aoede studio speech (prioritize stable 2.5 Flash TTS)
    const candidateModels = [
      "gemini-2.5-flash-preview-tts",
      "gemini-2.5-pro-preview-tts",
      "gemini-3.1-flash-tts-preview"
    ];

    let inlineAudioData = null;

    for (const modelName of candidateModels) {
      if (isAudioCancelled) return true;
      try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;
        const res = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              {
                parts: [{ text: cleanText }]
              }
            ],
            generationConfig: {
              responseModalities: ["AUDIO"],
              speechConfig: {
                voiceConfig: {
                  prebuiltVoiceConfig: {
                    voiceName: "Aoede"
                  }
                }
              }
            }
          })
        });

        if (res.ok) {
          const data = await res.json();
          const audio = data?.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
          if (audio) {
            // Check that audio is not completely silent / all zeroes
            const sampleBytes = base64ToUint8Array(audio.slice(0, 100));
            const hasSignal = sampleBytes.some(b => b !== 0);
            if (hasSignal || audio.length > 500) {
              inlineAudioData = audio;
              break;
            } else {
              console.warn(`[Gemini TTS ${modelName}] returned silent stream, checking next model`);
            }
          }
        } else {
          console.warn(`[Gemini TTS ${modelName}] returned ${res.status}`);
        }
      } catch (callErr) {
        console.warn(`[Gemini TTS ${modelName}] error:`, callErr);
      }
    }

    if (!inlineAudioData) {
      if (onError) onError(new Error("No Gemini audio generated"));
      return false;
    }

    if (isAudioCancelled) return true;

    // Convert raw 16-bit 24kHz PCM to both Float32Array and playable WAV Blob
    const uint8Array = base64ToUint8Array(inlineAudioData);
    const wavBlob = pcm16ToWavBlob(uint8Array, 24000);
    const audioUrl = URL.createObjectURL(wavBlob);

    // Stop any existing playing source and silence any browser robot speech
    if (currentSource) {
      try { currentSource.stop(); currentSource.disconnect(); } catch (e) {}
      currentSource = null;
    }
    if (currentAudioElement) {
      try { currentAudioElement.pause(); currentAudioElement.src = ''; } catch (e) {}
      currentAudioElement = null;
    }
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      try { window.speechSynthesis.cancel(); } catch (e) {}
    }

    const audio = new Audio(audioUrl);
    audio.volume = 1.0;
    currentAudioElement = audio;

    let finished = false;
    const finishHandler = () => {
      if (finished) return;
      finished = true;
      try { URL.revokeObjectURL(audioUrl); } catch (e) {}
      if (currentAudioElement === audio) {
        currentAudioElement = null;
      }
      if (onComplete) onComplete();
    };

    audio.onended = finishHandler;
    audio.onerror = (e) => {
      console.warn('[Gemini Aoede HTML Audio playback error, falling back]:', e);
      try { URL.revokeObjectURL(audioUrl); } catch (err) {}
      currentAudioElement = null;
      if (onError) onError(e);
    };

    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.catch(async (playErr) => {
        console.warn('[Gemini Aoede HTML Audio play blocked, falling back to Web Audio API buffer]:', playErr);
        try {
          const AudioContextClass = (typeof window !== 'undefined') ? (window.AudioContext || window.webkitAudioContext) : null;
          if (AudioContextClass) {
            if (!sharedAudioCtx || sharedAudioCtx.state === 'closed') {
              sharedAudioCtx = new AudioContextClass();
            }
            if (sharedAudioCtx.state === 'suspended') {
              await sharedAudioCtx.resume().catch(() => {});
            }
            const floats = pcm16ToFloats(uint8Array);
            const audioBuffer = sharedAudioCtx.createBuffer(1, floats.length, 24000);
            audioBuffer.getChannelData(0).set(floats);
            const source = sharedAudioCtx.createBufferSource();
            source.buffer = audioBuffer;
            source.connect(sharedAudioCtx.destination);
            currentSource = source;
            source.onended = finishHandler;
            source.start(0);
            return;
          }
        } catch (webaudioErr) {
          console.warn('[Web Audio API fallback failed]:', webaudioErr);
        }
        finishHandler();
      });
    }

    return true;
  } catch (err) {
    console.warn('[Gemini Aoede TTS call failed]:', err);
    if (onError) onError(err);
    return false;
  }
}

/**
 * Unified DOAP AI Neural Voice Engine
 * Speaks crystal-clear English with deep, resonant, human-grade studio clarity or Myraa anime heroine voice.
 * Uses DOAP Neural Studio Voice Engine (powered by Azure/Edge Neural via /api/ai/tts),
 * Kokoro local open-weights, or personal ElevenLabs key.
 */
export async function speakDOAPVoice(text, arg2, arg3, arg4) {
  if (!text || !text.trim()) {
    if (typeof arg2 === 'function') arg2();
    else if (typeof arg3 === 'function') arg3();
    return;
  }

  let onComplete = null;
  let onError = null;
  let voiceKey = 'aoede';

  // Flexible argument handling:
  // Case A: (text, onComplete, onError, voiceKey)
  if (typeof arg2 === 'function') {
    onComplete = arg2;
    onError = typeof arg3 === 'function' ? arg3 : null;
    voiceKey = typeof arg3 === 'string' ? arg3 : (typeof arg4 === 'string' ? arg4 : 'aoede');
  }
  // Case B: (text, voiceKey, onComplete, onError)
  else if (typeof arg2 === 'string') {
    voiceKey = arg2;
    onComplete = typeof arg3 === 'function' ? arg3 : null;
    onError = typeof arg4 === 'function' ? arg4 : null;
  }
  // Case C: (text, optionsObject)
  else if (typeof arg2 === 'object' && arg2 !== null) {
    voiceKey = arg2.voiceKey || arg2.voiceName || arg2.voice || 'aoede';
    onComplete = arg2.onEnd || arg2.onComplete || null;
    onError = arg2.onError || null;
  }

  stopElevenLabsAudio();
  isAudioCancelled = false;
  unlockAudioContext();

  const cleanText = humanizeTextForSpeech(text);
  const skipGemini = (typeof arg2 === 'object' && arg2?._skipGemini) || false;

  // 0. Absolute Highest Priority: Gemini Live Aoede Studio Audio
  if (!skipGemini) {
    const success = await speakGeminiAoedeVoice(cleanText, onComplete, (err) => {
      console.warn('[Gemini Aoede failed, falling back to Browser Neural]:', err);
    });
    if (success) return;
  }

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
          fallbackBrowserSpeech(cleanText, onComplete, voiceKey);
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
      const normalizedKey = (voiceKey || '').toLowerCase();
      const elevenVoiceId = ELEVEN_VOICES[normalizedKey]?.id || ELEVEN_VOICES.aoede?.id || ELEVEN_VOICES.charon?.id;
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
          fallbackBrowserSpeech(cleanText, onComplete, voiceKey);
        };
        await audio.play();
        return;
      }
    } catch (err) {
      console.warn("[DOAP TTS] Custom ElevenLabs failed, falling back:", err);
    }
  }

  // 3. If running on local server with active Node backend, attempt /api/ai/tts
  if (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
    try {
      const ttsRes = await fetch('/api/ai/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: cleanText,
          voice: 'aoede'
        })
      });

      if (ttsRes.ok && ttsRes.headers.get('content-type')?.includes('audio')) {
        const blob = await ttsRes.blob();
        if (isAudioCancelled) return;
        const audioUrl = URL.createObjectURL(blob);
        const audio = new Audio(audioUrl);
        currentAudioElement = audio;

        audio.onended = () => {
          try { URL.revokeObjectURL(audioUrl); } catch (e) {}
          currentAudioElement = null;
          if (onComplete) onComplete();
        };

        audio.onerror = () => {
          try { URL.revokeObjectURL(audioUrl); } catch (e) {}
          currentAudioElement = null;
          fallbackBrowserSpeech(cleanText, onComplete, 'aoede');
        };

        const playPromise = audio.play();
        if (playPromise !== undefined) {
          await playPromise;
        }
        return;
      }
    } catch (neuralErr) {
      console.warn('[DOAP Neural Voice] Local backend TTS failed, falling back to browser:', neuralErr);
    }
  }

  // 4. Guaranteed Zero-Failure Fallback: Browser Native SpeechSynthesis with sweet Aoede pitch & pacing
  fallbackBrowserSpeech(cleanText, onComplete, 'aoede');
}

/**
 * Backward-compatible alias for all DOAP components
 */
export async function speakElevenLabs(text, arg2 = 'aoede', arg3, arg4) {
  return speakDOAPVoice(text, arg2, arg3, arg4);
}
