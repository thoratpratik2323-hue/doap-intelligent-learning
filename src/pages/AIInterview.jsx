import React, { useState, useEffect, useRef } from 'react';
import { SetupStep } from '../components/Interview/SetupStep';
import { RulesConsentStep } from '../components/Interview/RulesConsentStep';
import { SystemCheckStep } from '../components/Interview/SystemCheckStep';
import { LiveInterviewWorkspace } from '../components/Interview/LiveInterviewWorkspace';
import { InterviewReport } from '../components/Interview/InterviewReport';
import { useTheme } from '../context/ThemeContext';

export const AIInterview = () => {
  const { profile, isDarkMode, isSidebarHidden, setIsSidebarHidden } = useTheme();
  const prevSidebarHiddenRef = useRef(isSidebarHidden);

  const [step, setStep] = useState('setup'); // 'setup' | 'rules' | 'system_check' | 'live' | 'report'

  // Automatically hide the left navigation sidebar during live interview until finished
  useEffect(() => {
    if (step === 'live') {
      prevSidebarHiddenRef.current = isSidebarHidden;
      setIsSidebarHidden(true);
      return () => {
        setIsSidebarHidden(prevSidebarHiddenRef.current);
      };
    } else {
      setIsSidebarHidden(prevSidebarHiddenRef.current);
    }
  }, [step]);

  // Ensure sidebar is restored if user navigates away or component unmounts mid-session
  useEffect(() => {
    return () => {
      setIsSidebarHidden(prevSidebarHiddenRef.current);
    };
  }, []);
  const [setupData, setSetupData] = useState({
    positionId: 'software-engineer',
    positionTitle: 'Software Engineer',
    type: 'Technical',
    difficulty: 'Intermediate',
    duration: '30 min',
    jobDescription: ''
  });

  const [interviewResults, setInterviewResults] = useState(null);

  const handleSetupNext = (data) => {
    setSetupData(data);
    setStep('rules');
  };

  const handleRulesNext = () => {
    setStep('system_check');
  };

  const handleStartLiveInterview = async () => {
    try {
      const elem = document.documentElement;
      const isFS = Boolean(
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.mozFullScreenElement ||
        document.msFullscreenElement
      );
      if (!isFS) {
        if (elem.requestFullscreen) {
          await elem.requestFullscreen();
        } else if (elem.webkitRequestFullscreen) {
          await elem.webkitRequestFullscreen();
        } else if (elem.mozRequestFullScreen) {
          await elem.mozRequestFullScreen();
        } else if (elem.msRequestFullscreen) {
          await elem.msRequestFullscreen();
        }
      }
    } catch (err) {
      console.warn("Fullscreen request error in handleStartLiveInterview:", err);
    }
    setStep('live');
  };

  const exitFullscreenIfActive = async () => {
    try {
      if (document.fullscreenElement && document.exitFullscreen) {
        await document.exitFullscreen();
      } else if (document.webkitFullscreenElement && document.webkitExitFullscreen) {
        await document.webkitExitFullscreen();
      } else if (document.mozFullScreenElement && document.mozCancelFullScreen) {
        await document.mozCancelFullScreen();
      } else if (document.msFullscreenElement && document.msExitFullscreen) {
        await document.msExitFullscreen();
      }
    } catch (err) {
      // ignore
    }
  };

  const handleInterviewComplete = async (results) => {
    await exitFullscreenIfActive();
    setInterviewResults({ ...results, status: 'COMPLETED' });
    setStep('report');
  };

  const handleInterviewTerminated = async (termData) => {
    await exitFullscreenIfActive();
    const violationList = Array.isArray(termData) ? termData : (termData?.violations || []);
    setInterviewResults({
      answers: termData?.answers || [],
      violations: violationList,
      strikeCount: termData?.strikeCount || 3,
      status: 'TERMINATED_PROCTORING_VIOLATION',
      setupData
    });
    setStep('report');
  };

  const handleRestart = () => {
    setInterviewResults(null);
    setStep('setup');
  };

  return (
    <div className={`${step === 'live' ? 'w-full max-w-[1550px] px-2 sm:px-4 py-3 sm:py-5' : 'max-w-6xl mx-auto px-4 py-6 md:py-8'} space-y-6 animate-fade-in select-none`}>
      {/* Header */}
      {step !== 'live' && (
        <div className="space-y-1">
          <h1 className={`text-3xl font-bold tracking-tight ${
            isDarkMode ? 'text-white' : 'text-[#0a0a0a]'
          }`}>AI Proctored Interview</h1>
          <p className={`text-xs font-mono uppercase tracking-wider ${
            isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
          }`}>
            Technical & HR interviews with vision proctoring
          </p>
        </div>
      )}

      {/* Render Current Step */}
      {step === 'setup' && (
        <SetupStep onNext={handleSetupNext} />
      )}

      {step === 'rules' && (
        <RulesConsentStep 
          setupData={setupData} 
          onNext={handleRulesNext} 
          onBack={() => setStep('setup')} 
        />
      )}

      {step === 'system_check' && (
        <SystemCheckStep 
          setupData={setupData} 
          onStartInterview={handleStartLiveInterview} 
          onBack={() => setStep('rules')} 
        />
      )}

      {step === 'live' && (
        <LiveInterviewWorkspace 
          setupData={setupData} 
          onInterviewComplete={handleInterviewComplete} 
          onInterviewTerminated={handleInterviewTerminated} 
        />
      )}

      {step === 'report' && interviewResults && (
        <InterviewReport 
          resultData={interviewResults} 
          onRestart={handleRestart} 
        />
      )}
    </div>
  );
};
