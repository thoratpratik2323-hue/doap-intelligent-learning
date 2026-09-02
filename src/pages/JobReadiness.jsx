import React, { useState } from 'react';
import { TrendingUp, ChevronRight, Target, Zap, Award, ArrowRight, Play, Code, BookOpen, Video, MessageSquare, ExternalLink } from 'lucide-react';
import { WeakAreasAnalyzer } from '../components/Common/WeakAreasAnalyzer';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

export const JobReadiness = () => {
  const { isDarkMode, activeAccentHex, navigateTo } = useTheme();
  const { userProgress, profile } = useAuth();
  const accentHex = activeAccentHex || 'var(--doap-accent, #ffffff)';

  const assessments = userProgress?.assessments || [];
  const solvedCount = (userProgress?.solvedProblems || []).length;
  const hasAssessments = assessments.length > 0;

  const readinessScore = hasAssessments
    ? Math.round(assessments.reduce((acc, a) => acc + (a.scoreNum || parseInt(a.score) || 0), 0) / assessments.length)
    : 0;

  const [activeRoleTab, setActiveRoleTab] = useState('Software Engineer');

  const roles = [
    "Software Engineer",
    "Data Analyst",
    "AI Engineer",
    "Product Analyst",
    "Cybersecurity Analyst"
  ];

  const recommendations = {
    "Software Engineer": [
      {
        title: "Solve algorithm challenges (Two Sum, Binary Search, Trees)",
        actionText: "Open Coding Sandbox",
        icon: Code,
        path: "/coding"
      },
      {
        title: "Practice system design: microservices & database partitioning",
        actionText: "Study System Design",
        icon: BookOpen,
        path: "/learning"
      },
      {
        title: "Simulate a live AI technical & behavioral mock interview",
        actionText: "Launch Interview",
        icon: Video,
        path: "/interview"
      },
      {
        title: "Test your core Computer Science foundations",
        actionText: "Take Assessment",
        icon: Target,
        path: "/assessments"
      }
    ],
    "Data Analyst": [
      {
        title: "Master SQL window functions, aggregations, and subqueries",
        actionText: "Start Learning",
        icon: BookOpen,
        path: "/learning"
      },
      {
        title: "Practice Python data analysis with real problem sets",
        actionText: "Open Sandbox",
        icon: Code,
        path: "/coding"
      },
      {
        title: "Take the Job Readiness technical evaluation",
        actionText: "Take Assessment",
        icon: Target,
        path: "/assessments"
      },
      {
        title: "Ask DOAP AI Tutor to explain complex database normalization",
        actionText: "Ask AI Tutor",
        icon: MessageSquare,
        path: "/ai-tutor"
      }
    ],
    "AI Engineer": [
      {
        title: "Fine-tune LLM concepts & Prompt Engineering mastery",
        actionText: "Start AI Course",
        icon: BookOpen,
        path: "/learning"
      },
      {
        title: "Take the Full AI Readiness Assessment",
        actionText: "Start AI Quiz",
        icon: Target,
        path: "/assessments"
      },
      {
        title: "Simulate AI/ML Specialist technical mock interview",
        actionText: "Start AI Interview",
        icon: Video,
        path: "/interview"
      },
      {
        title: "Discuss RAG architecture & vector embeddings with AI Tutor",
        actionText: "Ask AI Tutor",
        icon: MessageSquare,
        path: "/ai-tutor"
      }
    ],
    "Product Analyst": [
      {
        title: "Explore product telemetry metrics (DAU, WAU, Retention, Churn)",
        actionText: "Study Modules",
        icon: BookOpen,
        path: "/learning"
      },
      {
        title: "Practice product estimation & analytical case studies",
        actionText: "Practice Interview",
        icon: Video,
        path: "/interview"
      },
      {
        title: "Evaluate your problem-solving foundations",
        actionText: "Take Assessment",
        icon: Target,
        path: "/assessments"
      }
    ],
    "Cybersecurity Analyst": [
      {
        title: "Study Network Defense, Firewalls & Cryptography",
        actionText: "Open Security Course",
        icon: BookOpen,
        path: "/learning"
      },
      {
        title: "Review OWASP Top 10 vulnerabilities & security principles",
        actionText: "Ask AI Tutor",
        icon: MessageSquare,
        path: "/ai-tutor"
      },
      {
        title: "Take cybersecurity technical readiness assessment",
        actionText: "Start Quiz",
        icon: Target,
        path: "/assessments"
      }
    ]
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 md:py-8 space-y-8 animate-fade-in select-none">
      {/* Header */}
      <div className="space-y-1">
        <h1 className={`text-3xl font-bold tracking-tight ${
          isDarkMode ? 'text-white' : 'text-[#0a0a0a]'
        }`}>Job Readiness</h1>
        <p className={`text-xs font-mono uppercase tracking-wider ${
          isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
        }`}>Understand exactly where you stand and what to execute next</p>
      </div>

      {/* Top Row: Overall Readiness + What Employers May See */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Overall Readiness */}
        <div className={`lg:col-span-5 p-6 rounded-3xl space-y-4 border flex flex-col justify-between transition-colors doap-card ${
          isDarkMode ? 'bg-[#111111] border-neutral-800 text-white' : 'bg-neutral-50 border-neutral-200 text-black'
        }`}>
          <span className={`text-[11px] font-mono uppercase tracking-widest block ${
            isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
          }`}>
            OVERALL READINESS
          </span>
          <div className="space-y-1.5">
            <div className="text-6xl font-black font-mono" style={{ color: readinessScore > 0 ? accentHex : undefined }}>
              {readinessScore > 0 ? `${readinessScore}%` : '--'}
            </div>
            {hasAssessments ? (
              <div className={`flex items-center gap-1 text-xs font-mono ${
                isDarkMode ? 'text-neutral-400' : 'text-neutral-600'
              }`}>
                <TrendingUp size={14} />
                <span>Calculated from {assessments.length} assessments</span>
              </div>
            ) : (
              <p className="text-xs font-mono text-neutral-500">
                Not assessed yet
              </p>
            )}
          </div>

          {!hasAssessments && (
            <button
              onClick={() => navigateTo('/assessments')}
              className="w-full py-2.5 rounded-xl font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer hover-glide"
              style={{ backgroundColor: accentHex, color: 'var(--doap-bg, #000000)' }}
            >
              <Play size={13} />
              <span>Take Job Readiness Quiz</span>
            </button>
          )}
        </div>

        {/* What Employers May See */}
        <div className={`lg:col-span-7 p-6 rounded-3xl border space-y-4 doap-card ${
          isDarkMode ? 'bg-[#111111] border-neutral-800 text-white' : 'bg-white border-neutral-200 text-black'
        }`}>
          <span className={`text-[11px] font-mono uppercase tracking-widest block ${
            isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
          }`}>
            WHAT EMPLOYERS MAY SEE
          </span>

          {hasAssessments ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-fade-in">
              {/* Strengths */}
              <div className="space-y-2">
                <span className={`text-[11px] font-mono uppercase tracking-wider block ${
                  isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
                }`}>
                  VERIFIED STRENGTHS
                </span>
                <ul className="space-y-1.5 text-xs font-medium">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accentHex }} />
                    <span>Technical Problem Solving ({readinessScore}%)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accentHex }} />
                    <span>Computer Science Core</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accentHex }} />
                    <span>Active Platform Consistency</span>
                  </li>
                </ul>
              </div>

              {/* Gaps */}
              <div className="space-y-2">
                <span className={`text-[11px] font-mono uppercase tracking-wider block ${
                  isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
                }`}>
                  RECOMMENDED FOCUS
                </span>
                <ul className="space-y-1.5 text-xs font-medium">
                  <li className="flex items-center gap-2 opacity-70">
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-400" />
                    <span>Mock Interview Practice</span>
                  </li>
                  <li className="flex items-center gap-2 opacity-70">
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-400" />
                    <span>Advanced DSA Problem Solving</span>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="py-6 text-center border border-dashed rounded-2xl p-4 space-y-2" style={{ borderColor: 'var(--doap-border)' }}>
              <p className="text-xs font-mono text-neutral-400">Employer profile unmapped.</p>
              <p className="text-xs text-neutral-500 max-w-sm mx-auto">Complete assessments and coding practice to automatically unlock your verified strengths and employer readiness breakdown.</p>
            </div>
          )}
        </div>
      </div>

      {/* Skill Breakdown */}
      <div className={`p-6 rounded-3xl border space-y-5 doap-card ${
        isDarkMode ? 'bg-[#111111] border-neutral-800 text-white' : 'bg-white border-neutral-200 text-black'
      }`}>
        <span className={`text-[11px] font-mono uppercase tracking-widest block ${
          isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
        }`}>
          SKILL BREAKDOWN
        </span>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs font-semibold">
              <span>Technical Skills</span>
              <span className="font-mono text-neutral-400">{hasAssessments ? `${readinessScore}%` : '0%'}</span>
            </div>
            <div className={`h-2 rounded-full overflow-hidden ${isDarkMode ? 'bg-neutral-800' : 'bg-neutral-100'}`}>
              <div 
                className="h-full rounded-full transition-all duration-500" 
                style={{ width: `${hasAssessments ? readinessScore : 0}%`, backgroundColor: accentHex }} 
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs font-semibold">
              <span>Coding & Algorithms</span>
              <span className="font-mono text-neutral-400">{solvedCount > 0 ? `${Math.min(100, solvedCount * 25)}%` : '0%'}</span>
            </div>
            <div className={`h-2 rounded-full overflow-hidden ${isDarkMode ? 'bg-neutral-800' : 'bg-neutral-100'}`}>
              <div 
                className="h-full rounded-full transition-all duration-500" 
                style={{ width: `${solvedCount > 0 ? Math.min(100, solvedCount * 25) : 0}%`, backgroundColor: accentHex }} 
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs font-semibold">
              <span>Problem Solving</span>
              <span className="font-mono text-neutral-400">{hasAssessments ? `${Math.min(100, readinessScore + 5)}%` : '0%'}</span>
            </div>
            <div className={`h-2 rounded-full overflow-hidden ${isDarkMode ? 'bg-neutral-800' : 'bg-neutral-100'}`}>
              <div 
                className="h-full rounded-full transition-all duration-500" 
                style={{ width: `${hasAssessments ? Math.min(100, readinessScore + 5) : 0}%`, backgroundColor: accentHex }} 
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs font-semibold">
              <span>AI Literacy</span>
              <span className="font-mono text-neutral-400">{hasAssessments ? `${readinessScore}%` : '0%'}</span>
            </div>
            <div className={`h-2 rounded-full overflow-hidden ${isDarkMode ? 'bg-neutral-800' : 'bg-neutral-100'}`}>
              <div 
                className="h-full rounded-full transition-all duration-500" 
                style={{ width: `${hasAssessments ? readinessScore : 0}%`, backgroundColor: accentHex }} 
              />
            </div>
          </div>
        </div>
      </div>

      {/* AI Weak Areas & Skill Gap Diagnostics */}
      <WeakAreasAnalyzer />

      {/* Interactive Actionable Recommendations */}
      <div className={`p-6 rounded-3xl border space-y-6 doap-card ${
        isDarkMode ? 'bg-[#111111] border-neutral-800 text-white' : 'bg-white border-neutral-200 text-black'
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <span className={`text-[11px] font-mono uppercase tracking-widest block ${
            isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
          }`}>
            ACTIONABLE ROADMAP RECOMMENDATIONS
          </span>
          <span className="text-[11px] font-mono text-neutral-500">
            Click any task to execute directly
          </span>
        </div>

        {/* Role Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {roles.map((role) => (
            <button
              key={role}
              onClick={() => setActiveRoleTab(role)}
              className={`
                px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer border
                ${activeRoleTab === role 
                  ? (isDarkMode ? 'bg-white text-black border-white' : 'bg-black text-white border-black') 
                  : (isDarkMode ? 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:text-white' : 'bg-neutral-100 text-neutral-600 border-neutral-200 hover:text-black')
                }
              `}
            >
              {role}
            </button>
          ))}
        </div>

        {/* Action List with Direct Launch Buttons */}
        <div className="space-y-3">
          {recommendations[activeRoleTab].map((rec, i) => {
            const Icon = rec.icon;
            return (
              <div
                key={i}
                onClick={() => navigateTo(rec.path)}
                className={`p-4 rounded-2xl border flex items-center justify-between transition-all cursor-pointer hover-glide group ${
                  isDarkMode 
                    ? 'bg-neutral-900/80 border-neutral-800 hover:border-neutral-700' 
                    : 'bg-neutral-50 border-neutral-200 hover:border-neutral-300'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <div className={`w-8 h-8 rounded-xl font-mono text-xs font-bold flex items-center justify-center shrink-0 border ${
                    isDarkMode ? 'bg-neutral-800 border-neutral-700 text-white' : 'bg-white border-neutral-300 text-black'
                  }`}>
                    {i + 1}
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-semibold" style={{ color: 'var(--doap-text-prim)' }}>
                      {rec.title}
                    </h4>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span 
                    className="px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-transform group-hover:scale-105"
                    style={{ backgroundColor: accentHex, color: 'var(--doap-bg, #000000)' }}
                  >
                    <Icon size={12} />
                    <span>{rec.actionText}</span>
                    <ArrowRight size={12} />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
