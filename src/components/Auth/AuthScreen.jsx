import React, { useState, useEffect } from 'react';
import { Mail, Lock, User, AlertCircle, CheckCircle2, Eye, EyeOff, Sparkles, ArrowRight, ArrowLeft, Brain, Zap, Star, Shield } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

/* ───────────────────────────────────────────
   Floating particle that drifts upward
─────────────────────────────────────────── */
const Particle = ({ style }) => (
  <div
    className="absolute rounded-full pointer-events-none"
    style={{
      width: style.size,
      height: style.size,
      left: style.left,
      bottom: '-20px',
      background: style.color,
      opacity: style.opacity,
      animation: `floatUp ${style.duration}s ${style.delay}s ease-in infinite`,
    }}
  />
);

const PARTICLES = Array.from({ length: 22 }, (_, i) => ({
  id: i,
  size: `${Math.random() * 8 + 3}px`,
  left: `${Math.random() * 100}%`,
  color: i % 3 === 0 ? '#38bdf8' : i % 3 === 1 ? '#ffffff' : '#7dd3fc',
  opacity: Math.random() * 0.35 + 0.08,
  duration: Math.random() * 10 + 8,
  delay: Math.random() * 10,
}));

/* ───────────────────────────────────────────
   Feature pill shown on left panel
─────────────────────────────────────────── */
const FeaturePill = ({ icon: Icon, text }) => (
  <div className="flex items-center gap-2.5 bg-white/[0.06] border border-[#38bdf8]/20 rounded-full px-4 py-2.5 backdrop-blur-sm">
    <Icon size={14} className="text-[#38bdf8] shrink-0" />
    <span className="text-xs font-medium text-white/80">{text}</span>
  </div>
);

/* ───────────────────────────────────────────
   Input Field
─────────────────────────────────────────── */
const InputField = ({ id, name, label, type, placeholder, value, onChange, icon: Icon, rightSlot, disabled, autoComplete, required }) => (
  <div className="space-y-1.5">
    <label htmlFor={id} className="block text-[10px] font-mono uppercase tracking-[0.15em] text-[#38bdf8]/80 ml-0.5">
      {label}
    </label>
    <div className="relative group">
      <Icon size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#38bdf8]/50 group-focus-within:text-[#38bdf8] transition-colors duration-200 pointer-events-none" />
      <input
        id={id}
        name={name}
        autoComplete={autoComplete}
        type={type}
        required={required}
        disabled={disabled}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full pl-11 pr-11 py-3 rounded-xl border border-white/10 bg-white/[0.04] text-white text-sm placeholder-white/25 focus:outline-none focus:border-[#38bdf8]/60 focus:bg-white/[0.07] transition-all duration-200 disabled:opacity-50 font-medium"
      />
      {rightSlot}
    </div>
  </div>
);

/* ═══════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════ */
export const AuthScreen = ({ initialMode = 'login', onBackToLanding }) => {
  const { signIn, signUp, resetPassword, signInAsGuest, isDevBypass } = useAuth();

  const [mode, setMode] = useState(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => { setMode(initialMode); }, [initialMode]);

  const handleModeSwitch = (newMode) => {
    if (isSubmitting) return;
    setMode(newMode);
    setErrorMessage('');
    setSuccessMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setErrorMessage('');
    setSuccessMessage('');

    if (mode === 'signup') {
      if (password.length < 8) { setErrorMessage('Password must be at least 8 characters.'); return; }
      if (password !== confirmPassword) { setErrorMessage('Passwords do not match.'); return; }
    }

    setIsSubmitting(true);
    try {
      if (mode === 'login') {
        await signIn(email, password);
      } else if (mode === 'signup') {
        const res = await signUp(email, password, fullName);
        setSuccessMessage(res?.session
          ? 'Account created! Launching your DOAP workspace...'
          : 'Almost there! Check your email to confirm your account.'
        );
      } else if (mode === 'reset') {
        await resetPassword(email);
        setSuccessMessage('Password reset link sent to your email.');
      }
    } catch (err) {
      setErrorMessage(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ─── CSS keyframes injected once ─── */
  const keyframeStyle = `
    @keyframes floatUp {
      0%   { transform: translateY(0) scale(1);   opacity: var(--op, 0.18); }
      50%  { transform: translateY(-45vh) scale(1.4); opacity: calc(var(--op, 0.18) * 0.6); }
      100% { transform: translateY(-90vh) scale(0.6); opacity: 0; }
    }
    @keyframes pulseGlow {
      0%, 100% { box-shadow: 0 0 0 0 rgba(56,189,248,0.0); }
      50%       { box-shadow: 0 0 32px 8px rgba(56,189,248,0.18); }
    }
    @keyframes slideInRight {
      from { opacity: 0; transform: translateX(24px); }
      to   { opacity: 1; transform: translateX(0); }
    }
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(16px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes shimmer {
      0%   { background-position: -200% center; }
      100% { background-position:  200% center; }
    }
  `;

  return (
    <>
      <style>{keyframeStyle}</style>

      {/* ── Full-screen dark blue background ── */}
      <div className="min-h-screen bg-[#050c1e] flex items-center justify-center relative overflow-hidden select-none font-sans">

        {/* Radial glow blobs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-[#38bdf8]/[0.04] blur-[120px]" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-[#0a3a6e]/30 blur-[100px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] rounded-full bg-[#38bdf8]/[0.025] blur-[80px]" />
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {PARTICLES.map(p => <Particle key={p.id} style={p} />)}
        </div>

        {/* ── Two-column card ── */}
        <div className="relative z-10 w-full max-w-5xl mx-4 flex rounded-3xl overflow-hidden border border-[#38bdf8]/10 shadow-2xl shadow-black/60"
          style={{ animation: 'fadeInUp 0.5s ease both' }}>

          {/* ════ LEFT PANEL — Branding ════ */}
          <div className="hidden lg:flex flex-col justify-between w-[48%] bg-gradient-to-br from-[#071428] via-[#071e3d] to-[#050c1e] p-10 relative overflow-hidden border-r border-[#38bdf8]/10">

            {/* Grid overlay */}
            <div className="absolute inset-0 opacity-[0.025]"
              style={{ backgroundImage: 'linear-gradient(#38bdf8 1px,transparent 1px),linear-gradient(90deg,#38bdf8 1px,transparent 1px)', backgroundSize: '36px 36px' }} />

            {/* Top: Logo + back */}
            <div>
              {onBackToLanding && (
                <button type="button" onClick={onBackToLanding}
                  className="flex items-center gap-1.5 text-[#38bdf8]/60 hover:text-[#38bdf8] text-xs font-medium mb-8 transition-colors duration-200 cursor-pointer">
                  <ArrowLeft size={13} /> Back to Home
                </button>
              )}
              <div className="flex items-center gap-3 mb-2">
                <img src="/doap-logo.jpg" alt="DOAP" className="h-10 rounded-xl object-contain" />
                <div>
                  <p className="text-white font-bold text-xl tracking-tight leading-none">DOAP</p>
                  <p className="text-[#38bdf8]/60 text-[9px] font-mono uppercase tracking-widest mt-0.5">
                    Intelligent Learning
                  </p>
                </div>
              </div>
            </div>

            {/* Center: Headline */}
            <div className="my-6">
              <h2 className="text-3xl font-bold text-white leading-tight mb-3">
                India's First<br />
                <span style={{
                  background: 'linear-gradient(90deg,#38bdf8,#7dd3fc,#38bdf8)',
                  backgroundSize: '200% auto',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  animation: 'shimmer 3s linear infinite',
                }}>
                  Voice-First AI<br />Tutor Platform
                </span>
              </h2>
              <p className="text-white/50 text-sm leading-relaxed max-w-xs">
                Department-aware, exam-focused learning built specifically for Indian college students.
              </p>

              {/* Feature pills */}
              <div className="flex flex-wrap gap-2.5 mt-6">
                <FeaturePill icon={Brain}   text="AI Voice Tutor" />
                <FeaturePill icon={Zap}     text="Exam Prep" />
                <FeaturePill icon={Star}    text="Mock Interviews" />
                <FeaturePill icon={Shield}  text="Dept. Syllabus" />
              </div>
            </div>

            {/* Bottom: testimonial */}
            <div className="bg-white/[0.04] border border-[#38bdf8]/15 rounded-2xl p-5">
              <p className="text-white/70 text-xs leading-relaxed italic mb-3">
                "DOAP ki AI Tutor ne meri semester exam preparation completely change kar di. Har concept voice mein explain hota hai — bilkul tuition jaisa!"
              </p>
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#38bdf8] to-[#0ea5e9] flex items-center justify-center text-[10px] font-bold text-white">P</div>
                <div>
                  <p className="text-white text-[11px] font-semibold">Pratham K.</p>
                  <p className="text-white/40 text-[10px]">CS Engineering, Pune</p>
                </div>
              </div>
            </div>
          </div>

          {/* ════ RIGHT PANEL — Form ════ */}
          <div className="flex-1 bg-[#060d20]/95 backdrop-blur-2xl p-8 md:p-10 flex flex-col justify-center"
            style={{ animation: 'slideInRight 0.45s 0.1s ease both' }}>

            {/* Mobile: back + logo */}
            <div className="flex items-center justify-between mb-7 lg:hidden">
              <div className="flex items-center gap-2">
                <img src="/doap-logo.jpg" alt="DOAP" className="h-7 rounded-lg object-contain" />
                <span className="text-white font-bold text-base">DOAP</span>
              </div>
              {onBackToLanding && (
                <button type="button" onClick={onBackToLanding}
                  className="text-[#38bdf8]/60 hover:text-[#38bdf8] text-xs font-medium flex items-center gap-1 transition-colors cursor-pointer">
                  <ArrowLeft size={12} /> Back
                </button>
              )}
            </div>

            {/* Mode tabs */}
            {mode !== 'reset' && (
              <div className="flex bg-white/[0.04] border border-white/[0.07] rounded-xl p-1 mb-7 gap-1">
                {['login', 'signup'].map(m => (
                  <button key={m} type="button"
                    onClick={() => handleModeSwitch(m)}
                    disabled={isSubmitting}
                    className={`flex-1 py-2.5 text-xs font-semibold rounded-lg transition-all duration-200 cursor-pointer ${
                      mode === m
                        ? 'bg-[#38bdf8] text-[#050c1e]'
                        : 'text-white/50 hover:text-white/80'
                    }`}>
                    {m === 'login' ? 'Sign In' : 'Create Account'}
                  </button>
                ))}
              </div>
            )}

            {/* Title */}
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-white mb-1 tracking-tight">
                {mode === 'login'  && 'Welcome back 👋'}
                {mode === 'signup' && 'Join DOAP today 🚀'}
                {mode === 'reset'  && 'Reset Password 🔐'}
              </h1>
              <p className="text-white/40 text-xs leading-relaxed">
                {mode === 'login'  && 'Sign in to continue your AI-powered learning journey.'}
                {mode === 'signup' && 'Start your department-aware, voice-first learning experience.'}
                {mode === 'reset'  && 'Enter your email — we\'ll send you a reset link instantly.'}
              </p>
            </div>

            {/* Alerts */}
            {errorMessage && (
              <div className="flex items-start gap-2.5 bg-red-500/10 border border-red-500/25 rounded-xl p-3.5 mb-5 text-xs text-red-300 font-medium">
                <AlertCircle size={15} className="shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}
            {successMessage && (
              <div className="flex items-start gap-2.5 bg-emerald-500/10 border border-emerald-500/25 rounded-xl p-3.5 mb-5 text-xs text-emerald-300 font-medium">
                <CheckCircle2 size={15} className="shrink-0 mt-0.5" />
                <span>{successMessage}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === 'signup' && (
                <InputField
                  id="auth-fullname" name="fullName" label="Full Name" type="text"
                  placeholder="e.g. Arjun Sharma" value={fullName}
                  onChange={e => setFullName(e.target.value)}
                  icon={User} disabled={isSubmitting}
                  autoComplete="name" required={!isDevBypass}
                />
              )}

              <InputField
                id="auth-email" name="email" label="Email Address" type="email"
                placeholder="you@example.com" value={email}
                onChange={e => setEmail(e.target.value)}
                icon={Mail} disabled={isSubmitting}
                autoComplete="email" required={!isDevBypass}
              />

              {mode !== 'reset' && (
                <InputField
                  id="auth-password" name="password" label="Password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Min. 8 characters" value={password}
                  onChange={e => setPassword(e.target.value)}
                  icon={Lock} disabled={isSubmitting}
                  autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
                  required={!isDevBypass}
                  rightSlot={
                    <button type="button" onClick={() => setShowPassword(!showPassword)}
                      disabled={isSubmitting}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/30 hover:text-[#38bdf8] transition-colors cursor-pointer">
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  }
                />
              )}

              {mode === 'signup' && (
                <InputField
                  id="auth-confirm-password" name="confirmPassword" label="Confirm Password"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Re-enter password" value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  icon={Lock} disabled={isSubmitting}
                  autoComplete="new-password" required={!isDevBypass}
                  rightSlot={
                    <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      disabled={isSubmitting}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/30 hover:text-[#38bdf8] transition-colors cursor-pointer">
                      {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  }
                />
              )}

              {mode === 'login' && (
                <div className="text-right -mt-1">
                  <button type="button" onClick={() => handleModeSwitch('reset')} disabled={isSubmitting}
                    className="text-[10px] text-[#38bdf8]/60 hover:text-[#38bdf8] font-medium transition-colors cursor-pointer">
                    Forgot Password?
                  </button>
                </div>
              )}

              {/* Primary CTA */}
              <button type="submit" disabled={isSubmitting}
                className="w-full py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-2"
                style={{
                  background: 'linear-gradient(135deg, #38bdf8 0%, #0ea5e9 100%)',
                  color: '#050c1e',
                  boxShadow: isSubmitting ? 'none' : '0 4px 24px rgba(56,189,248,0.3)',
                  animation: isSubmitting ? 'none' : 'pulseGlow 3s ease infinite',
                }}>
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-[#050c1e]/30 border-t-[#050c1e] rounded-full animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    {mode === 'login'  && <>{isDevBypass ? 'Sign In (Dev)' : 'Sign In to DOAP'} <ArrowRight size={15} /></>}
                    {mode === 'signup' && <>{isDevBypass ? 'Create Account (Dev)' : 'Create My Account'} <ArrowRight size={15} /></>}
                    {mode === 'reset'  && <>Send Reset Link <ArrowRight size={15} /></>}
                  </>
                )}
              </button>

              {/* Divider */}
              <div className="relative flex items-center justify-center my-1">
                <div className="w-full border-t border-white/[0.07]" />
                <span className="absolute bg-[#060d20] px-3 text-[10px] font-mono uppercase tracking-widest text-white/25">or</span>
              </div>

              {/* Guest / Demo */}
              <button type="button" onClick={() => signInAsGuest && signInAsGuest()} disabled={isSubmitting}
                className="w-full py-3 rounded-xl border border-white/[0.08] bg-white/[0.03] text-white/60 hover:text-white hover:bg-white/[0.06] hover:border-[#38bdf8]/30 text-xs font-semibold transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50">
                <Sparkles size={13} className="text-amber-400" />
                ⚡ Continue as Guest (Demo Mode)
              </button>
            </form>

            {/* Footer switcher */}
            {mode === 'reset' && (
              <p className="text-center text-xs text-white/40 mt-5">
                Remember your password?{' '}
                <button onClick={() => handleModeSwitch('login')} disabled={isSubmitting}
                  className="text-[#38bdf8] font-semibold hover:underline cursor-pointer">
                  Back to Sign In
                </button>
              </p>
            )}

            {/* Legal */}
            <p className="text-center text-[10px] text-white/20 mt-6 leading-relaxed">
              By continuing you agree to DOAP's Terms of Service &amp; Privacy Policy.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
