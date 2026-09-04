import React, { useState, useEffect, useRef } from 'react';
import { 
  Mic, 
  MicOff, 
  Phone, 
  PhoneOff, 
  MessageSquare, 
  Clock, 
  Sparkles,
  Zap,
  Volume2,
  Send
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { generateSmartTutorResponse } from '../services/aiTutorEngine';
import { speakElevenLabs, stopElevenLabsAudio, unlockAudioContext, getBestNaturalVoice, ELEVEN_VOICES, humanizeTextForSpeech } from '../services/elevenLabsService';
import { transcribeAudioWithGroq } from '../services/whisperService';

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
  const userName = profile?.name ? profile.name.split(' ')[0] : 'there';

  // Call States: 'idle' | 'listening' | 'thinking' | 'speaking'
  const [callState, setCallState] = useState('idle');
  const callStateRef = useRef('idle');
  const isProcessingSpeechRef = useRef(false);
  const chromeSpeechTimerRef = useRef(null);
  const lastSpokenTextRef = useRef('');

  const updateCallState = (newState) => {
    callStateRef.current = newState;
    setCallState(newState);
  };

  const [isCallActive, setIsCallActive] = useState(false);
  const isCallActiveRef = useRef(false);
  const [isMuted, setIsMuted] = useState(false);
  const isMutedRef = useRef(false);
  const [callDuration, setCallDuration] = useState(0);

  const [selectedVoice, setSelectedVoice] = useState(() => {
    return (typeof localStorage !== 'undefined' && localStorage.getItem('doap_selected_voice')) || 'antoni';
  });

  const handleVoiceChange = (voiceKey) => {
    setSelectedVoice(voiceKey);
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('doap_selected_voice', voiceKey);
    }
  };

  const [userTranscript, setUserTranscript] = useState('');
  const [aiSpokenText, setAiSpokenText] = useState('');
  const [liveVolume, setLiveVolume] = useState(0);
  const [manualInput, setManualInput] = useState('');

  const synthRef = useRef(typeof window !== 'undefined' ? window.speechSynthesis : null);
  const durationTimerRef = useRef(null);
  const isMountedRef = useRef(true);

  // Microphone & MediaRecorder references for universal STT (Firefox + Chrome)
  const mediaStreamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const analyserRef = useRef(null);
  const animationFrameRef = useRef(null);
  const vadSilenceTimeoutRef = useRef(null);
  const hasSpokenInSessionRef = useRef(false);
  const noiseFloorRef = useRef(5);
  const speechStartTimeRef = useRef(0);

  // Browser SpeechRecognition reference (for Chrome/Edge if available)
  const recognitionRef = useRef(null);

  // Clean up on unmount
  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
      cleanupMediaStream();
      if (synthRef.current) synthRef.current.cancel();
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

  const cleanupMediaStream = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    if (vadSilenceTimeoutRef.current) {
      clearTimeout(vadSilenceTimeoutRef.current);
      vadSilenceTimeoutRef.current = null;
    }
    if (chromeSpeechTimerRef.current) {
      clearTimeout(chromeSpeechTimerRef.current);
      chromeSpeechTimerRef.current = null;
    }
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      try { mediaRecorderRef.current.stop(); } catch(e) {}
    }
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(t => t.stop());
      mediaStreamRef.current = null;
    }
    stopRecognition();
  };

  // Start universal microphone recording with safe constraints
  const initUniversalMicrophone = async () => {
    try {
      let stream = null;
      try {
        stream = await navigator.mediaDevices.getUserMedia({ 
          audio: { 
            echoCancellation: true, 
            noiseSuppression: true, 
            autoGainControl: true 
          } 
        });
      } catch (err1) {
        console.warn("Primary mic constraints rejected, fallback to basic audio:", err1);
        stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      }
      mediaStreamRef.current = stream;

      // Audio frequency analyzer for real-time visualizer
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        const audioCtx = new AudioCtx();
        const source = audioCtx.createMediaStreamSource(stream);
        const analyser = audioCtx.createAnalyser();
        analyser.fftSize = 256;
        source.connect(analyser);
        analyserRef.current = analyser;

        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        const checkAudioVolume = () => {
          if (!isMountedRef.current || !mediaStreamRef.current) return;
          analyser.getByteFrequencyData(dataArray);

          let sum = 0;
          for (let i = 0; i < bufferLength; i++) {
            sum += dataArray[i];
          }
          const avg = sum / bufferLength;
          setLiveVolume(avg);

          // Natural Interruption / Barge-in: If AI is currently speaking and user speaks loud
          if (callStateRef.current === 'speaking' && avg > 32) {
            stopElevenLabsAudio();
            if (synthRef.current) synthRef.current.cancel();
            resumeListeningCycle();
            return;
          }

          animationFrameRef.current = requestAnimationFrame(checkAudioVolume);
        };
        checkAudioVolume();
      }

      return true;
    } catch(err) {
      console.warn("Microphone access permission error:", err);
      return false;
    }
  };

  const startRecognition = () => {
    if (!isMountedRef.current || !isCallActiveRef.current || isMutedRef.current) return;
    const SpeechRec = typeof window !== 'undefined' && (window.SpeechRecognition || window.webkitSpeechRecognition);
    if (!SpeechRec) {
      console.warn('[SpeechRec] Web Speech API not supported in this browser');
      return;
    }

    // Stop and clean any previous instance
    stopRecognition();

    try {
      const rec = new SpeechRec();
      rec.continuous = true;
      rec.interimResults = true;
      rec.lang = navigator.language || 'en-IN';

      rec.onresult = (e) => {
        if (callStateRef.current !== 'listening' || isProcessingSpeechRef.current) return;

        let fullTranscript = '';
        for (let i = 0; i < e.results.length; i++) {
          fullTranscript += e.results[i][0].transcript + ' ';
        }

        const clean = fullTranscript.trim();
        if (clean) {
          setUserTranscript(clean);
          lastSpokenTextRef.current = clean;

          if (chromeSpeechTimerRef.current) {
            clearTimeout(chromeSpeechTimerRef.current);
          }

          // Trigger answer after 1.1s natural pause
          chromeSpeechTimerRef.current = setTimeout(() => {
            if (callStateRef.current === 'listening' && clean.length > 0 && !isProcessingSpeechRef.current) {
              isProcessingSpeechRef.current = true;
              updateCallState('thinking');
              stopRecognition();
              handleUserSpeechComplete(clean);
            }
          }, 1100);
        }
      };

      rec.onerror = (e) => {
        if (e.error !== 'no-speech' && e.error !== 'aborted') {
          console.warn('[SpeechRec] Status:', e.error);
        }
      };

      rec.onend = () => {
        // Auto-revive recognition if the session is still active and listening
        if (isMountedRef.current && isCallActiveRef.current && !isMutedRef.current && callStateRef.current === 'listening') {
          setTimeout(() => {
            if (isMountedRef.current && isCallActiveRef.current && !isMutedRef.current && callStateRef.current === 'listening') {
              startRecognition();
            }
          }, 150);
        }
      };

      rec.start();
      recognitionRef.current = rec;
    } catch(err) {
      console.warn('[SpeechRec] Start error:', err);
    }
  };

  const stopRecognition = () => {
    if (chromeSpeechTimerRef.current) {
      clearTimeout(chromeSpeechTimerRef.current);
      chromeSpeechTimerRef.current = null;
    }
    if (recognitionRef.current) {
      try {
        recognitionRef.current.onresult = null;
        recognitionRef.current.onend = null;
        recognitionRef.current.onerror = null;
        recognitionRef.current.stop();
      } catch(e) {}
      recognitionRef.current = null;
    }
  };

  const resumeListeningCycle = () => {
    if (!isMountedRef.current || !isCallActiveRef.current || isMutedRef.current) return;
    isProcessingSpeechRef.current = false;
    lastSpokenTextRef.current = '';
    setUserTranscript('');
    updateCallState('listening');
    startRecognition();
  };

  const handleStartCall = async () => {
    unlockAudioContext();
    playBootChime();
    setIsCallActive(true);
    isCallActiveRef.current = true;
    isProcessingSpeechRef.current = false;
    updateCallState('speaking');
    setUserTranscript('');
    setAiSpokenText('');

    // Initialize microphone stream
    await initUniversalMicrophone();

    const welcome = `Hey ${userName}! I'm online and listening. What are we working on today, buddy?`;
    setAiSpokenText(welcome);

    speakResponse(welcome, () => {
      resumeListeningCycle();
    });
  };

  const handleEndCall = () => {
    playShutdownChime();
    setIsCallActive(false);
    isCallActiveRef.current = false;
    updateCallState('idle');
    isProcessingSpeechRef.current = false;
    cleanupMediaStream();
    stopElevenLabsAudio();
    if (synthRef.current) synthRef.current.cancel();
    setUserTranscript('');
    setAiSpokenText('');
  };

  const executeVoicePlugins = (cmd) => {
    const cleanCmd = cmd.toLowerCase().trim();
    if (cleanCmd.includes('open coding') || cleanCmd.includes('go to coding') || cleanCmd.includes('coding practice') || cleanCmd.includes('coding khol')) {
      navigateTo('/coding');
      return "Got it buddy, opening Coding Practice for you right now!";
    }
    if (cleanCmd.includes('open learning') || cleanCmd.includes('my learning') || cleanCmd.includes('open courses') || cleanCmd.includes('learning khol')) {
      navigateTo('/learning');
      return "On it! Opening My Learning engineering modules.";
    }
    if (cleanCmd.includes('open assessment') || cleanCmd.includes('open test') || cleanCmd.includes('assessments') || cleanCmd.includes('test khol')) {
      navigateTo('/assessments');
      return "Opening Assessments and live benchmark tests right away, buddy!";
    }
    if (cleanCmd.includes('open chat') || cleanCmd.includes('text ai') || cleanCmd.includes('switch to text') || cleanCmd.includes('chat khol')) {
      navigateTo('/ai-tutor');
      return "Switching over to text chat, let's go!";
    }
    return null;
  };

  const handleUserSpeechComplete = async (spokenPrompt) => {
    if (!spokenPrompt || !isMountedRef.current) return;
    if (isProcessingSpeechRef.current && callStateRef.current === 'speaking') return;
    isProcessingSpeechRef.current = true;
    updateCallState('thinking');
    setUserTranscript(spokenPrompt);

    const actionResult = executeVoicePlugins(spokenPrompt);
    if (actionResult) {
      setAiSpokenText(actionResult);
      speakResponse(actionResult, () => {
        resumeListeningCycle();
      });
      return;
    }

    try {
      const response = await generateSmartTutorResponse(spokenPrompt, userName, [], { voiceMode: true });
      const speechCleaned = response
        .replace(/```[\s\S]*?```/g, 'Code block generated.')
        .replace(/`([^`]+)`/g, '$1')
        .replace(/[#*_~>]/g, '')
        .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1')
        .trim();

      setAiSpokenText(speechCleaned);

      speakResponse(speechCleaned, () => {
        resumeListeningCycle();
      });
    } catch (err) {
      const fallback = `I'm listening, buddy! Tell me what you'd like to work on or explore today.`;
      speakResponse(fallback, () => {
        resumeListeningCycle();
      });
    }
  };

  const speakResponse = async (text, onComplete) => {
    updateCallState('speaking');
    stopRecognition();
    stopElevenLabsAudio();
    if (synthRef.current) synthRef.current.cancel();

    try {
      await speakElevenLabs(
        text, 
        selectedVoice,
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
      updateCallState('listening');
      isProcessingSpeechRef.current = false;
      if (onComplete) onComplete();
      return;
    }

    const spokenHumanText = humanizeTextForSpeech(text);
    const utterance = new SpeechSynthesisUtterance(spokenHumanText);
    utterance.rate = 0.98;
    utterance.pitch = 1.0;

    const naturalVoice = getBestNaturalVoice(synthRef.current);
    if (naturalVoice) {
      utterance.voice = naturalVoice;
      utterance.lang = naturalVoice.lang || 'en-US';
    }

    utterance.onend = () => {
      isProcessingSpeechRef.current = false;
      if (onComplete && isMountedRef.current) onComplete();
    };

    utterance.onerror = () => {
      isProcessingSpeechRef.current = false;
      if (onComplete && isMountedRef.current) onComplete();
    };

    synthRef.current.speak(utterance);
  };

  const toggleMute = () => {
    if (isMuted) {
      setIsMuted(false);
      isMutedRef.current = false;
      resumeListeningCycle();
    } else {
      setIsMuted(true);
      isMutedRef.current = true;
      stopRecognition();
      stopElevenLabsAudio();
      if (synthRef.current) synthRef.current.cancel();
      updateCallState('idle');
      isProcessingSpeechRef.current = false;
    }
  };

  return (
    <div className="h-full w-full flex-1 flex flex-col justify-between p-4 sm:p-8 select-none bg-[#05070c] text-white animate-fade-in relative overflow-hidden">
      {/* 1. Clean Minimal Top Bar: "DOAP AI" */}
      <div className="flex items-center justify-between z-20 pb-3 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-sm font-bold tracking-wide">
            <span className={`w-2.5 h-2.5 rounded-full bg-cyan-400 ${isCallActive ? "animate-ping" : ""}`} />
            <span>DOAP AI</span>
          </div>

          {isCallActive && (
            <span className="text-xs font-mono text-cyan-300 flex items-center gap-1.5 bg-cyan-950/50 px-3 py-1 rounded-full border border-cyan-500/30">
              <Clock size={12} /> {formatDuration(callDuration)}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          {/* AI Voice Persona Selector */}
          <div className="relative flex items-center">
            <Volume2 size={13} className="text-cyan-400 absolute left-2.5 pointer-events-none" />
            <select
              value={selectedVoice}
              onChange={(e) => handleVoiceChange(e.target.value)}
              className="bg-white/5 hover:bg-white/10 text-white/90 text-xs font-medium pl-7 pr-3 py-1.5 rounded-xl border border-white/15 outline-none cursor-pointer transition-all focus:border-cyan-500/50"
              title="Select AI Voice Persona"
            >
              <option value="antoni" className="bg-neutral-900 text-white">Antoni (Warm & Natural)</option>
              <option value="adam" className="bg-neutral-900 text-white">Adam (Deep & Engaging)</option>
              <option value="liam" className="bg-neutral-900 text-white">Liam (Tech Buddy)</option>
              <option value="alice" className="bg-neutral-900 text-white">Alice (Clear Female)</option>
              <option value="brian" className="bg-neutral-900 text-white">Brian (Studio Narrator)</option>
            </select>
          </div>

          {/* Switch to Text AI Chat */}
          <button
            onClick={() => navigateTo('/ai-tutor')}
            className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs font-semibold border border-white/15 bg-white/5 hover:bg-white/10 transition-all flex items-center gap-2 cursor-pointer hover:scale-105"
          >
            <MessageSquare size={13} className="text-cyan-400" />
            <span className="hidden sm:inline">Text AI Chat</span>
          </button>
        </div>
      </div>

      {/* 2. Main Expansive Arc-Reactor Core (Maximum Screen Area) */}
      <div className="flex-1 flex flex-col items-center justify-center relative my-auto overflow-hidden">
        {/* Hypnotic Ambient Radial Glow */}
        <div 
          className="absolute w-[500px] h-[500px] rounded-full blur-3xl opacity-25 pointer-events-none transition-all duration-700"
          style={{
            backgroundColor: callState === 'speaking' ? '#06b6d4' : callState === 'listening' ? '#3b82f6' : callState === 'thinking' ? '#f59e0b' : '#6366f1',
            transform: isCallActive ? `scale(${1.2 + (liveVolume / 80)})` : 'scale(0.85)'
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
                ? 'LISTENING TO YOU, BUDDY...' 
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

        {/* Live Audio Equalizer Wave Bars (Reacts to Real Voice Volume) */}
        {isCallActive && (
          <div className="flex items-center gap-2 mt-6 h-9 z-10">
            {[35, 65, 90, 55, 80, 100, 70, 45, 85, 60, 40].map((h, i) => (
              <div 
                key={i} 
                className="w-1.5 rounded-full bg-cyan-400 transition-all duration-100"
                style={{
                  height: callState === 'speaking' 
                    ? `${(h * (Math.sin(Date.now() / 200 + i) + 1.2)) / 2}%` 
                    : callState === 'listening' 
                    ? `${Math.max(6, Math.min(100, liveVolume * 1.8 + (h * 0.2)))}%` 
                    : '4px',
                  opacity: callState === 'speaking' || liveVolume > 10 ? 0.95 : 0.4
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
            <p className="text-xs font-mono text-neutral-400">
              {isCallActive ? "Mic active — speak naturally in any language, I'll answer in English!" : "Tap Start Call to talk with DOAP AI in hands-free voice"}
            </p>
          )}
        </div>

        {/* Quick Interactive Input (Type or Speak) */}
        {isCallActive && (
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              if (!manualInput.trim()) return;
              const text = manualInput.trim();
              setManualInput('');
              stopRecognition();
              handleUserSpeechComplete(text);
            }}
            className="w-full max-w-md flex items-center gap-2 mt-4 px-4 z-20 animate-fade-in"
          >
            <div className="flex-1 relative flex items-center">
              <input
                type="text"
                value={manualInput}
                onChange={(e) => setManualInput(e.target.value)}
                placeholder="Or type here if mic isn't available..."
                className="w-full bg-white/5 border border-white/15 focus:border-cyan-500/60 rounded-full py-2 pl-4 pr-9 text-xs text-white placeholder-neutral-500 outline-none backdrop-blur-md transition-all shadow-inner"
              />
              {manualInput.trim() && (
                <button
                  type="submit"
                  className="absolute right-1.5 p-1.5 rounded-full bg-cyan-500 text-black hover:bg-cyan-400 transition-all cursor-pointer"
                >
                  <Send size={12} />
                </button>
              )}
            </div>
          </form>
        )}

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
