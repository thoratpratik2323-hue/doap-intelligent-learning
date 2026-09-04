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
  Copy,
  Check,
  RotateCcw,
  AlertCircle,
  ArrowRight
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { generateSmartTutorResponse } from '../services/aiTutorEngine';
import { speakElevenLabs, stopElevenLabsAudio, unlockAudioContext, getBestNaturalVoice, humanizeTextForSpeech } from '../services/elevenLabsService';
import { transcribeAudioWithGroq } from '../services/whisperService';

// Mark LII Arc-Reactor Acoustic Synthesizer (Web Audio API)
const playBootChime = () => {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const now = ctx.currentTime;

    // 1. Reactor Core Spin-up (Deep low-frequency sweep)
    const subOsc = ctx.createOscillator();
    const subGain = ctx.createGain();
    subOsc.type = 'sawtooth';
    subOsc.frequency.setValueAtTime(65, now);
    subOsc.frequency.exponentialRampToValueAtTime(280, now + 0.8);
    subGain.gain.setValueAtTime(0.2, now);
    subGain.gain.exponentialRampToValueAtTime(0.01, now + 1.1);
    
    // Low-pass filter for deep mechanical reactor hum
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(200, now);
    filter.frequency.exponentialRampToValueAtTime(800, now + 0.8);

    subOsc.connect(filter);
    filter.connect(subGain);
    subGain.connect(ctx.destination);
    subOsc.start(now);
    subOsc.stop(now + 1.1);

    // 2. Servo Lock / Relay Actuation Click
    const clickOsc = ctx.createOscillator();
    const clickGain = ctx.createGain();
    clickOsc.type = 'triangle';
    clickOsc.frequency.setValueAtTime(1400, now + 0.35);
    clickOsc.frequency.exponentialRampToValueAtTime(300, now + 0.45);
    clickGain.gain.setValueAtTime(0.18, now + 0.35);
    clickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
    clickOsc.connect(clickGain);
    clickGain.connect(ctx.destination);
    clickOsc.start(now + 0.35);
    clickOsc.stop(now + 0.5);

    // 3. Mark LII Bright Systems-Online Harmonic Chords (C5 Major Suite)
    const freqs = [523.25, 659.25, 783.99, 1046.50];
    freqs.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + 0.6 + (idx * 0.04));
      gain.gain.setValueAtTime(0.12, now + 0.6 + (idx * 0.04));
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.6);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + 0.6 + (idx * 0.04));
      osc.stop(now + 1.6);
    });
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

  const [micError, setMicError] = useState('');
  const [hasCopied, setHasCopied] = useState(false);
  const [userTranscript, setUserTranscript] = useState('');
  const [aiSpokenText, setAiSpokenText] = useState('');
  const [liveVolume, setLiveVolume] = useState(0);

  const handleCopyText = (text) => {
    if (!text) return;
    navigator.clipboard?.writeText(text).then(() => {
      setHasCopied(true);
      setTimeout(() => setHasCopied(false), 2000);
    }).catch(() => {});
  };

  const handleReplay = () => {
    if (!aiSpokenText) return;
    speakResponse(aiSpokenText, () => {
      resumeListeningCycle();
    });
  };

  const synthRef = useRef(typeof window !== 'undefined' ? window.speechSynthesis : null);
  const durationTimerRef = useRef(null);
  const isMountedRef = useRef(true);
  const activeUtteranceRef = useRef(null);
  const speechWatchdogTimerRef = useRef(null);
  const isStartingRecognitionRef = useRef(false);
  const hasFatalMicErrorRef = useRef(false);

  // Pre-load voices on Chrome/Edge as soon as speech engine fires onvoiceschanged
  useEffect(() => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    const loadVoices = () => {
      if (synthRef.current) synthRef.current.getVoices();
    };
    loadVoices();
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, []);

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
      if (speechWatchdogTimerRef.current) {
        clearTimeout(speechWatchdogTimerRef.current);
        speechWatchdogTimerRef.current = null;
      }
      activeUtteranceRef.current = null;
      if (typeof window !== 'undefined') window._doapActiveUtterance = null;
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
    setMicError('');
    hasFatalMicErrorRef.current = false;
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

          animationFrameRef.current = requestAnimationFrame(checkAudioVolume);
        };
        checkAudioVolume();
      }

      return true;
    } catch(err) {
      console.warn("Microphone access permission error:", err);
      hasFatalMicErrorRef.current = true;
      setMicError('Microphone permission blocked. Please allow microphone access in your browser to speak with DOAP AI.');
      return false;
    }
  };

  const startRecognition = () => {
    if (!isMountedRef.current || !isCallActiveRef.current || isMutedRef.current || callStateRef.current !== 'listening' || hasFatalMicErrorRef.current) return;
    const SpeechRec = typeof window !== 'undefined' && (window.SpeechRecognition || window.webkitSpeechRecognition);
    if (!SpeechRec) {
      console.warn('[SpeechRec] Web Speech API not supported in this browser');
      return;
    }

    if (isStartingRecognitionRef.current) return;
    isStartingRecognitionRef.current = true;

    // Clean up any existing active recognition instance safely
    if (recognitionRef.current) {
      try {
        recognitionRef.current.onresult = null;
        recognitionRef.current.onend = null;
        recognitionRef.current.onerror = null;
        recognitionRef.current.abort();
      } catch(e) {}
      recognitionRef.current = null;
    }

    try {
      const rec = new SpeechRec();
      rec.continuous = true;
      rec.interimResults = true;
      rec.lang = 'en-IN'; // Explicit Indian English recognition for authentic phonetic match

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

          // Trigger answer after 1.0s natural pause
          chromeSpeechTimerRef.current = setTimeout(() => {
            if (callStateRef.current === 'listening' && clean.length > 0 && !isProcessingSpeechRef.current) {
              isProcessingSpeechRef.current = true;
              updateCallState('thinking');
              stopRecognition();
              handleUserSpeechComplete(clean);
            }
          }, 1000);
        }
      };

      rec.onerror = (e) => {
        if (e.error === 'no-speech' || e.error === 'aborted') {
          return;
        }
        console.warn('[SpeechRec] Status:', e.error);
        if (e.error === 'not-allowed' || e.error === 'service-not-allowed') {
          hasFatalMicErrorRef.current = true;
          setMicError('Microphone permission blocked. Click the lock/mic icon in your address bar to allow mic access.');
        } else if (e.error === 'audio-capture') {
          hasFatalMicErrorRef.current = true;
          setMicError('Microphone not detected. Please verify your microphone is plugged in.');
        } else if (e.error === 'network') {
          setMicError('Speech recognition network timeout. Reconnecting...');
        }
      };

      rec.onend = () => {
        recognitionRef.current = null;
        isStartingRecognitionRef.current = false;
        if (hasFatalMicErrorRef.current) return; // Do NOT loop indefinitely on permission errors
        // Auto-revive recognition immediately if the session is still active and in listening state
        if (isMountedRef.current && isCallActiveRef.current && !isMutedRef.current && callStateRef.current === 'listening' && !isProcessingSpeechRef.current) {
          setTimeout(() => {
            if (isMountedRef.current && isCallActiveRef.current && !isMutedRef.current && callStateRef.current === 'listening' && !isProcessingSpeechRef.current && !hasFatalMicErrorRef.current) {
              startRecognition();
            }
          }, 150);
        }
      };

      rec.start();
      recognitionRef.current = rec;
      isStartingRecognitionRef.current = false;
    } catch(err) {
      isStartingRecognitionRef.current = false;
      console.warn('[SpeechRec] Start error:', err);
      if (!hasFatalMicErrorRef.current) {
        setTimeout(() => {
          if (isMountedRef.current && isCallActiveRef.current && !isMutedRef.current && callStateRef.current === 'listening' && !hasFatalMicErrorRef.current) {
            startRecognition();
          }
        }, 500);
      }
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
        recognitionRef.current.abort();
      } catch(e) {}
      recognitionRef.current = null;
    }
    isStartingRecognitionRef.current = false;
  };

  const resumeListeningCycle = () => {
    if (!isMountedRef.current || !isCallActiveRef.current || isMutedRef.current) return;
    isProcessingSpeechRef.current = false;
    lastSpokenTextRef.current = '';
    setUserTranscript('');
    updateCallState('listening');
    setTimeout(() => {
      if (isMountedRef.current && isCallActiveRef.current && !isMutedRef.current && callStateRef.current === 'listening' && !hasFatalMicErrorRef.current) {
        startRecognition();
      }
    }, 120);
  };

  const handleStartCall = async (initialPrompt = null) => {
    hasFatalMicErrorRef.current = false;
    setMicError('');
    unlockAudioContext();
    playBootChime();
    setIsCallActive(true);
    isCallActiveRef.current = true;
    isProcessingSpeechRef.current = false;
    setUserTranscript(typeof initialPrompt === 'string' ? initialPrompt : '');
    setAiSpokenText('');

    // Initialize microphone stream
    const micGranted = await initUniversalMicrophone();
    if (!micGranted) {
      hasFatalMicErrorRef.current = true;
    }

    if (typeof initialPrompt === 'string' && initialPrompt.trim()) {
      handleUserSpeechComplete(initialPrompt);
      return;
    }

    updateCallState('speaking');
    const welcome = `Hey ${userName}! I'm DOAP AI, online and listening. What are we working on today, buddy?`;
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
        .replace(/<think>[\s\S]*?<\/think>/gi, '')
        .replace(/<details[\s\S]*?<\/details>/gi, '')
        .replace(/\*\*Reasoning\*\*[\s\S]*?\*\*Final Answer\*\*/i, '')
        .replace(/```[\s\S]*?```/g, 'Code block outlined on screen.')
        .replace(/`([^`]+)`/g, '$1')
        .replace(/[#*_~>|]/g, '')
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

    let finished = false;
    const safeComplete = () => {
      if (finished) return;
      finished = true;
      if (speechWatchdogTimerRef.current) {
        clearTimeout(speechWatchdogTimerRef.current);
        speechWatchdogTimerRef.current = null;
      }
      activeUtteranceRef.current = null;
      if (typeof window !== 'undefined') window._doapActiveUtterance = null;
      if (onComplete && isMountedRef.current) {
        onComplete();
      }
    };

    // Watchdog timer: guarantees listening cycle ALWAYS resumes even on audio stutter
    const estimatedDurationMs = Math.min(22000, Math.max(3500, (text || '').length * 95));
    speechWatchdogTimerRef.current = setTimeout(() => {
      stopElevenLabsAudio();
      if (synthRef.current) synthRef.current.cancel();
      safeComplete();
    }, estimatedDurationMs);

    try {
      await speakElevenLabs(
        text, 
        'doap',
        () => {
          safeComplete();
        },
        () => {
          fallbackBrowserSpeech(text, safeComplete);
        }
      );
    } catch (err) {
      fallbackBrowserSpeech(text, safeComplete);
    }
  };

  const fallbackBrowserSpeech = (text, onComplete, specificVoice = null) => {
    if (!synthRef.current) {
      if (onComplete) onComplete();
      return;
    }

    try {
      synthRef.current.cancel();
      const spokenHumanText = humanizeTextForSpeech(text);
      const utterance = new SpeechSynthesisUtterance(spokenHumanText);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;

      const chosenVoice = specificVoice || getBestNaturalVoice(synthRef.current, 'indian');
      if (chosenVoice) {
        utterance.voice = chosenVoice;
        utterance.lang = chosenVoice.lang || 'en-IN';
      } else {
        utterance.lang = 'en-IN';
      }

      // Keep live reference so Chrome does not garbage-collect utterance mid-speech
      activeUtteranceRef.current = utterance;
      if (typeof window !== 'undefined') window._doapActiveUtterance = utterance;

      utterance.onend = () => {
        activeUtteranceRef.current = null;
        if (typeof window !== 'undefined') window._doapActiveUtterance = null;
        if (onComplete && isMountedRef.current) onComplete();
      };

      utterance.onerror = () => {
        activeUtteranceRef.current = null;
        if (typeof window !== 'undefined') window._doapActiveUtterance = null;
        if (onComplete && isMountedRef.current) onComplete();
      };

      synthRef.current.speak(utterance);
    } catch(err) {
      console.warn('[BrowserSpeech] Speak error:', err);
      if (onComplete && isMountedRef.current) onComplete();
    }
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

  const CONVERSATION_STARTERS = [
    {
      title: "Binary Search Trees",
      prompt: "Explain Binary Search Trees with a real world analogy, buddy!",
      badge: "DSA Concept"
    },
    {
      title: "Python vs JavaScript",
      prompt: "What is the key difference between Python and JavaScript, and which should I master first?",
      badge: "Web & Tech"
    },
    {
      title: "Sanjivani University",
      prompt: "Tell me about Sanjivani University, Kopargaon and Chairman Hon. Shri Nitindada Kolhe Saheb.",
      badge: "Campus Info"
    },
    {
      title: "Mock Interview Drill",
      prompt: "Give me a quick 1-minute FAANG coding interview problem to solve right now.",
      badge: "Interview Prep"
    }
  ];

  return (
    <div className="h-full w-full flex-1 flex flex-col justify-between p-3 sm:p-6 select-none bg-[#030712] text-white animate-fade-in relative overflow-hidden">
      {/* Dynamic Ambient Mesh Glow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[140px] pointer-events-none transition-all duration-1000 opacity-25"
        style={{
          background: callState === 'speaking' 
            ? 'radial-gradient(circle, rgba(6,182,212,0.8) 0%, rgba(14,165,233,0.3) 50%, transparent 70%)'
            : callState === 'listening'
            ? 'radial-gradient(circle, rgba(59,130,246,0.8) 0%, rgba(99,102,241,0.3) 50%, transparent 70%)'
            : callState === 'thinking'
            ? 'radial-gradient(circle, rgba(245,158,11,0.8) 0%, rgba(217,119,6,0.3) 50%, transparent 70%)'
            : 'radial-gradient(circle, rgba(99,102,241,0.6) 0%, rgba(6,182,212,0.2) 50%, transparent 70%)',
          transform: isCallActive ? `translate(-50%, -50%) scale(${1 + (liveVolume / 90)})` : 'translate(-50%, -50%) scale(0.85)'
        }}
      />

      {/* 1. Sleek Modern Header Bar */}
      <div className="flex items-center justify-between z-20 pb-3 border-b border-white/10 gap-2">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs sm:text-sm font-bold tracking-wide shadow-sm">
            <span className={`w-2.5 h-2.5 rounded-full bg-cyan-400 ${isCallActive ? "animate-ping" : ""}`} />
            <span>DOAP AI</span>
          </div>

          {isCallActive && (
            <span className="text-xs font-mono text-cyan-300 flex items-center gap-1.5 bg-cyan-950/60 px-3 py-1 rounded-full border border-cyan-500/30 shadow-inner">
              <Clock size={12} /> {formatDuration(callDuration)}
            </span>
          )}
        </div>

        {/* Switch to Text Chat */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => navigateTo('/ai-tutor')}
            className="px-3 py-1.5 rounded-xl text-xs font-semibold border border-white/15 bg-white/5 hover:bg-white/10 transition-all flex items-center gap-1.5 cursor-pointer hover:scale-105 active:scale-95"
            title="Switch to Text Chat"
          >
            <MessageSquare size={13} className="text-cyan-400" />
            <span className="hidden sm:inline">Text Chat</span>
          </button>
        </div>
      </div>

      {/* Mic Error Banner (Dismissible with Retry) */}
      {micError && (
        <div className="z-30 my-2 w-full max-w-2xl mx-auto p-3.5 rounded-2xl bg-rose-950/80 border border-rose-500/40 text-rose-200 text-xs flex items-center justify-between gap-3 shadow-2xl animate-fade-in backdrop-blur-md">
          <div className="flex items-center gap-2.5">
            <AlertCircle size={18} className="text-rose-400 shrink-0" />
            <span>{micError}</span>
          </div>
          <button
            onClick={() => {
              hasFatalMicErrorRef.current = false;
              setMicError('');
              initUniversalMicrophone().then(ok => {
                if (ok && isCallActiveRef.current && callStateRef.current === 'listening') {
                  startRecognition();
                }
              });
            }}
            className="px-3 py-1 rounded-lg bg-rose-500 hover:bg-rose-600 text-white font-semibold text-xs transition-all cursor-pointer shrink-0"
          >
            Retry Mic
          </button>
        </div>
      )}

      {/* 2. Main Expansive Stage */}
      <div className="flex-1 flex flex-col items-center justify-center relative my-auto overflow-y-auto z-10 w-full max-w-4xl mx-auto px-2 py-4">
        {/* Status Pill */}
        <div className="mb-6 z-10">
          <div className={`px-5 py-2 rounded-full text-xs font-mono font-bold border flex items-center gap-2.5 transition-all shadow-lg ${
            isCallActive 
              ? (callState === 'speaking' 
                  ? 'bg-cyan-500/15 border-cyan-500/50 text-cyan-300 shadow-cyan-500/20' 
                  : callState === 'listening' 
                  ? 'bg-blue-500/15 border-blue-500/50 text-blue-300 shadow-blue-500/20' 
                  : 'bg-amber-500/15 border-amber-500/50 text-amber-300 shadow-amber-500/20')
              : 'bg-neutral-900/90 border-neutral-800 text-neutral-400'
          }`}>
            <span className={`w-2 h-2 rounded-full ${
              isCallActive 
                ? (callState === 'speaking' 
                    ? 'bg-cyan-400 animate-pulse' 
                    : callState === 'listening' 
                    ? 'bg-blue-400 animate-ping' 
                    : 'bg-amber-400 animate-bounce') 
                : 'bg-neutral-600'
            }`} />
            <span>
              {!isCallActive 
                ? 'DOAP AI READY — TAP OR PICK A TOPIC' 
                : callState === 'speaking' 
                ? 'DOAP AI SPEAKING...' 
                : callState === 'listening' 
                ? 'LISTENING TO YOU (SPEAK FREELY)...' 
                : 'THINKING...'}
            </span>
          </div>
        </div>

        {/* The DOAP AI Luminous Living Voice Orb */}
        <div className="relative flex items-center justify-center my-4 z-10">
          {/* Reactive Ambient Outer Rings */}
          <div 
            className="absolute w-72 h-72 sm:w-88 sm:h-88 rounded-full border border-dashed pointer-events-none transition-all duration-700"
            style={{ 
              animation: isCallActive ? 'spin 18s linear infinite' : 'none',
              borderColor: isCallActive ? 'rgba(6,182,212,0.35)' : 'rgba(255,255,255,0.08)',
              transform: `scale(${1 + (liveVolume / 140)})`
            }}
          />

          <div 
            className="absolute w-60 h-60 sm:w-72 sm:h-72 rounded-full border pointer-events-none transition-all duration-500"
            style={{ 
              animation: isCallActive ? 'spin 12s linear infinite reverse' : 'none',
              borderColor: isCallActive ? 'rgba(59,130,246,0.3)' : 'rgba(255,255,255,0.05)'
            }}
          />

          {isCallActive && (
            <div 
              className="absolute w-48 h-48 sm:w-56 sm:h-56 rounded-full border-2 border-cyan-400/40 animate-ping pointer-events-none"
              style={{ animationDuration: callState === 'speaking' ? '1.2s' : '2.4s' }}
            />
          )}

          {/* Central Luminous Sphere Button */}
          <button
            onClick={isCallActive ? handleEndCall : () => handleStartCall()}
            className={`w-40 h-40 sm:w-48 sm:h-48 rounded-full flex flex-col items-center justify-center cursor-pointer transition-all duration-500 shadow-2xl hover:scale-105 active:scale-95 z-20 relative overflow-hidden group ${
              isCallActive 
                ? (callState === 'speaking'
                    ? 'bg-gradient-to-tr from-cyan-600 via-teal-600 to-blue-600 text-white ring-8 ring-cyan-500/30 shadow-cyan-500/50'
                    : callState === 'listening'
                    ? 'bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-600 text-white ring-8 ring-blue-500/30 shadow-blue-500/50'
                    : 'bg-gradient-to-tr from-amber-600 via-orange-600 to-yellow-600 text-white ring-8 ring-amber-500/30 shadow-amber-500/50')
                : 'bg-gradient-to-b from-neutral-900 to-neutral-950 text-white hover:from-neutral-850 hover:to-neutral-900 ring-8 ring-white/5 border border-white/15 hover:border-cyan-500/40'
            }`}
            title={isCallActive ? 'Tap to End Call' : 'Tap to Start Call with DOAP AI'}
          >
            {/* Sphere Highlight Sheen */}
            <div className="absolute top-0 left-1/4 w-1/2 h-1/3 bg-white/20 rounded-full blur-sm pointer-events-none" />

            {isCallActive ? (
              <>
                <PhoneOff size={38} className="animate-pulse drop-shadow-md text-rose-200" />
                <span className="text-[11px] font-mono font-bold mt-2 uppercase tracking-wider text-rose-100 drop-shadow">End Call</span>
              </>
            ) : (
              <>
                <div className="relative">
                  <Phone size={38} className="text-cyan-400 group-hover:scale-110 transition-transform drop-shadow" />
                  <Sparkles size={16} className="text-amber-400 absolute -top-1 -right-2 animate-bounce" />
                </div>
                <span className="text-[11px] font-mono font-bold mt-2 uppercase tracking-wider text-cyan-300 group-hover:text-cyan-200">Start Call</span>
              </>
            )}
          </button>
        </div>

        {/* 16-Band Dynamic Acoustic Soundwave Visualizer */}
        {isCallActive && (
          <div className="flex items-center gap-1.5 sm:gap-2 mt-4 h-9 z-10">
            {[25, 45, 75, 95, 60, 85, 100, 70, 50, 90, 65, 80, 40, 70, 55, 30].map((h, i) => (
              <div 
                key={i} 
                className="w-1 sm:w-1.5 rounded-full transition-all duration-100"
                style={{
                  background: callState === 'speaking' 
                    ? 'linear-gradient(to top, #06b6d4, #3b82f6)' 
                    : 'linear-gradient(to top, #3b82f6, #6366f1)',
                  height: callState === 'speaking' 
                    ? `${Math.max(6, (h * (Math.sin(Date.now() / 180 + i) + 1.2)) / 2)}%` 
                    : callState === 'listening' 
                    ? `${Math.max(6, Math.min(100, liveVolume * 2.0 + (h * 0.15)))}%` 
                    : '4px',
                  opacity: callState === 'speaking' || liveVolume > 8 ? 0.95 : 0.35
                }}
              />
            ))}
          </div>
        )}

        {/* Pre-Call State: Topic Starter Chips */}
        {!isCallActive && (
          <div className="w-full max-w-2xl mt-8 z-10 px-2 animate-fade-in">
            <div className="flex items-center justify-center gap-2 mb-3 text-xs font-mono font-semibold text-neutral-400 uppercase tracking-wider">
              <Sparkles size={13} className="text-amber-400" />
              <span>Tap any topic to talk right away</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {CONVERSATION_STARTERS.map((starter, idx) => (
                <button
                  key={idx}
                  onClick={() => handleStartCall(starter.prompt)}
                  className="p-3.5 rounded-2xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-cyan-500/40 transition-all text-left group cursor-pointer shadow-sm hover:shadow-cyan-500/10 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-between gap-3"
                >
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 inline-block mb-1">
                      {starter.badge}
                    </span>
                    <p className="text-xs sm:text-sm font-semibold text-neutral-200 group-hover:text-white truncate">
                      {starter.title}
                    </p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white/5 group-hover:bg-cyan-500/20 border border-white/10 group-hover:border-cyan-500/30 flex items-center justify-center shrink-0 transition-colors">
                    <ArrowRight size={14} className="text-neutral-400 group-hover:text-cyan-300 group-hover:translate-x-0.5 transition-all" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* In-Call Dialogue Card (Scrollable & Non-Truncated with Copy & Replay) */}
        {isCallActive && (userTranscript || aiSpokenText) && (
          <div className="w-full max-w-2xl mt-6 z-10 px-2 flex flex-col gap-3 animate-fade-in">
            {/* User Spoken Prompt Bubble */}
            {userTranscript && (
              <div className="p-3.5 sm:p-4 rounded-2xl bg-cyan-950/50 backdrop-blur-xl border border-cyan-500/30 shadow-lg text-left select-text">
                <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-400 mb-1 flex items-center gap-1.5">
                  <Mic size={11} />
                  <span>You Spoke:</span>
                </div>
                <p className="text-xs sm:text-sm font-medium text-cyan-100 italic leading-relaxed">
                  "{userTranscript}"
                </p>
              </div>
            )}

            {/* DOAP AI Spoken Response Card */}
            {aiSpokenText && (
              <div className="p-4 sm:p-5 rounded-2xl bg-neutral-900/90 backdrop-blur-xl border border-white/10 shadow-2xl text-left select-text flex flex-col gap-2">
                <div className="flex items-center justify-between pb-2 border-b border-white/10 gap-2">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center">
                      <Sparkles size={12} className="text-cyan-400" />
                    </div>
                    <span className="text-xs font-bold text-neutral-200">DOAP AI</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {/* Copy Text Button */}
                    <button
                      onClick={() => handleCopyText(aiSpokenText)}
                      className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white transition-all cursor-pointer flex items-center gap-1 text-[11px]"
                      title="Copy response text"
                    >
                      {hasCopied ? (
                        <>
                          <Check size={12} className="text-emerald-400" />
                          <span className="text-emerald-400 font-medium">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy size={12} />
                          <span className="hidden sm:inline">Copy</span>
                        </>
                      )}
                    </button>

                    {/* Replay Audio Button */}
                    <button
                      onClick={handleReplay}
                      className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white transition-all cursor-pointer flex items-center gap-1 text-[11px]"
                      title="Replay speech"
                    >
                      <RotateCcw size={12} />
                      <span className="hidden sm:inline">Replay</span>
                    </button>
                  </div>
                </div>

                {/* Fully Scrollable Dialogue Content — No Truncation */}
                <div className="max-h-52 sm:max-h-64 overflow-y-auto pr-2 custom-scrollbar">
                  <p className="text-xs sm:text-sm font-normal text-neutral-100 leading-relaxed whitespace-pre-wrap">
                    {aiSpokenText}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Idle Instructions Footer */}
        {isCallActive && !userTranscript && !aiSpokenText && (
          <p className="text-xs font-mono text-neutral-400 text-center py-4 z-10">
            Mic active — speak naturally in Indian English or Hindi, DOAP AI is listening!
          </p>
        )}
      </div>

      {/* 3. Floating Bottom Dock (In-Call Controls) */}
      {isCallActive && (
        <div className="flex items-center justify-center gap-3 z-30 pb-2 animate-fade-in">
          <div className="flex items-center gap-2.5 p-2 rounded-full bg-neutral-900/90 backdrop-blur-2xl border border-white/15 shadow-2xl">
            {/* Mute / Unmute Button */}
            <button
              onClick={toggleMute}
              className={`p-3 rounded-full border transition-all cursor-pointer flex items-center gap-2 text-xs font-semibold ${
                isMuted 
                  ? 'bg-rose-500/20 border-rose-500/50 text-rose-300 hover:bg-rose-500/30' 
                  : 'bg-white/5 border-white/10 text-neutral-200 hover:bg-white/10 hover:text-white'
              }`}
              title={isMuted ? 'Unmute microphone' : 'Mute microphone'}
            >
              {isMuted ? <MicOff size={16} /> : <Mic size={16} />}
              <span className="hidden sm:inline">{isMuted ? 'Muted' : 'Mute'}</span>
            </button>
            {/* End Call Button */}
            <button
              onClick={handleEndCall}
              className="px-5 py-3 rounded-full bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition-all cursor-pointer flex items-center gap-2 shadow-lg shadow-rose-600/30 hover:scale-105 active:scale-95"
              title="End Voice Call"
            >
              <PhoneOff size={16} />
              <span>End Call</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
