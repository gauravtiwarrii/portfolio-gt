"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LINES = [
    "> BOOT SEQUENCE INITIATED...",
    '> LOADING CORE MODULES        [OK]',
    '> MOUNTING DATA PIPELINES     [OK]',
    '> SYNCING CLOUD INFRASTRUCTURE[OK]',
    '> INITIALIZING 3D ENGINE      [OK]',
    '> RENDERING PORTFOLIO UI      [OK]',
    '> SYSTEM READY.',
];

// Wireframe cube vertices and edges
const CUBE_VERTICES = [
    [-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1],
    [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1],
];
const CUBE_EDGES = [
    [0, 1], [1, 2], [2, 3], [3, 0],
    [4, 5], [5, 6], [6, 7], [7, 4],
    [0, 4], [1, 5], [2, 6], [3, 7],
];

function WireframeCube({ progress }: { progress: number }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animRef = useRef<number>(0);
    const timeRef = useRef(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const size = 200;
        canvas.width = size;
        canvas.height = size;

        const draw = () => {
            timeRef.current += 0.015;
            const t = timeRef.current;

            ctx.clearRect(0, 0, size, size);

            const rotX = t * 0.7;
            const rotY = t * 0.5;

            // Rotation matrices
            const cosX = Math.cos(rotX), sinX = Math.sin(rotX);
            const cosY = Math.cos(rotY), sinY = Math.sin(rotY);

            const project = (v: number[]) => {
                const [x, y, z] = v;
                // Rotate Y
                const x1 = x * cosY - z * sinY;
                const z1 = x * sinY + z * cosY;
                // Rotate X
                const y1 = y * cosX - z1 * sinX;
                const z2 = y * sinX + z1 * cosX;
                // Simple perspective
                const scale = 3 / (5 + z2);
                return [size / 2 + x1 * scale * 60, size / 2 + y1 * scale * 60];
            };

            const projected = CUBE_VERTICES.map(project);

            // Draw edges with assembly animation
            const edgesToDraw = Math.floor(progress * CUBE_EDGES.length);

            for (let i = 0; i < CUBE_EDGES.length; i++) {
                const [a, b] = CUBE_EDGES[i];
                const [x1, y1] = projected[a];
                const [x2, y2] = projected[b];

                if (i < edgesToDraw) {
                    ctx.beginPath();
                    ctx.moveTo(x1, y1);
                    ctx.lineTo(x2, y2);
                    ctx.strokeStyle = `rgba(99, 102, 241, ${0.4 + progress * 0.4})`;
                    ctx.lineWidth = 1.5;
                    ctx.stroke();
                } else if (i === edgesToDraw) {
                    // Partially drawn edge
                    const partial = (progress * CUBE_EDGES.length) % 1;
                    ctx.beginPath();
                    ctx.moveTo(x1, y1);
                    ctx.lineTo(x1 + (x2 - x1) * partial, y1 + (y2 - y1) * partial);
                    ctx.strokeStyle = `rgba(99, 102, 241, 0.6)`;
                    ctx.lineWidth = 1.5;
                    ctx.stroke();
                }
            }

            // Draw vertices
            for (let i = 0; i < projected.length; i++) {
                const vertexProgress = i / projected.length;
                if (vertexProgress <= progress) {
                    const [x, y] = projected[i];
                    ctx.beginPath();
                    ctx.arc(x, y, 2.5, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(129, 140, 248, ${0.5 + progress * 0.5})`;
                    ctx.fill();

                    // Glow
                    ctx.beginPath();
                    ctx.arc(x, y, 5, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(99, 102, 241, ${0.1 * progress})`;
                    ctx.fill();
                }
            }

            animRef.current = requestAnimationFrame(draw);
        };

        animRef.current = requestAnimationFrame(draw);
        return () => cancelAnimationFrame(animRef.current);
    }, [progress]);

    return (
        <canvas
            ref={canvasRef}
            className="absolute right-12 md:right-24 top-1/2 -translate-y-1/2 opacity-60"
            style={{ width: 200, height: 200 }}
        />
    );
}

export default function BootScreen() {
    const [visible, setVisible] = useState(false);
    const [lines, setLines] = useState<string[]>([]);
    const [done, setDone] = useState(false);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (typeof window === "undefined") return;
        if (sessionStorage.getItem("booted")) return;
        sessionStorage.setItem("booted", "1");
        setVisible(true);

        let i = 0;
        const show = () => {
            setLines(prev => [...prev, LINES[i]]);
            setProgress((i + 1) / LINES.length);
            i++;
            if (i < LINES.length) {
                setTimeout(show, 260);
            } else {
                setTimeout(() => setDone(true), 500);
                setTimeout(() => setVisible(false), 1100);
            }
        };
        setTimeout(show, 200);
    }, []);

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6 }}
                    className="fixed inset-0 z-[9999] flex flex-col items-start justify-center px-12 md:px-24"
                    style={{ background: "#02020a" }}
                >
                    {/* Scan lines */}
                    <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                            backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.015) 2px, rgba(255,255,255,0.015) 4px)",
                            backgroundSize: "100% 4px",
                        }}
                    />

                    {/* Corner brackets */}
                    <div className="absolute top-8 left-8 w-8 h-8 border-t-2 border-l-2 border-indigo-500/60" />
                    <div className="absolute top-8 right-8 w-8 h-8 border-t-2 border-r-2 border-indigo-500/60" />
                    <div className="absolute bottom-8 left-8 w-8 h-8 border-b-2 border-l-2 border-indigo-500/60" />
                    <div className="absolute bottom-8 right-8 w-8 h-8 border-b-2 border-r-2 border-indigo-500/60" />

                    {/* 3D Wireframe Cube */}
                    <WireframeCube progress={progress} />

                    {/* Header */}
                    <p className="font-mono text-xs text-indigo-400/50 mb-8 tracking-widest uppercase">
                        GAURAV TIWARI — PORTFOLIO v3.0
                    </p>

                    {/* Boot lines */}
                    <div className="space-y-1.5">
                        {lines.map((line, i) => (
                            <motion.p
                                key={i}
                                initial={{ opacity: 0, x: -8 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.2 }}
                                className="font-mono text-sm text-zinc-300"
                                style={{ textShadow: "0 0 8px rgba(100,120,255,0.4)" }}
                            >
                                {line}
                            </motion.p>
                        ))}
                    </div>

                    {/* Progress bar */}
                    {done && (
                        <motion.div
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ duration: 0.4 }}
                            className="mt-8 h-0.5 w-48 bg-gradient-to-r from-indigo-500 to-violet-500 origin-left"
                        />
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    );
}
