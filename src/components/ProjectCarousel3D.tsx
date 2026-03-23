"use client";

import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, MouseEvent, useEffect, useCallback } from "react";
import { projects } from "@/data/projects";
import { ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

function CarouselCard({
    project,
    index,
    activeIndex,
    total,
}: {
    project: (typeof projects)[0];
    index: number;
    activeIndex: number;
    total: number;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), { stiffness: 200, damping: 20 });
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), { stiffness: 200, damping: 20 });

    const handleMove = (e: MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
        mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
    };
    const handleLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    // Calculate position relative to active
    let diff = index - activeIndex;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;

    const isActive = diff === 0;
    const isAdjacent = Math.abs(diff) === 1;
    const isVisible = Math.abs(diff) <= 2;

    if (!isVisible) return null;

    const Icon = project.icon as React.ComponentType<{ size: number; className?: string }>;

    return (
        <motion.div
            ref={ref}
            onMouseMove={isActive ? handleMove : undefined}
            onMouseLeave={isActive ? handleLeave : undefined}
            style={isActive ? { rotateX, rotateY, transformStyle: "preserve-3d" as const } : {}}
            animate={{
                x: diff * 320,
                scale: isActive ? 1 : isAdjacent ? 0.85 : 0.7,
                opacity: isActive ? 1 : isAdjacent ? 0.6 : 0.3,
                rotateY: diff * -12,
                z: isActive ? 0 : -100,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30, mass: 0.8 }}
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[280px] sm:w-[300px]"
        >
            <Link href={`/projects/${project.slug}`} className="block">
                <div
                    className={`relative p-6 rounded-[2rem] backdrop-blur-2xl border overflow-hidden transition-all duration-500
                    ${isActive
                            ? "bg-white/[0.06] border-white/[0.15] shadow-[0_20px_60px_rgba(99,102,241,0.15)]"
                            : "bg-white/[0.03] border-white/[0.07] pointer-events-none"
                        }`}
                >
                    {/* Animated top border */}
                    <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-indigo-400/50 to-transparent" />

                    {/* Gradient background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 pointer-events-none" />

                    {/* Icon header */}
                    <div className="relative h-24 w-full flex items-center justify-center mb-4 rounded-2xl bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-white/[0.05]">
                        <div className="absolute inset-0 opacity-[0.1]" style={{
                            backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.8) 1px, transparent 0)',
                            backgroundSize: '20px 20px'
                        }} />
                        <Icon size={48} className="text-white/20" />
                    </div>

                    {/* Content */}
                    <div className="relative z-10">
                        <div className="flex items-start justify-between mb-2">
                            <h3 className="text-lg font-bold text-zinc-100 tracking-tight leading-tight">
                                {project.title}
                            </h3>
                            {isActive && <ExternalLink size={14} className="text-zinc-500 mt-1 shrink-0 ml-2" />}
                        </div>
                        <p className="text-sm text-zinc-500 leading-relaxed mb-4 line-clamp-2">
                            {project.description}
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                            {project.tags.slice(0, 3).map((tag) => (
                                <span
                                    key={tag}
                                    className="text-[10px] px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-400 font-mono"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}

export default function ProjectCarousel3D() {
    const featured = projects.filter((p) => p.featured);
    const [activeIndex, setActiveIndex] = useState(0);
    const total = featured.length;

    const next = useCallback(() => setActiveIndex((i) => (i + 1) % total), [total]);
    const prev = useCallback(() => setActiveIndex((i) => (i - 1 + total) % total), [total]);

    // Auto-rotate
    useEffect(() => {
        const id = setInterval(next, 5000);
        return () => clearInterval(id);
    }, [next]);

    // Keyboard navigation
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === "ArrowRight") next();
            if (e.key === "ArrowLeft") prev();
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [next, prev]);

    return (
        <div className="relative py-8 overflow-hidden">
            {/* Carousel container */}
            <div className="relative h-[380px] sm:h-[400px] flex items-center justify-center perspective-[1200px]">
                <AnimatePresence mode="popLayout">
                    {featured.map((project, i) => (
                        <CarouselCard
                            key={project.slug}
                            project={project}
                            index={i}
                            activeIndex={activeIndex}
                            total={total}
                        />
                    ))}
                </AnimatePresence>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-6 mt-6">
                <button
                    onClick={prev}
                    className="p-3 rounded-full bg-white/5 border border-white/10 text-zinc-400 hover:text-white hover:bg-white/10 transition-all"
                    aria-label="Previous project"
                >
                    <ChevronLeft size={20} />
                </button>

                {/* Dots */}
                <div className="flex gap-2">
                    {featured.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setActiveIndex(i)}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${i === activeIndex
                                    ? "bg-indigo-400 w-6"
                                    : "bg-white/20 hover:bg-white/40"
                                }`}
                            aria-label={`Go to project ${i + 1}`}
                        />
                    ))}
                </div>

                <button
                    onClick={next}
                    className="p-3 rounded-full bg-white/5 border border-white/10 text-zinc-400 hover:text-white hover:bg-white/10 transition-all"
                    aria-label="Next project"
                >
                    <ChevronRight size={20} />
                </button>
            </div>
        </div>
    );
}
