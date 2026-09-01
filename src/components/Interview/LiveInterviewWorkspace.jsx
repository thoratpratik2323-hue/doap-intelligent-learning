import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Square, 
  Mic, 
  MicOff, 
  Camera, 
  VideoOff, 
  Clock, 
  ShieldAlert, 
  AlertCircle, 
  CheckCircle2, 
  Sparkles,
  Maximize2,
  XCircle,
  ArrowRight
} from 'lucide-react';
import { useCamera } from '../../hooks/useCamera';
import { useSpeechRecognition } from '../../hooks/useSpeechRecognition';
import { useProctoring } from '../../hooks/useProctoring';
import { useFaceDetection } from '../../hooks/useFaceDetection';
import { useTheme } from '../../context/ThemeContext';
import { generateQuestionsForPosition } from '../../data/positionsData';
import { createAnswerModel } from '../../data/interviewSchema';

export const LiveInterviewWorkspace = ({ setupData, onInterviewComplete, onInterviewTerminated }) => {
  const { activeAccent, activeAccentHex } = useTheme();
  const accentHex = activeAccentHex || activeAccent?.hex || 'var(--doap-accent, #ffffff)';

  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [hasStartedRecording, setHasStartedRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [totalInterviewSeconds, setTotalInterviewSeconds] = useState(0);
  const [recordedAnswers, setRecordedAnswers] = useState([]);
  const [currentAnswerText, setCurrentAnswerText] = useState('');
  const [baseAnswerText, setBaseAnswerText] = useState('');
  const [cueMessage, setCueMessage] = useState('');

  const recordingTimerRef = useRef(null);

  const {
    stream,
    videoRef,
    bindVideoRef,
    isCameraOn,
    isMicOn,
    startMedia,
    stopMedia,
    toggleCamera,
    toggleMic
  } = useCamera();

  const {
    transcript,
    isListening,
    isSupported: isSpeechSupported,
    startListening,
    stopListening,
    resetTranscript
  } = useSpeechRecognition();

  const {
    isFullscreen,
    strikeCount,
    violations,
    requestFullscreen,
    exitFullscreen
  } = useProctoring({
    isInterviewActive: true,
    onStrikeLimitExceeded: () => {
      stopMedia();
      onInterviewTerminated({
        status: 'TERMINATED_PROCTORING_VIOLATION',
        strikeCount: 3,
        violations: violations,
        answers: recordedAnswers
      });
    }
  });

  const {
    faceStatus,
    headPose
  } = useFaceDetection({ videoRef, isStreamActive: isCameraOn });

  useEffect(() => {
    const qList = generateQuestionsForPosition(setupData.positionId);
    setQuestions(qList);
    startMedia({ video: true, audio: true });
    requestFullscreen();

    const overallTimer = setInterval(() => {
      setTotalInterviewSeconds(prev => prev + 1);
    }, 1000);

    return () => {
      clearInterval(overallTimer);
      stopMedia();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Intentional mount-only — starts interview session once

  useEffect(() => {
    if (isListening && transcript) {
      setCurrentAnswerText(baseAnswerText + (baseAnswerText ? ' ' : '') + transcript);
    }
  }, [transcript, isListening, baseAnswerText]);

  const handleStartRecording = () => {
    setIsRecording(true);
    setHasStartedRecording(true);
    setRecordingSeconds(0);
    resetTranscript();
    setBaseAnswerText(currentAnswerText);

    if (isSpeechSupported) {
      startListening();
    }

    recordingTimerRef.current = setInterval(() => {
      setRecordingSeconds(prev => prev + 1);
    }, 1000);
  };

  const handlePauseRecording = () => {
    setIsRecording(false);
    if (recordingTimerRef.current) clearInterval(recordingTimerRef.current);
    if (isSpeechSupported) stopListening();
    setBaseAnswerText(currentAnswerText);
  };

  const handleNextQuestion = () => {
    if (isRecording) {
      handlePauseRecording();
    }

    const currentQ = questions[currentQuestionIndex] || {};
    const newAnswerObj = createAnswerModel({
      questionId: currentQ.id || `q_${currentQuestionIndex}`,
      questionCategory: currentQ.category || 'General',
      questionText: currentQ.title || 'Question',
      transcript: currentAnswerText,
      recordingDurationSeconds: recordingSeconds
    });

    const updatedAnswers = [...recordedAnswers, newAnswerObj];
    setRecordedAnswers(updatedAnswers);

    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(prev => prev + 1);
      setCurrentAnswerText('');
      setBaseAnswerText('');
      setRecordingSeconds(0);
      setHasStartedRecording(false);
      resetTranscript();
    } else {
      stopMedia();
      onInterviewComplete({
        status: 'COMPLETED',
        strikeCount,
        violations,
        answers: updatedAnswers
      });
    }
  };

  const currentQ = questions[currentQuestionIndex] || { title: 'Loading question...', category: 'General', expectedDuration: '3 min' };

  return (
    <div className="space-y-6 animate-fade-in select-none">
      {/* Top Status Header */}
      <div className="p-4 rounded-3xl flex flex-wrap items-center justify-between gap-4 border doap-card" style={{ backgroundColor: 'var(--doap-surface)', borderColor: 'var(--doap-border)' }}>
        <div className="flex items-center gap-3">
          <span className="w-3 h-3 rounded-full bg-rose-500 animate-ping" />
          <div>
            <h3 className="font-extrabold text-sm" style={{ color: 'var(--doap-text-prim)' }}>
              LIVE PROCTORED SESSION — {setupData.positionTitle.toUpperCase()}
            </h3>
            <span className="text-[11px] font-mono" style={{ color: 'var(--doap-text-sec)' }}>
              Question {currentQuestionIndex + 1} of {questions.length} • {setupData.type} ({setupData.difficulty})
            </span>
          </div>
        </div>

        {/* Timer & Strikes Badge */}
        <div className="flex items-center gap-3">
          <div className="px-3.5 py-1.5 rounded-xl border text-xs font-mono font-bold flex items-center gap-1.5" style={{ backgroundColor: 'var(--doap-surface-sec)', borderColor: 'var(--doap-border)', color: 'var(--doap-text-prim)' }}>
            <Clock size={14} style={{ color: accentHex }} />
            <span>{Math.floor(totalInterviewSeconds / 60)}m {totalInterviewSeconds % 60}s</span>
          </div>

          <div className={`px-3 py-1.5 rounded-xl border text-xs font-mono font-bold flex items-center gap-1.5 ${
            strikeCount === 0 ? 'bg-emerald-950/40 border-emerald-800 text-emerald-400' : 'bg-rose-950/40 border-rose-800 text-rose-400'
          }`}>
            <ShieldAlert size={14} />
            <span>Proctor Strikes: {strikeCount}/3</span>
          </div>
        </div>
      </div>

      {/* Main Workspace Layout (2 Columns) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Question & Recording Canvas */}
        <div className="lg:col-span-7 space-y-6">
          {/* Question Display Card */}
          <div className="p-6 md:p-8 rounded-3xl space-y-4 border doap-card" style={{ backgroundColor: 'var(--doap-surface)', borderColor: 'var(--doap-border)' }}>
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full text-[10px] font-mono uppercase font-bold border" style={{ backgroundColor: 'var(--doap-surface-sec)', borderColor: 'var(--doap-border)', color: accentHex }}>
                {currentQ.category || 'TECHNICAL REASONING'}
              </span>
              <span className="text-xs font-mono" style={{ color: 'var(--doap-text-sec)' }}>
                Target: {currentQ.expectedDuration || '3 min'}
              </span>
            </div>

            <h2 className="text-xl md:text-2xl font-bold leading-relaxed" style={{ color: 'var(--doap-text-prim)' }}>
              {currentQ.title}
            </h2>

            {currentQ.hint && (
              <div className="p-3.5 rounded-2xl border text-xs font-mono space-y-1" style={{ backgroundColor: 'var(--doap-surface-sec)', borderColor: 'var(--doap-border)', color: 'var(--doap-text-sec)' }}>
                <span className="font-bold" style={{ color: 'var(--doap-text-prim)' }}>💡 Guidance Hint:</span>
                <p>{currentQ.hint}</p>
              </div>
            )}
          </div>

          {/* Response Answer Box */}
          <div className="p-6 rounded-3xl space-y-4 border doap-card" style={{ backgroundColor: 'var(--doap-surface)', borderColor: 'var(--doap-border)' }}>
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold uppercase tracking-wider" style={{ color: 'var(--doap-text-sec)' }}>
                YOUR SPEECH / TYPED RESPONSE
              </span>

              {isRecording && (
                <span className="text-xs font-mono text-rose-500 font-bold flex items-center gap-1.5 animate-pulse">
                  <span className="w-2 h-2 rounded-full bg-rose-500" /> Recording Audio ({recordingSeconds}s)...
                </span>
              )}
            </div>

            <textarea
              rows={6}
              placeholder="Speak aloud into your microphone or type your response structured answer here..."
              value={currentAnswerText}
              onChange={(e) => setCurrentAnswerText(e.target.value)}
              className="w-full p-4 rounded-2xl border text-xs font-mono focus:outline-none resize-none"
              style={{ backgroundColor: 'var(--doap-surface-sec)', borderColor: 'var(--doap-border)', color: 'var(--doap-text-prim)' }}
            />

            {/* Answer Control Buttons */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <div className="flex items-center gap-2">
                {!isRecording ? (
                  <button
                    onClick={handleStartRecording}
                    className="px-5 py-2.5 rounded-xl font-bold text-xs shadow-md transition-all flex items-center gap-2 cursor-pointer hover-glide"
                    style={{ backgroundColor: accentHex, color: 'var(--doap-bg, #000000)' }}
                  >
                    <Mic size={15} />
                    <span>{hasStartedRecording ? "Resume Recording" : "Start Answer Recording"}</span>
                  </button>
                ) : (
                  <button
                    onClick={handlePauseRecording}
                    className="px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-bold text-xs shadow-md transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <Square size={15} />
                    <span>Pause Audio Stream</span>
                  </button>
                )}
              </div>

              <button
                onClick={handleNextQuestion}
                className="px-6 py-2.5 font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer hover-glide"
                style={{ backgroundColor: 'var(--doap-surface-sec)', borderColor: 'var(--doap-border)', color: 'var(--doap-text-prim)' }}
              >
                <span>Submit & Next Question</span>
                <ArrowRight size={15} />
              </button>
            </div>
          </div>
        </div>

        {/* Right Camera & Proctoring Feed */}
        <div className="lg:col-span-5 flex flex-col space-y-4">
          <div className="p-4 rounded-3xl space-y-3 border doap-card flex-1 flex flex-col justify-between" style={{ backgroundColor: 'var(--doap-surface)', borderColor: 'var(--doap-border)' }}>
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="uppercase tracking-wider text-[11px] font-mono font-bold" style={{ color: 'var(--doap-text-sec)' }}>
                PROCTORED CAMERA STREAM
              </span>
              <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                faceStatus === 'DETECTED' ? 'bg-emerald-950/50 text-emerald-400 border border-emerald-800' : 'bg-rose-950/50 text-rose-400 border border-rose-800 animate-pulse'
              }`}>
                {faceStatus === 'DETECTED' ? '✓ Face Tracked' : `⚠️ ${faceStatus}`}
              </span>
            </div>

            {/* Live Camera Feed */}
            <div className="bg-neutral-900 rounded-2xl flex-1 min-h-[260px] relative overflow-hidden flex items-center justify-center border border-neutral-800">
              <video
                ref={bindVideoRef}
                autoPlay
                playsInline
                muted
                className={`w-full h-full object-cover rounded-2xl ${stream && isCameraOn ? 'block' : 'hidden'}`}
                style={{ transform: 'none' }}
              />

              {(!stream || !isCameraOn) && (
                <div className="text-center space-y-2 text-neutral-400">
                  <VideoOff size={40} className="mx-auto text-neutral-500" />
                  <p className="text-xs font-mono">Camera Feed Off / Initializing...</p>
                </div>
              )}
            </div>

            {/* Media Controls Bar */}
            <div className="flex items-center justify-center gap-4 pt-1">
              <button
                onClick={toggleMic}
                className="w-10 h-10 rounded-full flex items-center justify-center transition-colors cursor-pointer border"
                style={{ backgroundColor: isMicOn ? 'var(--doap-surface-sec)' : 'rgba(239, 68, 68, 0.2)', borderColor: 'var(--doap-border)', color: isMicOn ? 'var(--doap-text-prim)' : '#ef4444' }}
                title={isMicOn ? "Mute Mic" : "Unmute Mic"}
              >
                {isMicOn ? <Mic size={18} /> : <MicOff size={18} />}
              </button>

              <button
                onClick={toggleCamera}
                className="w-10 h-10 rounded-full flex items-center justify-center transition-colors cursor-pointer border"
                style={{ backgroundColor: isCameraOn ? 'var(--doap-surface-sec)' : 'rgba(239, 68, 68, 0.2)', borderColor: 'var(--doap-border)', color: isCameraOn ? 'var(--doap-text-prim)' : '#ef4444' }}
                title={isCameraOn ? "Turn Camera Off" : "Turn Camera On"}
              >
                {isCameraOn ? <Camera size={18} /> : <VideoOff size={18} />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
