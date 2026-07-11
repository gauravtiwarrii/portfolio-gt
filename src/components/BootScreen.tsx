"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BOOT_LINES = [
  { text: "Initializing Kernel...", delay: 300 },
  { text: "Loading Neural Engine...", delay: 400 },
  { text: "Starting AI Modules...", delay: 350 },
  { text: "Connecting GitHub...", delay: 500 },
  { text: "Loading Kafka Pipelines...", delay: 450 },
  { text: "Loading Spark Cluster...", delay: 400 },
  { text: "Mounting Data Lakes...", delay: 350 },
  { text: "Authenticating User...", delay: 600 },
  { text: "GT_OS Ready.", delay: 200 },
];

const ASCII_LOGO = `
  ██████╗ ████████╗     ██████╗ ███████╗
 ██╔════╝ ╚══██╔══╝    ██╔═══██╗██╔════╝
 ██║  ███╗   ██║       ██║   ██║███████╗
 ██║   ██║   ██║       ██║   ██║╚════██║
 ╚██████╔╝   ██║       ╚██████╔╝███████║
  ╚═════╝    ╚═╝        ╚═════╝ ╚══════╝
`;

export default function BootScreen({ onComplete }: { onComplete: () => void }) {
  const [isVisible, setIsVisible] = useState(true);
  const [lines, setLines] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"boot" | "logo" | "done">("boot");
  const [showSkip, setShowSkip] = useState(false);
  const skipRef = useRef(false);
  const terminalRef = useRef<HTMLDivElement>(null);

  const finishBoot = useCallback(() => {
    if (phase === "done") return;
    setPhase("done");
    setProgress(100);
    setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 600);
    }, 800);
  }, [onComplete, phase]);

  const skipBoot = useCallback(() => {
    skipRef.current = true;
    finishBoot();
  }, [finishBoot]);

  // Show skip button after brief delay
  useEffect(() => {
    const t = setTimeout(() => setShowSkip(true), 500);
    return () => clearTimeout(t);
  }, []);

  // Skip on keypress
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === "Escape" || e.key === " ") {
        e.preventDefault();
        skipBoot();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [skipBoot]);

  // Boot sequence
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Check if already booted this session
    if (sessionStorage.getItem("gt-os-booted")) {
      setIsVisible(false);
      onComplete();
      return;
    }

    let i = 0;
    const runLine = () => {
      if (skipRef.current) return;
      if (i >= BOOT_LINES.length) {
        sessionStorage.setItem("gt-os-booted", "1");
        setPhase("logo");
        setTimeout(() => {
          if (!skipRef.current) finishBoot();
        }, 1200);
        return;
      }

      const currentLine = BOOT_LINES[i];
      setLines((prev) => [...prev, currentLine.text]);
      setProgress(Math.round(((i + 1) / BOOT_LINES.length) * 100));
      i++;
      setTimeout(runLine, currentLine.delay);
    };

    const timer = setTimeout(runLine, 500);
    return () => {
      skipRef.current = true;
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Auto-scroll terminal
  useEffect(() => {
    terminalRef.current?.scrollTo({ top: terminalRef.current.scrollHeight });
  }, [lines]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{ background: "#050505" }}
        >
          {/* CRT Scanlines */}
          <div className="absolute inset-0 crt-scanlines opacity-30 pointer-events-none" />

          {/* Corner Brackets */}
          <div className="absolute top-6 left-6 w-8 h-8 border-t-2 border-l-2" style={{ borderColor: "var(--gt-primary, #00F5D4)" }} />
          <div className="absolute top-6 right-6 w-8 h-8 border-t-2 border-r-2" style={{ borderColor: "var(--gt-primary, #00F5D4)" }} />
          <div className="absolute bottom-6 left-6 w-8 h-8 border-b-2 border-l-2" style={{ borderColor: "var(--gt-primary, #00F5D4)" }} />
          <div className="absolute bottom-6 right-6 w-8 h-8 border-b-2 border-r-2" style={{ borderColor: "var(--gt-primary, #00F5D4)" }} />

          {/* Version label */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="font-mono text-[10px] tracking-[0.5em] uppercase mb-8"
            style={{ color: "rgba(0,245,212,0.4)" }}
          >
            GT_OS v3.0 — Boot Sequence
          </motion.p>

          {/* ASCII Logo */}
          <AnimatePresence>
            {phase === "logo" && (
              <motion.pre
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-[10px] sm:text-xs font-mono leading-tight mb-8 text-center"
                style={{ color: "#00F5D4" }}
              >
                {ASCII_LOGO}
              </motion.pre>
            )}
          </AnimatePresence>

          {/* Terminal Output */}
          <div
            ref={terminalRef}
            className="w-full max-w-lg px-8 space-y-1.5 max-h-60 overflow-y-auto"
          >
            {lines.map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.15 }}
                className="font-mono text-sm flex items-center gap-2"
              >
                <span style={{ color: "#00F5D4" }}>▸</span>
                <span style={{ color: "rgba(255,255,255,0.7)" }}>{line}</span>
                {i === lines.length - 1 && line !== "GT_OS Ready." && (
                  <span className="text-green-400 font-bold text-xs ml-auto">[OK]</span>
                )}
                {line === "GT_OS Ready." && (
                  <span className="text-green-400 font-bold text-xs ml-auto animate-glow-pulse">[ ✓ READY ]</span>
                )}
              </motion.div>
            ))}
          </div>

          {/* Progress Bar */}
          <div className="w-full max-w-lg px-8 mt-8">
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-[10px] tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.3)" }}>
                System Load
              </span>
              <span className="font-mono text-sm font-bold" style={{ color: "#00F5D4" }}>
                {progress}%
              </span>
            </div>
            <div className="h-1 bg-white/5 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: "linear-gradient(90deg, #00F5D4, #8B5CF6)",
                  boxShadow: "0 0 15px rgba(0,245,212,0.5)",
                }}
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            </div>
          </div>

          {/* Skip Button */}
          <AnimatePresence>
            {showSkip && phase !== "done" && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.3 }}
                onClick={skipBoot}
                className="absolute bottom-12 font-mono text-xs tracking-widest uppercase px-4 py-2 border rounded transition-all hover:bg-white/5"
                style={{
                  color: "rgba(255,255,255,0.3)",
                  borderColor: "rgba(255,255,255,0.1)",
                }}
              >
                Skip Boot ⏎
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
