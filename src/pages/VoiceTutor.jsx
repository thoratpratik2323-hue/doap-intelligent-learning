import React, { useState, useEffect, useRef } from 'react';
import { 
  Mic, 
  MicOff, 
  Phone, 
  PhoneOff, 
  Sparkles, 
  MessageSquare, 
  Radio, 
  Send, 
  Clock, 
  ArrowRight, 
  Headphones, 
  Maximize2, 
  Minimize2, 
  Cpu, 
  Activity, 
  ShieldCheck, 
  Zap 
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { generateSmartTutorResponse } from '../services/aiTutorEngine';
import { speakElevenLabs, stopElevenLabsAudio } from '../services/elevenLabsService';

// Mark-LII Acoustic Sound Synthesizers (Web Audio API)
const playBootChime = () => {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const now = ctx.currentTime;

    // Harmonic Bass Pulse
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

    // Arc-Reactor High Energy Resonance
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
  const [isHudFullscreen, setIsHudFullscreen] = useState(false);

  const [userTranscript, setUserTranscript] = useState('');
  const [aiSpokenText, setAiSpokenText] = useState('');
  const [conversationLogs, setConversationLogs] = useState([]);
  const [manualInput, setManualInput] = useState('');
  const [isSpeechSupported, setIsSpeechSupported] = useState(true);
  const [selectedVoicePersona, setSelectedVoicePersona] = useState('aria'); // 'aria' | 'jenny' | 'samantha'

  const recognitionRef = useRef(null);
  const synthRef = useRef(typeof window !== 'undefined' ? window.speechSynthesis : null);
  const durationTimerRef = useRef(null);
  const isMountedRef = useRef(true);

  const QUICK_VOICE_TOPICS = [
    { title: "Explain Dynamic Programming", prompt: "Explain Dynamic Programming in simple terms with an intuitive analogy." },
    { title: "System Design Scalability", prompt: "How do big tech architectures like Netflix and Uber handle massive scale?" },
    { title: "Mock FAANG Interview", prompt: "Give me a technical interview question on arrays and evaluate my thought process." },
    { title: "Time Complexity (Big O)", prompt: "Teach me how to analyze Time and Space complexity step-by-step." },
    { title: "Clean Code Principles", prompt: "What are the most essential clean code practices for modern software engineers?" }
  ];

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
    playBootChime();
    setIsCallActive(true);
    setCallState('listening');
    setUserTranscript('');
    setAiSpokenText('');

    const welcome = `Mark L-II online. Hello ${userName}! All neural systems optimal. How can I assist your engineering today?`;
    setAiSpokenText(welcome);
    setConversationLogs([{ sender: 'ai', text: welcome, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);

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

  // Mark-LII Action Plugin Engine: Detects voice commands & triggers actions
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

    const newLog = {
      sender: 'user',
      text: spokenPrompt,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setConversationLogs(prev => [...prev, newLog]);
    setUserTranscript('');

    // Check if user requested an automated system action
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

      const aiLog = {
        sender: 'ai',
        text: response,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setConversationLogs(prev => [...prev, aiLog]);
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

  const speakResponse = async (text, onComplete) => {
    setCallState('speaking');
    stopElevenLabsAudio();
    if (synthRef.current) synthRef.current.cancel();

    try {
      await speakElevenLabs(
        text, 
        selectedVoicePersona === 'jenny' ? 'rachel' : selectedVoicePersona === 'samantha' ? 'sarah' : 'aria',
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
    utterance.rate = 1.04;
    utterance.pitch = 1.05;
    utterance.lang = 'en-US';

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

  const handleManualSubmit = (e) => {
    e.preventDefault();
    if (!manualInput.trim()) return;
    const text = manualInput.trim();
    setManualInput('');
    if (!isCallActive) {
      setIsCallActive(true);
    }
    handleUserSpeechComplete(text);
  };

  return (
    <div className={`max-w-5xl mx-auto px-4 py-6 md:py-8 space-y-8 animate-fade-in select-none ${
      isHudFullscreen ? 'fixed inset-0 z-50 bg-[#050505] p-6 max-w-none overflow-y-auto' : ''
    }`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 flex items-center gap-1.5 shadow-sm">
              <Zap size={11} className={isCallActive ? "animate-bounce text-cyan-300" : ""} />
              <span>Mark L-II • Neural Voice Engine</span>
            </span>
            {isCallActive && (
              <span className="text-[11px] font-mono text-neutral-400 flex items-center gap-1">
                <Clock size={11} /> {formatDuration(callDuration)}
              </span>
            )}
          </div>
          <h1 className={`text-3xl font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-[#0a0a0a]'}`}>
            Voice Assistant
          </h1>
          <p className={`text-xs font-mono uppercase tracking-wider ${isDarkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>
            JARVIS-inspired interactive audio HUD powered by 120B Super-Brain
          </p>
        </div>

        {/* Top Actions: HUD Fullscreen & Text Chat */}
        <div className="flex items-center gap-2.5 self-start sm:self-auto">
          <button
            onClick={() => setIsHudFullscreen(!isHudFullscreen)}
            className="px-3.5 py-2 rounded-xl text-xs font-mono border transition-all flex items-center gap-1.5 cursor-pointer hover:opacity-80"
            style={{ 
              backgroundColor: isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
              borderColor: 'var(--doap-border)' 
            }}
            title="Toggle Mark-LII Fullscreen HUD Mode"
          >
            {isHudFullscreen ? <Minimize2 size={13} /> : <Maximize2 size={13} />}
            <span>{isHudFullscreen ? 'Exit HUD' : 'HUD Mode'}</span>
          </button>

          <button
            onClick={() => navigateTo('/ai-tutor')}
            className="px-4 py-2 rounded-xl text-xs font-semibold border transition-all flex items-center gap-2 cursor-pointer hover:opacity-80"
            style={{ 
              backgroundColor: isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
              borderColor: 'var(--doap-border)' 
            }}
          >
            <MessageSquare size={14} style={{ color: accentHex }} />
            <span>Text AI Chat</span>
          </button>
        </div>
      </div>

      {/* Main Mark-LII Arc-Reactor Stage */}
      <div 
        className="p-8 sm:p-12 rounded-3xl border flex flex-col items-center justify-center relative overflow-hidden transition-all shadow-2xl"
        style={{ 
          backgroundColor: '#07090e',
          borderColor: isCallActive ? 'rgba(6,182,212,0.4)' : 'rgba(255,255,255,0.1)',
          minHeight: isHudFullscreen ? '620px' : '440px'
        }}
      >
        {/* Subtle Cyber Grid Lines & Arc Reactor Glow */}
        <div 
          className="absolute w-96 h-96 rounded-full blur-3xl opacity-25 pointer-events-none transition-all duration-700"
          style={{
            backgroundColor: callState === 'speaking' ? '#06b6d4' : callState === 'listening' ? '#3b82f6' : callState === 'thinking' ? '#f59e0b' : '#6366f1',
            transform: isCallActive ? 'scale(1.4)' : 'scale(0.8)'
          }}
        />

        {/* Telemetry Corner Badges */}
        <div className="absolute top-4 left-5 flex items-center gap-2 text-[10px] font-mono text-cyan-400/80">
          <Activity size={12} className="animate-pulse" />
          <span>FREQ: 44.1 KHZ • PROTOCOL: GEMINI-LII</span>
        </div>
        <div className="absolute top-4 right-5 flex items-center gap-2 text-[10px] font-mono text-cyan-400/80">
          <Cpu size={12} />
          <span>ARC CORE: {isCallActive ? "ACTIVE" : "STANDBY"}</span>
        </div>

        {/* Status Pill */}
        <div className="mb-6 z-10">
          <div className={`px-4 py-1.5 rounded-full text-xs font-mono font-bold border flex items-center gap-2 transition-all ${
            isCallActive 
              ? (callState === 'speaking' ? 'bg-cyan-500/10 border-cyan-500/40 text-cyan-400' : callState === 'listening' ? 'bg-blue-500/10 border-blue-500/40 text-blue-400' : 'bg-amber-500/10 border-amber-500/40 text-amber-400')
              : 'bg-neutral-900 border-neutral-800 text-neutral-400'
          }`}>
            <span className={`w-2 h-2 rounded-full ${
              isCallActive ? (callState === 'speaking' ? 'bg-cyan-400 animate-pulse' : callState === 'listening' ? 'bg-blue-400 animate-ping' : 'bg-amber-400 animate-bounce') : 'bg-neutral-600'
            }`} />
            <span>
              {!isCallActive 
                ? 'ARC CORE STANDBY — TAP TO ENGAGE' 
                : callState === 'speaking' 
                ? 'MARK-LII TRANSMITTING AUDIO...' 
                : callState === 'listening' 
                ? 'RECEPTIVE • LISTENING TO VOICE...' 
                : 'SYNAPSE PROCESSING...'}
            </span>
          </div>
        </div>

        {/* Arc-Reactor Futuristic SVG/Orb Visualizer */}
        <div className="relative flex items-center justify-center my-6 z-10">
          {/* Rotating Outer Reactor Tech Rings */}
          <div 
            className="absolute w-60 h-60 rounded-full border border-dashed border-cyan-500/30 pointer-events-none transition-all duration-700"
            style={{ 
              animation: isCallActive ? 'spin 14s linear infinite' : 'none',
              borderColor: isCallActive ? 'rgba(6,182,212,0.4)' : 'rgba(255,255,255,0.1)'
            }}
          />

          <div 
            className="absolute w-52 h-52 rounded-full border border-cyan-400/20 pointer-events-none transition-all duration-700"
            style={{ 
              animation: isCallActive ? 'spin 8s linear infinite reverse' : 'none'
            }}
          />

          {isCallActive && (
            <div 
              className="absolute w-44 h-44 rounded-full border-2 border-cyan-400/40 animate-ping pointer-events-none"
              style={{ animationDuration: callState === 'speaking' ? '1.2s' : '2.4s' }}
            />
          )}

          {/* Central Glowing Reactor Core Button */}
          <button
            onClick={isCallActive ? handleEndCall : handleStartCall}
            className={`w-36 h-36 rounded-full flex flex-col items-center justify-center cursor-pointer transition-all duration-500 shadow-2xl hover:scale-105 active:scale-95 z-20 ${
              isCallActive 
                ? 'bg-gradient-to-tr from-cyan-600 to-blue-500 text-white ring-8 ring-cyan-500/20 shadow-cyan-500/50' 
                : 'bg-neutral-900 text-white hover:bg-neutral-800 ring-8 ring-white/5 border border-white/20'
            }`}
          >
            {isCallActive ? (
              <>
                <PhoneOff size={34} className="animate-pulse" />
                <span className="text-[10px] font-mono font-bold mt-1.5 uppercase tracking-wider text-cyan-100">Disengage</span>
              </>
            ) : (
              <>
                <Phone size={34} className="text-cyan-400" />
                <span className="text-[10px] font-mono font-bold mt-1.5 uppercase tracking-wider text-cyan-400">Engage Core</span>
              </>
            )}
          </button>
        </div>

        {/* Live Audio Equalizer Wave Bars */}
        {isCallActive && (
          <div className="flex items-center gap-1.5 mt-2 h-7 z-10">
            {[40, 70, 95, 60, 85, 100, 75, 50, 90, 65, 45].map((h, i) => (
              <div 
                key={i} 
                className="w-1 rounded-full bg-cyan-400 transition-all duration-150"
                style={{
                  height: callState === 'speaking' ? `${(h * (Math.sin(Date.now() / 200 + i) + 1.2)) / 2}%` : callState === 'listening' ? `${h * 0.35}%` : '4px',
                  opacity: callState === 'speaking' ? 0.9 : 0.4
                }}
              />
            ))}
          </div>
        )}

        {/* Live Subtitles & Captions */}
        <div className="w-full max-w-xl text-center mt-6 min-h-[48px] flex items-center justify-center z-10">
          {userTranscript ? (
            <p className="text-sm font-medium text-cyan-200 italic animate-fade-in bg-cyan-950/40 px-4 py-2 rounded-2xl border border-cyan-500/30">
              "{userTranscript}"
            </p>
          ) : aiSpokenText ? (
            <p className="text-xs sm:text-sm font-medium text-neutral-200 line-clamp-2 px-4 py-2 rounded-2xl bg-black/60 border border-neutral-800">
              {aiSpokenText}
            </p>
          ) : (
            <p className="text-xs font-mono text-neutral-500">
              {isCallActive ? "Speak naturally — say 'Open Coding' or ask any engineering query" : "Tap Engage Core for hands-free voice command & Socratic discussions"}
            </p>
          )}
        </div>

        {/* Floating Controls Bar */}
        {isCallActive && (
          <div className="flex items-center gap-4 mt-6 z-10 animate-fade-in">
            <button
              onClick={toggleMute}
              className={`p-3 rounded-full border transition-all cursor-pointer ${
                isMuted 
                  ? 'bg-rose-500/20 border-rose-500/40 text-rose-300' 
                  : 'bg-neutral-900 border-neutral-700 text-neutral-300 hover:text-white'
              }`}
              title={isMuted ? "Unmute Microphone" : "Mute Microphone"}
            >
              {isMuted ? <MicOff size={18} /> : <Mic size={18} />}
            </button>

            {/* Voice Persona Selector */}
            <div className="flex items-center gap-1.5 p-1 rounded-full bg-neutral-900 border border-neutral-800 text-xs">
              {['aria', 'jenny', 'samantha'].map(persona => (
                <button
                  key={persona}
                  onClick={() => setSelectedVoicePersona(persona)}
                  className={`px-3 py-1 rounded-full text-[11px] font-mono capitalize transition-all cursor-pointer ${
                    selectedVoicePersona === persona 
                      ? 'bg-cyan-400 text-black font-bold' 
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  {persona === 'aria' ? 'Aria (Studio)' : persona === 'jenny' ? 'Rachel' : 'Sarah'}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Quick Voice Discussion Starter Chips */}
      <div className="space-y-3">
        <span className="text-xs font-mono uppercase tracking-wider text-neutral-500 block">
          ⚡ Mark-LII Quick Voice Discussion Topics
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {QUICK_VOICE_TOPICS.map((topic, idx) => (
            <button
              key={idx}
              onClick={() => {
                if (!isCallActive) setIsCallActive(true);
                handleUserSpeechComplete(topic.prompt);
              }}
              className={`p-3.5 rounded-2xl border text-left flex items-center justify-between gap-3 transition-all cursor-pointer hover-glide ${
                isDarkMode 
                  ? 'bg-[#111111] border-neutral-800 text-neutral-200 hover:border-cyan-500/40 hover:text-white' 
                  : 'bg-white border-neutral-200 text-neutral-800 hover:border-neutral-300'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Headphones size={15} style={{ color: '#06b6d4' }} className="shrink-0" />
                <span className="text-xs font-semibold">{topic.title}</span>
              </div>
              <ArrowRight size={13} className="text-neutral-500 shrink-0" />
            </button>
          ))}
        </div>
      </div>

      {/* Manual Input Fallback */}
      <form onSubmit={handleManualSubmit} className="relative flex items-center gap-2">
        <input 
          type="text"
          placeholder="Or type what you want to transmit to Mark-LII..."
          value={manualInput}
          onChange={(e) => setManualInput(e.target.value)}
          className="w-full pl-4 pr-12 py-3 rounded-2xl border text-xs sm:text-sm focus:outline-none transition-all shadow-inner"
          style={{
            backgroundColor: 'var(--doap-surface-sec, #0c0c0c)',
            borderColor: 'var(--doap-border)',
            color: 'var(--doap-text-prim)'
          }}
        />
        <button
          type="submit"
          disabled={!manualInput.trim()}
          className="absolute right-2.5 top-2.5 w-8 h-8 rounded-xl flex items-center justify-center transition-all cursor-pointer disabled:opacity-40"
          style={{ backgroundColor: accentHex, color: 'var(--doap-bg, #000000)' }}
        >
          <Send size={14} />
        </button>
      </form>
    </div>
  );
};
