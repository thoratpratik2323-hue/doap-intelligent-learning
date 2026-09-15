import React, { useState, useEffect } from 'react';
import { Mail, Lock, User, AlertCircle, CheckCircle2, Eye, EyeOff, Sparkles, ArrowRight, ArrowLeft } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

/* ── Clean Developer Input Field ── */
const InputField = ({ id, name, label, type, placeholder, value, onChange, icon: Icon, rightSlot, disabled, autoComplete, required, isDarkMode }) => (
  <div className="space-y-1.5 text-left">
    <label htmlFor={id} className={`block text-xs font-medium ${isDarkMode ? 'text-[#94A3B8]' : 'text-[#475569]'}`}>
      {label}
    </label>
    <div className="relative">
      <Icon size={16} className={`absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none ${isDarkMode ? 'text-[#94A3B8]' : 'text-[#64748B]'}`} />
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
        className={`w-full pl-10 pr-10 py-2.5 rounded-xl border text-sm transition-all duration-200 disabled:opacity-50 font-sans focus:outline-none focus:ring-1 focus:ring-[#9333EA] ${
          isDarkMode
            ? 'text-[#F8FAFC] placeholder-[#64748B] bg-[#0F1424]/90 border-[#9333EA]/25 focus:border-[#9333EA]'
            : 'text-[#0F172A] placeholder-[#94A3B8] bg-[#F8FAFC] border-[#E2E8F0] focus:border-[#9333EA]'
        }`}
      />
      {rightSlot}
    </div>
  </div>
);

export const AuthScreen = ({ initialMode = 'login', onBackToLanding }) => {
  const { signIn, signUp, resetPassword, signInAsGuest, isDevBypass } = useAuth();
  const themeContext = useTheme ? useTheme() : null;
  const isDarkMode = themeContext ? themeContext.isDarkMode : false;

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

  useEffect(() => {
    setMode(initialMode);
  }, [initialMode]);

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
      if (password.length < 8) {
        setErrorMessage('Password must be at least 8 characters.');
        return;
      }
      if (password !== confirmPassword) {
        setErrorMessage('Passwords do not match.');
        return;
      }
    }

    setIsSubmitting(true);
    try {
      if (mode === 'login') {
        await signIn(email, password);
      } else if (mode === 'signup') {
        const res = await signUp(email, password, fullName);
        setSuccessMessage(res?.session ? 'Account created! Launching Ziv...' : 'Check your email to confirm your account.');
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

  return (
    <div className={`min-h-screen flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden font-sans select-none transition-colors ${
      isDarkMode ? 'bg-[#0B0F19]' : 'bg-[#FFFFFF]'
    }`}>
      {/* Background Subtle Pattern & Glow */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: isDarkMode
            ? 'linear-gradient(#9333EA 1px, transparent 1px), linear-gradient(90deg, #9333EA 1px, transparent 1px)'
            : 'linear-gradient(#0F172A 1px, transparent 1px), linear-gradient(90deg, #0F172A 1px, transparent 1px)',
          backgroundSize: '36px 36px',
        }}
      />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[350px] rounded-full bg-[#9333EA]/8 blur-[120px] pointer-events-none" />

      {/* Top Bar Back Link */}
      {onBackToLanding && (
        <div className="w-full max-w-[420px] mb-4">
          <button
            type="button"
            onClick={onBackToLanding}
            className={`inline-flex items-center gap-1.5 text-xs transition-colors cursor-pointer group ${
              isDarkMode ? 'text-[#94A3B8] hover:text-[#F8FAFC]' : 'text-[#64748B] hover:text-[#0F172A]'
            }`}
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
            <span>Back to Home</span>
          </button>
        </div>
      )}

      {/* Main Authentication Card */}
      <div className={`relative z-10 w-full max-w-[420px] rounded-2xl p-7 sm:p-8 backdrop-blur-xl transition-colors ${
        isDarkMode
          ? 'bg-[#0F1424]/90 border border-[#9333EA]/20 shadow-2xl shadow-black/80'
          : 'bg-[#FFFFFF] border border-[#E2E8F0] shadow-2xl shadow-neutral-200/80'
      }`}>
        {/* Brand Header with New Logo */}
        <div className="flex flex-col items-center text-center mb-6">
          <img
            src="/ziv-logo.png"
            alt="Ziv Logo"
            className="h-20 w-auto object-contain mb-2 drop-shadow-sm"
          />
          <h1 className={`text-2xl font-bold tracking-tight ${
            isDarkMode ? 'text-[#F8FAFC]' : 'text-[#0F172A]'
          }`}>
            Ziv
          </h1>
          <p className={`text-xs mt-1 ${isDarkMode ? 'text-[#94A3B8]' : 'text-[#64748B]'}`}>
            The modern playground for future developers
          </p>
        </div>

        {/* Mode Pill Switcher */}
        {mode !== 'reset' && (
          <div className={`flex p-1 rounded-xl mb-6 ${
            isDarkMode ? 'bg-[#0B0F19]/80 border border-[#9333EA]/20' : 'bg-[#F1F5F9] border border-[#E2E8F0]'
          }`}>
            <button
              type="button"
              onClick={() => handleModeSwitch('login')}
              disabled={isSubmitting}
              className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                mode === 'login'
                  ? 'bg-[#9333EA] text-[#F8FAFC] shadow-md shadow-[#9333EA]/30'
                  : isDarkMode ? 'text-[#94A3B8] hover:text-[#F8FAFC]' : 'text-[#64748B] hover:text-[#0F172A]'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => handleModeSwitch('signup')}
              disabled={isSubmitting}
              className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                mode === 'signup'
                  ? 'bg-[#9333EA] text-[#F8FAFC] shadow-md shadow-[#9333EA]/30'
                  : isDarkMode ? 'text-[#94A3B8] hover:text-[#F8FAFC]' : 'text-[#64748B] hover:text-[#0F172A]'
              }`}
            >
              Create Account
            </button>
          </div>
        )}

        {/* Form Title for Reset Mode */}
        {mode === 'reset' && (
          <div className="mb-6 text-center">
            <h2 className={`text-lg font-semibold ${isDarkMode ? 'text-[#F8FAFC]' : 'text-[#0F172A]'}`}>
              Reset Password
            </h2>
            <p className={`text-xs mt-1 ${isDarkMode ? 'text-[#94A3B8]' : 'text-[#64748B]'}`}>
              Enter your email to receive recovery instructions.
            </p>
          </div>
        )}

        {/* Alerts */}
        {errorMessage && (
          <div className="flex items-start gap-2.5 border border-red-500/30 bg-red-500/10 rounded-xl px-3.5 py-2.5 mb-5 text-xs text-red-400">
            <AlertCircle size={15} className="shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        {successMessage && (
          <div className="flex items-start gap-2.5 border border-emerald-500/30 bg-emerald-500/10 rounded-xl px-3.5 py-2.5 mb-5 text-xs text-emerald-500">
            <CheckCircle2 size={15} className="shrink-0 mt-0.5" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Form Fields */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'signup' && (
            <InputField
              id="auth-fullname"
              name="fullName"
              label="Full Name"
              type="text"
              placeholder="e.g. Alex Carter"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              icon={User}
              disabled={isSubmitting}
              autoComplete="name"
              required={!isDevBypass}
              isDarkMode={isDarkMode}
            />
          )}

          <InputField
            id="auth-email"
            name="email"
            label="Email Address"
            type="email"
            placeholder="developer@ziv.dev"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            icon={Mail}
            disabled={isSubmitting}
            autoComplete="email"
            required={!isDevBypass}
            isDarkMode={isDarkMode}
          />

          {mode !== 'reset' && (
            <InputField
              id="auth-password"
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              icon={Lock}
              disabled={isSubmitting}
              autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
              required={!isDevBypass}
              isDarkMode={isDarkMode}
              rightSlot={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isSubmitting}
                  className={`absolute right-3 top-1/2 -translate-y-1/2 transition-colors cursor-pointer ${
                    isDarkMode ? 'text-[#94A3B8] hover:text-[#FF9E7D]' : 'text-[#64748B] hover:text-[#9333EA]'
                  }`}
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              }
            />
          )}

          {mode === 'signup' && (
            <InputField
              id="auth-confirm-password"
              name="confirmPassword"
              label="Confirm Password"
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              icon={Lock}
              disabled={isSubmitting}
              autoComplete="new-password"
              required={!isDevBypass}
              isDarkMode={isDarkMode}
              rightSlot={
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  disabled={isSubmitting}
                  className={`absolute right-3 top-1/2 -translate-y-1/2 transition-colors cursor-pointer ${
                    isDarkMode ? 'text-[#94A3B8] hover:text-[#FF9E7D]' : 'text-[#64748B] hover:text-[#9333EA]'
                  }`}
                >
                  {showConfirmPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              }
            />
          )}

          {mode === 'login' && (
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => handleModeSwitch('reset')}
                disabled={isSubmitting}
                className={`text-xs transition-colors cursor-pointer ${
                  isDarkMode ? 'text-[#94A3B8] hover:text-[#FF9E7D]' : 'text-[#64748B] hover:text-[#9333EA]'
                }`}
              >
                Forgot password?
              </button>
            </div>
          )}

          {/* Primary CTA (Electric Purple) */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-2 py-2.5 px-4 rounded-xl font-semibold text-sm text-[#F8FAFC] bg-[#9333EA] hover:bg-[#7e22ce] shadow-lg shadow-[#9333EA]/25 transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 active:scale-[0.99]"
          >
            {isSubmitting ? (
              <>
                <span className="w-4 h-4 border-2 border-[#F8FAFC]/30 border-t-[#F8FAFC] rounded-full animate-spin" />
                <span>Processing...</span>
              </>
            ) : (
              <>
                {mode === 'login' && <>{isDevBypass ? 'Sign In (Dev)' : 'Sign In'} <ArrowRight size={15} /></>}
                {mode === 'signup' && <>{isDevBypass ? 'Create Account (Dev)' : 'Create Account'} <ArrowRight size={15} /></>}
                {mode === 'reset' && <>Send Reset Link <ArrowRight size={15} /></>}
              </>
            )}
          </button>

          {/* Divider */}
          <div className="relative flex items-center justify-center my-4">
            <div className={`w-full border-t ${isDarkMode ? 'border-[#9333EA]/15' : 'border-[#E2E8F0]'}`} />
            <span className={`absolute px-3 text-[11px] font-mono uppercase tracking-wider ${
              isDarkMode ? 'bg-[#0F1424] text-[#94A3B8]' : 'bg-[#FFFFFF] text-[#64748B]'
            }`}>
              or
            </span>
          </div>

          {/* Guest / Demo Access Button */}
          <button
            type="button"
            onClick={() => signInAsGuest && signInAsGuest()}
            disabled={isSubmitting}
            className={`w-full py-2.5 px-4 rounded-xl border text-xs font-medium transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 ${
              isDarkMode
                ? 'border-[#9333EA]/25 bg-[#0B0F19]/50 hover:bg-[#9333EA]/10 hover:border-[#FF9E7D]/40 text-[#F8FAFC]'
                : 'border-[#E2E8F0] bg-[#F8FAFC] hover:bg-[#F1F5F9] text-[#0F172A]'
            }`}
          >
            <Sparkles size={14} className="text-[#9333EA]" />
            <span>Continue as Guest (Demo Mode)</span>
          </button>
        </form>

        {/* Reset Mode Return */}
        {mode === 'reset' && (
          <p className={`text-center text-xs mt-5 ${isDarkMode ? 'text-[#94A3B8]' : 'text-[#64748B]'}`}>
            Remember your credentials?{' '}
            <button
              type="button"
              onClick={() => handleModeSwitch('login')}
              disabled={isSubmitting}
              className="text-[#9333EA] font-semibold hover:underline cursor-pointer ml-1"
            >
              Sign In
            </button>
          </p>
        )}

        {/* Footer Policy */}
        <p className={`text-center text-[11px] mt-6 leading-relaxed ${
          isDarkMode ? 'text-[#94A3B8]/60' : 'text-[#94A3B8]'
        }`}>
          By continuing, you agree to Ziv's Terms of Service & Privacy Policy.
        </p>
      </div>
    </div>
  );
};
