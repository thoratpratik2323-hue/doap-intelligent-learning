/**
 * MYRAA Engine Definitions & Constants
 */

export const MEMORY_CATEGORIES = [
  'identity',
  'preference',
  'goal',
  'project',
  'relationship',
  'emotional',
  'behavior'
];

export const DEFAULT_MYRAA_SETTINGS = {
  autoStart: false,
  wakeWordEnabled: false,
  wakePhrase: "hey myraa",
  micDeviceId: "",
  sensitivity: 60,
  animations: true,
  themeColor: "crimson",
  voiceEngine: "elevenlabs", // "elevenlabs" | "gemini_live" | "browser"
  voiceSpeed: 1.0,
};

export const THEME_COLOR_MAP = {
  crimson: { primary: "rgba(225, 29, 72, 1)", secondary: "rgba(190, 18, 60, 0.8)", glow: "rgba(225, 29, 72, 0.45)", hex: "#E11D48" },
  violet: { primary: "rgba(139, 92, 246, 1)", secondary: "rgba(168, 85, 247, 0.8)", glow: "rgba(139, 92, 246, 0.45)", hex: "#8B5CF6" },
  peach: { primary: "rgba(251, 146, 60, 1)", secondary: "rgba(249, 115, 22, 0.8)", glow: "rgba(251, 146, 60, 0.45)", hex: "#FB923C" },
  celestial: { primary: "rgba(2, 132, 199, 1)", secondary: "rgba(14, 165, 233, 0.8)", glow: "rgba(56, 189, 248, 0.45)", hex: "#0284C7" },
  emerald: { primary: "rgba(16, 185, 129, 1)", secondary: "rgba(5, 150, 105, 0.8)", glow: "rgba(16, 185, 129, 0.45)", hex: "#10B981" },
  charcoal: { primary: "rgba(99, 102, 241, 1)", secondary: "rgba(129, 140, 248, 0.8)", glow: "rgba(99, 102, 241, 0.45)", hex: "#6366F1" },
};
