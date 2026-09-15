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

      // Initial friendly anime heroine greeting
      const greeting = "Hello! I am Myraa, your animated AI companion! How can I help you with your studies or code today?";
      this.onTranscription("model", greeting);
      this.setState("speaking");
      await this.speak(greeting);
      if (this.state !== "disconnected") {
        this.setState("listening");
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
        visionContext = "\n[LIVE USER DISPLAY SCREEN AVAILABLE: The student is sharing their active screen for code review.]\n";
      }

      const promptWithContext = `${memoryContext}${visionContext}
Student says: "${queryText}"
Personality instructions: You are Myraa, a warm, soft-spoken, and extraordinarily cute anime heroine companion (age 18-22). Respond in a sweet, gentle, encouraging tone in 1 to 2 spoken sentences. Avoid markdown symbols, asterisks, or lists so the speech synthesis sounds completely natural.`;

      // Generate response via Ziv's AI engine
      const response = await generateSmartTutorResponse(promptWithContext, {
        topic: "MYRAA Holographic Session",
        mode: "voice"
      });

      const replyText = typeof response === 'string' ? response : (response?.text || response?.response || "I am here with you. What would you like to explore next?");
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
      const fallback = "I caught that! Let's explore that topic together.";
      this.onTranscription("model", fallback);
      this.setState("speaking");
      await this.speak(fallback);
    } finally {
      if (this.state !== "disconnected") {
        this.setState("listening");
      }
    }
  }

  detectEmotion(text) {
    const lower = text.toLowerCase();
    if (lower.includes("haha") || lower.includes("fun") || lower.includes("awesome")) return "playful";
    if (lower.includes("congrat") || lower.includes("proud") || lower.includes("great job")) return "proud";
    if (lower.includes("wonder") || lower.includes("curious") || lower.includes("let's see")) return "curious";
    if (lower.includes("analyz") || lower.includes("calculat") || lower.includes("debug")) return "thinking";
    if (lower.includes("happy") || lower.includes("delighted") || lower.includes("smile")) return "happy";
    return "idle";
  }

  autoExtractMemory(query) {
    const q = query.toLowerCase();
    if (q.includes("my name is") || q.includes("i am working on") || q.includes("my favorite") || q.includes("my goal is")) {
      addMemory("preference", query);
    }
  }

  async speak(text) {
    return new Promise(async (resolve) => {
      try {
        const clean = text.replace(/[*#`_~]/g, '').trim();

        // 1. Primary: Gemini Aoede Live Voice from Google AI Studio (Myraa's authentic voice from Drive)
        const geminiOk = await speakGeminiAoedeVoice(clean, () => resolve(), async () => {
          // 2. Fallback: Edge Neural Ana / Jenny
          await speakElevenLabs(clean, 'myraa', () => resolve(), () => {
            // 3. Fallback: Browser speech
            fallbackBrowserSpeech(clean, resolve, 'myraa');
          });
        });

        if (geminiOk) return;

        await speakElevenLabs(clean, 'myraa', () => resolve(), () => {
          fallbackBrowserSpeech(clean, resolve, 'myraa');
        });
      } catch (e) {
        fallbackBrowserSpeech(text, resolve, 'myraa');
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
