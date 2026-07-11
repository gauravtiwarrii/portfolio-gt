export interface ThemeColors {
  background: string;
  foreground: string;
  primary: string;
  secondary: string;
  accent: string;
  warning: string;
  danger: string;
  border: string;
  glow: string;
  surface: string;
  surfaceHover: string;
  muted: string;
  mutedForeground: string;
}

export interface ThemeDefinition {
  id: string;
  name: string;
  label: string;
  colors: ThemeColors;
}

export const themes: ThemeDefinition[] = [
  {
    id: "cyberpunk",
    name: "Cyberpunk",
    label: "Default GT_OS Theme",
    colors: {
      background: "#050505",
      foreground: "#e4e4e7",
      primary: "#00F5D4",
      secondary: "#00FFC6",
      accent: "#8B5CF6",
      warning: "#FACC15",
      danger: "#EF4444",
      border: "rgba(255,255,255,0.08)",
      glow: "rgba(0,245,212,0.15)",
      surface: "rgba(255,255,255,0.03)",
      surfaceHover: "rgba(255,255,255,0.06)",
      muted: "#27272a",
      mutedForeground: "#71717a",
    },
  },
  {
    id: "matrix",
    name: "Matrix",
    label: "Enter the Matrix",
    colors: {
      background: "#020a02",
      foreground: "#33ff33",
      primary: "#00ff41",
      secondary: "#20c20e",
      accent: "#008f11",
      warning: "#ccff00",
      danger: "#ff0000",
      border: "rgba(0,255,65,0.12)",
      glow: "rgba(0,255,65,0.2)",
      surface: "rgba(0,255,65,0.04)",
      surfaceHover: "rgba(0,255,65,0.08)",
      muted: "#0a1a0a",
      mutedForeground: "#3a7a3a",
    },
  },
  {
    id: "tokyo-night",
    name: "Tokyo Night",
    label: "Tokyo Night Storm",
    colors: {
      background: "#1a1b26",
      foreground: "#c0caf5",
      primary: "#7aa2f7",
      secondary: "#bb9af7",
      accent: "#ff9e64",
      warning: "#e0af68",
      danger: "#f7768e",
      border: "rgba(192,202,245,0.1)",
      glow: "rgba(122,162,247,0.15)",
      surface: "rgba(192,202,245,0.04)",
      surfaceHover: "rgba(192,202,245,0.08)",
      muted: "#24283b",
      mutedForeground: "#565f89",
    },
  },
  {
    id: "nord",
    name: "Nord",
    label: "Arctic Nord",
    colors: {
      background: "#2e3440",
      foreground: "#eceff4",
      primary: "#88c0d0",
      secondary: "#81a1c1",
      accent: "#b48ead",
      warning: "#ebcb8b",
      danger: "#bf616a",
      border: "rgba(236,239,244,0.1)",
      glow: "rgba(136,192,208,0.15)",
      surface: "rgba(236,239,244,0.04)",
      surfaceHover: "rgba(236,239,244,0.08)",
      muted: "#3b4252",
      mutedForeground: "#7b88a1",
    },
  },
  {
    id: "synthwave",
    name: "Synthwave",
    label: "Retro Synthwave",
    colors: {
      background: "#0a0014",
      foreground: "#f5e6ff",
      primary: "#ff6ac1",
      secondary: "#c792ea",
      accent: "#fede5d",
      warning: "#fede5d",
      danger: "#fe4450",
      border: "rgba(255,106,193,0.12)",
      glow: "rgba(255,106,193,0.2)",
      surface: "rgba(255,106,193,0.04)",
      surfaceHover: "rgba(255,106,193,0.08)",
      muted: "#1a0030",
      mutedForeground: "#8a6aa0",
    },
  },
  {
    id: "terminal-green",
    name: "Terminal Green",
    label: "Classic Terminal",
    colors: {
      background: "#0c0c0c",
      foreground: "#33ff00",
      primary: "#33ff00",
      secondary: "#00cc00",
      accent: "#66ff33",
      warning: "#ffff00",
      danger: "#ff3300",
      border: "rgba(51,255,0,0.1)",
      glow: "rgba(51,255,0,0.2)",
      surface: "rgba(51,255,0,0.03)",
      surfaceHover: "rgba(51,255,0,0.06)",
      muted: "#1a1a1a",
      mutedForeground: "#4a9a3a",
    },
  },
  {
    id: "ai-purple",
    name: "AI Purple",
    label: "Neural Network",
    colors: {
      background: "#080010",
      foreground: "#e8d5ff",
      primary: "#a855f7",
      secondary: "#c084fc",
      accent: "#06b6d4",
      warning: "#fbbf24",
      danger: "#ef4444",
      border: "rgba(168,85,247,0.12)",
      glow: "rgba(168,85,247,0.2)",
      surface: "rgba(168,85,247,0.04)",
      surfaceHover: "rgba(168,85,247,0.08)",
      muted: "#150028",
      mutedForeground: "#7a5a9e",
    },
  },
];

export const recruiterTheme: ThemeDefinition = {
  id: "recruiter",
  name: "Recruiter",
  label: "Professional Mode",
  colors: {
    background: "#ffffff",
    foreground: "#1a1a2e",
    primary: "#2563eb",
    secondary: "#3b82f6",
    accent: "#8b5cf6",
    warning: "#f59e0b",
    danger: "#ef4444",
    border: "rgba(0,0,0,0.08)",
    glow: "rgba(37,99,235,0.1)",
    surface: "rgba(0,0,0,0.02)",
    surfaceHover: "rgba(0,0,0,0.04)",
    muted: "#f4f4f5",
    mutedForeground: "#71717a",
  },
};

export const DEFAULT_THEME_ID = "cyberpunk";
