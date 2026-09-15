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
        backgroundColor: 'rgba(255, 255, 255, 0.96)',
        borderColor: 'rgba(14, 165, 233, 0.15)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
      }}
    >
      {/* ── Left: Menu + Page Title ── */}
      <div className="flex items-center gap-3">
        {currentPath !== '/interview' && (
          <button
            onClick={onOpenMobileSidebar}
            className="md:hidden p-1.5 rounded transition-colors hover:bg-sky-50 text-slate-600 cursor-pointer"
            aria-label="Open menu"
          >
            <Menu size={19} />
          </button>
        )}

        {isSidebarHidden && currentPath !== '/interview' && (
          <button
            onClick={() => setIsSidebarHidden(false)}
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold border border-sky-200/70 rounded-lg transition-colors hover:bg-sky-50 text-slate-700 cursor-pointer shadow-sm"
            title="Show Sidebar"
          >
            <PanelLeftOpen size={14} className="text-sky-600" />
            Menu
          </button>
        )}

        <div className="flex items-center gap-2">
          <div className="w-px h-4 opacity-20 hidden md:block bg-slate-300" />
          <span className="font-bold text-sm tracking-tight text-[#0F172A]">
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
              className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs cursor-pointer transition-transform hover:scale-105 border shrink-0 bg-gradient-to-tr from-sky-600 to-blue-700 text-white shadow-md shadow-sky-500/20"
              style={{
                borderColor: 'rgba(14, 165, 233, 0.3)',
              }}
              title={user.email || 'Profile & Menu'}
            >
              {user.email ? user.email[0].toUpperCase() : (profile?.avatar || 'U')}
            </button>

            {isMenuOpen && (
              <div
                className="absolute right-0 mt-2 w-48 rounded-2xl border shadow-2xl z-50 overflow-hidden backdrop-blur-xl"
                style={{
                  backgroundColor: isDarkMode ? 'rgba(15, 23, 42, 0.95)' : '#ffffff',
                  borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.08)' : '#E2E8F0',
                  boxShadow: '0 12px 32px rgba(0,0,0,0.3)',
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
                  <User size={14} className="text-[#8B5CF6] shrink-0" />
                  Profile
                </button>



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
            className="px-4 py-1.5 text-xs font-semibold rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white transition-all cursor-pointer shadow-md shadow-violet-500/25"
          >
            Sign In
          </button>
        )}
      </div>
    </header>
  );
};
