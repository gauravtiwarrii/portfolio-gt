"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "@/components/providers/ThemeProvider";

interface Particle {
  x: number;
  y: number;
  text: string;
  size: number;
  vx: number;
  vy: number;
  opacity: number;
  life: number;
}

export default function CyberCursor() {
  const { isRecruiterMode } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particles = useRef<Particle[]>([]);
  const mousePos = useRef({ x: 0, y: 0 });
  const mouseMoved = useRef(false);

  useEffect(() => {
    if (isRecruiterMode || typeof window === "undefined") return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Resize canvas to cover viewport
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Track mouse coordinates
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      
      // Control spawn rate (spawn only when mouse is moving)
      if (Math.random() > 0.4) {
        particles.current.push({
          x: e.clientX,
          y: e.clientY,
          text: Math.random() > 0.5 ? "1" : "0",
          size: Math.floor(Math.random() * 5 + 9), // 9px to 14px
          vx: Math.random() * 1.2 - 0.6,
          vy: Math.random() * -1 - 0.4, // float upwards
          opacity: 1,
          life: 1.0,
        });
      }
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Animation Loop
    let animId: number;
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const primaryColor = getComputedStyle(document.documentElement)
        .getPropertyValue("--gt-primary")
        .trim() || "#00F5D4";

      particles.current.forEach((p, index) => {
        // Apply physics
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.025; // fade speed (~1s life)
        p.opacity = p.life;

        if (p.life <= 0) {
          // Flag for cleanup
          return;
        }

        // Draw particle
        ctx.fillStyle = primaryColor;
        ctx.globalAlpha = p.opacity;
        ctx.font = `bold ${p.size}px monospace`;
        ctx.shadowBlur = 4;
        ctx.shadowColor = primaryColor;
        ctx.fillText(p.text, p.x, p.y);
      });

      // Cleanup dead particles
      particles.current = particles.current.filter((p) => p.life > 0);
      ctx.globalAlpha = 1.0;
      ctx.shadowBlur = 0;

      animId = requestAnimationFrame(render);
    };
    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, [isRecruiterMode]);

  if (isRecruiterMode) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-[300]"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
