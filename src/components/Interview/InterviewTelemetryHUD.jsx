import React, { useMemo } from 'react';
import { Activity, Gauge, AlertTriangle, ShieldCheck, Zap } from 'lucide-react';

const FILLER_WORDS = ['um', 'uh', 'like', 'basically', 'actually', 'you know', 'sort of', 'kind of', 'literally'];

export const InterviewTelemetryHUD = ({ transcript = '', recordingSeconds = 0, isRecording = false }) => {
  const telemetry = useMemo(() => {
    if (!transcript.trim()) {
      return {
        wordCount: 0,
        wpm: 0,
        fillerCount: 0,
        fillerBreakdown: {},
        confidenceScore: 92,
        pacingStatus: 'Optimal'
      };
    }

    const words = transcript
      .toLowerCase()
      .replace(/[^\w\s]/g, '')
      .split(/\s+/)
      .filter(Boolean);

    const wordCount = words.length;

    // Calculate WPM based on active seconds
    const minutes = Math.max(recordingSeconds / 60, 0.1);
    const wpm = Math.round(wordCount / minutes);

    // Count filler words
    let fillerCount = 0;
    const fillerBreakdown = {};

    words.forEach(w => {
      if (FILLER_WORDS.includes(w)) {
        fillerCount++;
        fillerBreakdown[w] = (fillerBreakdown[w] || 0) + 1;
      }
    });

    // Calculate confidence score (100 base, deductions for excessive fillers or extreme pacing)
    let score = 96;
    if (wordCount > 10) {
      const fillerRatio = fillerCount / wordCount;
      score -= Math.round(fillerRatio * 60);
    }
    if (wpm > 175) score -= 8; // too fast
    if (wpm < 85 && wordCount > 15) score -= 8; // too hesitant
    score = Math.max(40, Math.min(99, score));

    // Pacing Status
    let pacingStatus = 'Calibrated';
    if (wpm > 165) pacingStatus = 'Fast';
    else if (wpm < 95 && wordCount > 10) pacingStatus = 'Hesitant';
    else pacingStatus = 'Optimal';

    return {
      wordCount,
      wpm,
      fillerCount,
      fillerBreakdown,
      confidenceScore: score,
      pacingStatus
    };
  }, [transcript, recordingSeconds]);

  return (
    <div className="p-3.5 rounded-2xl bg-[#090b10] border border-neutral-800/80 space-y-2.5 font-sans">
      <div className="flex items-center justify-between text-[11px] font-mono">
        <span className="text-neutral-400 font-bold flex items-center gap-1.5 uppercase tracking-wider">
          <Activity size={13} className="text-cyan-400" />
          <span>Real-Time Speech Telemetry</span>
        </span>
        {isRecording && (
          <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            Live Audio Analysis
          </span>
        )}
      </div>

      <div className="grid grid-cols-3 gap-2 text-center">
        {/* WPM Gauge */}
        <div className="p-2 rounded-xl bg-black/40 border border-neutral-800">
          <span className="text-[10px] font-mono text-neutral-400 block">Pacing (WPM)</span>
          <div className="text-sm font-bold text-white font-mono flex items-center justify-center gap-1 mt-0.5">
            <Gauge size={13} className="text-cyan-400" />
            <span>{telemetry.wpm}</span>
          </div>
          <span className={`text-[9px] font-mono ${
            telemetry.pacingStatus === 'Optimal' ? 'text-emerald-400' : 'text-amber-400'
          }`}>
            {telemetry.pacingStatus}
          </span>
        </div>

        {/* Filler Word Counter */}
        <div className="p-2 rounded-xl bg-black/40 border border-neutral-800">
          <span className="text-[10px] font-mono text-neutral-400 block">Fillers ("um", "like")</span>
          <div className="text-sm font-bold text-white font-mono flex items-center justify-center gap-1 mt-0.5">
            <AlertTriangle size={13} className={telemetry.fillerCount > 3 ? "text-amber-400" : "text-neutral-500"} />
            <span className={telemetry.fillerCount > 3 ? "text-amber-300" : "text-white"}>{telemetry.fillerCount}</span>
          </div>
          <span className="text-[9px] font-mono text-neutral-400">
            {telemetry.fillerCount === 0 ? 'Flawless' : `${telemetry.fillerCount} detected`}
          </span>
        </div>

        {/* Delivery Confidence Score */}
        <div className="p-2 rounded-xl bg-black/40 border border-neutral-800">
          <span className="text-[10px] font-mono text-neutral-400 block">Composure</span>
          <div className="text-sm font-bold text-white font-mono flex items-center justify-center gap-1 mt-0.5">
            <ShieldCheck size={13} className="text-emerald-400" />
            <span>{telemetry.confidenceScore}%</span>
          </div>
          <span className="text-[9px] font-mono text-emerald-400">High Stability</span>
        </div>
      </div>
    </div>
  );
};
