"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";

const stats = [
    { value: 5, suffix: "+", label: "Projects Built", description: "End-to-end data pipelines & apps" },
    { value: 3, suffix: "+", label: "Cloud Platforms", description: "AWS, GCP, Azure experience" },
    { value: 100, suffix: "+", label: "GitHub Commits", description: "Active open source contributor" },
    { value: 15, suffix: "+", label: "Technologies", description: "Across the modern data stack" },
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
                            className="group relative p-6 rounded-[1.75rem] bg-white/[0.03] backdrop-blur-xl border border-white/[0.07] hover:bg-white/[0.06] hover:border-white/[0.12] transition-all duration-500 text-center overflow-hidden"
                        >
                            {/* Top shine */}
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                            <div className="text-4xl md:text-5xl font-bold text-white mb-1 tracking-tight">
                                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                            </div>
                            <div className="text-sm font-semibold text-zinc-300 mb-1">{stat.label}</div>
                            <div className="text-xs text-zinc-600 leading-relaxed hidden md:block">{stat.description}</div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
