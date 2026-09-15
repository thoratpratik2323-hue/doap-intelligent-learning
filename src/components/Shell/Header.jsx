import React, { useState, useRef, useEffect } from 'react';
import { Menu, Sun, Moon, Monitor, PanelLeftOpen, Settings, LogOut, LogIn, ChevronDown } from 'lucide-react';
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
      if (menuRef.current && !menuRef.current.contains(e.target)) setIsMenuOpen(false);
    };
    if (isMenuOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen]);

  const activeSettings = settings || appearance || {};
  const currentItem = (NAVIGATION_ITEMS || []).find(i => i.path === currentPath) || { label: 'Ziv' };

  const handleUpdateMode = (mode) => {
    const fn = updatePersonalization || updateAppearance;
    if (fn) fn({ themeMode: mode });
  };

  const themeOptions = [
    { mode: 'light', icon: Sun,     label: 'Light'  },
    { mode: 'dark',  icon: Moon,    label: 'Dark'   },
    { mode: 'system',icon: Monitor, label: 'System' },
  ];

  return (
    <header
      className="sticky top-0 z-30 border-b flex items-center justify-between px-5 h-14 transition-colors"
      style={{
        backgroundColor: isDarkMode ? 'rgba(11, 15, 25, 0.97)' : '#ffffff',
        borderColor: isDarkMode ? 'rgba(147, 51, 234, 0.20)' : 'rgba(14,165,233,0.15)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
      }}
    >
      {/* ── Left: Menu + Page Title ── */}
      <div className="flex items-center gap-3">
        {currentPath !== '/interview' && (
          <button
            onClick={onOpenMobileSidebar}
            className="md:hidden p-1.5 rounded transition-colors hover:bg-white/10 cursor-pointer"
            style={{ color: 'var(--doap-text-sec)' }}
            aria-label="Open menu"
          >
            <Menu size={19} />
          </button>
        )}

        {isSidebarHidden && currentPath !== '/interview' && (
          <button
            onClick={() => setIsSidebarHidden(false)}
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold border rounded transition-colors hover:bg-white/5 cursor-pointer"
            style={{ borderColor: 'var(--doap-border)', color: 'var(--doap-text-sec)' }}
            title="Show Sidebar"
          >
            <PanelLeftOpen size={14} className="text-[#9333EA]" />
            Menu
          </button>
        )}

        <div className="flex items-center gap-2">
          <div className="w-px h-4 opacity-20 hidden md:block" style={{ backgroundColor: 'var(--doap-text-sec)' }} />
          <span className="font-semibold text-sm tracking-tight" style={{ color: 'var(--doap-text-prim, #F8FAFC)' }}>
            {currentItem.label}
          </span>
        </div>
      </div>

      {/* ── Right: Menu + Avatar ── */}
      <div className="flex items-center gap-2">

        {/* User / Settings dropdown menu */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 border rounded text-xs font-semibold transition-colors cursor-pointer hover:bg-white/5"
            style={{
              borderColor: 'var(--doap-border)',
              color: 'var(--doap-text-sec)',
              backgroundColor: isMenuOpen ? 'rgba(147,51,234,0.12)' : 'var(--doap-surface-sec)',
            }}
            title="Settings & Menu"
          >
            <Settings size={13} />
            <ChevronDown size={11} className={`transition-transform ${isMenuOpen ? 'rotate-180' : ''}`} />
          </button>

          {isMenuOpen && (
            <div
              className="absolute right-0 mt-1.5 w-48 border rounded shadow-2xl z-50 overflow-hidden"
              style={{
                backgroundColor: isDarkMode ? '#0F1423' : '#ffffff',
                borderColor: 'var(--doap-border)',
                boxShadow: '0 12px 32px rgba(0,0,0,0.7)',
              }}
            >
              {/* Dark Mode On / Off Toggle */}
              <div
                className="flex items-center justify-between px-3.5 py-2.5 border-b"
                style={{ borderColor: 'var(--doap-border)' }}
              >
                <div className="flex items-center gap-2">
                  {isDarkMode ? (
                    <Moon size={13} className="text-[#9333EA] shrink-0" />
                  ) : (
                    <Sun size={13} className="text-[#FF9E7D] shrink-0" />
                  )}
                  <span className="text-xs font-medium" style={{ color: 'var(--doap-text-prim)' }}>
                    Dark Mode
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => handleUpdateMode(isDarkMode ? 'light' : 'dark')}
                  aria-label="Toggle dark mode"
                  className="relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none"
                  style={{ backgroundColor: isDarkMode ? '#9333EA' : 'rgba(148,163,184,0.3)' }}
                >
                  <span
                    className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      isDarkMode ? 'translate-x-4' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              <button
                type="button"
                onClick={() => { setIsMenuOpen(false); setIsSettingsOpen(true); }}
                className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs font-medium transition-colors hover:bg-white/5 text-left cursor-pointer"
                style={{ color: 'var(--doap-text-prim)' }}
              >
                <Settings size={13} className="text-[#9333EA] shrink-0" />
                Settings
              </button>
              <div className="border-t" style={{ borderColor: 'var(--doap-border)' }} />
              {user ? (
                <button
                  type="button"
                  onClick={() => { setIsMenuOpen(false); signOut(); }}
                  className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs font-medium transition-colors hover:bg-rose-500/8 text-rose-400 text-left cursor-pointer"
                >
                  <LogOut size={13} className="shrink-0" />
                  Sign Out
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => { setIsMenuOpen(false); openAuthModal('login'); }}
                  className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs font-medium transition-colors hover:bg-purple-500/10 text-[#9333EA] text-left cursor-pointer"
                >
                  <LogIn size={13} className="shrink-0" />
                  Sign In
                </button>
              )}
            </div>
          )}
        </div>

        {/* Avatar / Sign In button */}
        {user ? (
          <button
            onClick={() => navigateTo('/profile')}
            className="w-8 h-8 rounded flex items-center justify-center font-bold text-xs cursor-pointer transition-opacity hover:opacity-80 border shrink-0"
            style={{
              backgroundColor: '#9333EA',
              color: '#ffffff',
              borderColor: 'rgba(147,51,234,0.4)',
            }}
            title={user.email || 'Profile'}
          >
            {user.email ? user.email[0].toUpperCase() : (profile?.avatar || 'U')}
          </button>
        ) : (
          <button
            onClick={() => openAuthModal('login')}
            className="px-3 py-1.5 text-xs font-semibold border rounded transition-colors hover:bg-purple-500/10 cursor-pointer"
            style={{ borderColor: '#9333EA', color: '#9333EA' }}
          >
            Sign In
          </button>
        )}
      </div>
    </header>
  );
};
