"use client";

import { useEffect, useState } from "react";
import { useTheme } from "@/components/providers/ThemeProvider";
import { useSound } from "@/components/effects/useSound";
import { Sliders, Copy, Check, RotateCcw } from "lucide-react";

export default function ThemeCustomizer() {
  const { theme, updateCustomTheme } = useTheme();
  const { playBeep } = useSound();
  
  const [primary, setPrimary] = useState("#00F5D4");
  const [accent, setAccent] = useState("#8B5CF6");
  const [bg, setBg] = useState("#050505");
  const [copied, setCopied] = useState(false);

  // Sync state with active theme
  useEffect(() => {
    if (theme) {
      setPrimary(theme.colors.primary);
      setAccent(theme.colors.accent);
      setBg(theme.colors.background);
    }
  }, [theme]);

  const handleColorChange = (type: "primary" | "accent" | "bg", value: string) => {
    playBeep(1000, "sine", 0.01); // change tick sound
    
    let nextPrimary = primary;
    let nextAccent = accent;
    let nextBg = bg;

    if (type === "primary") {
      setPrimary(value);
      nextPrimary = value;
    } else if (type === "accent") {
      setAccent(value);
      nextAccent = value;
    } else if (type === "bg") {
      setBg(value);
      nextBg = value;
    }

    // Automatically derive visual sub-colors based on primary inputs
    const derivedColors = {
      background: nextBg,
      foreground: "#eceff4",
      primary: nextPrimary,
      secondary: nextPrimary,
      accent: nextAccent,
      warning: "#FACC15",
      danger: "#EF4444",
      border: "rgba(255,255,255,0.08)",
      glow: `color-mix(in srgb, ${nextPrimary} 15%, transparent)`,
      surface: "rgba(255,255,255,0.03)",
      surfaceHover: "rgba(255,255,255,0.06)",
      muted: "rgba(255,255,255,0.05)",
      mutedForeground: "#8e9196",
    };

    updateCustomTheme(derivedColors);
  };

  const resetTheme = () => {
    playBeep(250, "triangle", 0.12);
    // Reset to default Cyberpunk values
    setPrimary("#00F5D4");
    setAccent("#8B5CF6");
    setBg("#050505");

    updateCustomTheme({
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
    });
  };

  const cssVariablesString = `:root {
  --gt-bg: ${bg};
  --gt-primary: ${primary};
  --gt-accent: ${accent};
  --gt-border: rgba(255,255,255,0.08);
  --gt-glow: color-mix(in srgb, ${primary} 15%, transparent);
}`;

  const copyCSS = () => {
    playBeep(900, "sine", 0.05);
    navigator.clipboard.writeText(cssVariablesString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-4 font-mono text-xs select-none flex flex-col bg-[#050505] text-[var(--gt-fg)] h-full overflow-y-auto">
      {/* Header Info */}
      <div className="border border-[var(--gt-border)] p-3 rounded bg-[var(--gt-surface)] mb-4 flex items-center gap-2">
        <Sliders size={14} style={{ color: "var(--gt-primary)" }} />
        <span className="font-bold tracking-wide">CUSTOMIZE MAIN FRAME COLORS</span>
      </div>

      {/* Sliders Area */}
      <div className="space-y-4 mb-5 border border-[var(--gt-border)] p-4 rounded bg-black">
        {/* Picker 1: Primary Accent */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex flex-col">
            <span className="font-bold tracking-wide text-xs">Primary Accent</span>
            <span className="text-[10px] text-zinc-500">Glow elements, icons, text emphasis</span>
          </div>
          <div className="flex items-center gap-2">
            <input 
              type="text" 
              value={primary} 
              readOnly 
              className="w-16 bg-zinc-950 border border-zinc-800 text-[10px] text-center text-zinc-300 py-1"
            />
            <input 
              type="color" 
              value={primary} 
              onChange={(e) => handleColorChange("primary", e.target.value)}
              className="w-6 h-6 bg-transparent border-0 cursor-pointer outline-0"
              aria-label="Primary color picker"
            />
          </div>
        </div>

        {/* Picker 2: Secondary Highlight */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex flex-col">
            <span className="font-bold tracking-wide text-xs">Secondary Highlight</span>
            <span className="text-[10px] text-zinc-500">Secondary graphics, badges</span>
          </div>
          <div className="flex items-center gap-2">
            <input 
              type="text" 
              value={accent} 
              readOnly 
              className="w-16 bg-zinc-950 border border-zinc-800 text-[10px] text-center text-zinc-300 py-1"
            />
            <input 
              type="color" 
              value={accent} 
              onChange={(e) => handleColorChange("accent", e.target.value)}
              className="w-6 h-6 bg-transparent border-0 cursor-pointer outline-0"
              aria-label="Secondary color picker"
            />
          </div>
        </div>

        {/* Picker 3: Background Canvas */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex flex-col">
            <span className="font-bold tracking-wide text-xs">Background Canvas</span>
            <span className="text-[10px] text-zinc-500">Chassis viewport fill</span>
          </div>
          <div className="flex items-center gap-2">
            <input 
              type="text" 
              value={bg} 
              readOnly 
              className="w-16 bg-zinc-950 border border-zinc-800 text-[10px] text-center text-zinc-300 py-1"
            />
            <input 
              type="color" 
              value={bg} 
              onChange={(e) => handleColorChange("bg", e.target.value)}
              className="w-6 h-6 bg-transparent border-0 cursor-pointer outline-0"
              aria-label="Background color picker"
            />
          </div>
        </div>
      </div>

      {/* Code generation block */}
      <div className="border border-[var(--gt-border)] rounded bg-zinc-950/80 mb-4 p-3 relative flex-grow min-h-[100px]">
        <span className="text-[9px] text-zinc-500 uppercase tracking-widest font-bold block mb-2">CSS Variables Config</span>
        <pre className="text-[10px] text-zinc-400 font-mono whitespace-pre-wrap leading-relaxed select-text">
          {cssVariablesString}
        </pre>

        <button
          onClick={copyCSS}
          className="absolute top-2.5 right-2.5 p-1 border rounded border-zinc-800 text-zinc-400 hover:text-[var(--gt-primary)] hover:border-[var(--gt-primary)] transition-all bg-black/60"
          title="Copy CSS to clipboard"
          aria-label="Copy CSS to clipboard"
        >
          {copied ? <Check size={11} className="text-emerald-400" /> : <Copy size={11} />}
        </button>
      </div>

      {/* Actions */}
      <div className="flex justify-end">
        <button
          onClick={resetTheme}
          className="px-4 py-2 border border-[var(--gt-border)] hover:border-red-500 hover:text-red-400 text-zinc-400 rounded flex items-center gap-1.5 transition-all bg-[var(--gt-surface)] uppercase font-bold text-[10px] tracking-wider"
        >
          <RotateCcw size={11} /> Reset Theme
        </button>
      </div>
    </div>
  );
}
