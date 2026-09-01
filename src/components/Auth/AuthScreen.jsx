import React, { useState, useEffect } from 'react';
import { Mail, Lock, User, AlertCircle, CheckCircle2, Eye, EyeOff, Sparkles, ArrowRight, ArrowLeft, Sun, Moon } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

export const AuthScreen = ({ initialMode = 'login', onBackToLanding }) => {
  const { signIn, signUp, resetPassword, isConfigured, isDevBypass } = useAuth();
  const { isDarkMode, toggleThemeMode } = useTheme();

  const [mode, setMode] = useState(initialMode); // 'login' | 'signup' | 'reset'
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
        setErrorMessage('Your password must contain at least 8 characters.');
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
        if (res?.session) {
          setSuccessMessage('Registration successful! Launching DOAP workspace...');
        } else {
          setSuccessMessage('Registration successful! Please check your email address for a confirmation link.');
        }
      } else if (mode === 'reset') {
        await resetPassword(email);
        setSuccessMessage('Password reset link sent to your email address.');
      }
    } catch (err) {
      setErrorMessage(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 p-3 md:p-6 lg:p-8 flex items-center justify-center select-none font-sans relative overflow-hidden ${
      isDarkMode ? 'bg-[#000000] text-white' : 'bg-[#ffffff] text-[#0a0a0a]'
    }`}>
      {/* Background Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className={`absolute inset-0 [background-size:24px_24px] ${
          isDarkMode 
            ? 'bg-[radial-gradient(#ffffff_1px,transparent_1px)] opacity-[0.025]' 
            : 'bg-[radial-gradient(#000000_1px,transparent_1px)] opacity-[0.03]'
        }`} />
        {isDarkMode ? (
          <div className="absolute top-[-10%] left-[-10%] w-[55vw] h-[55vw] rounded-full bg-[#171717]/50 blur-[140px] animate-mono-1" />
        ) : (
          <div className="absolute top-[-10%] left-[-10%] w-[55vw] h-[55vw] rounded-full bg-[#e5e5e5]/80 blur-[140px] animate-mono-1" />
        )}
      </div>

      {/* Main Container */}
      <div className="w-full max-w-[1500px] min-h-[calc(100vh-2rem)] md:min-h-[calc(100vh-3rem)] flex items-center justify-center p-4 relative z-10">
        
        {/* Monochromatic Auth Card */}
        <div className={`w-full max-w-md backdrop-blur-2xl rounded-3xl md:rounded-[32px] p-6 md:p-10 border shadow-2xl relative overflow-hidden transition-all duration-300 ${
          isDarkMode 
            ? 'bg-[#0a0a0a]/90 border-neutral-800/80 shadow-black' 
            : 'bg-white/95 border-neutral-200/90 shadow-neutral-200'
        }`}>
          
          {/* Header Row: Back Link & Theme Toggle */}
          <div className="flex items-center justify-between mb-6">
            {onBackToLanding ? (
              <button
                type="button"
                onClick={onBackToLanding}
                className={`text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer ${
                  isDarkMode ? 'text-neutral-400 hover:text-white' : 'text-neutral-500 hover:text-black'
                }`}
              >
                <ArrowLeft size={15} /> Back to DOAP
              </button>
            ) : <div />}

            <button
              type="button"
              onClick={toggleThemeMode}
              className={`p-2 rounded-full border transition-all cursor-pointer ${
                isDarkMode 
                  ? 'bg-neutral-900 border-neutral-800 text-white hover:bg-neutral-800' 
                  : 'bg-neutral-100 border-neutral-300 text-neutral-900 hover:bg-neutral-200'
              }`}
              title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDarkMode ? <Sun size={14} /> : <Moon size={14} />}
            </button>
          </div>

          {/* Top Brand Logo */}
          <div className="text-center space-y-3 mb-8">
            <div 
              onClick={onBackToLanding}
              className="inline-flex items-center justify-center gap-2 group cursor-pointer"
            >
              <span className={`font-black text-2xl tracking-tighter ${
                isDarkMode ? 'text-white' : 'text-[#0a0a0a]'
              }`}>
                DOAP
              </span>
            </div>

            <div className="space-y-1">
              <h1 className={`text-2xl md:text-3xl font-bold tracking-tight ${
                isDarkMode ? 'text-white' : 'text-[#0a0a0a]'
              }`}>
                {mode === 'login' && 'Welcome Back'}
                {mode === 'signup' && 'Create Your Account'}
                {mode === 'reset' && 'Reset Password'}
              </h1>
              <p className={`text-xs md:text-sm font-normal leading-relaxed ${
                isDarkMode ? 'text-neutral-400' : 'text-neutral-600'
              }`}>
                {mode === 'login' && 'Sign in to continue your AI-powered learning & career journey.'}
                {mode === 'signup' && 'Join DOAP to start your AI-powered learning & career journey.'}
                {mode === 'reset' && 'Enter your registered email address to receive a secure password reset link.'}
              </p>
            </div>
          </div>



          {/* Error Banner */}
          {errorMessage && (
            <div className={`p-3.5 mb-6 border rounded-2xl text-xs font-medium flex items-center gap-2.5 ${
              isDarkMode 
                ? 'bg-neutral-900 border-neutral-600 text-white' 
                : 'bg-neutral-100 border-neutral-400 text-black'
            }`}>
              <AlertCircle size={17} className="shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Success Banner */}
          {successMessage && (
            <div className={`p-3.5 mb-6 border rounded-2xl text-xs font-medium flex items-center gap-2.5 ${
              isDarkMode 
                ? 'bg-neutral-900 border-neutral-600 text-white' 
                : 'bg-neutral-100 border-neutral-400 text-black'
            }`}>
              <CheckCircle2 size={17} className="shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <div className="space-y-1">
                <label className={`block text-[11px] font-mono uppercase tracking-wider ml-1 ${
                  isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
                }`}>
                  Full Name
                </label>
                <div className="relative">
                  <User size={18} className={`absolute left-4 top-3.5 ${isDarkMode ? 'text-neutral-500' : 'text-neutral-400'}`} />
                  <input 
                    type="text"
                    required={!isDevBypass}
                    disabled={isSubmitting}
                    placeholder="e.g. Alex Johnson"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className={`w-full pl-11 pr-4 py-3 rounded-2xl border text-sm focus:outline-none transition-all font-medium disabled:opacity-60 ${
                      isDarkMode 
                        ? 'bg-neutral-900/80 border-neutral-800 text-white placeholder-neutral-600 focus:border-white' 
                        : 'bg-neutral-50 border-neutral-200 text-black placeholder-neutral-400 focus:border-black'
                    }`}
                  />
                </div>
              </div>
            )}

            <div className="space-y-1">
              <label className={`block text-[11px] font-mono uppercase tracking-wider ml-1 ${
                isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
              }`}>
                Email Address
              </label>
              <div className="relative">
                <Mail size={18} className={`absolute left-4 top-3.5 ${isDarkMode ? 'text-neutral-500' : 'text-neutral-400'}`} />
                <input 
                  type="email"
                  required={!isDevBypass}
                  disabled={isSubmitting}
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full pl-11 pr-4 py-3 rounded-2xl border text-sm focus:outline-none transition-all font-medium disabled:opacity-60 ${
                    isDarkMode 
                      ? 'bg-neutral-900/80 border-neutral-800 text-white placeholder-neutral-600 focus:border-white' 
                      : 'bg-neutral-50 border-neutral-200 text-black placeholder-neutral-400 focus:border-black'
                  }`}
                />
              </div>
            </div>

            {mode !== 'reset' && (
              <div className="space-y-1">
                <label className={`block text-[11px] font-mono uppercase tracking-wider ml-1 ${
                  isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
                }`}>
                  Password
                </label>
                <div className="relative">
                  <Lock size={18} className={`absolute left-4 top-3.5 ${isDarkMode ? 'text-neutral-500' : 'text-neutral-400'}`} />
                  <input 
                    type={showPassword ? 'text' : 'password'}
                    required={!isDevBypass}
                    disabled={isSubmitting}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`w-full pl-11 pr-11 py-3 rounded-2xl border text-sm focus:outline-none transition-all font-medium disabled:opacity-60 ${
                      isDarkMode 
                        ? 'bg-neutral-900/80 border-neutral-800 text-white placeholder-neutral-600 focus:border-white' 
                        : 'bg-neutral-50 border-neutral-200 text-black placeholder-neutral-400 focus:border-black'
                    }`}
                  />
                  <button
                    type="button"
                    disabled={isSubmitting}
                    onClick={() => setShowPassword(!showPassword)}
                    className={`absolute right-3.5 top-3.5 focus:outline-none disabled:opacity-50 transition-colors ${
                      isDarkMode ? 'text-neutral-500 hover:text-white' : 'text-neutral-400 hover:text-black'
                    }`}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
            )}

            {mode === 'signup' && (
              <div className="space-y-1">
                <label className={`block text-[11px] font-mono uppercase tracking-wider ml-1 ${
                  isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
                }`}>
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock size={18} className={`absolute left-4 top-3.5 ${isDarkMode ? 'text-neutral-500' : 'text-neutral-400'}`} />
                  <input 
                    type={showConfirmPassword ? 'text' : 'password'}
                    required={!isDevBypass}
                    disabled={isSubmitting}
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={`w-full pl-11 pr-11 py-3 rounded-2xl border text-sm focus:outline-none transition-all font-medium disabled:opacity-60 ${
                      isDarkMode 
                        ? 'bg-neutral-900/80 border-neutral-800 text-white placeholder-neutral-600 focus:border-white' 
                        : 'bg-neutral-50 border-neutral-200 text-black placeholder-neutral-400 focus:border-black'
                    }`}
                  />
                  <button
                    type="button"
                    disabled={isSubmitting}
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className={`absolute right-3.5 top-3.5 focus:outline-none disabled:opacity-50 transition-colors ${
                      isDarkMode ? 'text-neutral-500 hover:text-white' : 'text-neutral-400 hover:text-black'
                    }`}
                  >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
            )}

            {mode === 'login' && (
              <div className="text-right pt-0.5">
                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={() => handleModeSwitch('reset')}
                  className={`text-xs font-medium transition-colors disabled:opacity-50 ${
                    isDarkMode ? 'text-neutral-400 hover:text-white' : 'text-neutral-500 hover:text-black'
                  }`}
                >
                  Forgot Password?
                </button>
              </div>
            )}

            {/* Primary Action Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3.5 font-semibold text-xs rounded-2xl transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-5 ${
                isDarkMode 
                  ? 'bg-white text-black hover:bg-neutral-200' 
                  : 'bg-[#0a0a0a] text-white hover:bg-neutral-800'
              }`}
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <span className={`w-4 h-4 border-2 rounded-full animate-spin ${
                    isDarkMode ? 'border-black border-t-transparent' : 'border-white border-t-transparent'
                  }`} />
                  Processing...
                </span>
              ) : (
                <>
                  {mode === 'login' && <span>{isDevBypass ? "Sign In (Dev Mode)" : "Sign In to DOAP"}</span>}
                  {mode === 'signup' && <span>{isDevBypass ? "Create Account (Dev Mode)" : "Create Account"}</span>}
                  {mode === 'reset' && <span>Send Reset Link</span>}
                  <ArrowRight size={15} />
                </>
              )}
            </button>
          </form>

          {/* Footer Navigation Switcher */}
          <div className={`pt-6 mt-6 border-t text-center text-xs font-medium space-y-2 ${
            isDarkMode ? 'border-neutral-800/80 text-neutral-400' : 'border-neutral-200 text-neutral-500'
          }`}>
            {mode === 'login' && (
              <p>
                Don't have an account?{' '}
                <button 
                  onClick={() => handleModeSwitch('signup')}
                  disabled={isSubmitting}
                  className={`font-semibold hover:underline ${isDarkMode ? 'text-white' : 'text-black'}`}
                >
                  Create Account
                </button>
              </p>
            )}

            {mode === 'signup' && (
              <p>
                Already have an account?{' '}
                <button 
                  onClick={() => handleModeSwitch('login')}
                  disabled={isSubmitting}
                  className={`font-semibold hover:underline ${isDarkMode ? 'text-white' : 'text-black'}`}
                >
                  Sign In
                </button>
              </p>
            )}

            {mode === 'reset' && (
              <p>
                Remembered your password?{' '}
                <button 
                  onClick={() => handleModeSwitch('login')}
                  disabled={isSubmitting}
                  className={`font-semibold hover:underline ${isDarkMode ? 'text-white' : 'text-black'}`}
                >
                  Back to Sign In
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
