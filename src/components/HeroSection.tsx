"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Terminal as TerminalIcon, Cpu, Database, Download } from "lucide-react";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";

// Canvas Matrix Rain Component
const MatrixRain = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Resize
        const setCanvasSize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        setCanvasSize();
        window.addEventListener("resize", setCanvasSize);

        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+-=[]{}|;:,.<>?".split("");
        const fontSize = 14;
        const columns = canvas.width / fontSize;
        const drops: number[] = [];

        for (let i = 0; i < columns; i++) drops[i] = 1;

        const draw = () => {
            ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = "#0f0";
            ctx.font = `${fontSize}px monospace`;

            for (let i = 0; i < drops.length; i++) {
                const text = chars[Math.floor(Math.random() * chars.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);
                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
                drops[i]++;
            }
        };

        const interval = setInterval(draw, 50);
        return () => {
            clearInterval(interval);
            window.removeEventListener("resize", setCanvasSize);
        };
    }, []);

    return (
        <canvas 
            ref={canvasRef} 
            className="absolute inset-0 w-full h-full opacity-15 pointer-events-none z-0 mix-blend-screen" 
            style={{ maskImage: "radial-gradient(ellipse at center, black 20%, transparent 80%)", WebkitMaskImage: "radial-gradient(ellipse at center, black 20%, transparent 80%)" }}
        />
    );
};

export default function HeroSection() {
    const [typedText, setTypedText] = useState("");
    const fullText = "> whoami --skills";
    const [logs, setLogs] = useState<string[]>([]);
    
    // Typewriter effect
    useEffect(() => {
        let currentText = "";
        let currentIndex = 0;
        
        const timeout = setTimeout(() => {
            const interval = setInterval(() => {
                if (currentIndex < fullText.length) {
                    currentText += fullText[currentIndex];
                    setTypedText(currentText);
                    currentIndex++;
                } else {
                    clearInterval(interval);
                }
            }, 100);
            return () => clearInterval(interval);
        }, 800);
        
        return () => clearTimeout(timeout);
    }, []);

    // Fake logs effect
    useEffect(() => {
        const fakeLogs = [
            "Mounting file systems... [OK]",
            "Loading kernel modules... [OK]",
            "Starting system logger... [OK]",
            "Initializing network interfaces... [OK]",
            "Starting Data Pipeline Service... [OK]",
            "Connecting to PostgreSQL cluster... [SUCCESS]",
            "Starting Apache Kafka brokers... [OK]",
            "Allocating memory for Spark cluster... [24GB]",
            "System ready.",
        ];
        
        let i = 0;
        const interval = setInterval(() => {
            if (i < fakeLogs.length) {
                setLogs(prev => [...prev.slice(-15), fakeLogs[i]]);
                i++;
            } else {
                clearInterval(interval);
            }
        }, 400);

        return () => clearInterval(interval);
    }, []);

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black font-mono pt-12 md:pt-16">
            {/* Matrix Rain Background */}
            <MatrixRain />
            
            <div className="relative z-10 w-full max-w-[1400px] h-auto min-h-[60vh] lg:h-[75vh] mx-auto px-4 grid grid-cols-1 lg:grid-cols-4 gap-4 md:gap-6 py-12 lg:py-0">
                
                {/* Left Sidebar: Boot Sequence / Logs */}
                <div className="hidden lg:flex flex-col gap-4 col-span-1 h-full">
                    <div className="flex-1 bg-black/60 backdrop-blur-xl border border-teal-500/20 rounded-lg p-5 shadow-[0_0_20px_rgba(45,212,191,0.05)] overflow-hidden relative">
                        <div className="absolute top-0 left-0 right-0 h-8 bg-teal-500/10 border-b border-teal-500/20 flex items-center px-4 gap-2 shadow-[0_2px_10px_rgba(45,212,191,0.05)]">
                            <TerminalIcon size={14} className="text-teal-400" />
                            <span className="text-xs text-teal-400 uppercase font-semibold">system_boot.log</span>
                        </div>
                        <div className="mt-8 flex flex-col gap-1.5 text-xs text-teal-300/70 font-mono tracking-tight opacity-90 overflow-y-auto">
                            {logs.map((log, i) => (
                                <motion.div 
                                    key={i} 
                                    initial={{ opacity: 0, x: -10 }} 
                                    animate={{ opacity: 1, x: 0 }}
                                >
                                    <span className="text-zinc-600">[{new Date().toISOString().split('T')[1].slice(0,8)}]</span> {log}
                                </motion.div>
                            ))}
                            {logs.length >= 9 && (
                                <div className="flex items-center gap-2 mt-2">
                                    <span className="text-teal-400">root@server:~#</span>
                                    <span className="w-2 h-3.5 bg-teal-400 animate-blink"></span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Center: Main Identity Terminal */}
                <div className="col-span-1 lg:col-span-2 flex flex-col justify-center items-center relative h-full">
                    <div className="w-full bg-black/80 backdrop-blur-2xl border border-white/10 rounded-xl p-8 md:p-14 shadow-[0_0_50px_rgba(0,0,0,0.8)] relative group overflow-hidden">
                        {/* Top controls */}
                        <div className="absolute top-4 left-4 flex gap-2">
                            <div className="w-3.5 h-3.5 rounded-full bg-red-500/80 shadow-[0_0_10px_rgba(239,68,68,0.5)]"></div>
                            <div className="w-3.5 h-3.5 rounded-full bg-yellow-500/80 shadow-[0_0_10px_rgba(234,179,8,0.5)]"></div>
                            <div className="w-3.5 h-3.5 rounded-full bg-green-500/80 shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
                        </div>
                        
                        {/* Glow */}
                        <div className="absolute inset-0 bg-gradient-to-r from-teal-500/0 via-teal-500/5 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

                        <div className="text-center mt-6 relative z-10 flex flex-col items-center">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2, duration: 0.8 }}
                                className="flex justify-center items-center gap-2 text-teal-400 text-sm md:text-lg tracking-wider mb-8 min-h-[1.5rem]"
                            >
                                <span>{typedText}</span>
                                <span className="w-2.5 h-5 bg-teal-400 animate-blink inline-block shadow-[0_0_8px_rgba(45,212,191,0.8)]" />
                            </motion.div>

                            <motion.h1
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.4, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                                className="font-bold tracking-tighter leading-[0.9] mb-10 select-none glitch-hover cursor-crosshair font-heading"
                                style={{
                                    fontSize: "clamp(3rem, 8vw, 6.5rem)",
                                    color: "white",
                                }}
                            >
                                Gaurav
                                <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-400 to-zinc-600">
                                    Tiwari
                                </span>
                            </motion.h1>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.9, duration: 0.5 }}
                                className="flex flex-wrap items-center justify-center gap-4 mt-6"
                            >
                                {[
                                    { icon: Github, href: "https://github.com/gauravtiwarrii", label: "GitHub" },
                                    { icon: Linkedin, href: "https://linkedin.com/in/gauravtiwarrii", label: "LinkedIn" },
                                    { icon: Mail, href: "/contact", label: "Contact" },
                                ].map(({ icon: Icon, href, label }) => (
                                    <Link
                                        key={label}
                                        href={href}
                                        target={href.startsWith("http") ? "_blank" : undefined}
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 px-6 py-3 rounded border border-white/10 text-zinc-400 hover:text-teal-400 hover:bg-teal-400/10 hover:border-teal-400/50 transition-all duration-300 group"
                                    >
                                        <Icon size={18} className="group-hover:scale-110 transition-transform" />
                                        <span className="text-xs uppercase tracking-widest">{label}</span>
                                    </Link>
                                ))}

                                {/* Download CV — accent button */}
                                <a
                                    href="/resume.pdf"
                                    download="Gaurav_Tiwari_CV.pdf"
                                    className="flex items-center gap-2 px-6 py-3 rounded border border-teal-500/50 bg-teal-500/10 text-teal-400 hover:bg-teal-500/20 hover:border-teal-400 hover:shadow-[0_0_18px_rgba(45,212,191,0.25)] transition-all duration-300 group"
                                >
                                    <Download size={18} className="group-hover:translate-y-0.5 transition-transform" />
                                    <span className="text-xs uppercase tracking-widest font-semibold">Download CV</span>
                                </a>
                            </motion.div>
                        </div>
                    </div>
                </div>

                {/* Right Sidebar: Active Processes / Info */}
                <div className="hidden lg:flex flex-col gap-4 col-span-1 h-full">
                    {/* Top Process Monitor */}
                    <div className="flex-[1.5] bg-black/60 backdrop-blur-xl border border-purple-500/20 rounded-lg p-5 shadow-[0_0_20px_rgba(168,85,247,0.05)] relative overflow-hidden group">
                        <div className="absolute -top-4 -right-4 p-5 opacity-10 group-hover:opacity-30 transition-opacity">
                            <Cpu size={120} className="text-purple-400" />
                        </div>
                        <h3 className="text-xs uppercase tracking-widest text-purple-400 mb-6 flex items-center gap-2 font-semibold">
                            <span>{`[01]`}</span> ACTIVE_NODES
                        </h3>
                        <div className="space-y-5 relative z-10 w-full">
                            {[
                                { name: "Data Pipeline", status: "online", load: "42%" },
                                { name: "Analytics Engine", status: "online", load: "18%" },
                                { name: "Kafka Broker", status: "syncing", load: "89%" },
                            ].map((process, i) => (
                                <div key={i} className="flex flex-col gap-1.5 border-l-2 border-white/10 pl-3 hover:border-purple-400 transition-colors cursor-default">
                                    <div className="text-[12px] text-zinc-300 uppercase tracking-wider font-bold">{process.name}</div>
                                    <div className="flex items-center justify-between text-[10px] w-full">
                                        <span className={`${process.status === 'online' ? 'text-green-400' : 'text-yellow-400'} font-semibold tracking-wider`}>
                                            ST: {process.status.toUpperCase()}
                                        </span>
                                        <span className="text-zinc-500">LOAD: {process.load}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Bottom Data Streams */}
                    <div className="flex-1 bg-black/60 backdrop-blur-xl border border-yellow-500/20 rounded-lg p-5 shadow-[0_0_20px_rgba(234,179,8,0.05)] relative overflow-hidden group">
                         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5 group-hover:opacity-20 transition-opacity pointer-events-none">
                            <Database size={100} className="text-yellow-400" />
                        </div>
                        <h3 className="text-xs uppercase tracking-widest text-yellow-500 mb-4 flex items-center gap-2 font-semibold">
                            <span>{`[02]`}</span> DATA_STREAM
                        </h3>
                        <div className="text-[11px] text-yellow-500/70 font-mono space-y-2.5 opacity-90 leading-relaxed max-h-full overflow-hidden relative z-10 break-all">
                            <div>{`> SELECT * FROM insights LIMIT 10;`}</div>
                            <div className="text-zinc-500">{`... aggregating 1.4B rows`}</div>
                            <div className="text-emerald-400 font-bold">{`... zero latency detected`}</div>
                            <div>{`> model.predict(deploy) => true`}</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="absolute bottom-[3%] left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
            >
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    className="w-4 h-6 rounded-full border border-teal-500/50 flex items-start justify-center pt-1 mt-1 bg-black/50"
                >
                    <div className="w-1 h-1.5 bg-teal-400 rounded-full" />
                </motion.div>
                <span className="text-[9px] text-teal-500/80 uppercase tracking-[0.4em] ml-1 font-semibold">Deploy</span>
            </motion.div>
        </section>
    );
}
