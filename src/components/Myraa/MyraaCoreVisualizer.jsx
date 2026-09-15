import React, { useEffect, useRef, useState } from "react";
import { Sparkles, Brain, Cpu, Zap, Activity } from "lucide-react";
import { THEME_COLOR_MAP } from "../../lib/myraaTypes";

export const MyraaCoreVisualizer = ({
  state = "disconnected", // "disconnected" | "connecting" | "listening" | "speaking"
  themeColor = "crimson",
  activeEmotion = "idle",
  characterState = "idle", // "idle" | "thinking" | "talking"
  audioAnalyser = null,
}) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const mouseRef = useRef({ x: 0.5, y: 0.4 });
  const targetMouseRef = useRef({ x: 0.5, y: 0.4 });
  const speechVolumeRef = useRef(0);
  const particlesRef = useRef([]);

  // Character Video Element Refs
  const idleVideoRef = useRef(null);
  const thinkingVideoRef = useRef(null);
  const talkingVideoRef = useRef(null);
  const [videoError, setVideoError] = useState(false);

  // Synchronized video playback state manager (butter-smooth, zero jitter, zero frame freeze)
  useEffect(() => {
    const ensurePlaying = (video) => {
      if (!video) return;
      try {
        if (video.paused) {
          const promise = video.play();
          if (promise !== undefined) promise.catch(() => {});
        }
      } catch (e) {}
    };

    // Keep videos running smoothly in background so opacity crossfade is instant and fluid
    ensurePlaying(idleVideoRef.current);
    ensurePlaying(thinkingVideoRef.current);
    ensurePlaying(talkingVideoRef.current);
  }, [characterState]);

  // Cursor position tracking
  useEffect(() => {
    const handleMouseMove = (e) => {
      targetMouseRef.current = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      };
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Theme glow colors
  const getGlowColors = () => {
    return THEME_COLOR_MAP[themeColor] || THEME_COLOR_MAP.violet;
  };

  // Canvas Graphics Rendering Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const generateParticles = () => {
      const count = Math.min(60, Math.floor(width / 22));
      particlesRef.current = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height + height * 0.1,
        speed: Math.random() * 0.35 + 0.15,
        size: Math.random() * 2 + 0.6,
        opacity: Math.random() * 0.6 + 0.25,
      }));
    };

    generateParticles();

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
      generateParticles();
    };

    window.addEventListener("resize", handleResize);

    const dataArray = new Uint8Array(64);

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      const systemTime = performance.now();
      const colors = getGlowColors();

      // Audio analysis
      let audioLevel = 0;
      if (audioAnalyser) {
        try {
          audioAnalyser.getByteFrequencyData(dataArray);
          let sum = 0;
          for (let i = 0; i < 32; i++) {
            sum += dataArray[i];
          }
          audioLevel = sum / 32; // 0..255
        } catch (e) {}
      } else if (state === "speaking") {
        audioLevel = 60 + Math.sin(systemTime * 0.01) * 35 + Math.cos(systemTime * 0.02) * 20;
      } else if (state === "listening") {
        audioLevel = 25 + Math.sin(systemTime * 0.005) * 15;
      }

      speechVolumeRef.current += (audioLevel / 255 - speechVolumeRef.current) * 0.2;
      const vol = speechVolumeRef.current;

      // Mouse tracking interpolation
      mouseRef.current.x += (targetMouseRef.current.x - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (targetMouseRef.current.y - mouseRef.current.y) * 0.05;

      const centerX = width / 2;
      const baseScale = Math.min(width, height) / 400;
      const s = Math.max(0.85, Math.min(1.4, baseScale));

      // ── 1. Volumetric Conical Light Beam ──────────────────────────────────
      ctx.save();
      const projectorCenterY = height + 30;
      const baseDiameterX = 280 * s;

      const beamGrad = ctx.createLinearGradient(centerX, height * 0.15, centerX, height);
      beamGrad.addColorStop(0, "rgba(0,0,0,0)");
      beamGrad.addColorStop(0.35, colors.primary.replace("1)", "0.04)"));
      beamGrad.addColorStop(0.7, colors.primary.replace("1)", "0.10)"));
      beamGrad.addColorStop(1, colors.secondary.replace("0.8)", "0.22)"));

      ctx.fillStyle = beamGrad;
      ctx.beginPath();
      ctx.moveTo(centerX - baseDiameterX * 0.35, projectorCenterY - 140);
      ctx.lineTo(centerX + baseDiameterX * 0.35, projectorCenterY - 140);
      ctx.lineTo(centerX + baseDiameterX * 1.6, height);
      ctx.lineTo(centerX - baseDiameterX * 1.6, height);
      ctx.closePath();
      ctx.fill();
      ctx.restore();

      // ── 2. Rising Neural Particles (Stardust Field) ────────────────────────
      ctx.save();
      particlesRef.current.forEach((p) => {
        const riseSpeed = p.speed * (1 + vol * 2.2);
        p.y -= riseSpeed;
        p.x += Math.sin(p.y * 0.015 + p.size) * 0.35;

        const currentOpacity = p.opacity * Math.max(0, p.y / height);

        if (p.y < height * 0.12) {
          p.y = height + Math.random() * 25;
          p.x = Math.random() * width;
        }

        ctx.fillStyle = colors.primary.replace("1)", `${currentOpacity * 0.55})`);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * s, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.restore();

      animationRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [state, themeColor, activeEmotion, characterState, audioAnalyser]);

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden select-none">
      {/* 1. Behind Ambient Radial Glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <div
          className="w-[480px] h-[480px] rounded-full blur-[140px] opacity-30 transition-all duration-1000"
          style={{
            backgroundColor: THEME_COLOR_MAP[themeColor]?.hex || "#8B5CF6",
          }}
        />
      </div>

      {/* 2. Character Girl Animated Presence (Z-index 10) */}
      <div 
        id="myraa-animated-presence"
        className="absolute z-10 w-full h-full flex items-center justify-center pointer-events-none"
      >
        <div className={`relative w-full max-w-2xl aspect-[16/9] flex items-center justify-center select-none pointer-events-none md:max-h-[68vh] max-h-[58vh] transition-all duration-500 ease-out ${
          characterState === "listening" ? "scale-[1.04] -translate-y-1.5" :
          characterState === "thinking" ? "scale-100" :
          "scale-100 sm:scale-105"
        }`}>
          {/* Subtle Outer Ambient Shadow */}
          <div className={`absolute inset-0 rounded-[2.5rem] blur-[30px] opacity-25 mix-blend-screen transition-colors duration-700 ${
            characterState === "thinking" ? "bg-amber-500/25" :
            characterState === "talking" ? "bg-rose-600/30" :
            characterState === "listening" ? "bg-rose-500/25" : "bg-rose-600/20"
          }`} />

          {/* Dedicated Attentive Listening Sound Wave Rings (Ears Forward & Alert) */}
          {characterState === "listening" && (
            <div className="absolute inset-0 flex items-center justify-between px-6 pointer-events-none z-20 animate-fade-in">
              {/* Left ear sound waves */}
              <div className="flex items-center gap-1 opacity-75">
                <span className="w-1.5 h-6 rounded-full bg-rose-500 animate-pulse" />
                <span className="w-1.5 h-10 rounded-full bg-rose-400 animate-pulse delay-75" />
                <span className="w-1.5 h-4 rounded-full bg-rose-500 animate-pulse delay-150" />
              </div>
              {/* Right ear sound waves */}
              <div className="flex items-center gap-1 opacity-75">
                <span className="w-1.5 h-4 rounded-full bg-rose-500 animate-pulse delay-150" />
                <span className="w-1.5 h-10 rounded-full bg-rose-400 animate-pulse delay-75" />
                <span className="w-1.5 h-6 rounded-full bg-rose-500 animate-pulse" />
              </div>
            </div>
          )}

          {/* IDLE / ATTENTIVE LISTENING VIDEO */}
          <video
            ref={idleVideoRef}
            src="/assets/idle.mp4"
            loop
            muted
            playsInline
            autoPlay
            className={`absolute inset-0 w-full h-full object-cover rounded-[2.5rem] transition-opacity duration-500 ease-in-out ${
              characterState === "idle" || characterState === "listening" ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
            style={{
              maskImage: "radial-gradient(circle, rgba(0,0,0,1) 55%, rgba(0,0,0,0) 80%)",
              WebkitMaskImage: "radial-gradient(circle, rgba(0,0,0,1) 55%, rgba(0,0,0,0) 80%)",
            }}
            onError={() => setVideoError(true)}
          />

          {/* THINKING VIDEO (Rock-steady, thoughtful contemplation pose) */}
          <video
            ref={thinkingVideoRef}
            src="/assets/thinking.mp4"
            loop
            muted
            playsInline
            autoPlay
            className={`absolute inset-0 w-full h-full object-cover rounded-[2.5rem] transition-opacity duration-500 ease-in-out ${
              characterState === "thinking" ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
            style={{
              maskImage: "radial-gradient(circle, rgba(0,0,0,1) 55%, rgba(0,0,0,0) 80%)",
              WebkitMaskImage: "radial-gradient(circle, rgba(0,0,0,1) 55%, rgba(0,0,0,0) 80%)",
            }}
            onError={() => setVideoError(true)}
          />

          {/* TALKING VIDEO (Active teaching delivery & mouth movements) */}
          <video
            ref={talkingVideoRef}
            src="/assets/talking.mp4"
            loop
            muted
            playsInline
            autoPlay
            className={`absolute inset-0 w-full h-full object-cover rounded-[2.5rem] transition-opacity duration-500 ease-in-out ${
              characterState === "talking" ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
            style={{
              maskImage: "radial-gradient(circle, rgba(0,0,0,1) 55%, rgba(0,0,0,0) 80%)",
              WebkitMaskImage: "radial-gradient(circle, rgba(0,0,0,1) 55%, rgba(0,0,0,0) 80%)",
            }}
            onError={() => setVideoError(true)}
          />

          {/* Cybernetic Edge Guard */}
          <div className="absolute inset-0 rounded-[2.5rem] border border-rose-200/40 pointer-events-none" />
        </div>
      </div>

      {/* 3. Foreground Interactive Stardust Canvas (Z-index 20) */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-20"
      />

      {/* 4. Floating HUD Emotion & Activity Status Pill */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2.5 px-4 py-2 rounded-full border bg-white/95 backdrop-blur-md text-xs font-mono border-rose-200/80 shadow-lg shadow-rose-950/10">
        <span className={`w-2.5 h-2.5 rounded-full ${
          characterState === "talking" ? "bg-emerald-500 animate-ping" :
          characterState === "thinking" ? "bg-amber-500 animate-pulse" :
          characterState === "listening" ? "bg-rose-500 animate-pulse" :
          state === "connecting" ? "bg-rose-400 animate-pulse" : "bg-slate-400"
        }`} />
        <span className="font-bold text-[#18181B] uppercase tracking-wider text-[11px]">
          {characterState === "talking" ? "🎙️ Professor Myraa Explaining" :
           characterState === "thinking" ? "🧠 Formulating Intuitive Solution..." :
           characterState === "listening" ? "👂 Listening Intently (Ears Alert)" :
           state === "connecting" ? "⚡ Initializing Neural Core" : "Offline"}
        </span>
        {activeEmotion && activeEmotion !== "idle" && (
          <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
            {activeEmotion}
          </span>
        )}
      </div>
    </div>
  );
};
