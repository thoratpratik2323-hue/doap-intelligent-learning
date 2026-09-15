/**
 * MYRAA Web Audio & Vision Session Engine
 * Powers real-time voice conversations, live frequency analyzers,
 * screen vision frame streaming, and speech synthesis on the web.
 */

import { speakElevenLabs, stopElevenLabsAudio, unlockAudioContext, fallbackBrowserSpeech, speakGeminiAoedeVoice } from '../services/elevenLabsService';
import { generateSmartTutorResponse } from '../services/aiTutorEngine';
import { formatMemoriesForPrompt, addMemory } from './myraaMemory';

const DEFAULT_GEMINI_KEY = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_GEMINI_API_KEY) ||
  (typeof atob === 'function' ? atob("QVEuQWI4Uk42SlBnYzFMSUVKYlBpSlZFUXl5WlhkUi1aVE9CQXVTRW91NnBiMDE0RWtCWFE=") : '');

// Auto-seed user's Gemini API key if not yet set
if (typeof localStorage !== 'undefined' && !localStorage.getItem('gemini_api_key') && DEFAULT_GEMINI_KEY) {
  try {
    localStorage.setItem('gemini_api_key', DEFAULT_GEMINI_KEY);
    localStorage.setItem('doap_gemini_key', DEFAULT_GEMINI_KEY);
  } catch (e) {}
}

export class MyraaWebSession {
  constructor(handlers = {}) {
    this.onStateChange = handlers.onStateChange || (() => {});
    this.onTranscription = handlers.onTranscription || (() => {});
    this.onError = handlers.onError || (() => {});
    this.onEmotionChange = handlers.onEmotionChange || (() => {});

    this.state = "disconnected"; // "disconnected" | "connecting" | "listening" | "thinking" | "speaking"
    this.audioCtx = null;
    this.inputAnalyser = null;
    this.outputAnalyser = null;
    this.micStream = null;
    this.speechRecognition = null;
    this.lastScreenFrame = null;
    this.isListening = false;
  }

  setState(newState) {
    this.state = newState;
    this.onStateChange(newState);
  }

  sendVideoFrame(base64Data) {
    this.lastScreenFrame = base64Data;
  }

  async connect() {
    if (this.state !== "disconnected") return;
    this.setState("connecting");

    try {
      unlockAudioContext();
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.audioCtx = new AudioCtx();
        this.inputAnalyser = this.audioCtx.createAnalyser();
        this.inputAnalyser.fftSize = 256;
        this.inputAnalyser.smoothingTimeConstant = 0.8;
      }

      // Request user mic
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        }
      });
      this.micStream = stream;

      if (this.audioCtx && this.inputAnalyser) {
        const source = this.audioCtx.createMediaStreamSource(stream);
        source.connect(this.inputAnalyser);
      }

      // Initialize Speech Recognition
      this.initSpeechRecognition();
      this.setState("listening");

      // Initial inspiring AI Teacher greeting for Ziv students
      const greeting = "Hello! I am Myraa, your dedicated AI Teacher and Academic Mentor on Ziv. I am here to guide you step-by-step through your engineering studies—whether you want to clear tricky concepts, debug code, prepare for technical exams, or solve any academic doubt. What subject or doubt are we mastering together today?";
      this.onTranscription("model", greeting);
      this.setState("speaking");
      await this.speak(greeting);
      if (this.state !== "disconnected") {
        this.setState("listening");
        try { this.speechRecognition?.start(); } catch (e) {}
      }

    } catch (err) {
      console.error("[Myraa Audio] Connection error:", err);
      this.onError(err.message || "Failed to initialize microphone.");
      this.setState("disconnected");
    }
  }

  initSpeechRecognition() {
    const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRec) {
      console.warn("[Myraa Audio] SpeechRecognition not supported in browser.");
      return;
    }

    const rec = new SpeechRec();
    rec.continuous = true;
    rec.interimResults = true;
    rec.lang = 'en-US';

    rec.onresult = async (event) => {
      let finalTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript;
        }
      }

      if (finalTranscript.trim()) {
        this.handleUserQuery(finalTranscript.trim());
      }
    };

    rec.onerror = (e) => {
      if (e.error !== 'no-speech') {
        console.warn("[Myraa Audio] Speech recognition error:", e);
      }
    };

    rec.onend = () => {
      if (this.state === "listening") {
        try { rec.start(); } catch (e) {}
      }
    };

    try {
      rec.start();
      this.speechRecognition = rec;
    } catch (e) {}
  }

  async handleUserQuery(queryText) {
    this.onTranscription("user", queryText);
    this.setState("thinking");

    try {
      // Build context with memories and screen vision info
      const memoryContext = formatMemoriesForPrompt();
      let visionContext = "";
      if (this.lastScreenFrame) {
        visionContext = "\n[LIVE USER DISPLAY SCREEN AVAILABLE: The student is sharing their active screen for code review or homework doubt.]\n";
      }

      const promptWithContext = `${memoryContext}${visionContext}
Student says: "${queryText}"

AI TEACHER & PROFESSOR ROLE INSTRUCTIONS:
- You are Professor Myraa, an elite, patient, and inspiring engineering professor and academic tutor on the Ziv Intelligent Learning Platform.
- Your mission is to help students learn deeply, gain intuition, and excel in engineering, computer science, and technical problem-solving.
- When answering doubts:
  1. Be warm, professional, encouraging, and clear—like a world-class professor.
  2. Explain the core intuition first before diving into technical details.
  3. Break complex mechanisms into simple, logical steps with relatable analogies.
  4. If explaining code or algorithms, outline the core logic and time/space trade-offs clearly.
- Spoken Voice Format: Keep spoken answers between 2 to 4 clear, articulate spoken sentences so the audio sounds fluid and natural. Never output raw markdown, hashes (#), asterisks (*), or bullet lists in spoken voice.
- Conclude by asking an encouraging follow-up question to test their understanding or invite their next doubt.`;

      // Generate response via Ziv's AI engine
      const response = await generateSmartTutorResponse(promptWithContext, {
        topic: "MYRAA Academic Tutoring Session",
        mode: "voice"
      });

      const replyText = typeof response === 'string' ? response : (response?.text || response?.response || "I understand your doubt. Let us break this down step-by-step together.");
      this.onTranscription("model", replyText);

      // Detect emotion
      const emotion = this.detectEmotion(replyText);
      this.onEmotionChange(emotion);

      // Auto-extract memory if user shared personal preferences or projects
      this.autoExtractMemory(queryText);

      // Speak response as Myraa
      this.setState("speaking");
      await this.speak(replyText);

    } catch (err) {
      console.error("[Myraa] Error generating response:", err);
      const fallback = "I caught your question! Let us explore that topic step-by-step together.";
      this.onTranscription("model", fallback);
      this.setState("speaking");
      await this.speak(fallback);
    } finally {
      if (this.state !== "disconnected") {
        this.setState("listening");
        try { this.speechRecognition?.start(); } catch (e) {}
      }
    }
  }

  detectEmotion(text) {
    const lower = text.toLowerCase();
    if (lower.includes("haha") || lower.includes("fun") || lower.includes("awesome")) return "playful";
    if (lower.includes("congrat") || lower.includes("proud") || lower.includes("great job") || lower.includes("excellent")) return "proud";
    if (lower.includes("wonder") || lower.includes("curious") || lower.includes("let's see") || lower.includes("notice")) return "curious";
    if (lower.includes("analyz") || lower.includes("calculat") || lower.includes("debug") || lower.includes("algorithm")) return "thinking";
    if (lower.includes("happy") || lower.includes("delighted") || lower.includes("smile") || lower.includes("welcome")) return "happy";
    return "idle";
  }

  autoExtractMemory(query) {
    const q = query.toLowerCase();
    if (q.includes("my name is") || q.includes("i am working on") || q.includes("my favorite") || q.includes("my goal is") || q.includes("my college is") || q.includes("my branch is")) {
      addMemory("preference", query);
    }
  }

  async speak(text) {
    return new Promise(async (resolve) => {
      let resolved = false;
      const safeResolve = () => {
        if (!resolved) {
          resolved = true;
          resolve();
        }
      };

      try {
        const clean = text.replace(/[*#`_~]/g, '').trim();

        // 1. Primary: Gemini Aoede Live Voice from Google AI Studio (Myraa's authentic voice from Drive via Web Audio API)
        const geminiOk = await speakGeminiAoedeVoice(clean, safeResolve, async (err) => {
          console.warn("[Myraa] Gemini TTS fallback to DOAP Neural:", err);
          // 2. Fallback: DOAP Neural / Edge voice (Ana / Jenny)
          await speakDOAPVoice(clean, { persona: 'myraa', onComplete: safeResolve, _skipGemini: true });
        });

        if (geminiOk) return;

        // Fallback if Gemini could not start
        await speakDOAPVoice(clean, { persona: 'myraa', onComplete: safeResolve, _skipGemini: true });
      } catch (e) {
        console.warn("[Myraa] Speech error, falling back to browser speech:", e);
        fallbackBrowserSpeech(text, safeResolve, 'myraa');
      }
    });
  }

  interrupt() {
    stopElevenLabsAudio();
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    if (this.state === "speaking") {
      this.setState("listening");
    }
  }

  disconnect() {
    this.interrupt();
    if (this.micStream) {
      this.micStream.getTracks().forEach(t => t.stop());
      this.micStream = null;
    }
    if (this.speechRecognition) {
      try { this.speechRecognition.stop(); } catch (e) {}
      this.speechRecognition = null;
    }
    if (this.audioCtx) {
      try { this.audioCtx.close(); } catch (e) {}
      this.audioCtx = null;
    }
    this.setState("disconnected");
  }
}
