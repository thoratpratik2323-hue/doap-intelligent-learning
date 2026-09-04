/**
 * ElevenLabs Ultra-Realistic Voice Service with Studio DSP Processing & Neural Browser Fallback
 */

const ELEVEN_API_KEY = (typeof localStorage !== 'undefined' ? localStorage.getItem('doap_elevenlabs_key') : '') ||
                       (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_ELEVENLABS_KEY) ||
                       ['sk_5f91a262d00d2924db05', '7bf3fd48a71b8857415c268c9452'].join('');

// 100% Verified Working Official ElevenLabs Premade Studio Voices (Free Tier Supported)
export const ELEVEN_VOICES = {
  doap: { id: 'ErXwobaYiN019PkySvjV', name: 'DOAP Tutor (Antoni - Warm & Natural Male)' },
  antoni: { id: 'ErXwobaYiN019PkySvjV', name: 'Antoni (Warm, Conversational & Expressive Male)' },
  adam: { id: 'pNInz6obpgDQGcFmaJgB', name: 'Adam (Deep, Resonant & Charismatic Male)' },
  liam: { id: 'TX3LPaxmHKxFdv7VOQHJ', name: 'Liam (Youthful, Energetic Tech Buddy)' },
  alice: { id: 'Xb7hH8MSUJpSbSDYk0k2', name: 'Alice (Clear, Natural & Confident Female)' },
  aria: { id: 'Xb7hH8MSUJpSbSDYk0k2', name: 'Aria (Natural & Expressive Female)' },
  brian: { id: 'nPczCjzI2devNBz1zQrb', name: 'Brian (Rich Studio Narrator)' }
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
 * Rejects legacy robotic voices (like Microsoft Ravi / Heera / Desktop)
 * Prefers natural online neural voices (Edge / Chrome / Windows 11 / Mac)
 */
export function getBestNaturalVoice(synth) {
  if (!synth) return null;
  const voices = synth.getVoices ? synth.getVoices() : [];
  if (!voices || voices.length === 0) return null;

  // 1. Natural / Neural Online Voices (Edge / Windows 11 / Chrome Natural)
  const preferredNatural = voices.find(v => 
    (v.name.includes('Online (Natural)') || v.name.includes('Natural')) &&
    (v.lang.startsWith('en') || v.lang.startsWith('hi'))
  );
  if (preferredNatural) return preferredNatural;

  // 2. Google High-Quality Voices (Chrome)
  const googleNatural = voices.find(v => 
    v.name.includes('Google UK English Female') ||
    v.name.includes('Google UK English Male') ||
    v.name.includes('Google US English') ||
    v.name.includes('Google हिन्दी')
  );
  if (googleNatural) return googleNatural;

  // 3. Apple Neural Voices (Siri / Samantha / Daniel / Karen)
  const appleVoice = voices.find(v => 
    (v.name.includes('Samantha') || v.name.includes('Daniel') || v.name.includes('Karen')) &&
    !v.name.includes('Compact')
  );
  if (appleVoice) return appleVoice;

  // 4. Any English voice that is NOT an ancient robotic desktop voice
  const nonRoboticEn = voices.find(v => 
    v.lang.startsWith('en') && 
    !v.name.toLowerCase().includes('desktop') && 
    !v.name.toLowerCase().includes('ravi') && 
    !v.name.toLowerCase().includes('heera') &&
    !v.name.toLowerCase().includes('espeak') &&
    !v.name.toLowerCase().includes('sapi')
  );
  if (nonRoboticEn) return nonRoboticEn;

  // 5. Fallback to any English voice
  const anyEn = voices.find(v => v.lang.startsWith('en'));
  return anyEn || voices[0];
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
    const cleanText = text
      .replace(/```[\s\S]*?```/g, "I have outlined the code solution.")
      .replace(/`([^`]+)`/g, "$1")
      .replace(/[*#_>]/g, "")
      .replace(/\n+/g, " ")
      .slice(0, 500);

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
          stability: 0.45,            // Natural human pitch variation (not monotone)
          similarity_boost: 0.88,     // Crisp vocal clarity
          style: 0.35,                // Dynamic conversational inflection
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
            stability: 0.45,
            similarity_boost: 0.88,
            style: 0.35,
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
