import React, { useState, useEffect } from 'react';
import { Zap, Code, Video, TrendingUp, Trophy, Flame, Laptop, Mic, ArrowRight, CheckCircle2, Play, Sparkles } from 'lucide-react';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Radar 
} from 'recharts';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

export const Dashboard = () => {
  const { navigateTo, isDarkMode, activeAccentHex } = useTheme();
  const { user, profile, userProgress } = useAuth();
  const accentHex = activeAccentHex || 'var(--doap-accent, #ffffff)';

  // Compute live user stats from synchronized cloud userProgress
  const tasks = userProgress?.tasks || [];
  const tasksCompleted = tasks.filter(t => t.completed).length;
  const totalTasks = tasks.length;
  const assessmentHistory = userProgress?.assessments || [];
  const solvedProblemsCount = (userProgress?.solvedProblems || []).length;

  const readinessScore = profile?.stats?.aiReadiness || 0;
  const streak = profile?.stats?.dayStreak || 1;

  const hasAssessments = assessmentHistory.length > 0;

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 md:py-8 space-y-8 animate-fade-in select-none">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className={`text-3xl font-extrabold tracking-tight ${
            isDarkMode ? 'text-white' : 'text-[#0a0a0a]'
          }`}>
            Dashboard
          </h1>
          <p className={`text-xs font-mono uppercase tracking-wider ${
            isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
          }`}>
            Welcome back, {profile?.name || user?.displayName || 'Student'} • Live Telemetry
          </p>
        </div>

        <button
          onClick={() => navigateTo('/interview')}
          className="px-5 py-2.5 rounded-full font-bold text-xs shadow-md transition-all flex items-center gap-2 cursor-pointer self-start sm:self-auto hover-glide"
          style={{ backgroundColor: accentHex, color: 'var(--doap-bg, #000000)' }}
        >
          <Video size={15} />
          <span>Launch AI Interview</span>
        </button>
      </div>

      {/* Top 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* AI Readiness Card */}
        <div className={`p-5 rounded-3xl space-y-3 border transition-colors doap-card ${
          isDarkMode 
            ? 'bg-[#111111] border-neutral-800 text-white' 
            : 'bg-[#f7f7f7] border-neutral-200 text-[#0a0a0a]'
        }`}>
          <div className="flex justify-between items-center">
            <span className={`text-[11px] font-mono uppercase tracking-wider ${
              isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
            }`}>
              AI READINESS
            </span>
          </div>
          <div className="space-y-1">
            <div className={`text-5xl font-black ${
              isDarkMode ? 'text-white' : 'text-black'
            }`} style={{ color: readinessScore > 0 ? accentHex : undefined }}>
              {readinessScore > 0 ? `${readinessScore}%` : '--'}
            </div>
            <div className={`flex items-center gap-1 text-xs font-medium ${
              isDarkMode ? 'text-neutral-400' : 'text-neutral-600'
            }`}>
              {readinessScore > 0 ? (
                <>
                  <TrendingUp size={14} />
                  <span>Calculated from assessments</span>
                </>
              ) : (
                <button 
                  onClick={() => navigateTo('/assessments')}
                  className="text-xs font-bold underline cursor-pointer hover:opacity-80"
                  style={{ color: accentHex }}
                >
                  + Take Assessment to calculate
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Study Tasks Card */}
        <div 
          onClick={() => navigateTo('/study-plan')}
          className={`p-5 rounded-3xl space-y-3 border flex flex-col justify-between transition-colors cursor-pointer doap-card ${
            isDarkMode 
              ? 'bg-[#111111] border-neutral-800 text-white hover:border-neutral-700' 
              : 'bg-white border-neutral-200 text-[#0a0a0a] hover:border-neutral-300'
          }`}
        >
          <div className="flex justify-between items-start">
            <span className={`text-[11px] font-mono uppercase tracking-wider ${
              isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
            }`}>
              STUDY TASKS
            </span>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              isDarkMode ? 'bg-neutral-800 text-neutral-300' : 'bg-neutral-100 text-neutral-700'
            }`}>
              <Zap size={16} />
            </div>
          </div>
          <div>
            <div className={`text-4xl font-extrabold ${isDarkMode ? 'text-white' : 'text-black'}`}>
              {totalTasks > 0 ? `${tasksCompleted}/${totalTasks}` : '0'}
            </div>
            <p className={`text-xs font-medium ${isDarkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>
              {totalTasks > 0 ? 'Tasks completed today' : 'No tasks scheduled'}
            </p>
          </div>
        </div>

        {/* Coding Practice Card */}
        <div 
          onClick={() => navigateTo('/coding')}
          className={`p-5 rounded-3xl space-y-3 border flex flex-col justify-between transition-colors cursor-pointer doap-card ${
            isDarkMode 
              ? 'bg-[#111111] border-neutral-800 text-white hover:border-neutral-700' 
              : 'bg-white border-neutral-200 text-[#0a0a0a] hover:border-neutral-300'
          }`}
        >
          <div className="flex justify-between items-start">
            <span className={`text-[11px] font-mono uppercase tracking-wider ${
              isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
            }`}>
              CODING PRACTICE
            </span>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              isDarkMode ? 'bg-neutral-800 text-neutral-300' : 'bg-neutral-100 text-neutral-700'
            }`}>
              <Code size={16} />
            </div>
          </div>
          <div>
            <div className={`text-4xl font-extrabold ${isDarkMode ? 'text-white' : 'text-black'}`}>
              Sandbox
            </div>
            <p className={`text-xs font-medium ${isDarkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>
              Live automated tests runner
            </p>
          </div>
        </div>

        {/* Day Streak Card */}
        <div className={`p-5 rounded-3xl space-y-3 border flex flex-col justify-between transition-colors doap-card ${
          isDarkMode 
            ? 'bg-[#111111] border-neutral-800 text-white' 
            : 'bg-white border-neutral-200 text-[#0a0a0a]'
        }`}>
          <div className="flex justify-between items-start">
            <span className={`text-[11px] font-mono uppercase tracking-wider ${
              isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
            }`}>
              DAY STREAK
            </span>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              isDarkMode ? 'bg-neutral-800 text-amber-400' : 'bg-neutral-100 text-amber-500'
            }`}>
              <Flame size={16} />
            </div>
          </div>
          <div>
            <div className={`text-4xl font-extrabold ${isDarkMode ? 'text-white' : 'text-black'}`}>{streak} Day</div>
            <p className={`text-xs font-medium ${isDarkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>Active learning streak</p>
          </div>
        </div>
      </div>

      {/* Middle Row: Line Chart + Skill Radar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Performance Trajectory Card */}
        <div className={`lg:col-span-7 p-6 rounded-3xl border space-y-4 doap-card ${
          isDarkMode ? 'bg-[#111111] border-neutral-800 text-white' : 'bg-white border-neutral-200 text-black'
        }`}>
          <span className={`text-[11px] font-mono uppercase tracking-widest block ${
            isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
          }`}>
            PERFORMANCE TRAJECTORY
          </span>
          
          {hasAssessments ? (
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={assessmentHistory} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <XAxis dataKey="title" stroke={isDarkMode ? "#666666" : "#999999"} fontSize={10} tickLine={false} axisLine={false} />
                  <YAxis domain={[0, 100]} stroke={isDarkMode ? "#666666" : "#999999"} fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: isDarkMode ? '#171717' : '#ffffff', borderRadius: '12px', border: isDarkMode ? '1px solid #262626' : '1px solid #e5e5e5', color: isDarkMode ? '#ffffff' : '#000000' }} 
                    labelStyle={{ fontWeight: 'bold', color: isDarkMode ? '#ffffff' : '#000000' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="scoreNum" 
                    stroke={accentHex} 
                    strokeWidth={2.5} 
                    dot={{ r: 4, fill: accentHex }} 
                    activeDot={{ r: 6 }} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 text-center space-y-3 p-6 border border-dashed rounded-2xl" style={{ borderColor: 'var(--doap-border)' }}>
              <TrendingUp size={32} className="text-neutral-500" />
              <div className="space-y-1">
                <h4 className="font-bold text-sm" style={{ color: 'var(--doap-text-prim)' }}>No Performance Data Yet</h4>
                <p className="text-xs text-neutral-400 max-w-sm">Complete your first coding test or quiz assessment to start tracking your performance trajectory.</p>
              </div>
              <button
                onClick={() => navigateTo('/assessments')}
                className="px-4 py-2 rounded-xl text-xs font-bold shadow-md cursor-pointer hover-glide"
                style={{ backgroundColor: accentHex, color: 'var(--doap-bg, #000000)' }}
              >
                Take First Assessment
              </button>
            </div>
          )}
        </div>

        {/* Skill Radar Chart Card */}
        <div className={`lg:col-span-5 p-6 rounded-3xl border space-y-4 doap-card ${
          isDarkMode ? 'bg-[#111111] border-neutral-800 text-white' : 'bg-white border-neutral-200 text-black'
        }`}>
          <span className={`text-[11px] font-mono uppercase tracking-widest block ${
            isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
          }`}>
            SKILL MATRIX RADAR
          </span>

          {hasAssessments ? (
            <div className="h-64 w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="75%" data={[
                  { skill: 'DSA', value: 80 },
                  { skill: 'AI Literacy', value: readinessScore || 70 },
                  { skill: 'Web Tech', value: 75 },
                  { skill: 'Problem Solving', value: 85 },
                  { skill: 'System Design', value: 65 }
                ]}>
                  <PolarGrid stroke={isDarkMode ? "#262626" : "#e5e5e5"} />
                  <PolarAngleAxis dataKey="skill" stroke={isDarkMode ? "#a0a0a0" : "#666666"} fontSize={11} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} stroke={isDarkMode ? "#404040" : "#d4d4d4"} fontSize={9} />
                  <Radar 
                    name="Skill Level" 
                    dataKey="value" 
                    stroke={accentHex} 
                    fill={accentHex} 
                    fillOpacity={0.25} 
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 text-center space-y-3 p-6 border border-dashed rounded-2xl" style={{ borderColor: 'var(--doap-border)' }}>
              <Zap size={32} className="text-neutral-500" />
              <div className="space-y-1">
                <h4 className="font-bold text-sm" style={{ color: 'var(--doap-text-prim)' }}>Skill Matrix Unmapped</h4>
                <p className="text-xs text-neutral-400 max-w-xs">Attempt technical practice problems to evaluate your skills across DSA, Systems, and AI.</p>
              </div>
              <button
                onClick={() => navigateTo('/coding')}
                className="px-4 py-2 rounded-xl text-xs font-bold shadow-md cursor-pointer hover-glide"
                style={{ backgroundColor: accentHex, color: 'var(--doap-bg, #000000)' }}
              >
                Start Coding Practice
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Quick Launch Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div 
          onClick={() => navigateTo('/ai-tutor')}
          className="p-5 rounded-2xl border space-y-2 cursor-pointer transition-all hover-glide doap-card"
          style={{ backgroundColor: 'var(--doap-surface)', borderColor: 'var(--doap-border)' }}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold uppercase">DOAP AI Tutor</span>
            <ArrowRight size={15} />
          </div>
          <p className="text-xs text-neutral-400">Ask conceptual CS & engineering questions in real-time.</p>
        </div>

        <div 
          onClick={() => navigateTo('/coding')}
          className="p-5 rounded-2xl border space-y-2 cursor-pointer transition-all hover-glide doap-card"
          style={{ backgroundColor: 'var(--doap-surface)', borderColor: 'var(--doap-border)' }}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold uppercase">Algorithm Practice</span>
            <ArrowRight size={15} />
          </div>
          <p className="text-xs text-neutral-400">Solve LeetCode-style problems with live sandboxed test runner.</p>
        </div>

        <div 
          onClick={() => navigateTo('/interview')}
          className="p-5 rounded-2xl border space-y-2 cursor-pointer transition-all hover-glide doap-card"
          style={{ backgroundColor: 'var(--doap-surface)', borderColor: 'var(--doap-border)' }}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold uppercase">AI Mock Interview</span>
            <ArrowRight size={15} />
          </div>
          <p className="text-xs text-neutral-400">Speech-driven technical & behavioral interviews with AI evaluation.</p>
        </div>
      </div>
    </div>
  );
};
