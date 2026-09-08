import React, { useState, useRef, useEffect } from 'react';
import { Menu, Sun, Moon, Monitor, PanelLeftOpen, MoreVertical, Settings, LogOut, LogIn } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { NAVIGATION_ITEMS } from '../../data/mockData';

export const Header = ({ onOpenMobileSidebar }) => {
  const { 
    currentPath, 
    navigateTo, 
    profile, 
    isDarkMode, 
    settings, 
    appearance, 
    updatePersonalization, 
    updateAppearance, 
    isSidebarHidden, 
    setIsSidebarHidden,
    setIsSettingsOpen
  } = useTheme();
  const { user, openAuthModal, signOut } = useAuth();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    };
    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  const activeSettings = settings || appearance || {};
  const currentItem = (NAVIGATION_ITEMS || []).find(i => i.path === currentPath) || { label: 'DOAP' };

  const handleUpdateMode = (mode) => {
    const fn = updatePersonalization || updateAppearance;
    if (fn) fn({ themeMode: mode });
  };

  return (
    <header 
      className="sticky top-0 z-30 border-b px-4 py-3 flex items-center justify-between transition-colors shadow-xs"
      style={{
        backgroundColor: isDarkMode ? 'rgba(7, 10, 18, 0.96)' : 'rgba(255, 255, 255, 0.96)',
        borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)',
        color: 'var(--text-primary, var(--doap-text-prim))',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)'
      }}
    >
      <div className="flex items-center gap-3">
        <button 
          onClick={onOpenMobileSidebar}
          className="md:hidden p-2 rounded-lg transition-colors cursor-pointer hover:opacity-80"
          style={{ color: 'var(--text-secondary, var(--doap-text-sec))' }}
          aria-label="Open navigation menu"
        >
          <Menu size={20} />
        </button>

        {isSidebarHidden && (
          <button 
            onClick={() => setIsSidebarHidden(false)}
            className="hidden md:flex p-1.5 px-2.5 rounded-xl border items-center gap-1.5 transition-all cursor-pointer hover:scale-105 shadow-sm"
            style={{ 
              borderColor: 'var(--border, var(--doap-border))', 
              color: 'var(--text-primary, var(--doap-text-prim))', 
              backgroundColor: 'var(--surface-elevated, var(--doap-surface-sec))' 
            }}
            title="Show Navigation Sidebar (Ctrl+B)"
          >
            <PanelLeftOpen size={16} className="text-cyan-400" />
            <span className="text-xs font-mono font-semibold">Menu</span>
          </button>
        )}

        <span className="font-bold text-base tracking-tight" style={{ color: 'var(--text-primary, var(--doap-text-prim))' }}>
          {currentItem.label}
        </span>
      </div>

      <div className="flex items-center gap-3">
        {/* Theme Mode Switcher Pill (Light / Dark / System) */}
        <div 
          className="flex items-center gap-1 p-1 rounded-full border"
          style={{ backgroundColor: 'var(--surface-elevated, var(--doap-surface-sec))', borderColor: 'var(--border, var(--doap-border))' }}
        >
          <button
            onClick={() => handleUpdateMode('light')}
            className={`p-1.5 rounded-full transition-all cursor-pointer ${
              activeSettings.themeMode === 'light'
                ? 'bg-white text-black font-bold shadow-xs'
                : 'hover:opacity-80'
            }`}
            style={{ color: activeSettings.themeMode === 'light' ? '#000000' : 'var(--text-secondary, var(--doap-text-sec))' }}
            title="Light Mode"
          >
            <Sun size={13} />
          </button>
          <button
            onClick={() => handleUpdateMode('dark')}
            className={`p-1.5 rounded-full transition-all cursor-pointer ${
              activeSettings.themeMode === 'dark'
                ? 'bg-white text-black font-bold shadow-xs'
                : 'hover:opacity-80'
            }`}
            style={{ color: activeSettings.themeMode === 'dark' ? '#000000' : 'var(--text-secondary, var(--doap-text-sec))' }}
            title="Dark Mode"
          >
            <Moon size={13} />
          </button>
          <button
            onClick={() => handleUpdateMode('system')}
            className={`px-2 py-0.5 rounded-full text-[10px] font-mono transition-all cursor-pointer ${
              activeSettings.themeMode === 'system'
                ? 'bg-white text-black font-bold shadow-xs'
                : 'hover:opacity-80'
            }`}
            style={{ color: activeSettings.themeMode === 'system' ? '#000000' : 'var(--text-secondary, var(--doap-text-sec))' }}
            title="System Preference Mode"
          >
            AUTO
          </button>
        </div>

        {/* Three Dots Menu (Settings & Sign Out/In) */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer border hover:opacity-90 active:scale-95"
            style={{
              backgroundColor: isMenuOpen
                ? (isDarkMode ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.1)')
                : 'var(--surface-elevated, var(--doap-surface-sec))',
              borderColor: 'var(--border, var(--doap-border))',
              color: 'var(--text-primary, var(--doap-text-prim))'
            }}
            title="Options & Settings"
            aria-label="Options"
            aria-expanded={isMenuOpen}
          >
            <MoreVertical size={16} />
          </button>

          {isMenuOpen && (
            <div 
              className="absolute right-0 mt-2 w-48 rounded-2xl border p-1.5 shadow-2xl z-50 animate-scale-in"
              style={{
                backgroundColor: isDarkMode ? 'rgba(13, 17, 27, 0.98)' : 'rgba(255, 255, 255, 0.98)',
                borderColor: 'var(--border, var(--doap-border))',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
                boxShadow: isDarkMode ? '0 16px 40px -10px rgba(0, 0, 0, 0.8)' : '0 16px 40px -10px rgba(0, 0, 0, 0.15)'
              }}
            >
              {/* Settings Option */}
              <button
                type="button"
                onClick={() => {
                  setIsMenuOpen(false);
                  setIsSettingsOpen(true);
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer hover:bg-white/10 text-left border-0 outline-none"
                style={{ color: 'var(--text-primary, var(--doap-text-prim))' }}
              >
                <Settings size={15} className="text-cyan-400 shrink-0" />
                <span>Settings</span>
              </button>

              {/* Sign Out / Sign In Option */}
              {user ? (
                <button
                  type="button"
                  onClick={() => {
                    setIsMenuOpen(false);
                    signOut();
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer hover:bg-rose-500/10 text-rose-400 text-left border-0 outline-none mt-0.5"
                >
                  <LogOut size={15} className="shrink-0" />
                  <span>Sign Out</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setIsMenuOpen(false);
                    openAuthModal('login');
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer hover:bg-cyan-500/10 text-cyan-400 text-left border-0 outline-none mt-0.5"
                >
                  <LogIn size={15} className="shrink-0" />
                  <span>Sign In</span>
                </button>
              )}
            </div>
          )}
        </div>

        {user ? (
          <div 
            onClick={() => navigateTo('/profile')}
            className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs cursor-pointer transition-transform hover:scale-105 shadow-md border"
            style={{ backgroundColor: 'var(--accent, var(--doap-accent))', color: isDarkMode ? '#000000' : '#ffffff', borderColor: 'var(--border, var(--doap-border))' }}
          >
            {user.email ? user.email[0].toUpperCase() : (profile?.avatar || 'U')}
          </div>
        ) : (
          <button
            onClick={() => openAuthModal('login')}
            className="px-4 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer hover:opacity-80"
            style={{ backgroundColor: 'var(--surface-elevated, var(--doap-surface-sec))', borderColor: 'var(--border, var(--doap-border))', color: 'var(--text-primary, var(--doap-text-prim))' }}
          >
            Sign In
          </button>
        )}
      </div>
    </header>
  );
};
