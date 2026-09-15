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
        backgroundColor: '#FFFFFF',
        borderColor: 'rgba(225, 29, 72, 0.16)',
        color: '#18181B',
      }}
    >
      {/* ── Logo / Header ── */}
      <div
        className="h-14 flex items-center justify-between px-4 border-b shrink-0"
        style={{ borderColor: 'rgba(225, 29, 72, 0.16)' }}
      >
        <div
          onClick={() => handleNavClick('/')}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <img src="/ziv-logo.png" alt="Ziv" className="h-8 w-8 object-contain rounded-lg shadow-sm" />
          {!isSidebarCollapsed && (
            <div className="flex flex-col leading-tight">
              <span className="text-base font-extrabold tracking-tight text-[#18181B]">Ziv</span>
              {isDevBypass && (
                <span className="text-[9px] font-mono text-rose-600 uppercase tracking-widest font-bold">Dev Mode</span>
              )}
            </div>
          )}
        </div>

        <div className="hidden md:flex items-center gap-0.5">
          <button
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="p-1.5 rounded-lg transition-colors cursor-pointer hover:bg-rose-50 text-slate-500 hover:text-slate-800"
            title={isSidebarCollapsed ? 'Expand' : 'Collapse'}
          >
            {isSidebarCollapsed ? <ChevronRight size={15} /> : <ChevronLeft size={15} />}
          </button>
          <button
            onClick={() => setIsSidebarHidden(true)}
            className="p-1.5 rounded-lg transition-colors cursor-pointer hover:bg-rose-50 text-slate-500 hover:text-rose-600"
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
                  ? 'shadow-sm shadow-rose-100' 
                  : 'hover:bg-rose-50/70 text-slate-700 hover:text-[#18181B]'
                }
              `}
              style={{
                backgroundColor: isActive ? '#FFF1F2' : 'transparent',
                color: isActive ? '#BE123C' : '#3F3F46',
                borderLeft: isActive ? '3px solid #E11D48' : '3px solid transparent',
              }}
            >
              {/* Icon + status dot */}
              <div className="relative shrink-0">
                <IconComponent size={18} strokeWidth={2.2} />
                {isAITutorItem && isAIThinking && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#E11D48] rounded-full animate-ping" />
                )}
                {isAITutorItem && !isAIThinking && hasAIUnread && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#E11D48] rounded-full" />
                )}
              </div>

              {/* Label */}
              {!isSidebarCollapsed && (
                <span className="flex-1 flex items-center justify-between truncate">
                  <span className="truncate font-bold tracking-tight">{item.label}</span>
                  {isAITutorItem && isAIThinking && (
                    <span className="text-[9px] font-mono text-[#E11D48] font-extrabold animate-pulse">Working</span>
                  )}
                  {isAITutorItem && !isAIThinking && hasAIUnread && (
                    <span className="text-[9px] font-mono text-[#E11D48] font-extrabold">New</span>
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
          style={{ borderColor: 'rgba(225, 29, 72, 0.12)' }}
        >
          <p className="text-[10px] font-mono uppercase tracking-widest font-bold text-rose-800/70">
            Ziv Platform v1.0
          </p>
        </div>
      )}
    </aside>
  );
};
