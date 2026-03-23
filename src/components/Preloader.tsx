"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const GREETINGS = [
    "Hello",
    "Bonjour",
    "Hola",
    "Ciao",
    "こんにちは",
    "안녕하세요",
    "Hallo",
    "नमस्ते", // Namaste
    "Gaurav Tiwari" // End on name
];

export default function Preloader() {
    const [index, setIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Only run once per session
        if (sessionStorage.getItem("hasLoaded")) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setIsLoading(false);
            return;
        }

        if (index < GREETINGS.length - 1) {
            // Cycle through greetings
            const timer = setTimeout(() => {
                setIndex(prev => prev + 1);
            }, index === 0 ? 1000 : 150); // Hold the first greeting a bit longer, then cycle fast
            
            return () => clearTimeout(timer);
        } else {
            // Once we reach the end (the name), wait a bit then slide up
            const exitTimer = setTimeout(() => {
                setIsLoading(false);
                sessionStorage.setItem("hasLoaded", "true");
            }, 800);
            
            return () => clearTimeout(exitTimer);
        }
    }, [index]);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    initial={{ y: 0 }}
                    exit={{ 
                        y: "-100%", 
                        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
                    }}
                    className="fixed inset-0 z-[99999] flex items-center justify-center bg-black"
                >
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.2 }}
                            className="flex items-center gap-4 text-white"
                        >
                            {/* Dot indicator */}
                            <motion.div 
                                className="w-2.5 h-2.5 bg-white rounded-full bg-gradient-to-r from-purple-400 to-teal-400"
                            />
                            
                            <h2 
                                className="font-bold tracking-tight text-3xl sm:text-5xl"
                                style={{
                                    fontFamily: "var(--font-outfit)",
                                    fontSize: "clamp(2rem, 5vw, 4rem)"
                                }}
                            >
                                {GREETINGS[index]}
                            </h2>
                        </motion.div>
                    </AnimatePresence>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
