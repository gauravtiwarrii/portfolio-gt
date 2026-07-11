"use client";

import Link from "next/link";
import { Home, Terminal as TerminalIcon } from "lucide-react";
import TerminalWindow from "@/components/os/TerminalWindow";

export default function TerminalPage() {
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

      <main className="relative z-10 max-w-4xl mx-auto w-full flex-grow flex flex-col">
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

        {/* Console Box */}
        <div className="flex-1 rounded-xl border border-[var(--gt-border)] overflow-hidden shadow-[0_25px_80px_rgba(0,0,0,0.8)] bg-black">
          <TerminalWindow isWindowMode={true} />
        </div>
      </main>
    </div>
  );
}
