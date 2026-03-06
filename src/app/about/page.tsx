"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Experience from "@/components/Experience";
import GlassCard from "@/components/GlassCard";
import SkillsCategory from "@/components/SkillsCategory";
import SystemDesign from "@/components/SystemDesign";
import GitHubSection from "@/components/GitHubSection";
import { Terminal, Code2, Database } from "lucide-react";

export default function AboutPage() {
    return (
        <section className="min-h-screen relative overflow-hidden text-white selection:bg-indigo-500/30 pt-24 pb-32">

            {/* Advanced Ambient Background */}
            <div className="fixed inset-0 pointer-events-none z-[-2]">
                <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-indigo-900/10 blur-[150px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-emerald-900/10 blur-[150px]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[20vw] bg-zinc-800/20 blur-[120px] rounded-[100%]" />
            </div>

            {/* Subtle Grid Pattern Overlay */}
            <div className="fixed inset-0 pointer-events-none z-[-1] opacity-20"
                style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

            <div className="container mx-auto px-4 sm:px-6 max-w-6xl relative z-10">
                {/* Hero Header */}
                <motion.div
                    className="text-center mb-20 md:mb-32 mt-12"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8 shadow-[0_4px_24px_rgba(0,0,0,0.2)]">
                        <Terminal size={14} className="text-indigo-400" />
                        <span className="text-sm font-mono tracking-wider text-zinc-300 uppercase">System Identity</span>
                    </div>

                    <h1 className="text-5xl sm:text-7xl font-extrabold mb-6 tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-zinc-200 to-zinc-500 drop-shadow-sm">
                        About Me
                    </h1>
                    <p className="text-xl md:text-2xl text-zinc-400 font-medium tracking-tight">
                        Data Engineer <span className="text-indigo-500 mx-2">/</span> Builder <span className="text-emerald-500 mx-2">/</span> Storyteller
                    </p>
                </motion.div>

                <div className="flex flex-col gap-24 md:gap-32">

                    {/* Profile & Bio Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

                        {/* Left: Profile Photo (High Tech Frame) */}
                        <motion.div
                            className="lg:col-span-5 relative group w-full max-w-md mx-auto lg:max-w-none"
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        >
                            {/* Animated Inner Glow */}
                            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-500 rounded-[2.5rem] blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-300" />

                            <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#09090b] shadow-2xl p-2">
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 z-10 pointer-events-none rounded-[2rem]" />
                                <div className="relative w-full h-full rounded-[2rem] overflow-hidden">
                                    <Image
                                        src="/profile.png"
                                        alt="Gaurav Tiwari"
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                        sizes="(max-width: 768px) 100vw, 40vw"
                                        priority
                                    />
                                </div>

                                {/* Overlay Metadata */}
                                <div className="absolute bottom-6 left-6 z-20 flex items-center gap-3">
                                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)] animate-pulse" />
                                    <span className="text-xs font-mono uppercase tracking-widest text-white/80 backdrop-blur-md bg-black/30 px-3 py-1.5 rounded-full border border-white/10">
                                        Open to Opportunities
                                    </span>
                                </div>
                            </div>
                        </motion.div>

                        {/* Right: Bio Text */}
                        <motion.div
                            className="lg:col-span-7"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <div className="relative p-8 sm:p-12 rounded-[2.5rem] bg-[#121214]/60 backdrop-blur-3xl border border-white/[0.08] shadow-[0_20px_60px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.08)] overflow-hidden">
                                {/* Ambient inner gradient */}
                                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />

                                <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-white flex items-center gap-3">
                                    <Database size={24} className="text-indigo-400" />
                                    The Objective
                                </h2>

                                <div className="space-y-6 text-lg sm:text-xl leading-relaxed text-zinc-300 font-medium">
                                    <p>
                                        I am a B.Tech Computer Science student with a minor in Data Science, highly focused on building <span className="text-white hover:text-indigo-400 transition-colors">scalable data systems</span> and resilient backend infrastructure.
                                    </p>
                                    <p>
                                        My engineering interest lies deep in designing highly-performant ETL/ELT pipelines, processing astronomically large datasets using Apache Spark, and architecting real-time streaming event systems.
                                    </p>
                                    <p>
                                        I approach data engineering with a rigorous <span className="text-emerald-400">system-design mindset</span> — obsessing over horizontal scalability, fault-tolerance, workflow automation, and raw compute performance.
                                    </p>
                                </div>

                                <div className="mt-10 pt-8 border-t border-white/10 flex items-center gap-4">
                                    <Code2 size={20} className="text-zinc-500" />
                                    <p className="font-mono text-sm text-zinc-400 uppercase tracking-wider">
                                        Goal: Architect Distributed Data Systems
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                    {/* Integrated Sub-pages components, with vertical spacing adjusted */}
                    <div className="relative z-10 space-y-32">
                        <SystemDesign />
                        <SkillsCategory />
                        <GitHubSection />
                        <Experience />
                    </div>
                </div>
            </div>
        </section>
    );
}
