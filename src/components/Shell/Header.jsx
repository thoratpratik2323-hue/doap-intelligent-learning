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
        backgroundColor: isDarkMode ? '#060e22' : '#ffffff',
        borderColor: isDarkMode ? 'rgba(56,189,248,0.12)' : 'rgba(14,165,233,0.15)',
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
            <PanelLeftOpen size={14} className="text-[#38bdf8]" />
            Menu
          </button>
        )}

        <div className="flex items-center gap-2">
          <div className="w-px h-4 opacity-20 hidden md:block" style={{ backgroundColor: 'var(--doap-text-sec)' }} />
          <span className="font-semibold text-sm tracking-tight" style={{ color: 'var(--doap-text-prim, #ffffff)' }}>
            {currentItem.label}
          </span>
        </div>
      </div>

      {/* ── Right: Theme + Menu + Avatar ── */}
      <div className="flex items-center gap-2">

        {/* Theme switcher — segmented control */}
        <div
          className="flex items-center border rounded overflow-hidden"
          style={{ borderColor: 'var(--doap-border)', backgroundColor: 'var(--doap-surface-sec)' }}
        >
          {themeOptions.map(({ mode, icon: Icon, label }) => {
            const isActive = activeSettings.themeMode === mode;
            return (
              <button
                key={mode}
                onClick={() => handleUpdateMode(mode)}
                title={`${label} Mode`}
                className="flex items-center gap-1 px-2.5 py-1.5 text-[10px] font-semibold transition-colors cursor-pointer border-0 outline-none"
                style={{
                  backgroundColor: isActive ? '#38bdf8' : 'transparent',
                  color: isActive ? '#050c1e' : 'var(--doap-text-sec)',
                }}
              >
                <Icon size={11} />
                <span className="hidden sm:inline">{label}</span>
              </button>
            );
          })}
        </div>

        {/* Three-dot / user menu */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 border rounded text-xs font-semibold transition-colors cursor-pointer hover:bg-white/5"
            style={{
              borderColor: 'var(--doap-border)',
              color: 'var(--doap-text-sec)',
              backgroundColor: isMenuOpen ? 'rgba(56,189,248,0.08)' : 'var(--doap-surface-sec)',
            }}
          >
            <Settings size={13} />
            <ChevronDown size={11} className={`transition-transform ${isMenuOpen ? 'rotate-180' : ''}`} />
          </button>

          {isMenuOpen && (
            <div
              className="absolute right-0 mt-1.5 w-44 border rounded shadow-2xl z-50 overflow-hidden"
              style={{
                backgroundColor: isDarkMode ? '#0b1426' : '#ffffff',
                borderColor: 'var(--doap-border)',
                boxShadow: '0 12px 32px rgba(0,0,0,0.5)',
              }}
            >
              <button
                type="button"
                onClick={() => { setIsMenuOpen(false); setIsSettingsOpen(true); }}
                className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs font-medium transition-colors hover:bg-white/5 text-left cursor-pointer"
                style={{ color: 'var(--doap-text-prim)' }}
              >
                <Settings size={13} className="text-[#38bdf8] shrink-0" />
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
                  className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs font-medium transition-colors hover:bg-[#38bdf8]/8 text-[#38bdf8] text-left cursor-pointer"
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
              backgroundColor: '#38bdf8',
              color: '#050c1e',
              borderColor: 'rgba(56,189,248,0.4)',
            }}
            title={user.email || 'Profile'}
          >
            {user.email ? user.email[0].toUpperCase() : (profile?.avatar || 'U')}
          </button>
        ) : (
          <button
            onClick={() => openAuthModal('login')}
            className="px-3 py-1.5 text-xs font-semibold border rounded transition-colors hover:bg-[#38bdf8]/10 cursor-pointer"
            style={{ borderColor: '#38bdf8', color: '#38bdf8' }}
          >
            Sign In
          </button>
        )}
      </div>
    </header>
  );
};
