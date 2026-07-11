"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { ThemeProvider, useTheme } from "@/components/providers/ThemeProvider";
import { WindowManagerProvider, useWindowManager } from "@/components/os/WindowManager";
import BootScreen from "@/components/BootScreen";
import Taskbar from "@/components/os/Taskbar";
import CodeRainBackground from "@/components/effects/CodeRainBackground";
import MouseSpotlight from "@/components/effects/MouseSpotlight";
import Footer from "@/components/Footer";
import dynamic from "next/dynamic";

const AIAssistant = dynamic(() => import("@/components/os/AIAssistant"), { ssr: false });
const AIAssistantChat = dynamic(() => import("@/components/os/AIAssistant").then(m => m.AIAssistantChat), { ssr: false });
const TaskManager = dynamic(() => import("@/components/os/TaskManager"), { ssr: false });
const PipelineSimulator = dynamic(() => import("@/components/os/PipelineSimulator"), { ssr: false });
const TerminalWindow = dynamic(() => import("@/components/os/TerminalWindow"), { ssr: false });
const OSWindow = dynamic(() => import("@/components/os/OSWindow"), { ssr: false });
const Snake = dynamic(() => import("@/components/os/Snake"), { ssr: false });
const BugDodge = dynamic(() => import("@/components/os/BugDodge"), { ssr: false });
const Paint = dynamic(() => import("@/components/os/Paint"), { ssr: false });
const CommandPalette = dynamic(() => import("@/components/CommandPalette"), { ssr: false });
const CyberCursor = dynamic(() => import("@/components/effects/CyberCursor"), { ssr: false });
const RecruiterMode = dynamic(() => import("@/components/modes/RecruiterMode"), { ssr: false });

function LayoutInner({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { isRecruiterMode, showMatrixRain, showCrt } = useTheme();
  const { windows, closeWindow, minimizeWindow, maximizeWindow, focusWindow } = useWindowManager();
  const [booted, setBooted] = useState(false);
  const [skipBoot, setSkipBoot] = useState(false);

  // Check if already booted this session
  useEffect(() => {
    if (typeof window !== "undefined" && sessionStorage.getItem("gt-os-booted")) {
      setTimeout(() => {
        setSkipBoot(true);
        setBooted(true);
      }, 0);
    }
  }, []);

  // Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  const renderWindowContent = (id: string) => {
    switch (id) {
      case "task-manager":
        return <TaskManager />;
      case "pipeline-simulator":
        return <PipelineSimulator />;
      case "ai-assistant":
        return <AIAssistantChat />;
      case "terminal-window":
        return <TerminalWindow isWindowMode={true} />;
      case "snake-window":
        return <Snake />;
      case "bugdodge-window":
        return <BugDodge />;
      case "paint-window":
        return <Paint />;
      default:
        return null;
    }
  };

  return (
    <>
      {/* Boot Screen */}
      {!skipBoot && !booted && <BootScreen onComplete={() => setBooted(true)} />}

      {/* Cyber Cursor Binary Trail */}
      {booted && <CyberCursor />}

      {/* Spotlight Command Palette */}
      {booted && <CommandPalette />}

      {/* Background Effects — hidden in recruiter mode */}
      {!isRecruiterMode && (
        <>
          {showMatrixRain && <CodeRainBackground />}
          <MouseSpotlight />
          {/* Tech grid overlay */}
          <div
            className="fixed inset-0 pointer-events-none bg-tech-grid z-0 mix-blend-screen"
            style={{ opacity: 0.15 }}
            aria-hidden="true"
          />
        </>
      )}

      {/* CRT Scanlines */}
      {!isRecruiterMode && showCrt && (
        <div className="fixed inset-0 pointer-events-none z-[2] crt-scanlines opacity-20" aria-hidden="true" />
      )}

      {/* Taskbar */}
      {booted && <Taskbar />}

      {/* AI Assistant Floating Button */}
      {booted && !isRecruiterMode && <AIAssistant />}

      {/* Active OS Windows */}
      {booted && !isRecruiterMode && (
        <div className="fixed inset-0 pointer-events-none z-[150]">
          {windows.map((win) => {
            if (!win.isOpen || win.isMinimized) return null;
            return (
              <div key={win.id} className="pointer-events-auto">
                <OSWindow
                  id={win.id}
                  title={win.title}
                  isOpen={win.isOpen}
                  isMaximized={win.isMaximized}
                  zIndex={win.zIndex}
                  onClose={() => closeWindow(win.id)}
                  onMinimize={() => minimizeWindow(win.id)}
                  onMaximize={() => maximizeWindow(win.id)}
                  onFocus={() => focusWindow(win.id)}
                  width={
                    win.id === "terminal-window" ? "750px" : 
                    win.id === "task-manager" ? "620px" : 
                    win.id === "ai-assistant" ? "420px" : 
                    win.id === "snake-window" ? "440px" : 
                    win.id === "bugdodge-window" ? "400px" : 
                    win.id === "paint-window" ? "520px" : 
                    "800px"
                  }
                  height={
                    win.id === "terminal-window" ? "450px" : 
                    win.id === "task-manager" ? "530px" : 
                    win.id === "ai-assistant" ? "520px" : 
                    win.id === "snake-window" ? "520px" : 
                    win.id === "bugdodge-window" ? "480px" : 
                    win.id === "paint-window" ? "450px" : 
                    "600px"
                  }
                >
                  {renderWindowContent(win.id)}
                </OSWindow>
              </div>
            );
          })}
        </div>
      )}

      {/* Main Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname + (isRecruiterMode ? "-recruiter" : "-dev")}
          id="main-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: booted ? 1 : 0, y: booted ? 0 : 20 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{ minHeight: "100vh", paddingTop: booted ? "48px" : 0 }}
        >
          {isRecruiterMode ? <RecruiterMode /> : children}
        </motion.div>
      </AnimatePresence>

      {/* Footer */}
      {booted && !isRecruiterMode && <Footer />}
    </>
  );
}

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider>
      <WindowManagerProvider>
        <LayoutInner>{children}</LayoutInner>
      </WindowManagerProvider>
    </ThemeProvider>
  );
}
