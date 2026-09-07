import { useState, useEffect, useRef, useCallback } from 'react';

export const useSpeechRecognition = ({ onTranscriptChange } = {}) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState(null);
  const [audioVolume, setAudioVolume] = useState(0);

  const recognitionRef = useRef(null);
  const mediaStreamRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const animFrameRef = useRef(null);

  const onTranscriptChangeRef = useRef(onTranscriptChange);
  onTranscriptChangeRef.current = onTranscriptChange;

  const SpeechRecognition = typeof window !== 'undefined' && 
    (window.SpeechRecognition || window.webkitSpeechRecognition);

  const isNativeSupported = Boolean(SpeechRecognition);

  const shouldListenRef = useRef(false);
  const isStartingRef = useRef(false);

  useEffect(() => {
    if (!isNativeSupported) return;

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = (typeof navigator !== 'undefined' && navigator.language) || 'en-IN';

      recognition.onstart = () => {
        isStartingRef.current = false;
        setIsListening(true);
        setError(null);
      };

      recognition.onresult = (event) => {
        let fullTranscript = '';
        for (let i = 0; i < event.results.length; i++) {
          fullTranscript += event.results[i][0].transcript;
          if (event.results[i].isFinal && !fullTranscript.endsWith(' ')) {
            fullTranscript += ' ';
          }
        }

        const clean = fullTranscript.trim();
        if (clean) {
          setTranscript(clean);
          if (onTranscriptChangeRef.current) {
            onTranscriptChangeRef.current(clean);
          }
        }
      };

      recognition.onerror = (event) => {
        isStartingRef.current = false;
        if (event.error === 'no-speech' || event.error === 'aborted') {
          // Normal pause in speech or aborted for restart, do not flag as fatal error
          return;
        }
        let msg = `Microphone error: ${event.error}`;
        if (event.error === 'not-allowed' || event.error === 'permission-denied') {
          msg = 'Microphone permission denied. Please allow microphone access in your browser.';
          shouldListenRef.current = false;
          setIsListening(false);
        }
        setError(msg);
      };

      recognition.onend = () => {
        isStartingRef.current = false;
        // In Chrome, recognition stops after silence even with continuous=true.
        // If user still wants to listen, auto-restart immediately.
        if (shouldListenRef.current) {
          setTimeout(() => {
            if (shouldListenRef.current && recognitionRef.current && !isStartingRef.current) {
              try {
                isStartingRef.current = true;
                recognitionRef.current.start();
              } catch (e) {
                isStartingRef.current = false;
              }
            }
          }, 150);
        } else {
          setIsListening(false);
        }
      };

      recognitionRef.current = recognition;
    } catch (e) {
      console.warn("SpeechRecognition init error:", e);
    }

    return () => {
      shouldListenRef.current = false;
      if (recognitionRef.current) {
        try { recognitionRef.current.stop(); } catch(e){}
      }
    };
  }, [isNativeSupported]);

  // Fallback Audio Stream for Firefox / non-webkit browsers
  const startAudioStreamFallback = async () => {
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setError('Microphone input is not available on this device.');
        return;
      }

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStreamRef.current = stream;

      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        const audioCtx = new AudioContext();
        audioContextRef.current = audioCtx;
        const source = audioCtx.createMediaStreamSource(stream);
        const analyser = audioCtx.createAnalyser();
        analyser.fftSize = 256;
        source.connect(analyser);
        analyserRef.current = analyser;

        const dataArray = new Uint8Array(analyser.frequencyBinCount);
        const updateVolume = () => {
          if (!analyserRef.current) return;
          analyserRef.current.getByteFrequencyData(dataArray);
          let sum = 0;
          for (let i = 0; i < dataArray.length; i++) {
            sum += dataArray[i];
          }
          const avg = sum / dataArray.length;
          setAudioVolume(avg);
          animFrameRef.current = requestAnimationFrame(updateVolume);
        };
        updateVolume();
      }

      setIsListening(true);
      setError(null);
    } catch (err) {
      console.warn("getUserMedia error:", err);
      setError('Microphone permission denied or no audio device detected.');
      setIsListening(false);
    }
  };

  const stopAudioStreamFallback = () => {
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(t => t.stop());
      mediaStreamRef.current = null;
    }
    if (audioContextRef.current) {
      try { audioContextRef.current.close(); } catch(e){}
      audioContextRef.current = null;
    }
    setAudioVolume(0);
    setIsListening(false);
  };

  const startListening = useCallback(() => {
    setError(null);
    shouldListenRef.current = true;
    if (isNativeSupported && recognitionRef.current) {
      try {
        setTranscript('');
        isStartingRef.current = true;
        recognitionRef.current.start();
        setIsListening(true);
      } catch (err) {
        try {
          recognitionRef.current.stop();
          setTimeout(() => {
            if (shouldListenRef.current && recognitionRef.current) {
              isStartingRef.current = true;
              recognitionRef.current.start();
              setIsListening(true);
            }
          }, 100);
        } catch (e) {
          startAudioStreamFallback();
        }
      }
    } else {
      // Firefox fallback
      startAudioStreamFallback();
    }
  }, [isNativeSupported]);

  const stopListening = useCallback(() => {
    shouldListenRef.current = false;
    isStartingRef.current = false;
    if (recognitionRef.current) {
      try { recognitionRef.current.stop(); } catch(e){}
    }
    stopAudioStreamFallback();
    setIsListening(false);
  }, []);

  const toggleListening = useCallback(() => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  }, [isListening, startListening, stopListening]);

  const resetTranscript = useCallback(() => {
    setTranscript('');
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    isListening,
    transcript,
    error,
    audioVolume,
    isSupported: isNativeSupported || Boolean(navigator?.mediaDevices?.getUserMedia),
    startListening,
    stopListening,
    toggleListening,
    resetTranscript,
    clearError
  };
};
