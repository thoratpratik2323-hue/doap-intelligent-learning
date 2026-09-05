import React, { useState } from 'react';
import { MessageSquare, BookOpen, Code, Video, BarChart2, ArrowRight, Mic, X, Sparkles, Brain } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const Home = () => {
  const { navigateTo, isDarkMode } = useTheme();
  const [isTutorModalOpen, setIsTutorModalOpen] = useState(false);

  const actions = [
    {
      title: "Ask DOAP",
      desc: "Chat with your AI mentor & solve coding doubts",
      icon: MessageSquare,
      path: "/ai-tutor"
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 md:py-12 space-y-12 animate-fade-in select-none">
      {/* Hero Header */}
      <div className="text-center space-y-3">
        <h1 className={`text-6xl md:text-8xl font-black tracking-tighter ${
          isDarkMode ? 'text-white' : 'text-[#0a0a0a]'
        }`}>
          DOAP
        </h1>
        <p className={`text-xs sm:text-sm font-mono tracking-widest uppercase font-semibold ${
          isDarkMode ? 'text-cyan-400' : 'text-cyan-600'
        }`}>
          Discover Opportunities and Progress Platform
        </p>
        <h2 className={`text-2xl md:text-3xl font-semibold tracking-tight ${
          isDarkMode ? 'text-neutral-300' : 'text-neutral-700'
        }`}>
          Back again? Good.
        </h2>
        <p className={`font-normal text-sm ${
          isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
        }`}>
          What do you want to work on today?
        </p>
      </div>

      {/* Top 2 Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-2xl mx-auto">
        {/* Continue Learning Card */}
        <div className={`p-6 rounded-3xl border space-y-4 flex flex-col justify-between transition-colors doap-card ${
          isDarkMode ? 'bg-[#111111] border-neutral-800 text-white' : 'bg-white border-neutral-200 text-black shadow-sm'
        }`}>
          <div className="space-y-2">
            <span className={`text-[11px] font-mono uppercase tracking-widest block ${
              isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
            }`}>
              CONTINUE
            </span>
            <h3 className="text-xl font-bold">
              Data Structures
            </h3>
            <p className={`text-xs font-medium ${isDarkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>
              Binary Search Trees
            </p>
          </div>

          <div className="space-y-4 pt-2">
            <div className="flex items-center gap-3">
              <div className={`flex-1 h-2 rounded-full overflow-hidden ${
                isDarkMode ? 'bg-neutral-800' : 'bg-neutral-100'
              }`}>
                <div className={`h-full rounded-full w-[72%] ${
                  isDarkMode ? 'bg-white' : 'bg-black'
                }`} />
              </div>
              <span className="text-xs font-mono font-bold">72%</span>
            </div>

            <button 
              onClick={() => navigateTo('/learning')}
              className={`font-semibold text-xs flex items-center gap-1.5 transition-colors cursor-pointer ${
                isDarkMode ? 'text-white hover:underline' : 'text-black hover:underline'
              }`}
            >
              <span>Continue</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>

        {/* Today's Focus Card */}
        <div className={`p-6 rounded-3xl border space-y-4 flex flex-col justify-between transition-colors doap-card ${
          isDarkMode ? 'bg-[#111111] border-neutral-800 text-white' : 'bg-white border-neutral-200 text-black shadow-sm'
        }`}>
          <div className="space-y-2">
            <span className={`text-[11px] font-mono uppercase tracking-widest block ${
              isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
            }`}>
              TODAY'S FOCUS
            </span>
            <h3 className="text-xl font-bold">
              Prompt Engineering
            </h3>
            <p className={`text-xs font-medium leading-relaxed ${
              isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
            }`}>
              Improving prompt structure boosts your AI effectiveness.
            </p>
          </div>

          <div className="space-y-4 pt-2">
            <div>
              <span className={`inline-block px-3 py-1 text-xs font-mono rounded-full border ${
                isDarkMode ? 'bg-neutral-900 border-neutral-800 text-neutral-300' : 'bg-neutral-100 border-neutral-200 text-neutral-700'
              }`}>
                Est. 20 min
              </span>
            </div>

            <button 
              onClick={() => navigateTo('/learning')}
              className={`font-semibold text-xs flex items-center gap-1.5 transition-colors cursor-pointer ${
                isDarkMode ? 'text-white hover:underline' : 'text-black hover:underline'
              }`}
            >
              <span>Start</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Action Card (Ask DOAP below cards) */}
      <div className="space-y-3 max-w-2xl mx-auto pt-2">
        {actions.map((act, index) => {
          const Icon = act.icon;
          return (
            <button
              key={index}
              onClick={() => setIsTutorModalOpen(true)}
              className={`w-full p-4.5 rounded-full flex items-center justify-between transition-all border cursor-pointer group doap-card ${
                isDarkMode 
                  ? 'bg-[#111111] border-neutral-800 text-white hover:bg-neutral-900 hover:border-neutral-700' 
                  : 'bg-white border-neutral-200 text-black hover:bg-neutral-50 hover:border-neutral-300 shadow-sm'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                  isDarkMode ? 'bg-neutral-800 text-white' : 'bg-neutral-100 text-black'
                }`}>
                  <Icon size={18} />
                </div>
                <div className="text-left">
                  <h3 className="font-bold text-base leading-snug flex items-center gap-2">
                    <span>{act.title}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-medium">
                      Text & Voice
                    </span>
                  </h3>
                  <p className={`text-xs font-normal ${
                    isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
                  }`}>
                    {act.desc}
                  </p>
                </div>
              </div>

              <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors mr-1 ${
                isDarkMode ? 'text-neutral-400 group-hover:text-white' : 'text-neutral-500 group-hover:text-black'
              }`}>
                <ArrowRight size={18} />
              </div>
            </button>
          );
        })}
      </div>

      {/* Choose DOAP Tutor Mode Modal (Text vs Voice) */}
      {isTutorModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in"
          onClick={() => setIsTutorModalOpen(false)}
        >
          <div 
            className={`relative w-full max-w-lg rounded-3xl border p-6 sm:p-7 shadow-2xl transition-all animate-scale-in space-y-6 ${
              isDarkMode ? 'bg-[#121215] border-neutral-800 text-white' : 'bg-white border-neutral-200 text-black'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setIsTutorModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full text-neutral-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              title="Close"
            >
              <X size={18} />
            </button>

            {/* Modal Header */}
            <div className="space-y-1.5 pr-8">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-cyan-400">
                  Ask DOAP • Choose AI Mentor
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black tracking-tight">
                How would you like to learn today?
              </h3>
              <p className={`text-xs sm:text-sm ${isDarkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>
                Select your preferred mode. Both Text and Voice share the exact same 8-layer memory brain.
              </p>
            </div>

            {/* 2 Options Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {/* Option 1: Text AI Tutor */}
              <button
                onClick={() => {
                  setIsTutorModalOpen(false);
                  navigateTo('/ai-tutor');
                }}
                className={`p-5 rounded-2xl border text-left flex flex-col justify-between transition-all duration-200 cursor-pointer group hover:scale-[1.02] ${
                  isDarkMode 
                    ? 'bg-[#18181c] border-neutral-800 hover:border-indigo-500/60 hover:bg-indigo-950/25' 
                    : 'bg-neutral-50 border-neutral-200 hover:border-indigo-500/60 hover:bg-indigo-50/50 shadow-xs'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center">
                      <MessageSquare size={20} />
                    </div>
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-indigo-500/15 text-indigo-400 border border-indigo-500/30">
                      Self-Thinking
                    </span>
                  </div>

                  <div>
                    <h4 className="font-bold text-base group-hover:text-indigo-400 transition-colors">
                      Text AI Tutor
                    </h4>
                    <p className={`text-xs mt-1 leading-relaxed ${isDarkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>
                      Deep cognitive reasoning with &lt;think&gt; trace, flash quizzes, syntax-highlighted code & Flux AI art.
                    </p>
                  </div>
                </div>

                <div className="pt-4 flex items-center gap-1.5 text-xs font-bold text-indigo-400 group-hover:translate-x-1 transition-transform">
                  <span>Open Text Chat</span>
                  <ArrowRight size={13} />
                </div>
              </button>

              {/* Option 2: Voice AI Tutor */}
              <button
                onClick={() => {
                  setIsTutorModalOpen(false);
                  navigateTo('/voice-tutor');
                }}
                className={`p-5 rounded-2xl border text-left flex flex-col justify-between transition-all duration-200 cursor-pointer group hover:scale-[1.02] ${
                  isDarkMode 
                    ? 'bg-[#18181c] border-neutral-800 hover:border-emerald-500/60 hover:bg-emerald-950/25' 
                    : 'bg-neutral-50 border-neutral-200 hover:border-emerald-500/60 hover:bg-emerald-50/50 shadow-xs'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
                      <Mic size={20} />
                    </div>
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                      Zero Latency
                    </span>
                  </div>

                  <div>
                    <h4 className="font-bold text-base group-hover:text-emerald-400 transition-colors">
                      Voice AI Tutor
                    </h4>
                    <p className={`text-xs mt-1 leading-relaxed ${isDarkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>
                      Hands-free real-time audio dialogue with Charon studio voice and live Arc-Reactor HUD.
                    </p>
                  </div>
                </div>

                <div className="pt-4 flex items-center gap-1.5 text-xs font-bold text-emerald-400 group-hover:translate-x-1 transition-transform">
                  <span>Start Voice Call</span>
                  <ArrowRight size={13} />
                </div>
              </button>
            </div>

            {/* Footer info */}
            <div className={`pt-2 border-t flex items-center justify-between text-[11px] font-mono ${
              isDarkMode ? 'border-neutral-800/80 text-neutral-500' : 'border-neutral-200 text-neutral-400'
            }`}>
              <span>⚡ Switch anytime</span>
              <span>Unified 8-Layer Brain</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
