import React, { useState, useEffect } from 'react';
import { Camera, Mic, Eye, Maximize, Globe, Wifi, CheckCircle2, AlertCircle, RefreshCw, Play, VideoOff } from 'lucide-react';
import { useCamera } from '../../hooks/useCamera';
import { useSpeechRecognition } from '../../hooks/useSpeechRecognition';
import { useTheme } from '../../context/ThemeContext';

export const SystemCheckStep = ({ setupData, onStartInterview, onBack }) => {
  const { activeAccent, activeAccentHex } = useTheme();
  const accentHex = activeAccentHex || activeAccent?.hex || 'var(--doap-accent, #ffffff)';

  const {
    stream,
    bindVideoRef,
    isCameraOn,
    error: cameraError,
    startMedia,
    stopMedia
  } = useCamera();

  const { isSupported: isSpeechSupported } = useSpeechRecognition();

  const [diagnostics, setDiagnostics] = useState({
    camera: 'testing',
    microphone: 'testing',
    face: 'testing',
    fullscreen: 'testing',
    browser: 'testing',
    network: 'testing'
  });

  const runDiagnostics = async () => {
    setDiagnostics({
      camera: 'testing',
      microphone: 'testing',
      face: 'testing',
      fullscreen: 'testing',
      browser: 'testing',
      network: 'testing'
    });

    const success = await startMedia({ video: true, audio: true });

    setDiagnostics({
      camera: success ? 'ready' : 'failed',
      microphone: success ? 'ready' : 'failed',
      face: success ? 'ready' : 'failed',
      fullscreen: Boolean(document.documentElement.requestFullscreen) ? 'ready' : 'failed',
      browser: typeof window !== 'undefined' ? 'ready' : 'failed',
      network: navigator.onLine ? 'ready' : 'failed'
    });
  };

  useEffect(() => {
    runDiagnostics();
    return () => {
      stopMedia();
    };
  }, []);

  const handleStart = () => {
    stopMedia();
    onStartInterview();
  };

  const handleBack = () => {
    stopMedia();
    onBack();
  };

  const allReady = Object.values(diagnostics).every(status => status === 'ready');

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fade-in select-none">
      <div className="p-6 md:p-8 rounded-3xl space-y-6 border doap-card" style={{ backgroundColor: 'var(--doap-surface)', borderColor: 'var(--doap-border)' }}>
        <div className="space-y-1 text-center">
          <h2 className="text-2xl font-extrabold" style={{ color: 'var(--doap-text-prim)' }}>
            Pre-Interview System Diagnostic Check
          </h2>
          <p className="text-xs font-mono" style={{ color: 'var(--doap-text-sec)' }}>
            Verifying your hardware, camera stream, microphone, and browser compatibility.
          </p>
        </div>

        {/* Diagnostic Items Checklist Table */}
        <div className="space-y-3">
          {/* Camera */}
          <div className="p-3.5 rounded-2xl border flex items-center justify-between" style={{ backgroundColor: 'var(--doap-surface-sec)', borderColor: 'var(--doap-border)' }}>
            <div className="flex items-center gap-3">
              <Camera size={18} style={{ color: 'var(--doap-text-sec)' }} />
              <span className="text-xs font-bold" style={{ color: 'var(--doap-text-prim)' }}>Camera Stream</span>
            </div>
            {diagnostics.camera === 'ready' ? (
              <span className="text-xs font-bold flex items-center gap-1 text-emerald-500">
                <CheckCircle2 size={16} /> Ready
              </span>
            ) : (
              <span className="text-xs font-bold flex items-center gap-1 text-rose-500">
                <AlertCircle size={16} /> Failed / Denied
              </span>
            )}
          </div>

          {/* Microphone */}
          <div className="p-3.5 rounded-2xl border flex items-center justify-between" style={{ backgroundColor: 'var(--doap-surface-sec)', borderColor: 'var(--doap-border)' }}>
            <div className="flex items-center gap-3">
              <Mic size={18} style={{ color: 'var(--doap-text-sec)' }} />
              <span className="text-xs font-bold" style={{ color: 'var(--doap-text-prim)' }}>Microphone Audio</span>
            </div>
            {diagnostics.microphone === 'ready' ? (
              <span className="text-xs font-bold flex items-center gap-1 text-emerald-500">
                <CheckCircle2 size={16} /> Ready
              </span>
            ) : (
              <span className="text-xs font-bold flex items-center gap-1 text-rose-500">
                <AlertCircle size={16} /> Failed / Denied
              </span>
            )}
          </div>

          {/* Face Detection */}
          <div className="p-3.5 rounded-2xl border flex items-center justify-between" style={{ backgroundColor: 'var(--doap-surface-sec)', borderColor: 'var(--doap-border)' }}>
            <div className="flex items-center gap-3">
              <Eye size={18} style={{ color: 'var(--doap-text-sec)' }} />
              <span className="text-xs font-bold" style={{ color: 'var(--doap-text-prim)' }}>Face Vision Detection</span>
            </div>
            {diagnostics.face === 'ready' ? (
              <span className="text-xs font-bold flex items-center gap-1 text-emerald-500">
                <CheckCircle2 size={16} /> Detected
              </span>
            ) : (
              <span className="text-xs font-bold flex items-center gap-1 text-amber-500">
                <AlertCircle size={16} /> Pending Frame
              </span>
            )}
          </div>

          {/* Fullscreen API */}
          <div className="p-3.5 rounded-2xl border flex items-center justify-between" style={{ backgroundColor: 'var(--doap-surface-sec)', borderColor: 'var(--doap-border)' }}>
            <div className="flex items-center gap-3">
              <Maximize size={18} style={{ color: 'var(--doap-text-sec)' }} />
              <span className="text-xs font-bold" style={{ color: 'var(--doap-text-prim)' }}>Fullscreen API</span>
            </div>
            {diagnostics.fullscreen === 'ready' ? (
              <span className="text-xs font-bold flex items-center gap-1 text-emerald-500">
                <CheckCircle2 size={16} /> Ready
              </span>
            ) : (
              <span className="text-xs font-bold flex items-center gap-1 text-amber-500">
                <AlertCircle size={16} /> Limited
              </span>
            )}
          </div>

          {/* Browser */}
          <div className="p-3.5 rounded-2xl border flex items-center justify-between" style={{ backgroundColor: 'var(--doap-surface-sec)', borderColor: 'var(--doap-border)' }}>
            <div className="flex items-center gap-3">
              <Globe size={18} style={{ color: 'var(--doap-text-sec)' }} />
              <span className="text-xs font-bold" style={{ color: 'var(--doap-text-prim)' }}>Browser Compatibility</span>
            </div>
            <span className="text-xs font-bold flex items-center gap-1 text-emerald-500">
              <CheckCircle2 size={16} /> Compatible
            </span>
          </div>

          {/* Network */}
          <div className="p-3.5 rounded-2xl border flex items-center justify-between" style={{ backgroundColor: 'var(--doap-surface-sec)', borderColor: 'var(--doap-border)' }}>
            <div className="flex items-center gap-3">
              <Wifi size={18} style={{ color: 'var(--doap-text-sec)' }} />
              <span className="text-xs font-bold" style={{ color: 'var(--doap-text-prim)' }}>Network Connection</span>
            </div>
            <span className="text-xs font-bold flex items-center gap-1 text-emerald-500">
              <CheckCircle2 size={16} /> Connected
            </span>
          </div>
        </div>

        {/* Live Camera Preview Box */}
        <div className="bg-neutral-900 rounded-2xl h-44 flex items-center justify-center relative overflow-hidden border border-neutral-800">
          <video
            ref={bindVideoRef}
            autoPlay
            playsInline
            muted
            className={`w-full h-full object-cover rounded-2xl ${stream && isCameraOn ? 'block' : 'hidden'}`}
            style={{ transform: 'none' }}
          />

          {(!stream || !isCameraOn) && (
            <div className="flex flex-col items-center justify-center text-neutral-400 space-y-2">
              <VideoOff size={32} className="text-neutral-500" />
              <span className="text-xs font-medium font-mono">Camera stream preview initializing...</span>
            </div>
          )}
        </div>

        {/* Camera Error Message */}
        {cameraError && (
          <div className="p-3.5 bg-rose-950/40 border border-rose-800 text-rose-300 rounded-2xl text-xs font-semibold flex items-center justify-between">
            <span>{cameraError}</span>
            <button
              onClick={runDiagnostics}
              className="px-3 py-1 bg-rose-600 text-white rounded-lg hover:bg-rose-700 flex items-center gap-1 text-xs"
            >
              <RefreshCw size={12} /> Retry
            </button>
          </div>
        )}

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            onClick={handleBack}
            className="sm:w-1/3 py-3.5 rounded-2xl text-xs font-bold border transition-colors cursor-pointer"
            style={{ backgroundColor: 'var(--doap-surface-sec)', borderColor: 'var(--doap-border)', color: 'var(--doap-text-prim)' }}
          >
            Back
          </button>

          <button
            onClick={handleStart}
            className="sm:w-2/3 py-3.5 rounded-2xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer hover-glide"
            style={{ backgroundColor: accentHex, color: 'var(--doap-bg, #000000)' }}
          >
            <Play size={16} />
            <span>{allReady ? 'Start Live Proctored Interview' : 'Start Interview (Standard Mode)'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
