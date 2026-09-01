import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables (.env from project root)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

import aiRoutes from './routes/ai.js';
import codeRoutes from './routes/code.js';
import studyRoutes from './routes/study.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  console.log(`[DOAP API] ${req.method} ${req.url}`);
  next();
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    app: 'DOAP Backend Service',
    uptimeSeconds: Math.floor(process.uptime()),
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use('/api/ai', aiRoutes);
app.use('/api/code', codeRoutes);
app.use('/api/study-plan', studyRoutes);

// 404 Handler for unmatched API routes
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found.' });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('[DOAP Server Error]', err);
  res.status(500).json({ error: 'Internal server error.' });
});

app.listen(PORT, () => {
  console.log(`\n==========================================`);
  console.log(`🚀 DOAP Backend Server active on http://localhost:${PORT}`);
  console.log(`🤖 AI Engine: ${process.env.GEMINI_API_KEY ? 'Gemini 2.5 Live' : 'Smart Offline Fallback'}`);
  console.log(`==========================================\n`);
});
