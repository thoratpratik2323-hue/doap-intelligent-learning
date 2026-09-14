import React, { useState, useEffect } from 'react';
import { Mail, Lock, User, AlertCircle, CheckCircle2, Eye, EyeOff, Sparkles, ArrowRight, ArrowLeft, Brain, Zap, Star, Shield } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

/* ── Feature pill ── */
const FeaturePill = ({ icon: Icon, text }) => (
  <div className="flex items-center gap-2 px-3 py-1.5 border border-[#38bdf8]/15 rounded text-xs text-white/60 bg-white/[0.03]">
    <Icon size={12} className="text-[#38bdf8] shrink-0" />
    {text}
  </div>
);

/* ── Input field ── */
const InputField = ({ id, name, label, type, placeholder, value, onChange, icon: Icon, rightSlot, disabled, autoComplete, required }) => (
  <div className="space-y-1.5">
    <label htmlFor={id} className="block text-[10px] font-mono uppercase tracking-[0.15em] text-[#0ea5e9]/80">
      {label}
    </label>
    <div className="relative">
      <Icon size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
      <input
        id={id} name={name} autoComplete={autoComplete} type={type}
        required={required} disabled={disabled} placeholder={placeholder}
        value={value} onChange={onChange}
        className="w-full pl-10 pr-10 py-2.5 rounded border border-slate-200 bg-slate-50 text-[#0a1628] text-sm placeholder-slate-300 focus:outline-none focus:border-[#0ea5e9]/60 focus:bg-white transition-colors duration-200 disabled:opacity-50 font-medium"
      />
      {rightSlot}
    </div>
  </div>
);

/* ══════════════════════════════════════ */
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
    setErrorMessage(''); setSuccessMessage('');
    if (mode === 'signup') {
      if (password.length < 8) { setErrorMessage('Password must be at least 8 characters.'); return; }
      if (password !== confirmPassword) { setErrorMessage('Passwords do not match.'); return; }
    }
    setIsSubmitting(true);
    try {
      if (mode === 'login') { await signIn(email, password); }
      else if (mode === 'signup') {
        const res = await signUp(email, password, fullName);
        setSuccessMessage(res?.session ? 'Account created! Launching Ziv...' : 'Check your email to confirm your account.');
      } else if (mode === 'reset') {
        await resetPassword(email);
        setSuccessMessage('Reset link sent to your email.');
      }
    } catch (err) {
      setErrorMessage(err.message || 'Something went wrong. Please try again.');
    } finally { setIsSubmitting(false); }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center font-sans select-none relative overflow-hidden">

      {/* Subtle background grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{ backgroundImage: 'linear-gradient(rgba(14,165,233,1) 1px,transparent 1px),linear-gradient(90deg,rgba(14,165,233,1) 1px,transparent 1px)', backgroundSize: '48px 48px' }} />

      {/* Single soft glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-[#0ea5e9]/[0.04] blur-[100px] pointer-events-none" />

      {/* ── Two-column card ── */}
      <div className="relative z-10 w-full max-w-4xl mx-4 flex border border-[#0ea5e9]/15 rounded-lg overflow-hidden shadow-xl shadow-slate-200">

        {/* ════ LEFT — Branding ════ */}
        <div className="hidden lg:flex flex-col justify-between w-[44%] bg-[#f0f8ff] p-10 border-r border-[#0ea5e9]/12">

          {/* Logo + back */}
          <div>
            {onBackToLanding && (
              <button type="button" onClick={onBackToLanding}
                className="flex items-center gap-1.5 text-white/30 hover:text-white/70 text-xs font-medium mb-8 transition-colors cursor-pointer">
                <ArrowLeft size={12} /> Back to Home
              </button>
            )}
            <div className="flex items-center gap-3 mb-8">
              <img src="/doap-logo.jpg" alt="DOAP" className="h-9 rounded object-contain" />
              <div>
                <p className="text-white font-bold text-lg tracking-tight">Ziv</p>
                <p className="text-[#38bdf8]/50 text-[9px] font-mono uppercase tracking-widest">The modern playground for future developers</p>
              </div>
            </div>

            {/* Headline */}
            <h2 className="text-2xl font-bold text-white leading-tight mb-2">
              India's First<br />
              <span className="text-[#38bdf8]">Voice-First AI<br />Tutor Platform</span>
            </h2>
            <p className="text-white/40 text-xs leading-relaxed mt-3 max-w-xs">
              Department-aware, exam-focused learning built specifically for Indian college students.
            </p>
          </div>

          {/* Feature pills */}
          <div className="space-y-2 my-8">
            <FeaturePill icon={Brain}  text="AI Voice Tutor" />
            <FeaturePill icon={Zap}    text="Exam Preparation" />
            <FeaturePill icon={Star}   text="Mock Interviews & Viva" />
            <FeaturePill icon={Shield} text="Department Syllabus" />
          </div>

          {/* Testimonial */}
          <div className="border border-[#38bdf8]/10 rounded p-4 bg-white/[0.02]">
            <p className="text-white/50 text-xs leading-relaxed italic mb-3">
              "DOAP ki AI Tutor ne meri semester preparation completely change kar di."
            </p>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-[#38bdf8] flex items-center justify-center text-[10px] font-bold text-[#050c1e]">P</div>
              <div>
                <p className="text-white text-[11px] font-semibold">Pratham K.</p>
                <p className="text-white/30 text-[10px]">CS Engineering, Pune</p>
              </div>
            </div>
          </div>
        </div>

        {/* ════ RIGHT — Form ════ */}
        <div className="flex-1 bg-white p-8 md:p-10 flex flex-col justify-center">

          {/* Mobile header */}
          <div className="flex items-center justify-between mb-6 lg:hidden">
            <div className="flex items-center gap-2">
              <img src="/doap-logo.jpg" alt="DOAP" className="h-7 rounded object-contain" />
              <span className="text-[#0a1628] font-bold">Ziv</span>
            </div>
            {onBackToLanding && (
              <button type="button" onClick={onBackToLanding}
                className="text-slate-400 hover:text-slate-700 text-xs flex items-center gap-1 transition-colors cursor-pointer">
                <ArrowLeft size={11} /> Back
              </button>
            )}
          </div>

          {/* Mode tab switcher */}
          {mode !== 'reset' && (
            <div className="flex border border-slate-200 rounded overflow-hidden mb-6">
              {['login', 'signup'].map(m => (
                <button key={m} type="button"
                  onClick={() => handleModeSwitch(m)}
                  disabled={isSubmitting}
                  className="flex-1 py-2.5 text-xs font-semibold transition-colors duration-150 cursor-pointer border-0 outline-none"
                  style={{
                    backgroundColor: mode === m ? '#0ea5e9' : 'transparent',
                    color: mode === m ? '#ffffff' : '#6b7280',
                  }}>
                  {m === 'login' ? 'Sign In' : 'Create Account'}
                </button>
              ))}
            </div>
          )}

          {/* Title */}
          <div className="mb-6">
            <h1 className="text-xl font-bold text-[#0a1628] mb-1">
              {mode === 'login'  && 'Welcome back'}
              {mode === 'signup' && 'Create your account'}
              {mode === 'reset'  && 'Reset your password'}
            </h1>
            <p className="text-slate-400 text-xs">
              {mode === 'login'  && 'Sign in to continue your learning journey.'}
              {mode === 'signup' && "Join Ziv — it's free."}
              {mode === 'reset'  && "We'll send a reset link to your email."}
            </p>
          </div>

          {/* Alerts */}
          {errorMessage && (
            <div className="flex items-start gap-2 border border-red-500/20 bg-red-500/8 rounded px-3 py-2.5 mb-5 text-xs text-red-400">
              <AlertCircle size={14} className="shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}
          {successMessage && (
            <div className="flex items-start gap-2 border border-emerald-500/20 bg-emerald-500/8 rounded px-3 py-2.5 mb-5 text-xs text-emerald-400">
              <CheckCircle2 size={14} className="shrink-0 mt-0.5" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <InputField id="auth-fullname" name="fullName" label="Full Name" type="text"
                placeholder="e.g. Arjun Sharma" value={fullName}
                onChange={e => setFullName(e.target.value)} icon={User}
                disabled={isSubmitting} autoComplete="name" required={!isDevBypass} />
            )}

            <InputField id="auth-email" name="email" label="Email Address" type="email"
              placeholder="you@example.com" value={email}
              onChange={e => setEmail(e.target.value)} icon={Mail}
              disabled={isSubmitting} autoComplete="email" required={!isDevBypass} />

            {mode !== 'reset' && (
              <InputField id="auth-password" name="password" label="Password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Min. 8 characters" value={password}
                onChange={e => setPassword(e.target.value)} icon={Lock}
                disabled={isSubmitting}
                autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
                required={!isDevBypass}
                rightSlot={
                  <button type="button" onClick={() => setShowPassword(!showPassword)}
                    disabled={isSubmitting}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/25 hover:text-[#38bdf8] transition-colors cursor-pointer">
                    {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                } />
            )}

            {mode === 'signup' && (
              <InputField id="auth-confirm-password" name="confirmPassword" label="Confirm Password"
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Re-enter password" value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)} icon={Lock}
                disabled={isSubmitting} autoComplete="new-password" required={!isDevBypass}
                rightSlot={
                  <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    disabled={isSubmitting}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/25 hover:text-[#38bdf8] transition-colors cursor-pointer">
                    {showConfirmPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                } />
            )}

            {mode === 'login' && (
              <div className="text-right">
                <button type="button" onClick={() => handleModeSwitch('reset')}
                  disabled={isSubmitting}
                  className="text-[10px] text-white/30 hover:text-[#38bdf8] transition-colors cursor-pointer">
                  Forgot Password?
                </button>
              </div>
            )}

            {/* CTA */}
            <button type="submit" disabled={isSubmitting}
              className="w-full py-3 rounded font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-2"
              style={{ backgroundColor: '#38bdf8', color: '#050c1e' }}>
              {isSubmitting ? (
                <><span className="w-4 h-4 border-2 border-[#050c1e]/30 border-t-[#050c1e] rounded-full animate-spin" /> Processing...</>
              ) : (
                <>
                  {mode === 'login'  && <>{isDevBypass ? 'Sign In (Dev)' : 'Sign In'} <ArrowRight size={14} /></>}
                  {mode === 'signup' && <>{isDevBypass ? 'Create Account (Dev)' : 'Create Account'} <ArrowRight size={14} /></>}
                  {mode === 'reset'  && <>Send Reset Link <ArrowRight size={14} /></>}
                </>
              )}
            </button>

            {/* Divider */}
            <div className="relative flex items-center justify-center">
              <div className="w-full border-t border-white/[0.06]" />
              <span className="absolute bg-[#060d20] px-3 text-[10px] text-white/20 font-mono uppercase tracking-widest">or</span>
            </div>

            {/* Guest access */}
            <button type="button" onClick={() => signInAsGuest && signInAsGuest()} disabled={isSubmitting}
              className="w-full py-2.5 border border-white/[0.07] rounded text-white/50 hover:text-white/80 hover:border-[#38bdf8]/25 text-xs font-medium transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50">
              <Sparkles size={12} className="text-amber-400" />
              Continue as Guest (Demo Mode)
            </button>
          </form>

          {/* Reset mode back link */}
          {mode === 'reset' && (
            <p className="text-center text-xs text-white/30 mt-5">
              Remember it?{' '}
              <button onClick={() => handleModeSwitch('login')} disabled={isSubmitting}
                className="text-[#38bdf8] font-semibold hover:underline cursor-pointer">
                Back to Sign In
              </button>
            </p>
          )}

          <p className="text-center text-[10px] text-white/15 mt-6">
            By continuing you agree to DOAP's Terms & Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
};
