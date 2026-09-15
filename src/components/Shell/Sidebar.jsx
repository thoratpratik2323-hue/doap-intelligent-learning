import React from 'react';
import {
  Home, LayoutDashboard, MessageSquare, BookOpen, Calendar, Code, Video,
  FileCheck2, Briefcase, CalendarDays, Folder, Trophy, User,
  ChevronLeft, ChevronRight, Radio, Building2, PanelLeftClose
} from 'lucide-react';
import { NAVIGATION_ITEMS } from '../../data/mockData';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { useAITutor } from '../../context/AITutorContext';

const ICON_MAP = {
  Home: Home, Dashboard: LayoutDashboard, 'AI Tutor': MessageSquare,
  'Voice Tutor': Radio, 'My Learning': BookOpen, 'Study Plan': Calendar,
  'Coding Practice': Code, 'Company Prep': Building2, 'AI Interview': Video,
  Assessments: FileCheck2, 'Job Readiness': Briefcase, Events: CalendarDays,
  Resources: Folder, Achievements: Trophy, Profile: User,
};

export const Sidebar = ({ isMobileOpen, setIsMobileOpen }) => {
  const {
    currentPath, navigateTo,
    isSidebarCollapsed, setIsSidebarCollapsed,
    isSidebarHidden, setIsSidebarHidden,
    isDarkMode
  } = useTheme();
  const { isDevBypass } = useAuth();
  const { isThinking: isAIThinking, hasUnreadResponse: hasAIUnread } = useAITutor();

  const handleNavClick = (path) => {
    navigateTo(path);
    if (setIsMobileOpen) setIsMobileOpen(false);
  };

  return (
    <aside
      className={`
        fixed top-0 left-0 bottom-0 z-40 border-r flex flex-col justify-between
        transition-all duration-300 ease-in-out select-none
        ${isSidebarCollapsed ? 'w-[60px]' : 'w-60 md:w-64'}
        ${isMobileOpen
          ? 'translate-x-0'
          : (isSidebarHidden
              ? '-translate-x-full md:-translate-x-full pointer-events-none opacity-0'
              : '-translate-x-full md:translate-x-0 opacity-100'
            )
        }
      `}
      style={{
        backgroundColor: isDarkMode ? '#090D16' : '#ffffff',
        borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.06)' : '#E2E8F0',
        color: isDarkMode ? '#F8FAFC' : '#0F172A',
      }}
    >
      {/* ── Logo / Header ── */}
      <div
        className="h-14 flex items-center justify-between px-4 border-b shrink-0"
        style={{ borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.06)' : '#E2E8F0' }}
      >
        <div
          onClick={() => handleNavClick('/')}
          className="flex items-center gap-2.5 cursor-pointer"
        >
          <img src="/ziv-logo.png" alt="Ziv" className="h-7 w-7 object-contain rounded" />
          {!isSidebarCollapsed && (
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-bold tracking-tight" style={{ color: isDarkMode ? '#F8FAFC' : '#0F172A' }}>Ziv</span>
              {isDevBypass && (
                <span className="text-[9px] font-mono text-[#8B5CF6] uppercase tracking-widest">Dev Mode</span>
              )}
            </div>
          )}
        </div>

        <div className="hidden md:flex items-center gap-0.5">
          <button
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="p-1.5 rounded transition-colors cursor-pointer hover:bg-white/8"
            style={{ color: 'var(--doap-text-sec)' }}
            title={isSidebarCollapsed ? 'Expand' : 'Collapse'}
          >
            {isSidebarCollapsed ? <ChevronRight size={15} /> : <ChevronLeft size={15} />}
          </button>
          <button
            onClick={() => setIsSidebarHidden(true)}
            className="p-1.5 rounded transition-colors cursor-pointer hover:bg-white/8 hover:text-rose-400"
            style={{ color: 'var(--doap-text-sec)' }}
            title="Hide sidebar"
          >
            <PanelLeftClose size={14} />
          </button>
        </div>
      </div>

      {/* ── Navigation ── */}
      <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-0.5 scrollbar-none">
        {NAVIGATION_ITEMS.map((item) => {
          const IconComponent = ICON_MAP[item.label] || Home;
          const isActive = currentPath === item.path;
          const isAITutorItem = item.id === 'ai-tutor' || item.label === 'AI Tutor';

          return (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.path)}
              title={isSidebarCollapsed ? item.label : undefined}
              className={`
                w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[13px] sm:text-sm font-bold
                transition-all duration-150 cursor-pointer border-0 outline-none text-left
                ${isActive 
                  ? '' 
                  : (isDarkMode ? 'hover:bg-white/10 hover:text-white' : 'hover:bg-slate-100 hover:text-slate-950')
                }
              `}
              style={{
                backgroundColor: isActive
                  ? (isDarkMode ? 'rgba(139, 92, 246, 0.18)' : 'rgba(124, 58, 237, 0.12)')
                  : 'transparent',
                color: isActive 
                  ? (isDarkMode ? '#C4B5FD' : '#6D28D9') 
                  : (isDarkMode ? '#E2E8F0' : '#020617'),
                borderLeft: isActive 
                  ? (isDarkMode ? '3px solid #8B5CF6' : '3px solid #7C3AED') 
                  : '3px solid transparent',
              }}
            >
              {/* Icon + status dot */}
              <div className="relative shrink-0">
                <IconComponent size={18} strokeWidth={2.2} />
                {isAITutorItem && isAIThinking && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#FB923C] rounded-full animate-ping" />
                )}
                {isAITutorItem && !isAIThinking && hasAIUnread && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#FB923C] rounded-full" />
                )}
              </div>

              {/* Label */}
              {!isSidebarCollapsed && (
                <span className="flex-1 flex items-center justify-between truncate">
                  <span className="truncate font-bold tracking-tight">{item.label}</span>
                  {isAITutorItem && isAIThinking && (
                    <span className="text-[9px] font-mono text-[#FB923C] font-extrabold animate-pulse">Working</span>
                  )}
                  {isAITutorItem && !isAIThinking && hasAIUnread && (
                    <span className="text-[9px] font-mono text-[#FB923C] font-extrabold">New</span>
                  )}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* ── Footer: user info placeholder ── */}
      {!isSidebarCollapsed && (
        <div
          className="border-t px-4 py-3"
          style={{ borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.06)' : '#E2E8F0' }}
        >
          <p className="text-[10px] font-mono uppercase tracking-widest font-bold" style={{ color: isDarkMode ? '#64748B' : '#475569' }}>
            Ziv Platform v1.0
          </p>
        </div>
      )}
    </aside>
  );
};
