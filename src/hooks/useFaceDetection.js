import { useState, useEffect, useRef, useCallback } from 'react';

export const useFaceDetection = ({ videoRef, isStreamActive = false, onViolation } = {}) => {
  const [faceStatus, setFaceStatus] = useState('DETECTED'); // 'DETECTED' | 'NO_FACE' | 'MULTIPLE_FACES' | 'LOOKING_AWAY'
  const [faceCount, setFaceCount] = useState(1);
  const [headPose, setHeadPose] = useState('FORWARD'); // 'FORWARD' | 'LEFT' | 'RIGHT' | 'DOWN'

  const noFaceTimerRef = useRef(null);
  const lookAwayTimerRef = useRef(null);
  const canvasRef = useRef(document.createElement('canvas'));

  // Analyzes video frames continuously when stream is active
  useEffect(() => {
    if (!isStreamActive || !videoRef.current) {
      setFaceStatus('DETECTED');
      return;
    }

    const interval = setInterval(() => {
      const video = videoRef.current;
      if (!video || video.paused || video.ended || video.readyState < 2) return;

      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      canvas.width = 160;
      canvas.height = 120;

      try {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        // Perform skin-tone & pixel luminance detection to estimate face region & orientation
        let skinPixels = 0;
        let leftSkinPixels = 0;
        let rightSkinPixels = 0;
        let totalPixels = canvas.width * canvas.height;

        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];

          // Normalized skin tone heuristic (RGB color space)
          const isSkin = (r > 65) && (g > 40) && (b > 20) && 
                         (Math.max(r, g, b) - Math.min(r, g, b) > 15) && 
                         (Math.abs(r - g) > 15) && (r > g) && (r > b);

          if (isSkin) {
            skinPixels++;
            const pixelIndex = i / 4;
            const x = pixelIndex % canvas.width;
            if (x < canvas.width / 2) {
              leftSkinPixels++;
            } else {
              rightSkinPixels++;
            }
          }
        }

        const skinRatio = skinPixels / totalPixels;

        // Face Detection Logic
        if (skinRatio < 0.04) {
          // NO FACE DETECTED
          setFaceStatus('NO_FACE');
          setFaceCount(0);

          if (!noFaceTimerRef.current) {
            // 3-second grace period before recording violation
            noFaceTimerRef.current = setTimeout(() => {
              if (onViolation) {
                onViolation('FACE_NOT_DETECTED', 'Candidate is not visible in camera frame.');
              }
              noFaceTimerRef.current = null;
            }, 3000);
          }
        } else if (skinRatio > 0.45) {
          // MULTIPLE FACES DETECTED
          setFaceStatus('MULTIPLE_FACES');
          setFaceCount(2);
          if (onViolation) {
            onViolation('MULTIPLE_FACES', 'Multiple people detected in camera stream.');
          }
        } else {
          // FACE DETECTED
          if (noFaceTimerRef.current) {
            clearTimeout(noFaceTimerRef.current);
            noFaceTimerRef.current = null;
          }

          setFaceCount(1);

          // Head Orientation / Looking Away Check
          const skinRatioDifference = Math.abs(leftSkinPixels - rightSkinPixels) / (skinPixels || 1);
          if (skinRatioDifference > 0.45) {
            setFaceStatus('LOOKING_AWAY');
            setHeadPose(leftSkinPixels > rightSkinPixels ? 'RIGHT' : 'LEFT');

            if (!lookAwayTimerRef.current) {
              // 4-second grace period for prolonged looking away
              lookAwayTimerRef.current = setTimeout(() => {
                if (onViolation) {
                  onViolation('PROLONGED_LOOK_AWAY', 'Please maintain attention toward the interview screen.');
                }
                lookAwayTimerRef.current = null;
              }, 4000);
            }
          } else {
            setFaceStatus('DETECTED');
            setHeadPose('FORWARD');
            if (lookAwayTimerRef.current) {
              clearTimeout(lookAwayTimerRef.current);
              lookAwayTimerRef.current = null;
            }
          }
        }
      } catch (e) {
        // frame processing fallback
      }
    }, 1000);

    return () => {
      clearInterval(interval);
      if (noFaceTimerRef.current) clearTimeout(noFaceTimerRef.current);
      if (lookAwayTimerRef.current) clearTimeout(lookAwayTimerRef.current);
    };
  }, [isStreamActive, videoRef, onViolation]);

  return {
    faceStatus,
    faceCount,
    headPose
  };
};
