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
  AlertCircle,
  Code2,
  Copy,
  Check,
  ExternalLink,
  X,
  Terminal,
  Cpu,
  Volume2,
  Bot,
  Trash2,
  ArrowUpRight,
  Radio,
  Play,
  Layers,
  PanelLeftClose,
  PanelLeftOpen
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { generateSmartTutorResponse } from '../services/aiTutorEngine';
import { memoryBrain } from '../services/memoryBrain';
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

    // Auto-close hardware audio context after playback completes
    setTimeout(() => {
      try {
        if (ctx.state !== 'closed') ctx.close();
      } catch (e) {}
    }, 1800);
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

    // Auto-close hardware audio context after shutdown chime completes
    setTimeout(() => {
      try {
        if (ctx.state !== 'closed') ctx.close();
      } catch (e) {}
    }, 450);
  } catch(e) {}
};

const SAMPLE_QUICK_PROMPTS = [
  { label: 'Explain Two Sum in Python', category: 'DSA', color: 'from-cyan-500/20 to-blue-500/20 text-cyan-300 border-cyan-500/40', prompt: 'Can you explain how to solve Two Sum in Python with optimal O(N) complexity?' },
  { label: 'How does React Virtual DOM work?', category: 'React', color: 'from-emerald-500/20 to-teal-500/20 text-emerald-300 border-emerald-500/40', prompt: 'How does React Virtual DOM and diffing reconciliation work under the hood?' },
  { label: 'Design a scalable URL shortener', category: 'System Design', color: 'from-purple-500/20 to-indigo-500/20 text-purple-300 border-purple-500/40', prompt: 'Walk me through the high-level system design for a scalable URL shortener like TinyURL.' },
  { label: 'Explain Dijkstra shortest path', category: 'Graphs', color: 'from-amber-500/20 to-orange-500/20 text-amber-300 border-amber-500/40', prompt: 'Can you explain Dijkstra shortest path algorithm with time complexity and code example?' },
  { label: 'Write a debounce utility in JS', category: 'JavaScript', color: 'from-blue-500/20 to-indigo-500/20 text-blue-300 border-blue-500/40', prompt: 'Write a production-grade JavaScript debounce utility with immediate execution support.' }
];

export const VoiceTutor = () => {
  const { isDarkMode, activeAccentHex, navigateTo, isSidebarHidden, setIsSidebarHidden } = useTheme();
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
  const [userTranscript, setUserTranscript] = useState('');
  const [lastUserInput, setLastUserInput] = useState('');
  const [aiSpokenText, setAiSpokenText] = useState('');
  const [liveVolume, setLiveVolume] = useState(0);
  const [isUserSpeaking, setIsUserSpeaking] = useState(false);
  const isUserSpeakingRef = useRef(false);
  const speechStartTimestampRef = useRef(0);
  const isRecordingRef = useRef(false);
  const [liveCodeSnippet, setLiveCodeSnippet] = useState(null);
  const [isCodeCanvasOpen, setIsCodeCanvasOpen] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedOutput, setCopiedOutput] = useState(false);
  const [copiedInput, setCopiedInput] = useState(false);

  const synthRef = useRef(typeof window !== 'undefined' ? window.speechSynthesis : null);
  const durationTimerRef = useRef(null);
  const isMountedRef = useRef(true);
  const activeUtteranceRef = useRef(null);
  const speechWatchdogTimerRef = useRef(null);
  const isStartingRecognitionRef = useRef(false);
  const hasFatalMicErrorRef = useRef(false);

  const getOptimalMimeType = () => {
    if (typeof MediaRecorder === 'undefined') return '';
    const candidates = [
      'audio/webm;codecs=opus',
      'audio/webm',
      'audio/ogg;codecs=opus',
      'audio/ogg',
      'audio/mp4'
    ];
    for (const t of candidates) {
      if (MediaRecorder.isTypeSupported(t)) return t;
    }
    return '';
  };

  const isMobileDevice = () => {
    if (typeof navigator === 'undefined') return false;
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
           (typeof window !== 'undefined' && window.innerWidth < 768);
  };

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
  const audioContextRef = useRef(null);
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
    stopUniversalRecorder();
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(t => t.stop());
      mediaStreamRef.current = null;
    }
    if (audioContextRef.current) {
      try {
        if (audioContextRef.current.state !== 'closed') {
          audioContextRef.current.close();
        }
      } catch (e) {}
      audioContextRef.current = null;
    }
    stopRecognition();
  };

  const stopUniversalRecorder = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      try {
        mediaRecorderRef.current.onstop = null;
        mediaRecorderRef.current.ondataavailable = null;
        mediaRecorderRef.current.stop();
      } catch (e) {}
    }
    isRecordingRef.current = false;
  };

  const finalizeAndTranscribeWithWhisper = async () => {
    if (!isMountedRef.current || !isCallActiveRef.current || isProcessingSpeechRef.current) return;
    if (callStateRef.current !== 'listening') return;

    const recorder = mediaRecorderRef.current;
    if (!recorder || recorder.state === 'inactive') {
      resumeListeningCycle();
      return;
    }

    isProcessingSpeechRef.current = true;
    updateCallState('thinking');
    setIsUserSpeaking(false);
    isUserSpeakingRef.current = false;
    stopRecognition();

    let didFinish = false;
    const finishTranscribe = (cb) => {
      if (didFinish) return;
      didFinish = true;
      if (thinkingWatchdog) clearTimeout(thinkingWatchdog);
      if (cb) cb();
    };

    // Watchdog: If Groq or MediaRecorder hangs for > 5s, auto-resume listening
    const thinkingWatchdog = setTimeout(() => {
      finishTranscribe(() => {
        if (callStateRef.current === 'thinking') {
          console.warn('[VoiceTutor] Transcription timed out, recovering listening cycle');
          resumeListeningCycle();
        }
      });
    }, 5000);

    recorder.onstop = async () => {
      try {
        const mimeType = recorder.mimeType || getOptimalMimeType() || 'audio/webm';
        const blob = new Blob(audioChunksRef.current, { type: mimeType });
        audioChunksRef.current = [];

        // STRICT GUARD: If state is no longer 'thinking' or call is inactive, abort immediately
        if (!isMountedRef.current || !isCallActiveRef.current || callStateRef.current !== 'thinking') {
          finishTranscribe();
          return;
        }

        if (!blob || blob.size < 200) {
          finishTranscribe(() => {
            if (callStateRef.current === 'thinking') {
              resumeListeningCycle();
            }
          });
          return;
        }

        setUserTranscript('Processing voice...');
        const text = await transcribeAudioWithGroq(blob);

        // STRICT GUARD: Check again after network fetch
        if (!isMountedRef.current || !isCallActiveRef.current || callStateRef.current !== 'thinking') {
          finishTranscribe();
          return;
        }

        if (text && text.trim()) {
          finishTranscribe(() => {
            setUserTranscript(text.trim());
            handleUserSpeechComplete(text.trim());
          });
        } else {
          finishTranscribe(() => {
            if (callStateRef.current === 'thinking') {
              resumeListeningCycle();
            }
          });
        }
      } catch (err) {
        console.warn('[VoiceTutor] Whisper transcribe error:', err);
        finishTranscribe(() => {
          if (callStateRef.current === 'thinking') {
            resumeListeningCycle();
          }
        });
      }
    };

    try {
      if (recorder.state === 'recording') {
        try { recorder.requestData(); } catch(e) {}
      }
      recorder.stop();
    } catch (e) {
      finishTranscribe(() => {
        if (callStateRef.current === 'thinking') {
          resumeListeningCycle();
        }
      });
    }
  };

  const startUniversalRecorder = () => {
    if (!isMountedRef.current || !isCallActiveRef.current || isMutedRef.current || hasFatalMicErrorRef.current) return;
    if (!mediaStreamRef.current || !mediaStreamRef.current.active) return;
    if (typeof MediaRecorder === 'undefined') return;

    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      try {
        mediaRecorderRef.current.onstop = null;
        mediaRecorderRef.current.ondataavailable = null;
        mediaRecorderRef.current.stop();
      } catch (e) {}
    }

    try {
      const mimeType = getOptimalMimeType();
      const options = mimeType ? { mimeType } : undefined;
      const recorder = new MediaRecorder(mediaStreamRef.current, options);
      audioChunksRef.current = [];

      recorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) {
          audioChunksRef.current.push(e.data);
        }
      };

      recorder.onstart = () => {
        isRecordingRef.current = true;
      };

      recorder.onerror = (e) => {
        console.warn('[MediaRecorder] Error:', e);
        isRecordingRef.current = false;
      };

      const isIOS = typeof navigator !== 'undefined' && (/iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1));
      const timeslice = isIOS ? 1000 : 250;
      recorder.start(timeslice);
      mediaRecorderRef.current = recorder;
    } catch (err) {
      console.warn('[MediaRecorder] Start failed:', err);
    }
  };

  // Start universal microphone recording with safe constraints
  const initUniversalMicrophone = async () => {
    setMicError('');
    hasFatalMicErrorRef.current = false;

    // Guard: Remote devices must use HTTPS for Web Audio & Microphone permissions
    if (typeof window !== 'undefined' && !window.isSecureContext && window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
      hasFatalMicErrorRef.current = true;
      setMicError('Microphone requires HTTPS on mobile and remote devices. Please open the live app at: https://doap-1908.web.app');
      return false;
    }

    if (typeof navigator === 'undefined' || !navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      hasFatalMicErrorRef.current = true;
      setMicError('Microphone input is not supported in this browser. Please use Chrome, Edge, or Safari on HTTPS.');
      return false;
    }

    try {
      let stream = null;
      try {
        stream = await navigator.mediaDevices.getUserMedia({ 
          audio: { 
            echoCancellation: true, 
            noiseSuppression: true, 
            autoGainControl: true,
            channelCount: 1
          } 
        });
      } catch (err1) {
        console.warn("Primary mic constraints rejected, fallback to basic audio:", err1);
        stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      }
      mediaStreamRef.current = stream;

      // Audio frequency analyzer for real-time visualizer & VAD
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        if (audioContextRef.current) {
          try {
            if (audioContextRef.current.state !== 'closed') {
              audioContextRef.current.close();
            }
          } catch (e) {}
          audioContextRef.current = null;
        }
        const audioCtx = new AudioCtx();
        audioContextRef.current = audioCtx;

        // Auto-resume AudioContext on mobile where it initializes in suspended state
        if (audioCtx.state === 'suspended') {
          await audioCtx.resume().catch(() => {});
        }

        const source = audioCtx.createMediaStreamSource(stream);
        const analyser = audioCtx.createAnalyser();
        analyser.fftSize = 256;
        source.connect(analyser);
        analyserRef.current = analyser;

        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
          animationFrameRef.current = null;
        }

        const checkAudioVolume = () => {
          if (!isMountedRef.current || !mediaStreamRef.current) return;

          // Keep audio context awake on mobile
          if (audioCtx.state === 'suspended') {
            audioCtx.resume().catch(() => {});
          }

          analyser.getByteFrequencyData(dataArray);

          let sum = 0;
          for (let i = 0; i < bufferLength; i++) {
            sum += dataArray[i];
          }
          const avg = sum / bufferLength;
          setLiveVolume(avg);

          // STRICT: Only evaluate Voice Activity Detection (VAD) when actively listening
          // When DOAP AI is speaking or thinking, VAD is 100% frozen to guarantee zero mid-sentence interruptions
          if (callStateRef.current !== 'listening' || isMutedRef.current || isProcessingSpeechRef.current) {
            if (isUserSpeakingRef.current) {
              isUserSpeakingRef.current = false;
              setIsUserSpeaking(false);
            }
            if (vadSilenceTimeoutRef.current) {
              clearTimeout(vadSilenceTimeoutRef.current);
              vadSilenceTimeoutRef.current = null;
            }
            animationFrameRef.current = requestAnimationFrame(checkAudioVolume);
            return;
          }

          const isMobile = isMobileDevice();
          // Adaptive noise floor tracking: calibrated for mobile and desktop
          if (avg < 25) {
            noiseFloorRef.current = Math.max(1.5, Math.min(20, noiseFloorRef.current * 0.96 + avg * 0.04));
          }
          // Dynamically calibrated threshold: sensitive to both mobile and desktop mics
          const minThreshold = isMobile ? 3.0 : 3.5;
          const speechThreshold = Math.max(minThreshold, noiseFloorRef.current + (isMobile ? 2.5 : 2.0));

          if (avg > speechThreshold) {
            if (!isUserSpeakingRef.current) {
              isUserSpeakingRef.current = true;
              setIsUserSpeaking(true);
              speechStartTimestampRef.current = Date.now();
            }
            if (vadSilenceTimeoutRef.current) {
              clearTimeout(vadSilenceTimeoutRef.current);
              vadSilenceTimeoutRef.current = null;
            }
          } else if (isUserSpeakingRef.current) {
            if (!vadSilenceTimeoutRef.current) {
              const silenceWait = isMobile ? 850 : 800;
              const minSpeechDuration = isMobile ? 120 : 150;
              vadSilenceTimeoutRef.current = setTimeout(() => {
                vadSilenceTimeoutRef.current = null;
                const speechDuration = Date.now() - speechStartTimestampRef.current;
                isUserSpeakingRef.current = false;
                setIsUserSpeaking(false);

                if (speechDuration >= minSpeechDuration && callStateRef.current === 'listening' && !isProcessingSpeechRef.current) {
                  finalizeAndTranscribeWithWhisper();
                } else if (speechDuration >= 80 && callStateRef.current === 'listening' && !isProcessingSpeechRef.current) {
                  // If user spoke even a short word, still finalize rather than discard
                  finalizeAndTranscribeWithWhisper();
                } else {
                  audioChunksRef.current = [];
                }
              }, silenceWait);
            }
          }

          animationFrameRef.current = requestAnimationFrame(checkAudioVolume);
        };
        checkAudioVolume();
      }

      return true;
    } catch(err) {
      console.warn("Microphone access permission error:", err);
      hasFatalMicErrorRef.current = true;
      setMicError('Microphone permission blocked or not found. Please click the mic/lock icon in your browser address bar to allow mic access.');
      return false;
    }
  };

  const startRecognition = () => {
    if (!isMountedRef.current || !isCallActiveRef.current || isMutedRef.current || callStateRef.current !== 'listening' || hasFatalMicErrorRef.current) return;
    
    // On mobile devices, Web Speech API may be unstable; continuous MediaRecorder + Groq Whisper VAD is the primary engine
    const isMobile = isMobileDevice();

    const SpeechRec = typeof window !== 'undefined' && (window.SpeechRecognition || window.webkitSpeechRecognition);
    if (!SpeechRec) {
      console.log('[VoiceTutor] Universal Groq Whisper VAD active (Web Speech API not present in this browser)');
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
      rec.lang = 'en-IN';

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

          // Conversational pause: 1000ms so user has time to finish their sentence naturally
          chromeSpeechTimerRef.current = setTimeout(() => {
            if (callStateRef.current === 'listening' && clean.length > 0 && !isProcessingSpeechRef.current) {
              isProcessingSpeechRef.current = true;
              updateCallState('thinking');
              unlockAudioContext();
              stopRecognition();
              stopUniversalRecorder();
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
        if (e.error === 'not-allowed') {
          // Only treat as fatal if mediaStream is ALSO inactive.
          // Safari/Brave/iOS often flags not-allowed on Web Speech API while getUserMedia works flawlessly.
          if (!mediaStreamRef.current || !mediaStreamRef.current.active) {
            hasFatalMicErrorRef.current = true;
            setMicError('Microphone permission blocked. Click the lock/mic icon in your address bar to allow mic access.');
          } else {
            console.log('[SpeechRec] Browser restricted Web Speech API, seamlessly relying on Groq Whisper VAD');
          }
        } else if (e.error === 'audio-capture') {
          console.warn('[SpeechRec] Audio capture glitch, relying on MediaRecorder VAD');
        } else if (e.error === 'network') {
          console.warn('[SpeechRec] Speech recognition network timeout, relying on MediaRecorder VAD');
        }
      };

      rec.onend = () => {
        recognitionRef.current = null;
        isStartingRecognitionRef.current = false;
        if (hasFatalMicErrorRef.current) return;
        if (isMountedRef.current && isCallActiveRef.current && !isMutedRef.current && callStateRef.current === 'listening' && !isProcessingSpeechRef.current) {
          setTimeout(() => {
            if (isMountedRef.current && isCallActiveRef.current && !isMutedRef.current && callStateRef.current === 'listening' && !isProcessingSpeechRef.current && !hasFatalMicErrorRef.current) {
              startRecognition();
            }
          }, 200);
        }
      };

      rec.start();
      recognitionRef.current = rec;
      isStartingRecognitionRef.current = false;
    } catch(err) {
      isStartingRecognitionRef.current = false;
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
        recognitionRef.current.abort();
      } catch(e) {}
      recognitionRef.current = null;
    }
    isStartingRecognitionRef.current = false;
  };

  const resumeListeningCycle = () => {
    if (!isMountedRef.current || !isCallActiveRef.current || isMutedRef.current) return;
    isProcessingSpeechRef.current = false;
    isUserSpeakingRef.current = false;
    setIsUserSpeaking(false);
    lastSpokenTextRef.current = '';
    setUserTranscript('');
    updateCallState('listening');
    setTimeout(() => {
      if (isMountedRef.current && isCallActiveRef.current && !isMutedRef.current && callStateRef.current === 'listening' && !hasFatalMicErrorRef.current) {
        startUniversalRecorder();
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
    if (typeof initialPrompt === 'string' && initialPrompt.trim()) {
      setLastUserInput(initialPrompt);
    }
    setAiSpokenText('');

    // Initialize microphone stream
    const micGranted = await initUniversalMicrophone();
    if (!micGranted) {
      hasFatalMicErrorRef.current = true;
      setIsCallActive(false);
      isCallActiveRef.current = false;
      updateCallState('idle');
      return;
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
    // CRITICAL: If DOAP AI is currently speaking, user interruption is strictly blocked!
    // The AI must complete speaking its full response before accepting new input.
    if (callStateRef.current === 'speaking') {
      console.log('[VoiceTutor] DOAP AI is speaking. Interruption blocked.');
      return;
    }
    isProcessingSpeechRef.current = true;
    updateCallState('thinking');
    setUserTranscript(spokenPrompt);
    setLastUserInput(spokenPrompt);

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

      // Live Code Canvas Projection: Extract syntax-highlighted code block if present
      const codeBlockMatch = response.match(/```([a-zA-Z0-9_-]*)\s*\n([\s\S]*?)```/);
      if (codeBlockMatch) {
        const lang = codeBlockMatch[1] || 'python';
        const code = codeBlockMatch[2].trim();
        setLiveCodeSnippet({ lang, code, timestamp: Date.now() });
        setIsCodeCanvasOpen(true);
      }

      const speechCleaned = response
        .replace(/<think>[\s\S]*?<\/think>/gi, '')
        .replace(/<details[\s\S]*?<\/details>/gi, '')
        .replace(/\*\*Reasoning\*\*[\s\S]*?\*\*Final Answer\*\*/i, '')
        .replace(/```[\s\S]*?```/g, 'I have projected the code snippet to your live IO console on screen.')
        .replace(/`([^`]+)`/g, '$1')
        .replace(/[#*_~>|]/g, '')
        .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1')
        .trim();

      // ZERO-LATENCY: Fire voice response immediately
      speakResponse(speechCleaned, () => {
        resumeListeningCycle();
      });

      // Update text in background without delaying voice
      setAiSpokenText(speechCleaned);

      // Cross-AI Self-Learning: absorb voice conversation into living 8-layer memory brain
      try {
        memoryBrain.learnFromInteraction(spokenPrompt, speechCleaned, 'voice');
      } catch (e) {
        console.warn('[VoiceTutor] Error learning from voice interaction:', e);
      }
    } catch (err) {
      const fallback = `I'm listening, buddy! Tell me what you'd like to work on or explore today.`;
      speakResponse(fallback, () => {
        resumeListeningCycle();
      });
    }
  };

  const speakResponse = async (text, onComplete) => {
    updateCallState('speaking');
    isProcessingSpeechRef.current = true;
    stopRecognition();
    stopUniversalRecorder();
    setIsUserSpeaking(false);
    isUserSpeakingRef.current = false;
    audioChunksRef.current = [];
    if (vadSilenceTimeoutRef.current) {
      clearTimeout(vadSilenceTimeoutRef.current);
      vadSilenceTimeoutRef.current = null;
    }
    if (chromeSpeechTimerRef.current) {
      clearTimeout(chromeSpeechTimerRef.current);
      chromeSpeechTimerRef.current = null;
    }

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

      // Small clearance guard before restarting listening cycle
      setTimeout(() => {
        if (onComplete && isMountedRef.current && isCallActiveRef.current) {
          onComplete();
        }
      }, 200);
    };

    // Dynamic safety watchdog timer based on word count (min 6s, max 30s) so speech is never frozen
    const wordCount = (text || '').trim().split(/\s+/).length;
    const dynamicTimeout = Math.max(6000, Math.min(30000, wordCount * 450 + 4000));
    speechWatchdogTimerRef.current = setTimeout(() => {
      console.warn('[VoiceTutor] Speech watchdog timer triggered after', dynamicTimeout, 'ms, recovering');
      safeComplete();
    }, dynamicTimeout);

    try {
      await speakElevenLabs(
        text, 
        'doap',
        () => {
          safeComplete();
        },
        () => {
          if (!finished) {
            fallbackBrowserSpeech(text, safeComplete);
          }
        }
      );
    } catch (err) {
      if (!finished) {
        fallbackBrowserSpeech(text, safeComplete);
      }
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
      utterance.rate = 1.02;
      utterance.pitch = 1.04;

      const chosenVoice = specificVoice || getBestNaturalVoice(synthRef.current, 'indian');
      if (chosenVoice) {
        utterance.voice = chosenVoice;
        utterance.lang = chosenVoice.lang || 'en-US';
      } else {
        utterance.lang = 'en-US';
      }

      // Keep live reference so Chrome does not garbage-collect utterance mid-speech
      activeUtteranceRef.current = utterance;
      if (typeof window !== 'undefined') window._doapActiveUtterance = utterance;

      // Chrome SpeechSynthesis keep-alive ping: Chromium has a bug that pauses speech after ~14s
      const keepAlivePing = setInterval(() => {
        if (!synthRef.current || !synthRef.current.speaking) {
          clearInterval(keepAlivePing);
        } else {
          try {
            synthRef.current.pause();
            synthRef.current.resume();
          } catch (e) {}
        }
      }, 8000);

      const finishSpeech = () => {
        clearInterval(keepAlivePing);
        activeUtteranceRef.current = null;
        if (typeof window !== 'undefined') window._doapActiveUtterance = null;
        if (onComplete && isMountedRef.current) onComplete();
      };

      utterance.onend = finishSpeech;
      utterance.onerror = finishSpeech;

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
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getAudioTracks().forEach(t => { t.enabled = true; });
      }
      resumeListeningCycle();
    } else {
      setIsMuted(true);
      isMutedRef.current = true;
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getAudioTracks().forEach(t => { t.enabled = false; });
      }
      stopRecognition();
      stopUniversalRecorder();
      setIsUserSpeaking(false);
      isUserSpeakingRef.current = false;
      stopElevenLabsAudio();
      if (synthRef.current) synthRef.current.cancel();
      updateCallState('idle');
      isProcessingSpeechRef.current = false;
    }
  };

  const handleTriggerQuickPrompt = async (itemPrompt) => {
    setLastUserInput(itemPrompt);
    setUserTranscript(itemPrompt);
    if (!isCallActiveRef.current) {
      await handleStartCall(itemPrompt);
    } else {
      updateCallState('thinking');
      unlockAudioContext();
      stopRecognition();
      stopUniversalRecorder();
      handleUserSpeechComplete(itemPrompt);
    }
  };

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
        <div className="flex items-center gap-2 sm:gap-3">
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

        {/* Header Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Live I/O Console Button */}
          <button
            onClick={() => setIsCodeCanvasOpen(prev => !prev)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all flex items-center gap-1.5 cursor-pointer hover:scale-105 active:scale-95 ${
              isCodeCanvasOpen
                ? 'bg-cyan-500/25 border-cyan-400 text-cyan-300 shadow-[0_0_12px_rgba(6,182,212,0.3)] font-bold'
                : 'border-white/15 bg-white/5 hover:bg-white/10 text-neutral-300'
            }`}
            title="Toggle Live I/O Console (Input, Output & Code Canvas)"
          >
            <Terminal size={14} className="text-cyan-400" />
            <span className="font-mono font-bold tracking-wider">IO</span>
            {(liveCodeSnippet || userTranscript || aiSpokenText) && (
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
            )}
          </button>

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
                  ? (isUserSpeaking 
                      ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 shadow-emerald-500/30 ring-2 ring-emerald-500/30' 
                      : 'bg-blue-500/15 border-blue-500/50 text-blue-300 shadow-blue-500/20')
                  : 'bg-amber-500/15 border-amber-500/50 text-amber-300 shadow-amber-500/20')
              : 'bg-neutral-900/90 border-neutral-800 text-neutral-400'
          }`}>
            <span className={`w-2 h-2 rounded-full ${
              isCallActive 
                ? (callState === 'speaking' 
                    ? 'bg-cyan-400 animate-pulse' 
                    : callState === 'listening' 
                    ? (isUserSpeaking ? 'bg-emerald-400 animate-ping' : 'bg-blue-400 animate-pulse') 
                    : 'bg-amber-400 animate-bounce') 
                : 'bg-neutral-600'
            }`} />
            <span>
              {!isCallActive 
                ? 'DOAP AI READY — TAP OR PICK A TOPIC' 
                : callState === 'speaking' 
                ? 'DOAP AI SPEAKING...' 
                : callState === 'listening' 
                ? (isUserSpeaking ? 'HEARING YOUR VOICE... (SPEAK FREELY)' : 'LISTENING TO YOU (SPEAK FREELY)...') 
                : 'THINKING & TRANSCRIBING...'}
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

        {/* Minimal Live Status Indicator and Live Captions */}
        {isCallActive && (
          <div className="flex flex-col items-center justify-center gap-2.5 mt-4 z-10 animate-fade-in w-full max-w-lg px-3">
            <div className="flex flex-col items-center justify-center gap-1.5">
              <div className="flex items-center justify-center gap-2">
                <span className={`w-2 h-2 rounded-full ${
                  callState === 'speaking' 
                    ? 'bg-cyan-400 animate-ping' 
                    : callState === 'thinking' 
                    ? 'bg-amber-400 animate-pulse' 
                    : (isUserSpeaking ? 'bg-emerald-400 animate-ping' : 'bg-blue-400 animate-pulse')
                }`} />
                <p className="text-xs font-mono tracking-wide" style={{ color: isUserSpeaking ? '#34d399' : '#94a3b8' }}>
                  {callState === 'speaking' 
                    ? 'DOAP AI Speaking...' 
                    : callState === 'thinking' 
                    ? 'Transcribing & Thinking...' 
                    : (isUserSpeaking ? 'Voice Detected • Speak freely...' : 'Listening... Speak naturally')}
                </p>
              </div>

              {callState === 'listening' && (
                <button
                  type="button"
                  onClick={() => {
                    const prompt = (userTranscript || lastSpokenTextRef.current || '').trim();
                    if (prompt) {
                      isProcessingSpeechRef.current = true;
                      updateCallState('thinking');
                      stopRecognition();
                      stopUniversalRecorder();
                      handleUserSpeechComplete(prompt);
                    } else {
                      finalizeAndTranscribeWithWhisper();
                    }
                  }}
                  className={`px-3.5 py-1.5 rounded-full border text-[11px] font-mono flex items-center gap-1.5 cursor-pointer shadow-lg transition-all ${
                    isUserSpeaking 
                      ? 'bg-emerald-500/25 hover:bg-emerald-500/35 text-emerald-300 border-emerald-500/50 animate-pulse' 
                      : 'bg-white/10 hover:bg-white/15 text-neutral-300 border-white/20'
                  }`}
                  title="Done speaking? Tap to send immediately"
                >
                  <Check size={12} className={isUserSpeaking ? 'text-emerald-400' : 'text-cyan-400'} />
                  <span>{isUserSpeaking ? 'Done Speaking • Tap to Send' : 'Tap When Done Speaking'}</span>
                </button>
              )}
            </div>
          </div>
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

            {/* Manual Send / Done Speaking Button for Instant Turn Taking */}
            {callState === 'listening' && !isMuted && (
              <button
                onClick={() => {
                  const prompt = (userTranscript || lastSpokenTextRef.current || '').trim();
                  if (prompt) {
                    isProcessingSpeechRef.current = true;
                    updateCallState('thinking');
                    stopRecognition();
                    stopUniversalRecorder();
                    handleUserSpeechComplete(prompt);
                  } else {
                    finalizeAndTranscribeWithWhisper();
                  }
                }}
                className="px-4 py-2.5 rounded-full bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shadow-lg shadow-cyan-600/30 hover:scale-105 active:scale-95"
                title="Send recorded speech to DOAP AI immediately"
              >
                <Check size={14} />
                <span>Send Voice</span>
              </button>
            )}

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

      {/* 4. Slide-Out Glassmorphic Live I/O Console (Input, Spoken Output & Code Extraction) */}
      {isCodeCanvasOpen && (
        <div className="absolute top-14 bottom-4 sm:top-16 sm:bottom-6 right-0 sm:right-4 w-full sm:w-[540px] lg:w-[620px] z-40 rounded-t-3xl sm:rounded-3xl bg-[#080c14]/95 backdrop-blur-2xl border border-cyan-500/30 shadow-[0_25px_80px_rgba(0,0,0,0.85),0_0_50px_rgba(6,182,212,0.18)] flex flex-col overflow-hidden animate-fade-in transition-all">
          {/* Top Neon Accent Line */}
          <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-cyan-400 via-emerald-400 to-transparent shrink-0 animate-pulse" />

          {/* I/O Console Top Bar */}
          <div className="flex items-center justify-between px-5 py-3 border-b border-white/10 bg-neutral-900/60 shrink-0">
            <div className="flex items-center gap-3">
              <div className="relative p-2 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 text-cyan-400 border border-cyan-500/40 shadow-inner">
                <Terminal size={17} />
                <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-cyan-400" />
              </div>
              <div>
                <div className="text-xs font-bold text-white flex items-center gap-2 tracking-wide">
                  DOAP Live I/O Console
                  <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                    {liveCodeSnippet ? liveCodeSnippet.lang.toUpperCase() : (isCallActive ? 'LIVE HUD' : 'STANDBY')}
                  </span>
                </div>
                <div className="text-[10px] font-mono text-neutral-400 flex items-center gap-2 mt-0.5">
                  <span>Real-time Voice & Code Canvas</span>
                  <span className="text-neutral-600">•</span>
                  <span className="text-cyan-400/90 font-medium">Whisper + 8L Brain</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              {(userTranscript || lastUserInput || aiSpokenText || liveCodeSnippet) && (
                <button
                  onClick={() => {
                    setUserTranscript('');
                    setLastUserInput('');
                    setAiSpokenText('');
                    setLiveCodeSnippet(null);
                  }}
                  className="p-1.5 rounded-xl text-neutral-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
                  title="Clear Console Content"
                >
                  <Trash2 size={15} />
                </button>
              )}
              <button
                onClick={() => setIsCodeCanvasOpen(false)}
                className="p-1.5 rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer ml-0.5"
                title="Close I/O Console"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* I/O Console Scrollable Content */}
          <div className="flex-1 overflow-y-auto p-3.5 sm:p-4 space-y-3 scrollbar-thin">
            {/* 1. INPUT BLOCK (Voice transcript or prompt) */}
            <div className="rounded-2xl border border-cyan-500/30 bg-gradient-to-br from-cyan-950/25 via-neutral-900/80 to-neutral-950/90 p-3.5 shadow-sm relative overflow-hidden group">
              <div className="absolute -right-6 -top-6 w-24 h-24 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center justify-between text-xs font-semibold text-cyan-400 mb-2.5 relative z-10">
                <div className="flex items-center gap-2">
                  <div className="p-1 rounded-lg bg-cyan-500/15 border border-cyan-500/30 text-cyan-300">
                    <Mic size={13} className={callState === 'listening' ? 'animate-pulse text-cyan-300' : ''} />
                  </div>
                  <span className="tracking-wide font-mono text-[11px]">INPUT (VOICE / PROMPT)</span>
                  {callState === 'listening' && (
                    <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-cyan-500/20 border border-cyan-500/40 text-[10px] font-mono text-cyan-300">
                      <div className="flex items-center gap-0.5 h-2.5">
                        <span className="w-0.5 bg-cyan-400 rounded-full animate-[pulse_0.6s_ease-in-out_infinite] h-2" />
                        <span className="w-0.5 bg-cyan-400 rounded-full animate-[pulse_0.4s_ease-in-out_infinite_0.1s] h-3" />
                        <span className="w-0.5 bg-cyan-400 rounded-full animate-[pulse_0.7s_ease-in-out_infinite_0.2s] h-2" />
                      </div>
                      <span>Listening...</span>
                    </div>
                  )}
                </div>
                {(userTranscript || lastUserInput) && (
                  <button
                    onClick={() => {
                      navigator.clipboard?.writeText(userTranscript || lastUserInput);
                      setCopiedInput(true);
                      setTimeout(() => setCopiedInput(false), 2000);
                    }}
                    className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white text-[11px] font-mono flex items-center gap-1.5 transition-colors cursor-pointer border border-white/10"
                    title="Copy User Input"
                  >
                    {copiedInput ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                    <span>{copiedInput ? 'Copied' : 'Copy'}</span>
                  </button>
                )}
              </div>

              <div className="relative z-10">
                {userTranscript || lastUserInput ? (
                  <div className="pl-3 border-l-2 border-cyan-400/70 py-0.5">
                    <p className="text-xs sm:text-sm text-neutral-100 leading-relaxed font-sans select-text italic">
                      &ldquo;{userTranscript || lastUserInput}&rdquo;
                    </p>
                    <div className="flex items-center gap-2 mt-2 text-[10px] font-mono text-neutral-500">
                      <span className="text-cyan-400 font-medium">Whisper STT</span>
                      <span>•</span>
                      <span>{(userTranscript || lastUserInput).length} characters</span>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-3 py-1 text-neutral-400 text-xs">
                    <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
                      <Mic size={14} className={callState === 'listening' ? 'animate-pulse text-cyan-300' : ''} />
                    </div>
                    <div>
                      <p className="text-neutral-200 text-xs font-medium">Ready for your voice</p>
                      <p className="text-neutral-500 text-[11px] mt-0.5">Speak via microphone or tap any quick prompt below.</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* 2. OUTPUT BLOCK (DOAP AI Response / Spoken Explanation) */}
            <div className="rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-emerald-950/25 via-neutral-900/80 to-neutral-950/90 p-4 shadow-sm relative overflow-hidden group">
              <div className="absolute -right-6 -top-6 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center justify-between text-xs font-semibold text-emerald-400 mb-2.5 relative z-10">
                <div className="flex items-center gap-2">
                  <div className="p-1 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-300">
                    <Sparkles size={13} className={callState === 'thinking' ? 'animate-spin text-amber-400' : ''} />
                  </div>
                  <span className="tracking-wide font-mono text-[11px]">OUTPUT (DOAP AI RESPONSE)</span>
                  {callState === 'speaking' && (
                    <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-[10px] font-mono text-emerald-300">
                      <div className="flex items-center gap-0.5 h-2.5">
                        <span className="w-0.5 bg-emerald-400 rounded-full animate-[pulse_0.5s_ease-in-out_infinite] h-2.5" />
                        <span className="w-0.5 bg-emerald-400 rounded-full animate-[pulse_0.3s_ease-in-out_infinite_0.1s] h-3" />
                        <span className="w-0.5 bg-emerald-400 rounded-full animate-[pulse_0.6s_ease-in-out_infinite_0.2s] h-2" />
                      </div>
                      <span>Speaking...</span>
                    </div>
                  )}
                  {callState === 'thinking' && (
                    <span className="text-[10px] font-mono text-amber-300 animate-pulse px-2 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
                      Synthesizing...
                    </span>
                  )}
                </div>
                {(aiSpokenText || liveCodeSnippet?.explanation) && (
                  <button
                    onClick={() => {
                      navigator.clipboard?.writeText(aiSpokenText || liveCodeSnippet?.explanation || '');
                      setCopiedOutput(true);
                      setTimeout(() => setCopiedOutput(false), 2000);
                    }}
                    className="px-2.5 py-1 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 hover:text-emerald-200 text-[11px] font-mono flex items-center gap-1.5 transition-colors cursor-pointer border border-emerald-500/30"
                    title="Copy AI Output"
                  >
                    {copiedOutput ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                    <span>{copiedOutput ? 'Copied' : 'Copy'}</span>
                  </button>
                )}
              </div>

              <div className="relative z-10">
                {aiSpokenText || liveCodeSnippet?.explanation ? (
                  <div className="pl-3 border-l-2 border-emerald-400/70 py-0.5">
                    <p className="text-xs sm:text-sm text-neutral-100 leading-relaxed select-text font-sans whitespace-pre-wrap">
                      {aiSpokenText || liveCodeSnippet?.explanation}
                    </p>
                    <div className="flex items-center gap-2 mt-2 text-[10px] font-mono text-neutral-500">
                      <span className="text-emerald-400 font-medium">ElevenLabs Studio Voice</span>
                      <span>•</span>
                      <span>DOAP Thinking Engine</span>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-3 py-1 text-neutral-400 text-xs">
                    <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                      <Sparkles size={14} className={callState === 'thinking' ? 'animate-spin text-amber-400' : ''} />
                    </div>
                    <div>
                      <p className="text-neutral-200 text-xs font-medium">
                        {callState === 'thinking' ? 'Synthesizing response...' : 'DOAP AI Standby'}
                      </p>
                      <p className="text-neutral-500 text-[11px] mt-0.5">
                        {callState === 'thinking'
                          ? 'Analyzing query with 8-layer memory brain & neural engine...'
                          : 'Spoken answers, technical explanations & code will stream here.'}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* 3. QUICK INTERACTIVE PROMPTS (1-Tap Live Voice Prompts) */}
            <div className="rounded-2xl border border-white/10 bg-neutral-900/40 p-3.5 space-y-2.5">
              <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400">
                <span className="flex items-center gap-1.5 text-cyan-300 font-semibold tracking-wide">
                  <Zap size={13} className="text-cyan-400 fill-cyan-400/20" />
                  <span>QUICK TEST PROMPTS (TAP TO ASK)</span>
                </span>
                <span className="text-[10px] text-neutral-500">Instant Live Query</span>
              </div>

              <div className="grid grid-cols-1 gap-1.5">
                {SAMPLE_QUICK_PROMPTS.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleTriggerQuickPrompt(item.prompt)}
                    className="w-full text-left p-2.5 rounded-xl bg-neutral-950/70 hover:bg-cyan-950/30 border border-white/5 hover:border-cyan-500/40 transition-all flex items-center justify-between group cursor-pointer shadow-sm hover:shadow-cyan-500/10"
                  >
                    <div className="flex items-center gap-2.5 min-w-0 pr-2">
                      <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-md border bg-gradient-to-r ${item.color} uppercase shrink-0`}>
                        {item.category}
                      </span>
                      <span className="text-xs text-neutral-300 group-hover:text-white transition-colors truncate">
                        {item.label}
                      </span>
                    </div>
                    <div className="p-1 rounded-md bg-white/5 group-hover:bg-cyan-500/20 text-neutral-400 group-hover:text-cyan-300 transition-colors shrink-0">
                      <Play size={10} className="fill-current" />
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* 4. CODE OUTPUT BLOCK (When code is provided / extracted) */}
            {liveCodeSnippet && (
              <div className="rounded-2xl border border-indigo-500/40 bg-[#070b14] overflow-hidden shadow-2xl animate-fade-in">
                <div className="px-4 py-2.5 border-b border-indigo-500/20 bg-neutral-900/90 text-xs text-neutral-300 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
                    </div>
                    <span className="font-mono text-white text-xs font-semibold flex items-center gap-1.5 ml-1">
                      <Code2 size={14} className="text-indigo-400" />
                      CODE CANVAS
                    </span>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 uppercase">
                      {liveCodeSnippet.lang}
                    </span>
                    <span className="text-[10px] text-neutral-500 font-mono hidden sm:inline">
                      {liveCodeSnippet.code.split('\n').length} lines
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        navigator.clipboard?.writeText(liveCodeSnippet.code);
                        setCopiedCode(true);
                        setTimeout(() => setCopiedCode(false), 2000);
                      }}
                      className="px-2.5 py-1 rounded-lg bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-200 text-xs font-mono flex items-center gap-1.5 cursor-pointer border border-indigo-500/40 transition-all shadow-sm"
                      title="Copy Code to Clipboard"
                    >
                      {copiedCode ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                      <span>{copiedCode ? 'Copied' : 'Copy'}</span>
                    </button>

                    <button
                      onClick={() => {
                        try {
                          localStorage.setItem('doap_sandbox_injected_code', JSON.stringify(liveCodeSnippet));
                        } catch(e) {}
                        navigateTo('/coding');
                      }}
                      className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-mono flex items-center gap-1 transition-colors cursor-pointer border border-white/15"
                      title="Open in Coding Practice Sandbox"
                    >
                      <span>Sandbox</span>
                      <ArrowUpRight size={13} />
                    </button>
                  </div>
                </div>

                <div className="p-4 overflow-x-auto text-neutral-200 leading-relaxed whitespace-pre font-mono text-[11px] max-h-[280px] scrollbar-thin select-text bg-[#070b14]">
                  {liveCodeSnippet.code.split('\n').map((line, idx) => (
                    <div key={idx} className="table-row hover:bg-white/[0.02]">
                      <span className="table-cell pr-4 select-none text-neutral-600 text-right font-mono text-[10px]">{idx + 1}</span>
                      <span className="table-cell">{line || ' '}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Bottom Telemetry Bar */}
          <div className="px-5 py-2.5 border-t border-white/10 bg-neutral-900/70 text-[10px] font-mono text-neutral-400 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1 text-cyan-400">
                <Radio size={11} className={isCallActive ? "animate-pulse" : ""} />
                <span>{isCallActive ? "Session Active" : "Standby Mode"}</span>
              </span>
              <span>•</span>
              <span className="text-neutral-400">8-Layer Memory Connected</span>
            </div>
            <span className="text-neutral-500">DOAP Studio Audio</span>
          </div>
        </div>
      )}
    </div>
  );
};
