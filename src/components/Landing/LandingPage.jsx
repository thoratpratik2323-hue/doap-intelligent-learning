import React, { useState, useRef } from 'react';
import { ArrowRight, Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export const LandingPage = ({ onGetStarted, onSignIn }) => {
  const { isDarkMode, settings, appearance, updatePersonalization, updateAppearance } = useTheme();
  const [tiltStyle, setTiltStyle] = useState({ transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg)' });
  const heroVisualRef = useRef(null);

  const activeSettings = settings || appearance || {};

  const handleUpdateMode = (mode) => {
    const fn = updatePersonalization || updateAppearance;
    if (fn) fn({ themeMode: mode });
  };

  // Subtle cursor interaction on visual preview
  const handleMouseMove = (e) => {
    if (!heroVisualRef.current) return;
    const rect = heroVisualRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotateX = (-y / rect.height) * 4;
    const rotateY = (x / rect.width) * 4;
    setTiltStyle({
      transform: `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`
    });
  };

  const handleMouseLeave = () => {
    setTiltStyle({ transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg)' });
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 select-none font-sans relative overflow-x-hidden ${
      isDarkMode ? 'bg-[#000000] text-white' : 'bg-[#ffffff] text-[#0a0a0a]'
    }`}>
      {/* Monochromatic Background Orbs & Grain Texture */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className={`absolute inset-0 [background-size:32px_32px] ${
          isDarkMode 
            ? 'bg-[radial-gradient(#ffffff_1px,transparent_1px)] opacity-[0.025]' 
            : 'bg-[radial-gradient(#000000_1px,transparent_1px)] opacity-[0.03]'
        }`} />

        {isDarkMode ? (
          <>
            <div className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-gradient-to-tr from-[#171717]/60 via-[#0a0a0a] to-[#262626]/40 blur-[150px] animate-mono-1" />
            <div className="absolute bottom-[-15%] right-[-10%] w-[65vw] h-[65vw] rounded-full bg-gradient-to-bl from-[#262626]/50 via-[#171717]/40 to-[#000000] blur-[160px] animate-mono-2" />
          </>
        ) : (
          <>
            <div className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-gradient-to-tr from-[#e5e5e5]/80 via-[#f7f7f7] to-[#d4d4d4]/60 blur-[140px] animate-mono-1" />
            <div className="absolute bottom-[-15%] right-[-10%] w-[65vw] h-[65vw] rounded-full bg-gradient-to-bl from-[#d4d4d4]/60 via-[#f7f7f7] to-[#ffffff] blur-[150px] animate-mono-2" />
          </>
        )}
      </div>

      {/* Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 p-4">
        <nav className={`max-w-5xl mx-auto backdrop-blur-xl border rounded-full px-6 py-3 flex items-center justify-between transition-colors ${
          isDarkMode 
            ? 'bg-[#0a0a0a]/80 border-neutral-800/80' 
            : 'bg-[#ffffff]/80 border-neutral-200 shadow-sm'
        }`}>
          {/* Left Wordmark */}
          <div 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <img 
              src="/doap-logo.jpg" 
              alt="DOAP Logo" 
              className="h-8 object-contain rounded-lg hover:opacity-80 transition-opacity" 
            />
          </div>

          {/* Center Links */}
          <div className={`hidden md:flex items-center gap-10 text-xs font-mono uppercase tracking-widest ${
            isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
          }`}>
            <button onClick={() => scrollToSection('learn')} className={`transition-colors cursor-pointer ${isDarkMode ? 'hover:text-white' : 'hover:text-black'}`}>
              Learn
            </button>
            <button onClick={() => scrollToSection('build')} className={`transition-colors cursor-pointer ${isDarkMode ? 'hover:text-white' : 'hover:text-black'}`}>
              Build
            </button>
            <button onClick={() => scrollToSection('discover')} className={`transition-colors cursor-pointer ${isDarkMode ? 'hover:text-white' : 'hover:text-black'}`}>
              Discover
            </button>
            <button onClick={() => scrollToSection('career')} className={`transition-colors cursor-pointer ${isDarkMode ? 'hover:text-white' : 'hover:text-black'}`}>
              Career
            </button>
          </div>

          {/* Right Action & Theme Toggle Pill */}
          <div className="flex items-center gap-3">
            {/* Minimal Theme Switcher Pill (Light / Dark / System) */}
            <div className={`flex items-center gap-1 p-1 rounded-full border ${
              isDarkMode ? 'bg-neutral-900/60 border-neutral-800' : 'bg-neutral-100 border-neutral-300'
            }`}>
              <button
                onClick={() => handleUpdateMode('light')}
                className={`p-1.5 rounded-full transition-all cursor-pointer ${
                  activeSettings.themeMode === 'light'
                    ? (isDarkMode ? 'bg-white text-black font-bold' : 'bg-black text-white font-bold')
                    : 'text-neutral-400 hover:text-white'
                }`}
                title="Light Mode"
              >
                <Sun size={13} />
              </button>
              <button
                onClick={() => handleUpdateMode('dark')}
                className={`p-1.5 rounded-full transition-all cursor-pointer ${
                  activeSettings.themeMode === 'dark'
                    ? (isDarkMode ? 'bg-white text-black font-bold' : 'bg-black text-white font-bold')
                    : 'text-neutral-400 hover:text-white'
                }`}
                title="Dark Mode"
              >
                <Moon size={13} />
              </button>
              <button
                onClick={() => handleUpdateMode('system')}
                className={`px-2 py-1 rounded-full text-[10px] font-mono transition-all cursor-pointer ${
                  activeSettings.themeMode === 'system'
                    ? (isDarkMode ? 'bg-white text-black font-bold' : 'bg-black text-white font-bold')
                    : 'text-neutral-400 hover:text-white'
                }`}
                title="System Mode"
              >
                AUTO
              </button>
            </div>

            <button
              onClick={onSignIn}
              className={`border rounded-full px-5 py-2 text-xs font-semibold transition-all cursor-pointer ${
                isDarkMode 
                  ? 'border-neutral-700 bg-transparent text-white hover:bg-white hover:text-black' 
                  : 'border-neutral-300 bg-transparent text-neutral-900 hover:bg-neutral-900 hover:text-white'
              }`}
            >
              Sign In
            </button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center pt-32 pb-20 px-4 max-w-5xl mx-auto text-center space-y-10">
        <div className="space-y-6 animate-fade-in max-w-3xl">
          {/* Large Monochromatic DOAP Wordmark Logo */}
          <h1 className={`text-7xl sm:text-8xl md:text-9xl font-black tracking-tighter leading-none ${
            isDarkMode ? 'text-white' : 'text-[#0a0a0a]'
          }`}>
            DOAP
          </h1>

          {/* Headline */}
          <h2 className={`text-xl sm:text-2xl md:text-3xl font-medium tracking-tight leading-relaxed ${
            isDarkMode ? 'text-neutral-300' : 'text-neutral-700'
          }`}>
            AI-powered learning & career platform
          </h2>

          <p className={`text-xs sm:text-sm font-normal leading-relaxed max-w-xl mx-auto ${
            isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
          }`}>
            A unified environment for technical education, real-world skill development, AI-proctored interview practice, and career navigation.
          </p>
        </div>

        {/* Primary Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <button
            onClick={onGetStarted}
            className={`w-full sm:w-auto px-8 py-4 font-semibold text-xs rounded-full transition-all cursor-pointer flex items-center justify-center gap-2 group ${
              isDarkMode 
                ? 'bg-white text-black hover:bg-neutral-200' 
                : 'bg-[#0a0a0a] text-white hover:bg-neutral-800'
            }`}
          >
            <span>Get Started</span>
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </button>

          <button
            onClick={onSignIn}
            className={`w-full sm:w-auto px-8 py-4 border font-semibold text-xs rounded-full transition-all cursor-pointer ${
              isDarkMode 
                ? 'border-neutral-800 bg-transparent text-neutral-300 hover:text-white hover:border-neutral-500' 
                : 'border-neutral-300 bg-transparent text-neutral-700 hover:text-black hover:border-neutral-600'
            }`}
          >
            <span>Sign In to Platform</span>
          </button>
        </div>

        {/* Hero Monochromatic Product Reel Visual Frame */}
        <div className="pt-12 w-full">
          <div
            ref={heroVisualRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={tiltStyle}
            className={`rounded-3xl border p-6 md:p-10 text-left transition-transform duration-300 ease-out space-y-6 shadow-2xl ${
              isDarkMode 
                ? 'border-neutral-800 bg-[#0a0a0a]' 
                : 'border-neutral-200 bg-[#f7f7f7]'
            }`}
          >
            <div className={`flex items-center justify-between border-b pb-4 ${
              isDarkMode ? 'border-neutral-800' : 'border-neutral-300'
            }`}>
              <div className="flex items-center gap-2">
                <div className={`w-2.5 h-2.5 rounded-full ${isDarkMode ? 'bg-neutral-700' : 'bg-neutral-400'}`} />
                <div className={`w-2.5 h-2.5 rounded-full ${isDarkMode ? 'bg-neutral-700' : 'bg-neutral-400'}`} />
                <div className={`w-2.5 h-2.5 rounded-full ${isDarkMode ? 'bg-neutral-700' : 'bg-neutral-400'}`} />
              </div>
              <span className={`text-[10px] font-mono uppercase tracking-widest ${
                isDarkMode ? 'text-neutral-500' : 'text-neutral-400'
              }`}>
                DOAP INTELLIGENCE SUITE
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div className={`p-6 rounded-2xl border space-y-3 ${
                isDarkMode 
                  ? 'bg-neutral-900/60 border-neutral-800/80' 
                  : 'bg-white border-neutral-200'
              }`}>
                <span className={`text-[10px] font-mono uppercase tracking-wider block ${
                  isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
                }`}>01 / TUTOR ENGINE</span>
                <h3 className={`text-base font-semibold ${isDarkMode ? 'text-white' : 'text-black'}`}>
                  Step-by-step Technical Reasoning
                </h3>
                <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>
                  Interactive AI mentorship providing real-time analysis of algorithms, system design, and codebase architectures.
                </p>
              </div>

              <div className={`p-6 rounded-2xl border space-y-3 ${
                isDarkMode 
                  ? 'bg-neutral-900/60 border-neutral-800/80' 
                  : 'bg-white border-neutral-200'
              }`}>
                <span className={`text-[10px] font-mono uppercase tracking-wider block ${
                  isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
                }`}>02 / PROCTOR ENGINE</span>
                <h3 className={`text-base font-semibold ${isDarkMode ? 'text-white' : 'text-black'}`}>
                  Computer Vision Proctoring
                </h3>
                <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>
                  Position-specific technical and HR interviews with browser gaze tracking and automated scoring reports.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section 1: LEARN */}
      <section id="learn" className={`relative z-10 py-32 px-4 max-w-5xl mx-auto border-t space-y-8 ${
        isDarkMode ? 'border-neutral-900' : 'border-neutral-200'
      }`}>
        <span className={`text-xs font-mono tracking-widest uppercase block ${
          isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
        }`}>
          01 — LEARN
        </span>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-5 space-y-4">
            <h2 className={`text-3xl md:text-5xl font-bold tracking-tight leading-tight ${
              isDarkMode ? 'text-white' : 'text-black'
            }`}>
              Build knowledge with AI-powered learning.
            </h2>
          </div>
          <div className={`md:col-span-7 space-y-4 text-sm leading-relaxed ${
            isDarkMode ? 'text-neutral-400' : 'text-neutral-600'
          }`}>
            <p>
              DOAP breaks down complex computer science and engineering topics into structured, manageable steps. Your personal AI tutor explains algorithms, evaluates code syntax, and clarifies difficult concepts whenever you need assistance.
            </p>
            <p className={`text-xs font-mono ${isDarkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>
              Data Structures · Algorithms · System Design · Computer Architecture
            </p>
          </div>
        </div>
      </section>

      {/* Content Section 2: BUILD */}
      <section id="build" className={`relative z-10 py-32 px-4 max-w-5xl mx-auto border-t space-y-8 ${
        isDarkMode ? 'border-neutral-900' : 'border-neutral-200'
      }`}>
        <span className={`text-xs font-mono tracking-widest uppercase block ${
          isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
        }`}>
          02 — BUILD
        </span>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-5 space-y-4">
            <h2 className={`text-3xl md:text-5xl font-bold tracking-tight leading-tight ${
              isDarkMode ? 'text-white' : 'text-black'
            }`}>
              Create projects and develop practical skills.
            </h2>
          </div>
          <div className={`md:col-span-7 space-y-4 text-sm leading-relaxed ${
            isDarkMode ? 'text-neutral-400' : 'text-neutral-600'
          }`}>
            <p>
              Theory comes to life through interactive coding sandboxes and hands-on project submissions. Validate your logic against automated test cases and compile real-world portfolio artifacts.
            </p>
            <p className={`text-xs font-mono ${isDarkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>
              Automated Tests · Sandbox Verification · Project Portfolio
            </p>
          </div>
        </div>
      </section>

      {/* Content Section 3: DISCOVER */}
      <section id="discover" className={`relative z-10 py-32 px-4 max-w-5xl mx-auto border-t space-y-8 ${
        isDarkMode ? 'border-neutral-900' : 'border-neutral-200'
      }`}>
        <span className={`text-xs font-mono tracking-widest uppercase block ${
          isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
        }`}>
          03 — DISCOVER
        </span>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-5 space-y-4">
            <h2 className={`text-3xl md:text-5xl font-bold tracking-tight leading-tight ${
              isDarkMode ? 'text-white' : 'text-black'
            }`}>
              Explore opportunities and career paths.
            </h2>
          </div>
          <div className={`md:col-span-7 space-y-4 text-sm leading-relaxed ${
            isDarkMode ? 'text-neutral-400' : 'text-neutral-600'
          }`}>
            <p>
              Match your technical profile against 14+ target job descriptions. The platform identifies exact topic gaps and provides clear roadmaps to align your capabilities with market demand.
            </p>
            <p className={`text-xs font-mono ${isDarkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>
              Role Matchmaking · Skill Gap Analysis · Market Alignment
            </p>
          </div>
        </div>
      </section>

      {/* Content Section 4: CAREER */}
      <section id="career" className={`relative z-10 py-32 px-4 max-w-5xl mx-auto border-t space-y-8 ${
        isDarkMode ? 'border-neutral-900' : 'border-neutral-200'
      }`}>
        <span className={`text-xs font-mono tracking-widest uppercase block ${
          isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
        }`}>
          04 — CAREER
        </span>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-5 space-y-4">
            <h2 className={`text-3xl md:text-5xl font-bold tracking-tight leading-tight ${
              isDarkMode ? 'text-white' : 'text-black'
            }`}>
              Turn your skills into meaningful opportunities.
            </h2>
          </div>
          <div className={`md:col-span-7 space-y-4 text-sm leading-relaxed ${
            isDarkMode ? 'text-neutral-400' : 'text-neutral-600'
          }`}>
            <p>
              Prepare for high-stakes interviews with realistic vision-proctored simulations. Receive comprehensive performance scorecards to present to prospective employers.
            </p>
            <p className={`text-xs font-mono ${isDarkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>
              Vision Proctoring · Interview Scorecards · Employer Readiness
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className={`relative z-10 py-36 px-4 max-w-4xl mx-auto text-center space-y-8 border-t ${
        isDarkMode ? 'border-neutral-900' : 'border-neutral-200'
      }`}>
        <h2 className={`text-5xl sm:text-6xl md:text-7xl font-black tracking-tighter ${
          isDarkMode ? 'text-white' : 'text-black'
        }`}>
          DOAP
        </h2>

        <p className={`text-xl sm:text-2xl font-medium tracking-tight max-w-xl mx-auto ${
          isDarkMode ? 'text-neutral-300' : 'text-neutral-700'
        }`}>
          Build the career you're capable of.
        </p>

        <div className="pt-2">
          <button
            onClick={onGetStarted}
            className={`px-10 py-4 font-semibold text-xs rounded-full transition-all inline-flex items-center gap-2 cursor-pointer group ${
              isDarkMode 
                ? 'bg-white text-black hover:bg-neutral-200' 
                : 'bg-black text-white hover:bg-neutral-800'
            }`}
          >
            <span>Get Started</span>
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </section>

      {/* Minimal Footer */}
      <footer className={`relative z-10 border-t py-10 px-4 text-center text-xs font-mono ${
        isDarkMode ? 'border-neutral-900 text-neutral-400' : 'border-neutral-200 text-neutral-500'
      }`}>
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className={`font-bold tracking-widest ${isDarkMode ? 'text-white' : 'text-black'}`}>DOAP</span>
          <p>© {new Date().getFullYear()} DOAP PLATFORM. ALL RIGHTS RESERVED.</p>
          <div className="flex items-center gap-6">
            <button onClick={onSignIn} className={`transition-colors cursor-pointer ${isDarkMode ? 'hover:text-white' : 'hover:text-black'}`}>SIGN IN</button>
            <button onClick={onGetStarted} className={`transition-colors cursor-pointer ${isDarkMode ? 'hover:text-white' : 'hover:text-black'}`}>GET STARTED</button>
          </div>
        </div>
      </footer>
    </div>
  );
};
