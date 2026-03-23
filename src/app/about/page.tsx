"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Experience from "@/components/Experience";
import SkillsCategory from "@/components/SkillsCategory";
import SystemDesign from "@/components/SystemDesign";
import GitHubSection from "@/components/GitHubSection";
import EducationCerts from "@/components/EducationCerts";
import { Database, Shield, Activity } from "lucide-react";

export default function AboutPage() {
    return (
        <section className="min-h-screen relative overflow-hidden bg-black text-white selection:bg-teal-500/30 pt-28 pb-32 font-mono">
            {/* Ambient Tech Grid Background */}
            <div className="fixed inset-0 bg-tech-grid opacity-5 pointer-events-none mix-blend-screen mask-image:linear-gradient(to_bottom,black,transparent)"></div>

            <div className="container mx-auto px-4 sm:px-6 max-w-[1400px] relative z-10">
                {/* Hero Header */}
                <motion.div
                    className="mb-16 border-b border-white/10 pb-8 mt-12"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    <div className="flex items-center gap-2 mb-6 text-teal-400 text-sm font-bold tracking-wider">
                        <span>{`//`}</span>
                        <p className="uppercase text-zinc-400">system_profiler /identity</p>
                    </div>

                    <h1 className="text-5xl sm:text-7xl font-bold mb-6 tracking-tighter text-white font-heading">
                        User_Identity
                        <span className="text-teal-500/50 animate-pulse ml-2">_</span>
                    </h1>
                </motion.div>

                <div className="flex flex-col gap-24 md:gap-32">
                    {/* Profiler Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                        {/* Left: Bio / Data Readout */}
                        <motion.div
                            className="lg:col-span-8 flex flex-col"
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1, delay: 0.2 }}
                        >
                            <div className="relative p-8 sm:p-12 rounded-xl bg-[#050505] border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.8)] overflow-hidden flex-1 group">
                                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-teal-500 via-purple-500 to-transparent opacity-50" />

                                <div className="flex justify-between items-start mb-10 border-b border-white/5 pb-6">
                                    <h2 className="text-xl sm:text-2xl font-bold text-teal-400 flex items-center gap-3 uppercase tracking-widest">
                                        <Database size={24} className="text-teal-400" />
                                        Core_Objective
                                    </h2>
                                    <div className="flex flex-wrap items-center gap-3 px-3 py-1 border border-green-500/30 bg-green-500/10 rounded text-green-400 text-[10px] md:text-xs font-bold tracking-widest mt-2 md:mt-0">
                                        <Shield size={14} /> CLEARANCE: LEVEL_5
                                    </div>
                                </div>

                                <div className="space-y-6 text-sm sm:text-base leading-relaxed text-zinc-300 font-mono">
                                    <div className="flex gap-4">
                                        <span className="text-zinc-600 select-none font-bold">{`01`}</span>
                                        <p className="flex-1">
                                            I am a B.Tech Computer Science student with a minor in Data Science, highly focused on building <span className="text-teal-400 bg-teal-400/10 px-1 rounded border border-teal-500/30">scalable data systems</span> and resilient backend infrastructure.
                                        </p>
                                    </div>
                                    <div className="flex gap-4">
                                        <span className="text-zinc-600 select-none font-bold">{`02`}</span>
                                        <p className="flex-1">
                                            My engineering interest lies deep in designing highly-performant ETL/ELT pipelines, processing astronomically large datasets using Apache Spark, and architecting real-time streaming event systems.
                                        </p>
                                    </div>
                                    <div className="flex gap-4">
                                        <span className="text-zinc-600 select-none font-bold">{`03`}</span>
                                        <p className="flex-1 text-zinc-400 border-l-2 border-purple-500/30 pl-4 py-2 bg-white/[0.02]">
                                            I approach data engineering with a rigorous <span className="text-purple-400 font-bold uppercase tracking-wider">system-design mindset</span> — obsessing over horizontal scalability, fault-tolerance, workflow automation, and raw compute performance.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Right: ID Card */}
                        <motion.div
                            className="lg:col-span-4"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1, delay: 0.3 }}
                        >
                            <div className="relative aspect-[3/4] md:aspect-auto md:h-full overflow-hidden rounded-xl border border-teal-500/30 bg-[#0A0A0A] shadow-[0_0_30px_rgba(45,212,191,0.1)] p-4 group">
                                <div className="absolute inset-0 bg-gradient-to-b from-teal-500/5 to-black/80 z-10 pointer-events-none" />
                                
                                <div className="relative w-full h-2/3 md:h-3/4 rounded-lg overflow-hidden border border-white/10 grayscale group-hover:grayscale-0 transition-all duration-700">
                                    <Image
                                        src="/profile.png"
                                        alt="Gaurav Tiwari"
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 768px) 100vw, 30vw"
                                        priority
                                    />
                                    {/* Scanline effect over image */}
                                    <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] z-20 pointer-events-none opacity-50"></div>
                                </div>

                                {/* Biometric Data */}
                                <div className="absolute bottom-4 left-4 right-4 z-20 space-y-3 bg-black/60 backdrop-blur-md p-4 rounded border border-white/10">
                                    <div className="flex justify-between items-center text-[10px] md:text-xs tracking-widest text-zinc-400 uppercase">
                                        <span>ID: GT-9092</span>
                                        <span className="text-teal-400 flex items-center gap-2">
                                            <Activity size={12} className="animate-pulse" /> ACTIVE
                                        </span>
                                    </div>
                                    <div className="flex flex-col gap-1 text-[9px] md:text-[10px] text-zinc-500 font-bold">
                                        <div className="flex justify-between"><span>ROLE:</span><span className="text-white">DATA_ENGINEER</span></div>
                                        <div className="flex justify-between"><span>CLEARANCE:</span><span className="text-white">SYS_ADMIN</span></div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    <div className="w-full h-px bg-white/10" />

                    {/* Integrated Sub-pages components */}
                    <div className="relative z-10 space-y-32">
                        <SystemDesign />
                        <SkillsCategory />
                        <GitHubSection />
                        <Experience />
                        <EducationCerts />
                    </div>
                </div>
            </div>
        </section>
    );
}
