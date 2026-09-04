import React, { useState, useEffect, useRef } from 'react';
import { 
  PhoneOff, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  Bot, 
  User, 
  MessageSquare, 
  RefreshCw,
  Zap,
  Radio,
  X,
  Send
} from 'lucide-react';
import { generateSmartTutorResponse } from '../../services/aiTutorEngine';
import { speakElevenLabs, stopElevenLabsAudio } from '../../services/elevenLabsService';

export const VoiceAICallModal = ({ isOpen, onClose, onSaveCallToChat, isDarkMode, accentHex }) => {
  const [callState, setCallState] = useState('idle'); // 'listening' | 'thinking' | 'speaking'
  const [userTranscript, setUserTranscript] = useState('');
  const [aiResponseText, setAiResponseText] = useState('');
  const [isMuted, setIsMuted] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [conversationLogs, setConversationLogs] = useState([]);
  const [manualInput, setManualInput] = useState('');
  const [isVoiceSupported, setIsVoiceSupported] = useState(true);

  const recognitionRef = useRef(null);
  const synthRef = useRef(typeof window !== 'undefined' ? window.speechSynthesis : null);
  const durationTimerRef = useRef(null);
  const modalSpeechTimerRef = useRef(null);
  const isComponentMounted = useRef(true);

  // Stop audio on unmount or close
  useEffect(() => {
    return () => {
      isComponentMounted.current = false;
      stopElevenLabsAudio();
      if (modalSpeechTimerRef.current) {
        clearTimeout(modalSpeechTimerRef.current);
      }
      if (synthRef.current) synthRef.current.cancel();
      if (recognitionRef.current) {
        try { recognitionRef.current.stop(); } catch(e){}
      }
    };
  }, []);

  // Initialize Web Speech API
  useEffect(() => {
    isComponentMounted.current = true;
    const SpeechRecognition = typeof window !== 'undefined' && 
      (window.SpeechRecognition || window.webkitSpeechRecognition);

    if (!SpeechRecognition) {
      setIsVoiceSupported(false);
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

        if (modalSpeechTimerRef.current) {
          clearTimeout(modalSpeechTimerRef.current);
        }

        // Debounce trigger after 1.1s natural pause
        modalSpeechTimerRef.current = setTimeout(() => {
          if (isComponentMounted.current && fullSpoken.length > 2) {
            handleUserSpeechComplete(fullSpoken);
          }
        }, 1100);
      }
    };

    recognition.onerror = (e) => {
      console.warn("Speech recognition error:", e.error);
      if (e.error === 'not-allowed' || e.error === 'service-not-allowed') {
        setIsVoiceSupported(false);
      }
    };

    recognitionRef.current = recognition;

    return () => {
      isComponentMounted.current = false;
      if (recognitionRef.current) {
        try { recognitionRef.current.stop(); } catch(err){}
      }
      if (synthRef.current) {
        synthRef.current.cancel();
      }
    };
  }, []);

  // Call duration stopwatch
  useEffect(() => {
    if (isOpen) {
      setCallDuration(0);
      durationTimerRef.current = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);

      // Start initial greeting & listening
      startInitialGreeting();
    } else {
      if (durationTimerRef.current) clearInterval(durationTimerRef.current);
      if (synthRef.current) synthRef.current.cancel();
      if (recognitionRef.current) {
        try { recognitionRef.current.stop(); } catch(err){}
      }
    }

    return () => {
      if (durationTimerRef.current) clearInterval(durationTimerRef.current);
    };
  }, [isOpen]);

  const formatDuration = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const startInitialGreeting = () => {
    const greeting = "Hey there! I'm connected and listening. What engineering or coding topic would you like to discuss today?";
    speakAIResponse(greeting, () => {
      startListening();
    });
  };

  const startListening = () => {
    if (isMuted) return;
    setCallState('listening');
    setUserTranscript('');
    
    if (recognitionRef.current && isVoiceSupported) {
      try {
        recognitionRef.current.start();
      } catch (err) {
        // already started
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
    if (!spokenText.trim()) return;

    stopListening();
    setCallState('thinking');
    setUserTranscript(spokenText);

    // Save to conversation log
    setConversationLogs(prev => [...prev, { role: 'user', text: spokenText }]);

    try {
      // Generate AI response
      const aiReply = await generateSmartTutorResponse(spokenText, conversationLogs);
      
      // Clean markdown code blocks for vocal reading
      const vocalText = aiReply
        .replace(/```[\s\S]*?```/g, "I have generated the code snippet for this in your chat summary.")
        .replace(/`([^`]+)`/g, "$1")
        .replace(/[*#_]/g, "")
        .replace(/\n+/g, " ")
        .slice(0, 450); // Keep voice answer concise and conversational

      setAiResponseText(aiReply);
      setConversationLogs(prev => [...prev, { role: 'assistant', text: aiReply }]);

      speakAIResponse(vocalText, () => {
        // After speaking finished, automatically resume listening for hands-free flow
        if (isComponentMounted.current) {
          startListening();
        }
      });
    } catch (err) {
      const fallback = "I understood your point. Let's break this down step-by-step. What specific part should we focus on?";
      speakAIResponse(fallback, () => {
        startListening();
      });
    }
  };

  const speakAIResponse = async (text, onFinished) => {
    setCallState('speaking');
    stopElevenLabsAudio();
    if (synthRef.current) synthRef.current.cancel();

    try {
      await speakElevenLabs(
        text,
        'aria',
        () => {
          if (onFinished && isComponentMounted.current) onFinished();
        },
        () => {
          fallbackModalSpeech(text, onFinished);
        }
      );
    } catch (e) {
      fallbackModalSpeech(text, onFinished);
    }
  };

  const fallbackModalSpeech = (text, onFinished) => {
    if (!synthRef.current) {
      setCallState('listening');
      if (onFinished) onFinished();
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.04;
    utterance.pitch = 1.10;
    utterance.lang = 'en-US';

    const voices = synthRef.current.getVoices();
    const femaleVoice = voices.find(v => (v.name.includes('Aria') || v.name.includes('Jenny') || v.name.includes('Samantha') || v.name.includes('Female')) && v.lang.includes('en'));
    if (femaleVoice) utterance.voice = femaleVoice;

    utterance.onend = () => {
      if (onFinished && isComponentMounted.current) {
        onFinished();
      }
    };

    utterance.onerror = () => {
      if (onFinished && isComponentMounted.current) {
        onFinished();
      }
    };

    synthRef.current.speak(utterance);
  };

  const handleManualSubmit = (e) => {
    e.preventDefault();
    if (!manualInput.trim()) return;
    const text = manualInput.trim();
    setManualInput('');
    handleUserSpeechComplete(text);
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

  const handleEndCall = () => {
    if (synthRef.current) synthRef.current.cancel();
    stopListening();
    
    // Save call history to AI Tutor chat
    if (conversationLogs.length > 0 && onSaveCallToChat) {
      onSaveCallToChat(conversationLogs);
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xl animate-fade-in select-none">
      <div 
        className="w-full max-w-xl rounded-[36px] border shadow-2xl overflow-hidden flex flex-col items-center text-center relative p-6 sm:p-10 space-y-8"
        style={{ 
          backgroundColor: isDarkMode ? '#0d0d0d' : '#ffffff',
          borderColor: isDarkMode ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.12)'
        }}
      >
        {/* Top Header */}
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
            <div className="text-left">
              <h4 className="text-sm font-bold tracking-tight">DOAP Voice AI Studio</h4>
              <p className="text-[11px] font-mono text-neutral-400">Live Hands-Free Call • {formatDuration(callDuration)}</p>
            </div>
          </div>

          <button 
            onClick={handleEndCall}
            className="p-2.5 rounded-full border transition-colors cursor-pointer text-neutral-400 hover:text-white"
            style={{ borderColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }}
            title="End Call"
          >
            <X size={18} />
          </button>
        </div>

        {/* Central Glowing Waveform Orb */}
        <div className="relative flex items-center justify-center my-6">
          {/* Concentric Animated Soundwave Ripples */}
          <div 
            className={`absolute w-64 h-64 rounded-full transition-all duration-700 pointer-events-none opacity-20 ${
              callState === 'speaking' 
                ? 'animate-ping scale-125 bg-emerald-400' 
                : callState === 'listening' 
                ? 'animate-pulse scale-110 bg-cyan-400' 
                : 'bg-purple-500 animate-spin'
            }`}
          />
          <div 
            className={`absolute w-48 h-48 rounded-full transition-all duration-500 pointer-events-none opacity-30 ${
              callState === 'speaking' ? 'scale-110 bg-emerald-500' : 'bg-cyan-500'
            }`}
          />

          {/* Central AI Voice Sphere */}
          <div 
            className="w-32 h-32 rounded-full flex flex-col items-center justify-center shadow-2xl relative z-10 border transition-all duration-500"
            style={{ 
              backgroundColor: isDarkMode ? '#171717' : '#f4f4f5',
              borderColor: callState === 'speaking' ? '#10b981' : callState === 'listening' ? accentHex : '#a855f7',
              boxShadow: `0 0 40px ${callState === 'speaking' ? '#10b98150' : callState === 'listening' ? `${accentHex}50` : '#a855f750'}`
            }}
          >
            {callState === 'speaking' ? (
              <Volume2 size={40} className="text-emerald-400 animate-bounce" />
            ) : callState === 'thinking' ? (
              <Sparkles size={40} className="text-purple-400 animate-spin" />
            ) : (
              <Mic size={40} style={{ color: accentHex }} className="animate-pulse" />
            )}

            <span className="text-[10px] font-mono font-bold uppercase tracking-widest mt-1 text-neutral-400">
              {callState}
            </span>
          </div>
        </div>

        {/* Live Subtitle Transcript Area */}
        <div className="w-full min-h-[90px] p-4 rounded-2xl border text-sm leading-relaxed flex flex-col items-center justify-center space-y-1"
          style={{ 
            backgroundColor: isDarkMode ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)',
            borderColor: isDarkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'
          }}
        >
          {callState === 'speaking' ? (
            <p className="text-neutral-200 font-medium line-clamp-3 italic">
              "{aiResponseText || 'Explaining concepts to you...'}"
            </p>
          ) : callState === 'thinking' ? (
            <div className="flex items-center gap-2 text-neutral-400 font-mono text-xs">
              <RefreshCw size={13} className="animate-spin text-purple-400" />
              <span>DOAP AI is reasoning...</span>
            </div>
          ) : userTranscript ? (
            <p className="text-neutral-300 font-medium">
              "{userTranscript}"
            </p>
          ) : (
            <p className="text-neutral-500 font-mono text-xs">
              Speak naturally into your microphone...
            </p>
          )}
        </div>

        {/* Fallback Type Input for Browsers without SpeechRecognition (Firefox / Safari) */}
        {!isVoiceSupported && (
          <form onSubmit={handleManualSubmit} className="w-full flex items-center gap-2">
            <input 
              type="text"
              value={manualInput}
              onChange={(e) => setManualInput(e.target.value)}
              placeholder="Type your question for voice answer..."
              className="flex-1 px-4 py-2.5 rounded-xl border text-xs focus:outline-none bg-neutral-900 border-neutral-800 text-white"
            />
            <button
              type="submit"
              className="px-4 py-2.5 rounded-xl font-bold text-xs shadow cursor-pointer hover:opacity-90"
              style={{ backgroundColor: accentHex, color: '#000000' }}
            >
              <Send size={13} />
            </button>
          </form>
        )}

        {/* Bottom Call Control Action Buttons */}
        <div className="flex items-center justify-center gap-5 pt-2">
          {/* Mute/Unmute Mic */}
          <button
            onClick={toggleMute}
            className={`w-14 h-14 rounded-full border flex items-center justify-center transition-all cursor-pointer shadow-lg hover:scale-105 ${
              isMuted 
                ? 'bg-rose-500/20 border-rose-500 text-rose-400' 
                : 'bg-neutral-800 border-neutral-700 text-neutral-200 hover:text-white'
            }`}
            title={isMuted ? "Unmute Mic" : "Mute Mic"}
          >
            {isMuted ? <MicOff size={22} /> : <Mic size={22} />}
          </button>

          {/* End Call Button (Big Red) */}
          <button
            onClick={handleEndCall}
            className="w-16 h-16 rounded-full bg-rose-600 hover:bg-rose-500 text-white flex items-center justify-center transition-all cursor-pointer shadow-xl hover:scale-105 active:scale-95"
            title="End Call & Save Summary"
          >
            <PhoneOff size={26} />
          </button>

          {/* Interrupt / Stop AI Voice */}
          <button
            onClick={() => {
              if (synthRef.current) synthRef.current.cancel();
              startListening();
            }}
            className="w-14 h-14 rounded-full border bg-neutral-800 border-neutral-700 text-neutral-200 hover:text-white flex items-center justify-center transition-all cursor-pointer shadow-lg hover:scale-105"
            title="Interrupt AI & Speak"
          >
            <VolumeX size={22} />
          </button>
        </div>
      </div>
    </div>
  );
};
