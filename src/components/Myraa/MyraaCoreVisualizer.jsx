import React, { useEffect, useRef, useState } from "react";
import { Sparkles, Brain, Cpu, Zap, Activity } from "lucide-react";
import { THEME_COLOR_MAP } from "../../lib/myraaTypes";

export const MyraaCoreVisualizer = ({
  state = "disconnected", // "disconnected" | "connecting" | "listening" | "speaking"
  themeColor = "violet",
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
      const count = Math.min(70, Math.floor(width / 20));
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
        // Simulated natural voice modulation when talking
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
      const centerY = height * 0.46;
      const baseScale = Math.min(width, height) / 380;
      const s = Math.max(0.85, Math.min(1.4, baseScale));

      // ── 1. Volumetric Conical Light Beam ──────────────────────────────────
      ctx.save();
      const projectorCenterY = height + 30;
      const baseDiameterX = 260 * s;

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

      // ── 2. Holographic Core Rings & Reactor ────────────────────────────────
      ctx.save();
      const coreRadius = (72 + vol * 36) * s;
      const pulseTime = systemTime * 0.002;

      // Outer Orbital Rings
      const ringCount = 3;
      for (let i = 0; i < ringCount; i++) {
        const angleOffset = (pulseTime * (i % 2 === 0 ? 1 : -1) * (0.8 + i * 0.3));
        const rX = coreRadius + (i * 24 + Math.sin(pulseTime + i) * 6) * s;
        const rY = (coreRadius * 0.45) + (i * 12) * s;

        ctx.strokeStyle = i === 0 ? colors.primary : colors.secondary;
        ctx.lineWidth = i === 0 ? 2 : 1.2;
        ctx.globalAlpha = 0.35 + vol * 0.45;

        ctx.beginPath();
        ctx.ellipse(centerX, centerY, rX, rY, angleOffset, 0, Math.PI * 2);
        ctx.stroke();

        // Node satellites along orbit
        const satAngle = angleOffset + pulseTime * 1.5;
        const satX = centerX + Math.cos(satAngle) * rX;
        const satY = centerY + Math.sin(satAngle) * rY;
        ctx.fillStyle = colors.glow;
        ctx.beginPath();
        ctx.arc(satX, satY, 3 * s, 0, Math.PI * 2);
        ctx.fill();
      }

      // Central Plasma Orb
      const plasmaGrad = ctx.createRadialGradient(
        centerX + (mouseRef.current.x - 0.5) * 20,
        centerY + (mouseRef.current.y - 0.5) * 20,
        4 * s,
        centerX,
        centerY,
        coreRadius
      );
      plasmaGrad.addColorStop(0, "#FFFFFF");
      plasmaGrad.addColorStop(0.25, colors.primary);
      plasmaGrad.addColorStop(0.7, colors.secondary);
      plasmaGrad.addColorStop(1, "rgba(0,0,0,0)");

      ctx.globalAlpha = 0.85 + vol * 0.15;
      ctx.fillStyle = plasmaGrad;
      ctx.beginPath();
      ctx.arc(centerX, centerY, coreRadius, 0, Math.PI * 2);
      ctx.fill();

      // Core Inner Tech Hexagon
      ctx.strokeStyle = "rgba(255, 255, 255, 0.75)";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      const hexSides = 6;
      const hexRadius = (coreRadius * 0.42);
      for (let h = 0; h < hexSides; h++) {
        const hexAngle = (h * 2 * Math.PI) / hexSides + pulseTime * 0.5;
        const hX = centerX + hexRadius * Math.cos(hexAngle);
        const hY = centerY + hexRadius * Math.sin(hexAngle);
        if (h === 0) ctx.moveTo(hX, hY);
        else ctx.lineTo(hX, hY);
      }
      ctx.closePath();
      ctx.stroke();

      ctx.restore();

      // ── 3. Rising Neural Particles (Stardust Field) ────────────────────────
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
          className="w-[420px] h-[420px] rounded-full blur-[120px] opacity-35 transition-all duration-1000"
          style={{
            backgroundColor: THEME_COLOR_MAP[themeColor]?.hex || "#8B5CF6",
          }}
        />
      </div>

      {/* 2. Interactive Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-10"
      />

      {/* 3. Floating HUD Emotion & Activity Status Pill */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 px-3.5 py-1.5 rounded-full border bg-black/40 backdrop-blur-md text-xs font-mono border-white/10 shadow-lg">
        <span className={`w-2 h-2 rounded-full ${
          state === "speaking" ? "bg-emerald-400 animate-ping" :
          state === "listening" ? "bg-violet-400 animate-pulse" :
          state === "connecting" ? "bg-amber-400 animate-pulse" : "bg-slate-500"
        }`} />
        <span className="font-bold text-slate-200 uppercase tracking-wider text-[11px]">
          {state === "speaking" ? "Myraa Responding" :
           state === "listening" ? "Listening to Voice" :
           state === "connecting" ? "Establishing Holocore" : "Offline"}
        </span>
        {activeEmotion && activeEmotion !== "idle" && (
          <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-violet-500/20 text-violet-300 border border-violet-500/30">
            {activeEmotion}
          </span>
        )}
      </div>
    </div>
  );
};
