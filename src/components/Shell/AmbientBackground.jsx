import React from 'react';
import { useTheme } from '../../context/ThemeContext';

export const AmbientBackground = ({ children }) => {
  const { isDarkMode, settings } = useTheme();

  const bgStyle  = settings?.background || 'default';
  const intensity = (settings?.backgroundIntensity ?? 40) / 100;
  const isGradient = bgStyle === 'gradient' || bgStyle === 'animated';
  const isAnimated = bgStyle === 'animated';

  return (
    <div
      className="min-h-screen w-full font-sans relative overflow-hidden transition-colors duration-500"
      style={{
        backgroundColor: 'var(--doap-bg, #0b0c10)',
        color: 'var(--doap-text-prim, #f5f5f5)',
      }}
    >
      {/* ── Ambient gradient atmosphere (only when gradient/animated) ── */}
      {isGradient && (
        <div
          className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
          style={{ opacity: intensity }}
        >
          {/* Primary orb — top-left */}
          <div
            className={`absolute -top-[20%] -left-[15%] w-[70vw] h-[70vw] rounded-full blur-[180px] ${isAnimated ? 'animate-orb-1' : ''}`}
            style={{ backgroundColor: 'var(--doap-orb1, #333333)' }}
          />

          {/* Secondary orb — bottom-right */}
          <div
            className={`absolute -bottom-[25%] -right-[15%] w-[65vw] h-[65vw] rounded-full blur-[160px] ${isAnimated ? 'animate-orb-2' : ''}`}
            style={{ backgroundColor: 'var(--doap-orb2, #222222)' }}
          />

          {/* Subtle dot-grid overlay */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: isDarkMode
                ? 'radial-gradient(rgba(255,255,255,0.4) 1px, transparent 1px)'
                : 'radial-gradient(rgba(0,0,0,0.3) 1px, transparent 1px)',
              backgroundSize: '32px 32px',
              opacity: 0.04,
            }}
          />
        </div>
      )}

      {/* ── Main content ── */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};
