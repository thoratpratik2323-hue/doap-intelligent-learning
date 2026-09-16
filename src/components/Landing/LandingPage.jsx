import React, { useState, useRef } from 'react';
import { ArrowRight } from 'lucide-react';

export const LandingPage = ({ onGetStarted, onSignIn }) => {
  const [tiltStyle, setTiltStyle] = useState({ transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg)' });
  const heroVisualRef = useRef(null);

  // Subtle cursor interaction on visual preview
  const handleMouseMove = (e) => {
    if (!heroVisualRef.current) return;
    const rect = heroVisualRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotateX = (-y / rect.height) * 3;
    const rotateY = (x / rect.width) * 3;
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
    <div className="min-h-screen bg-white text-[#18181B] select-none font-sans relative overflow-x-hidden">
      {/* Ambient Cherry Glow & Subtle Grain Texture */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute inset-0 [background-size:32px_32px] bg-[radial-gradient(#e11d48_1px,transparent_1px)] opacity-[0.025]" />
        <div className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-gradient-to-tr from-rose-100/50 via-white to-rose-50/40 blur-[140px]" />
        <div className="absolute bottom-[-15%] right-[-10%] w-[65vw] h-[65vw] rounded-full bg-gradient-to-bl from-rose-100/40 via-white to-white blur-[150px]" />
      </div>

      {/* Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 p-4">
        <nav className="max-w-5xl mx-auto backdrop-blur-xl border border-rose-100 bg-white/95 rounded-full px-6 py-3 flex items-center justify-between shadow-lg shadow-rose-950/5 transition-colors">
          {/* Left Wordmark / Logo */}
          <div 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <img 
              src="/ziv-logo.png" 
              alt="Ziv Logo" 
              className="h-8 object-contain hover:scale-105 transition-transform" 
            />
          </div>

          {/* Center Links */}
          <div className="hidden md:flex items-center gap-10 text-xs font-mono uppercase tracking-widest text-neutral-600">
            <button onClick={() => scrollToSection('learn')} className="transition-colors cursor-pointer hover:text-rose-600 font-semibold">
              Learn
            </button>
            <button onClick={() => scrollToSection('build')} className="transition-colors cursor-pointer hover:text-rose-600 font-semibold">
              Build
            </button>
            <button onClick={() => scrollToSection('discover')} className="transition-colors cursor-pointer hover:text-rose-600 font-semibold">
              Discover
            </button>
            <button onClick={() => scrollToSection('career')} className="transition-colors cursor-pointer hover:text-rose-600 font-semibold">
              Career
            </button>
          </div>

          {/* Right Action */}
          <div className="flex items-center gap-3">
            <button
              onClick={onSignIn}
              className="border border-rose-200 rounded-full px-5 py-2 text-xs font-bold transition-all cursor-pointer bg-white text-rose-700 hover:bg-rose-600 hover:text-white hover:border-rose-600 shadow-sm"
            >
              Sign In
            </button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center pt-32 pb-20 px-4 max-w-5xl mx-auto text-center space-y-10">
        <div className="space-y-6 animate-fade-in max-w-3xl flex flex-col items-center">
          {/* Large Ziv Wordmark with Cherry Accent */}
          <h1 className="text-7xl sm:text-8xl md:text-9xl font-black tracking-tighter leading-none text-[#18181B]">
            Ziv
          </h1>

          <p className="text-xs sm:text-sm font-mono tracking-widest uppercase font-bold text-rose-600">
            The modern playground for future developers
          </p>

          {/* Headline */}
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight leading-relaxed text-[#18181B]">
            AI-powered learning & career platform
          </h2>

          <p className="text-xs sm:text-sm font-normal leading-relaxed max-w-xl mx-auto text-neutral-600">
            A unified environment for technical education, real-world skill development, AI-proctored interview practice, and career navigation.
          </p>
        </div>

        {/* Primary Action Buttons (Cherry Red & Crisp White) */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <button
            onClick={onGetStarted}
            className="w-full sm:w-auto px-8 py-3.5 font-bold text-xs rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 group shadow-xl shadow-rose-600/25 bg-rose-600 hover:bg-rose-700 text-white hover:scale-102"
          >
            <span>Get Started</span>
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </button>

          <button
            onClick={onSignIn}
            className="w-full sm:w-auto px-8 py-3.5 border border-rose-200 font-bold text-xs rounded-xl transition-all cursor-pointer bg-white text-rose-950 hover:bg-rose-50 hover:border-rose-300 shadow-sm"
          >
            <span>Sign In to Platform</span>
          </button>
        </div>

        {/* Hero Product Reel Visual Frame */}
        <div className="pt-12 w-full">
          <div
            ref={heroVisualRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              ...tiltStyle,
              backgroundColor: '#FFFFFF',
              borderColor: 'rgba(225, 29, 72, 0.16)',
            }}
            className="rounded-2xl border p-6 md:p-10 text-left transition-transform duration-300 ease-out space-y-6 shadow-2xl shadow-rose-950/5"
          >
            <div className="flex items-center justify-between border-b border-rose-100 pb-4">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                <div className="w-2.5 h-2.5 rounded-full bg-rose-300" />
                <div className="w-2.5 h-2.5 rounded-full bg-rose-200" />
              </div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-rose-600">
                ZIV INTELLIGENCE SUITE
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div className="p-6 rounded-2xl border border-rose-100 bg-rose-50/40 space-y-3 hover:border-rose-300 transition-colors shadow-sm">
                <span className="text-[10px] font-mono uppercase tracking-wider block text-rose-600 font-bold">
                  01 / TUTOR ENGINE
                </span>
                <h3 className="text-base font-bold text-[#18181B]">
                  Step-by-step Technical Reasoning
                </h3>
                <p className="text-xs leading-relaxed text-neutral-600">
                  Interactive AI mentorship providing real-time analysis of algorithms, system design, and codebase architectures.
                </p>
              </div>

              <div className="p-6 rounded-2xl border border-rose-100 bg-rose-50/40 space-y-3 hover:border-rose-300 transition-colors shadow-sm">
                <span className="text-[10px] font-mono uppercase tracking-wider block text-rose-600 font-bold">
                  02 / PROCTOR ENGINE
                </span>
                <h3 className="text-base font-bold text-[#18181B]">
                  Computer Vision Proctoring
                </h3>
                <p className="text-xs leading-relaxed text-neutral-600">
                  Position-specific technical and HR interviews with browser gaze tracking and automated scoring reports.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section 1: LEARN */}
      <section id="learn" className="relative z-10 py-32 px-4 max-w-5xl mx-auto border-t border-rose-100 space-y-8">
        <span className="text-xs font-mono tracking-widest uppercase block text-rose-600 font-bold">
          01 — LEARN
        </span>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-5 space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight text-[#18181B]">
              Build knowledge with AI-powered learning.
            </h2>
          </div>
          <div className="md:col-span-7 space-y-4 text-sm leading-relaxed text-neutral-600">
            <p>
              Ziv breaks down complex computer science and engineering topics into structured, manageable steps. Your personal AI tutor explains algorithms, evaluates code syntax, and clarifies difficult concepts whenever you need assistance.
            </p>
            <p className="text-xs font-mono text-rose-700 font-semibold">
              Data Structures · Algorithms · System Design · Computer Architecture
            </p>
          </div>
        </div>
      </section>

      {/* Content Section 2: BUILD */}
      <section id="build" className="relative z-10 py-32 px-4 max-w-5xl mx-auto border-t border-rose-100 space-y-8">
        <span className="text-xs font-mono tracking-widest uppercase block text-rose-600 font-bold">
          02 — BUILD
        </span>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-5 space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight text-[#18181B]">
              Create projects and develop practical skills.
            </h2>
          </div>
          <div className="md:col-span-7 space-y-4 text-sm leading-relaxed text-neutral-600">
            <p>
              Theory comes to life through interactive coding sandboxes and hands-on project submissions. Validate your logic against automated test cases and compile real-world portfolio artifacts.
            </p>
            <p className="text-xs font-mono text-rose-700 font-semibold">
              Automated Tests · Sandbox Verification · Project Portfolio
            </p>
          </div>
        </div>
      </section>

      {/* Content Section 3: DISCOVER */}
      <section id="discover" className="relative z-10 py-32 px-4 max-w-5xl mx-auto border-t border-rose-100 space-y-8">
        <span className="text-xs font-mono tracking-widest uppercase block text-rose-600 font-bold">
          03 — DISCOVER
        </span>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-5 space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight text-[#18181B]">
              Explore opportunities and career paths.
            </h2>
          </div>
          <div className="md:col-span-7 space-y-4 text-sm leading-relaxed text-neutral-600">
            <p>
              Match your technical profile against 14+ target job descriptions. The platform identifies exact topic gaps and provides clear roadmaps to align your capabilities with market demand.
            </p>
            <p className="text-xs font-mono text-rose-700 font-semibold">
              Role Matchmaking · Skill Gap Analysis · Market Alignment
            </p>
          </div>
        </div>
      </section>

      {/* Content Section 4: CAREER */}
      <section id="career" className="relative z-10 py-32 px-4 max-w-5xl mx-auto border-t border-rose-100 space-y-8">
        <span className="text-xs font-mono tracking-widest uppercase block text-rose-600 font-bold">
          04 — CAREER
        </span>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-5 space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight text-[#18181B]">
              Turn your skills into meaningful opportunities.
            </h2>
          </div>
          <div className="md:col-span-7 space-y-4 text-sm leading-relaxed text-neutral-600">
            <p>
              Prepare for high-stakes interviews with realistic vision-proctored simulations. Receive comprehensive performance scorecards to present to prospective employers.
            </p>
            <p className="text-xs font-mono text-rose-700 font-semibold">
              Vision Proctoring · Interview Scorecards · Employer Readiness
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative z-10 py-36 px-4 max-w-4xl mx-auto text-center space-y-8 border-t border-rose-100">
        <h2 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tighter text-[#18181B]">
          Ziv
        </h2>

        <p className="text-xl sm:text-2xl font-bold tracking-tight max-w-xl mx-auto text-[#18181B]">
          Build the career you're capable of.
        </p>

        <div className="pt-2">
          <button
            onClick={onGetStarted}
            className="px-10 py-3.5 font-bold text-xs rounded-xl transition-all inline-flex items-center gap-2 cursor-pointer group shadow-xl shadow-rose-600/25 bg-rose-600 hover:bg-rose-700 text-white hover:scale-102"
          >
            <span>Get Started</span>
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </section>

      {/* Minimal Footer */}
      <footer className="relative z-10 border-t border-rose-100 py-10 px-4 text-center text-xs font-mono text-neutral-600">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-bold tracking-widest text-rose-600">ZIV</span>
          <p>© {new Date().getFullYear()} ZIV PLATFORM. ALL RIGHTS RESERVED.</p>
          <div className="flex items-center gap-6">
            <button onClick={onSignIn} className="transition-colors cursor-pointer hover:text-rose-600 font-semibold">SIGN IN</button>
            <button onClick={onGetStarted} className="transition-colors cursor-pointer hover:text-rose-600 font-semibold">GET STARTED</button>
          </div>
        </div>
      </footer>
    </div>
  );
};
