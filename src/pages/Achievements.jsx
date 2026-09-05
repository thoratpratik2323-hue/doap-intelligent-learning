import React from 'react';
import { CheckCircle2, Trophy, Sparkles, Award } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

export const Achievements = () => {
  const { isDarkMode, activeAccentHex } = useTheme();
  const { userProgress, profile } = useAuth();
  const accentHex = activeAccentHex || 'var(--doap-accent, #ffffff)';

  const solvedCount = (userProgress?.solvedProblems || []).length;
  const assessments = userProgress?.assessments || [];
  const assessmentCount = assessments.length;
  const dayStreak = profile?.stats?.dayStreak || 1;
  const coursesCompleted = Object.values(userProgress?.courses || {}).reduce((acc, mods) => acc + (mods?.length || 0), 0);
  const tasksCompleted = (userProgress?.tasks || []).filter(t => t.completed).length;

  const maxScore = assessments.reduce((max, a) => Math.max(max, a.scoreNum || parseInt(a.score) || 0), 0);

  const ACHIEVEMENTS_LIST = [
    {
      id: 1,
      title: "First Assessment",
      description: "Complete your first live technical test or AI assessment",
      rarity: "Common",
      earned: assessmentCount >= 1,
      current: Math.min(1, assessmentCount),
      total: 1,
      date: assessmentCount >= 1 ? "Unlocked" : "",
      icon: "🏆"
    },
    {
      id: 2,
      title: "7-Day Learning Streak",
      description: "Maintain an active daily learning streak for 7 consecutive days",
      rarity: "Uncommon",
      earned: dayStreak >= 7,
      current: Math.min(7, dayStreak),
      total: 7,
      date: dayStreak >= 7 ? "Unlocked" : "",
      icon: "🔥"
    },
    {
      id: 3,
      title: "Coding Explorer",
      description: "Solve algorithmic challenges in the Coding Sandbox",
      rarity: "Rare",
      earned: solvedCount >= 5,
      current: Math.min(5, solvedCount),
      total: 5,
      date: solvedCount >= 5 ? "Unlocked" : "",
      icon: "💻"
    },
    {
      id: 4,
      title: "First Algorithm Solved",
      description: "Successfully pass all automated test cases for a coding problem",
      rarity: "Common",
      earned: solvedCount >= 1,
      current: Math.min(1, solvedCount),
      total: 1,
      date: solvedCount >= 1 ? "Unlocked" : "",
      icon: "⚡"
    },
    {
      id: 5,
      title: "Interview Ready",
      description: "Simulate and record 3 AI technical mock interview sessions",
      rarity: "Rare",
      earned: assessmentCount >= 3,
      current: Math.min(3, assessmentCount),
      total: 3,
      date: assessmentCount >= 3 ? "Unlocked" : "",
      icon: "🎯"
    },
    {
      id: 6,
      title: "Fast Learner",
      description: "Complete study plan modules and engineering tasks",
      rarity: "Common",
      earned: tasksCompleted >= 1 || coursesCompleted >= 1,
      current: Math.min(2, tasksCompleted + coursesCompleted),
      total: 2,
      date: (tasksCompleted >= 1 || coursesCompleted >= 1) ? "Unlocked" : "",
      icon: "🚀"
    },
    {
      id: 7,
      title: "Elite SDE Candidate",
      description: "Score 75% or higher on a verified coding benchmark test",
      rarity: "Legendary",
      earned: maxScore >= 75,
      current: maxScore >= 75 ? 1 : 0,
      total: 1,
      date: maxScore >= 75 ? "Unlocked" : "",
      icon: "👑"
    },
    {
      id: 8,
      title: "System Architect",
      description: "Complete 4 or more specialized engineering curriculum modules",
      rarity: "Epic",
      earned: coursesCompleted >= 4,
      current: Math.min(4, coursesCompleted),
      total: 4,
      date: coursesCompleted >= 4 ? "Unlocked" : "",
      icon: "🏛️"
    },
    {
      id: 9,
      title: "Voice Intelligence Pioneer",
      description: "Interact with the DOAP Voice Tutor real-time conversational agent",
      rarity: "Common",
      earned: true,
      current: 1,
      total: 1,
      date: "Unlocked",
      icon: "🎙️"
    }
  ];

  const earnedCount = ACHIEVEMENTS_LIST.filter(a => a.earned).length;
  const totalCount = ACHIEVEMENTS_LIST.length;
  const overallProgress = Math.round((earnedCount / totalCount) * 100);

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 md:py-8 space-y-8 animate-fade-in select-none">
      {/* Header & Overall Earned Counter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className={`text-3xl font-bold tracking-tight ${
            isDarkMode ? 'text-white' : 'text-[#0a0a0a]'
          }`}>Achievements</h1>
          <p className={`text-xs font-mono uppercase tracking-wider ${
            isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
          }`}>Milestones and verified engineering badges earned on DOAP</p>
        </div>

        <div className="text-right space-y-1">
          <div className="text-2xl font-black font-mono">
            {earnedCount} <span className="text-neutral-500 font-normal text-lg">/ {totalCount}</span>
          </div>
          <p className={`text-xs font-mono uppercase ${isDarkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>EARNED</p>
        </div>
      </div>

      {/* Main Overall Progress Bar */}
      <div className={`w-full h-2.5 rounded-full overflow-hidden border ${
        isDarkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-neutral-100 border-neutral-200'
      }`}>
        <div 
          className="h-full rounded-full transition-all duration-700 bg-gradient-to-r from-cyan-500 via-teal-500 to-emerald-500" 
          style={{ width: `${overallProgress}%` }} 
        />
      </div>

      {/* Dynamic Achievement Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {ACHIEVEMENTS_LIST.map((ach) => {
          const pct = ach.total > 0 ? Math.min(100, Math.round((ach.current / ach.total) * 100)) : 0;
          return (
            <div
              key={ach.id}
              className={`
                p-5 rounded-3xl space-y-4 flex flex-col justify-between transition-all border
                ${isDarkMode 
                  ? 'bg-[#111111] border-neutral-800 text-white hover:border-neutral-700' 
                  : 'bg-white border-neutral-200 text-black hover:border-neutral-300'
                }
                ${!ach.earned ? 'opacity-65' : 'shadow-md shadow-cyan-500/5'}
              `}
            >
              {/* Top row */}
              <div className="flex items-start justify-between">
                <span className="text-3xl">{ach.icon}</span>
                <span className={`px-2.5 py-0.5 rounded text-[10px] font-mono uppercase border ${
                  ach.rarity === 'Legendary' 
                    ? 'bg-amber-500/10 border-amber-500/30 text-amber-400 font-bold'
                    : ach.rarity === 'Epic'
                    ? 'bg-purple-500/10 border-purple-500/30 text-purple-400 font-bold'
                    : ach.rarity === 'Rare'
                    ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400 font-bold'
                    : isDarkMode ? 'bg-neutral-900 border-neutral-800 text-neutral-300' : 'bg-neutral-100 border-neutral-200 text-neutral-700'
                }`}>
                  {ach.rarity}
                </span>
              </div>

              {/* Title & Description */}
              <div className="space-y-1">
                <h3 className="text-base font-bold flex items-center gap-2">
                  <span>{ach.title}</span>
                  {ach.earned && (
                    <Sparkles size={14} className="text-amber-400 shrink-0" />
                  )}
                </h3>
                <p className={`text-xs font-medium leading-relaxed ${
                  isDarkMode ? 'text-neutral-400' : 'text-neutral-600'
                }`}>
                  {ach.description}
                </p>
              </div>

              {/* Bottom Status */}
              <div className={`pt-2 border-t ${
                isDarkMode ? 'border-neutral-800' : 'border-neutral-200'
              }`}>
                {ach.earned ? (
                  <div className={`flex items-center justify-between text-xs font-mono ${
                    isDarkMode ? 'text-emerald-400' : 'text-emerald-600'
                  }`}>
                    <span className="font-bold">UNLOCKED</span>
                    <CheckCircle2 size={16} className="text-emerald-400" />
                  </div>
                ) : (
                  <div className="space-y-1.5">
                    <div className={`flex justify-between items-center text-xs font-mono ${
                      isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
                    }`}>
                      <span>PROGRESS</span>
                      <span>{ach.current} / {ach.total}</span>
                    </div>
                    <div className={`w-full h-1.5 rounded-full overflow-hidden ${
                      isDarkMode ? 'bg-neutral-800' : 'bg-neutral-100'
                    }`}>
                      <div 
                        className="h-full rounded-full bg-cyan-500 transition-all duration-300" 
                        style={{ width: `${pct}%` }} 
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
