import React from 'react';
import { useAITutor } from '../../context/AITutorContext';
import { useTheme } from '../../context/ThemeContext';
import { Sparkles, CheckCircle2, ArrowRight, X, Bot } from 'lucide-react';

export const AITutorBackgroundNotification = () => {
  const { isThinking, activePrompt, hasUnreadResponse, lastFinishedPrompt, clearUnread } = useAITutor();
  const { currentPath, navigateTo, isDarkMode } = useTheme();

  // If user is already on /ai-tutor, do not show floating notification
  if (currentPath === '/ai-tutor') return null;

  // 1. AI is actively thinking/generating in background while user is on another page
  if (isThinking) {
    return (
      <div 
        onClick={() => navigateTo('/ai-tutor')}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-2.5 rounded-2xl border shadow-2xl backdrop-blur-xl cursor-pointer hover:scale-105 transition-all animate-bounce"
        style={{
          backgroundColor: isDarkMode ? 'rgba(15, 23, 42, 0.92)' : 'rgba(255, 255, 255, 0.95)',
          borderColor: 'rgba(6, 182, 212, 0.5)',
          boxShadow: '0 10px 30px -5px rgba(6, 182, 212, 0.3)'
        }}
        title="DOAP AI is working on your task in background! Click to view."
      >
        <div className="relative flex items-center justify-center">
          <Bot size={18} className="text-cyan-400 animate-pulse" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-cyan-400 rounded-full animate-ping" />
        </div>
        <div className="text-xs">
          <div className="font-bold text-cyan-400 flex items-center gap-1.5 font-mono">
            <span>DOAP AI Generating in Background...</span>
          </div>
          <div className="text-neutral-400 truncate max-w-[220px]">
            "{activePrompt || 'Processing task...'}"
          </div>
        </div>
        <div className="pl-1 text-cyan-400">
          <ArrowRight size={14} className="animate-pulse" />
        </div>
      </div>
    );
  }

  // 2. AI has completed response while user was on another page
  if (hasUnreadResponse) {
    return (
      <div 
        className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-2xl border shadow-2xl backdrop-blur-xl transition-all animate-fade-in"
        style={{
          backgroundColor: isDarkMode ? 'rgba(6, 78, 59, 0.95)' : 'rgba(236, 253, 245, 0.98)',
          borderColor: 'rgba(16, 185, 129, 0.6)',
          boxShadow: '0 10px 30px -5px rgba(16, 185, 129, 0.35)'
        }}
      >
        <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 shrink-0">
          <CheckCircle2 size={18} />
        </div>
        <div className="text-xs space-y-0.5">
          <div className="font-bold text-emerald-300 flex items-center gap-1">
            <span>AI Response Ready!</span>
          </div>
          <div className="text-emerald-100/80 truncate max-w-[200px]">
            "{lastFinishedPrompt || 'Task complete'}"
          </div>
        </div>
        <div className="flex items-center gap-2 pl-2">
          <button
            type="button"
            onClick={() => {
              clearUnread();
              navigateTo('/ai-tutor');
            }}
            className="px-3 py-1.5 rounded-xl bg-emerald-400 text-black font-bold text-xs hover:bg-emerald-300 transition-colors cursor-pointer flex items-center gap-1 shadow-md"
          >
            <span>View</span>
            <ArrowRight size={12} />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              clearUnread();
            }}
            className="p-1 rounded-lg text-emerald-300 hover:text-white hover:bg-emerald-800/40 transition-colors cursor-pointer"
            title="Dismiss notification"
          >
            <X size={14} />
          </button>
        </div>
      </div>
    );
  }

  return null;
};
