import { Router } from 'express';
import { getTutorResponse, evaluateInterview } from '../services/geminiService.js';
import { MsEdgeTTS, OUTPUT_FORMAT } from 'msedge-tts';

const router = Router();

// Voice dictionary mapping DOAP personas to neural voices
const VOICE_MAP = {
  charon: 'en-US-AndrewMultilingualNeural',
  doap: 'en-US-AndrewMultilingualNeural',
  andrew: 'en-US-AndrewMultilingualNeural',
  brian: 'en-US-BrianNeural',
  neerja: 'en-IN-NeerjaExpressiveNeural',
  indian_female: 'en-IN-NeerjaExpressiveNeural',
  prabhat: 'en-IN-PrabhatNeural',
  indian_male: 'en-IN-PrabhatNeural',
  jenny: 'en-US-JennyNeural',
  conversational: 'en-US-JennyNeural',
  guy: 'en-US-GuyNeural',
  aria: 'en-US-AriaNeural'
};

/**
 * POST /api/ai/tutor
 * Chat with DOAP AI Tutor
 */
router.post('/tutor', async (req, res) => {
  try {
    const { message, history = [], userContext = {} } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Valid message string is required.' });
    }

    const reply = await getTutorResponse({ message, history, userContext });
    return res.json({ reply, timestamp: new Date().toISOString() });
  } catch (error) {
    console.error('[AI Tutor Route Error]', error);
    return res.status(500).json({ error: 'Failed to process AI tutor request.' });
  }
});

/**
 * POST /api/ai/evaluate-interview
 * Evaluates candidate responses from an interview session
 */
router.post('/evaluate-interview', async (req, res) => {
  try {
    const {
      positionTitle = 'Software Engineer',
      positionType = 'Technical',
      difficulty = 'Intermediate',
      answers = [],
      violations = [],
      strikeCount = 0
    } = req.body;

    const evaluation = await evaluateInterview({
      positionTitle,
      positionType,
      difficulty,
      answers,
      violations,
      strikeCount
    });

    return res.json({
      evaluation,
      evaluatedAt: new Date().toISOString()
    });
  } catch (error) {
    console.error('[AI Interview Eval Error]', error);
    return res.status(500).json({ error: 'Failed to evaluate interview.' });
  }
});

/**
 * POST /api/ai/tts
 * Synthesizes ultra-realistic, expressive human speech via Neural TTS
 */
router.post('/tts', async (req, res) => {
  try {
    const { text, voice = 'charon' } = req.body;

    if (!text || typeof text !== 'string' || !text.trim()) {
      return res.status(400).json({ error: 'Valid text string is required.' });
    }

    const cleanText = text.trim();
    const targetVoice = VOICE_MAP[voice] || voice || 'en-US-AndrewMultilingualNeural';

    const tts = new MsEdgeTTS();
    await tts.setMetadata(targetVoice, OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3);
    const { audioStream } = tts.toStream(cleanText);

    res.setHeader('Content-Type', 'audio/mpeg');
    res.setHeader('Cache-Control', 'public, max-age=3600');
    
    audioStream.pipe(res);
  } catch (error) {
    console.error('[AI TTS Route Error]', error);
    return res.status(500).json({ error: 'Speech synthesis failed' });
  }
});

export default router;

