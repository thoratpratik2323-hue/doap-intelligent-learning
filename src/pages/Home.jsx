import React, { useState } from 'react';
import { createPortal } from 'react-dom';
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
  RotateCcw,
  Building2
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
        `Maintained ${newStreak}-day Ziv streak! Correctly answered: "${dailyChallenge.question}"`
      );
    } else {
      setFeedbackState('incorrect');
    }
  };

  const actions = [
    {
      title: "Ask Ziv",
      desc: "Chat with your AI mentor & solve coding doubts",
      icon: MessageSquare,
      path: "/ai-tutor"
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 md:py-12 space-y-12 animate-fade-in select-none">
      {/* Hero Header with New Ziv Logo */}
      <div className="text-center space-y-3 flex flex-col items-center">
        <img
          src="/ziv-logo.png"
          alt="Ziv"
          className="h-28 md:h-36 w-auto object-contain drop-shadow-sm mb-1"
        />
        <h1 className={`text-4xl md:text-6xl font-black tracking-tight ${
          isDarkMode ? 'text-white' : 'text-[#0F172A]'
        }`}>
          Ziv
        </h1>
        <p className={`text-xs sm:text-sm font-mono tracking-widest uppercase font-semibold ${
          isDarkMode ? 'text-purple-400' : 'text-purple-600'
        }`}>
          The modern playground for future developers
        </p>
        <h2 className={`text-2xl md:text-3xl font-semibold tracking-tight ${
          isDarkMode ? 'text-neutral-200' : 'text-[#0F172A]'
        }`}>
          Back again? Good.
        </h2>
        <p className={`font-normal text-sm ${
          isDarkMode ? 'text-neutral-400' : 'text-[#475569]'
        }`}>
          What do you want to work on today?
        </p>
      </div>

      {/* Top 2 Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-2xl mx-auto">
        {/* Continue Learning Card */}
        <div className="p-6 rounded-2xl border space-y-4 flex flex-col justify-between transition-colors doap-card"
          style={{
            backgroundColor: isDarkMode ? 'rgba(15, 20, 35, 0.95)' : '#FFFFFF',
            borderColor: isDarkMode ? 'rgba(147, 51, 234, 0.20)' : '#E2E8F0',
            color: isDarkMode ? '#F8FAFC' : '#0F172A',
            boxShadow: isDarkMode ? 'none' : '0 4px 20px rgba(0, 0, 0, 0.05)',
          }}>
          <div className="space-y-2">
            <span className="text-[11px] font-mono uppercase tracking-widest block" style={{ color: isDarkMode ? '#94A3B8' : '#64748B' }}>
              CONTINUE
            </span>
            <h3 className="text-xl font-bold" style={{ color: isDarkMode ? '#F8FAFC' : '#0F172A' }}>
              Data Structures
            </h3>
            <p className="text-xs font-medium" style={{ color: isDarkMode ? '#94A3B8' : '#475569' }}>
              Binary Search Trees
            </p>
          </div>

          <div className="space-y-4 pt-2">
            <div className="flex items-center gap-3">
              <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ backgroundColor: isDarkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)' }}>
                <div className="h-full rounded-full w-[72%]" style={{ backgroundColor: '#9333EA' }} />
              </div>
              <span className="text-xs font-mono font-bold" style={{ color: isDarkMode ? '#F8FAFC' : '#0F172A' }}>72%</span>
            </div>

            <button 
              onClick={() => navigateTo('/learning')}
              className="font-semibold text-xs flex items-center gap-1.5 transition-colors cursor-pointer hover:underline"
              style={{ color: '#9333EA' }}
            >
              <span>Continue</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>

        {/* Daily Ziv Streak & Challenge Engine Card */}
        <div className="p-6 rounded-2xl border space-y-4 flex flex-col justify-between transition-colors doap-card relative overflow-hidden"
          style={{
            backgroundColor: isDarkMode ? 'rgba(15, 20, 35, 0.95)' : '#FFFFFF',
            borderColor: isDarkMode ? 'rgba(147, 51, 234, 0.20)' : '#E2E8F0',
            color: isDarkMode ? '#F8FAFC' : '#0F172A',
            boxShadow: isDarkMode ? 'none' : '0 4px 20px rgba(0, 0, 0, 0.05)',
          }}>
          {/* Top Header & Streak Pill */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase tracking-widest block font-bold" style={{ color: isDarkMode ? '#94A3B8' : '#64748B' }}>
                DAILY ZIV DRILL
              </span>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono font-bold"
                style={{ backgroundColor: 'rgba(255, 158, 125, 0.15)', border: '1px solid rgba(255, 158, 125, 0.35)', color: '#FF9E7D' }}>
                <Flame size={13} style={{ color: '#FF9E7D' }} className="animate-pulse" />
                <span>{streakCount} Days Streak</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold" style={{ color: isDarkMode ? '#F8FAFC' : '#0F172A' }}>
                {dailyChallenge.topic}
              </h3>
            </div>

            <p className="text-xs font-medium leading-relaxed" style={{ color: isDarkMode ? '#94A3B8' : '#334155' }}>
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
                          : 'bg-[#F8FAFC] border-[#E2E8F0] hover:border-[#9333EA]/40 hover:bg-white text-[#0F172A]'
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
                  <span>Drill Completed!</span>
                </div>
                <p className="text-emerald-300/80 leading-relaxed font-normal">
                  {dailyChallenge.explanation}
                </p>
              </div>
            )}

            {/* Weekly Streak Mini Dots */}
            <div className="flex items-center justify-between pt-2 border-t text-[10px] font-mono"
              style={{ borderColor: isDarkMode ? 'rgba(255,255,255,0.05)' : '#E2E8F0', color: isDarkMode ? '#94A3B8' : '#64748B' }}>
              <span className="font-semibold">This Week:</span>
              <div className="flex items-center gap-1.5">
                {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => {
                  const isPastOrToday = i <= (new Date().getDay() === 0 ? 6 : new Date().getDay() - 1);
                  return (
                    <span
                      key={i}
                      className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-[9px] ${
                        isPastOrToday
                          ? 'bg-amber-500/20 text-amber-500 border border-amber-500/30'
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

      {/* Company Prep LeetCode Archive Cross-Link Banner */}
      <div 
        onClick={() => navigateTo('/company-prep')}
        className="p-4 md:p-5 rounded-2xl border transition-all cursor-pointer group flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 max-w-2xl mx-auto shadow-lg hover:scale-[1.01]"
        style={{
          backgroundColor: isDarkMode ? 'rgba(15, 20, 35, 0.95)' : '#FFFFFF',
          borderColor: isDarkMode ? 'rgba(147, 51, 234, 0.25)' : '#E2E8F0',
          boxShadow: isDarkMode ? 'none' : '0 4px 20px rgba(0, 0, 0, 0.05)',
        }}
      >
        <div className="flex items-center gap-3.5">
          <div className="p-2.5 rounded-xl border group-hover:scale-110 transition-transform shrink-0"
            style={{ backgroundColor: 'rgba(147, 51, 234, 0.15)', borderColor: 'rgba(147, 51, 234, 0.35)', color: '#9333EA' }}>
            <Building2 size={22} />
          </div>
          <div className="space-y-0.5">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-sm md:text-base font-bold" style={{ color: isDarkMode ? '#F8FAFC' : '#0F172A' }}>
                🏢 Looking for Company-Specific Questions?
              </h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full font-bold"
                style={{ backgroundColor: 'rgba(255, 158, 125, 0.15)', borderColor: 'rgba(255, 158, 125, 0.35)', color: '#FF9E7D', border: '1px solid' }}>
                8,600+ LEETCODE QUESTIONS
              </span>
            </div>
            <p className="text-xs leading-relaxed" style={{ color: isDarkMode ? '#94A3B8' : '#475569' }}>
              Explore authentic interview questions asked by <strong style={{ color: isDarkMode ? '#F8FAFC' : '#0F172A' }}>TCS, Infosys, Accenture, Cognizant, Google, Amazon, Microsoft, Apple & Meta</strong> on the Company Prep Dashboard.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-xs font-semibold shrink-0 self-end sm:self-center"
          style={{ color: '#9333EA' }}>
          <span>Open Company Archive</span>
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </div>
      </div>

      {/* Main Action Card (Ask Ziv below cards) */}
      <div className="space-y-3 max-w-2xl mx-auto pt-2">
        {actions.map((act, index) => {
          const Icon = act.icon;
          return (
            <button
              key={index}
              onClick={() => setIsTutorModalOpen(true)}
              className="w-full p-4.5 rounded-2xl flex items-center justify-between transition-all border cursor-pointer group doap-card"
              style={{
                backgroundColor: isDarkMode ? 'rgba(15, 20, 35, 0.95)' : '#FFFFFF',
                borderColor: isDarkMode ? 'rgba(147, 51, 234, 0.20)' : '#E2E8F0',
                color: isDarkMode ? '#F8FAFC' : '#0F172A',
                boxShadow: isDarkMode ? 'none' : '0 4px 20px rgba(0, 0, 0, 0.05)',
              }}
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center transition-colors border"
                  style={{ backgroundColor: 'rgba(147, 51, 234, 0.15)', borderColor: 'rgba(147, 51, 234, 0.35)', color: '#9333EA' }}>
                  <Icon size={18} />
                </div>
                <div className="text-left">
                  <h3 className="font-bold text-base leading-snug flex items-center gap-2" style={{ color: isDarkMode ? '#F8FAFC' : '#0F172A' }}>
                    <span>{act.title}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full font-medium border"
                      style={{ backgroundColor: 'rgba(255, 158, 125, 0.12)', borderColor: 'rgba(255, 158, 125, 0.30)', color: '#FF9E7D' }}>
                      Text & Voice
                    </span>
                  </h3>
                  <p className="text-xs font-normal" style={{ color: '#94A3B8' }}>
                    {act.desc}
                  </p>
                </div>
              </div>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center transition-transform group-hover:translate-x-1"
                style={{ color: '#9333EA' }}>
                <ArrowRight size={16} />
              </div>
            </button>
          );
        })}
      </div>

      {/* Choose Ziv Tutor Mode Modal (Text vs Voice) */}
      {isTutorModalOpen && typeof document !== 'undefined' && createPortal(
        <div 
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in overflow-y-auto"
          onClick={() => setIsTutorModalOpen(false)}
        >
          <div 
            className="relative w-full max-w-lg rounded-2xl border p-6 sm:p-7 shadow-2xl transition-all animate-scale-in space-y-6 my-auto"
            style={{
              backgroundColor: '#0B0F19',
              borderColor: 'rgba(147, 51, 234, 0.30)',
              color: '#F8FAFC',
            }}
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
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-purple-400">
                  Ask Ziv • Choose AI Mentor
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
                className="p-5 rounded-2xl border text-left flex flex-col justify-between transition-all duration-200 cursor-pointer group hover:scale-[1.02]"
                style={{
                  backgroundColor: 'rgba(15, 20, 35, 0.95)',
                  borderColor: 'rgba(147, 51, 234, 0.25)',
                }}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl border flex items-center justify-center"
                      style={{ backgroundColor: 'rgba(147, 51, 234, 0.15)', borderColor: 'rgba(147, 51, 234, 0.35)', color: '#9333EA' }}>
                      <MessageSquare size={20} />
                    </div>
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold border"
                      style={{ backgroundColor: 'rgba(255, 158, 125, 0.12)', borderColor: 'rgba(255, 158, 125, 0.30)', color: '#FF9E7D' }}>
                      Self-Thinking
                    </span>
                  </div>

                  <div>
                    <h4 className="font-bold text-base transition-colors" style={{ color: '#F8FAFC' }}>
                      Text AI Tutor
                    </h4>
                    <p className="text-xs mt-1 leading-relaxed" style={{ color: '#94A3B8' }}>
                      Deep cognitive reasoning with &lt;think&gt; trace, flash quizzes, syntax-highlighted code & Flux AI art.
                    </p>
                  </div>
                </div>

                <div className="pt-4 flex items-center gap-1.5 text-xs font-bold group-hover:translate-x-1 transition-transform"
                  style={{ color: '#9333EA' }}>
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
                className="p-5 rounded-2xl border text-left flex flex-col justify-between transition-all duration-200 cursor-pointer group hover:scale-[1.02]"
                style={{
                  backgroundColor: 'rgba(15, 20, 35, 0.95)',
                  borderColor: 'rgba(147, 51, 234, 0.25)',
                }}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl border flex items-center justify-center"
                      style={{ backgroundColor: 'rgba(255, 158, 125, 0.15)', borderColor: 'rgba(255, 158, 125, 0.35)', color: '#FF9E7D' }}>
                      <Mic size={20} />
                    </div>
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold border"
                      style={{ backgroundColor: 'rgba(147, 51, 234, 0.15)', borderColor: 'rgba(147, 51, 234, 0.35)', color: '#9333EA' }}>
                      Zero Latency
                    </span>
                  </div>

                  <div>
                    <h4 className="font-bold text-base transition-colors" style={{ color: '#F8FAFC' }}>
                      Voice AI Tutor
                    </h4>
                    <p className="text-xs mt-1 leading-relaxed" style={{ color: '#94A3B8' }}>
                      Hands-free real-time audio dialogue with Charon studio voice and live Arc-Reactor HUD.
                    </p>
                  </div>
                </div>

                <div className="pt-4 flex items-center gap-1.5 text-xs font-bold group-hover:translate-x-1 transition-transform"
                  style={{ color: '#FF9E7D' }}>
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
        </div>,
        document.body
      )}
    </div>
  );
};
