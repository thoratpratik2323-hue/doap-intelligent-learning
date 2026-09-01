import React, { useState } from 'react';
import { Sun, Moon, Monitor, RotateCcw, ChevronDown, MoveUpRight, ArrowRight } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { GRADIENT_THEMES, IPHONE_THEMES, ACCENT_COLORS } from '../../data/gradientThemes';
import { GradientPreview } from '../Common/GradientPreview';

// ─────────────────────────────────────────────────────────────
// Gradient Direction icons (SVG arrows)
// ─────────────────────────────────────────────────────────────
const DIR_OPTIONS = [
  { id: 'diagonal', label: '↗', title: 'Diagonal (135°)' },
  { id: 'vertical',  label: '↑', title: 'Vertical (top→bottom)' },
  { id: 'horizontal', label: '→', title: 'Horizontal (left→right)' },
  { id: 'radial',   label: '◎', title: 'Radial (center out)' },
  { id: 'conic',    label: '⟳', title: 'Conic sweep' },
];

// ─────────────────────────────────────────────────────────────
// Segmented control helper
// ─────────────────────────────────────────────────────────────
const Segment = ({ options, value, onChange }) => (
  <div
    className="inline-flex items-center gap-1 p-1 rounded-xl border"
    style={{ backgroundColor: 'var(--doap-surface-sec)', borderColor: 'var(--doap-border)' }}
  >
    {options.map(opt => {
      const active = opt.id === value;
      return (
        <button
          key={opt.id}
          onClick={() => onChange(opt.id)}
          title={opt.title || opt.label}
          className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer"
          style={{
            backgroundColor: active ? 'rgba(255,255,255,0.12)' : 'transparent',
            color: active ? 'var(--doap-text-prim)' : 'var(--doap-text-sec)',
            boxShadow: active ? '0 1px 4px rgba(0,0,0,0.35)' : 'none',
          }}
        >
          {opt.label}
        </button>
      );
    })}
  </div>
);

// ─────────────────────────────────────────────────────────────
// Section container
// ─────────────────────────────────────────────────────────────
const Section = ({ title, subtitle, children, className = '' }) => (
  <div className={`space-y-3 ${className}`}>
    {(title || subtitle) && (
      <div>
        {title && <p className="text-xs font-semibold" style={{ color: 'var(--doap-text-prim)' }}>{title}</p>}
        {subtitle && <p className="text-[11px] mt-0.5" style={{ color: 'var(--doap-text-sec)' }}>{subtitle}</p>}
      </div>
    )}
    {children}
  </div>
);

// ─────────────────────────────────────────────────────────────
// Main Appearance Page
// ─────────────────────────────────────────────────────────────
export const AppearancePage = () => {
  const { settings, updatePersonalization, resetPersonalization, isDarkMode } = useTheme();
  const s = settings || {};

  const [activeTab, setActiveTab] = useState('theme');

  const TABS = [
    { id: 'theme', label: 'Theme' },
    { id: 'gradients', label: 'Gradients' },
    { id: 'depth', label: 'Depth & Glass' },
    { id: 'animation', label: 'Animation' },
    { id: 'advanced', label: 'Advanced' },
  ];

  // ── Showcase cards (bottom row) ─────────────────────────────
  const glassShowcase = GRADIENT_THEMES[s.theme || 'monochrome'];
  const glassColors = isDarkMode ? glassShowcase.dark : glassShowcase.light;

  return (
    <div className="space-y-0 select-none animate-page-transition">
      {/* ── Page header ──────────────────────────────────────── */}
      <div className="pb-5">
        <h1 className="text-2xl font-bold tracking-tight" style={{ color: 'var(--doap-text-prim)' }}>
          Appearance
        </h1>
        <p className="text-sm mt-1" style={{ color: 'var(--doap-text-sec)' }}>
          Personalize your DOAP experience.
        </p>
      </div>

      {/* ── Tab navigation ───────────────────────────────────── */}
      <div
        className="flex items-center gap-1 p-1 rounded-2xl mb-6 w-fit border"
        style={{ backgroundColor: 'var(--doap-surface)', borderColor: 'var(--doap-border)' }}
      >
        {TABS.map(tab => {
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer"
              style={{
                backgroundColor: active ? 'rgba(255,255,255,0.1)' : 'transparent',
                color: active ? 'var(--doap-text-prim)' : 'var(--doap-text-sec)',
                boxShadow: active ? '0 1px 4px rgba(0,0,0,0.4)' : 'none',
              }}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* ── Main 2-column layout ─────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

        {/* LEFT PANEL (7 cols) — controls */}
        <div className="lg:col-span-7 space-y-5">
          <div
            className="p-5 rounded-2xl border space-y-6 doap-glass"
            style={{ backgroundColor: 'var(--doap-surface)', borderColor: 'var(--doap-border)' }}
          >
            {/* ── Theme Mode ────── */}
            <Section title="Theme Mode" subtitle="Choose your preferred theme mode.">
              <div className="grid grid-cols-3 gap-2.5">
                {[
                  { id: 'light', label: 'Light', Icon: Sun },
                  { id: 'dark',  label: 'Dark',  Icon: Moon },
                  { id: 'system',label: 'System', Icon: Monitor },
                ].map(({ id, label, Icon }) => {
                  const active = s.themeMode === id;
                  return (
                    <button
                      key={id}
                      onClick={() => updatePersonalization({ themeMode: id })}
                      className="flex flex-col items-center gap-2 py-4 rounded-2xl border transition-all duration-200 cursor-pointer hover-glide"
                      style={{
                        backgroundColor: active ? 'rgba(255,255,255,0.1)' : 'transparent',
                        borderColor: active ? 'var(--doap-border-active)' : 'var(--doap-border)',
                        color: active ? 'var(--doap-text-prim)' : 'var(--doap-text-sec)',
                        boxShadow: active ? '0 0 0 1px rgba(255,255,255,0.1) inset' : 'none',
                      }}
                    >
                      <Icon size={18} />
                      <span className="text-xs font-semibold">{label}</span>
                    </button>
                  );
                })}
              </div>
            </Section>

            {/* ── Divider ── */}
            <div className="h-px" style={{ backgroundColor: 'var(--doap-border)' }} />

            {/* ── Accent & Gradient ────── */}
            <div className="space-y-5">
              <div>
                <p className="text-sm font-semibold" style={{ color: 'var(--doap-text-prim)' }}>Accent & Gradient</p>
                <p className="text-[11px] mt-0.5" style={{ color: 'var(--doap-text-sec)' }}>
                  Customize your experience with beautiful gradients and accent colors.
                </p>
              </div>

              {/* Accent Color swatches */}
              <Section title="Accent Color" subtitle="Applied to buttons, highlights and interactive elements.">
                <div className="flex items-center gap-2 flex-wrap pt-1">
                  {ACCENT_COLORS.map(acc => {
                    const active = s.accent === acc.id;
                    return (
                      <button
                        key={acc.id}
                        title={acc.name}
                        onClick={() => updatePersonalization({ accent: acc.id })}
                        className="w-8 h-8 rounded-full border-2 transition-all duration-200 cursor-pointer flex items-center justify-center"
                        style={{
                          backgroundColor: acc.hex || 'transparent',
                          borderColor: active
                            ? 'rgba(255,255,255,0.7)'
                            : acc.hex ? 'transparent' : 'var(--doap-border)',
                          boxShadow: active ? '0 0 0 2px rgba(255,255,255,0.15)' : 'none',
                          transform: active ? 'scale(1.18)' : 'scale(1)',
                        }}
                      >
                        {/* Neutral = circle with X */}
                        {acc.id === 'neutral' && (
                          <svg width="12" height="12" viewBox="0 0 12 12">
                            <circle cx="6" cy="6" r="5" stroke="rgba(255,255,255,0.3)" strokeWidth="1" fill="none"/>
                            <line x1="2" y1="10" x2="10" y2="2" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2" strokeLinecap="round"/>
                          </svg>
                        )}
                      </button>
                    );
                  })}
                </div>
              </Section>

              {/* Gradient Style dropdown */}
              <Section title="Gradient Style" subtitle="Add life to your background with stunning gradients.">
                <div
                  className="flex items-center justify-between px-3.5 py-2.5 rounded-xl border cursor-pointer"
                  style={{ backgroundColor: 'var(--doap-surface-sec)', borderColor: 'var(--doap-border)', color: 'var(--doap-text-prim)' }}
                >
                  <span className="text-xs font-medium capitalize">{s.gradientStyle || 'Subtle'}</span>
                  <div className="flex items-center gap-2">
                    {['subtle','balanced','dynamic'].map(opt => (
                      <button
                        key={opt}
                        onClick={() => updatePersonalization({ gradientStyle: opt })}
                        className="text-[10px] px-2 py-0.5 rounded-md transition-all cursor-pointer capitalize font-mono"
                        style={{
                          backgroundColor: s.gradientStyle === opt ? 'rgba(255,255,255,0.12)' : 'transparent',
                          color: s.gradientStyle === opt ? 'var(--doap-text-prim)' : 'var(--doap-text-muted)',
                        }}
                      >
                        {opt}
                      </button>
                    ))}
                    <ChevronDown size={14} style={{ color: 'var(--doap-text-muted)' }} />
                  </div>
                </div>
              </Section>

              {/* Background Style */}
              <Section title="Background Style" subtitle="Choose how your background looks.">
                <Segment
                  options={[
                    { id: 'default', label: 'Solid' },
                    { id: 'gradient', label: 'Gradient' },
                    { id: 'animated', label: 'Animated' },
                  ]}
                  value={s.background || 'default'}
                  onChange={v => updatePersonalization({ background: v })}
                />
              </Section>

              {/* Background Intensity slider */}
              <Section title="Background Intensity">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px]" style={{ color: 'var(--doap-text-muted)' }}>Intensity</span>
                    <span className="text-[11px] font-mono" style={{ color: 'var(--doap-text-sec)' }}>
                      {s.backgroundIntensity ?? 40}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={s.backgroundIntensity ?? 40}
                    onChange={e => updatePersonalization({ backgroundIntensity: Number(e.target.value) })}
                    className="w-full h-1 rounded-full cursor-pointer appearance-none"
                    style={{ accentColor: 'var(--doap-accent)' }}
                  />
                </div>
              </Section>

              {/* Gradient Direction */}
              <Section title="Gradient Direction">
                <div className="flex items-center gap-2">
                  {DIR_OPTIONS.map(opt => {
                    const active = s.gradientDirection === opt.id;
                    return (
                      <button
                        key={opt.id}
                        title={opt.title}
                        onClick={() => updatePersonalization({ gradientDirection: opt.id })}
                        className="w-8 h-8 rounded-lg border flex items-center justify-center text-sm transition-all duration-150 cursor-pointer"
                        style={{
                          backgroundColor: active ? 'rgba(255,255,255,0.12)' : 'transparent',
                          borderColor: 'var(--doap-border)',
                          color: active ? 'var(--doap-text-prim)' : 'var(--doap-text-muted)',
                        }}
                      >
                        {opt.label}
                      </button>
                    );
                  })}
                </div>
              </Section>
            </div>

            {/* Reset */}
            <div className="pt-2 flex justify-end">
              <button
                onClick={resetPersonalization}
                className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-xl border transition-all cursor-pointer hover:opacity-80"
                style={{ borderColor: 'var(--doap-border)', color: 'var(--doap-text-sec)' }}
              >
                <RotateCcw size={12} />
                <span>Reset to defaults</span>
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL (5 cols) — gradient theme cards + iPhone collection */}
        <div className="lg:col-span-5 space-y-5">
          {/* ── Gradient Themes ── */}
          <div
            className="p-5 rounded-2xl border space-y-4 doap-glass"
            style={{ backgroundColor: 'var(--doap-surface)', borderColor: 'var(--doap-border)' }}
          >
            <div>
              <p className="text-sm font-semibold" style={{ color: 'var(--doap-text-prim)' }}>Gradient Themes</p>
              <p className="text-[11px] mt-0.5" style={{ color: 'var(--doap-text-sec)' }}>
                Choose from premium depth & gradient themes.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {Object.values(GRADIENT_THEMES).map(theme => (
                <GradientPreview
                  key={theme.id}
                  layers={theme.gradient}
                  name={theme.name}
                  subtitle={theme.subtitle}
                  selected={s.theme === theme.id}
                  animated={s.background === 'animated' && s.theme === theme.id}
                  onClick={() => updatePersonalization({ theme: theme.id })}
                  className="h-32"
                />
              ))}
            </div>
          </div>

          {/* ── iPhone 17 Collection ── */}
          <div
            className="p-5 rounded-2xl border space-y-4 doap-glass"
            style={{ backgroundColor: 'var(--doap-surface)', borderColor: 'var(--doap-border)' }}
          >
            <div>
              <p className="text-sm font-semibold" style={{ color: 'var(--doap-text-prim)' }}>iPhone 17 Collection</p>
              <p className="text-[11px] mt-0.5" style={{ color: 'var(--doap-text-sec)' }}>
                Inspired by iPhone 17 & 17 Pro color story.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2.5">
              {Object.values(IPHONE_THEMES).map(theme => (
                <GradientPreview
                  key={theme.id}
                  layers={theme.gradient}
                  name={theme.name}
                  selected={s.theme === theme.themeRef && s.profileBackground === theme.id}
                  animated={false}
                  onClick={() => updatePersonalization({ theme: theme.themeRef, profileBackground: theme.id })}
                  compact
                  className="h-20"
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom 3-column showcase row ─────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6">

        {/* Glassmorphism showcase */}
        <div
          className="p-5 rounded-2xl border space-y-4 doap-glass"
          style={{ backgroundColor: 'var(--doap-surface)', borderColor: 'var(--doap-border)' }}
        >
          <div>
            <p className="text-sm font-semibold" style={{ color: 'var(--doap-text-prim)' }}>Glassmorphism</p>
            <p className="text-[11px] mt-0.5" style={{ color: 'var(--doap-text-sec)' }}>
              Subtle translucent layers with depth.
            </p>
          </div>

          {/* Mock glass card preview */}
          <div
            className="p-4 rounded-xl border space-y-2 doap-glass"
            style={{ backgroundColor: 'var(--doap-surface-sec)', borderColor: 'var(--doap-border)' }}
          >
            <p className="text-[10px] font-mono" style={{ color: 'var(--doap-text-muted)' }}>Learning Progress</p>
            <p className="text-2xl font-black" style={{ color: 'var(--doap-text-prim)' }}>68%</p>
            <p className="text-[10px]" style={{ color: '#10b981' }}>+12% this week</p>
          </div>

          {/* Fake sidebar menu preview */}
          <div className="space-y-1.5">
            {['Profile','Settings','Billing','Sign Out'].map(item => (
              <div
                key={item}
                className="flex items-center gap-2 px-3 py-2 rounded-lg border"
                style={{ borderColor: 'var(--doap-border)', color: 'var(--doap-text-sec)' }}
              >
                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--doap-text-muted)' }} />
                <span className="text-xs">{item}</span>
              </div>
            ))}
          </div>

          {/* Search bar mock */}
          <div
            className="flex items-center gap-2 px-3 py-2 rounded-xl border doap-glass"
            style={{ borderColor: 'var(--doap-border)', color: 'var(--doap-text-muted)' }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" opacity="0.5">
              <circle cx="5" cy="5" r="4" stroke="currentColor" strokeWidth="1.5" fill="none"/>
              <line x1="8.5" y1="8.5" x2="11" y2="11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <span className="text-[11px]">Search...</span>
          </div>

          {/* AI assistant mock */}
          <div
            className="flex items-center justify-between px-3 py-2.5 rounded-xl border doap-glass"
            style={{ borderColor: 'var(--doap-border)' }}
          >
            <div>
              <p className="text-xs font-semibold" style={{ color: 'var(--doap-text-prim)' }}>AI Assistant</p>
              <p className="text-[10px]" style={{ color: 'var(--doap-text-muted)' }}>How can I help you today?</p>
            </div>
            <div
              className="w-5 h-5 rounded-md flex items-center justify-center border text-[10px]"
              style={{ borderColor: 'var(--doap-border)', color: 'var(--doap-text-muted)' }}
            >+</div>
          </div>
        </div>

        {/* Advanced Animations showcase */}
        <div
          className="p-5 rounded-2xl border space-y-4 doap-glass"
          style={{ backgroundColor: 'var(--doap-surface)', borderColor: 'var(--doap-border)' }}
        >
          <div>
            <p className="text-sm font-semibold" style={{ color: 'var(--doap-text-prim)' }}>Advanced Animations</p>
            <p className="text-[11px] mt-0.5" style={{ color: 'var(--doap-text-sec)' }}>
              Smooth. Natural. Purposeful.
            </p>
          </div>

          <div className="space-y-3">
            {[
              { label: 'Hover Glide', desc: 'Elements glide with friction.', key: 'hoverGlide' },
              { label: 'Depth Shift', desc: 'Layered depth on interaction.', key: 'depthShift' },
              { label: 'Parallax Layers', desc: 'Background moves at different speeds.', key: 'parallax' },
              { label: 'Smooth Transitions', desc: 'Page transitions feel like butter.', key: 'smoothTransitions' },
            ].map(({ label, desc, key }) => {
              const enabled = s[key] !== false;
              return (
                <div
                  key={key}
                  className="flex items-start gap-3 p-3 rounded-xl border transition-all cursor-pointer hover-glide"
                  style={{ borderColor: 'var(--doap-border)', backgroundColor: 'var(--doap-surface-sec)' }}
                  onClick={() => updatePersonalization({ [key]: !enabled })}
                >
                  <div
                    className="w-8 h-8 rounded-lg border flex items-center justify-center shrink-0 mt-0.5"
                    style={{
                      borderColor: 'var(--doap-border)',
                      backgroundColor: enabled ? 'var(--doap-accent-soft)' : 'transparent',
                    }}
                  >
                    <div
                      className="w-2 h-2 rounded-sm"
                      style={{ backgroundColor: enabled ? 'var(--doap-accent)' : 'var(--doap-text-muted)' }}
                    />
                  </div>
                  <div>
                    <p className="text-xs font-semibold" style={{ color: 'var(--doap-text-prim)' }}>{label}</p>
                    <p className="text-[10px] mt-0.5" style={{ color: 'var(--doap-text-muted)' }}>{desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Hover & Depth Effects showcase */}
        <div
          className="p-5 rounded-2xl border space-y-4 doap-glass"
          style={{ backgroundColor: 'var(--doap-surface)', borderColor: 'var(--doap-border)' }}
        >
          <div>
            <p className="text-sm font-semibold" style={{ color: 'var(--doap-text-prim)' }}>Hover & Depth Effects</p>
            <p className="text-[11px] mt-0.5" style={{ color: 'var(--doap-text-sec)' }}>
              Everything responds. Beautifully.
            </p>
          </div>

          {/* Demo hover card */}
          <div
            className="p-4 rounded-xl border hover-glide transition-all cursor-pointer"
            style={{ borderColor: 'var(--doap-border)', backgroundColor: 'var(--doap-surface-sec)' }}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold" style={{ color: 'var(--doap-text-prim)' }}>Project Phoenix</p>
                <p className="text-[10px] mt-0.5" style={{ color: 'var(--doap-text-muted)' }}>AI-powered career platform</p>
              </div>
              <MoveUpRight size={14} style={{ color: 'var(--doap-text-muted)' }} />
            </div>
            <div className="flex gap-1 mt-3">
              {[0,1,2].map(i => (
                <div
                  key={i}
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: i === 0 ? 'var(--doap-accent)' : 'var(--doap-border)' }}
                />
              ))}
            </div>
          </div>

          <p className="text-[10px] font-semibold" style={{ color: 'var(--doap-text-sec)' }}>Depth on Hover</p>
          <p className="text-[10px]" style={{ color: 'var(--doap-text-muted)' }}>Cards lift and reveal depth.</p>

          <div className="flex gap-1.5 flex-wrap">
            {['⟲','⚡','☆','⊞','⬡'].map((icon, i) => (
              <div
                key={i}
                className="w-8 h-8 rounded-lg border flex items-center justify-center text-sm transition-all cursor-pointer hover-glide"
                style={{ borderColor: 'var(--doap-border)', color: 'var(--doap-text-sec)' }}
              >
                {icon}
              </div>
            ))}
          </div>

          <p className="text-[10px] font-semibold" style={{ color: 'var(--doap-text-sec)' }}>Button Hover</p>
          <p className="text-[10px]" style={{ color: 'var(--doap-text-muted)' }}>Glide. Glow. Elevate.</p>

          <div className="flex gap-2">
            <button
              className="flex-1 py-2 px-3 rounded-xl border text-[11px] font-semibold flex items-center justify-center gap-1 hover-glide transition-all"
              style={{ borderColor: 'var(--doap-border)', color: 'var(--doap-text-prim)' }}
            >
              Get Started <ArrowRight size={11} />
            </button>
            <button
              className="flex-1 py-2 px-3 rounded-xl text-[11px] font-semibold flex items-center justify-center gap-1 hover-glide transition-all"
              style={{ backgroundColor: 'var(--doap-accent)', color: '#000' }}
            >
              Get Started <ArrowRight size={11} />
            </button>
          </div>
        </div>
      </div>

      {/* ── Profile Background Personalization ───────────────── */}
      <div
        className="mt-5 p-5 rounded-2xl border space-y-4 doap-glass"
        style={{ backgroundColor: 'var(--doap-surface)', borderColor: 'var(--doap-border)' }}
      >
        <div>
          <p className="text-sm font-semibold" style={{ color: 'var(--doap-text-prim)' }}>Profile Background Personalization</p>
          <p className="text-[11px] mt-0.5" style={{ color: 'var(--doap-text-sec)' }}>Make your profile truly yours.</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {[
            ...Object.values(GRADIENT_THEMES).slice(0, 3),
            ...Object.values(IPHONE_THEMES).slice(0, 3),
          ].map((theme, idx) => {
            const layers = theme.gradient;
            const isSelected = s.profileBackground === theme.id;
            return (
              <GradientPreview
                key={theme.id}
                layers={layers}
                selected={isSelected}
                name=""
                onClick={() => updatePersonalization({ profileBackground: theme.id })}
                compact
                className="h-16 rounded-xl"
              />
            );
          })}
        </div>
      </div>

      {/* ── Footer tagline ────────────────────────────────────── */}
      <div className="pt-8 pb-2 text-center">
        <p className="text-[11px] font-mono" style={{ color: 'var(--doap-text-muted)' }}>
          DOAP — Designed for the future. Built for you.
        </p>
      </div>
    </div>
  );
};
