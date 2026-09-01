import { Router } from 'express';
import { getTutorResponse, evaluateInterview } from '../services/geminiService.js';

const router = Router();

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

export default router;
