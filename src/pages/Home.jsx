import React from 'react';
import { MessageSquare, BookOpen, Code, Video, BarChart2, ArrowRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const Home = () => {
  const { navigateTo, isDarkMode } = useTheme();

  const actions = [
    {
      title: "Ask DOAP",
      desc: "Chat with your AI tutor",
      icon: MessageSquare,
      path: "/ai-tutor"
    },
    {
      title: "Continue Learning",
      desc: "Pick up where you left off",
      icon: BookOpen,
      path: "/learning"
    },
    {
      title: "Practice Coding",
      desc: "Sharpen your problem solving",
      icon: Code,
      path: "/coding"
    },
    {
      title: "Prepare for Interview",
      desc: "Practice with AI interviewer",
      icon: Video,
      path: "/interview"
    },
    {
      title: "Review Progress",
      desc: "See your analytics",
      icon: BarChart2,
      path: "/dashboard"
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

      {/* Main Action Cards */}
      <div className="space-y-3 max-w-2xl mx-auto">
        {actions.map((act, index) => {
          const Icon = act.icon;
          return (
            <button
              key={index}
              onClick={() => navigateTo(act.path)}
              className={`w-full p-4.5 rounded-full flex items-center justify-between transition-all border cursor-pointer group ${
                isDarkMode 
                  ? 'bg-[#111111] border-neutral-800 text-white hover:bg-neutral-900 hover:border-neutral-700' 
                  : 'bg-white border-neutral-200 text-black hover:bg-neutral-50 hover:border-neutral-300'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                  isDarkMode ? 'bg-neutral-800 text-white' : 'bg-neutral-100 text-black'
                }`}>
                  <Icon size={18} />
                </div>
                <div className="text-left">
                  <h3 className="font-bold text-base leading-snug">
                    {act.title}
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

      {/* Bottom 2 Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-2xl mx-auto pt-2">
        {/* Continue Learning Card */}
        <div className={`p-6 rounded-3xl border space-y-4 flex flex-col justify-between transition-colors ${
          isDarkMode ? 'bg-[#111111] border-neutral-800 text-white' : 'bg-white border-neutral-200 text-black'
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
        <div className={`p-6 rounded-3xl border space-y-4 flex flex-col justify-between transition-colors ${
          isDarkMode ? 'bg-[#111111] border-neutral-800 text-white' : 'bg-white border-neutral-200 text-black'
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
    </div>
  );
};
