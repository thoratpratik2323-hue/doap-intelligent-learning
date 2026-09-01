import { useState, useEffect, useRef, useCallback } from 'react';

export const useSpeechRecognition = ({ onTranscriptChange } = {}) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState(null);
  const recognitionRef = useRef(null);

  // Stable ref for callback to avoid recreating SpeechRecognition on every render
  const onTranscriptChangeRef = useRef(onTranscriptChange);
  onTranscriptChangeRef.current = onTranscriptChange;

  const SpeechRecognition = typeof window !== 'undefined' && 
    (window.SpeechRecognition || window.webkitSpeechRecognition);

  const isSupported = Boolean(SpeechRecognition);

  useEffect(() => {
    if (!isSupported) return;

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
      setIsListening(false);
      let errorMessage = 'Speech recognition error occurred.';

      switch (event.error) {
        case 'not-allowed':
        case 'permission-denied':
          errorMessage = 'Microphone permission denied. Please allow microphone access in your browser settings.';
          break;
        case 'no-speech':
          errorMessage = 'No speech detected. Please try speaking again.';
          break;
        case 'audio-capture':
          errorMessage = 'No microphone was found. Ensure a microphone is connected and enabled.';
          break;
        case 'network':
          errorMessage = 'Network error occurred during speech recognition.';
          break;
        case 'aborted':
          errorMessage = null; // User manually stopped
          break;
        default:
          errorMessage = `Speech recognition error: ${event.error}`;
      }

      if (errorMessage) {
        setError(errorMessage);
      }
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {
          // ignore cleanup errors
        }
      }
    };
  }, [isSupported]); // removed onTranscriptChange — uses stable ref instead

  const startListening = useCallback(() => {
    setError(null);
    if (!isSupported) {
      setError("Speech recognition isn't supported in this browser. Please use a supported browser or type your question.");
      return;
    }

    if (recognitionRef.current && !isListening) {
      try {
        setTranscript('');
        recognitionRef.current.start();
      } catch (err) {
        // Handle restart if already running
        try {
          recognitionRef.current.stop();
          setTimeout(() => recognitionRef.current.start(), 100);
        } catch (e) {
          setError('Failed to start speech recognition. Please try again.');
        }
      }
    }
  }, [isSupported, isListening]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current && isListening) {
      try {
        recognitionRef.current.stop();
      } catch (err) {
        // ignore error on stop
      }
    }
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
    isSupported,
    startListening,
    stopListening,
    toggleListening,
    resetTranscript,
    clearError
  };
};
