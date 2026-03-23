"use client";

import { motion } from "framer-motion";
import { projects } from "@/data/projects";
import Link from "next/link";
import { ArrowUpRight, Terminal, Server, Database, Github } from "lucide-react";

export default function ProjectsPage() {
    return (
        <section className="min-h-screen pt-28 pb-32 px-4 sm:px-6 bg-black font-mono relative overflow-hidden selection:bg-teal-500/30 text-white">
            {/* Ambient Tech Grid Background */}
            <div className="fixed inset-0 bg-tech-grid opacity-5 pointer-events-none mix-blend-screen mask-image:linear-gradient(to_bottom,black,transparent)"></div>
            
            <div className="max-w-[1400px] mx-auto relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/10"
                >
                    <div>
                        <div className="flex items-center gap-2 mb-4 text-teal-400 text-sm font-bold tracking-wider">
                            <span>{`//`}</span>
                            <p className="text-zinc-400 uppercase">
                                system_directory ~/projects
                            </p>
                        </div>
                        <h1 className="font-bold tracking-tight text-white font-heading" style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}>
                            <span className="text-teal-500/40 mr-2">{`System`}</span>
                            Architecture
                        </h1>
                    </div>
                    
                    <div className="hidden md:flex gap-4 p-4 bg-white/[0.02] border border-white/10 rounded-lg shadow-[0_0_20px_rgba(255,255,255,0.02)] backdrop-blur-md">
                        <div className="flex items-center gap-4 px-2">
                            <Database className="text-purple-400" size={24} />
                            <div className="text-xs text-zinc-400 tracking-wider space-y-1">
                                <div>TOTAL_INSTANCES: <span className="text-white font-bold">{projects.length}</span></div>
                                <div>NETWORK_STATUS: <span className="text-green-400 font-bold animate-pulse">OPTIMIZED</span></div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-8 gap-6">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.slug}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05, duration: 0.5 }}
                            className="group h-full"
                        >
                            <Link href={`/projects/${project.slug}`} className="block h-full cursor-crosshair">
                                <div className="h-full flex flex-col bg-[#050505] backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden shadow-[0_4px_30px_rgba(0,0,0,0.8)] group-hover:border-teal-500/50 group-hover:shadow-[0_0_30px_rgba(45,212,191,0.2)] transition-all duration-500 relative">
                                    <div className="absolute inset-0 bg-gradient-to-br from-teal-500/0 via-teal-500/0 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                                    
                                    {/* Top Bar */}
                                    <div className="px-5 py-3 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
                                        <div className="flex items-center gap-3 text-xs text-zinc-400 tracking-widest font-semibold uppercase">
                                            <Server size={14} className="text-purple-400" />
                                            <span>node_{project.slug.replace(/-/g, '_').slice(0, 15)}</span>
                                        </div>
                                        <div className="flex gap-4 items-center">
                                            <object>
                                                <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-white transition-colors" onClick={(e) => e.stopPropagation()}>
                                                    <Github size={16} />
                                                </a>
                                            </object>
                                            <div className="flex items-center gap-2 text-[10px] font-bold tracking-wider bg-green-500/10 text-green-400 px-2.5 py-1 rounded border border-green-500/30">
                                                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,1)]"></span>
                                                LIVE
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {/* Content */}
                                    <div className="p-6 md:p-8 flex-1 flex flex-col z-10">
                                        <div className="flex items-start justify-between gap-4 mb-5">
                                            <h3 className="text-2xl sm:text-3xl font-bold text-white group-hover:text-teal-400 transition-colors font-heading leading-tight">
                                                {project.title}
                                            </h3>
                                            <div className="p-2.5 rounded bg-white/[0.03] group-hover:bg-teal-500/20 border border-white/10 group-hover:border-teal-500/40 transition-all flex-shrink-0">
                                                <ArrowUpRight size={20} className="text-zinc-400 group-hover:text-teal-400 transition-colors" />
                                            </div>
                                        </div>
                                        
                                        <p className="text-zinc-400 text-sm md:text-base mb-8 flex-1 leading-relaxed border-l-2 border-white/10 pl-5 group-hover:border-purple-500/40 transition-colors">
                                            {project.description}
                                        </p>
                                        
                                        {/* Tags area */}
                                        <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 mt-auto">
                                            <div className="flex items-center gap-2 text-xs text-purple-400 font-bold tracking-widest">
                                                <Terminal size={14} />
                                                <span className="uppercase">{project.category}</span>
                                            </div>
                                            
                                            <div className="flex flex-wrap items-center gap-2 justify-end">
                                                {project.tags.map(tag => (
                                                    <span key={tag} className="px-3 py-1.5 text-[11px] uppercase font-bold tracking-wider bg-black border border-white/10 rounded group-hover:border-teal-500/40 group-hover:text-teal-300 text-zinc-400 transition-colors shadow-sm">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
