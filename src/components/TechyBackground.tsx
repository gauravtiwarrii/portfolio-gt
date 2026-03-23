"use client";

import { useEffect, useRef } from "react";

export default function TechyBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            drawGrid();
        };

        const drawGrid = () => {
            const width = canvas.width;
            const height = canvas.height;
            const gridSize = 40; // Spacing between dots

            ctx.clearRect(0, 0, width, height);
            
            // Draw pure black background
            ctx.fillStyle = "#000000";
            ctx.fillRect(0, 0, width, height);

            ctx.fillStyle = "rgba(255, 255, 255, 0.05)"; // Very subtle dots

            for (let x = 0; x <= width; x += gridSize) {
                for (let y = 0; y <= height; y += gridSize) {
                    ctx.beginPath();
                    ctx.arc(x, y, 1, 0, Math.PI * 2);
                    ctx.fill();
                }
            }
            
            // Draw animated scanning line
            const time = Date.now() * 0.0005;
            const scanY = (Math.sin(time) * 0.5 + 0.5) * height; // Oscillates 0 to height
            
            const gradient = ctx.createLinearGradient(0, scanY - 50, 0, scanY + 50);
            gradient.addColorStop(0, "rgba(168, 85, 247, 0)"); // Transparent purple
            gradient.addColorStop(0.5, "rgba(168, 85, 247, 0.03)"); // Very subtle purple scan line
            gradient.addColorStop(1, "rgba(168, 85, 247, 0)");
            
            ctx.fillStyle = gradient;
            ctx.fillRect(0, scanY - 50, width, 100);
            
            animationFrameId = requestAnimationFrame(drawGrid);
        };

        window.addEventListener("resize", resizeCanvas);
        resizeCanvas(); // Initial setup

        return () => {
            window.removeEventListener("resize", resizeCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-[-1]"
            style={{ imageRendering: "pixelated" }}
        />
    );
}
