import { useState, useEffect, useRef, useCallback } from 'react';

export const useCamera = () => {
  const [stream, setStream] = useState(null);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [isMicOn, setIsMicOn] = useState(false);
  const [error, setError] = useState(null);
  const [permissionStatus, setPermissionStatus] = useState('prompt'); // 'prompt' | 'granted' | 'denied' | 'unsupported'
  
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  const isMediaSupported = typeof navigator !== 'undefined' && 
    Boolean(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);

  const stopMedia = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => {
        try {
          track.stop();
        } catch (e) {
          // ignore
        }
      });
      streamRef.current = null;
    }

    if (videoRef.current) {
      if (videoRef.current.srcObject && videoRef.current.srcObject.getTracks) {
        videoRef.current.srcObject.getTracks().forEach(track => {
          try {
            track.stop();
          } catch (e) {
            // ignore
          }
        });
      }
      videoRef.current.srcObject = null;
    }

    setStream(null);
    setIsCameraOn(false);
    setIsMicOn(false);
  }, []);

  // Clean up media tracks on unmount ONLY
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => {
          try {
            if (track.readyState === 'live') track.stop();
          } catch (e) {
            // ignore
          }
        });
        streamRef.current = null;
      }
    };
  }, []);

  const attachStreamToVideo = useCallback((mediaStream, videoNode) => {
    if (!videoNode || !mediaStream) return;
    if (videoNode.srcObject !== mediaStream) {
      videoNode.srcObject = mediaStream;
    }
    videoNode.onloadedmetadata = () => {};
    videoNode.play().catch(() => {
      // Auto-play blocked by browser
    });
  }, []);

  // Callback ref to bind video element DOM node
  const bindVideoRef = useCallback((node) => {
    videoRef.current = node;
    if (node && streamRef.current) {
      attachStreamToVideo(streamRef.current, node);
    }
  }, [attachStreamToVideo]);

  // Sync stream with video element whenever stream state changes
  useEffect(() => {
    if (videoRef.current && stream) {
      attachStreamToVideo(stream, videoRef.current);
    }
  }, [stream, attachStreamToVideo]);

  const startMedia = useCallback(async ({ video = true, audio = true } = {}) => {
    setError(null);

    if (!isMediaSupported) {
      setPermissionStatus('unsupported');
      const msg = 'Camera and microphone access are not supported in this browser environment.';
      setError(msg);
      return false;
    }

    // Stop any existing stream before starting a new one
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => {
        try { track.stop(); } catch (e) {}
      });
      streamRef.current = null;
    }

    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: video ? { width: { ideal: 1280 }, height: { ideal: 720 } } : false,
        audio: audio
      });

      streamRef.current = mediaStream;
      setStream(mediaStream);
      setIsCameraOn(video && mediaStream.getVideoTracks().length > 0);
      setIsMicOn(audio && mediaStream.getAudioTracks().length > 0);
      setPermissionStatus('granted');
      setError(null);

      if (videoRef.current) {
        attachStreamToVideo(mediaStream, videoRef.current);
      }

      return true;
    } catch (err) {
      let errorMessage = 'Failed to access camera/microphone.';

      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError' || err.name === 'SecurityError') {
        errorMessage = 'Camera access is blocked. Please allow camera access in your browser settings and try again.';
        setPermissionStatus('denied');
      } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
        errorMessage = 'No camera was detected on this device.';
        setPermissionStatus('unsupported');
      } else if (err.name === 'NotReadableError' || err.name === 'TrackStartError') {
        errorMessage = 'Your camera is currently being used by another application.';
      } else if (err.name === 'OverconstrainedError') {
        errorMessage = 'Camera resolution constraints are not supported by your device.';
      }

      setError(errorMessage);
      setIsCameraOn(false);
      setIsMicOn(false);
      return false;
    }
  }, [isMediaSupported, attachStreamToVideo]);

  const toggleCamera = useCallback(async () => {
    if (!streamRef.current) {
      return await startMedia({ video: true, audio: isMicOn });
    }

    const videoTracks = streamRef.current.getVideoTracks();
    if (videoTracks.length > 0) {
      const newState = !videoTracks[0].enabled;
      videoTracks[0].enabled = newState;
      setIsCameraOn(newState);
    } else {
      return await startMedia({ video: true, audio: isMicOn });
    }
  }, [startMedia, isMicOn]);

  const toggleMic = useCallback(() => {
    if (!streamRef.current) return;
    const audioTracks = streamRef.current.getAudioTracks();
    if (audioTracks.length > 0) {
      const newState = !audioTracks[0].enabled;
      audioTracks[0].enabled = newState;
      setIsMicOn(newState);
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    stream,
    videoRef,
    bindVideoRef,
    isCameraOn,
    isMicOn,
    error,
    permissionStatus,
    startMedia,
    stopMedia,
    toggleCamera,
    toggleMic,
    clearError
  };
};
