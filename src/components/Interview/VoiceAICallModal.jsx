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
  Send,
  AlertCircle
} from 'lucide-react';
import { generateSmartTutorResponse } from '../../services/aiTutorEngine';
import { speakElevenLabs, stopElevenLabsAudio, getBestNaturalVoice, humanizeTextForSpeech } from '../../services/elevenLabsService';

export const VoiceAICallModal = ({ isOpen, onClose, onSaveCallToChat, isDarkMode, accentHex }) => {
  const [callState, setCallState] = useState('idle'); // 'listening' | 'thinking' | 'speaking'
  const callStateRef = useRef('idle');
  const [userTranscript, setUserTranscript] = useState('');
  const [aiResponseText, setAiResponseText] = useState('');
  const [isMuted, setIsMuted] = useState(false);
  const isMutedRef = useRef(false);
  const [callDuration, setCallDuration] = useState(0);
  const [conversationLogs, setConversationLogs] = useState([]);
  const [manualInput, setManualInput] = useState('');
  const [isVoiceSupported, setIsVoiceSupported] = useState(true);
  const [micErrorMessage, setMicErrorMessage] = useState('');
  const hasFatalMicErrorRef = useRef(false);

  const updateCallState = (newState) => {
    callStateRef.current = newState;
    setCallState(newState);
  };

  const recognitionRef = useRef(null);
  const isCallActiveRef = useRef(false);
  const synthRef = useRef(typeof window !== 'undefined' ? window.speechSynthesis : null);
  const durationTimerRef = useRef(null);
  const modalSpeechTimerRef = useRef(null);
  const isComponentMounted = useRef(true);

  // Stop audio on unmount or close
  useEffect(() => {
    return () => {
      isComponentMounted.current = false;
      isCallActiveRef.current = false;
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

  // Check Web Speech API Support
  useEffect(() => {
    isComponentMounted.current = true;
    const SpeechRecognition = typeof window !== 'undefined' && 
      (window.SpeechRecognition || window.webkitSpeechRecognition);

    if (!SpeechRecognition) {
      setIsVoiceSupported(false);
    }

    return () => {
      isComponentMounted.current = false;
      stopListening();
      if (synthRef.current) {
        synthRef.current.cancel();
      }
    };
  }, []);

  // Call duration stopwatch
  useEffect(() => {
    isCallActiveRef.current = isOpen;
    if (isOpen) {
      hasFatalMicErrorRef.current = false;
      setMicErrorMessage('');
      setCallDuration(0);
      durationTimerRef.current = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);

      // Start initial greeting & listening
      startInitialGreeting();
    } else {
      updateCallState('idle');
      if (durationTimerRef.current) clearInterval(durationTimerRef.current);
      stopElevenLabsAudio();
      if (synthRef.current) synthRef.current.cancel();
      stopListening();
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
    if (!isComponentMounted.current || isMutedRef.current || !isCallActiveRef.current || hasFatalMicErrorRef.current) return;
    updateCallState('listening');
    setUserTranscript('');

    const SpeechRecognition = typeof window !== 'undefined' && 
      (window.SpeechRecognition || window.webkitSpeechRecognition);

    if (!SpeechRecognition) {
      setIsVoiceSupported(false);
      return;
    }

    stopListening();

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-IN';

      recognition.onresult = (event) => {
        if (callStateRef.current !== 'listening') return;
        let fullSpoken = '';

        for (let i = 0; i < event.results.length; i++) {
          fullSpoken += event.results[i][0].transcript + ' ';
        }

        const cleanText = fullSpoken.trim();
        if (cleanText) {
          setUserTranscript(cleanText);

          if (modalSpeechTimerRef.current) {
            clearTimeout(modalSpeechTimerRef.current);
          }

          modalSpeechTimerRef.current = setTimeout(() => {
            if (isComponentMounted.current && cleanText.length > 0 && callStateRef.current === 'listening') {
              stopListening();
              handleUserSpeechComplete(cleanText);
            }
          }, 1100);
        }
      };

      recognition.onerror = (e) => {
        if (e.error === 'not-allowed' || e.error === 'service-not-allowed') {
          hasFatalMicErrorRef.current = true;
          setMicErrorMessage("Microphone access was denied. Please allow microphone permissions in your browser to speak.");
        }
        if (e.error !== 'no-speech' && e.error !== 'aborted') {
          console.warn("Modal speech error:", e.error);
        }
      };

      recognition.onend = () => {
        if (!hasFatalMicErrorRef.current && isComponentMounted.current && isCallActiveRef.current && !isMutedRef.current && callStateRef.current === 'listening') {
          setTimeout(() => {
            if (!hasFatalMicErrorRef.current && isComponentMounted.current && isCallActiveRef.current && !isMutedRef.current && callStateRef.current === 'listening') {
              startListening();
            }
          }, 150);
        }
      };

      recognition.start();
      recognitionRef.current = recognition;
    } catch (err) {
      console.warn("Speech recognition start failed:", err);
    }
  };

  const stopListening = () => {
    if (modalSpeechTimerRef.current) {
      clearTimeout(modalSpeechTimerRef.current);
      modalSpeechTimerRef.current = null;
    }
    if (recognitionRef.current) {
      try {
        recognitionRef.current.onresult = null;
        recognitionRef.current.onend = null;
        recognitionRef.current.onerror = null;
        recognitionRef.current.stop();
      } catch (err) {}
      recognitionRef.current = null;
    }
  };

  const handleUserSpeechComplete = async (spokenText) => {
    if (!spokenText.trim()) return;

    stopListening();
    updateCallState('thinking');
    setUserTranscript(spokenText);

    // Save to conversation log
    setConversationLogs(prev => [...prev, { role: 'user', text: spokenText }]);

    try {
      // Generate AI response
      const aiReply = await generateSmartTutorResponse(spokenText, 'Friend', conversationLogs, { voiceMode: true });
      
      // Clean markdown code blocks and reasoning tags for vocal reading
      const vocalText = aiReply
        .replace(/<think>[\s\S]*?<\/think>/gi, '')
        .replace(/<details[\s\S]*?<\/details>/gi, '')
        .replace(/\*\*Reasoning\*\*[\s\S]*?\*\*Final Answer\*\*/i, '')
        .replace(/```[\s\S]*?```/g, "I have generated the code snippet for this in your chat summary.")
        .replace(/`([^`]+)`/g, "$1")
        .replace(/[*#_~>|]/g, "")
        .replace(/\n+/g, " ")
        .slice(0, 500);

      setAiResponseText(aiReply);
      setConversationLogs(prev => [...prev, { role: 'assistant', text: aiReply }]);

      speakAIResponse(vocalText, () => {
        // After speaking finished, automatically resume listening for hands-free flow
        if (isComponentMounted.current && isCallActiveRef.current) {
          startListening();
        }
      });
    } catch (err) {
      const fallback = "I understood your point. Let's break this down step-by-step. What specific part should we focus on?";
      speakAIResponse(fallback, () => {
        if (isComponentMounted.current && isCallActiveRef.current) {
          startListening();
        }
      });
    }
  };

  const speakAIResponse = async (text, onFinished) => {
    updateCallState('speaking');
    stopListening();
    stopElevenLabsAudio();
    if (synthRef.current) synthRef.current.cancel();

    try {
      await speakElevenLabs(
        text,
        'doap',
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
      updateCallState('listening');
      if (onFinished) onFinished();
      return;
    }

    const spokenHumanText = humanizeTextForSpeech(text);
    const utterance = new SpeechSynthesisUtterance(spokenHumanText);
    utterance.rate = 0.98;
    utterance.pitch = 1.0;

    const naturalVoice = getBestNaturalVoice(synthRef.current, 'indian');
    if (naturalVoice) {
      utterance.voice = naturalVoice;
      utterance.lang = naturalVoice.lang || 'en-IN';
    } else {
      utterance.lang = 'en-IN';
    }

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
      isMutedRef.current = false;
      startListening();
    } else {
      setIsMuted(true);
      isMutedRef.current = true;
      stopListening();
      stopElevenLabsAudio();
      if (synthRef.current) synthRef.current.cancel();
      updateCallState('idle');
    }
  };

  const handleEndCall = () => {
    isCallActiveRef.current = false;
    updateCallState('idle');
    stopElevenLabsAudio();
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

        {/* Mic Permission Warning Banner */}
        {micErrorMessage && (
          <div className="w-full p-3 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center justify-between gap-2 animate-fade-in">
            <span className="flex items-center gap-2 text-left">
              <AlertCircle size={15} className="shrink-0 text-rose-400" />
              <span>{micErrorMessage}</span>
            </span>
            <button
              onClick={() => {
                hasFatalMicErrorRef.current = false;
                setMicErrorMessage('');
                startListening();
              }}
              className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-200 cursor-pointer shrink-0 transition-colors"
            >
              Retry
            </button>
          </div>
        )}

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
