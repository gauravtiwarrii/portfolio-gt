"use client";

import { useEffect, useRef } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { MouseEvent } from "react";

const stats = [
    { value: 5, suffix: "+", label: "Projects Built", description: "End-to-end data pipelines & apps", gradient: "from-indigo-500/20 to-violet-500/20", glow: "rgba(99,102,241,0.3)" },
    { value: 3, suffix: "+", label: "Cloud Platforms", description: "AWS, GCP, Azure experience", gradient: "from-cyan-500/20 to-blue-500/20", glow: "rgba(34,211,238,0.3)" },
    { value: 100, suffix: "+", label: "GitHub Commits", description: "Active open source contributor", gradient: "from-emerald-500/20 to-green-500/20", glow: "rgba(52,211,153,0.3)" },
    { value: 15, suffix: "+", label: "Technologies", description: "Across the modern data stack", gradient: "from-amber-500/20 to-orange-500/20", glow: "rgba(251,191,36,0.3)" },
];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
    const ref = useRef<HTMLSpanElement>(null);
    const motionValue = useMotionValue(0);
    const spring = useSpring(motionValue, { duration: 2000, bounce: 0 });
    const inView = useInView(ref, { once: true, margin: "-100px" });

    useEffect(() => {
        if (inView) motionValue.set(value);
    }, [inView, value, motionValue]);

    useEffect(() => {
        return spring.on("change", (v) => {
            if (ref.current) ref.current.textContent = Math.floor(v) + suffix;
        });
    }, [spring, suffix]);

    return <span ref={ref}>0{suffix}</span>;
}

// 3D Tilt wrapper for stat cards
function TiltStatCard({ children, className, glow }: { children: React.ReactNode; className?: string; glow: string }) {
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), { stiffness: 200, damping: 20 });
    const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), { stiffness: 200, damping: 20 });

    const handleMove = (e: MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        x.set((e.clientX - rect.left) / rect.width - 0.5);
        y.set((e.clientY - rect.top) / rect.height - 0.5);
    };
    const handleLeave = () => { x.set(0); y.set(0); };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMove}
            onMouseLeave={handleLeave}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 800 }}
            className={className}
            whileHover={{
                boxShadow: `0 20px 40px ${glow}, inset 0 0 30px ${glow}`,
            }}
            transition={{ duration: 0.3 }}
        >
            {children}
        </motion.div>
    );
}

export default function StatsSection() {
    return (
        <section className="py-16 relative">
            <div className="container mx-auto px-6 max-w-6xl">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <TiltStatCard
                                glow={stat.glow}
                                className={`relative p-6 rounded-[1.75rem] bg-white/[0.03] backdrop-blur-xl border border-white/[0.07] hover:bg-white/[0.06] hover:border-white/[0.15] transition-all duration-500 text-center overflow-hidden cursor-default`}
                            >
                                {/* Gradient overlay */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none rounded-[1.75rem]`} />

                                {/* Top shine */}
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                                {/* Animated border gradient */}
                                <div className="absolute inset-0 rounded-[1.75rem] p-px overflow-hidden pointer-events-none">
                                    <div className="absolute inset-0 rounded-[1.75rem] bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 hover:opacity-100 transition-opacity" />
                                </div>

                                <div className="relative z-10">
                                    <div className="text-4xl md:text-5xl font-bold text-white mb-1 tracking-tight" style={{ textShadow: `0 0 20px ${stat.glow}` }}>
                                        <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                                    </div>
                                    <div className="text-sm font-semibold text-zinc-300 mb-1">{stat.label}</div>
                                    <div className="text-xs text-zinc-600 leading-relaxed hidden md:block">{stat.description}</div>
                                </div>
                            </TiltStatCard>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
