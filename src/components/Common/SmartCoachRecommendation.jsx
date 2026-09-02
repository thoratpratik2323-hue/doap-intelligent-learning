import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Coffee, 
  Code, 
  Video, 
  CheckCircle2, 
  Brain, 
  Zap, 
  ArrowRight, 
  RefreshCw, 
  Flame, 
  Timer, 
  X, 
  Play, 
  Pause,
  RotateCcw
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';

export const SmartCoachRecommendation = ({ className = '' }) => {
  const { navigateTo, isDarkMode, activeAccentHex } = useTheme();
  const { profile, userProgress } = useAuth();
  const accentHex = activeAccentHex || '#ffffff';

  const [adviceIndex, setAdviceIndex] = useState(0);
  const [isBreakModalOpen, setIsBreakModalOpen] = useState(false);
  const [breakSecondsLeft, setBreakSecondsLeft] = useState(300); // 5 minutes
  const [isBreakRunning, setIsBreakRunning] = useState(false);

  // Compute live user stats
  const tasks = userProgress?.tasks || [];
  const tasksCompleted = tasks.filter(t => t.completed).length;
  const solvedCount = (userProgress?.solvedProblems || []).length;
  const assessmentsCount = (userProgress?.assessments || []).length;
  const streak = profile?.stats?.dayStreak || 1;
  const userInterests = (profile?.interests || []).join(', ');
  const userGoals = (profile?.careerGoals || []).join(', ');

  // Dynamic Rule-Based Smart Recommendation Engine
  const generateRecommendations = () => {
    const list = [];

    // Rule 1: High Study Saturation / Brain Break Nudge
    if (tasksCompleted >= 2 || solvedCount >= 2) {
      list.push({
        id: 'fatigue_guard',
        badge: 'Brain Balance & Rest',
        badgeColor: 'text-amber-400 bg-amber-400/10 border-amber-400/30',
        icon: Coffee,
        title: "You've studied hard today! Take a quick 5-min chill break ☕",
        description: "Intense focus leads to cognitive fatigue after 60-90 minutes. Resting for 5 minutes consolidates memory retention by up to 2x before your next session.",
        primaryAction: {
          label: 'Start 5-Min Chill Timer',
          icon: Coffee,
          onClick: () => {
            setBreakSecondsLeft(300);
            setIsBreakRunning(true);
            setIsBreakModalOpen(true);
          }
        },
        secondaryAction: {
          label: 'Quick 3-Min Assessment',
          icon: Brain,
          onClick: () => navigateTo('/assessments')
        }
      });
    }

    // Rule 2: Theory-to-Practice Switch
    if (tasksCompleted > 0 && solvedCount === 0) {
      list.push({
        id: 'practice_switch',
        badge: 'Hands-on Practice',
        badgeColor: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/30',
        icon: Code,
        title: "You reviewed concepts today. Now try 1 coding challenge! 💻",
        description: "Reading theory is 20% of engineering mastery. Test your logic right now in the in-browser coding sandbox with automated test cases.",
        primaryAction: {
          label: 'Launch Coding Sandbox',
          icon: Code,
          onClick: () => navigateTo('/coding-practice')
        },
        secondaryAction: {
          label: 'Ask AI Tutor for Code Sample',
          icon: Sparkles,
          onClick: () => navigateTo('/ai-tutor')
        }
      });
    }

    // Rule 3: Verbal Communication & Interview Readiness
    if (solvedCount >= 1 || assessmentsCount >= 1) {
      list.push({
        id: 'interview_articulation',
        badge: 'Communication Drill',
        badgeColor: 'text-purple-400 bg-purple-400/10 border-purple-400/30',
        icon: Video,
        title: "Good problem solving! Time to practice explaining your logic 🎤",
        description: "Top tech companies evaluate how clearly you explain your thought process. Try a 5-minute AI proctored interview to build speaking confidence.",
        primaryAction: {
          label: 'Start AI Mock Interview',
          icon: Video,
          onClick: () => navigateTo('/interview')
        },
        secondaryAction: {
          label: 'Check Readiness Radar',
          icon: Zap,
          onClick: () => navigateTo('/job-readiness')
        }
      });
    }

    // Rule 4: Custom Career Milestone (Always available baseline)
    list.push({
      id: 'career_focus',
      badge: 'Personalized AI Coach',
      badgeColor: 'text-cyan-400 bg-cyan-400/10 border-cyan-400/30',
      icon: Sparkles,
      title: userGoals ? `Targeting: ${userGoals} 🎯` : "Today's Optimal Study Flow 🚀",
      description: userInterests 
        ? `Based on your focus in ${userInterests}, we recommend completing 1 algorithmic exercise and reviewing your daily milestones in Study Plan.`
        : "Keep your daily streak alive! Solve 1 quick practice problem or generate an AI-optimized schedule in your Study Plan.",
      primaryAction: {
        label: 'Open Study Schedule',
        icon: CheckCircle2,
        onClick: () => navigateTo('/study-plan')
      },
      secondaryAction: {
        label: 'Chat with AI Mentor',
        icon: Sparkles,
        onClick: () => navigateTo('/ai-tutor')
      }
    });

    return list;
  };

  const recommendations = generateRecommendations();
  const currentRec = recommendations[adviceIndex % recommendations.length];
  const IconComponent = currentRec.icon;

  // 5-Min Chill Timer Countdown effect
  useEffect(() => {
    let interval = null;
    if (isBreakRunning && breakSecondsLeft > 0) {
      interval = setInterval(() => {
        setBreakSecondsLeft(prev => prev - 1);
      }, 1000);
    } else if (breakSecondsLeft === 0) {
      setIsBreakRunning(false);
    }
    return () => clearInterval(interval);
  }, [isBreakRunning, breakSecondsLeft]);

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleNextAdvice = () => {
    setAdviceIndex(prev => (prev + 1) % recommendations.length);
  };

  return (
    <>
      <div 
        className={`p-5 sm:p-6 rounded-3xl border transition-all relative overflow-hidden doap-card ${className}`}
        style={{
          borderColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
          background: isDarkMode 
            ? 'linear-gradient(135deg, rgba(20,20,20,0.9) 0%, rgba(10,10,10,0.95) 100%)' 
            : 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(245,245,245,0.95) 100%)'
        }}
      >
        {/* Subtle Ambient Background Glow */}
        <div 
          className="absolute -right-10 -bottom-10 w-48 h-48 rounded-full blur-[80px] pointer-events-none opacity-20"
          style={{ backgroundColor: accentHex }}
        />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-5">
          {/* Left Column: AI Recommendation Details */}
          <div className="space-y-2.5 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase border flex items-center gap-1.5 ${currentRec.badgeColor}`}>
                <Sparkles size={11} />
                <span>{currentRec.badge}</span>
              </span>

              <span className="text-[10px] font-mono text-neutral-400">
                • AI Recommendation {adviceIndex + 1} of {recommendations.length}
              </span>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center gap-3">
                <div 
                  className="w-9 h-9 rounded-2xl flex items-center justify-center shrink-0 border shadow-xs"
                  style={{ 
                    backgroundColor: isDarkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)',
                    borderColor: isDarkMode ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.1)',
                    color: accentHex 
                  }}
                >
                  <IconComponent size={18} />
                </div>
                <h3 className={`text-base sm:text-lg font-bold tracking-tight leading-snug ${
                  isDarkMode ? 'text-white' : 'text-neutral-900'
                }`}>
                  {currentRec.title}
                </h3>
              </div>
              <p className={`text-xs sm:text-sm leading-relaxed pl-12 ${
                isDarkMode ? 'text-neutral-300' : 'text-neutral-600'
              }`}>
                {currentRec.description}
              </p>
            </div>
          </div>

          {/* Right Column: Interactive Quick Action Buttons */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5 shrink-0">
            {currentRec.primaryAction && (
              <button
                onClick={currentRec.primaryAction.onClick}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer hover:opacity-90"
                style={{ backgroundColor: accentHex, color: 'var(--doap-bg, #000000)' }}
              >
                <currentRec.primaryAction.icon size={14} />
                <span>{currentRec.primaryAction.label}</span>
              </button>
            )}

            {currentRec.secondaryAction && (
              <button
                onClick={currentRec.secondaryAction.onClick}
                className={`w-full sm:w-auto px-3.5 py-2.5 rounded-xl font-semibold text-xs border transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${
                  isDarkMode 
                    ? 'bg-neutral-900/80 border-neutral-700 text-neutral-200 hover:text-white hover:bg-neutral-800' 
                    : 'bg-white border-neutral-300 text-neutral-800 hover:bg-neutral-100'
                }`}
              >
                <currentRec.secondaryAction.icon size={13} />
                <span>{currentRec.secondaryAction.label}</span>
              </button>
            )}

            {/* Cycle to Next Advice Button */}
            <button
              onClick={handleNextAdvice}
              className={`p-2.5 rounded-xl border transition-colors cursor-pointer shrink-0 ${
                isDarkMode 
                  ? 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700' 
                  : 'bg-neutral-100 border-neutral-300 text-neutral-600 hover:text-black'
              }`}
              title="Give me another recommendation"
            >
              <RefreshCw size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* 5-Min Ambient Chill / Pomodoro Break Modal */}
      {isBreakModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in select-none">
          <div className={`rounded-3xl max-w-md w-full p-6 sm:p-8 text-center space-y-6 shadow-2xl border relative ${
            isDarkMode ? 'bg-[#0e0e0e] border-neutral-800 text-white' : 'bg-white border-neutral-200 text-black'
          }`}>
            <button
              onClick={() => {
                setIsBreakRunning(false);
                setIsBreakModalOpen(false);
              }}
              className="absolute top-4 right-4 p-2 rounded-full text-neutral-400 hover:text-white transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>

            <div className="w-16 h-16 rounded-full mx-auto flex items-center justify-center shadow-lg animate-pulse"
              style={{ backgroundColor: `${accentHex}20`, color: accentHex }}
            >
              <Coffee size={32} />
            </div>

            <div className="space-y-2">
              <span className="px-3 py-1 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider bg-amber-400/10 text-amber-400 border border-amber-400/20">
                Cognitive Refresh Mode
              </span>
              <h3 className="text-2xl font-black tracking-tight">Time to Recharge 🌿</h3>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed max-w-sm mx-auto">
                Step away from your screen, drink a glass of water, and let your brain process everything you just learned.
              </p>
            </div>

            {/* Glowing Digital Timer Display */}
            <div className={`py-6 px-8 rounded-2xl border font-mono ${
              isDarkMode ? 'bg-neutral-900/80 border-neutral-800' : 'bg-neutral-100 border-neutral-200'
            }`}>
              <div className="text-5xl sm:text-6xl font-black tracking-tight" style={{ color: accentHex }}>
                {formatTime(breakSecondsLeft)}
              </div>
              <p className="text-[11px] uppercase tracking-widest text-neutral-500 mt-2">
                {breakSecondsLeft === 0 ? "Break finished! Ready to resume?" : (isBreakRunning ? "Break in progress..." : "Timer paused")}
              </p>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setIsBreakRunning(!isBreakRunning)}
                className="px-6 py-2.5 rounded-xl font-bold text-xs shadow-md transition-all flex items-center gap-2 cursor-pointer"
                style={{ backgroundColor: accentHex, color: 'var(--doap-bg, #000000)' }}
              >
                {isBreakRunning ? <Pause size={15} /> : <Play size={15} />}
                <span>{isBreakRunning ? 'Pause' : 'Resume Timer'}</span>
              </button>

              <button
                onClick={() => {
                  setBreakSecondsLeft(300);
                  setIsBreakRunning(true);
                }}
                className={`p-2.5 rounded-xl border transition-colors cursor-pointer ${
                  isDarkMode ? 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white' : 'bg-neutral-100 border-neutral-300 text-neutral-600 hover:text-black'
                }`}
                title="Reset to 5 mins"
              >
                <RotateCcw size={15} />
              </button>

              <button
                onClick={() => {
                  setIsBreakRunning(false);
                  setIsBreakModalOpen(false);
                }}
                className={`px-4 py-2.5 rounded-xl font-semibold text-xs border transition-colors cursor-pointer ${
                  isDarkMode ? 'bg-neutral-900 border-neutral-800 text-neutral-300 hover:text-white' : 'bg-neutral-100 border-neutral-300 text-neutral-700 hover:text-black'
                }`}
              >
                Finish & Back to Study
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
