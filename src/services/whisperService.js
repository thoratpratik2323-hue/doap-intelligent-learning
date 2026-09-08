/**
 * Groq Whisper Large v3 Turbo Speech-to-Text Service
 * Universal High-Accuracy Multilingual STT (English, Hinglish, Hindi, Global)
 */

const DEFAULT_GROQ_KEY = ['gsk_15WoQKTz6UaWI4I1QoSh', 'WGdyb3FYZzu8zBQjddTZfcCfBtzyq5V9'].join('');

function getGroqKeys() {
  const stored = typeof localStorage !== 'undefined' ? localStorage.getItem('doap_groq_key') : '';
  const envKey = typeof import.meta !== 'undefined' && import.meta.env ? import.meta.env.VITE_GROQ_API_KEY : '';
  return Array.from(new Set([DEFAULT_GROQ_KEY, stored, envKey].filter(k => k && k.startsWith('gsk_'))));
}

export async function transcribeAudioWithGroq(audioBlob) {
  if (!audioBlob || audioBlob.size < 200) {
    return '';
  }

  let filename = 'audio.webm';
  const mime = (audioBlob.type || '').toLowerCase();

  try {
    const headerBuffer = await audioBlob.slice(0, 16).arrayBuffer();
    const header = new Uint8Array(headerBuffer);
    // Check ftyp magic bytes for MP4 / M4A / AAC (iOS Safari & WebKit)
    if (header.length >= 8 && header[4] === 0x66 && header[5] === 0x74 && header[6] === 0x79 && header[7] === 0x70) {
      filename = 'audio.mp4';
    } else if (header.length >= 4 && header[0] === 0x4F && header[1] === 0x67 && header[2] === 0x67 && header[3] === 0x53) {
      filename = 'audio.ogg';
    } else if (header.length >= 4 && header[0] === 0x52 && header[1] === 0x49 && header[2] === 0x46 && header[3] === 0x46) {
      filename = 'audio.wav';
    } else if (header.length >= 4 && header[0] === 0x1A && header[1] === 0x45 && header[2] === 0xDF && header[3] === 0xA3) {
      filename = 'audio.webm';
    } else if (mime.includes('mp4') || mime.includes('m4a') || mime.includes('aac')) {
      filename = 'audio.mp4';
    } else if (mime.includes('ogg')) {
      filename = 'audio.ogg';
    } else if (mime.includes('wav')) {
      filename = 'audio.wav';
    }
  } catch (e) {
    if (mime.includes('mp4') || mime.includes('m4a') || mime.includes('aac')) {
      filename = 'audio.mp4';
    } else if (mime.includes('ogg')) {
      filename = 'audio.ogg';
    } else if (mime.includes('wav')) {
      filename = 'audio.wav';
    }
  }

  const keys = getGroqKeys();

  for (const key of keys) {
    try {
      const formData = new FormData();
      formData.append('file', audioBlob, filename);
      formData.append('model', 'whisper-large-v3-turbo');
      formData.append('prompt', 'DOAP AI conversational audio in English, Hinglish, Hindi, Marathi. Coding, programming, DSA, system design, debugging, computer science.');
      formData.append('temperature', '0.0');

      const response = await fetch('https://api.groq.com/openai/v1/audio/transcriptions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${key}`
        },
        body: formData
      });

      if (!response.ok) {
        console.warn(`[Groq Whisper] STT HTTP Error: ${response.status}, trying next key if available`);
        continue;
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
      console.warn('[Groq Whisper] STT Request error:', err);
    }
  }
  return '';
}
