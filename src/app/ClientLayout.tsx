"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { ThemeProvider, useTheme } from "@/components/providers/ThemeProvider";
import { WindowManagerProvider } from "@/components/os/WindowManager";
import BootScreen from "@/components/BootScreen";
import Taskbar from "@/components/os/Taskbar";
import CodeRainBackground from "@/components/effects/CodeRainBackground";
import MouseSpotlight from "@/components/effects/MouseSpotlight";
import Footer from "@/components/Footer";
import dynamic from "next/dynamic";

const AIAssistant = dynamic(() => import("@/components/os/AIAssistant"), { ssr: false });
const RecruiterMode = dynamic(() => import("@/components/modes/RecruiterMode"), { ssr: false });



function LayoutInner({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { isRecruiterMode } = useTheme();
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

  return (
    <>
      {/* Boot Screen */}
      {!skipBoot && !booted && <BootScreen onComplete={() => setBooted(true)} />}

      {/* Background Effects — hidden in recruiter mode */}
      {!isRecruiterMode && (
        <>
          <CodeRainBackground />
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
      {!isRecruiterMode && (
        <div className="fixed inset-0 pointer-events-none z-[2] crt-scanlines opacity-20" aria-hidden="true" />
      )}

      {/* Taskbar */}
      {booted && <Taskbar />}

      {/* AI Assistant */}
      {booted && !isRecruiterMode && <AIAssistant />}

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
