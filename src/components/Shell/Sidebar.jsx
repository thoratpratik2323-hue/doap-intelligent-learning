import React from 'react';
import { 
  Home, 
  LayoutDashboard, 
  MessageSquare, 
  BookOpen, 
  Calendar, 
  Code, 
  Video, 
  FileCheck2, 
  Briefcase, 
  CalendarDays, 
  Folder, 
  Trophy, 
  User, 
  ChevronLeft,
  ChevronRight,
  Sun,
  Moon,
  Radio,
  Building2,
  PanelLeftClose
} from 'lucide-react';
import { NAVIGATION_ITEMS } from '../../data/mockData';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { useAITutor } from '../../context/AITutorContext';

const ICON_MAP = {
  Home: Home,
  Dashboard: LayoutDashboard,
  'AI Tutor': MessageSquare,
  'Voice Tutor': Radio,
  'My Learning': BookOpen,
  'Study Plan': Calendar,
  'Coding Practice': Code,
  'Company Prep': Building2,
  'AI Interview': Video,
  Assessments: FileCheck2,
  'Job Readiness': Briefcase,
  Events: CalendarDays,
  Resources: Folder,
  Achievements: Trophy,
  Profile: User
};

export const Sidebar = ({ isMobileOpen, setIsMobileOpen }) => {
  const { 
    currentPath, 
    navigateTo, 
    isSidebarCollapsed, 
    setIsSidebarCollapsed, 
    isSidebarHidden,
    setIsSidebarHidden,
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
        fixed top-0 left-0 bottom-0 z-40 border-r shadow-2xl
        flex flex-col justify-between transition-all duration-300 ease-in-out select-none
        ${isSidebarCollapsed ? 'w-20' : 'w-64 md:w-68'}
        ${isMobileOpen 
          ? 'translate-x-0' 
          : (isSidebarHidden ? '-translate-x-full md:-translate-x-full pointer-events-none opacity-0' : '-translate-x-full md:translate-x-0 opacity-100')}
      `}
      style={{
        backgroundColor: isDarkMode ? '#060911' : '#ffffff',
        borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)',
        color: 'var(--doap-text-prim)'
      }}
    >
      {/* Sidebar Header / Logo */}
      <div className="p-4 sm:p-5 flex items-center justify-between border-b" style={{ borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)' }}>
        <div 
          onClick={() => handleNavClick('/')} 
          className="flex items-center gap-3 cursor-pointer group"
        >
          {!isSidebarCollapsed ? (
            <div className="flex items-center gap-2">
              <img 
                src="/doap-logo.jpg" 
                alt="DOAP Logo" 
                className="h-8 object-contain rounded-lg hover:opacity-90 transition-opacity" 
              />
              {isDevBypass && (
                <span className="px-1.5 py-0.5 rounded font-mono text-[9px] font-bold border" style={{ backgroundColor: 'var(--doap-surface-sec)', borderColor: 'var(--doap-border)', color: 'var(--doap-text-sec)' }}>
                  DEV
                </span>
              )}
            </div>
          ) : (
            <img 
              src="/doap-logo.jpg" 
              alt="DOAP Logo" 
              className="w-8 h-8 object-contain rounded-lg" 
            />
          )}
        </div>

        {/* Desktop Collapse & Hide Controls */}
        <div className="hidden md:flex items-center gap-1">
          {/* Collapse / Expand Toggle */}
          <button
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="p-1.5 rounded-xl transition-colors cursor-pointer hover:bg-white/10 hover:text-white"
            style={{ color: 'var(--doap-text-sec)' }}
            title={isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar (Icon mode)"}
          >
            {isSidebarCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>

          {/* Hide Sidebar Completely (Full-screen view) */}
          <button
            onClick={() => setIsSidebarHidden(true)}
            className="p-1.5 rounded-xl transition-colors cursor-pointer hover:bg-white/10 hover:text-rose-400 text-neutral-400"
            title="Hide sidebar completely (Ctrl+B)"
          >
            <PanelLeftClose size={15} />
          </button>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1 scrollbar-none">
        {NAVIGATION_ITEMS.map((item) => {
          const IconComponent = ICON_MAP[item.label] || Home;
          const isActive = currentPath === item.path;
          const isAITutorItem = item.id === 'ai-tutor' || item.label === 'AI Tutor';

          return (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.path)}
              className={`
                w-full flex items-center gap-3.5 px-3.5 py-2.5 rounded-2xl transition-all duration-200 ease-out group cursor-pointer border-0 outline-none hover-glide
              `}
              style={{
                backgroundColor: isActive ? 'var(--doap-accent)' : 'transparent',
                color: isActive ? (isDarkMode ? '#000000' : '#ffffff') : 'var(--doap-text-sec)'
              }}
            >
              <div className="relative shrink-0 flex items-center justify-center">
                <IconComponent 
                  size={18} 
                  className="transition-transform"
                  style={{ color: isActive ? (isDarkMode ? '#000000' : '#ffffff') : 'var(--doap-text-sec)' }} 
                />
                {isAITutorItem && isAIThinking && (
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-cyan-400 rounded-full animate-ping" />
                )}
                {isAITutorItem && !isAIThinking && hasAIUnread && (
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full" />
                )}
              </div>

              {!isSidebarCollapsed && (
                <span className="truncate text-xs font-semibold tracking-tight text-left flex-1 flex items-center justify-between">
                  <span>{item.label}</span>
                  {isAITutorItem && isAIThinking && (
                    <span className="px-1.5 py-0.5 rounded-full text-[9px] font-mono bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 animate-pulse font-bold">
                      Working...
                    </span>
                  )}
                  {isAITutorItem && !isAIThinking && hasAIUnread && (
                    <span className="px-1.5 py-0.5 rounded-full text-[9px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold">
                      Ready!
                    </span>
                  )}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </aside>
  );
};
