"use client";

import { useState } from "react";
import { MessageSquare, Activity, Network, Terminal, Gamepad2, Coffee, Palette, Sliders } from "lucide-react";
import { useWindowManager } from "@/components/os/WindowManager";
import { useTheme } from "@/components/providers/ThemeProvider";
import { useSound } from "@/components/effects/useSound";
import { motion } from "framer-motion";

interface DesktopIcon {
  id: string;
  name: string;
  title: string;
  icon: React.ElementType;
}

const ICONS: DesktopIcon[] = [
  { id: "ai-assistant", name: "Copilot.exe", title: "Uplink Chat Assistant", icon: MessageSquare },
  { id: "task-manager", name: "TaskMgr.exe", title: "System Task Manager", icon: Activity },
  { id: "pipeline-simulator", name: "Pipeline.exe", title: "Kafka Load Simulator", icon: Network },
  { id: "terminal-window", name: "Shell.exe", title: "GT_OS Shell CLI", icon: Terminal },
  { id: "snake-window", name: "Snake.exe", title: "Cyber-Snake v1.0", icon: Gamepad2 },
  { id: "bugdodge-window", name: "BugDodge.exe", title: "Bug Dodger Arcade", icon: Coffee },
  { id: "paint-window", name: "Paint.exe", title: "Retro Cyber-Paint", icon: Palette },
  { id: "theme-customizer-window", name: "ThemeCustom.exe", title: "Theme Customizer", icon: Sliders },
];

export default function Desktop() {
  const { openWindow } = useWindowManager();
  const { isRecruiterMode } = useTheme();
  const { playBeep } = useSound();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  if (isRecruiterMode) return null;

  const handleIconClick = (id: string) => {
    setSelectedId(id);
    playBeep(800, "sine", 0.04);
  };

  const handleIconDoubleClick = (id: string, title: string) => {
    playBeep(1200, "sine", 0.08);
    openWindow(id, title);
    setSelectedId(null);
  };

  return (
    <div 
      className="absolute top-16 left-6 z-10 flex flex-col gap-6 font-mono text-[10px] w-24 select-none pointer-events-auto"
      onClick={() => setSelectedId(null)}
    >
      {ICONS.map((item) => {
        const Icon = item.icon;
        const isSelected = selectedId === item.id;

        return (
          <motion.div
            key={item.id}
            onClick={(e) => {
              e.stopPropagation();
              handleIconClick(item.id);
            }}
            onDoubleClick={(e) => {
              e.stopPropagation();
              handleIconDoubleClick(item.id, item.title);
            }}
            onTouchEnd={(e) => {
              // Handle single tap double tap for mobile devices
              e.stopPropagation();
              openWindow(item.id, item.title);
            }}
            className="flex flex-col items-center justify-center p-2 rounded-lg cursor-pointer border transition-all text-center gap-1.5"
            style={{
              background: isSelected 
                ? "color-mix(in srgb, var(--gt-primary) 12%, transparent)" 
                : "transparent",
              borderColor: isSelected 
                ? "color-mix(in srgb, var(--gt-primary) 30%, transparent)" 
                : "transparent",
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Glow / Ring */}
            <div 
              className="w-10 h-10 rounded-lg flex items-center justify-center border transition-all"
              style={{
                background: "color-mix(in srgb, var(--gt-surface) 50%, transparent)",
                borderColor: isSelected 
                  ? "var(--gt-primary)" 
                  : "color-mix(in srgb, var(--gt-primary) 15%, transparent)",
                boxShadow: isSelected 
                  ? "0 0 10px var(--gt-glow)" 
                  : "none",
                color: isSelected ? "var(--gt-primary)" : "var(--gt-fg)",
              }}
            >
              <Icon size={18} />
            </div>
            
            {/* Label */}
            <span 
              className="font-bold tracking-wide truncate max-w-full px-0.5 rounded"
              style={{
                color: isSelected ? "var(--gt-primary)" : "var(--gt-fg)",
                background: isSelected 
                  ? "color-mix(in srgb, var(--gt-primary) 10%, transparent)" 
                  : "transparent",
              }}
            >
              {item.name}
            </span>
          </motion.div>
        );
      })}
    </div>
  );
}
