"use client";

import { useState, useRef, useEffect } from "react";
import { Terminal as TerminalIcon } from "lucide-react";
import { getCommandResponse } from "@/data/terminal-commands";
import { useTheme } from "@/components/providers/ThemeProvider";
import { useSound } from "@/components/effects/useSound";
import { useWindowManager } from "@/components/os/WindowManager";

interface TerminalLine {
  id: string;
  type: "input" | "output" | "system" | "error";
  content: string | React.ReactNode;
}

const ASCIILogo = `
  ██████╗ ████████╗     ██████╗ ███████╗
 ██╔════╝ ╚══██╔══╝    ██╔═══██╗██╔════╝
 ██║  ███╗   ██║       ██║   ██║███████╗
 ██║   ██║   ██║       ██║   ██║╚════██║
 ╚██████╔╝   ██║       ╚██████╔╝███████║
  ╚═════╝    ╚═╝        ╚═════╝ ╚══════╝
`;

export default function TerminalWindow({ isWindowMode = false }: { isWindowMode?: boolean }) {
  const { setThemeById } = useTheme();
  const { playTick, playBeep } = useSound();
  const { openWindow } = useWindowManager();
  const [lines, setLines] = useState<TerminalLine[]>([
    { id: "1", type: "system", content: ASCIILogo },
    { id: "2", type: "system", content: "Welcome to GT_OS v3.0 Mainframe Terminal." },
    { id: "3", type: "system", content: "Type 'help' to see list of available commands." },
  ]);
  const [currentInput, setCurrentInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Focus input on mount and on clicking container
  useEffect(() => {
    const focusInput = () => inputRef.current?.focus();
    const container = containerRef.current;
    
    if (focusInput) {
      focusInput();
    }
    
    container?.addEventListener("click", focusInput);
    return () => container?.removeEventListener("click", focusInput);
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    // Add to history
    setHistory((prev) => [trimmed, ...prev.slice(0, 49)]);
    setHistoryIndex(-1);

    const res = getCommandResponse(trimmed);
    const cmdId = Date.now().toString();

    // Setup input echo line
    const inputLine: TerminalLine = {
      id: `${cmdId}-input`,
      type: "input",
      content: `guest@gt_os:~$ ${trimmed}`,
    };

    if (res.action === "clear") {
      setLines([]);
      return;
    }

    const outputLine: TerminalLine = {
      id: `${cmdId}-output`,
      type: res.output.includes("Command not found") ? "error" : "output",
      content: res.output,
    };

    setLines((prev) => [...prev, inputLine, outputLine]);

    // Handle action side effects
    if (res.action) {
      if (res.action === "open-resume") {
        setTimeout(() => {
          window.open("/resume.pdf", "_blank");
        }, 1000);
      } else if (res.action === "scroll-contact") {
        if (isWindowMode) {
          openWindow("contact", "Uplink Console");
        } else {
          window.location.hash = "contact";
        }
      } else if (res.action.startsWith("theme-")) {
        const targetTheme = res.action.replace("theme-", "");
        setThemeById(targetTheme === "matrix" ? "matrix" : targetTheme);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    playTick(); // Tick click sound on keystroke
    
    if (e.key === "Enter") {
      handleCommand(currentInput);
      setCurrentInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length > 0 && historyIndex < history.length - 1) {
        const nextIdx = historyIndex + 1;
        setHistoryIndex(nextIdx);
        setCurrentInput(history[nextIdx]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIdx = historyIndex - 1;
        setHistoryIndex(nextIdx);
        setCurrentInput(history[nextIdx]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setCurrentInput("");
      }
    }
  };

  return (
    <div
      ref={containerRef}
      className={`font-mono flex flex-col p-4 w-full h-full min-h-[350px] select-text cursor-text bg-black`}
      style={{ 
        color: "var(--gt-primary, #00F5D4)",
      }}
    >
      {/* Header if not in Window Mode */}
      {!isWindowMode && (
        <div
          className="flex items-center gap-2 mb-6 pb-2 text-xs font-bold uppercase tracking-widest border-b"
          style={{ borderColor: "var(--gt-border)", color: "var(--gt-muted-fg)" }}
        >
          <TerminalIcon size={14} style={{ color: "var(--gt-primary)" }} />
          <span>GT_OS Mainframe Console</span>
        </div>
      )}

      {/* Terminal Output */}
      <div className="flex-1 overflow-y-auto space-y-2 whitespace-pre-wrap break-words text-xs leading-relaxed max-h-full">
        {lines.map((line) => (
          <div
            key={line.id}
            className={
              line.type === "system"
                ? "opacity-60"
                : line.type === "error"
                ? "text-red-500 font-bold"
                : line.type === "input"
                ? "text-zinc-300"
                : ""
            }
            style={{ color: line.type === "output" ? "var(--gt-primary)" : undefined }}
          >
            {line.content}
          </div>
        ))}

        {/* Active Input Prompt */}
        <div className="flex items-center text-zinc-300 mt-2">
          <span className="shrink-0 mr-2 font-bold" style={{ color: "var(--gt-primary)" }}>
            guest@gt_os:~$
          </span>
          <input
            ref={inputRef}
            type="text"
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="bg-transparent border-none outline-none w-full p-0 focus:ring-0 text-xs shadow-none ring-0 border-0"
            style={{ color: "var(--gt-fg)", caretColor: "var(--gt-primary)" }}
            autoComplete="off"
            spellCheck="false"
            aria-label="Terminal input prompt"
          />
        </div>
        <div ref={bottomRef} className="h-2" />
      </div>
    </div>
  );
}
