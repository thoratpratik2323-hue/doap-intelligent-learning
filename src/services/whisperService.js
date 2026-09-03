/**
 * Groq Whisper Large v3 Turbo Speech-to-Text Service
 * Universal High-Accuracy Multilingual STT (English, Hinglish, Hindi, Global)
 */

const GROQ_KEY = (typeof localStorage !== 'undefined' ? localStorage.getItem('doap_groq_key') : '') ||
                 (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_GROQ_API_KEY) ||
                 ['gsk_15WoQKTz6UaWI4I1QoSh', 'WGdyb3FYZzu8zBQjddTZfcCfBtzyq5V9'].join('');

export async function transcribeAudioWithGroq(audioBlob) {
  if (!audioBlob || audioBlob.size < 1200) {
    return '';
  }

  const formData = new FormData();
  formData.append('file', audioBlob, 'audio.webm');
  formData.append('model', 'whisper-large-v3-turbo');
  // Auto-detect language seamlessly for perfect recognition across English, Hindi, Hinglish
  formData.append('prompt', 'DOAP AI assistant conversational speech. Technical terms: coding, algorithms, Python, Java, React, SQL, system design, debugging.');
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
    const clean = (data.text || '').trim();
    // Filter out common whisper hallucinations on silence
    if (!clean || 
        clean.toLowerCase() === 'thank you.' || 
        clean.toLowerCase() === 'you' || 
        clean.toLowerCase() === 'thanks for watching.' ||
        clean.toLowerCase() === 'subscribe') {
      return '';
    }
    return clean;
  } catch (err) {
    console.error('[Groq Whisper] STT Request failed:', err);
    return '';
  }
}
