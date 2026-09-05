import React, { useState } from 'react';
import { 
  MessageSquare, 
  BookOpen, 
  Code, 
  Video, 
  BarChart2, 
  ArrowRight, 
  Mic, 
  X, 
  Sparkles, 
  Brain,
  Flame,
  CheckCircle2,
  AlertCircle,
  Check,
  RotateCcw
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { memoryBrain } from '../services/memoryBrain';

const DAILY_CHALLENGES = [
  {
    id: 1,
    topic: "Algorithms & Complexity",
    question: "What is the amortized time complexity of appending an element to a dynamic array (like std::vector or Python list)?",
    options: ["O(N)", "O(1) amortized", "O(log N)", "O(N²)"],
    correctIdx: 1,
    explanation: "While doubling capacity takes O(N), geometric resizing means across N insertions, total cost is ~2N, yielding O(1) amortized time."
  },
  {
    id: 2,
    topic: "Heap Data Structures",
    question: "In a min-heap with N elements, what is the worst-case time complexity of extracting the minimum root element?",
    options: ["O(1)", "O(log N)", "O(N)", "O(N log N)"],
    correctIdx: 1,
    explanation: "After removing the root element, bubbling down (sift-down) takes at most the tree height: O(log N)."
  },
  {
    id: 3,
    topic: "Web Architecture & Protocols",
    question: "Which HTTP header is strictly mandatory in every HTTP/1.1 request?",
    options: ["Host", "Content-Type", "Authorization", "User-Agent"],
    correctIdx: 0,
    explanation: "HTTP/1.1 requires the 'Host' header to distinguish multiple domain names hosted on a single IP address (virtual hosting)."
  },
  {
    id: 4,
    topic: "React Internals",
    question: "Why should React state never be mutated directly (e.g., state.items.push(x))?",
    options: ["It causes an instant SyntaxError", "React relies on shallow object reference equality to detect changes and trigger re-renders", "It deletes child component props", "It blocks JavaScript thread execution"],
    correctIdx: 1,
    explanation: "Direct mutation keeps the same object reference, so React's shallow comparison concludes nothing changed and skips re-rendering."
  },
  {
    id: 5,
    topic: "Graph Algorithms",
    question: "In a simple undirected graph with V vertices, what is the maximum possible number of edges?",
    options: ["V * (V - 1) / 2", "V²", "2^V", "V * (V + 1) / 2"],
    correctIdx: 0,
    explanation: "Each vertex can connect to V-1 other vertices. Dividing by 2 accounts for undirected bidirectionality: V*(V-1)/2."
  }
];

export const Home = () => {
  const { navigateTo, isDarkMode } = useTheme();
  const [isTutorModalOpen, setIsTutorModalOpen] = useState(false);

  // Streak & Daily Challenge State
  const [streakCount, setStreakCount] = useState(() => {
    try {
      const saved = localStorage.getItem('doap_streak_count');
      return saved ? parseInt(saved, 10) : 3;
    } catch {
      return 3;
    }
  });

  const todayDateStr = new Date().toISOString().split('T')[0];
  const [isCompletedToday, setIsCompletedToday] = useState(() => {
    try {
      return localStorage.getItem('doap_last_streak_date') === todayDateStr;
    } catch {
      return false;
    }
  });

  // Pick challenge based on day of year
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
  const dailyChallenge = DAILY_CHALLENGES[dayOfYear % DAILY_CHALLENGES.length];

  const [selectedOption, setSelectedOption] = useState(null);
  const [feedbackState, setFeedbackState] = useState(null); // 'correct' | 'incorrect' | null

  const handleSelectOption = (idx) => {
    if (isCompletedToday) return;
    setSelectedOption(idx);
    if (idx === dailyChallenge.correctIdx) {
      setFeedbackState('correct');
      const newStreak = isCompletedToday ? streakCount : streakCount + 1;
      setStreakCount(newStreak);
      setIsCompletedToday(true);
      try {
        localStorage.setItem('doap_streak_count', String(newStreak));
        localStorage.setItem('doap_last_streak_date', todayDateStr);
      } catch(e) {}

      // Update memoryBrain
      memoryBrain.updateKnowledge(dailyChallenge.topic, 'mastered');
      memoryBrain.recordEpisodic(
        `Daily Challenge Solved: ${dailyChallenge.topic}`,
        `Maintained ${newStreak}-day DOAP streak! Correctly answered: "${dailyChallenge.question}"`
      );
    } else {
      setFeedbackState('incorrect');
    }
  };

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

        {/* Daily DOAP Streak & Challenge Engine Card */}
        <div className={`p-6 rounded-3xl border space-y-4 flex flex-col justify-between transition-colors doap-card relative overflow-hidden ${
          isDarkMode ? 'bg-[#111111] border-neutral-800 text-white' : 'bg-white border-neutral-200 text-black shadow-sm'
        }`}>
          {/* Top Header & Streak Pill */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className={`text-[11px] font-mono uppercase tracking-widest block font-bold ${
                isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
              }`}>
                DAILY DOAP DRILL
              </span>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 font-mono text-xs font-bold shadow-[0_0_10px_rgba(245,158,11,0.15)]">
                <Flame size={13} className="text-amber-400 animate-pulse" />
                <span>{streakCount} Days Streak</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-cyan-400">
                {dailyChallenge.topic}
              </h3>
            </div>

            <p className={`text-xs font-medium leading-relaxed ${
              isDarkMode ? 'text-neutral-300' : 'text-neutral-700'
            }`}>
              {dailyChallenge.question}
            </p>
          </div>

          {/* Interactive Challenge Body */}
          <div className="space-y-2 pt-1">
            {!isCompletedToday ? (
              <div className="space-y-1.5">
                {dailyChallenge.options.map((opt, idx) => {
                  const isSelected = selectedOption === idx;
                  const isWrong = isSelected && feedbackState === 'incorrect';

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(idx)}
                      className={`w-full text-left p-2.5 rounded-xl border text-xs font-medium transition-all cursor-pointer flex items-center justify-between ${
                        isWrong
                          ? 'bg-rose-950/40 border-rose-500 text-rose-200 animate-shake'
                          : isDarkMode
                          ? 'bg-neutral-900/60 border-neutral-800 hover:border-neutral-700 hover:bg-neutral-800/80 text-neutral-200'
                          : 'bg-neutral-50 border-neutral-200 hover:border-neutral-300 hover:bg-neutral-100 text-neutral-800'
                      }`}
                    >
                      <span>{opt}</span>
                      {isWrong && (
                        <span className="text-[10px] font-mono text-rose-400 font-bold shrink-0 ml-2">Try again</span>
                      )}
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="p-3.5 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 space-y-2 animate-fade-in text-xs">
                <div className="flex items-center gap-2 text-emerald-400 font-bold">
                  <CheckCircle2 size={16} />
                  <span>Streak Maintained! Today's Drill Solved.</span>
                </div>
                <p className="text-[11px] text-neutral-300 leading-relaxed font-mono">
                  {dailyChallenge.explanation}
                </p>
                <div className="pt-1 flex items-center justify-between text-[10px] font-mono text-neutral-400">
                  <span>Next challenge unlocks tomorrow</span>
                  <button
                    onClick={() => navigateTo('/coding')}
                    className="text-cyan-400 hover:underline flex items-center gap-1 cursor-pointer font-bold"
                  >
                    <span>Coding Sandbox</span>
                    <ArrowRight size={11} />
                  </button>
                </div>
              </div>
            )}

            {/* Weekly Streak Mini Dots */}
            <div className="flex items-center justify-between pt-2 border-t border-white/5 text-[10px] font-mono text-neutral-500">
              <span className="font-semibold text-neutral-400">This Week:</span>
              <div className="flex items-center gap-1.5">
                {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => {
                  const isPastOrToday = i <= (new Date().getDay() === 0 ? 6 : new Date().getDay() - 1);
                  return (
                    <span
                      key={i}
                      className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-[9px] ${
                        isPastOrToday
                          ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                          : isDarkMode ? 'bg-neutral-900 text-neutral-600' : 'bg-neutral-100 text-neutral-400'
                      }`}
                      title={`${day}: Active`}
                    >
                      {isPastOrToday ? '✓' : day}
                    </span>
                  );
                })}
              </div>
            </div>
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
