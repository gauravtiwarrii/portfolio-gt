"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useSound } from "@/components/effects/useSound";
import { Play, Pause, RotateCcw, ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from "lucide-react";

type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";
type Point = { x: number; y: number };

const GRID_SIZE = 20;
const CELL_COUNT = 20;
const INITIAL_SPEED = 140; // ms

export default function Snake() {
  const { playBeep, playWarning } = useSound();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [isPaused, setIsPaused] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  
  // Game states managed in refs for the loop closure to avoid lag
  const snake = useRef<Point[]>([{ x: 10, y: 10 }]);
  const food = useRef<Point>({ x: 5, y: 5 });
  const direction = useRef<Direction>("RIGHT");
  const nextDirection = useRef<Direction>("RIGHT");
  const speed = useRef(INITIAL_SPEED);
  const isStarted = useRef(false);

  // Load high score
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("gt-os-snake-hs");
      if (saved) setHighScore(Number(saved));
    }
  }, []);

  const generateFood = useCallback((): Point => {
    let newFood: Point;
    const s = snake.current;
    
    do {
      newFood = {
        x: Math.floor(Math.random() * CELL_COUNT),
        y: Math.floor(Math.random() * CELL_COUNT),
      };
    } while (s.some((seg) => seg.x === newFood.x && seg.y === newFood.y));
    
    return newFood;
  }, []);

  const resetGame = useCallback(() => {
    snake.current = [{ x: 10, y: 10 }];
    direction.current = "RIGHT";
    nextDirection.current = "RIGHT";
    food.current = generateFood();
    speed.current = INITIAL_SPEED;
    setScore(0);
    setGameOver(false);
    setIsPaused(false);
    isStarted.current = true;
  }, [generateFood]);

  // Handle arrow key presses
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " "].includes(e.key)) {
        e.preventDefault(); // Prevent page scrolling
      }

      if (e.key === " ") {
        if (gameOver) {
          resetGame();
        } else {
          setIsPaused((p) => !p);
        }
        return;
      }

      const dir = direction.current;
      
      switch (e.key) {
        case "ArrowUp":
          if (dir !== "DOWN") nextDirection.current = "UP";
          break;
        case "ArrowDown":
          if (dir !== "UP") nextDirection.current = "DOWN";
          break;
        case "ArrowLeft":
          if (dir !== "RIGHT") nextDirection.current = "LEFT";
          break;
        case "ArrowRight":
          if (dir !== "LEFT") nextDirection.current = "RIGHT";
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [gameOver, resetGame]);

  // Main game ticks loop
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const tick = () => {
      if (isPaused || gameOver) return;

      direction.current = nextDirection.current;
      const head = { ...snake.current[0] };

      switch (direction.current) {
        case "UP": head.y -= 1; break;
        case "DOWN": head.y += 1; break;
        case "LEFT": head.x -= 1; break;
        case "RIGHT": head.x += 1; break;
      }

      // Check collision with borders
      if (head.x < 0 || head.x >= CELL_COUNT || head.y < 0 || head.y >= CELL_COUNT) {
        handleGameOver();
        return;
      }

      // Check collision with self
      if (snake.current.some((seg) => seg.x === head.x && seg.y === head.y)) {
        handleGameOver();
        return;
      }

      // Move snake
      const newSnake = [head, ...snake.current];

      // Check if food eaten
      if (head.x === food.current.x && head.y === food.current.y) {
        playBeep(900, "triangle", 0.05); // point sound
        setScore((s) => {
          const nextScore = s + 10;
          if (nextScore > highScore) {
            setHighScore(nextScore);
            localStorage.setItem("gt-os-snake-hs", String(nextScore));
          }
          return nextScore;
        });
        
        food.current = generateFood();
        // Speed up slightly
        speed.current = Math.max(70, speed.current - 3);
      } else {
        newSnake.pop();
      }

      snake.current = newSnake;
      
      // Request next frame
      timeoutId = setTimeout(tick, speed.current);
    };

    if (isStarted.current && !isPaused && !gameOver) {
      timeoutId = setTimeout(tick, speed.current);
    }

    return () => clearTimeout(timeoutId);
  }, [isPaused, gameOver, generateFood, playBeep, highScore]);

  // Render loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    ctx.clearRect(0, 0, width, height);

    // Dynamic color bindings
    const primaryColor = getComputedStyle(document.documentElement).getPropertyValue("--gt-primary").trim() || "#00F5D4";
    const accentColor = getComputedStyle(document.documentElement).getPropertyValue("--gt-accent").trim() || "#8B5CF6";
    const gridColor = "rgba(255,255,255,0.03)";

    // Draw grid background
    ctx.strokeStyle = gridColor;
    ctx.lineWidth = 0.5;
    for (let i = 0; i <= CELL_COUNT; i++) {
      // Columns
      ctx.beginPath();
      ctx.moveTo(i * GRID_SIZE, 0);
      ctx.lineTo(i * GRID_SIZE, height);
      ctx.stroke();

      // Rows
      ctx.beginPath();
      ctx.moveTo(0, i * GRID_SIZE);
      ctx.lineTo(width, i * GRID_SIZE);
      ctx.stroke();
    }

    // Draw Food
    ctx.fillStyle = accentColor;
    ctx.shadowBlur = 10;
    ctx.shadowColor = accentColor;
    ctx.beginPath();
    ctx.arc(
      food.current.x * GRID_SIZE + GRID_SIZE / 2,
      food.current.y * GRID_SIZE + GRID_SIZE / 2,
      GRID_SIZE / 2.5,
      0,
      2 * Math.PI
    );
    ctx.fill();
    ctx.shadowBlur = 0; // reset shadow

    // Draw Snake
    snake.current.forEach((seg, index) => {
      ctx.fillStyle = index === 0 
        ? primaryColor 
        : `color-mix(in srgb, ${primaryColor} ${Math.max(30, 100 - index * 6)}%, transparent)`;
      
      // Draw rounded block
      ctx.beginPath();
      ctx.roundRect(
        seg.x * GRID_SIZE + 1.5,
        seg.y * GRID_SIZE + 1.5,
        GRID_SIZE - 3,
        GRID_SIZE - 3,
        4
      );
      ctx.fill();
    });
  }, [score, gameOver, isPaused]);

  const handleGameOver = () => {
    playWarning(); // warning audio
    setGameOver(true);
  };

  const handleMobileNav = (dir: Direction) => {
    if (gameOver || isPaused) return;
    const currentDir = direction.current;
    
    switch (dir) {
      case "UP": if (currentDir !== "DOWN") nextDirection.current = "UP"; break;
      case "DOWN": if (currentDir !== "UP") nextDirection.current = "DOWN"; break;
      case "LEFT": if (currentDir !== "RIGHT") nextDirection.current = "LEFT"; break;
      case "RIGHT": if (currentDir !== "LEFT") nextDirection.current = "RIGHT"; break;
    }
  };

  return (
    <div className="p-4 font-mono text-xs select-none flex flex-col items-center bg-[#020202] text-[var(--gt-fg)] h-full overflow-y-auto">
      {/* Top Banner stats */}
      <div className="w-full max-w-[360px] flex items-center justify-between border border-[var(--gt-border)] p-2 rounded bg-[var(--gt-surface)] mb-3">
        <div>Score: <span className="font-bold" style={{ color: "var(--gt-primary)" }}>{score}</span></div>
        <div>High Score: <span className="font-bold">{highScore}</span></div>
      </div>

      {/* Screen Frame */}
      <div className="relative border border-[var(--gt-border)] rounded-md overflow-hidden bg-black flex-shrink-0">
        <canvas 
          ref={canvasRef} 
          width={400} 
          height={400} 
          className="max-w-[320px] max-h-[320px] sm:max-w-none sm:max-h-none block"
        />

        {/* Start / Pause / Game Over Banner */}
        {(gameOver || isPaused) && (
          <div className="absolute inset-0 bg-black/85 flex flex-col items-center justify-center text-center p-6 select-none">
            {gameOver ? (
              <>
                <span className="text-red-500 font-bold uppercase tracking-widest text-sm mb-1">=== SYSTEM ERROR ===</span>
                <span className="text-xs text-zinc-400 mb-6">Worm collided or out of boundary limits.</span>
                <button
                  onClick={resetGame}
                  className="px-4 py-2 border rounded flex items-center gap-2 transition-all hover:bg-zinc-800"
                  style={{ color: "var(--gt-primary)", borderColor: "var(--gt-primary)" }}
                >
                  <RotateCcw size={12} /> Reboot System
                </button>
              </>
            ) : !isStarted.current ? (
              <>
                <span className="text-zinc-300 font-bold uppercase tracking-widest text-sm mb-1 font-heading text-[var(--gt-primary)]">Cyber_Snake.exe</span>
                <span className="text-[10px] text-zinc-500 mb-6">Consume data payloads without border overflows.</span>
                <button
                  onClick={resetGame}
                  className="px-5 py-2 border rounded flex items-center gap-2 transition-all hover:bg-zinc-800 font-bold"
                  style={{ color: "var(--gt-primary)", borderColor: "var(--gt-primary)" }}
                >
                  <Play size={12} /> Initialize Ingestion
                </button>
              </>
            ) : (
              <>
                <span className="text-yellow-500 font-bold uppercase tracking-widest text-sm mb-1">=== SYSTEM PAUSED ===</span>
                <span className="text-[10px] text-zinc-500 mb-6">Execution cycle currently frozen.</span>
                <button
                  onClick={() => setIsPaused(false)}
                  className="px-5 py-2 border rounded flex items-center gap-2 transition-all hover:bg-zinc-800 font-bold"
                  style={{ color: "var(--gt-primary)", borderColor: "var(--gt-primary)" }}
                >
                  <Play size={12} /> Resume Execution
                </button>
              </>
            )}
          </div>
        )}
      </div>

      {/* Control Buttons Block */}
      {isStarted.current && !gameOver && (
        <div className="w-full max-w-[360px] flex justify-center gap-4 mt-3">
          <button
            onClick={() => setIsPaused((p) => !p)}
            className="px-4 py-1.5 border rounded flex items-center gap-1.5 text-[10px] font-bold tracking-wider hover:bg-zinc-950 transition-colors uppercase shrink-0"
            style={{ borderColor: "var(--gt-border)" }}
          >
            {isPaused ? <Play size={10} /> : <Pause size={10} />}
            {isPaused ? "Run" : "Pause"}
          </button>
          
          <button
            onClick={resetGame}
            className="px-4 py-1.5 border rounded flex items-center gap-1.5 text-[10px] font-bold tracking-wider hover:bg-zinc-950 transition-colors uppercase shrink-0"
            style={{ borderColor: "var(--gt-border)" }}
          >
            <RotateCcw size={10} /> Reset
          </button>
        </div>
      )}

      {/* Mobile D-PAD controls */}
      <div className="flex sm:hidden flex-col items-center mt-4 gap-1.5 select-none">
        {/* Row 1 */}
        <button 
          onClick={() => handleMobileNav("UP")}
          className="w-9 h-9 border rounded-lg bg-zinc-950 border-zinc-700 flex items-center justify-center active:bg-zinc-900 active:scale-95"
        >
          <ArrowUp size={14} style={{ color: "var(--gt-primary)" }} />
        </button>
        
        {/* Row 2 */}
        <div className="flex gap-6">
          <button 
            onClick={() => handleMobileNav("LEFT")}
            className="w-9 h-9 border rounded-lg bg-zinc-950 border-zinc-700 flex items-center justify-center active:bg-zinc-900 active:scale-95"
          >
            <ArrowLeft size={14} style={{ color: "var(--gt-primary)" }} />
          </button>
          
          <div className="w-9" />
          
          <button 
            onClick={() => handleMobileNav("RIGHT")}
            className="w-9 h-9 border rounded-lg bg-zinc-950 border-zinc-700 flex items-center justify-center active:bg-zinc-900 active:scale-95"
          >
            <ArrowRight size={14} style={{ color: "var(--gt-primary)" }} />
          </button>
        </div>
        
        {/* Row 3 */}
        <button 
          onClick={() => handleMobileNav("DOWN")}
          className="w-9 h-9 border rounded-lg bg-zinc-950 border-zinc-700 flex items-center justify-center active:bg-zinc-900 active:scale-95"
        >
          <ArrowDown size={14} style={{ color: "var(--gt-primary)" }} />
        </button>
      </div>
      
      {/* Footer controls hint */}
      <div className="mt-4 text-[9px] text-zinc-600 font-bold uppercase tracking-wider text-center hidden sm:block">
        Use Keyboard Arrow keys to steer • Spacebar to Pause/Resume
      </div>
    </div>
  );
}
