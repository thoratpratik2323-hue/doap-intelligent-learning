import React, { useState, useEffect, useRef } from "react";
import { 
  Mic, 
  MicOff, 
  Power, 
  Volume2, 
  Sparkles, 
  Brain, 
  Monitor, 
  Play, 
  Pause, 
  RefreshCw, 
  Settings as SettingsIcon,
  MessageSquare,
  Key,
  Flame,
  Shield,
  Send,
  X,
  ArrowLeft,
  Share2,
  HelpCircle
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { MyraaCoreVisualizer } from "../components/Myraa/MyraaCoreVisualizer";
import { MemoryDashboard } from "../components/Myraa/MemoryDashboard";
import { SettingsPanel } from "../components/Myraa/SettingsPanel";
import { ApiKeyGate } from "../components/Myraa/ApiKeyGate";
import { HolographicProjector } from "../components/Myraa/HolographicProjector";
import { MyraaWebSession } from "../lib/myraaAudio";
import { loadMemories, addMemory, deleteMemory } from "../lib/myraaMemory";
import { MyraaWakeWordDetector } from "../lib/myraaWakeWord";
import { DEFAULT_MYRAA_SETTINGS, THEME_COLOR_MAP } from "../lib/myraaTypes";
import { getMyraaAudioAnalyser } from "../services/elevenLabsService";

export const VoiceTutor = () => {
  const { navigateTo, isDarkMode } = useTheme();

  // Core Session State
  const [state, setState] = useState("disconnected"); // "disconnected" | "connecting" | "listening" | "speaking"
  const [characterState, setCharacterState] = useState("idle");
  const [activeEmotion, setActiveEmotion] = useState("idle");
  const [themeColor, setThemeColor] = useState("crimson");

  // Captions & Transcripts
  const [userCaption, setUserCaption] = useState("");
  const [modelCaption, setModelCaption] = useState("");
  const [typedInput, setTypedInput] = useState("");

  // Screen Sharing Vision
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isScreenSharingPaused, setIsScreenSharingPaused] = useState(false);
  const screenStreamRef = useRef(null);
  const screenVideoRef = useRef(null);
  const screenCanvasRef = useRef(null);
  const screenIntervalRef = useRef(null);

  // Memories
  const [memories, setMemories] = useState(() => loadMemories());
  const [showMemoryDashboard, setShowMemoryDashboard] = useState(false);

  // Settings & Wake Word
  const [settings, setSettings] = useState(() => {
    try {
      const saved = localStorage.getItem("myraa_settings_v2");
      return saved ? { ...DEFAULT_MYRAA_SETTINGS, ...JSON.parse(saved) } : DEFAULT_MYRAA_SETTINGS;
    } catch {
      return DEFAULT_MYRAA_SETTINGS;
    }
  });
  const [showSettings, setShowSettings] = useState(false);
  const [showApiKeyGate, setShowApiKeyGate] = useState(false);
  const [projectorUrl, setProjectorUrl] = useState(null);

  const sessionRef = useRef(null);
  const wakeDetectorRef = useRef(null);

  // Save Settings
  const handleSettingsChange = (patch) => {
    const updated = { ...settings, ...patch };
    setSettings(updated);
    if (patch.themeColor) setThemeColor(patch.themeColor);
    try {
      localStorage.setItem("myraa_settings_v2", JSON.stringify(updated));
    } catch (e) {}
  };

  // Sync session character state with audio session state
  useEffect(() => {
    if (state === "speaking") {
      setCharacterState("talking");
    } else if (state === "connecting" || state === "thinking") {
      setCharacterState("thinking");
    } else if (state === "listening") {
      setCharacterState("listening");
    } else {
      setCharacterState("idle");
    }
  }, [state]);

  // Wake Word Detector Lifecycle
  useEffect(() => {
    const det = new MyraaWakeWordDetector();
    wakeDetectorRef.current = det;

    if (settings.wakeWordEnabled && state === "disconnected") {
      det.start({
        phrase: settings.wakePhrase || "hey myraa",
        sensitivity: settings.sensitivity || 60,
        onTriggered: () => {
          connectSession();
        }
      });
    }

    return () => {
      det.stop();
    };
  }, [settings.wakeWordEnabled, settings.wakePhrase, state]);

  // Capture screen frame and forward to session
  const captureFrameAndSend = () => {
    const video = screenVideoRef.current;
    if (!video || isScreenSharingPaused || !sessionRef.current) return;
    if (state === "disconnected") return;

    try {
      if (video.videoWidth === 0 || video.videoHeight === 0) return;
      if (!screenCanvasRef.current) {
        screenCanvasRef.current = document.createElement("canvas");
      }
      const canvas = screenCanvasRef.current;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const maxDim = 960;
      let width = video.videoWidth;
      let height = video.videoHeight;
      if (width > maxDim || height > maxDim) {
        if (width > height) {
          height = Math.round((height * maxDim) / width);
          width = maxDim;
        } else {
          width = Math.round((width * maxDim) / height);
          height = maxDim;
        }
      }

      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(video, 0, 0, width, height);

      const dataUrl = canvas.toDataURL("image/jpeg", 0.55);
      const base64 = dataUrl.split(",")[1];
      sessionRef.current.sendVideoFrame(base64);
    } catch (err) {
      console.warn("[Myraa Screen Vision] Frame capture error:", err);
    }
  };

  const startScreenSharing = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: { width: { ideal: 1280 }, height: { ideal: 720 }, frameRate: { ideal: 5 } },
        audio: false
      });

      screenStreamRef.current = stream;
      const video = document.createElement("video");
      video.srcObject = stream;
      video.muted = true;
      video.playsInline = true;
      video.play().catch(() => {});
      screenVideoRef.current = video;

      setIsScreenSharing(true);
      setIsScreenSharingPaused(false);

      stream.getVideoTracks()[0].onended = () => {
        stopScreenSharing();
      };

      if (screenIntervalRef.current) clearInterval(screenIntervalRef.current);
      screenIntervalRef.current = setInterval(captureFrameAndSend, 2000);
      setTimeout(captureFrameAndSend, 400);

    } catch (e) {
      console.warn("Screen share permission declined:", e);
    }
  };

  const stopScreenSharing = () => {
    if (screenIntervalRef.current) {
      clearInterval(screenIntervalRef.current);
      screenIntervalRef.current = null;
    }
    if (screenStreamRef.current) {
      screenStreamRef.current.getTracks().forEach(t => t.stop());
      screenStreamRef.current = null;
    }
    if (screenVideoRef.current) {
      screenVideoRef.current.pause();
      screenVideoRef.current = null;
    }
    setIsScreenSharing(false);
    setIsScreenSharingPaused(false);
  };

  // Connect or toggle session
  const connectSession = async () => {
    if (state !== "disconnected") {
      if (sessionRef.current) {
        sessionRef.current.disconnect();
      }
      stopScreenSharing();
      setState("disconnected");
      return;
    }

    const session = new MyraaWebSession({
      onStateChange: (newState) => setState(newState),
      onTranscription: (role, text) => {
        if (role === "user") setUserCaption(text);
        if (role === "model") setModelCaption(text);
      },
      onEmotionChange: (emotion) => setActiveEmotion(emotion),
      onError: (err) => console.error("[Myraa error]", err)
    });

    sessionRef.current = session;
    await session.connect();
  };

  // Memory Handlers
  const handleAddMemory = async (cat, text) => {
    addMemory(cat, text);
    setMemories(loadMemories());
  };

  const handleDeleteMemory = async (id) => {
    const updated = deleteMemory(id);
    setMemories(updated);
  };

  // Quick Prompt pills
  const handleQuickPrompt = (promptText) => {
    if (sessionRef.current && state !== "disconnected") {
      sessionRef.current.handleUserQuery(promptText);
    } else {
      connectSession().then(() => {
        setTimeout(() => {
          if (sessionRef.current) sessionRef.current.handleUserQuery(promptText);
        }, 1200);
      });
    }
  };

  const handleSendTyped = (e) => {
    e.preventDefault();
    if (!typedInput.trim()) return;
    const msg = typedInput.trim();
    setTypedInput("");
    handleQuickPrompt(msg);
  };

  return (
    <div className="relative w-full h-[calc(100vh-3.5rem)] flex flex-col justify-between overflow-hidden bg-gradient-to-b from-rose-50/40 via-white to-rose-50/30 text-[#18181B] select-none">
      
      {/* ── Center Stage: Holographic Visualizer ─────────────── */}
      <main className="relative flex-1 flex flex-col items-center justify-center overflow-hidden">
        {/* Living Core Visualizer */}
        <div className="absolute inset-0">
          <MyraaCoreVisualizer
            state={state}
            themeColor={settings.themeColor || "crimson"}
            activeEmotion={activeEmotion}
            characterState={characterState}
            audioAnalyser={getMyraaAudioAnalyser() || sessionRef.current?.inputAnalyser || null}
          />
        </div>
      </main>

      {/* ── Live Speech Subtitles / Dialogue Feedback Bar ── */}
      {(userCaption || modelCaption) && state !== "disconnected" && (
        <div className="relative z-30 max-w-xl mx-auto px-4 pb-2 w-full animate-fade-in">
          <div className="p-3.5 rounded-2xl bg-white/95 border border-rose-200 shadow-xl shadow-rose-950/5 backdrop-blur-md text-center space-y-1">
            {state === "listening" && userCaption && (
              <p className="text-xs font-mono text-neutral-500 font-semibold truncate">
                <span className="text-rose-600 font-bold">🎙️ You:</span> "{userCaption}"
              </p>
            )}
            {modelCaption && (
              <p className="text-xs sm:text-sm font-medium text-[#18181B] leading-relaxed">
                <span className="text-rose-600 font-bold">👩‍🏫 Myraa:</span> "{modelCaption}"
              </p>
            )}
          </div>
        </div>
      )}

      {/* ── 3. Bottom Controls HUD ────────────────────────────────────────── */}
      <footer className="relative z-30 flex items-center justify-center gap-3 px-4 py-4 border-t border-rose-100 bg-white/95 backdrop-blur-xl shrink-0 shadow-lg shadow-rose-950/5">
        {/* Central Microphone / Power Toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={connectSession}
            className={`p-4 px-6 rounded-3xl border font-bold transition-all shadow-xl cursor-pointer flex items-center justify-center gap-2.5 ${
              state !== "disconnected"
                ? "bg-rose-600 border-rose-500 hover:bg-rose-700 text-white shadow-rose-600/30 scale-105"
                : "bg-rose-600 border-rose-500 hover:bg-rose-700 text-white shadow-rose-600/25 hover:scale-105"
            }`}
          >
            {state !== "disconnected" ? (
              <>
                <Power size={20} />
                <span className="font-mono text-xs uppercase tracking-wider pr-1">Disconnect</span>
              </>
            ) : (
              <>
                <Mic size={20} className="text-white" />
                <span className="font-mono text-xs uppercase tracking-wider pr-1 text-white">Start Myraa Session</span>
              </>
            )}
          </button>

          {/* Interrupt button */}
          {state === "speaking" && (
            <button
              onClick={() => sessionRef.current?.interrupt()}
              className="px-4 py-3.5 rounded-2xl border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-800 font-mono text-xs font-bold transition-all cursor-pointer animate-fade-in shadow-sm"
              title="Interrupt Myraa"
            >
              Interrupt
            </button>
          )}
        </div>
      </footer>

      {/* ── 4. Modals ──────────────────────────────────────────────────────── */}
      <MemoryDashboard
        isOpen={showMemoryDashboard}
        onClose={() => setShowMemoryDashboard(false)}
        memories={memories}
        onAddMemory={handleAddMemory}
        onDeleteMemory={handleDeleteMemory}
        themeColor={settings.themeColor || "crimson"}
      />

      <SettingsPanel
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        settings={settings}
        onChange={handleSettingsChange}
        onOpenApiKeyGate={() => setShowApiKeyGate(true)}
      />

      <ApiKeyGate
        isOpen={showApiKeyGate}
        onClose={() => setShowApiKeyGate(false)}
      />

      <HolographicProjector
        url={projectorUrl}
        onClose={() => setProjectorUrl(null)}
      />
    </div>
  );
};
export default VoiceTutor;
