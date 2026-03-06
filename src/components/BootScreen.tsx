"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LINES = [
    "> BOOT SEQUENCE INITIATED...",
    "> LOADING CORE MODULES        [OK]",
    "> MOUNTING DATA PIPELINES     [OK]",
    "> SYNCING CLOUD INFRASTRUCTURE[OK]",
    "> INITIALIZING PORTFOLIO UI   [OK]",
    "> SYSTEM READY.",
];

export default function BootScreen() {
    const [visible, setVisible] = useState(false);
    const [lines, setLines] = useState<string[]>([]);
    const [done, setDone] = useState(false);

    useEffect(() => {
        // Only show once per session
        if (typeof window === "undefined") return;
        if (sessionStorage.getItem("booted")) return;
        sessionStorage.setItem("booted", "1");
        setVisible(true);

        let i = 0;
        const show = () => {
            setLines(prev => [...prev, LINES[i]]);
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

                    {/* Top-left corner brackets */}
                    <div className="absolute top-8 left-8 w-8 h-8 border-t-2 border-l-2 border-indigo-500/60" />
                    <div className="absolute top-8 right-8 w-8 h-8 border-t-2 border-r-2 border-indigo-500/60" />
                    <div className="absolute bottom-8 left-8 w-8 h-8 border-b-2 border-l-2 border-indigo-500/60" />
                    <div className="absolute bottom-8 right-8 w-8 h-8 border-b-2 border-r-2 border-indigo-500/60" />

                    {/* Header */}
                    <p className="font-mono text-xs text-indigo-400/50 mb-8 tracking-widest uppercase">
                        GAURAV TIWARI — PORTFOLIO v2.0
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

                    {done && (
                        <motion.div
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ duration: 0.4 }}
                            className="mt-8 h-0.5 w-48 bg-indigo-500 origin-left"
                        />
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    );
}
