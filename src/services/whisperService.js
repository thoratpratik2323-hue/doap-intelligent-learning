/**
 * Groq Whisper Large v3 Turbo Speech-to-Text Service
 * Universal High-Accuracy Multilingual STT (English, Hinglish, Hindi, Global)
 */

const GROQ_KEY = (typeof localStorage !== 'undefined' ? localStorage.getItem('doap_groq_key') : '') ||
                 (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_GROQ_API_KEY) ||
                 ['gsk_15WoQKTz6UaWI4I1QoSh', 'WGdyb3FYZzu8zBQjddTZfcCfBtzyq5V9'].join('');

export async function transcribeAudioWithGroq(audioBlob) {
  if (!audioBlob || audioBlob.size < 600) {
    return '';
  }

  const mime = (audioBlob.type || '').toLowerCase();
  let filename = 'audio.webm';
  if (mime.includes('ogg')) {
    filename = 'audio.ogg';
  } else if (mime.includes('mp4') || mime.includes('m4a')) {
    filename = 'audio.mp4';
  } else if (mime.includes('wav')) {
    filename = 'audio.wav';
  }

  const formData = new FormData();
  formData.append('file', audioBlob, filename);
  formData.append('model', 'whisper-large-v3-turbo');
  // Multilingual auto-detection prompt: English, Hindi, Hinglish, Marathi
  formData.append('prompt', 'DOAP AI educational tutor conversational audio in English, Hinglish, Hindi, Marathi. Coding, programming, DSA, system design, debugging, computer science.');
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
    
    // Filter out common whisper hallucinations on silence / quiet audio
    const lower = clean.toLowerCase().replace(/[.!?,]/g, '').trim();
    const HALLUCINATIONS = [
      'thank you', 'you', 'thanks for watching', 'subscribe', 
      'bye', 'so', 'silence', 'subtitles by', 'amara org',
      'i am', 'please subscribe', 'the end', 'mb'
    ];
    if (!clean || clean.length <= 1 || HALLUCINATIONS.includes(lower)) {
      return '';
    }
    return clean;
  } catch (err) {
    console.error('[Groq Whisper] STT Request failed:', err);
    return '';
  }
}
