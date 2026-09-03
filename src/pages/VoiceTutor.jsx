import React, { useState, useEffect, useRef } from 'react';
import { 
  Mic, 
  MicOff, 
  Phone, 
  PhoneOff, 
  MessageSquare, 
  Clock, 
  Sparkles,
  Zap 
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { generateSmartTutorResponse } from '../services/aiTutorEngine';
import { speakElevenLabs, stopElevenLabsAudio, unlockAudioContext } from '../services/elevenLabsService';

// DOAP AI Acoustic Sound Synthesizers (Web Audio API)
const playBootChime = () => {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const now = ctx.currentTime;

    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(110, now);
    osc1.frequency.exponentialRampToValueAtTime(320, now + 0.35);
    gain1.gain.setValueAtTime(0.25, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(now);
    osc1.stop(now + 0.5);

    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(520, now + 0.12);
    osc2.frequency.exponentialRampToValueAtTime(1040, now + 0.45);
    gain2.gain.setValueAtTime(0.2, now + 0.12);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.75);
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(now + 0.12);
    osc2.stop(now + 0.75);
  } catch(e) {}
};

const playShutdownChime = () => {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(440, now);
    osc.frequency.exponentialRampToValueAtTime(110, now + 0.35);
    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.35);
  } catch(e) {}
};

export const VoiceTutor = () => {
  const { isDarkMode, activeAccentHex, navigateTo } = useTheme();
  const { profile } = useAuth();
  const accentHex = activeAccentHex || 'var(--doap-accent, #ffffff)';
  const userName = profile?.name ? profile.name.split(' ')[0] : 'there';

  // Call States: 'idle' | 'listening' | 'thinking' | 'speaking'
  const [callState, setCallState] = useState('idle');
  const [isCallActive, setIsCallActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [callDuration, setCallDuration] = useState(0);

  const [userTranscript, setUserTranscript] = useState('');
  const [aiSpokenText, setAiSpokenText] = useState('');
  const [isSpeechSupported, setIsSpeechSupported] = useState(true);

  const recognitionRef = useRef(null);
  const synthRef = useRef(typeof window !== 'undefined' ? window.speechSynthesis : null);
  const durationTimerRef = useRef(null);
  const isMountedRef = useRef(true);

  // Initialize Speech Recognition
  useEffect(() => {
    isMountedRef.current = true;
    const SpeechRecognition = typeof window !== 'undefined' && 
      (window.SpeechRecognition || window.webkitSpeechRecognition);

    if (!SpeechRecognition) {
      setIsSpeechSupported(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onresult = (event) => {
      let interim = '';
      let final = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const text = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          final += text + ' ';
        } else {
          interim += text;
        }
      }

      const fullSpoken = (final || interim).trim();
      if (fullSpoken) {
        setUserTranscript(fullSpoken);
      }

      if (final.trim().length > 3) {
        handleUserSpeechComplete(final.trim());
      }
    };

    recognition.onerror = (e) => {
      console.warn("Voice Recognition event:", e.error);
      if (e.error === 'not-allowed' || e.error === 'service-not-allowed') {
        setIsSpeechSupported(false);
      }
    };

    recognitionRef.current = recognition;

    return () => {
      isMountedRef.current = false;
      if (recognitionRef.current) {
        try { recognitionRef.current.stop(); } catch(err){}
      }
      if (synthRef.current) {
        synthRef.current.cancel();
      }
      stopElevenLabsAudio();
    };
  }, []);

  // Call Stopwatch
  useEffect(() => {
    if (isCallActive) {
      setCallDuration(0);
      durationTimerRef.current = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    } else {
      if (durationTimerRef.current) clearInterval(durationTimerRef.current);
    }

    return () => {
      if (durationTimerRef.current) clearInterval(durationTimerRef.current);
    };
  }, [isCallActive]);

  const formatDuration = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleStartCall = async () => {
    unlockAudioContext();
    playBootChime();
    setIsCallActive(true);
    setCallState('listening');
    setUserTranscript('');
    setAiSpokenText('');

    const welcome = `Hello ${userName}! DOAP AI is online. I'm ready to listen and answer anything hands-free.`;
    setAiSpokenText(welcome);

    speakResponse(welcome, () => {
      if (isMountedRef.current && !isMuted) {
        startListening();
      }
    });
  };

  const handleEndCall = () => {
    playShutdownChime();
    setIsCallActive(false);
    setCallState('idle');
    stopListening();
    stopElevenLabsAudio();
    if (synthRef.current) synthRef.current.cancel();
    setUserTranscript('');
  };

  const startListening = () => {
    if (!recognitionRef.current || isMuted) return;
    try {
      setCallState('listening');
      recognitionRef.current.start();
    } catch(err) {}
  };

  const stopListening = () => {
    if (!recognitionRef.current) return;
    try {
      recognitionRef.current.stop();
    } catch(err) {}
  };

  const executeVoicePlugins = (cmd) => {
    const cleanCmd = cmd.toLowerCase().trim();
    if (cleanCmd.includes('open coding') || cleanCmd.includes('go to coding') || cleanCmd.includes('coding practice')) {
      navigateTo('/coding');
      return "Navigating to Coding Practice.";
    }
    if (cleanCmd.includes('open learning') || cleanCmd.includes('my learning') || cleanCmd.includes('open courses')) {
      navigateTo('/learning');
      return "Opening My Learning engineering modules.";
    }
    if (cleanCmd.includes('open assessment') || cleanCmd.includes('open test') || cleanCmd.includes('assessments')) {
      navigateTo('/assessments');
      return "Opening Assessments & Live Benchmark Exams.";
    }
    if (cleanCmd.includes('open chat') || cleanCmd.includes('text ai') || cleanCmd.includes('switch to text')) {
      navigateTo('/ai-tutor');
      return "Switching to DOAP Text AI Tutor.";
    }
    return null;
  };

  const handleUserSpeechComplete = async (spokenPrompt) => {
    if (!spokenPrompt || !isMountedRef.current) return;
    stopListening();
    setCallState('thinking');
    setUserTranscript('');

    const actionResult = executeVoicePlugins(spokenPrompt);
    if (actionResult) {
      setAiSpokenText(actionResult);
      speakResponse(actionResult, () => {
        if (isMountedRef.current && isCallActive && !isMuted) {
          startListening();
        }
      });
      return;
    }

    try {
      const response = await generateSmartTutorResponse(spokenPrompt, userName);
      const speechCleaned = response
        .replace(/```[\s\S]*?```/g, 'Code block generated.')
        .replace(/`([^`]+)`/g, '$1')
        .replace(/[#*_~>]/g, '')
        .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1')
        .trim();

      setAiSpokenText(speechCleaned);

      speakResponse(speechCleaned, () => {
        if (isMountedRef.current && isCallActive && !isMuted) {
          startListening();
        }
      });
    } catch (err) {
      const fallback = "I understood your query. Let's explore that deeper—could you tell me more?";
      speakResponse(fallback, () => {
        if (isMountedRef.current && isCallActive) {
          startListening();
        }
      });
    }
  };

  // Voice playback using user's ElevenLabs voice 9PvnT6XRzlljoaDG6Knu
  const speakResponse = async (text, onComplete) => {
    setCallState('speaking');
    stopElevenLabsAudio();
    if (synthRef.current) synthRef.current.cancel();

    try {
      await speakElevenLabs(
        text, 
        'doap',
        () => {
          if (onComplete && isMountedRef.current) onComplete();
        },
        () => {
          fallbackBrowserSpeech(text, onComplete);
        }
      );
    } catch (err) {
      fallbackBrowserSpeech(text, onComplete);
    }
  };

  const fallbackBrowserSpeech = (text, onComplete) => {
    if (!synthRef.current) {
      setCallState('listening');
      if (onComplete) onComplete();
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.lang = 'en-IN';

    try {
      const voices = synthRef.current.getVoices();
      const indianVoice = voices.find(v => 
        v.name.includes('Ravi') || 
        v.name.includes('Heera') || 
        v.lang === 'en-IN' || 
        v.lang === 'hi-IN' || 
        v.name.includes('India')
      );
      if (indianVoice) {
        utterance.voice = indianVoice;
      }
    } catch (e) {}

    utterance.onend = () => {
      if (onComplete && isMountedRef.current) onComplete();
    };

    utterance.onerror = () => {
      if (onComplete && isMountedRef.current) onComplete();
    };

    synthRef.current.speak(utterance);
  };

  const toggleMute = () => {
    if (isMuted) {
      setIsMuted(false);
      startListening();
    } else {
      setIsMuted(true);
      stopListening();
      stopElevenLabsAudio();
      if (synthRef.current) synthRef.current.cancel();
      setCallState('idle');
    }
  };

  return (
    <div className="h-full w-full flex-1 flex flex-col justify-between p-4 sm:p-8 select-none bg-[#05070c] text-white animate-fade-in relative overflow-hidden">
      {/* 1. Clean Minimal Top Bar: "DOAP AI" */}
      <div className="flex items-center justify-between z-20 pb-3 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-sm font-bold tracking-wide">
            <span className={`w-2.5 h-2.5 rounded-full bg-cyan-400 ${isCallActive ? "animate-ping" : ""}`} />
            <span>DOAP AI</span>
          </div>

          {isCallActive && (
            <span className="text-xs font-mono text-cyan-300 flex items-center gap-1.5 bg-cyan-950/50 px-3 py-1 rounded-full border border-cyan-500/30">
              <Clock size={12} /> {formatDuration(callDuration)}
            </span>
          )}
        </div>

        {/* Switch to Text AI Chat */}
        <button
          onClick={() => navigateTo('/ai-tutor')}
          className="px-4 py-2 rounded-xl text-xs font-semibold border border-white/15 bg-white/5 hover:bg-white/10 transition-all flex items-center gap-2 cursor-pointer hover:scale-105"
        >
          <MessageSquare size={14} className="text-cyan-400" />
          <span>Text AI Chat</span>
        </button>
      </div>

      {/* 2. Main Expansive Arc-Reactor Core (Maximum Screen Area) */}
      <div className="flex-1 flex flex-col items-center justify-center relative my-auto overflow-hidden">
        {/* Hypnotic Ambient Radial Glow */}
        <div 
          className="absolute w-[500px] h-[500px] rounded-full blur-3xl opacity-25 pointer-events-none transition-all duration-700"
          style={{
            backgroundColor: callState === 'speaking' ? '#06b6d4' : callState === 'listening' ? '#3b82f6' : callState === 'thinking' ? '#f59e0b' : '#6366f1',
            transform: isCallActive ? 'scale(1.4)' : 'scale(0.85)'
          }}
        />

        {/* Status Pill */}
        <div className="mb-8 z-10">
          <div className={`px-5 py-2 rounded-full text-xs font-mono font-bold border flex items-center gap-2.5 transition-all shadow-md ${
            isCallActive 
              ? (callState === 'speaking' ? 'bg-cyan-500/10 border-cyan-500/40 text-cyan-400' : callState === 'listening' ? 'bg-blue-500/10 border-blue-500/40 text-blue-400' : 'bg-amber-500/10 border-amber-500/40 text-amber-400')
              : 'bg-neutral-900 border-neutral-800 text-neutral-400'
          }`}>
            <span className={`w-2 h-2 rounded-full ${
              isCallActive ? (callState === 'speaking' ? 'bg-cyan-400 animate-pulse' : callState === 'listening' ? 'bg-blue-400 animate-ping' : 'bg-amber-400 animate-bounce') : 'bg-neutral-600'
            }`} />
            <span>
              {!isCallActive 
                ? 'DOAP AI READY — TAP TO CALL' 
                : callState === 'speaking' 
                ? 'DOAP AI SPEAKING...' 
                : callState === 'listening' 
                ? 'LISTENING TO YOUR VOICE...' 
                : 'THINKING...'}
            </span>
          </div>
        </div>

        {/* Rotating Concentric Arc-Reactor Rings */}
        <div className="relative flex items-center justify-center my-4 z-10">
          <div 
            className="absolute w-80 h-80 sm:w-96 sm:h-96 rounded-full border border-dashed border-cyan-500/30 pointer-events-none transition-all duration-700"
            style={{ 
              animation: isCallActive ? 'spin 14s linear infinite' : 'none',
              borderColor: isCallActive ? 'rgba(6,182,212,0.5)' : 'rgba(255,255,255,0.1)'
            }}
          />

          <div 
            className="absolute w-68 h-68 sm:w-80 sm:h-80 rounded-full border border-cyan-400/20 pointer-events-none transition-all duration-700"
            style={{ 
              animation: isCallActive ? 'spin 9s linear infinite reverse' : 'none'
            }}
          />

          {isCallActive && (
            <div 
              className="absolute w-56 h-56 sm:w-68 sm:h-68 rounded-full border-2 border-cyan-400/40 animate-ping pointer-events-none"
              style={{ animationDuration: callState === 'speaking' ? '1.2s' : '2.4s' }}
            />
          )}

          {/* Central Glowing Reactor Core Button */}
          <button
            onClick={isCallActive ? handleEndCall : handleStartCall}
            className={`w-44 h-44 sm:w-48 sm:h-48 rounded-full flex flex-col items-center justify-center cursor-pointer transition-all duration-500 shadow-2xl hover:scale-105 active:scale-95 z-20 ${
              isCallActive 
                ? 'bg-gradient-to-tr from-cyan-600 to-blue-500 text-white ring-8 ring-cyan-500/20 shadow-cyan-500/50' 
                : 'bg-neutral-900 text-white hover:bg-neutral-800 ring-8 ring-white/5 border border-white/20'
            }`}
          >
            {isCallActive ? (
              <>
                <PhoneOff size={42} className="animate-pulse" />
                <span className="text-xs font-mono font-bold mt-2 uppercase tracking-wider text-cyan-100">End Call</span>
              </>
            ) : (
              <>
                <Phone size={42} className="text-cyan-400" />
                <span className="text-xs font-mono font-bold mt-2 uppercase tracking-wider text-cyan-400">Start Call</span>
              </>
            )}
          </button>
        </div>

        {/* Live Audio Equalizer Wave Bars */}
        {isCallActive && (
          <div className="flex items-center gap-2 mt-6 h-9 z-10">
            {[35, 65, 90, 55, 80, 100, 70, 45, 85, 60, 40].map((h, i) => (
              <div 
                key={i} 
                className="w-1.5 rounded-full bg-cyan-400 transition-all duration-150"
                style={{
                  height: callState === 'speaking' ? `${(h * (Math.sin(Date.now() / 200 + i) + 1.2)) / 2}%` : callState === 'listening' ? `${h * 0.35}%` : '4px',
                  opacity: callState === 'speaking' ? 0.95 : 0.4
                }}
              />
            ))}
          </div>
        )}

        {/* Live Subtitles & Captions */}
        <div className="w-full max-w-3xl text-center mt-8 min-h-[60px] flex items-center justify-center z-10 px-4">
          {userTranscript ? (
            <p className="text-base sm:text-lg font-medium text-cyan-200 italic animate-fade-in bg-cyan-950/40 px-6 py-3 rounded-2xl border border-cyan-500/30 shadow-lg">
              "{userTranscript}"
            </p>
          ) : aiSpokenText ? (
            <p className="text-sm sm:text-base font-medium text-neutral-200 line-clamp-3 px-6 py-3 rounded-2xl bg-black/70 border border-neutral-800 shadow-lg leading-relaxed">
              {aiSpokenText}
            </p>
          ) : (
            <p className="text-xs font-mono text-neutral-500">
              {isCallActive ? "Speak naturally — say 'Open Coding' or ask any engineering question" : "Tap Start Call for hands-free interactive voice with DOAP AI"}
            </p>
          )}
        </div>

        {/* Floating In-Call Mute Button */}
        {isCallActive && (
          <div className="flex items-center gap-4 mt-8 z-10 animate-fade-in">
            <button
              onClick={toggleMute}
              className={`p-3.5 rounded-full border transition-all cursor-pointer flex items-center gap-2 text-xs font-semibold ${
                isMuted 
                  ? 'bg-rose-500/20 border-rose-500/40 text-rose-300' 
                  : 'bg-neutral-900 border-neutral-700 text-neutral-300 hover:text-white hover:border-white/30'
              }`}
            >
              {isMuted ? <MicOff size={18} /> : <Mic size={18} />}
              <span>{isMuted ? 'Muted' : 'Mic Active'}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
