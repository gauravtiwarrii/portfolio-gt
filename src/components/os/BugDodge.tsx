"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useSound } from "@/components/effects/useSound";
import { Play, RotateCcw, Flame } from "lucide-react";

interface Pipe {
  x: number;
  topHeight: number;
  bottomHeight: number;
  passed: boolean;
}

const GRAVITY = 0.45;
const JUMP_STRENGTH = -6.5;
const PIPE_SPEED = 2.5;
const PIPE_SPAWN_RATE = 105; // frames between spawn
const GAP_SIZE = 120; // gap size in pixels

export default function BugDodge() {
  const { playBeep, playWarning } = useSound();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isStarted, setIsStarted] = useState(false);

  // Game coordinates in refs to prevent closure latency
  const playerY = useRef(150);
  const playerVelocity = useRef(0);
  const pipes = useRef<Pipe[]>([]);
  const frameCount = useRef(0);
  const loopActive = useRef(false);

  // Load high score
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("gt-os-bugdodge-hs");
      if (saved) setHighScore(Number(saved));
    }
  }, []);

  const resetGame = useCallback(() => {
    playerY.current = 150;
    playerVelocity.current = 0;
    pipes.current = [];
    frameCount.current = 0;
    setScore(0);
    setGameOver(false);
    setIsStarted(true);
    loopActive.current = true;
  }, []);

  const jump = useCallback(() => {
    if (gameOver) return;
    if (!isStarted) {
      resetGame();
      return;
    }
    playerVelocity.current = JUMP_STRENGTH;
    playBeep(850, "triangle", 0.04); // jump sound
  }, [gameOver, isStarted, playBeep, resetGame]);

  // Hook space/clicks
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp" || e.key === " ") {
        e.preventDefault();
        jump();
      }
    };
    
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [jump]);

  // Main game physics and render loop
  useEffect(() => {
    if (!isStarted || gameOver) return;
    
    let animId: number;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    const width = canvas.width;
    const height = canvas.height;

    const gameLoop = () => {
      if (gameOver || !loopActive.current) return;

      // 1. Physics Calculations
      playerVelocity.current += GRAVITY;
      playerY.current += playerVelocity.current;

      // Ceilings/Floors collision
      if (playerY.current < 8) {
        playerY.current = 8;
        playerVelocity.current = 0;
      }
      if (playerY.current > height - 12) {
        handleCollision();
        return;
      }

      // Spawn pipes
      frameCount.current++;
      if (frameCount.current % PIPE_SPAWN_RATE === 0) {
        const topHeight = Math.max(30, Math.floor(Math.random() * (height - GAP_SIZE - 60)));
        const bottomHeight = height - GAP_SIZE - topHeight;
        pipes.current.push({
          x: width,
          topHeight,
          bottomHeight,
          passed: false,
        });
      }

      // Move and clean pipes
      pipes.current.forEach((pipe) => {
        pipe.x -= PIPE_SPEED;
      });

      // Pass detection (scoring)
      pipes.current.forEach((pipe) => {
        if (!pipe.passed && pipe.x < 45) { // player X is fixed at 50, radius is ~12
          pipe.passed = true;
          setScore((s) => {
            const nextScore = s + 1;
            if (nextScore > highScore) {
              setHighScore(nextScore);
              localStorage.setItem("gt-os-bugdodge-hs", String(nextScore));
            }
            return nextScore;
          });
          playBeep(900, "sine", 0.05); // pass beep
        }
      });

      // Filter out offscreen pipes
      pipes.current = pipes.current.filter((pipe) => pipe.x > -40);

      // Check collision with pipes
      const playerRadius = 12;
      const playerX = 60;
      
      for (const pipe of pipes.current) {
        const yTop = pipe.topHeight;
        const yBottom = height - pipe.bottomHeight;
        
        // Check rectangle overlap
        if (
          playerX + playerRadius - 3 > pipe.x && 
          playerX - playerRadius + 3 < pipe.x + 35
        ) {
          if (playerY.current - playerRadius + 3 < yTop || playerY.current + playerRadius - 3 > yBottom) {
            handleCollision();
            return;
          }
        }
      }

      // 2. Render Screen
      ctx.clearRect(0, 0, width, height);

      // Dynamic colors
      const primaryColor = getComputedStyle(document.documentElement).getPropertyValue("--gt-primary").trim() || "#00F5D4";
      const dangerColor = "#EF4444";
      
      // Draw grid lines (decor only)
      ctx.strokeStyle = "rgba(255,255,255,0.02)";
      ctx.lineWidth = 0.5;
      for (let x = 0; x < width; x += 25) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke();
      }

      // Draw Pipes (Red pillars representing bugs)
      pipes.current.forEach((pipe) => {
        ctx.fillStyle = dangerColor;
        ctx.strokeStyle = `color-mix(in srgb, ${dangerColor} 30%, black)`;
        ctx.lineWidth = 1.5;
        
        // Top pipe
        ctx.beginPath();
        ctx.roundRect(pipe.x, 0, 35, pipe.topHeight, [0, 0, 4, 4]);
        ctx.fill();
        ctx.stroke();

        // Top pipe bug label
        ctx.fillStyle = "white";
        ctx.font = "bold 8px monospace";
        ctx.fillText("BUG", pipe.x + 10, pipe.topHeight - 6);

        // Bottom pipe
        ctx.fillStyle = dangerColor;
        ctx.beginPath();
        ctx.roundRect(pipe.x, height - pipe.bottomHeight, 35, pipe.bottomHeight, [4, 4, 0, 0]);
        ctx.fill();
        ctx.stroke();

        // Bottom pipe bug label
        ctx.fillStyle = "white";
        ctx.fillText("BUG", pipe.x + 10, height - pipe.bottomHeight + 14);
      });

      // Draw Player: A glowing coffee cup emoji ☕ or styled block
      ctx.shadowBlur = 10;
      ctx.shadowColor = primaryColor;
      ctx.fillStyle = primaryColor;
      ctx.font = "18px Arial";
      ctx.fillText("☕", playerX - 10, playerY.current + 6);
      ctx.shadowBlur = 0; // reset

      animId = requestAnimationFrame(gameLoop);
    };

    const handleCollision = () => {
      playWarning();
      setGameOver(true);
      loopActive.current = false;
    };

    animId = requestAnimationFrame(gameLoop);
    return () => cancelAnimationFrame(animId);
  }, [isStarted, gameOver, playWarning, playBeep, highScore]);

  return (
    <div 
      className="p-4 font-mono text-xs select-none flex flex-col items-center bg-[#020202] text-[var(--gt-fg)] h-full overflow-y-auto pointer-events-auto"
      onClick={jump}
    >
      {/* Metrics Header */}
      <div className="w-full max-w-[360px] flex items-center justify-between border border-[var(--gt-border)] p-2 rounded bg-[var(--gt-surface)] mb-3">
        <div>Dodge Count: <span className="font-bold text-green-400">{score}</span></div>
        <div>Record: <span className="font-bold">{highScore}</span></div>
      </div>

      {/* Game Window screen */}
      <div className="relative border border-[var(--gt-border)] rounded-md overflow-hidden bg-black flex-shrink-0">
        <canvas 
          ref={canvasRef} 
          width={360} 
          height={380} 
          className="max-w-[320px] max-h-[340px] sm:max-w-none sm:max-h-none block"
        />

        {/* Banners overlay */}
        {(!isStarted || gameOver) && (
          <div className="absolute inset-0 bg-black/85 flex flex-col items-center justify-center text-center p-6">
            {gameOver ? (
              <>
                <span className="text-red-500 font-bold uppercase tracking-widest text-sm mb-1">=== COFFEE CRASHED ===</span>
                <span className="text-[10px] text-zinc-500 mb-6">Hit bug compile exceptions. Ingestion halted.</span>
                <button
                  onClick={(e) => { e.stopPropagation(); resetGame(); }}
                  className="px-4 py-2 border rounded flex items-center gap-2 transition-all hover:bg-zinc-800"
                  style={{ color: "var(--gt-primary)", borderColor: "var(--gt-primary)" }}
                >
                  <RotateCcw size={12} /> Refactor Code
                </button>
              </>
            ) : (
              <>
                <span className="text-zinc-300 font-bold uppercase tracking-widest text-sm mb-1 font-heading text-[var(--gt-primary)]">Bug_Dodger.exe</span>
                <span className="text-[10px] text-zinc-500 mb-6">Thrust the Coffee Cup ☕ to dodge compiler bugs 🐛.</span>
                <button
                  onClick={(e) => { e.stopPropagation(); resetGame(); }}
                  className="px-5 py-2 border rounded flex items-center gap-2 transition-all hover:bg-zinc-800 font-bold"
                  style={{ color: "var(--gt-primary)", borderColor: "var(--gt-primary)" }}
                >
                  <Flame size={12} /> Boost Thrust
                </button>
              </>
            )}
          </div>
        )}
      </div>

      {/* Help hints */}
      <div className="mt-4 text-[9px] text-zinc-600 font-bold uppercase tracking-wider text-center">
        Tap screen, click, or tap Spacebar / ArrowUp to float
      </div>
    </div>
  );
}
