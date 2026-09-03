/**
 * ElevenLabs Ultra-Realistic Studio Female Voice Service
 */

const ELEVEN_API_KEY = (typeof localStorage !== 'undefined' ? localStorage.getItem('doap_elevenlabs_key') : '') ||
                       (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_ELEVENLABS_KEY) ||
                       'sk_49242a8b562bd43cd0c8ff30db444b69216a64c89ef7d3d2';

export const ELEVEN_VOICES = {
  doap: { id: '9PvnT6XRzlljoaDG6Knu', name: 'DOAP AI' },
  aria: { id: '9PvnT6XRzlljoaDG6Knu', name: 'DOAP AI' },
  rachel: { id: '9PvnT6XRzlljoaDG6Knu', name: 'DOAP AI' },
  sarah: { id: '9PvnT6XRzlljoaDG6Knu', name: 'DOAP AI' }
};

let currentAudio = null;

export async function speakElevenLabs(text, voiceKey = 'aria', onComplete, onError) {
  if (!text || !text.trim()) {
    if (onComplete) onComplete();
    return;
  }

  // Stop any previous audio playback
  if (currentAudio) {
    try {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    } catch (e) {}
    currentAudio = null;
  }

  const voiceId = (ELEVEN_VOICES[voiceKey] && ELEVEN_VOICES[voiceKey].id) || ELEVEN_VOICES.aria.id;

  try {
    const cleanText = text
      .replace(/```[\s\S]*?```/g, "I have outlined the code solution.")
      .replace(/`([^`]+)`/g, "$1")
      .replace(/[*#_>]/g, "")
      .replace(/\n+/g, " ")
      .slice(0, 450);

    const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}/stream`, {
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
          similarity_boost: 0.85,
          style: 0.35,
          use_speaker_boost: true
        }
      })
    });

    if (!response.ok) {
      throw new Error(`ElevenLabs API Error: ${response.status}`);
    }

    const audioBlob = await response.blob();
    const audioUrl = URL.createObjectURL(audioBlob);
    const audio = new Audio(audioUrl);
    currentAudio = audio;

    audio.onended = () => {
      URL.revokeObjectURL(audioUrl);
      currentAudio = null;
      if (onComplete) onComplete();
    };

    audio.onerror = (e) => {
      URL.revokeObjectURL(audioUrl);
      currentAudio = null;
      if (onError) onError(e);
      else if (onComplete) onComplete();
    };

    await audio.play();
  } catch (err) {
    console.warn('[ElevenLabs] Fallback to browser synthesis:', err);
    if (onError) onError(err);
    else if (onComplete) onComplete();
  }
}

export function stopElevenLabsAudio() {
  if (currentAudio) {
    try {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    } catch (e) {}
    currentAudio = null;
  }
}
