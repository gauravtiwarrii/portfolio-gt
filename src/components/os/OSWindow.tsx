"use client";

import { motion } from "framer-motion";
import { X, Minus, Maximize2 } from "lucide-react";
import { useSound } from "@/components/effects/useSound";

interface OSWindowProps {
  id: string;
  title: string;
  isOpen: boolean;
  onClose: () => void;
  onMinimize?: () => void;
  onMaximize?: () => void;
  isMaximized?: boolean;
  zIndex?: number;
  onFocus?: () => void;
  children: React.ReactNode;
  className?: string;
  width?: string;
  height?: string;
}

export default function OSWindow({
  title,
  isOpen,
  onClose,
  onMinimize,
  onMaximize,
  isMaximized = false,
  zIndex = 100,
  onFocus,
  children,
  className = "",
  width = "800px",
  height = "600px",
}: OSWindowProps) {
  const { playBeep } = useSound();

  if (!isOpen) return null;

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    playBeep(450, "sine", 0.08);
    onClose();
  };

  const handleMinimize = (e: React.MouseEvent) => {
    e.stopPropagation();
    playBeep(520, "sine", 0.08);
    onMinimize?.();
  };

  const handleMaximize = (e: React.MouseEvent) => {
    e.stopPropagation();
    playBeep(580, "sine", 0.08);
    onMaximize?.();
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 10 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      drag={!isMaximized}
      dragMomentum={false}
      dragElastic={0}
      className={`fixed ${isMaximized ? "inset-4 md:inset-8" : ""} flex flex-col overflow-hidden rounded-xl border border-[var(--gt-border)] shadow-[0_25px_80px_rgba(0,0,0,0.7)] ${className}`}
      style={{
        zIndex,
        width: isMaximized ? undefined : width,
        height: isMaximized ? undefined : height,
        maxWidth: isMaximized ? undefined : "95vw",
        maxHeight: isMaximized ? undefined : "90vh",
        background: "var(--gt-bg)",
        top: isMaximized ? undefined : `calc(50vh - ${(parseInt(height) || 600) / 2}px)`,
        left: isMaximized ? undefined : `calc(50vw - ${(parseInt(width) || 800) / 2}px)`,
      }}
      onMouseDown={onFocus}
    >
      {/* Title Bar */}
      <div
        className="flex items-center justify-between h-10 px-4 border-b shrink-0 select-none cursor-move"
        style={{
          borderColor: "var(--gt-border)",
          background: "var(--gt-surface)",
        }}
      >
        {/* Window Controls */}
        <div className="flex items-center gap-2 window-dots">
          <button
            onClick={handleClose}
            className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 transition-colors flex items-center justify-center group"
            aria-label="Close window"
          >
            <X size={8} className="text-red-900 opacity-0 group-hover:opacity-100" />
          </button>
          <button
            onClick={handleMinimize}
            className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-400 transition-colors flex items-center justify-center group"
            aria-label="Minimize window"
          >
            <Minus size={8} className="text-yellow-900 opacity-0 group-hover:opacity-100" />
          </button>
          <button
            onClick={handleMaximize}
            className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-400 transition-colors flex items-center justify-center group"
            aria-label="Maximize window"
          >
            <Maximize2 size={7} className="text-green-900 opacity-0 group-hover:opacity-100" />
          </button>
        </div>

        {/* Title */}
        <span className="text-xs font-mono tracking-widest uppercase" style={{ color: "var(--gt-muted-fg)" }}>
          {title}
        </span>

        {/* Spacer */}
        <div className="w-14" />
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden">
        {children}
      </div>
    </motion.div>
  );
}
