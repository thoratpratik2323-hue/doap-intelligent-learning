import React, { useState, useEffect, useRef } from 'react';
import { 
  Mic, 
  MicOff, 
  Phone, 
  PhoneOff, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  RotateCcw, 
  MessageSquare, 
  Radio, 
  Zap, 
  Send, 
  Bot, 
  User, 
  CheckCircle2,
  RefreshCw,
  Clock,
  ArrowRight,
  Headphones
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { generateSmartTutorResponse } from '../services/aiTutorEngine';

export const VoiceTutor = () => {
  const { isDarkMode, activeAccentHex, navigateTo } = useTheme();
  const { profile } = useAuth();
  const accentHex = activeAccentHex || 'var(--doap-accent, #ffffff)';

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

  const recognitionRef = useRef(null);
  const synthRef = useRef(typeof window !== 'undefined' ? window.speechSynthesis : null);
  const durationTimerRef = useRef(null);
  const isMountedRef = useRef(true);
  const logsEndRef = useRef(null);

  const QUICK_VOICE_TOPICS = [
    { title: "Explain Dynamic Programming", prompt: "Explain Dynamic Programming in simple terms with a real-world example." },
    { title: "System Design Scalability", prompt: "How do big tech companies like Netflix and Uber scale their systems?" },
    { title: "Mock Interview Question", prompt: "Give me a technical interview question on arrays and evaluate my thought process." },
    { title: "Time Complexity (Big O)", prompt: "Teach me how to calculate Time and Space complexity easily." },
    { title: "Clean Code Principles", prompt: "What are the most important clean code practices for junior to senior engineers?" }
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
      console.warn("Voice Tutor Speech Recognition event:", e.error);
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

  const handleStartCall = () => {
    setIsCallActive(true);
    setIsMuted(false);
    
    const greeting = `Hello ${profile?.name || 'there'}! I am your DOAP Live Voice Tutor. I am listening—what engineering topic or doubt would you like to discuss?`;
    
    setAiSpokenText(greeting);
    setConversationLogs([{ role: 'assistant', text: greeting, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
    
    speakResponse(greeting, () => {
      startListening();
    });
  };

  const handleEndCall = () => {
    if (synthRef.current) synthRef.current.cancel();
    stopListening();
    setIsCallActive(false);
    setCallState('idle');
  };

  const startListening = () => {
    if (isMuted || !isMountedRef.current) return;
    setCallState('listening');
    setUserTranscript('');

    if (recognitionRef.current && isSpeechSupported) {
      try {
        recognitionRef.current.start();
      } catch (err) {
        // already active
      }
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (err) {}
    }
  };

  const handleUserSpeechComplete = async (spokenText) => {
    if (!spokenText || !spokenText.trim()) return;

    stopListening();
    setCallState('thinking');
    setUserTranscript(spokenText);

    const userEntry = { 
      role: 'user', 
      text: spokenText, 
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
    };

    setConversationLogs(prev => [...prev, userEntry]);

    try {
      const response = await generateSmartTutorResponse(spokenText, conversationLogs);
      
      // Vocal speech sanitizer (removes raw markdown formatting for smooth natural speech)
      const vocalSpeech = response
        .replace(/```[\s\S]*?```/g, "I have outlined the detailed code implementation for you.")
        .replace(/`([^`]+)`/g, "$1")
        .replace(/[*#_>]/g, "")
        .replace(/\n+/g, " ")
        .slice(0, 480);

      setAiSpokenText(response);
      setConversationLogs(prev => [...prev, { 
        role: 'assistant', 
        text: response, 
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
      }]);

      speakResponse(vocalSpeech, () => {
        if (isMountedRef.current && isCallActive) {
          startListening();
        }
      });
    } catch (err) {
      const fallback = "I understood your query. Let's explore that deeper—could you specify which part you'd like to dive into?";
      speakResponse(fallback, () => {
        if (isMountedRef.current && isCallActive) {
          startListening();
        }
      });
    }
  };

  const speakResponse = (text, onComplete) => {
    if (!synthRef.current) {
      setCallState('listening');
      if (onComplete) onComplete();
      return;
    }

    setCallState('speaking');
    synthRef.current.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.05;
    utterance.pitch = 1.0;
    utterance.lang = 'en-US';

    const voices = synthRef.current.getVoices();
    const naturalVoice = voices.find(v => (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Samantha') || v.name.includes('Daniel')) && v.lang.includes('en'));
    if (naturalVoice) utterance.voice = naturalVoice;

    utterance.onend = () => {
      if (onComplete && isMountedRef.current) {
        onComplete();
      }
    };

    utterance.onerror = () => {
      if (onComplete && isMountedRef.current) {
        onComplete();
      }
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
    <div className="max-w-6xl mx-auto px-4 py-6 md:py-8 space-y-8 animate-fade-in select-none">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5">
              <Radio size={12} className="animate-pulse" />
              <span>Real-Time Voice AI</span>
            </span>
            <span className="text-[11px] font-mono text-neutral-400">
              • Hands-Free Interactive Calling
            </span>
          </div>
          <h1 className={`text-3xl font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-[#0a0a0a]'}`}>
            Voice Tutor
          </h1>
          <p className={`text-xs font-mono uppercase tracking-wider ${isDarkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>
            Live conversational audio mentor powered by Gemini AI
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

      {/* Main Voice Calling Studio Canvas */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left / Center: Interactive Voice Orb Calling Stage */}
        <div 
          className={`lg:col-span-7 p-6 sm:p-10 rounded-3xl border flex flex-col items-center text-center justify-between min-h-[480px] sm:min-h-[540px] relative overflow-hidden doap-card ${
            isDarkMode ? 'bg-[#111111] border-neutral-800 text-white' : 'bg-white border-neutral-200 text-black shadow-lg'
          }`}
        >
          {/* Ambient Glow */}
          <div 
            className="absolute w-72 h-72 rounded-full blur-[100px] pointer-events-none opacity-20 transition-all duration-700"
            style={{ 
              backgroundColor: isCallActive 
                ? (callState === 'speaking' ? '#10b981' : callState === 'thinking' ? '#a855f7' : accentHex) 
                : '#71717a' 
            }}
          />

          {/* Top Status Bar */}
          <div className="w-full flex items-center justify-between z-10">
            <div className="flex items-center gap-2">
              <span className={`w-3 h-3 rounded-full ${isCallActive ? 'bg-emerald-500 animate-pulse' : 'bg-neutral-600'}`} />
              <span className="text-xs font-mono font-bold uppercase tracking-wider">
                {isCallActive ? `Live Call • ${formatDuration(callDuration)}` : 'Voice Studio Offline'}
              </span>
            </div>

            {isCallActive && (
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase border ${
                callState === 'speaking' 
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' 
                  : callState === 'thinking'
                  ? 'bg-purple-500/10 text-purple-400 border-purple-500/30'
                  : 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30'
              }`}>
                {callState === 'speaking' ? '🔊 AI Speaking' : callState === 'thinking' ? '🧠 Thinking...' : '🎙️ Listening to You'}
              </span>
            )}
          </div>

          {/* Center: Glowing Concentric Voice Orb */}
          <div className="relative flex items-center justify-center my-8 z-10">
            {isCallActive && (
              <>
                <div 
                  className={`absolute w-60 h-60 rounded-full pointer-events-none transition-all duration-700 opacity-20 ${
                    callState === 'speaking' 
                      ? 'animate-ping scale-125 bg-emerald-400' 
                      : callState === 'listening' 
                      ? 'animate-pulse scale-110 bg-cyan-400' 
                      : 'bg-purple-500 animate-spin'
                  }`}
                />
                <div 
                  className={`absolute w-44 h-44 rounded-full pointer-events-none transition-all duration-500 opacity-30 ${
                    callState === 'speaking' ? 'scale-110 bg-emerald-500' : 'bg-cyan-500'
                  }`}
                />
              </>
            )}

            {/* Interactive Voice Sphere */}
            <div 
              onClick={!isCallActive ? handleStartCall : undefined}
              className={`w-36 h-36 rounded-full flex flex-col items-center justify-center shadow-2xl relative z-10 border transition-all duration-500 ${
                !isCallActive ? 'cursor-pointer hover:scale-105 active:scale-95' : ''
              }`}
              style={{ 
                backgroundColor: isDarkMode ? '#141414' : '#f4f4f5',
                borderColor: isCallActive 
                  ? (callState === 'speaking' ? '#10b981' : callState === 'thinking' ? '#a855f7' : accentHex)
                  : 'var(--doap-border)',
                boxShadow: isCallActive 
                  ? `0 0 50px ${callState === 'speaking' ? '#10b98160' : callState === 'thinking' ? '#a855f760' : `${accentHex}60`}`
                  : 'none'
              }}
            >
              {!isCallActive ? (
                <div className="flex flex-col items-center gap-1.5">
                  <Phone size={36} style={{ color: accentHex }} className="animate-bounce" />
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-neutral-400">
                    Tap to Call
                  </span>
                </div>
              ) : callState === 'speaking' ? (
                <div className="flex flex-col items-center gap-1">
                  <Volume2 size={40} className="text-emerald-400 animate-bounce" />
                  <span className="text-[10px] font-mono font-bold uppercase text-emerald-400">Speaking</span>
                </div>
              ) : callState === 'thinking' ? (
                <div className="flex flex-col items-center gap-1">
                  <Sparkles size={38} className="text-purple-400 animate-spin" />
                  <span className="text-[10px] font-mono font-bold uppercase text-purple-400">Reasoning</span>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-1">
                  <Mic size={38} style={{ color: accentHex }} className="animate-pulse" />
                  <span className="text-[10px] font-mono font-bold uppercase" style={{ color: accentHex }}>Listening</span>
                </div>
              )}
            </div>
          </div>

          {/* Real-Time Live Subtitle Captions */}
          <div 
            className="w-full min-h-[90px] p-4 rounded-2xl border text-sm leading-relaxed flex flex-col items-center justify-center space-y-1 z-10"
            style={{ 
              backgroundColor: isDarkMode ? 'rgba(0,0,0,0.4)' : 'rgba(240,240,240,0.8)',
              borderColor: isDarkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'
            }}
          >
            {isCallActive ? (
              callState === 'speaking' ? (
                <p className="text-neutral-200 font-medium line-clamp-3 italic">
                  "{aiSpokenText}"
                </p>
              ) : callState === 'thinking' ? (
                <div className="flex items-center gap-2 text-neutral-400 font-mono text-xs">
                  <RefreshCw size={13} className="animate-spin text-purple-400" />
                  <span>DOAP Voice AI is processing your answer...</span>
                </div>
              ) : userTranscript ? (
                <p className="text-neutral-300 font-medium">
                  "{userTranscript}"
                </p>
              ) : (
                <p className="text-neutral-500 font-mono text-xs">
                  Listening to your microphone... Speak naturally
                </p>
              )
            ) : (
              <p className="text-neutral-400 text-xs font-mono">
                Click "Start Live Call" below to begin real-time interactive voice practice.
              </p>
            )}
          </div>

          {/* Call Controls Footer */}
          <div className="w-full flex items-center justify-center gap-4 pt-6 z-10">
            {!isCallActive ? (
              <button
                onClick={handleStartCall}
                className="px-8 py-3.5 rounded-2xl font-bold text-sm shadow-xl transition-all cursor-pointer hover:scale-105 active:scale-95 flex items-center gap-2.5 bg-emerald-500 hover:bg-emerald-400 text-black"
              >
                <Phone size={18} />
                <span>Start Live Voice Call</span>
              </button>
            ) : (
              <>
                {/* Mute Button */}
                <button
                  onClick={toggleMute}
                  className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all cursor-pointer shadow-lg hover:scale-105 ${
                    isMuted ? 'bg-rose-500/20 border-rose-500 text-rose-400' : 'bg-neutral-800 border-neutral-700 text-neutral-200 hover:text-white'
                  }`}
                  title={isMuted ? "Unmute Microphone" : "Mute Microphone"}
                >
                  {isMuted ? <MicOff size={20} /> : <Mic size={20} />}
                </button>

                {/* Big End Call Button */}
                <button
                  onClick={handleEndCall}
                  className="px-6 py-3 rounded-full bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs flex items-center gap-2 transition-all cursor-pointer shadow-xl hover:scale-105 active:scale-95"
                  title="End Call"
                >
                  <PhoneOff size={18} />
                  <span>End Call</span>
                </button>

                {/* Interrupt AI Button */}
                <button
                  onClick={() => {
                    if (synthRef.current) synthRef.current.cancel();
                    startListening();
                  }}
                  className="w-12 h-12 rounded-full border bg-neutral-800 border-neutral-700 text-neutral-200 hover:text-white flex items-center justify-center transition-all cursor-pointer shadow-lg hover:scale-105"
                  title="Interrupt AI & Speak"
                >
                  <VolumeX size={20} />
                </button>
              </>
            )}
          </div>
        </div>

        {/* Right: Spoken Topics & Real-Time Call Transcript */}
        <div className="lg:col-span-5 space-y-6">
          {/* Quick Voice Discussion Starters */}
          <div 
            className={`p-5 rounded-3xl border space-y-3 doap-card ${
              isDarkMode ? 'bg-[#111111] border-neutral-800 text-white' : 'bg-white border-neutral-200 text-black shadow-sm'
            }`}
          >
            <div className="flex items-center justify-between border-b pb-2.5" style={{ borderColor: isDarkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)' }}>
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-neutral-400">
                1-Tap Voice Discussion Topics
              </span>
              <Sparkles size={13} style={{ color: accentHex }} />
            </div>

            <div className="space-y-2">
              {QUICK_VOICE_TOPICS.map((topic, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    if (!isCallActive) setIsCallActive(true);
                    handleUserSpeechComplete(topic.prompt);
                  }}
                  className={`w-full p-2.5 rounded-xl border text-left text-xs font-semibold transition-all flex items-center justify-between group cursor-pointer ${
                    isDarkMode 
                      ? 'bg-neutral-900/60 border-neutral-800 hover:border-neutral-700 hover:bg-neutral-900 text-neutral-200' 
                      : 'bg-neutral-50 border-neutral-200 hover:border-neutral-300 text-neutral-800'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <Headphones size={13} style={{ color: accentHex }} className="shrink-0" />
                    <span className="truncate">{topic.title}</span>
                  </div>
                  <ArrowRight size={13} className="shrink-0 opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                </button>
              ))}
            </div>
          </div>

          {/* Live Call Transcript Log */}
          <div 
            className={`p-5 rounded-3xl border space-y-3 flex flex-col h-[340px] doap-card ${
              isDarkMode ? 'bg-[#111111] border-neutral-800 text-white' : 'bg-white border-neutral-200 text-black shadow-sm'
            }`}
          >
            <div className="flex items-center justify-between border-b pb-2.5 shrink-0" style={{ borderColor: isDarkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)' }}>
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-neutral-400">
                Live Conversation Audio Log
              </span>
              <span className="text-[10px] font-mono text-neutral-500">
                {conversationLogs.length} Exchanges
              </span>
            </div>

            <div className="flex-1 overflow-y-auto space-y-3 font-sans text-xs scrollbar-thin pr-1">
              {conversationLogs.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center text-neutral-500 space-y-1">
                  <Radio size={24} className="opacity-30 mb-1" />
                  <p className="font-mono text-[11px]">No spoken exchanges yet.</p>
                  <p className="text-[10px]">Start call or speak into microphone.</p>
                </div>
              ) : (
                conversationLogs.map((log, idx) => (
                  <div 
                    key={idx}
                    className={`p-3 rounded-2xl border space-y-1 ${
                      log.role === 'user' 
                        ? (isDarkMode ? 'bg-neutral-900 border-neutral-800 ml-4' : 'bg-neutral-100 border-neutral-300 ml-4')
                        : (isDarkMode ? 'bg-black/60 border-neutral-800 mr-4' : 'bg-neutral-50 border-neutral-200 mr-4')
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px] font-mono text-neutral-400">
                      <span className="font-bold flex items-center gap-1">
                        {log.role === 'user' ? <User size={10} /> : <Bot size={10} />}
                        <span>{log.role === 'user' ? 'You' : 'DOAP Voice AI'}</span>
                      </span>
                      <span>{log.time}</span>
                    </div>
                    <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-neutral-200' : 'text-neutral-800'}`}>
                      {log.text}
                    </p>
                  </div>
                ))
              )}
              <div ref={logsEndRef} />
            </div>

            {/* Fallback Question Input */}
            <form onSubmit={handleManualSubmit} className="pt-2 border-t flex items-center gap-2 shrink-0" style={{ borderColor: isDarkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)' }}>
              <input 
                type="text"
                value={manualInput}
                onChange={(e) => setManualInput(e.target.value)}
                placeholder="Ask voice tutor by typing..."
                className="flex-1 px-3 py-2 rounded-xl border text-xs focus:outline-none bg-neutral-900 border-neutral-800 text-white"
              />
              <button
                type="submit"
                className="px-3.5 py-2 rounded-xl font-bold text-xs shadow cursor-pointer hover:opacity-90 shrink-0"
                style={{ backgroundColor: accentHex, color: 'var(--doap-bg, #000000)' }}
              >
                <Send size={12} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
