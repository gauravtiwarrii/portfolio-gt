"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "@/components/providers/ThemeProvider";
import { useSound } from "@/components/effects/useSound";
import { useWindowManager } from "@/components/os/WindowManager";
import { ToggleLeft, ToggleRight, Sparkles, Gamepad2, Coffee, Palette } from "lucide-react";

export default function TaskManager() {
  const { 
    showMatrixRain, setShowMatrixRain, 
    showCrt, setShowCrt, 
    isMuted, setIsMuted 
  } = useTheme();
  
  const { playBeep } = useSound();
  const { isWindowOpen, closeWindow } = useWindowManager();
  
  const cpuCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const memCanvasRef = useRef<HTMLCanvasElement | null>(null);
  
  const [cpuUsage, setCpuUsage] = useState("12%");
  const [memUsage, setMemUsage] = useState("4.2GB");
  
  const cpuHistory = useRef<number[]>(Array(50).fill(15));
  const memHistory = useRef<number[]>(Array(50).fill(52));

  // Canvas render loops for CPU & Memory graphs
  useEffect(() => {
    let animationId: number;
    
    const updateGraph = () => {
      // Simulate new metric points
      const nextCpu = Math.max(5, Math.min(95, cpuHistory.current[cpuHistory.current.length - 1] + (Math.random() * 20 - 10)));
      const nextMem = Math.max(50, Math.min(55, memHistory.current[memHistory.current.length - 1] + (Math.random() * 2 - 1)));
      
      cpuHistory.current.shift();
      cpuHistory.current.push(nextCpu);
      
      memHistory.current.shift();
      memHistory.current.push(nextMem);
      
      setCpuUsage(`${Math.round(nextCpu)}%`);
      setMemUsage(`${(nextMem / 12).toFixed(1)}GB (52%)`);
      
      // Draw CPU Graph
      drawCanvas(cpuCanvasRef.current, cpuHistory.current, "CPU Load");
      // Draw Memory Graph
      drawCanvas(memCanvasRef.current, memHistory.current, "Memory");
      
      // Update at ~10 FPS to look realistic but be light on CPU
      setTimeout(() => {
        animationId = requestAnimationFrame(updateGraph);
      }, 100);
    };

    const drawCanvas = (canvas: HTMLCanvasElement | null, data: number[], label: string) => {
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      
      const width = canvas.width;
      const height = canvas.height;
      
      ctx.clearRect(0, 0, width, height);
      
      // Fetch primary accent color from custom properties
      const primaryColor = getComputedStyle(document.documentElement)
        .getPropertyValue("--gt-primary")
        .trim() || "#00F5D4";
      const gridColor = getComputedStyle(document.documentElement)
        .getPropertyValue("--gt-border")
        .trim() || "rgba(255,255,255,0.08)";
        
      // Draw background grid lines
      ctx.strokeStyle = gridColor;
      ctx.lineWidth = 0.5;
      
      // Horizontal grid
      for (let y = 10; y < height; y += 15) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
      
      // Vertical grid
      for (let x = 10; x < width; x += 20) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      
      // Draw line graph
      ctx.strokeStyle = primaryColor;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      
      const step = width / (data.length - 1);
      data.forEach((val, i) => {
        // Invert Y coordinate so 100% is at the top
        const yPos = height - (val / 100) * (height - 10) - 5;
        const xPos = i * step;
        
        if (i === 0) {
          ctx.moveTo(xPos, yPos);
        } else {
          ctx.lineTo(xPos, yPos);
        }
      });
      ctx.stroke();
      
      // Draw Area under curve (fade)
      ctx.fillStyle = `color-mix(in srgb, ${primaryColor} 10%, transparent)`;
      ctx.lineTo(width, height);
      ctx.lineTo(0, height);
      ctx.closePath();
      ctx.fill();
    };

    updateGraph();
    
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  const handleToggle = (setting: string, currentVal: boolean, setter: (val: boolean) => void) => {
    playBeep(currentVal ? 400 : 700, "sine", 0.05);
    setter(!currentVal);
  };

  return (
    <div className="p-5 font-mono text-xs select-none flex flex-col h-full bg-[#050505] text-[var(--gt-fg)]">
      {/* Metrics Row */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {/* CPU Block */}
        <div className="border border-[var(--gt-border)] p-3 rounded-lg bg-[var(--gt-surface)]">
          <div className="flex items-center justify-between mb-1.5 font-bold">
            <span style={{ color: "var(--gt-primary)" }}>⚙️ CPU In-Use</span>
            <span>{cpuUsage}</span>
          </div>
          <canvas 
            ref={cpuCanvasRef} 
            width={260} 
            height={70} 
            className="w-full h-16 border-t border-[var(--gt-border)] pt-1.5"
          />
        </div>
        
        {/* Memory Block */}
        <div className="border border-[var(--gt-border)] p-3 rounded-lg bg-[var(--gt-surface)]">
          <div className="flex items-center justify-between mb-1.5 font-bold">
            <span style={{ color: "var(--gt-primary)" }}>💾 RAM Buffer</span>
            <span>{memUsage}</span>
          </div>
          <canvas 
            ref={memCanvasRef} 
            width={260} 
            height={70} 
            className="w-full h-16 border-t border-[var(--gt-border)] pt-1.5"
          />
        </div>
      </div>

      {/* Processes Table */}
      <div className="flex-1 border border-[var(--gt-border)] rounded-lg overflow-hidden flex flex-col bg-[var(--gt-surface)]">
        {/* Table Header */}
        <div 
          className="grid grid-cols-12 font-bold px-4 py-2 border-b uppercase text-[9px] tracking-wider"
          style={{ borderColor: "var(--gt-border)", background: "rgba(255,255,255,0.02)" }}
        >
          <span className="col-span-5">Process Name</span>
          <span className="col-span-2 text-center">Load</span>
          <span className="col-span-2 text-center">Status</span>
          <span className="col-span-3 text-right">Controller</span>
        </div>

        {/* Process Items */}
        <div className="flex-1 overflow-y-auto divide-y divide-[var(--gt-border)]">
          {/* Item 1: Kernel */}
          <div className="grid grid-cols-12 items-center px-4 py-2 text-[11px]">
            <span className="col-span-5 font-bold flex items-center gap-1.5 text-zinc-300">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-ping" />
              GT_OS_Kernel.sys
            </span>
            <span className="col-span-2 text-center text-zinc-400 font-bold">2.4%</span>
            <span className="col-span-2 text-center text-green-400 font-bold">SYSTEM</span>
            <span className="col-span-3 text-right text-[10px] text-zinc-500 font-bold uppercase">Locked</span>
          </div>

          {/* Item 2: Matrix Rain */}
          <div className="grid grid-cols-12 items-center px-4 py-2 text-[11px]">
            <span className="col-span-5 font-bold flex items-center gap-1.5 text-zinc-300">
              <span className={`w-1.5 h-1.5 rounded-full ${showMatrixRain ? "bg-green-500" : "bg-red-500"}`} />
              matrix-rain.sys
            </span>
            <span className="col-span-2 text-center text-zinc-400">{showMatrixRain ? "3.8%" : "0.0%"}</span>
            <span className={`col-span-2 text-center font-bold ${showMatrixRain ? "text-green-500" : "text-red-500"}`}>
              {showMatrixRain ? "RUNNING" : "STOPPED"}
            </span>
            <div className="col-span-3 flex justify-end">
              <button 
                onClick={() => handleToggle("matrix", showMatrixRain, setShowMatrixRain)}
                className="hover:opacity-80 transition-opacity"
                style={{ color: showMatrixRain ? "var(--gt-primary)" : "var(--gt-muted-fg)" }}
                aria-label="Toggle Matrix Rain"
              >
                {showMatrixRain ? <ToggleRight size={22} /> : <ToggleLeft size={22} />}
              </button>
            </div>
          </div>

          {/* Item 3: CRT scanlines */}
          <div className="grid grid-cols-12 items-center px-4 py-2 text-[11px]">
            <span className="col-span-5 font-bold flex items-center gap-1.5 text-zinc-300">
              <span className={`w-1.5 h-1.5 rounded-full ${showCrt ? "bg-green-500" : "bg-red-500"}`} />
              crt-scanlines.sys
            </span>
            <span className="col-span-2 text-center text-zinc-400">{showCrt ? "1.5%" : "0.0%"}</span>
            <span className={`col-span-2 text-center font-bold ${showCrt ? "text-green-500" : "text-red-500"}`}>
              {showCrt ? "RUNNING" : "STOPPED"}
            </span>
            <div className="col-span-3 flex justify-end">
              <button 
                onClick={() => handleToggle("crt", showCrt, setShowCrt)}
                className="hover:opacity-80 transition-opacity"
                style={{ color: showCrt ? "var(--gt-primary)" : "var(--gt-muted-fg)" }}
                aria-label="Toggle CRT Scanlines"
              >
                {showCrt ? <ToggleRight size={22} /> : <ToggleLeft size={22} />}
              </button>
            </div>
          </div>

          {/* Item 4: Audio synthesizer */}
          <div className="grid grid-cols-12 items-center px-4 py-2 text-[11px]">
            <span className="col-span-5 font-bold flex items-center gap-1.5 text-zinc-300">
              <span className={`w-1.5 h-1.5 rounded-full ${!isMuted ? "bg-green-500" : "bg-red-500"}`} />
              sound-synth.sys
            </span>
            <span className="col-span-2 text-center text-zinc-400">0.2%</span>
            <span className={`col-span-2 text-center font-bold ${!isMuted ? "text-green-500" : "text-yellow-500"}`}>
              {!isMuted ? "ACTIVE" : "MUTED"}
            </span>
            <div className="col-span-3 flex justify-end">
              <button 
                onClick={() => handleToggle("mute", isMuted, setIsMuted)}
                className="hover:opacity-80 transition-opacity"
                style={{ color: !isMuted ? "var(--gt-primary)" : "var(--gt-muted-fg)" }}
                aria-label="Toggle Audio"
              >
                {!isMuted ? <ToggleRight size={22} /> : <ToggleLeft size={22} />}
              </button>
            </div>
          </div>

          {/* Item 5: AI Assistant */}
          <div className="grid grid-cols-12 items-center px-4 py-2 text-[11px]">
            <span className="col-span-5 font-bold flex items-center gap-1.5 text-zinc-300">
              <span className={`w-1.5 h-1.5 rounded-full ${isWindowOpen("ai-assistant") ? "bg-green-500" : "bg-red-500"}`} />
              brain-assistant.exe
            </span>
            <span className="col-span-2 text-center text-zinc-400">{isWindowOpen("ai-assistant") ? "1.8%" : "0.0%"}</span>
            <span className={`col-span-2 text-center font-bold ${isWindowOpen("ai-assistant") ? "text-green-500" : "text-red-500"}`}>
              {isWindowOpen("ai-assistant") ? "RUNNING" : "STOPPED"}
            </span>
            <div className="col-span-3 flex justify-end text-zinc-500 font-bold uppercase text-[9px] gap-1 pr-1.5">
              {isWindowOpen("ai-assistant") ? (
                <button 
                  onClick={() => {
                    playBeep(300, "sawtooth", 0.05);
                    closeWindow("ai-assistant");
                  }}
                  className="text-red-400 hover:text-red-300 font-bold hover:underline"
                >
                  End Task
                </button>
              ) : (
                <span className="text-zinc-600 flex items-center gap-1"><Sparkles size={10} /> Idle</span>
              )}
            </div>
          </div>

          {/* Item 6: Snake */}
          <div className="grid grid-cols-12 items-center px-4 py-2 text-[11px]">
            <span className="col-span-5 font-bold flex items-center gap-1.5 text-zinc-300">
              <span className={`w-1.5 h-1.5 rounded-full ${isWindowOpen("snake-window") ? "bg-green-500" : "bg-red-500"}`} />
              snake.exe
            </span>
            <span className="col-span-2 text-center text-zinc-400">{isWindowOpen("snake-window") ? "8.6%" : "0.0%"}</span>
            <span className={`col-span-2 text-center font-bold ${isWindowOpen("snake-window") ? "text-green-500" : "text-red-500"}`}>
              {isWindowOpen("snake-window") ? "RUNNING" : "STOPPED"}
            </span>
            <div className="col-span-3 flex justify-end text-zinc-500 font-bold uppercase text-[9px] gap-1 pr-1.5">
              {isWindowOpen("snake-window") ? (
                <button 
                  onClick={() => {
                    playBeep(300, "sawtooth", 0.05);
                    closeWindow("snake-window");
                  }}
                  className="text-red-400 hover:text-red-300 font-bold hover:underline"
                >
                  End Task
                </button>
              ) : (
                <span className="text-zinc-600 flex items-center gap-1"><Gamepad2 size={10} /> Idle</span>
              )}
            </div>
          </div>

          {/* Item 7: BugDodge */}
          <div className="grid grid-cols-12 items-center px-4 py-2 text-[11px]">
            <span className="col-span-5 font-bold flex items-center gap-1.5 text-zinc-300">
              <span className={`w-1.5 h-1.5 rounded-full ${isWindowOpen("bugdodge-window") ? "bg-green-500" : "bg-red-500"}`} />
              bugdodge.exe
            </span>
            <span className="col-span-2 text-center text-zinc-400">{isWindowOpen("bugdodge-window") ? "12.4%" : "0.0%"}</span>
            <span className={`col-span-2 text-center font-bold ${isWindowOpen("bugdodge-window") ? "text-green-500" : "text-red-500"}`}>
              {isWindowOpen("bugdodge-window") ? "RUNNING" : "STOPPED"}
            </span>
            <div className="col-span-3 flex justify-end text-zinc-500 font-bold uppercase text-[9px] gap-1 pr-1.5">
              {isWindowOpen("bugdodge-window") ? (
                <button 
                  onClick={() => {
                    playBeep(300, "sawtooth", 0.05);
                    closeWindow("bugdodge-window");
                  }}
                  className="text-red-400 hover:text-red-300 font-bold hover:underline"
                >
                  End Task
                </button>
              ) : (
                <span className="text-zinc-600 flex items-center gap-1"><Coffee size={10} /> Idle</span>
              )}
            </div>
          </div>

          {/* Item 8: Paint */}
          <div className="grid grid-cols-12 items-center px-4 py-2 text-[11px]">
            <span className="col-span-5 font-bold flex items-center gap-1.5 text-zinc-300">
              <span className={`w-1.5 h-1.5 rounded-full ${isWindowOpen("paint-window") ? "bg-green-500" : "bg-red-500"}`} />
              paint.exe
            </span>
            <span className="col-span-2 text-center text-zinc-400">{isWindowOpen("paint-window") ? "4.1%" : "0.0%"}</span>
            <span className={`col-span-2 text-center font-bold ${isWindowOpen("paint-window") ? "text-green-500" : "text-red-500"}`}>
              {isWindowOpen("paint-window") ? "RUNNING" : "STOPPED"}
            </span>
            <div className="col-span-3 flex justify-end text-zinc-500 font-bold uppercase text-[9px] gap-1 pr-1.5">
              {isWindowOpen("paint-window") ? (
                <button 
                  onClick={() => {
                    playBeep(300, "sawtooth", 0.05);
                    closeWindow("paint-window");
                  }}
                  className="text-red-400 hover:text-red-300 font-bold hover:underline"
                >
                  End Task
                </button>
              ) : (
                <span className="text-zinc-600 flex items-center gap-1"><Palette size={10} /> Idle</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
