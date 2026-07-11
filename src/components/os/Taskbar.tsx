"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Terminal,
  Home,
  User,
  FolderOpen,
  Cpu,
  Github,
  Mail,
  Sun,
  Palette,
  Menu,
  X,
  Briefcase,
} from "lucide-react";
import { useTheme } from "@/components/providers/ThemeProvider";

const navItems = [
  { name: "Home", path: "/", icon: Home, shortcut: "~" },
  { name: "About", path: "#about", icon: User, shortcut: "A" },
  { name: "Projects", path: "#projects", icon: FolderOpen, shortcut: "P" },
  { name: "Skills", path: "#skills", icon: Cpu, shortcut: "S" },
  { name: "GitHub", path: "#github", icon: Github, shortcut: "G" },
  { name: "Contact", path: "#contact", icon: Mail, shortcut: "C" },
];

export default function Taskbar() {
  const pathname = usePathname();
  const { themeId, setThemeById, allThemes, isRecruiterMode, toggleRecruiterMode } =
    useTheme();
  const [time, setTime] = useState("");
  const [cpu, setCpu] = useState("12%");
  const [showThemes, setShowThemes] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString("en-US", { hour12: false }));
      setCpu(Math.floor(Math.random() * 20 + 5) + "%");
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setTimeout(() => {
      setMobileOpen(false);
    }, 0);
  }, [pathname]);

  const handleNavClick = (path: string) => {
    setMobileOpen(false);
    if (path.startsWith("#")) {
      const el = document.querySelector(path);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-[200] w-full glass px-4 py-2 flex items-center justify-between font-mono text-xs"
        style={{
          borderBottom: `1px solid var(--gt-border)`,
          boxShadow: "0 4px 30px rgba(0,0,0,0.5)",
        }}
        role="navigation"
        aria-label="Main navigation"
      >
        {/* Left: Logo + Status */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-2 transition-colors group"
            style={{ color: "var(--gt-primary)" }}
          >
            <Terminal size={14} className="group-hover:animate-pulse" />
            <span className="font-bold tracking-tight text-sm">GT_OS</span>
            <span
              className="text-[9px] px-1.5 py-0.5 rounded font-bold tracking-wider"
              style={{
                background: "var(--gt-surface)",
                border: "1px solid var(--gt-border)",
                color: "var(--gt-muted-fg)",
              }}
            >
              v3.0
            </span>
          </Link>

          {/* Status Pill — desktop */}
          <div
            className="hidden sm:flex items-center gap-2 px-2 py-0.5 rounded"
            style={{ background: "var(--gt-surface)", border: "1px solid var(--gt-border)" }}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.8)]" />
            <span className="text-[10px] uppercase tracking-wider" style={{ color: "var(--gt-muted-fg)" }}>
              Online
            </span>
          </div>
        </div>

        {/* Center: Nav Links — desktop */}
        <div className="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                onClick={(e) => {
                  if (item.path.startsWith("#")) {
                    e.preventDefault();
                    handleNavClick(item.path);
                  }
                }}
                className="group flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all"
                style={{
                  color: isActive ? "var(--gt-primary)" : "var(--gt-muted-fg)",
                  background: isActive ? "var(--gt-surface-hover)" : "transparent",
                }}
              >
                <Icon size={12} className="opacity-60 group-hover:opacity-100 transition-opacity" />
                <span className="text-[11px] tracking-wide group-hover:text-[var(--gt-primary)] transition-colors">
                  {item.name}
                </span>
              </Link>
            );
          })}
        </div>

        {/* Right: System Tray */}
        <div className="flex items-center gap-2">
          {/* Telemetry — desktop */}
          <div
            className="hidden lg:flex items-center gap-3 text-[10px] px-3 py-1 rounded"
            style={{
              color: "var(--gt-muted-fg)",
              background: "var(--gt-surface)",
              border: "1px solid var(--gt-border)",
            }}
          >
            <span>
              CPU: <span style={{ color: "var(--gt-primary)" }}>{cpu}</span>
            </span>
            <span>
              MEM: <span style={{ color: "var(--gt-primary)" }}>4.2GB</span>
            </span>
            <span className="w-12">
              <span style={{ color: "var(--gt-fg)" }}>{time}</span>
            </span>
          </div>

          {/* Theme Switcher */}
          <div className="relative">
            <button
              onClick={() => setShowThemes(!showThemes)}
              className="p-1.5 rounded transition-colors"
              style={{ color: "var(--gt-muted-fg)", background: showThemes ? "var(--gt-surface-hover)" : "transparent" }}
              aria-label="Theme switcher"
            >
              <Palette size={14} />
            </button>
            <AnimatePresence>
              {showThemes && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.95 }}
                  className="absolute right-0 top-full mt-2 w-48 py-2 rounded-lg glass z-50 shadow-[0_10px_40px_rgba(0,0,0,0.5)]"
                >
                  {allThemes.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => {
                        setThemeById(t.id);
                        setShowThemes(false);
                      }}
                      className="w-full text-left px-4 py-2 text-xs flex items-center gap-3 transition-colors"
                      style={{
                        color: themeId === t.id ? "var(--gt-primary)" : "var(--gt-muted-fg)",
                        background: themeId === t.id ? "var(--gt-surface-hover)" : "transparent",
                      }}
                    >
                      <span
                        className="w-3 h-3 rounded-full border"
                        style={{ background: t.colors.primary, borderColor: t.colors.border }}
                      />
                      {t.name}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Recruiter Mode Toggle */}
          <button
            onClick={toggleRecruiterMode}
            className="p-1.5 rounded transition-colors"
            style={{ color: isRecruiterMode ? "var(--gt-primary)" : "var(--gt-muted-fg)" }}
            aria-label={isRecruiterMode ? "Switch to Developer Mode" : "Switch to Recruiter Mode"}
            title={isRecruiterMode ? "Developer Mode" : "Recruiter Mode"}
          >
            {isRecruiterMode ? <Sun size={14} /> : <Briefcase size={14} />}
          </button>

          {/* Terminal Link */}
          <Link
            href="/terminal"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded text-[10px] font-bold uppercase tracking-widest transition-all"
            style={{
              color: "var(--gt-primary)",
              background: "var(--gt-surface)",
              border: "1px solid color-mix(in srgb, var(--gt-primary) 30%, transparent)",
            }}
          >
            <Terminal size={12} />
            Shell
          </Link>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-1.5 rounded"
            style={{ color: "var(--gt-fg)" }}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-0 top-12 z-[199] glass p-4 md:hidden"
            style={{ borderBottom: "1px solid var(--gt-border)" }}
          >
            <div className="flex flex-col gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    href={item.path}
                    onClick={(e) => {
                      if (item.path.startsWith("#")) {
                        e.preventDefault();
                        handleNavClick(item.path);
                      }
                    }}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors"
                    style={{ color: "var(--gt-fg)" }}
                  >
                    <Icon size={16} style={{ color: "var(--gt-primary)" }} />
                    <span className="text-sm">{item.name}</span>
                    <kbd
                      className="ml-auto px-2 py-0.5 rounded text-[10px] font-mono"
                      style={{ background: "var(--gt-surface)", color: "var(--gt-muted-fg)" }}
                    >
                      {item.shortcut}
                    </kbd>
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
