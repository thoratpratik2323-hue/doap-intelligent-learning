import React, { useState, useRef, useEffect } from 'react';
import { Menu, Sun, Moon, Monitor, PanelLeftOpen, User, LogOut, LogIn, ChevronDown } from 'lucide-react';
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
        borderColor: isDarkMode ? 'rgba(147, 51, 234, 0.20)' : '#E2E8F0',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
      }}
    >
      {/* ── Left: Menu + Page Title ── */}
      <div className="flex items-center gap-3">
        {currentPath !== '/interview' && (
          <button
            onClick={onOpenMobileSidebar}
            className="md:hidden p-1.5 rounded transition-colors hover:bg-black/5 dark:hover:bg-white/10 cursor-pointer"
            style={{ color: isDarkMode ? '#94A3B8' : '#64748B' }}
            aria-label="Open menu"
          >
            <Menu size={19} />
          </button>
        )}

        {isSidebarHidden && currentPath !== '/interview' && (
          <button
            onClick={() => setIsSidebarHidden(false)}
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold border rounded transition-colors hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer"
            style={{ borderColor: isDarkMode ? 'rgba(147, 51, 234, 0.20)' : '#E2E8F0', color: isDarkMode ? '#94A3B8' : '#64748B' }}
            title="Show Sidebar"
          >
            <PanelLeftOpen size={14} className="text-[#9333EA]" />
            Menu
          </button>
        )}

        <div className="flex items-center gap-2">
          <div className="w-px h-4 opacity-20 hidden md:block" style={{ backgroundColor: isDarkMode ? '#94A3B8' : '#CBD5E1' }} />
          <span className="font-semibold text-sm tracking-tight" style={{ color: isDarkMode ? '#F8FAFC' : '#0F172A' }}>
            {currentItem.label}
          </span>
        </div>
      </div>

      {/* ── Right: User Avatar Dropdown ── */}
      <div className="flex items-center gap-2">
        {user ? (
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs cursor-pointer transition-transform hover:scale-105 border shrink-0"
              style={{
                backgroundColor: '#9333EA',
                color: '#ffffff',
                borderColor: 'rgba(147,51,234,0.4)',
              }}
              title={user.email || 'Profile & Menu'}
            >
              {user.email ? user.email[0].toUpperCase() : (profile?.avatar || 'U')}
            </button>

            {isMenuOpen && (
              <div
                className="absolute right-0 mt-2 w-48 rounded-2xl border shadow-2xl z-50 overflow-hidden"
                style={{
                  backgroundColor: isDarkMode ? '#0F1423' : '#ffffff',
                  borderColor: isDarkMode ? 'rgba(147, 51, 234, 0.20)' : '#E2E8F0',
                  boxShadow: '0 12px 32px rgba(0,0,0,0.12)',
                }}
              >
                {/* User email header */}
                <div className="px-3.5 py-2.5 border-b" style={{ borderColor: isDarkMode ? 'rgba(255,255,255,0.08)' : '#E2E8F0' }}>
                  <p className="text-[11px] font-semibold truncate" style={{ color: isDarkMode ? '#F8FAFC' : '#0F172A' }}>
                    {user.email || 'Developer'}
                  </p>
                </div>

                {/* Profile link */}
                <button
                  type="button"
                  onClick={() => { setIsMenuOpen(false); navigateTo('/profile'); }}
                  className="w-full flex items-center gap-2.5 px-3.5 py-2.5 text-xs font-medium transition-colors hover:bg-black/5 dark:hover:bg-white/5 text-left cursor-pointer"
                  style={{ color: isDarkMode ? '#F8FAFC' : '#0F172A' }}
                >
                  <User size={14} className="text-[#9333EA] shrink-0" />
                  Profile
                </button>

                {/* Dark Mode toggle */}
                <div
                  className="flex items-center justify-between px-3.5 py-2 border-t"
                  style={{ borderColor: isDarkMode ? 'rgba(255,255,255,0.08)' : '#E2E8F0' }}
                >
                  <div className="flex items-center gap-2">
                    {isDarkMode ? (
                      <Moon size={13} className="text-[#9333EA] shrink-0" />
                    ) : (
                      <Sun size={13} className="text-[#FF9E7D] shrink-0" />
                    )}
                    <span className="text-xs font-medium" style={{ color: isDarkMode ? '#F8FAFC' : '#0F172A' }}>
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

                {/* Sign Out */}
                <div className="border-t" style={{ borderColor: isDarkMode ? 'rgba(255,255,255,0.08)' : '#E2E8F0' }}>
                  <button
                    type="button"
                    onClick={() => { setIsMenuOpen(false); signOut(); }}
                    className="w-full flex items-center gap-2.5 px-3.5 py-2.5 text-xs font-medium transition-colors hover:bg-rose-500/10 text-rose-500 text-left cursor-pointer"
                  >
                    <LogOut size={14} className="shrink-0" />
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={() => openAuthModal('login')}
            className="px-4 py-1.5 text-xs font-semibold rounded-full bg-[#9333EA] text-white hover:bg-[#7e22ce] transition-colors cursor-pointer shadow-sm"
          >
            Sign In
          </button>
        )}
      </div>
    </header>
  );
};
