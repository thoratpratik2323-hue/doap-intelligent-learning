import React from 'react';
import { Menu, Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { NAVIGATION_ITEMS } from '../../data/mockData';

export const Header = ({ onOpenMobileSidebar }) => {
  const { currentPath, navigateTo, profile, isDarkMode, settings, appearance, updatePersonalization, updateAppearance } = useTheme();
  const { user, openAuthModal } = useAuth();

  const activeSettings = settings || appearance || {};
  const currentItem = (NAVIGATION_ITEMS || []).find(i => i.path === currentPath) || { label: 'DOAP' };

  const handleUpdateMode = (mode) => {
    const fn = updatePersonalization || updateAppearance;
    if (fn) fn({ themeMode: mode });
  };

  return (
    <header 
      className="sticky top-0 z-30 border-b px-4 py-3 flex items-center justify-between transition-colors doap-glass"
      style={{
        backgroundColor: 'var(--surface, var(--doap-surface))',
        borderColor: 'var(--border, var(--doap-border))',
        color: 'var(--text-primary, var(--doap-text-prim))'
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
