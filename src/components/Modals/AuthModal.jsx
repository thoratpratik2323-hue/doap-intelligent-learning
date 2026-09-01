import React, { useState } from 'react';
import { X, Mail, Lock, User, LogIn, UserPlus, KeyRound, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

export const AuthModal = () => {
  const {
    isAuthModalOpen,
    setIsAuthModalOpen,
    authMode,
    setAuthMode,
    signIn,
    signUp,
    resetPassword,
    isConfigured
  } = useAuth();

  const { isDarkMode } = useTheme();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    setSubmitting(true);

    try {
      if (authMode === 'login') {
        await signIn(email, password);
        setIsAuthModalOpen(false);
      } else if (authMode === 'signup') {
        await signUp(email, password, fullName);
        setSuccessMessage('Registration successful! Please check your email for confirmation.');
        setTimeout(() => setIsAuthModalOpen(false), 2000);
      } else if (authMode === 'reset') {
        await resetPassword(email);
        setSuccessMessage('Password reset link sent to your email.');
      }
    } catch (err) {
      setErrorMessage(err.message || 'An error occurred during authentication.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in select-none">
      <div className={`rounded-3xl max-w-md w-full p-6 md:p-8 shadow-2xl border transition-colors relative ${
        isDarkMode ? 'bg-[#0a0a0a] border-neutral-800 text-white' : 'bg-white border-neutral-200 text-black'
      }`}>
        {/* Header */}
        <div className={`flex items-center justify-between pb-4 mb-4 border-b ${
          isDarkMode ? 'border-neutral-800' : 'border-neutral-200'
        }`}>
          <div className="flex items-center gap-2">
            <span className={`font-black text-xl tracking-tighter ${isDarkMode ? 'text-white' : 'text-black'}`}>
              DOAP
            </span>
          </div>

          <button 
            onClick={() => setIsAuthModalOpen(false)}
            className={`p-2 rounded-full transition-colors ${
              isDarkMode ? 'text-neutral-400 hover:text-white hover:bg-neutral-900' : 'text-neutral-500 hover:text-black hover:bg-neutral-100'
            }`}
          >
            <X size={20} />
          </button>
        </div>


        {errorMessage && (
          <div className={`p-3 mb-4 border rounded-2xl text-xs font-semibold flex items-center gap-2 ${
            isDarkMode ? 'bg-neutral-900 border-neutral-600 text-white' : 'bg-neutral-100 border-neutral-400 text-black'
          }`}>
            <AlertCircle size={16} className="shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {successMessage && (
          <div className={`p-3 mb-4 border rounded-2xl text-xs font-semibold flex items-center gap-2 ${
            isDarkMode ? 'bg-neutral-900 border-neutral-600 text-white' : 'bg-neutral-100 border-neutral-400 text-black'
          }`}>
            <CheckCircle2 size={16} className="shrink-0" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {authMode === 'signup' && (
            <div>
              <label className={`block text-xs font-mono uppercase tracking-wider mb-1 ${
                isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
              }`}>Full Name</label>
              <div className="relative">
                <User size={16} className={`absolute left-3.5 top-3 ${isDarkMode ? 'text-neutral-500' : 'text-neutral-400'}`} />
                <input 
                  type="text"
                  required
                  placeholder="e.g. Alex Johnson"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className={`w-full pl-10 pr-3.5 py-2.5 rounded-xl border text-sm focus:outline-none transition-colors ${
                    isDarkMode ? 'bg-neutral-900 border-neutral-800 text-white focus:border-white' : 'bg-neutral-50 border-neutral-200 text-black focus:border-black'
                  }`}
                />
              </div>
            </div>
          )}

          <div>
            <label className={`block text-xs font-mono uppercase tracking-wider mb-1 ${
              isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
            }`}>Email Address</label>
            <div className="relative">
              <Mail size={16} className={`absolute left-3.5 top-3 ${isDarkMode ? 'text-neutral-500' : 'text-neutral-400'}`} />
              <input 
                type="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full pl-10 pr-3.5 py-2.5 rounded-xl border text-sm focus:outline-none transition-colors ${
                  isDarkMode ? 'bg-neutral-900 border-neutral-800 text-white focus:border-white' : 'bg-neutral-50 border-neutral-200 text-black focus:border-black'
                }`}
              />
            </div>
          </div>

          {authMode !== 'reset' && (
            <div>
              <label className={`block text-xs font-mono uppercase tracking-wider mb-1 ${
                isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
              }`}>Password</label>
              <div className="relative">
                <Lock size={16} className={`absolute left-3.5 top-3 ${isDarkMode ? 'text-neutral-500' : 'text-neutral-400'}`} />
                <input 
                  type="password"
                  required
                  minLength={6}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full pl-10 pr-3.5 py-2.5 rounded-xl border text-sm focus:outline-none transition-colors ${
                    isDarkMode ? 'bg-neutral-900 border-neutral-800 text-white focus:border-white' : 'bg-neutral-50 border-neutral-200 text-black focus:border-black'
                  }`}
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className={`w-full py-3 rounded-2xl font-semibold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-2 ${
              isDarkMode ? 'bg-white text-black hover:bg-neutral-200' : 'bg-black text-white hover:bg-neutral-800'
            }`}
          >
            {authMode === 'login' && <LogIn size={16} />}
            {authMode === 'signup' && <UserPlus size={16} />}
            {authMode === 'reset' && <KeyRound size={16} />}
            <span>
              {submitting ? 'Processing...' : authMode === 'login' ? 'Sign In' : authMode === 'signup' ? 'Create Account' : 'Send Reset Link'}
            </span>
          </button>
        </form>

        {/* Footer Navigation */}
        <div className={`pt-4 mt-4 border-t text-center text-xs font-medium space-y-2 ${
          isDarkMode ? 'border-neutral-800 text-neutral-400' : 'border-neutral-200 text-neutral-500'
        }`}>
          {authMode === 'login' && (
            <>
              <p>
                Don't have an account?{' '}
                <button 
                  onClick={() => setAuthMode('signup')}
                  className={`font-semibold hover:underline ${isDarkMode ? 'text-white' : 'text-black'}`}
                >
                  Sign Up
                </button>
              </p>
              <p>
                <button 
                  onClick={() => setAuthMode('reset')}
                  className={`hover:underline ${isDarkMode ? 'text-neutral-400 hover:text-white' : 'text-neutral-500 hover:text-black'}`}
                >
                  Forgot password?
                </button>
              </p>
            </>
          )}

          {authMode === 'signup' && (
            <p>
              Already have an account?{' '}
              <button 
                onClick={() => setAuthMode('login')}
                className={`font-semibold hover:underline ${isDarkMode ? 'text-white' : 'text-black'}`}
              >
                Sign In
              </button>
            </p>
          )}

          {authMode === 'reset' && (
            <p>
              Remembered your password?{' '}
              <button 
                onClick={() => setAuthMode('login')}
                className={`font-semibold hover:underline ${isDarkMode ? 'text-white' : 'text-black'}`}
              >
                Back to Sign In
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
