import React, { useState, useEffect, useRef } from 'react';
import { 
  Mic, 
  MicOff, 
  Phone, 
  PhoneOff, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  MessageSquare, 
  Radio, 
  Send, 
  RefreshCw,
  Clock,
  ArrowRight,
  Headphones,
  Check
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { generateSmartTutorResponse } from '../services/aiTutorEngine';
import { speakElevenLabs, stopElevenLabsAudio } from '../services/elevenLabsService';

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
  const [conversationLogs, setConversationLogs] = useState([]);
  const [manualInput, setManualInput] = useState('');
  const [isSpeechSupported, setIsSpeechSupported] = useState(true);
  const [selectedVoicePersona, setSelectedVoicePersona] = useState('aria'); // 'aria' | 'jenny' | 'samantha'

  const recognitionRef = useRef(null);
  const synthRef = useRef(typeof window !== 'undefined' ? window.speechSynthesis : null);
  const durationTimerRef = useRef(null);
  const isMountedRef = useRef(true);
  const logsEndRef = useRef(null);

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

      // If user finished a spoken sentence, trigger AI response
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

  // Auto scroll conversation logs
  useEffect(() => {
    if (logsEndRef.current) {
      logsEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [conversationLogs, userTranscript, aiSpokenText]);

  const formatDuration = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleStartCall = async () => {
    setIsCallActive(true);
    setCallState('listening');
    setUserTranscript('');
    setAiSpokenText('');

    // Welcome greeting
    const welcome = `Hey ${userName}! I am your DOAP Voice Assistant. Ask me anything or pick any topic to discuss hands-free!`;
    setAiSpokenText(welcome);
    setConversationLogs([{ sender: 'ai', text: welcome, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);

    speakResponse(welcome, () => {
      if (isMountedRef.current && !isMuted) {
        startListening();
      }
    });
  };

  const handleEndCall = () => {
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

    try {
      const response = await generateSmartTutorResponse(spokenPrompt, userName);
      // Clean markdown tags for natural speech synthesis
      const speechCleaned = response
        .replace(/```[\s\S]*?```/g, 'Here is the code block.')
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
    <div className="max-w-5xl mx-auto px-4 py-6 md:py-8 space-y-8 animate-fade-in select-none">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5">
              <Radio size={12} className={isCallActive ? "animate-pulse" : ""} />
              <span>{isCallActive ? "Live Session" : "Voice AI Assistant"}</span>
            </span>
            {isCallActive && (
              <span className="text-[11px] font-mono text-neutral-400 flex items-center gap-1">
                <Clock size={11} /> {formatDuration(callDuration)}
              </span>
            )}
          </div>
          <h1 className={`text-3xl font-bold tracking-tight ${isDarkMode ? 'text-white' : 'text-[#0a0a0a]'}`}>
            Voice Assistant
          </h1>
          <p className={`text-xs font-mono uppercase tracking-wider ${isDarkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>
            Real-time neural audio conversation powered by 120B Super-Brain
          </p>
        </div>

        {/* Action Switch to Text AI Tutor */}
        <button
          onClick={() => navigateTo('/ai-tutor')}
          className="px-4 py-2 rounded-xl text-xs font-semibold border transition-all flex items-center gap-2 cursor-pointer hover:opacity-80 self-start sm:self-auto"
          style={{ 
            backgroundColor: isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
            borderColor: 'var(--doap-border)' 
          }}
        >
          <MessageSquare size={14} style={{ color: accentHex }} />
          <span>Switch to Text AI Chat</span>
        </button>
      </div>

      {/* Main Futuristic Voice Stage */}
      <div 
        className="p-8 sm:p-12 rounded-3xl border flex flex-col items-center justify-center relative overflow-hidden transition-all shadow-2xl"
        style={{ 
          backgroundColor: isDarkMode ? '#0d0d0d' : '#ffffff',
          borderColor: 'var(--doap-border, #222222)',
          minHeight: '420px'
        }}
      >
        {/* Subtle Ambient Glow */}
        <div 
          className="absolute w-72 h-72 rounded-full blur-3xl opacity-20 pointer-events-none transition-all duration-700"
          style={{
            backgroundColor: callState === 'speaking' ? '#10b981' : callState === 'listening' ? '#3b82f6' : callState === 'thinking' ? '#f59e0b' : '#6366f1',
            transform: isCallActive ? 'scale(1.3)' : 'scale(0.8)'
          }}
        />

        {/* Status Pill */}
        <div className="mb-8 z-10">
          <div className={`px-4 py-1.5 rounded-full text-xs font-mono font-bold border flex items-center gap-2 transition-all ${
            isCallActive 
              ? (callState === 'speaking' ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400' : callState === 'listening' ? 'bg-blue-500/10 border-blue-500/40 text-blue-400' : 'bg-amber-500/10 border-amber-500/40 text-amber-400')
              : 'bg-neutral-900 border-neutral-800 text-neutral-400'
          }`}>
            <span className={`w-2 h-2 rounded-full ${
              isCallActive ? (callState === 'speaking' ? 'bg-emerald-400 animate-pulse' : callState === 'listening' ? 'bg-blue-400 animate-ping' : 'bg-amber-400 animate-bounce') : 'bg-neutral-600'
            }`} />
            <span>
              {!isCallActive 
                ? 'Ready to Connect' 
                : callState === 'speaking' 
                ? 'DOAP AI Speaking...' 
                : callState === 'listening' 
                ? 'Listening to your voice...' 
                : 'Thinking...'}
            </span>
          </div>
        </div>

        {/* Central Neural Voice Orb */}
        <div className="relative flex items-center justify-center my-4 z-10">
          {/* Outer Pulsing Soundwave Rings */}
          {isCallActive && (
            <>
              <div 
                className="absolute w-44 h-44 rounded-full border border-white/20 animate-ping opacity-40 pointer-events-none"
                style={{ animationDuration: callState === 'speaking' ? '1.2s' : '2.5s' }}
              />
              <div 
                className="absolute w-56 h-56 rounded-full border border-white/10 animate-pulse opacity-30 pointer-events-none"
              />
            </>
          )}

          {/* Core Interactive Calling Orb Button */}
          <button
            onClick={isCallActive ? handleEndCall : handleStartCall}
            className={`w-32 h-32 rounded-full flex flex-col items-center justify-center cursor-pointer transition-all duration-500 shadow-2xl hover:scale-105 active:scale-95 z-20 ${
              isCallActive 
                ? 'bg-rose-600 hover:bg-rose-500 text-white ring-8 ring-rose-500/20' 
                : 'bg-white text-black hover:bg-neutral-100 ring-8 ring-white/10'
            }`}
          >
            {isCallActive ? (
              <>
                <PhoneOff size={32} className="animate-bounce" />
                <span className="text-[10px] font-mono font-bold mt-1 uppercase">End Call</span>
              </>
            ) : (
              <>
                <Phone size={32} />
                <span className="text-[10px] font-mono font-bold mt-1 uppercase">Start Call</span>
              </>
            )}
          </button>
        </div>

        {/* Live Subtitle / Transcript Pill */}
        <div className="w-full max-w-xl text-center mt-8 min-h-[48px] flex items-center justify-center z-10">
          {userTranscript ? (
            <p className="text-sm font-medium text-neutral-300 italic animate-fade-in bg-white/5 px-4 py-2 rounded-2xl border border-white/10">
              "{userTranscript}"
            </p>
          ) : aiSpokenText ? (
            <p className="text-xs sm:text-sm font-medium text-neutral-300 line-clamp-2 px-4 py-2 rounded-2xl bg-neutral-900/80 border border-neutral-800">
              {aiSpokenText}
            </p>
          ) : (
            <p className="text-xs font-mono text-neutral-500">
              {isCallActive ? "Speak naturally — DOAP AI answers in real-time" : "Tap Start Call for hands-free voice conversations"}
            </p>
          )}
        </div>

        {/* In-Call Controls Floating Bar */}
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
                      ? 'bg-white text-black font-bold' 
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
          💡 1-Tap Voice Discussion Topics
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
                  ? 'bg-[#111111] border-neutral-800 text-neutral-200 hover:border-neutral-700 hover:text-white' 
                  : 'bg-white border-neutral-200 text-neutral-800 hover:border-neutral-300'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Headphones size={15} style={{ color: accentHex }} className="shrink-0" />
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
          placeholder="Or type what you want to say in voice..."
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
