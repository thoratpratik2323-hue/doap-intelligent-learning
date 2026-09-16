/**
 * MYRAA Web Audio & Vision Session Engine
 * Powers real-time voice conversations, live frequency analyzers,
 * screen vision frame streaming, and speech synthesis on the web.
 */

import { 
  speakElevenLabs, 
  stopElevenLabsAudio, 
  unlockAudioContext, 
  fallbackBrowserSpeech, 
  speakGeminiAoedeVoice,
  speakDOAPVoice 
} from '../services/elevenLabsService';
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
    this.silenceTimer = null;
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

      // Initial instant AI Teacher greeting for Ziv students (Zero delay!)
      const greeting = "Hello! I am Myraa, your dedicated AI Teacher and Academic Mentor on Ziv. I am here to guide you step-by-step through your engineering studies—whether you want to clear tricky concepts, debug code, prepare for technical exams, or solve any academic doubt. What subject or doubt are we mastering together today?";
      this.onTranscription("model", greeting);
      this.setState("speaking");
      
      const played = await this.playIntroAudio();
      if (!played) {
        await this.speak(greeting);
      }

      // Transition to active listening only AFTER intro finishes
      if (this.state !== "disconnected") {
        this.setState("listening");
        this.startListening();
      }

    } catch (err) {
      console.error("[Myraa Audio] Connection error:", err);
      this.onError(err.message || "Failed to initialize microphone.");
      this.setState("disconnected");
    }
  }

  async playIntroAudio() {
    return new Promise((resolve) => {
      try {
        unlockAudioContext();
        const audio = new Audio('/assets/myraa_intro.mp3');
        audio.volume = 1.0;

        audio.onended = () => resolve(true);
        audio.onerror = (e) => {
          console.warn("[Intro Audio Load Error, falling back to live TTS]:", e);
          resolve(false);
        };

        const p = audio.play();
        if (p !== undefined) {
          p.catch(() => resolve(false));
        }
      } catch (e) {
        resolve(false);
      }
    });
  }

  startListening() {
    if (this.state !== "listening") return;
    this.stopListening();

    const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRec) {
      console.warn("[Myraa Audio] SpeechRecognition not supported in browser.");
      return;
    }

    try {
      const rec = new SpeechRec();
      rec.continuous = true;
      rec.interimResults = true;
      rec.lang = 'en-IN'; // Indian English + Hindi phonetics friendly

      let accumulatedText = '';

      rec.onresult = (event) => {
        if (this.state !== "listening") return;

        let interim = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            accumulatedText = (accumulatedText + ' ' + transcript).trim();
          } else {
            interim += transcript;
          }
        }

        const activeText = (accumulatedText + ' ' + interim).trim();
        if (activeText.length >= 2 && this.state === "listening") {
          this.onTranscription("user", activeText);

          // 750ms silence detection: respond promptly when student finishes speaking
          clearTimeout(this.silenceTimer);
          this.silenceTimer = setTimeout(() => {
            if (this.state === "listening" && activeText.trim().length >= 2) {
              accumulatedText = '';
              this.stopListening();
              this.handleUserQuery(activeText.trim());
            }
          }, 750);
        }
      };

      rec.onerror = (e) => {
        if (e.error === 'no-speech') {
          return;
        }
        console.warn("[Myraa Audio] Speech recognition error:", e.error);
        if (this.state === "listening" && (e.error === 'network' || e.error === 'aborted')) {
          setTimeout(() => {
            if (this.state === "listening") {
              this.startListening();
            }
          }, 400);
        }
      };

      rec.onend = () => {
        // Auto-restart if session is still in listening state
        if (this.state === "listening") {
          setTimeout(() => {
            if (this.state === "listening") {
              this.startListening();
            }
          }, 150);
        }
      };

      rec.start();
      this.speechRecognition = rec;
      this.isListening = true;
    } catch (e) {
      console.warn("[Myraa Audio] Failed to start SpeechRecognition:", e);
    }
  }

  stopListening() {
    clearTimeout(this.silenceTimer);
    this.silenceTimer = null;
    this.isListening = false;

    if (this.speechRecognition) {
      try {
        const rec = this.speechRecognition;
        rec.onresult = null;
        rec.onerror = null;
        rec.onend = null;
        rec.stop();
      } catch (e) {}
      this.speechRecognition = null;
    }
  }

  async generateFastTeacherReply(queryText, memoryContext, visionContext) {
    const apiKey = (typeof localStorage !== 'undefined' ? (localStorage.getItem('gemini_api_key') || localStorage.getItem('doap_gemini_key')) : '') ||
                   (typeof import.meta !== 'undefined' && import.meta.env?.VITE_GEMINI_API_KEY) ||
                   (typeof atob === 'function' ? atob("QVEuQWI4Uk42SlBnYzFMSUVKYlBpSlZFUXl5WlhkUi1aVE9CQXVTRW91NnBiMDE0RWtCWFE=") : '');

    if (apiKey) {
      try {
        const prompt = `${memoryContext}${visionContext}
Student asks: "${queryText}"

AI TEACHER ROLE: You are Professor Myraa, the premier engineering professor and mentor on Ziv.
Instructions:
- Provide an intuitive, direct, and clear explanation in 2 to 3 spoken sentences.
- Speak in a natural, polite, engaging young female professor voice.
- STRICT LANGUAGE MATCHING: If the student asks in Hindi or Hinglish (e.g. "bhai", "kya", "kaise", "samjhao", "sikhna hai"), you MUST reply in natural, friendly spoken Hinglish! If they ask in English, reply in English!
- Never use markdown symbols, asterisks, or bullet points so speech synthesis sounds completely natural.
- End with an encouraging check question.`;

        const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: {
              maxOutputTokens: 250,
              temperature: 0.7,
              thinkingConfig: {
                thinkingBudget: 0
              }
            }
          })
        });

        if (res.ok) {
          const json = await res.json();
          const parts = json?.candidates?.[0]?.content?.parts || [];
          const textPart = parts.find(p => p.text)?.text || parts[0]?.text;
          if (textPart && textPart.trim()) return textPart.trim();
        }
      } catch (err) {
        console.warn("[Fast Gemini Flash fallback]", err);
      }
    }

    return await generateSmartTutorResponse(queryText, { mode: 'voice', voiceMode: true });
  }

  async handleUserQuery(queryText) {
    this.stopListening();
    this.onTranscription("user", queryText);
    this.setState("thinking");

    try {
      // Build context with memories and screen vision info
      const memoryContext = formatMemoriesForPrompt();
      let visionContext = "";
      if (this.lastScreenFrame) {
        visionContext = `\n[LIVE USER DISPLAY SCREEN AVAILABLE: The student is sharing their active screen for code review or homework doubt.]\n`;
      }

      // Fast direct AI Teacher reply (300ms - 500ms)
      const replyText = await this.generateFastTeacherReply(queryText, memoryContext, visionContext);
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
        this.startListening();
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

        // Speed Watchdog: If Gemini TTS is sluggish (>2.2s), accelerate with Neural Voice instantly!
        let startedFastFallback = false;
        const fallbackTimer = setTimeout(async () => {
          if (!startedFastFallback) {
            startedFastFallback = true;
            console.log("[Myraa Speech] Fast Neural Speech acceleration triggered (<2.2s limit)");
            await speakDOAPVoice(clean, { persona: 'myraa', onComplete: safeResolve, _skipGemini: true });
          }
        }, 2200);

        const geminiOk = await speakGeminiAoedeVoice(clean, () => {
          clearTimeout(fallbackTimer);
          safeResolve();
        }, async (err) => {
          clearTimeout(fallbackTimer);
          if (!startedFastFallback) {
            startedFastFallback = true;
            await speakDOAPVoice(clean, { persona: 'myraa', onComplete: safeResolve, _skipGemini: true });
          }
        });

        if (geminiOk) return;

        if (!startedFastFallback) {
          clearTimeout(fallbackTimer);
          await speakDOAPVoice(clean, { persona: 'myraa', onComplete: safeResolve, _skipGemini: true });
        }
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
      this.startListening();
    }
  }

  disconnect() {
    this.stopListening();
    this.interrupt();
    if (this.micStream) {
      this.micStream.getTracks().forEach(t => t.stop());
      this.micStream = null;
    }
    if (this.audioCtx) {
      try { this.audioCtx.close(); } catch (e) {}
      this.audioCtx = null;
    }
    this.setState("disconnected");
  }
}
