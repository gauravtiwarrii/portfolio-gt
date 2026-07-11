"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { themes, recruiterTheme, DEFAULT_THEME_ID, type ThemeDefinition } from "@/data/themes";

interface ThemeContextType {
  theme: ThemeDefinition;
  themeId: string;
  setThemeById: (id: string) => void;
  isRecruiterMode: boolean;
  toggleRecruiterMode: () => void;
  allThemes: ThemeDefinition[];
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

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [themeId, setThemeId] = useState(DEFAULT_THEME_ID);
  const [isRecruiterMode, setIsRecruiterMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Load persisted theme on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem(STORAGE_KEY_THEME);
    const savedRecruiter = localStorage.getItem(STORAGE_KEY_RECRUITER);

    setTimeout(() => {
      if (savedTheme && themes.find((t) => t.id === savedTheme)) {
        setThemeId(savedTheme);
      }
      if (savedRecruiter === "true") {
        setIsRecruiterMode(true);
      }
      setMounted(true);
    }, 0);
  }, []);

  // Apply theme to DOM whenever it changes
  useEffect(() => {
    if (!mounted) return;
    const activeTheme = isRecruiterMode
      ? recruiterTheme
      : themes.find((t) => t.id === themeId) || themes[0];
    applyThemeToDOM(activeTheme);
  }, [themeId, isRecruiterMode, mounted]);

  const setThemeById = useCallback((id: string) => {
    const found = themes.find((t) => t.id === id);
    if (found) {
      setThemeId(id);
      localStorage.setItem(STORAGE_KEY_THEME, id);
    }
  }, []);

  const toggleRecruiterMode = useCallback(() => {
    setIsRecruiterMode((prev) => {
      const next = !prev;
      localStorage.setItem(STORAGE_KEY_RECRUITER, String(next));
      return next;
    });
  }, []);

  const activeTheme = isRecruiterMode
    ? recruiterTheme
    : themes.find((t) => t.id === themeId) || themes[0];

  return (
    <ThemeContext.Provider
      value={{
        theme: activeTheme,
        themeId,
        setThemeById,
        isRecruiterMode,
        toggleRecruiterMode,
        allThemes: themes,
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
