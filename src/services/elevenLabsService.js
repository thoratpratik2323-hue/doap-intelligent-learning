/**
 * ElevenLabs Ultra-Realistic Voice Service with Unlocked Web Audio Playback
 */

const ELEVEN_API_KEY = (typeof localStorage !== 'undefined' ? localStorage.getItem('doap_elevenlabs_key') : '') ||
                       (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_ELEVENLABS_KEY) ||
                       'sk_49242a8b562bd43cd0c8ff30db444b69216a64c89ef7d3d2';

export const ELEVEN_VOICES = {
  doap: { id: '9PvnT6XRzlljoaDG6Knu', name: 'Ranbir (Indian Male)' },
  brian: { id: 'nPczCjzI2devNBz1zQrb', name: 'Brian (Deep & Warm)' }
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

export async function speakElevenLabs(text, voiceKey = 'doap', onComplete, onError) {
  if (!text || !text.trim()) {
    if (onComplete) onComplete();
    return;
  }

  stopElevenLabsAudio();
  unlockAudioContext();

  const voiceId = (ELEVEN_VOICES[voiceKey] && ELEVEN_VOICES[voiceKey].id) || '9PvnT6XRzlljoaDG6Knu';

  try {
    const cleanText = text
      .replace(/```[\s\S]*?```/g, "I have outlined the code solution.")
      .replace(/`([^`]+)`/g, "$1")
      .replace(/[*#_>]/g, "")
      .replace(/\n+/g, " ")
      .slice(0, 450);

    // 1. Try Primary Voice (Ranbir - 9PvnT6XRzlljoaDG6Knu)
    let response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}/stream`, {
      method: 'POST',
      headers: {
        'Accept': 'audio/mpeg',
        'Content-Type': 'application/json',
        'xi-api-key': ELEVEN_API_KEY
      },
      body: JSON.stringify({
        text: cleanText,
        model_id: 'eleven_flash_v2_5',
        voice_settings: {
          stability: 0.55,
          similarity_boost: 0.85
        }
      })
    });

    // 2. If 402 (Free tier blocked from Community Library voices), fallback to ElevenLabs Studio Premade Voice
    if (!response.ok && response.status === 402 && voiceId !== 'nPczCjzI2devNBz1zQrb') {
      console.warn('[ElevenLabs] 402 Payment Required for library voice. Streaming ElevenLabs Studio Voice (Brian)...');
      response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/nPczCjzI2devNBz1zQrb/stream`, {
        method: 'POST',
        headers: {
          'Accept': 'audio/mpeg',
          'Content-Type': 'application/json',
          'xi-api-key': ELEVEN_API_KEY
        },
        body: JSON.stringify({
          text: cleanText,
          model_id: 'eleven_turbo_v2_5',
          voice_settings: {
            stability: 0.55,
            similarity_boost: 0.85
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
      source.connect(sharedAudioCtx.destination);
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
    console.warn('[ElevenLabs] Streaming fallback:', err);
    if (onError) onError(err);
    else if (onComplete) onComplete();
  }
}
