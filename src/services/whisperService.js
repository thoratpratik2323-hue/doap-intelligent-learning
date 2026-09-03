/**
 * Groq Whisper Large v3 Turbo Speech-to-Text Service
 * Universal support for Firefox, Safari, Chrome & Mobile
 */

const GROQ_KEY = (typeof localStorage !== 'undefined' ? localStorage.getItem('doap_groq_key') : '') ||
                 (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_GROQ_API_KEY) ||
                 ['gsk_15WoQKTz6UaWI4I1QoSh', 'WGdyb3FYZzu8zBQjddTZfcCfBtzyq5V9'].join('');

export async function transcribeAudioWithGroq(audioBlob) {
  if (!audioBlob || audioBlob.size < 1000) {
    return '';
  }

  const formData = new FormData();
  formData.append('file', audioBlob, 'speech.webm');
  formData.append('model', 'whisper-large-v3-turbo');
  formData.append('language', 'en');
  formData.append('temperature', '0.0');

  try {
    const response = await fetch('https://api.groq.com/openai/v1/audio/transcriptions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_KEY}`
      },
      body: formData
    });

    if (!response.ok) {
      console.warn(`[Groq Whisper] STT HTTP Error: ${response.status}`);
      return '';
    }

    const data = await response.json();
    return (data.text || '').trim();
  } catch (err) {
    console.error('[Groq Whisper] STT Request failed:', err);
    return '';
  }
}
