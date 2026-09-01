import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { ACHIEVEMENTS_DATA } from '../data/mockData';
import { useTheme } from '../context/ThemeContext';

export const Achievements = () => {
  const { isDarkMode } = useTheme();

  const earnedCount = ACHIEVEMENTS_DATA.filter(a => a.earned).length;
  const totalCount = ACHIEVEMENTS_DATA.length;
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
          }`}>Milestones and skill achievements earned on DOAP</p>
        </div>

        <div className="text-right space-y-1">
          <div className="text-2xl font-black font-mono">
            {earnedCount} <span className="text-neutral-500 font-normal text-lg">/ {totalCount}</span>
          </div>
          <p className={`text-xs font-mono uppercase ${isDarkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>EARNED</p>
        </div>
      </div>

      {/* Main Overall Progress Bar */}
      <div className={`w-full h-2 rounded-full overflow-hidden ${
        isDarkMode ? 'bg-neutral-800' : 'bg-neutral-200'
      }`}>
        <div 
          className={`h-full rounded-full transition-all duration-500 ${
            isDarkMode ? 'bg-white' : 'bg-black'
          }`} 
          style={{ width: `${overallProgress}%` }} 
        />
      </div>

      {/* 12 Achievement Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {ACHIEVEMENTS_DATA.map((ach) => (
          <div
            key={ach.id}
            className={`
              p-5 rounded-3xl space-y-4 flex flex-col justify-between transition-all border
              ${isDarkMode 
                ? 'bg-[#111111] border-neutral-800 text-white hover:border-neutral-700' 
                : 'bg-white border-neutral-200 text-black hover:border-neutral-300'
              }
              ${!ach.earned ? 'opacity-60' : ''}
            `}
          >
            {/* Top row */}
            <div className="flex items-start justify-between">
              <span className="text-3xl">{ach.icon}</span>
              <span className={`px-2.5 py-0.5 rounded text-[10px] font-mono uppercase border ${
                isDarkMode ? 'bg-neutral-900 border-neutral-800 text-neutral-300' : 'bg-neutral-100 border-neutral-200 text-neutral-700'
              }`}>
                {ach.rarity}
              </span>
            </div>

            {/* Title & Description */}
            <div className="space-y-1">
              <h3 className="text-base font-bold">{ach.title}</h3>
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
                  isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
                }`}>
                  <span>{ach.date}</span>
                  <CheckCircle2 size={16} className={isDarkMode ? "text-white" : "text-black"} />
                </div>
              ) : (
                <div className="space-y-1.5">
                  <div className={`flex justify-between items-center text-xs font-mono ${
                    isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
                  }`}>
                    <span>PROGRESS</span>
                    <span>{ach.progress}</span>
                  </div>
                  <div className={`w-full h-1.5 rounded-full overflow-hidden ${
                    isDarkMode ? 'bg-neutral-800' : 'bg-neutral-100'
                  }`}>
                    <div 
                      className={`h-full rounded-full ${isDarkMode ? 'bg-white' : 'bg-black'}`} 
                      style={{ width: `${Math.round((ach.current / ach.total) * 100)}%` }} 
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
