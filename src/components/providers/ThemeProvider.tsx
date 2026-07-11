"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { themes, recruiterTheme, DEFAULT_THEME_ID, type ThemeDefinition, type ThemeColors } from "@/data/themes";

interface ThemeContextType {
  theme: ThemeDefinition;
  themeId: string;
  setThemeById: (id: string) => void;
  isRecruiterMode: boolean;
  toggleRecruiterMode: () => void;
  allThemes: ThemeDefinition[];
  showMatrixRain: boolean;
  setShowMatrixRain: (val: boolean) => void;
  showCrt: boolean;
  setShowCrt: (val: boolean) => void;
  isMuted: boolean;
  setIsMuted: (val: boolean) => void;
  updateCustomTheme: (colors: ThemeColors) => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

function applyThemeToDOM(theme: ThemeDefinition) {
  const root = document.documentElement;
  root.setAttribute("data-theme", theme.id);

  const c = theme.colors;
  root.style.setProperty("--gt-bg", c.background);
  root.style.setProperty("--gt-fg", c.foreground);
  root.style.setProperty("--gt-primary", c.primary);
  root.style.setProperty("--gt-secondary", c.secondary);
  root.style.setProperty("--gt-accent", c.accent);
  root.style.setProperty("--gt-warning", c.warning);
  root.style.setProperty("--gt-danger", c.danger);
  root.style.setProperty("--gt-border", c.border);
  root.style.setProperty("--gt-glow", c.glow);
  root.style.setProperty("--gt-surface", c.surface);
  root.style.setProperty("--gt-surface-hover", c.surfaceHover);
  root.style.setProperty("--gt-muted", c.muted);
  root.style.setProperty("--gt-muted-fg", c.mutedForeground);
}

const STORAGE_KEY_THEME = "gt-os-theme";
const STORAGE_KEY_RECRUITER = "gt-os-recruiter";
const STORAGE_KEY_MATRIX = "gt-os-matrix";
const STORAGE_KEY_CRT = "gt-os-crt";
const STORAGE_KEY_MUTE = "gt-os-mute";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [themeId, setThemeId] = useState(DEFAULT_THEME_ID);
  const [customTheme, setCustomTheme] = useState<ThemeDefinition | null>(null);
  const [isRecruiterMode, setIsRecruiterMode] = useState(false);
  const [showMatrixRain, setShowMatrixRainState] = useState(true);
  const [showCrt, setShowCrtState] = useState(true);
  const [isMuted, setIsMutedState] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Load persisted theme on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem(STORAGE_KEY_THEME);
    const savedRecruiter = localStorage.getItem(STORAGE_KEY_RECRUITER);
    const savedMatrix = localStorage.getItem(STORAGE_KEY_MATRIX);
    const savedCrt = localStorage.getItem(STORAGE_KEY_CRT);
    const savedMute = localStorage.getItem(STORAGE_KEY_MUTE);
    const savedCustom = localStorage.getItem("gt-os-custom-theme");

    setTimeout(() => {
      if (savedCustom) {
        try {
          setCustomTheme(JSON.parse(savedCustom));
        } catch {}
      }
      if (savedTheme && (themes.find((t) => t.id === savedTheme) || savedTheme === "custom")) {
        setThemeId(savedTheme);
      }
      if (savedRecruiter === "true") {
        setIsRecruiterMode(true);
      }
      if (savedMatrix === "false") {
        setShowMatrixRainState(false);
      }
      if (savedCrt === "false") {
        setShowCrtState(false);
      }
      if (savedMute === "true") {
        setIsMutedState(true);
      }
      setMounted(true);
    }, 0);
  }, []);

  // Apply theme to DOM whenever it changes
  useEffect(() => {
    if (!mounted) return;
    const activeTheme = isRecruiterMode
      ? recruiterTheme
      : themeId === "custom" && customTheme
      ? customTheme
      : themes.find((t) => t.id === themeId) || themes[0];
    applyThemeToDOM(activeTheme);
  }, [themeId, isRecruiterMode, customTheme, mounted]);

  const setThemeById = useCallback((id: string) => {
    if (id === "custom" && customTheme) {
      setThemeId(id);
      localStorage.setItem(STORAGE_KEY_THEME, id);
      return;
    }
    const found = themes.find((t) => t.id === id);
    if (found) {
      setThemeId(id);
      localStorage.setItem(STORAGE_KEY_THEME, id);
    }
  }, [customTheme]);

  const toggleRecruiterMode = useCallback(() => {
    setIsRecruiterMode((prev) => {
      const next = !prev;
      localStorage.setItem(STORAGE_KEY_RECRUITER, String(next));
      return next;
    });
  }, []);

  const setShowMatrixRain = useCallback((val: boolean) => {
    setShowMatrixRainState(val);
    localStorage.setItem(STORAGE_KEY_MATRIX, String(val));
  }, []);

  const setShowCrt = useCallback((val: boolean) => {
    setShowCrtState(val);
    localStorage.setItem(STORAGE_KEY_CRT, String(val));
  }, []);

  const setIsMuted = useCallback((val: boolean) => {
    setIsMutedState(val);
    localStorage.setItem(STORAGE_KEY_MUTE, String(val));
  }, []);

  const updateCustomTheme = useCallback((colors: ThemeColors) => {
    const newTheme: ThemeDefinition = {
      id: "custom",
      name: "Custom Theme",
      label: "User-defined colors",
      colors,
    };
    setCustomTheme(newTheme);
    setThemeId("custom");
    localStorage.setItem("gt-os-custom-theme", JSON.stringify(newTheme));
    localStorage.setItem(STORAGE_KEY_THEME, "custom");
  }, []);

  const activeTheme = isRecruiterMode
    ? recruiterTheme
    : themeId === "custom" && customTheme
    ? customTheme
    : themes.find((t) => t.id === themeId) || themes[0];

  const allThemesList = customTheme ? [...themes, customTheme] : themes;

  return (
    <ThemeContext.Provider
      value={{
        theme: activeTheme,
        themeId,
        setThemeById,
        isRecruiterMode,
        toggleRecruiterMode,
        allThemes: allThemesList,
        showMatrixRain,
        setShowMatrixRain,
        showCrt,
        setShowCrt,
        isMuted,
        setIsMuted,
        updateCustomTheme,
      }}
    >
      <div style={!mounted ? { visibility: "hidden" } : undefined}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return ctx;
}
