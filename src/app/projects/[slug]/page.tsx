
"use client";

import React, { use } from "react";
import { projects } from "@/data/projects";
import { ArrowLeft, Github, ExternalLink, Activity, Server, Database, Code, Zap, CheckCircle2, Terminal } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { notFound } from "next/navigation";


interface PageProps {
    params: Promise<{ slug: string }>;
}

const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { delay, duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
});

export default function ProjectDetails({ params }: PageProps) {
    const resolvedParams = use(params);
    const project = projects.find((p) => p.slug === resolvedParams.slug);
    if (!project) notFound();

    const Icon = project.icon as React.ComponentType<{ size?: number; className?: string }>;

    return (
        <main className="min-h-screen text-white relative">
            {/* Top accent line */}
            <div className="fixed top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent z-50" />

            <div className="max-w-7xl mx-auto px-6 pb-24">
                {/* Back Navigation */}
                <motion.div {...fadeUp(0)} className="pt-8 mb-10">
                    <Link
                        href="/projects"
                        className="inline-flex items-center gap-2 text-zinc-500 hover:text-white transition-colors text-sm font-mono group"
                    >
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                        <span>cd ../projects</span>
                    </Link>
                </motion.div>

                {/* ── HERO HEADER ─────────────────────────────────────────── */}
                <header className="mb-16 grid grid-cols-1 lg:grid-cols-3 gap-10">
                    {/* Left: title block */}
                    <motion.div className="lg:col-span-2" {...fadeUp(0.1)}>
                        <div className="flex items-center gap-3 mb-6 flex-wrap">
                            <div className="p-3 bg-white/[0.06] rounded-2xl border border-white/[0.08] backdrop-blur-xl">
                                <Icon size={28} className="text-indigo-400" />
                            </div>
                            <span className="px-3 py-1 rounded-full text-[11px] font-mono tracking-widest uppercase bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                                {project.category}
                            </span>
                            <div className={`px-3 py-1 rounded-full text-[11px] font-mono border flex items-center gap-2 ${project.status === "Live"
                                ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/20"
                                : project.status === "Building"
                                    ? "bg-amber-500/10 text-amber-300 border-amber-500/20"
                                    : "bg-zinc-500/10 text-zinc-400 border-zinc-500/20"
                                }`}>
                                <span className={`w-1.5 h-1.5 rounded-full ${project.status === "Live" ? "bg-emerald-400 animate-pulse" :
                                    project.status === "Building" ? "bg-amber-400" : "bg-zinc-400"
                                    }`} />
                                {project.status}
                            </div>
                        </div>

                        <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight bg-clip-text text-transparent bg-gradient-to-br from-white via-zinc-200 to-zinc-500 leading-tight">
                            {project.title}
                        </h1>
                        <p className="text-xl text-zinc-400 mb-8 font-light leading-relaxed">
                            {project.subtitle}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-6">
                            {project.tags.map((tag) => (
                                <span key={tag} className="px-3 py-1 bg-white/[0.04] border border-white/[0.08] rounded-full text-xs text-zinc-400 font-mono hover:border-white/20 hover:text-zinc-200 transition-all">
                                    {tag}
                                </span>
                            ))}
                        </div>

                        <div className="flex gap-3">
                            {project.github && (
                                <a
                                    href={project.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full font-semibold text-sm hover:bg-zinc-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.15)]"
                                >
                                    <Github size={16} />
                                    View Code
                                </a>
                            )}
                            {project.demo && (
                                <a
                                    href={project.demo}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-white/[0.06] border border-white/[0.10] rounded-full text-sm text-zinc-300 hover:bg-white/10 hover:text-white transition-all backdrop-blur-xl"
                                >
                                    <ExternalLink size={16} />
                                    Live Demo
                                </a>
                            )}
                        </div>
                    </motion.div>

                    {/* Right: Data provenance + Impact */}
                    <motion.div className="lg:col-span-1 space-y-4" {...fadeUp(0.2)}>
                        {project.dataNote && (
                            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.07] backdrop-blur-xl">
                                <div className="flex items-center gap-2 mb-2">
                                    <Activity size={16} className="text-amber-400" />
                                    <p className="text-sm font-semibold text-zinc-200">Data provenance</p>
                                </div>
                                <p className="text-xs text-zinc-500 leading-relaxed">{project.dataNote}</p>
                            </div>
                        )}

                        {project.details.performance.length > 0 && (
                            <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.07] backdrop-blur-xl">
                                <div className="flex items-center gap-2 mb-5">
                                    <Zap size={16} className="text-emerald-400" />
                                    <h3 className="text-[11px] font-mono uppercase tracking-[0.2em] text-emerald-400">Impact</h3>
                                </div>
                                <ul className="space-y-3">
                                    {project.details.performance.map((stat, i) => (
                                        <li key={i} className="flex items-start gap-3 text-sm text-zinc-300 border-l-2 border-emerald-500/30 pl-3">
                                            {stat}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </motion.div>
                </header>

                {/* ── MAIN CONTENT GRID ────────────────────────────────────── */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

                    {/* Left: content */}
                    <div className="lg:col-span-8 space-y-10">

                        {/* Overview */}
                        <motion.section {...fadeUp(0.25)} className="p-8 rounded-2xl bg-white/[0.025] border border-white/[0.07] backdrop-blur-xl">
                            <h2 className="text-lg font-bold mb-4 text-zinc-100 flex items-center gap-2">
                                <span className="text-zinc-600 font-mono text-sm">01.</span> Overview
                            </h2>
                            <p className="text-zinc-400 leading-relaxed text-base">{project.description}</p>
                            {project.details.solution && (
                                <p className="text-zinc-400 leading-relaxed text-base mt-3">{project.details.solution}</p>
                            )}
                        </motion.section>

                        {/* Problem Statement */}
                        <motion.section {...fadeUp(0.3)} className="p-8 rounded-2xl bg-white/[0.025] border border-white/[0.07] backdrop-blur-xl">
                            <h2 className="text-lg font-bold mb-4 text-zinc-100 flex items-center gap-2">
                                <span className="text-zinc-600 font-mono text-sm">02.</span> Problem Statement
                            </h2>
                            <p className="text-zinc-400 leading-relaxed text-base">{project.problem}</p>
                            {project.details.challenge !== project.problem && (
                                <p className="text-zinc-500 leading-relaxed text-sm mt-3 pl-4 border-l border-white/10">
                                    {project.details.challenge}
                                </p>
                            )}
                        </motion.section>

                        {/* Architecture */}
                        <motion.section {...fadeUp(0.35)} className="p-8 rounded-2xl bg-white/[0.025] border border-white/[0.07] backdrop-blur-xl">
                            <h2 className="text-lg font-bold mb-6 text-zinc-100 flex items-center gap-2">
                                <span className="text-zinc-600 font-mono text-sm">03.</span> Architecture
                            </h2>
                            <div className="relative rounded-xl bg-black/40 border border-white/[0.06] p-8 overflow-hidden">
                                {/* Grid bg */}
                                <div className="absolute inset-0 opacity-[0.04]"
                                    style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.3) 1px, transparent 1px),linear-gradient(90deg,rgba(255,255,255,.3) 1px,transparent 1px)", backgroundSize: "24px 24px" }} />
                                <div className="relative z-10 flex flex-col items-center gap-4">
                                    <div className="p-4 bg-indigo-500/10 rounded-2xl border border-indigo-500/20">
                                        <Server size={28} className="text-indigo-400" />
                                    </div>
                                    <p className="text-sm text-zinc-400 font-mono text-center max-w-lg leading-relaxed">
                                        {project.details.architecture.description}
                                    </p>
                                </div>
                            </div>
                        </motion.section>

                        {/* Engineering detail */}
                        {project.highlights.length > 0 && (
                            <motion.section {...fadeUp(0.4)} className="p-8 rounded-2xl bg-white/[0.025] border border-white/[0.07] backdrop-blur-xl">
                                <h2 className="text-lg font-bold mb-2 text-zinc-100 flex items-center gap-2">
                                    <span className="text-zinc-600 font-mono text-sm">04.</span> Engineering Detail
                                </h2>
                                <p className="text-zinc-500 text-sm mb-5">The parts of this build that required decisions.</p>
                                <ul className="space-y-3">
                                    {project.highlights.map((item, i) => (
                                        <li key={i} className="flex items-start gap-3 text-sm text-zinc-300">
                                            <Terminal size={13} className="text-zinc-600 mt-1 shrink-0" />
                                            <span className="leading-relaxed">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </motion.section>
                        )}

                        {/* Key Features */}
                        <motion.section {...fadeUp(0.45)}>
                            <h2 className="text-lg font-bold mb-6 text-zinc-100 flex items-center gap-2">
                                <span className="text-zinc-600 font-mono text-sm">05.</span> Key Features
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {project.details.features.map((feature, i) => (
                                    <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.025] border border-white/[0.07] hover:bg-white/[0.05] hover:border-white/[0.12] transition-all group">
                                        <CheckCircle2 size={16} className="text-indigo-400 shrink-0 mt-0.5 group-hover:text-indigo-300 transition-colors" />
                                        <p className="text-zinc-400 text-sm leading-relaxed group-hover:text-zinc-300 transition-colors">{feature}</p>
                                    </div>
                                ))}
                            </div>
                        </motion.section>
                    </div>

                    {/* Right: Sticky tech stack */}
                    <div className="lg:col-span-4">
                        <motion.div {...fadeUp(0.3)} className="sticky top-28">
                            <div className="p-6 rounded-2xl bg-white/[0.025] border border-white/[0.07] backdrop-blur-xl">
                                <div className="flex items-center gap-2 mb-6">
                                    <Database size={16} className="text-amber-400" />
                                    <h3 className="text-sm font-bold text-zinc-100 uppercase tracking-widest font-mono">Tech Stack</h3>
                                </div>
                                <div className="space-y-5">
                                    {project.details.techStackJustification.map((item, i) => (
                                        <div key={i} className="group">
                                            <div className="flex items-center gap-2 mb-1.5">
                                                <Code size={12} className="text-zinc-600" />
                                                <h4 className="text-sm font-semibold text-zinc-200">{item.tech}</h4>
                                            </div>
                                            <p className="text-xs text-zinc-500 leading-relaxed pl-4 border-l border-amber-500/20 group-hover:border-amber-500/50 group-hover:text-zinc-400 transition-all">
                                                {item.reason}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </main>
    );
}
