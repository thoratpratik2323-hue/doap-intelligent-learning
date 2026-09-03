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

  useEffect(() => {
    if (!isNativeSupported) return;

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
        setError(null);
      };

      recognition.onresult = (event) => {
        let currentTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const text = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            currentTranscript += text + ' ';
          } else {
            currentTranscript += text;
          }
        }

        if (currentTranscript) {
          setTranscript(currentTranscript);
          if (onTranscriptChangeRef.current) {
            onTranscriptChangeRef.current(currentTranscript);
          }
        }
      };

      recognition.onerror = (event) => {
        if (event.error === 'no-speech' || event.error === 'aborted') {
          return;
        }
        let msg = `Microphone error: ${event.error}`;
        if (event.error === 'not-allowed' || event.error === 'permission-denied') {
          msg = 'Microphone permission denied. Please allow microphone access in your browser.';
        }
        setError(msg);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    } catch (e) {
      console.warn("SpeechRecognition init error:", e);
    }

    return () => {
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
    if (isNativeSupported && recognitionRef.current) {
      try {
        setTranscript('');
        recognitionRef.current.start();
        setIsListening(true);
      } catch (err) {
        try {
          recognitionRef.current.stop();
          setTimeout(() => recognitionRef.current.start(), 100);
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
    if (recognitionRef.current && isListening) {
      try { recognitionRef.current.stop(); } catch(e){}
    }
    stopAudioStreamFallback();
    setIsListening(false);
  }, [isListening]);

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
