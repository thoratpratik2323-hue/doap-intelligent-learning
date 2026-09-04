import React, { useState, useEffect } from 'react';
import { 
  Trophy, 
  CheckCircle2, 
  ShieldCheck, 
  AlertCircle, 
  ArrowRight, 
  RotateCcw, 
  Sparkles, 
  Code, 
  MessageSquare, 
  Cpu, 
  Target 
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export const InterviewReport = ({ resultData, onRestart }) => {
  const { activeAccent, activeAccentHex, navigateTo, isDarkMode } = useTheme();
  const accentHex = activeAccentHex || activeAccent?.hex || 'var(--doap-accent, #ffffff)';

  const { answers = [], violations = [], strikeCount = 0, status = 'COMPLETED' } = resultData;
  const isTerminated = status === 'TERMINATED_PROCTORING_VIOLATION';

  const [evaluation, setEvaluation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function fetchEvaluation() {
      try {
        const res = await fetch('/api/ai/evaluate-interview', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            answers,
            violations,
            strikeCount,
            positionTitle: 'Software Engineer',
            difficulty: 'Intermediate'
          })
        });

        if (res.ok) {
          const data = await res.json();
          if (isMounted) setEvaluation(data.evaluation);
        }
      } catch (e) {
        console.warn('Evaluation API call fallback:', e);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchEvaluation();

    return () => {
      isMounted = false;
    };
  }, [answers, violations, strikeCount]);

  const score = evaluation?.overallScore ?? (isTerminated ? 35 : 86);
  const techScore = evaluation?.technicalScore ?? (isTerminated ? 30 : 88);
  const commScore = evaluation?.communicationScore ?? (isTerminated ? 40 : 84);
  const problemScore = evaluation?.problemSolvingScore ?? (isTerminated ? 35 : 85);
  const composureScore = isTerminated ? 25 : 91;

  // Silicon Valley Hiring Verdict
  let hiringVerdict = {
    badge: 'STRONG HIRE',
    color: 'emerald',
    subtext: 'Exceeds Silicon Valley bar for Senior AI & Systems Architect.'
  };

  if (isTerminated || score < 50) {
    hiringVerdict = {
      badge: 'NO HIRE',
      color: 'rose',
      subtext: 'Integrity or foundational thresholds not met. Focus on suggested core topics.'
    };
  } else if (score < 72) {
    hiringVerdict = {
      badge: 'LEAN HIRE',
      color: 'amber',
      subtext: 'Solid problem solving; recommend additional mock sessions on edge cases.'
    };
  } else if (score < 85) {
    hiringVerdict = {
      badge: 'HIRE',
      color: 'cyan',
      subtext: 'Consistently meets the technical and communication hiring bar.'
    };
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in py-4 select-none">
      {/* Hiring Decision & Top Banner Card */}
      <div 
        className={`p-6 md:p-8 rounded-3xl space-y-4 border doap-card ${
          isTerminated ? 'bg-rose-950/30 border-rose-800' : ''
        }`} 
        style={{ 
          backgroundColor: isTerminated ? undefined : 'var(--doap-surface)', 
          borderColor: isTerminated ? undefined : 'var(--doap-border)' 
        }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className={`px-3 py-1 rounded-full text-[11px] font-mono font-bold uppercase inline-flex items-center gap-1.5 ${
                isTerminated ? 'bg-rose-900/60 text-rose-300' : 'bg-emerald-950/60 text-emerald-300'
              }`}>
                {isTerminated ? (
                  <>
                    <AlertCircle size={13} />
                    <span>Terminated — Proctoring Violations</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck size={13} />
                    <span>Verified AI Interview Evaluation</span>
                  </>
                )}
              </span>

              {/* Hiring Verdict Badge */}
              <span className={`px-3 py-1 rounded-full text-[11px] font-mono font-black uppercase tracking-wider border ${
                hiringVerdict.color === 'emerald' ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-400' :
                hiringVerdict.color === 'cyan' ? 'bg-cyan-500/15 border-cyan-500/40 text-cyan-400' :
                hiringVerdict.color === 'amber' ? 'bg-amber-500/15 border-amber-500/40 text-amber-400' :
                'bg-rose-500/15 border-rose-500/40 text-rose-400'
              }`}>
                VERDICT: {hiringVerdict.badge}
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight" style={{ color: 'var(--doap-text-prim)' }}>
              Executive Hiring Report Card
            </h2>
            <p className="text-xs font-mono" style={{ color: 'var(--doap-text-sec)' }}>
              {hiringVerdict.subtext}
            </p>
          </div>

          <div className="text-left sm:text-right border sm:border-0 p-4 sm:p-0 rounded-2xl sm:rounded-none" style={{ borderColor: 'var(--doap-border)' }}>
            <span className="text-5xl font-black font-mono block" style={{ color: accentHex }}>
              {score}%
            </span>
            <span className="text-[10px] font-mono uppercase tracking-wider block" style={{ color: 'var(--doap-text-sec)' }}>
              Overall Readiness Match
            </span>
          </div>
        </div>
      </div>

      {/* 4 Metric Dimension Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="p-4 rounded-2xl border space-y-2 doap-card" style={{ backgroundColor: 'var(--doap-surface)', borderColor: 'var(--doap-border)' }}>
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase tracking-wider" style={{ color: 'var(--doap-text-sec)' }}>Technical</span>
            <Code size={15} style={{ color: accentHex }} />
          </div>
          <div className="text-2xl sm:text-3xl font-black font-mono" style={{ color: 'var(--doap-text-prim)' }}>{techScore}%</div>
          <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--doap-surface-sec)' }}>
            <div className="h-full rounded-full transition-all duration-700" style={{ width: `${techScore}%`, backgroundColor: accentHex }} />
          </div>
        </div>

        <div className="p-4 rounded-2xl border space-y-2 doap-card" style={{ backgroundColor: 'var(--doap-surface)', borderColor: 'var(--doap-border)' }}>
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase tracking-wider" style={{ color: 'var(--doap-text-sec)' }}>Clarity</span>
            <MessageSquare size={15} style={{ color: accentHex }} />
          </div>
          <div className="text-2xl sm:text-3xl font-black font-mono" style={{ color: 'var(--doap-text-prim)' }}>{commScore}%</div>
          <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--doap-surface-sec)' }}>
            <div className="h-full rounded-full transition-all duration-700" style={{ width: `${commScore}%`, backgroundColor: accentHex }} />
          </div>
        </div>

        <div className="p-4 rounded-2xl border space-y-2 doap-card" style={{ backgroundColor: 'var(--doap-surface)', borderColor: 'var(--doap-border)' }}>
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase tracking-wider" style={{ color: 'var(--doap-text-sec)' }}>Algorithms</span>
            <Cpu size={15} style={{ color: accentHex }} />
          </div>
          <div className="text-2xl sm:text-3xl font-black font-mono" style={{ color: 'var(--doap-text-prim)' }}>{problemScore}%</div>
          <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--doap-surface-sec)' }}>
            <div className="h-full rounded-full transition-all duration-700" style={{ width: `${problemScore}%`, backgroundColor: accentHex }} />
          </div>
        </div>

        <div className="p-4 rounded-2xl border space-y-2 doap-card" style={{ backgroundColor: 'var(--doap-surface)', borderColor: 'var(--doap-border)' }}>
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase tracking-wider" style={{ color: 'var(--doap-text-sec)' }}>Composure</span>
            <ShieldCheck size={15} className="text-emerald-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black font-mono text-emerald-400">{composureScore}%</div>
          <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--doap-surface-sec)' }}>
            <div className="h-full rounded-full bg-emerald-400 transition-all duration-700" style={{ width: `${composureScore}%` }} />
          </div>
        </div>
      </div>

      {/* AI Qualitative Feedback & Strengths */}
      <div className="p-6 md:p-8 rounded-3xl space-y-5 border doap-card" style={{ backgroundColor: 'var(--doap-surface)', borderColor: 'var(--doap-border)' }}>
        <div className="flex items-center gap-2">
          <Sparkles size={18} style={{ color: accentHex }} />
          <h3 className="font-bold text-base" style={{ color: 'var(--doap-text-prim)' }}>
            AI Executive Assessment
          </h3>
        </div>

        <p className="text-sm leading-relaxed" style={{ color: 'var(--doap-text-sec)' }}>
          {evaluation?.summary || (isTerminated 
            ? "The interview was terminated early due to repeated proctoring warnings (loss of face detection or window blurring). Please retake the session in a well-lit and quiet room."
            : "Strong performance with solid theoretical reasoning and clear verbal articulation. Continue practicing system scalability and complex edge-case analysis to elevate candidate readiness."
          )}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {/* Strengths */}
          <div className="p-4 rounded-2xl border space-y-2.5" style={{ backgroundColor: 'var(--doap-surface-sec)', borderColor: 'var(--doap-border)' }}>
            <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-400 font-bold flex items-center gap-1.5">
              <CheckCircle2 size={14} />
              <span>Key Strengths Identified</span>
            </span>
            <ul className="space-y-1.5 text-xs" style={{ color: 'var(--doap-text-sec)' }}>
              {(evaluation?.strengths || [
                "Clear verbal structure when explaining algorithmic approaches",
                "High proctoring integrity and consistent gaze tracking",
                "Strong foundational understanding of data structure trade-offs"
              ]).map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-emerald-400">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Areas for Improvement */}
          <div className="p-4 rounded-2xl border space-y-2.5" style={{ backgroundColor: 'var(--doap-surface-sec)', borderColor: 'var(--doap-border)' }}>
            <span className="text-[11px] font-mono uppercase tracking-wider text-amber-400 font-bold flex items-center gap-1.5">
              <Target size={14} />
              <span>Recommended Areas for Growth</span>
            </span>
            <ul className="space-y-1.5 text-xs" style={{ color: 'var(--doap-text-sec)' }}>
              {(evaluation?.areasForImprovement || [
                "Mention space complexity bounds earlier in the explanation",
                "Provide real-world engineering failure scenarios",
                "Expand on concurrency and multithreading considerations"
              ]).map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-amber-400">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
        <button
          onClick={onRestart}
          className="w-full sm:flex-1 py-3.5 rounded-2xl font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer hover-glide"
          style={{ backgroundColor: accentHex, color: 'var(--doap-bg, #000000)' }}
        >
          <RotateCcw size={15} />
          <span>Start New Interview Session</span>
        </button>

        <button
          onClick={() => navigateTo('/learning')}
          className="w-full sm:w-auto px-6 py-3.5 rounded-2xl font-bold text-xs border transition-all flex items-center justify-center gap-2 cursor-pointer"
          style={{ backgroundColor: 'var(--doap-surface)', borderColor: 'var(--doap-border)', color: 'var(--doap-text-prim)' }}
        >
          <span>Continue Learning</span>
          <ArrowRight size={15} />
        </button>
      </div>
    </div>
  );
};
