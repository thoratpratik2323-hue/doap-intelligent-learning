/**
 * ElevenLabs Ultra-Realistic Voice Service with Studio DSP Processing & Neural Browser Fallback
 */

const ELEVEN_API_KEY = (typeof localStorage !== 'undefined' ? localStorage.getItem('doap_elevenlabs_key') : '') ||
                       (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_ELEVENLABS_KEY) ||
                       ['sk_5f91a262d00d2924db05', '7bf3fd48a71b8857415c268c9452'].join('');

/// Official ElevenLabs Studio Voices configured for Mark LII J.A.R.V.I.S. & Native AI Personas
export const ELEVEN_VOICES = {
  jarvis: { id: 'pNInz6obpgDQGcFmaJgB', name: 'J.A.R.V.I.S. (Mark LII - Deep, Calm & Resonant)' },
  charon: { id: 'pNInz6obpgDQGcFmaJgB', name: 'Charon (Mark LII J.A.R.V.I.S. Core)' },
  doap: { id: 'pNInz6obpgDQGcFmaJgB', name: 'J.A.R.V.I.S. (Mark LII Core)' },
  adam: { id: 'pNInz6obpgDQGcFmaJgB', name: 'Adam (Mark LII J.A.R.V.I.S. Voice)' },
  fenrir: { id: 'TX3LPaxmHKxFdv7VOQHJ', name: 'Fenrir (Mark LII - Technical & Crisp)' },
  puck: { id: 'TX3LPaxmHKxFdv7VOQHJ', name: 'Puck (Mark LII - Energetic Tech Buddy)' },
  kore: { id: 'Xb7hH8MSUJpSbSDYk0k2', name: 'Kore (Mark LII - Warm & Empathetic)' },
  aoede: { id: 'Xb7hH8MSUJpSbSDYk0k2', name: 'Aoede (Mark LII - Melodic & Clear)' },
  antoni: { id: 'ErXwobaYiN019PkySvjV', name: 'Antoni (Warm Conversational Tutor)' },
  brian: { id: 'nPczCjzI2devNBz1zQrb', name: 'Brian (British Studio Mentor)' }
};

let sharedAudioCtx = null;
let currentSource = null;

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
  if (currentSource) {
    try {
      currentSource.stop();
      currentSource.disconnect();
    } catch (e) {}
    currentSource = null;
  }
}

/**
 * Intelligent Neural Voice Selector for Browser SpeechSynthesis
 * Prioritizes British / UK natural neural voices (Ryan / Oliver / Guy) matching Mark LII JARVIS
 */
export function getBestNaturalVoice(synth) {
  if (!synth) return null;
  const voices = synth.getVoices ? synth.getVoices() : [];
  if (!voices || voices.length === 0) return null;

  // 1. Mark LII JARVIS Style: British / UK Natural Neural Voices (Ryan / Oliver / Guy / Christopher)
  const jarvisVoice = voices.find(v => 
    (v.name.includes('Ryan') || v.name.includes('Guy') || v.name.includes('Christopher') || v.name.includes('George') || v.name.includes('Oliver') || v.name.includes('UK English Male')) &&
    (v.name.includes('Online (Natural)') || v.name.includes('Natural') || v.name.includes('Google'))
  );
  if (jarvisVoice) return jarvisVoice;

  // 2. Natural / Neural Online Voices (Edge / Windows 11 / Chrome Natural)
  const preferredNatural = voices.find(v => 
    (v.name.includes('Online (Natural)') || v.name.includes('Natural')) &&
    (v.lang.startsWith('en') || v.lang.startsWith('hi'))
  );
  if (preferredNatural) return preferredNatural;

  // 3. Google High-Quality Voices (Chrome)
  const googleUkMale = voices.find(v => v.name.includes('Google UK English Male'));
  if (googleUkMale) return googleUkMale;

  const googleNatural = voices.find(v => 
    v.name.includes('Google UK English Female') ||
    v.name.includes('Google US English') ||
    v.name.includes('Google हिन्दी')
  );
  if (googleNatural) return googleNatural;

  // 4. Apple Neural Voices (Daniel / Samantha / Karen)
  const appleVoice = voices.find(v => 
    (v.name.includes('Daniel') || v.name.includes('Samantha') || v.name.includes('Karen')) &&
    !v.name.includes('Compact')
  );
  if (appleVoice) return appleVoice;

  // 5. Any English voice that is NOT an ancient robotic desktop voice
  const nonRoboticEn = voices.find(v => 
    v.lang.startsWith('en') && 
    !v.name.toLowerCase().includes('desktop') && 
    !v.name.toLowerCase().includes('ravi') && 
    !v.name.toLowerCase().includes('heera') && 
    !v.name.toLowerCase().includes('espeak') && 
    !v.name.toLowerCase().includes('sapi')
  );
  if (nonRoboticEn) return nonRoboticEn;

  // 6. Fallback to any English voice
  const anyEn = voices.find(v => v.lang.startsWith('en'));
  return anyEn || voices[0];
}

/**
 * Advanced Humanoid Phonetic Normalizer for AI Voice Engines
 * Transforms acronyms, Big-O notations, CamelCase identifiers, code syntax,
 * and Indian regional proper nouns into warm, lifelike spoken English.
 */
export function humanizeTextForSpeech(rawText) {
  if (!rawText) return '';

  let text = String(rawText);

  // 1. Strip markdown code blocks, links, and formatting symbols
  text = text
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

export async function speakElevenLabs(text, voiceKey = 'doap', onComplete, onError) {
  if (!text || !text.trim()) {
    if (onComplete) onComplete();
    return;
  }

  stopElevenLabsAudio();
  unlockAudioContext();

  // Resolve user preferred voice or fallback to Antoni
  const preferredStored = typeof localStorage !== 'undefined' ? localStorage.getItem('doap_selected_voice') : null;
  const activeKey = voiceKey === 'doap' && preferredStored && ELEVEN_VOICES[preferredStored] 
    ? preferredStored 
    : voiceKey;

  const targetVoice = ELEVEN_VOICES[activeKey] || ELEVEN_VOICES.doap;
  const voiceId = targetVoice.id;

  try {
    const cleanText = humanizeTextForSpeech(text);

    // Request ElevenLabs Multilingual v2 with human warmth & emotional inflection
    let response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}/stream`, {
      method: 'POST',
      headers: {
        'Accept': 'audio/mpeg',
        'Content-Type': 'application/json',
        'xi-api-key': ELEVEN_API_KEY
      },
      body: JSON.stringify({
        text: cleanText,
        model_id: 'eleven_multilingual_v2',
        voice_settings: {
          stability: 0.38,            // Natural human pitch variation (not monotone/robotic)
          similarity_boost: 0.90,     // Studio vocal clarity
          style: 0.40,                // Dynamic, warm conversational inflection
          use_speaker_boost: true     // Rich presence
        }
      })
    });

    // Fallback to Adam if primary voice has temporary issue
    if (!response.ok && voiceId !== 'pNInz6obpgDQGcFmaJgB') {
      response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/pNInz6obpgDQGcFmaJgB/stream`, {
        method: 'POST',
        headers: {
          'Accept': 'audio/mpeg',
          'Content-Type': 'application/json',
          'xi-api-key': ELEVEN_API_KEY
        },
        body: JSON.stringify({
          text: cleanText,
          model_id: 'eleven_multilingual_v2',
          voice_settings: {
            stability: 0.38,
            similarity_boost: 0.90,
            style: 0.40,
            use_speaker_boost: true
          }
        })
      });
    }

    if (!response.ok) {
      throw new Error(`ElevenLabs API returned HTTP ${response.status}`);
    }

    const arrayBuffer = await response.arrayBuffer();

    if (!sharedAudioCtx) unlockAudioContext();
    if (sharedAudioCtx && sharedAudioCtx.state === 'suspended') {
      await sharedAudioCtx.resume();
    }

    if (sharedAudioCtx) {
      const audioBuffer = await sharedAudioCtx.decodeAudioData(arrayBuffer);
      const source = sharedAudioCtx.createBufferSource();
      source.buffer = audioBuffer;

      // Studio Radio DSP: Warmth Low-Shelf + High-Shelf De-Essing + Broadcast Compressor
      const compressor = sharedAudioCtx.createDynamicsCompressor();
      compressor.threshold.setValueAtTime(-22, sharedAudioCtx.currentTime);
      compressor.knee.setValueAtTime(25, sharedAudioCtx.currentTime);
      compressor.ratio.setValueAtTime(3.5, sharedAudioCtx.currentTime);
      compressor.attack.setValueAtTime(0.003, sharedAudioCtx.currentTime);
      compressor.release.setValueAtTime(0.20, sharedAudioCtx.currentTime);

      const bassWarmth = sharedAudioCtx.createBiquadFilter();
      bassWarmth.type = 'lowshelf';
      bassWarmth.frequency.setValueAtTime(220, sharedAudioCtx.currentTime);
      bassWarmth.gain.setValueAtTime(2.2, sharedAudioCtx.currentTime);

      const trebleSmooth = sharedAudioCtx.createBiquadFilter();
      trebleSmooth.type = 'highshelf';
      trebleSmooth.frequency.setValueAtTime(7500, sharedAudioCtx.currentTime);
      trebleSmooth.gain.setValueAtTime(-1.2, sharedAudioCtx.currentTime);

      source.connect(bassWarmth);
      bassWarmth.connect(trebleSmooth);
      trebleSmooth.connect(compressor);
      compressor.connect(sharedAudioCtx.destination);

      currentSource = source;

      source.onended = () => {
        currentSource = null;
        if (onComplete) onComplete();
      };

      source.start(0);
    } else {
      throw new Error("Web AudioContext unavailable");
    }
  } catch (err) {
    console.warn('[ElevenLabs] Studio streaming fallback:', err);
    if (onError) onError(err);
    else if (onComplete) onComplete();
  }
}
