import React, { useState } from 'react';
import { SetupStep } from '../components/Interview/SetupStep';
import { RulesConsentStep } from '../components/Interview/RulesConsentStep';
import { SystemCheckStep } from '../components/Interview/SystemCheckStep';
import { LiveInterviewWorkspace } from '../components/Interview/LiveInterviewWorkspace';
import { InterviewReport } from '../components/Interview/InterviewReport';
import { useTheme } from '../context/ThemeContext';

export const AIInterview = () => {
  const { profile, isDarkMode } = useTheme();

  const [step, setStep] = useState('setup'); // 'setup' | 'rules' | 'system_check' | 'live' | 'report'
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

  const handleStartLiveInterview = () => {
    setStep('live');
  };

  const handleInterviewComplete = (results) => {
    setInterviewResults({ ...results, status: 'COMPLETED' });
    setStep('report');
  };

  const handleInterviewTerminated = (violations) => {
    setInterviewResults({
      answers: [],
      violations,
      strikeCount: 3,
      status: 'TERMINATED_PROCTORING_VIOLATION'
    });
    setStep('report');
  };

  const handleRestart = () => {
    setInterviewResults(null);
    setStep('setup');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 md:py-8 space-y-6 animate-fade-in select-none">
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
