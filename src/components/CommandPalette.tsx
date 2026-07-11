"use client";

import { useState, useEffect } from "react";

import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { 
  Search, Code, BookOpen, Mail, Home, User, ArrowRight, 
  Activity, MessageSquare, Network, Gamepad2, Coffee, Palette, Settings 
} from "lucide-react";
import { useWindowManager } from "@/components/os/WindowManager";
import { useTheme } from "@/components/providers/ThemeProvider";
import { useSound } from "@/components/effects/useSound";

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const { openWindow } = useWindowManager();
  const { setThemeById, isRecruiterMode } = useTheme();
  const { playBeep } = useSound();

  // Toggle palette on Ctrl+K, Cmd+K, or custom event
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((open) => !open);
        playBeep(900, "sine", 0.05);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    const handleCustomEvent = () => {
      setIsOpen(true);
      playBeep(900, "sine", 0.05);
    };

    document.addEventListener("keydown", down);
    window.addEventListener("open-command-palette", handleCustomEvent);
    return () => {
      document.removeEventListener("keydown", down);
      window.removeEventListener("open-command-palette", handleCustomEvent);
    };
  }, [playBeep]);

  // Prevent scrolling when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const navigationLinks = [
    { name: "Navigate to Home", href: "/", icon: Home, category: "Pages" },
    { name: "Navigate to About Section", href: "#about", icon: User, category: "Pages" },
    { name: "Navigate to Projects Cluster", href: "#projects", icon: Code, category: "Pages" },
    { name: "Navigate to Technical Blog", href: "/blog", icon: BookOpen, category: "Pages" },
    { name: "Navigate to Contact Uplink", href: "#contact", icon: Mail, category: "Pages" },
  ];

  const systemCommands = [
    { name: "Launch Task Manager (TaskMgr.exe)", action: "open-task-manager", icon: Activity, category: "Applications" },
    { name: "Launch Chat Assistant (Copilot.exe)", action: "open-ai-assistant", icon: MessageSquare, category: "Applications" },
    { name: "Launch Kafka Load Simulator (Pipeline.exe)", action: "open-pipeline-simulator", icon: Network, category: "Applications" },
    { name: "Launch Cyber-Snake Game (Snake.exe)", action: "open-snake-window", icon: Gamepad2, category: "Applications" },
    { name: "Launch Bug Dodger Arcade (BugDodge.exe)", action: "open-bugdodge-window", icon: Coffee, category: "Applications" },
    { name: "Launch Retro Cyber-Paint (Paint.exe)", action: "open-paint-window", icon: Palette, category: "Applications" },
  ];

  const themeCommands = isRecruiterMode ? [] : [
    { name: "Switch Theme: Cyberpunk (Default)", action: "theme-cyberpunk", icon: Settings, category: "Themes" },
    { name: "Switch Theme: Matrix (Green Rain)", action: "theme-matrix", icon: Settings, category: "Themes" },
    { name: "Switch Theme: Tokyo Night Storm", action: "theme-tokyo-night", icon: Settings, category: "Themes" },
    { name: "Switch Theme: Arctic Nord", action: "theme-nord", icon: Settings, category: "Themes" },
    { name: "Switch Theme: Retro Synthwave", action: "theme-synthwave", icon: Settings, category: "Themes" },
    { name: "Switch Theme: Classic Terminal Green", action: "theme-terminal-green", icon: Settings, category: "Themes" },
    { name: "Switch Theme: Neural AI Purple", action: "theme-ai-purple", icon: Settings, category: "Themes" },
  ];

  const allLinks = [...navigationLinks, ...systemCommands, ...themeCommands];

  const filteredLinks = allLinks.filter((link) =>
    link.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelect = (link: any) => {
    setIsOpen(false);
    setSearchQuery("");
    playBeep(700, "sine", 0.08);

    if (link.href) {
      if (link.href.startsWith("#")) {
        const el = document.querySelector(link.href);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        router.push(link.href);
      }
    } else if (link.action) {
      if (link.action.startsWith("open-")) {
        const winId = link.action.replace("open-", "");
        const title = 
          winId === "task-manager" ? "System Task Manager" :
          winId === "pipeline-simulator" ? "Kafka Load Simulator" :
          winId === "ai-assistant" ? "Uplink Chat Assistant" :
          winId === "snake-window" ? "Cyber-Snake v1.0" :
          winId === "bugdodge-window" ? "Bug Dodger Arcade" :
          winId === "paint-window" ? "Retro Cyber-Paint" : "System Application";
        
        openWindow(winId, title);
      } else if (link.action.startsWith("theme-")) {
        const themeName = link.action.replace("theme-", "");
        setThemeById(themeName);
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[350] font-mono">
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm pointer-events-auto"
          />

          {/* Spotlight Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-[15%] left-1/2 -translate-x-1/2 w-[90%] max-w-2xl border rounded-2xl shadow-[0_25px_80px_rgba(0,0,0,0.85)] overflow-hidden pointer-events-auto"
            style={{
              background: "color-mix(in srgb, var(--gt-bg) 92%, black)",
              borderColor: "var(--gt-border)",
              color: "var(--gt-fg)",
            }}
          >
            {/* Search Input Area */}
            <div 
              className="flex items-center gap-3 px-6 py-4 border-b"
              style={{ borderColor: "var(--gt-border)", background: "var(--gt-surface)" }}
            >
              <Search size={20} style={{ color: "var(--gt-primary)" }} />
              <input
                autoFocus
                type="text"
                placeholder="Where do you want to go? Search commands..."
                value={searchQuery}
                onChange={(e) => {
                  playBeep(900, "sine", 0.01);
                  setSearchQuery(e.target.value);
                }}
                className="w-full bg-transparent border-none outline-none text-[var(--gt-fg)] placeholder-[var(--gt-muted-fg)] font-medium text-base shadow-none border-0 ring-0 focus:ring-0"
              />
              <div className="flex items-center gap-1 shrink-0">
                <kbd className="px-2 py-0.5 rounded text-[10px] border" style={{ background: "var(--gt-surface)", borderColor: "var(--gt-border)", color: "var(--gt-muted-fg)" }}>ESC</kbd>
              </div>
            </div>

            {/* Results Area */}
            <div className="max-h-[50vh] overflow-y-auto p-3 divide-y divide-[var(--gt-border)]">
              {filteredLinks.length === 0 ? (
                <div className="py-12 text-center text-[var(--gt-muted-fg)]">
                  <Search size={32} className="mx-auto mb-3 opacity-20" />
                  <p>No results found for &quot;{searchQuery}&quot;</p>
                </div>
              ) : (
                <div className="space-y-0.5">
                  {filteredLinks.map((link) => (
                    <button
                      key={link.name}
                      onClick={() => handleSelect(link)}
                      className="w-full flex items-center justify-between p-2.5 rounded-xl transition-all text-left group"
                      style={{ color: "var(--gt-fg)" }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "var(--gt-surface-hover)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "transparent";
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <div 
                          className="p-2 rounded-lg border transition-all"
                          style={{
                            background: "var(--gt-surface)",
                            borderColor: "var(--gt-border)",
                            color: "var(--gt-muted-fg)",
                          }}
                        >
                          <link.icon size={15} />
                        </div>
                        <div>
                          <span className="font-bold block tracking-wide text-xs">{link.name}</span>
                          <span className="text-[9px] font-bold uppercase tracking-wider" style={{ color: "var(--gt-primary)" }}>{link.category}</span>
                        </div>
                      </div>
                      <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: "var(--gt-primary)" }} />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Footer Hints */}
            <div 
              className="px-6 py-2.5 border-t flex flex-wrap gap-4 text-[10px] tracking-wider uppercase font-bold"
              style={{ borderColor: "var(--gt-border)", background: "rgba(0,0,0,0.2)", color: "var(--gt-muted-fg)" }}
            >
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--gt-primary)]"></span> Type to filter list
              </span>
              <span className="flex items-center gap-2 ml-auto">
                <kbd className="px-1.5 py-0.5 rounded border border-[var(--gt-border)] bg-[var(--gt-surface)]">↑</kbd>
                <kbd className="px-1.5 py-0.5 rounded border border-[var(--gt-border)] bg-[var(--gt-surface)]">↓</kbd>
                Navigate
              </span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
