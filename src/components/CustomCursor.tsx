"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CustomCursor() {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [hovering, setHovering] = useState(false);
    const [clicking, setClicking] = useState(false);
    const [cursorText, setCursorText] = useState<string | null>(null);
    const [isTouch, setIsTouch] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsTouch(window.matchMedia("(pointer: coarse)").matches);
    }, []);

    useEffect(() => {
        if (isTouch) return;
        const updateCursor = (e: MouseEvent) => {
            setPosition({ x: e.clientX, y: e.clientY });
        };

        const handleEnter = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            
            // Check for explicit custom text trigger (e.g. Projects row)
            const textElement = target.closest('[data-cursor-text]') as HTMLElement;
            if (textElement) {
                setHovering(true);
                setCursorText(textElement.getAttribute('data-cursor-text'));
                return;
            }

            // Normal hover state for links/buttons
            if (target.closest('a, button, [role="button"], input, textarea, select')) {
                setHovering(true);
                setCursorText(null);
            }
        };

        const handleLeave = () => {
            setHovering(false);
            setCursorText(null);
        };
        
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
    }, [isTouch]);

    return isTouch ? null : (
        <>
            {/* Inner precise dot */}
            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full mix-blend-difference"
                animate={{
                    x: position.x - 4,
                    y: position.y - 4,
                    width: clicking ? 6 : 8,
                    height: clicking ? 6 : 8,
                    opacity: cursorText ? 0 : 1, // Hide dot when showing text
                    backgroundColor: "rgba(255,255,255,1)"
                }}
                transition={{ type: 'spring', stiffness: 900, damping: 35, mass: 0.2 }}
            />

            {/* Outer ring / Text Container */}
            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full flex items-center justify-center overflow-hidden"
                animate={{
                    x: position.x - (cursorText ? 40 : hovering ? 24 : 16),
                    y: position.y - (cursorText ? 40 : hovering ? 24 : 16),
                    width: cursorText ? 80 : clicking ? 24 : hovering ? 48 : 32,
                    height: cursorText ? 80 : clicking ? 24 : hovering ? 48 : 32,
                    opacity: cursorText ? 1 : hovering ? 0.8 : 0.4,
                    backgroundColor: cursorText ? 'rgba(255, 255, 255, 1)' : hovering ? 'rgba(255,255,255,0.1)' : 'transparent',
                    border: cursorText ? '1px solid transparent' : '1px solid rgba(255,255,255,0.5)',
                    mixBlendMode: cursorText ? 'normal' : 'difference'
                }}
                transition={{ type: 'spring', stiffness: 150, damping: 20, mass: 0.5 }}
            >
                <AnimatePresence>
                    {cursorText && (
                        <motion.span
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.5 }}
                            transition={{ duration: 0.2 }}
                            className="text-black text-[11px] font-bold tracking-[0.15em] uppercase"
                        >
                            {cursorText}
                        </motion.span>
                    )}
                </AnimatePresence>
            </motion.div>
        </>
    );
}
