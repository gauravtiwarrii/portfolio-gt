"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [hovering, setHovering] = useState(false);
    const [clicking, setClicking] = useState(false);

    useEffect(() => {
        const updateCursor = (e: MouseEvent) => {
            setPosition({ x: e.clientX, y: e.clientY });
        };

        const handleEnter = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.closest('a, button, [role="button"], input, textarea, select')) {
                setHovering(true);
            }
        };

        const handleLeave = () => setHovering(false);
        const handleMouseDown = () => setClicking(true);
        const handleMouseUp = () => setClicking(false);

        window.addEventListener('mousemove', updateCursor);
        document.addEventListener('mouseover', handleEnter);
        document.addEventListener('mouseout', handleLeave);
        document.addEventListener('mousedown', handleMouseDown);
        document.addEventListener('mouseup', handleMouseUp);

        return () => {
            window.removeEventListener('mousemove', updateCursor);
            document.removeEventListener('mouseover', handleEnter);
            document.removeEventListener('mouseout', handleLeave);
            document.removeEventListener('mousedown', handleMouseDown);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, []);

    return (
        <>
            {/* Small precise dot */}
            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full bg-white mix-blend-difference"
                animate={{
                    x: position.x - 4,
                    y: position.y - 4,
                    width: clicking ? 6 : 8,
                    height: clicking ? 6 : 8,
                    opacity: 1,
                }}
                transition={{ type: 'spring', stiffness: 900, damping: 35, mass: 0.2 }}
            />

            {/* Outer halo ring — lags behind for fluid feel */}
            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full border border-white/50 mix-blend-difference"
                animate={{
                    x: position.x - (hovering ? 24 : 16),
                    y: position.y - (hovering ? 24 : 16),
                    width: clicking ? 24 : hovering ? 48 : 32,
                    height: clicking ? 24 : hovering ? 48 : 32,
                    opacity: hovering ? 0.8 : 0.4,
                    backgroundColor: hovering ? 'rgba(255,255,255,0.1)' : 'transparent',
                }}
                transition={{ type: 'spring', stiffness: 150, damping: 20, mass: 0.5 }}
            />
        </>
    );
}

