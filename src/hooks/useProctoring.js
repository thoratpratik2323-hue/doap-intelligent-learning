import { useState, useEffect, useCallback, useRef } from 'react';
import { PROCTORING_VIOLATION_TYPES } from '../data/interviewSchema';

export const useProctoring = ({ isInterviewActive = false, onStrikeLimitExceeded } = {}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [strikeCount, setStrikeCount] = useState(0);
  const [violations, setViolations] = useState([]);
  const [activeWarning, setActiveWarning] = useState(null);

  const maxStrikes = 3;

  // Record a proctoring violation event & apply strike policy
  const addViolation = useCallback((type, description, severity = 'WARNING', isStrike = true) => {
    if (!isInterviewActive) return;

    const newViolation = {
      id: `v_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      type,
      description,
      severity,
      timestamp: new Date().toLocaleTimeString()
    };

    setViolations(prev => [newViolation, ...prev]);

    if (isStrike) {
      setStrikeCount(prev => {
        const nextStrikes = prev + 1;
        
        let warningText = `Proctoring warning: ${description} (Strike ${nextStrikes}/3)`;
        if (nextStrikes === 2) {
          warningText = `Second proctoring violation! One further serious violation will terminate this interview. (Strike 2/3)`;
        } else if (nextStrikes >= 3) {
          warningText = `Interview terminated due to repeated proctoring violations. (Strike 3/3)`;
        }

        setActiveWarning({
          text: warningText,
          strikes: nextStrikes,
          type
        });

        if (nextStrikes >= maxStrikes) {
          if (onStrikeLimitExceeded) {
            onStrikeLimitExceeded(newViolation);
          }
        }

        return nextStrikes;
      });
    } else {
      // Use functional updater to read current strikeCount without stale closure
      setStrikeCount(prev => {
        setActiveWarning({
          text: `Proctoring advisory: ${description}`,
          strikes: prev,
          type
        });
        return prev; // Don't increment — just reading the value
      });
    }
  }, [isInterviewActive, onStrikeLimitExceeded]);

  // Fullscreen toggle request
  const requestFullscreen = useCallback(async () => {
    try {
      if (document.documentElement.requestFullscreen) {
        await document.documentElement.requestFullscreen();
        setIsFullscreen(true);
        return true;
      }
    } catch (err) {
      // Fullscreen request failed or user denied
    }
    return false;
  }, []);

  const exitFullscreen = useCallback(async () => {
    try {
      if (document.fullscreenElement && document.exitFullscreen) {
        await document.exitFullscreen();
        setIsFullscreen(false);
      }
    } catch (err) {
      // ignore
    }
  }, []);

  // Fullscreen change listener
  useEffect(() => {
    const handleFullscreenChange = () => {
      const activeFS = Boolean(document.fullscreenElement);
      setIsFullscreen(activeFS);

      if (isInterviewActive && !activeFS) {
        addViolation(
          PROCTORING_VIOLATION_TYPES.FULLSCREEN_EXIT,
          "Fullscreen mode was exited. Fullscreen is required during the interview.",
          "HIGH",
          true
        );
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, [isInterviewActive, addViolation]);

  // Tab & Window Visibility listener
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!isInterviewActive) return;

      if (document.visibilityState === 'hidden') {
        addViolation(
          PROCTORING_VIOLATION_TYPES.INTERVIEW_TAB_HIDDEN,
          "Interview tab was hidden or user switched to another application.",
          "HIGH",
          true
        );
      }
    };

    const handleWindowBlur = () => {
      if (!isInterviewActive) return;
      addViolation(
        PROCTORING_VIOLATION_TYPES.BROWSER_VISIBILITY_CHANGE,
        "Browser window lost focus.",
        "MEDIUM",
        false // Warning only, no strike for simple blur
      );
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleWindowBlur);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleWindowBlur);
    };
  }, [isInterviewActive, addViolation]);

  const clearWarning = useCallback(() => {
    setActiveWarning(null);
  }, []);

  const resetProctoring = useCallback(() => {
    setStrikeCount(0);
    setViolations([]);
    setActiveWarning(null);
  }, []);

  return {
    isFullscreen,
    strikeCount,
    maxStrikes,
    violations,
    activeWarning,
    addViolation,
    requestFullscreen,
    exitFullscreen,
    clearWarning,
    resetProctoring
  };
};
