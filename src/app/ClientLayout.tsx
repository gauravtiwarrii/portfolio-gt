"use client";

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import CustomCursor from "@/components/CustomCursor";
import NebulaBackground from "@/components/NebulaBackground";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Lenis from 'lenis';
import CommandPalette from "@/components/CommandPalette";
import ReadingProgress from "@/components/ReadingProgress";
import BootScreen from "@/components/BootScreen";

export default function ClientLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const pathname = usePathname();

    useEffect(() => {
        const lenis = new Lenis();

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
        };
    }, []);

    // Only show reading progress explicitly on the blog pages if desired
    // Or we can leave it global for all long-scrolling pages.
    const isBlogRoute = pathname?.startsWith('/blog/');

    return (
        <>
            <BootScreen />
            <CustomCursor />
            <NebulaBackground />
            <Navbar />

            {/* Global Features */}
            <CommandPalette />
            {!isBlogRoute && <ReadingProgress />} {/* Display scroll progress globally if not already handled inside a specific blog post */}

            <AnimatePresence mode="wait">
                <motion.main
                    key={pathname}
                    initial={{ opacity: 0, scale: 0.98, filter: "blur(4px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, scale: 0.96, filter: "blur(8px)" }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    style={{ minHeight: '100vh', paddingTop: '80px' }}
                >
                    {children}
                </motion.main>
            </AnimatePresence>

            <Footer />
        </>
    );
}
