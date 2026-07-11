"use client";

import { useEffect, useRef, useState } from "react";
import { useSound } from "@/components/effects/useSound";
import { Paintbrush, Trash2, Download, Eraser } from "lucide-react";

export default function Paint() {
  const { playBeep } = useSound();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  
  const [color, setColor] = useState("#00F5D4"); // default primary cyan
  const [brushSize, setBrushSize] = useState(4);
  const [tool, setTool] = useState<"brush" | "eraser">("brush");
  const isDrawing = useRef(false);
  
  // Custom swatch colors mapping
  const [swatches, setSwatches] = useState<string[]>([
    "#00F5D4", "#8B5CF6", "#EF4444", "#3B82F6", "#FACC15", "#10B981", "#FFFFFF", "#FF00FF"
  ]);

  // Sync swatch color palette with active CSS variables if available
  useEffect(() => {
    if (typeof window !== "undefined") {
      const primary = getComputedStyle(document.documentElement).getPropertyValue("--gt-primary").trim();
      const accent = getComputedStyle(document.documentElement).getPropertyValue("--gt-accent").trim();
      const danger = getComputedStyle(document.documentElement).getPropertyValue("--gt-danger").trim();
      const warning = getComputedStyle(document.documentElement).getPropertyValue("--gt-warning").trim();
      
      const newSwatches = [...swatches];
      if (primary) newSwatches[0] = primary;
      if (accent) newSwatches[1] = accent;
      if (danger) newSwatches[2] = danger;
      if (warning) newSwatches[4] = warning;
      setSwatches(newSwatches);
      setColor(primary || "#00F5D4");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Initialize canvas with black background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  // Handle drawing events
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
    isDrawing.current = true;
    
    // Draw a single dot on click
    draw(e);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.strokeStyle = tool === "eraser" ? "#000000" : color;
    ctx.lineWidth = brushSize;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const stopDrawing = () => {
    isDrawing.current = false;
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    playBeep(250, "triangle", 0.15); // wipe sweep sound
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  const saveDrawing = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    playBeep(800, "sine", 0.08); // success tone
    const dataUrl = canvas.toDataURL("image/png");
    
    // Programmatic link download
    const link = document.createElement("a");
    link.download = "cyber_canvas.png";
    link.href = dataUrl;
    link.click();
  };

  return (
    <div className="p-4 font-mono text-xs select-none flex flex-col items-center bg-[#050505] text-[var(--gt-fg)] h-full overflow-y-auto">
      {/* Toolkit Panel */}
      <div className="w-full max-w-[500px] flex flex-wrap items-center justify-between gap-3 border border-[var(--gt-border)] p-2 rounded bg-[var(--gt-surface)] mb-3">
        {/* Tool Selectors */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              playBeep(700, "sine", 0.04);
              setTool("brush");
            }}
            className="p-1.5 border rounded flex items-center gap-1 hover:bg-zinc-950 transition-colors uppercase text-[9px] font-bold tracking-wider"
            style={{ 
              borderColor: tool === "brush" ? "var(--gt-primary)" : "var(--gt-border)",
              color: tool === "brush" ? "var(--gt-primary)" : "var(--gt-muted-fg)"
            }}
            title="Brush Tool"
          >
            <Paintbrush size={11} /> Brush
          </button>
          
          <button
            onClick={() => {
              playBeep(700, "sine", 0.04);
              setTool("eraser");
            }}
            className="p-1.5 border rounded flex items-center gap-1 hover:bg-zinc-950 transition-colors uppercase text-[9px] font-bold tracking-wider"
            style={{ 
              borderColor: tool === "eraser" ? "var(--gt-primary)" : "var(--gt-border)",
              color: tool === "eraser" ? "var(--gt-primary)" : "var(--gt-muted-fg)"
            }}
            title="Eraser Tool"
          >
            <Eraser size={11} /> Eraser
          </button>
        </div>

        {/* Thickness Slider */}
        <div className="flex items-center gap-2 flex-grow max-w-[130px]">
          <span className="text-[9px] text-zinc-500 uppercase font-bold shrink-0">Size:</span>
          <input
            type="range"
            min={2}
            max={20}
            value={brushSize}
            onChange={(e) => setBrushSize(Number(e.target.value))}
            className="w-full h-1 bg-zinc-800 accent-[var(--gt-primary)] cursor-pointer"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={clearCanvas}
            className="p-1.5 border border-[var(--gt-border)] hover:border-red-500 rounded flex items-center justify-center hover:bg-red-950/20 text-zinc-400 hover:text-red-400 transition-all"
            title="Wipe Canvas"
            aria-label="Wipe Canvas"
          >
            <Trash2 size={12} />
          </button>
          
          <button
            onClick={saveDrawing}
            className="p-1.5 border border-[var(--gt-border)] hover:border-[var(--gt-primary)] rounded flex items-center justify-center hover:bg-emerald-950/20 text-zinc-400 hover:text-[var(--gt-primary)] transition-all"
            title="Save PNG"
            aria-label="Save PNG"
          >
            <Download size={12} />
          </button>
        </div>
      </div>

      {/* Drawing Canvas Frame */}
      <div className="border border-[var(--gt-border)] rounded overflow-hidden bg-black mb-3">
        <canvas
          ref={canvasRef}
          width={480}
          height={320}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          className="cursor-crosshair max-w-[320px] max-h-[220px] sm:max-w-none sm:max-h-none block"
        />
      </div>

      {/* Colors Swatches palette */}
      {tool === "brush" && (
        <div className="w-full max-w-[500px] flex items-center justify-center gap-2 border border-[var(--gt-border)] p-2.5 rounded bg-[var(--gt-surface)]">
          {swatches.map((swatch, i) => (
            <button
              key={i}
              onClick={() => {
                playBeep(800, "sine", 0.04);
                setColor(swatch);
              }}
              className="w-5 h-5 rounded-full border transition-transform hover:scale-115 active:scale-95"
              style={{
                background: swatch,
                borderColor: color === swatch ? "#ffffff" : "rgba(255,255,255,0.15)",
                boxShadow: color === swatch ? `0 0 10px ${swatch}` : "none",
              }}
              title={swatch}
              aria-label={`Select color ${swatch}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
