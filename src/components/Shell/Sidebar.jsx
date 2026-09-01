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
  Settings, 
  ChevronLeft,
  ChevronRight,
  LogIn,
  LogOut,
  Sun,
  Moon
} from 'lucide-react';
import { NAVIGATION_ITEMS } from '../../data/mockData';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';

const ICON_MAP = {
  Home: Home,
  Dashboard: LayoutDashboard,
  'AI Tutor': MessageSquare,
  'My Learning': BookOpen,
  'Study Plan': Calendar,
  'Coding Practice': Code,
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
    setIsSettingsOpen,
    isDarkMode,
    toggleThemeMode
  } = useTheme();

  const { user, signOut, openAuthModal, isDevBypass } = useAuth();

  const handleNavClick = (path) => {
    navigateTo(path);
    if (setIsMobileOpen) setIsMobileOpen(false);
  };

  return (
    <aside 
      className={`
        fixed top-0 left-0 bottom-0 z-40 border-r doap-glass
        flex flex-col justify-between transition-all duration-300 ease-in-out select-none
        ${isSidebarCollapsed ? 'w-20' : 'w-64 md:w-68'}
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}
      style={{
        backgroundColor: 'var(--doap-surface)',
        borderColor: 'var(--doap-border)',
        color: 'var(--doap-text-prim)'
      }}
    >
      {/* Sidebar Header / Logo */}
      <div className="p-5 flex items-center justify-between border-b" style={{ borderColor: 'var(--doap-border)' }}>
        <div 
          onClick={() => handleNavClick('/')} 
          className="flex items-center gap-3 cursor-pointer group"
        >
          {!isSidebarCollapsed ? (
            <div className="flex items-center gap-2">
              <span className="font-black text-2xl tracking-tighter" style={{ color: 'var(--doap-text-prim)' }}>
                DOAP
              </span>
              {isDevBypass && (
                <span className="px-1.5 py-0.5 rounded font-mono text-[9px] font-bold border" style={{ backgroundColor: 'var(--doap-surface-sec)', borderColor: 'var(--doap-border)', color: 'var(--doap-text-sec)' }}>
                  DEV MODE
                </span>
              )}
            </div>
          ) : (
            <span className="font-black text-xl tracking-tighter" style={{ color: 'var(--doap-text-prim)' }}>
              D
            </span>
          )}
        </div>

        {/* Desktop Collapse Toggle */}
        <button
          onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          className="hidden md:flex items-center justify-center w-7 h-7 rounded-xl transition-colors cursor-pointer hover:opacity-80"
          style={{ color: 'var(--doap-text-sec)' }}
          title={isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isSidebarCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1 scrollbar-none">
        {NAVIGATION_ITEMS.map((item) => {
          const IconComponent = ICON_MAP[item.label] || Home;
          const isActive = currentPath === item.path;

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
              <IconComponent 
                size={18} 
                className="shrink-0 transition-transform"
                style={{ color: isActive ? (isDarkMode ? '#000000' : '#ffffff') : 'var(--doap-text-sec)' }} 
              />

              {!isSidebarCollapsed && (
                <span className="truncate text-xs font-semibold tracking-tight text-left">
                  {item.label}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Sidebar Footer */}
      <div className="p-3 border-t space-y-1" style={{ borderColor: 'var(--doap-border)' }}>
        {user ? (
          <button
            onClick={signOut}
            className="w-full flex items-center gap-3.5 px-3.5 py-2 rounded-2xl transition-all text-xs font-semibold group cursor-pointer border-0 outline-none hover:opacity-80"
            style={{ color: 'var(--doap-text-sec)' }}
            title="Sign Out"
          >
            <LogOut size={17} className="shrink-0" />
            {!isSidebarCollapsed && <span>Sign Out</span>}
          </button>
        ) : (
          <button
            onClick={() => openAuthModal('login')}
            className="w-full flex items-center gap-3.5 px-3.5 py-2 rounded-2xl transition-all text-xs font-semibold group cursor-pointer border-0 outline-none hover:opacity-80"
            style={{ color: 'var(--doap-text-prim)' }}
            title="Sign In"
          >
            <LogIn size={17} className="shrink-0" />
            {!isSidebarCollapsed && <span>Sign In</span>}
          </button>
        )}

        <button
          onClick={() => setIsSettingsOpen(true)}
          className="w-full flex items-center gap-3.5 px-3.5 py-2 rounded-2xl transition-all text-xs font-semibold group cursor-pointer border-0 outline-none hover:opacity-80"
          style={{ color: 'var(--doap-text-sec)' }}
        >
          <Settings size={17} className="shrink-0" />
          {!isSidebarCollapsed && <span>Settings</span>}
        </button>
      </div>
    </aside>
  );
};
