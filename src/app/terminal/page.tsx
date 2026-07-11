"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Terminal as TerminalIcon, Home } from "lucide-react";
import Link from "next/link";
import { getCommandResponse } from "@/data/terminal-commands";
import { useTheme } from "@/components/providers/ThemeProvider";

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

export default function TerminalPage() {
  const router = useRouter();
  const { setThemeById } = useTheme();
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

  // Focus input on mounting and click
  useEffect(() => {
    const focusInput = () => inputRef.current?.focus();
    document.addEventListener("click", focusInput);
    focusInput();
    return () => document.removeEventListener("click", focusInput);
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
        setTimeout(() => {
          router.push("/#contact");
        }, 1000);
      } else if (res.action.startsWith("theme-")) {
        const targetTheme = res.action.replace("theme-", "");
        if (targetTheme === "matrix") {
          setThemeById("matrix");
        } else {
          setThemeById(targetTheme);
        }
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommand(currentInput);
      setCurrentInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (historyIndex < history.length - 1) {
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
      className="min-h-screen p-4 sm:p-8 font-mono overflow-y-auto selection:bg-[color-mix(in srgb,var(--gt-primary)_30%,transparent)] selection:text-white flex flex-col justify-between"
      style={{ background: "var(--gt-bg)", color: "var(--gt-primary)" }}
    >
      {/* Ambient background glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] blur-[150px] rounded-full opacity-10"
          style={{ background: "var(--gt-primary)" }}
        />
      </div>

      {/* CRT overlay effects */}
      <div className="fixed inset-0 pointer-events-none z-50 crt-scanlines opacity-10" />

      <main className="relative z-10 max-w-4xl mx-auto w-full flex-grow">
        {/* Terminal Header */}
        <div
          className="flex items-center justify-between mb-8 pb-4 text-xs font-bold uppercase tracking-widest"
          style={{ borderBottom: "1px solid var(--gt-border)", color: "var(--gt-muted-fg)" }}
        >
          <div className="flex items-center gap-2">
            <TerminalIcon size={14} style={{ color: "var(--gt-primary)" }} />
            <span>GT_OS Mainframe Console</span>
          </div>
          <div>
            <Link
              href="/"
              className="hover:underline transition-all flex items-center gap-1.5"
              style={{ color: "var(--gt-primary)" }}
            >
              <Home size={12} />
              Return to GUI
            </Link>
          </div>
        </div>

        {/* Lines Output */}
        <div className="space-y-3 whitespace-pre-wrap break-words">
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
          <div className="flex items-center text-zinc-300 mt-4">
            <span className="shrink-0 mr-2 font-bold" style={{ color: "var(--gt-primary)" }}>
              guest@gt_os:~$
            </span>
            <input
              ref={inputRef}
              type="text"
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="bg-transparent border-none outline-none w-full p-0 focus:ring-0"
              style={{ color: "var(--gt-fg)" }}
              autoComplete="off"
              spellCheck="false"
              aria-label="Terminal input prompt"
            />
          </div>
          <div ref={bottomRef} className="h-4" />
        </div>
      </main>
    </div>
  );
}
