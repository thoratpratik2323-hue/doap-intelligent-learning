import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { INITIAL_PROFILE } from '../data/mockData';
import {
  GRADIENT_THEMES,
  IPHONE_THEMES,
  ACCENT_COLORS,
  THEME_PRESETS,
  IPHONE_17_COLLECTION,
  ACCENT_SWATCHES,
} from '../data/gradientThemes';

// Re-export for backward compatibility
export { THEME_PRESETS, IPHONE_17_COLLECTION, ACCENT_SWATCHES, GRADIENT_THEMES, IPHONE_THEMES, ACCENT_COLORS };

const ThemeContext = createContext();

export const DEFAULT_PERSONALIZATION = {
  theme: 'monochrome',
  accent: 'neutral',
  background: 'default',       // 'default' | 'gradient' | 'animated'
  gradientStyle: 'subtle',     // 'subtle' | 'balanced' | 'dynamic'
  backgroundIntensity: 40,     // 0–100
  gradientDirection: 'diagonal',
  glassIntensity: 'subtle',    // 'subtle' | 'balanced' | 'strong'
  depth: 'subtle',
  borderStrength: 'subtle',
  shadowStrength: 'subtle',
  motion: 'full',
  hoverGlide: true,
  depthShift: true,
  parallax: false,
  smoothTransitions: true,
  themeMode: 'system',
  profileBackground: 'monochrome',
};

const GLASS_BLUR = { subtle: '12px', balanced: '20px', strong: '28px' };

export const ThemeProvider = ({ children }) => {
  const auth = useAuth();

  const [profile, setProfile] = useState(() => {
    try {
      const saved = localStorage.getItem('doap_profile');
      return saved ? { ...INITIAL_PROFILE, ...JSON.parse(saved) } : INITIAL_PROFILE;
    } catch {
      return INITIAL_PROFILE;
    }
  });

  useEffect(() => {
    if (auth?.profile) {
      setProfile(auth.profile);
    }
  }, [auth?.profile]);

  const [settings, setSettings] = useState(() => {
    try {
      // Try new key first, then legacy key
      const saved = localStorage.getItem('doap_personalization_v2')
        || localStorage.getItem('doap_personalization_theme');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object') {
          return { ...DEFAULT_PERSONALIZATION, ...parsed };
        }
      }
    } catch (e) {
      console.warn('[DOAP Theme] Invalid localStorage theme, falling back to default', e);
    }
    return { ...DEFAULT_PERSONALIZATION };
  });

  const [currentPath, setCurrentPath] = useState(() => {
    if (typeof window !== 'undefined' && window.location.pathname) {
      return window.location.pathname;
    }
    return '/';
  });
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isBrainVaultOpen, setIsBrainVaultOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Sync with browser Back/Forward buttons and URL changes
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // ─── Apply global CSS tokens on every settings change ────────────────────
  useEffect(() => {
    const root = document.documentElement;

    // Resolve effective dark/light mode
    const checkSystemDark = () =>
      window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const mode = settings?.themeMode || 'system';
    const effectiveDark =
      mode === 'system' ? checkSystemDark() : mode === 'dark';
    setIsDarkMode(effectiveDark);

    if (effectiveDark) root.classList.add('dark');
    else root.classList.remove('dark');

    // Resolve active theme
    const themeKey = settings?.theme || 'monochrome';
    const activeTheme = GRADIENT_THEMES[themeKey] || GRADIENT_THEMES.monochrome;
    const colors = effectiveDark ? activeTheme.dark : activeTheme.light;

    // Resolve accent
    const accentId = settings?.accent || 'neutral';
    const accentEntry = ACCENT_COLORS.find(a => a.id === accentId);
    const accentHex = (accentEntry && accentEntry.hex) ? accentEntry.hex : colors.accent;

    // ── Primary design tokens ──
    root.style.setProperty('--doap-bg', colors.bg);
    root.style.setProperty('--doap-surface', colors.surface);
    root.style.setProperty('--doap-surface-sec', colors.surfaceSec);
    root.style.setProperty('--doap-border', colors.border);
    root.style.setProperty('--doap-border-active', colors.borderActive);
    root.style.setProperty('--doap-text-prim', colors.textPrim);
    root.style.setProperty('--doap-text-sec', colors.textSec);
    root.style.setProperty('--doap-text-muted', colors.textMuted);
    root.style.setProperty('--doap-accent', accentHex);
    root.style.setProperty('--doap-accent-soft', colors.accentSoft);
    root.style.setProperty('--doap-glow', colors.glow);
    root.style.setProperty('--doap-shadow', colors.shadow);

    // ── Aliases for newer components ──
    root.style.setProperty('--background', colors.bg);
    root.style.setProperty('--background-secondary', colors.surfaceSec);
    root.style.setProperty('--surface', colors.surface);
    root.style.setProperty('--surface-elevated', colors.surfaceSec);
    root.style.setProperty('--border', colors.border);
    root.style.setProperty('--text-primary', colors.textPrim);
    root.style.setProperty('--text-secondary', colors.textSec);
    root.style.setProperty('--text-muted', colors.textMuted);
    root.style.setProperty('--accent', accentHex);
    root.style.setProperty('--glass-background', colors.surface);
    root.style.setProperty('--glass-border', colors.border);

    // ── Ambient background ──
    root.style.setProperty('--doap-bg-gradient', activeTheme.bgGradient);
    root.style.setProperty('--doap-orb1', activeTheme.orb1Color);
    root.style.setProperty('--doap-orb2', activeTheme.orb2Color);
    root.style.setProperty('--doap-bg-intensity', String((settings?.backgroundIntensity ?? 40) / 100));

    // ── Glass blur ──
    const blur = GLASS_BLUR[settings?.glassIntensity || 'subtle'];
    root.style.setProperty('--doap-glass-blur', blur);

    // ── Data attributes for CSS selectors ──
    root.setAttribute('data-theme', themeKey);
    root.setAttribute('data-glass', settings?.glassIntensity || 'subtle');
    root.setAttribute('data-depth', settings?.depth || 'subtle');
    root.setAttribute('data-motion', settings?.motion || 'full');
    root.setAttribute('data-bg-style', settings?.background || 'default');

    // ── Persist ──
    try {
      localStorage.setItem('doap_personalization_v2', JSON.stringify(settings));
    } catch { /* ignore */ }
  }, [settings]);

  // System dark mode listener
  useEffect(() => {
    if ((settings?.themeMode || 'system') !== 'system') return;
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handle = (e) => {
      setIsDarkMode(e.matches);
      document.documentElement.classList.toggle('dark', e.matches);
    };
    mq.addEventListener('change', handle);
    return () => mq.removeEventListener('change', handle);
  }, [settings?.themeMode]);

  // Persist profile
  useEffect(() => {
    try { localStorage.setItem('doap_profile', JSON.stringify(profile)); } catch { /* ignore */ }
  }, [profile]);

  const updatePersonalization = (newFields) =>
    setSettings(prev => ({ ...(prev || DEFAULT_PERSONALIZATION), ...newFields }));

  const resetPersonalization = () => setSettings({ ...DEFAULT_PERSONALIZATION });

  const toggleThemeMode = () => {
    setSettings(prev => {
      const p = prev || DEFAULT_PERSONALIZATION;
      const next =
        p.themeMode === 'system' ? (isDarkMode ? 'light' : 'dark')
        : p.themeMode === 'dark' ? 'light'
        : 'dark';
      return { ...p, themeMode: next };
    });
  };

  const updateProfile = (updatedFields) => {
    setProfile(prev => {
      const next = { ...prev, ...updatedFields };
      try {
        if (typeof localStorage !== 'undefined') {
          if (auth?.user?.uid) {
            localStorage.setItem(`doap_user_profile_${auth.user.uid}`, JSON.stringify(next));
          }
          localStorage.setItem('doap_profile', JSON.stringify(next));
        }
      } catch (e) {
        console.warn('[ThemeContext] Failed to persist profile locally:', e);
      }
      return next;
    });
    if (auth?.updateProfileData) {
      auth.updateProfileData(updatedFields);
    }
  };

  const navigateTo = (path) => {
    setCurrentPath(path);
    if (typeof window !== 'undefined' && window.location.pathname !== path) {
      window.history.pushState({}, '', path);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Derived accent values for components that read them
  const safeSettings = settings || DEFAULT_PERSONALIZATION;
  const accentEntry = ACCENT_COLORS.find(a => a.id === safeSettings.accent);
  const activeThemeColors = isDarkMode
    ? (GRADIENT_THEMES[safeSettings.theme]?.dark || GRADIENT_THEMES.monochrome.dark)
    : (GRADIENT_THEMES[safeSettings.theme]?.light || GRADIENT_THEMES.monochrome.light);
  const activeAccentHex = (accentEntry?.hex) || activeThemeColors.accent;
  const activeAccent = {
    id: safeSettings.accent,
    name: accentEntry?.name || 'Neutral',
    hex: activeAccentHex,
  };

  const contextValue = {
    profile, updateProfile,
    isDarkMode, toggleThemeMode,
    settings: safeSettings,
    appearance: safeSettings,  // backward compat alias
    updatePersonalization,
    updateAppearance: updatePersonalization,  // backward compat alias
    resetPersonalization,
    resetToDefaultAppearance: resetPersonalization,  // backward compat alias
    activeAccentHex,
    activeAccent,
    currentPath, navigateTo,
    isSidebarCollapsed, setIsSidebarCollapsed,
    isSettingsOpen, setIsSettingsOpen,
    isEditProfileOpen, setIsEditProfileOpen,
    isBrainVaultOpen, setIsBrainVaultOpen,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    // Safe fallback — never crash if called outside provider
    return {
      profile: INITIAL_PROFILE, updateProfile: () => {},
      isDarkMode: true, toggleThemeMode: () => {},
      settings: DEFAULT_PERSONALIZATION,
      appearance: DEFAULT_PERSONALIZATION,
      updatePersonalization: () => {}, updateAppearance: () => {},
      resetPersonalization: () => {}, resetToDefaultAppearance: () => {},
      activeAccentHex: '#e4e4e7',
      activeAccent: { id: 'neutral', name: 'Neutral', hex: '#e4e4e7' },
      currentPath: '/', navigateTo: () => {},
      isSidebarCollapsed: false, setIsSidebarCollapsed: () => {},
      isSettingsOpen: false, setIsSettingsOpen: () => {},
      isEditProfileOpen: false, setIsEditProfileOpen: () => {},
      isBrainVaultOpen: false, setIsBrainVaultOpen: () => {},
    };
  }
  return ctx;
};
