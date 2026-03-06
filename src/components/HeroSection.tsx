"use client";

import Scene3D from "./Scene3D";
import { motion } from "framer-motion";
import styles from "./HeroSection.module.css";
import { Github, Linkedin, FileText, Mail, ArrowRight, ChevronDown, Terminal } from "lucide-react";
import MagneticButton from "./MagneticButton";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import TypewriterRole from "./TypewriterRole";

function LiveClock() {
    const [time, setTime] = useState("");
    useEffect(() => {
        const update = () => {
            const now = new Date();
            const utc = now.toUTCString().replace("GMT", "UTC");
            setTime(utc);
        };
        update();
        const id = setInterval(update, 1000);
        return () => clearInterval(id);
    }, []);
    return (
        <span className="font-mono text-[10px] text-zinc-600 tracking-wider select-none">{time}</span>
    );
}

function GlitchTitle() {
    const [glitch, setGlitch] = useState(false);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const trigger = () => {
        setGlitch(true);
        timerRef.current = setTimeout(() => setGlitch(false), 400);
    };
    useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, []);

    return (
        <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8, type: "spring", bounce: 0.4 }}
            onMouseEnter={trigger}
            className="relative text-5xl md:text-7xl lg:text-8xl font-bold mb-8 tracking-tighter leading-tight cursor-default select-none"
            style={{ color: "transparent" }}
        >
            {/* Main layer */}
            <span
                className="absolute inset-0 bg-clip-text text-transparent bg-gradient-to-br from-white via-zinc-200 to-zinc-600"
                style={glitch ? {
                    clipPath: "inset(30% 0 50% 0)",
                    transform: "translate(-4px, 1px)",
                    filter: "hue-rotate(180deg)",
                    opacity: 0.9,
                } : {}}
            >
                Gaurav Tiwari
            </span>
            {/* Glitch layers */}
            {glitch && (
                <>
                    <span className="absolute inset-0 bg-clip-text text-transparent bg-gradient-to-br from-cyan-400 to-cyan-200"
                        style={{ clipPath: "inset(10% 0 60% 0)", transform: "translate(3px, -2px)", opacity: 0.7 }}>
                        Gaurav Tiwari
                    </span>
                    <span className="absolute inset-0 bg-clip-text text-transparent bg-gradient-to-br from-fuchsia-400 to-pink-200"
                        style={{ clipPath: "inset(60% 0 10% 0)", transform: "translate(-3px, 2px)", opacity: 0.7 }}>
                        Gaurav Tiwari
                    </span>
                </>
            )}
            {/* Spacer to hold layout */}
            <span className="invisible">Gaurav Tiwari</span>
        </motion.h1>
    );
}

export default function HeroSection() {
    const [mounted, setMounted] = useState(false);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    useEffect(() => { setMounted(true); }, []);

    return (
        <section className={`${styles.hero} relative min-h-screen overflow-hidden`}>
            <div className="absolute inset-0 z-0">
                <Scene3D />
            </div>

            {mounted && (
                <div className={`${styles.content} relative z-10 w-full max-w-5xl mx-auto px-6 flex flex-col items-center justify-center min-h-screen`}>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="w-full relative p-8 md:p-16 rounded-[3rem] bg-white/[0.02] backdrop-blur-3xl border border-white/[0.05] shadow-[0_20px_60px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.1)] flex flex-col items-center text-center overflow-hidden"
                    >
                        {/* Scan-line overlay */}
                        <div className="absolute inset-0 pointer-events-none rounded-[3rem] overflow-hidden opacity-[0.04]"
                            style={{
                                backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,1) 2px, rgba(255,255,255,1) 4px)",
                                backgroundSize: "100% 4px",
                            }}
                        />

                        {/* Corner brackets */}
                        <div className="absolute top-6 left-6 w-5 h-5 border-t border-l border-white/20" />
                        <div className="absolute top-6 right-6 w-5 h-5 border-t border-r border-white/20" />
                        <div className="absolute bottom-6 left-6 w-5 h-5 border-b border-l border-white/20" />
                        <div className="absolute bottom-6 right-6 w-5 h-5 border-b border-r border-white/20" />

                        {/* Top Bar: Clock & Hidden Terminal */}
                        <div className="absolute top-5 left-8 right-8 flex justify-between items-center w-[calc(100%-4rem)]">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1.4 }}
                            >
                                <LiveClock />
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1.6 }}
                            >
                                <Link
                                    href="/terminal"
                                    className="text-zinc-700 hover:text-emerald-500 transition-colors opacity-50 hover:opacity-100"
                                    title="System Terminal Access"
                                >
                                    <Terminal size={14} />
                                </Link>
                            </motion.div>
                        </div>

                        {/* Ambient Inner Glow */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[200px] bg-indigo-500/20 rounded-full blur-[100px] pointer-events-none" />

                        {/* Status Badge */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
                            className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-black/60 backdrop-blur-xl border border-white/10 shadow-2xl mb-12"
                        >
                            <span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
                            </span>
                            <span className="text-sm font-medium text-zinc-300 tracking-wide">Available for New Projects</span>
                        </motion.div>

                        {/* Typewriter role */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                            className="mb-6"
                        >
                            <TypewriterRole />
                        </motion.div>

                        {/* Glitch name */}
                        <GlitchTitle />

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.7, duration: 0.8 }}
                            className="text-zinc-400 text-lg md:text-xl lg:text-2xl max-w-2xl mx-auto leading-relaxed mb-12 font-medium"
                        >
                            Turning raw data into strategic assets with robust Engineering, Data Warehousing, and Real-time Processing.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.9, duration: 0.5 }}
                            className="flex flex-col md:flex-row items-center justify-center gap-6 w-full"
                        >
                            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                                <Link href="/projects/retail-etl-pipeline" className="w-full sm:w-auto">
                                    <MagneticButton className="w-full group relative px-8 py-3.5 bg-zinc-100 text-zinc-900 hover:bg-white rounded-full font-semibold flex items-center justify-center gap-2 overflow-hidden shadow-[0_0_40px_rgba(255,255,255,0.2)] transition-all">
                                        <span className="relative z-10">View Work</span>
                                        <ArrowRight className="relative z-10 group-hover:translate-x-1 transition-transform" size={18} strokeWidth={2.5} />
                                    </MagneticButton>
                                </Link>
                                <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                                    <MagneticButton className="w-full px-8 py-3.5 border border-white/10 text-zinc-300 rounded-full font-medium hover:bg-white/10 hover:text-white transition-colors backdrop-blur-md flex items-center justify-center gap-2">
                                        <FileText size={18} />
                                        <span>Resume</span>
                                    </MagneticButton>
                                </a>
                            </div>

                            <div className="hidden md:block w-px h-8 bg-gradient-to-b from-transparent via-white/20 to-transparent mx-2" />

                            <div className="flex gap-4">
                                <a href="https://github.com/gauravtiwarrii" target="_blank" rel="noopener noreferrer">
                                    <MagneticButton className="p-3.5 bg-white/5 border border-white/10 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-all shadow-sm">
                                        <Github size={20} />
                                    </MagneticButton>
                                </a>
                                <a href="https://linkedin.com/in/gauravtiwarrii" target="_blank" rel="noopener noreferrer">
                                    <MagneticButton className="p-3.5 bg-white/5 border border-white/10 rounded-full text-zinc-400 hover:text-[#0A66C2] hover:bg-white/10 transition-all shadow-sm">
                                        <Linkedin size={20} />
                                    </MagneticButton>
                                </a>
                                <Link href="/contact">
                                    <MagneticButton className="p-3.5 bg-white/5 border border-white/10 rounded-full text-zinc-400 hover:text-emerald-400 hover:bg-white/10 transition-all shadow-sm">
                                        <Mail size={20} />
                                    </MagneticButton>
                                </Link>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Scroll Indicator */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.5, duration: 1 }}
                        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-zinc-500"
                    >
                        <span className="text-xs font-medium tracking-widest uppercase">Scroll</span>
                        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}>
                            <ChevronDown size={20} />
                        </motion.div>
                    </motion.div>
                </div>
            )}
        </section>
    );
}
