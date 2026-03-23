"use client";

import { motion } from "framer-motion";
import { projects } from "@/data/projects";
import Link from "next/link";
import { ArrowUpRight, Terminal, Server, Activity } from "lucide-react";

export default function Projects() {
    return (
        <section className="py-24 px-4 sm:px-6 bg-black font-mono relative overflow-hidden" id="projects">
            <div className="absolute inset-0 bg-tech-grid opacity-5 pointer-events-none mix-blend-screen mask-image:linear-gradient(to_bottom,black,transparent)"></div>
            
            <div className="max-w-[1400px] mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6"
                >
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <span className="text-teal-400 text-sm font-bold tracking-wider">{`//`}</span>
                            <p className="text-zinc-400 text-sm font-bold tracking-wider uppercase">
                                {`deployed_services`}
                            </p>
                        </div>
                        <h2 className="font-bold tracking-tight text-white font-heading" style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}>
                            <span className="text-teal-500/40 mr-2">{`<`}</span>
                            Projects
                            <span className="text-teal-500/40 ml-2">{`/>`}</span>
                        </h2>
                    </div>
                    
                    <div className="hidden md:flex gap-4 p-3 bg-white/[0.02] border border-white/5 rounded-lg shadow-[0_0_20px_rgba(255,255,255,0.02)]">
                        <div className="flex items-center gap-3 px-2">
                            <Activity className="text-teal-400" size={18} />
                            <div className="text-xs text-zinc-400 tracking-wider">
                                <div>TOTAL_NODES: <span className="text-white font-bold">{projects.length}</span></div>
                                <div>CLUSTER_HEALTH: <span className="text-green-400 font-bold">100%</span></div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.slug}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.08, duration: 0.6 }}
                            className="group h-full"
                        >
                            <Link href={`/projects/${project.slug}`} className="block h-full cursor-crosshair">
                                <div className="h-full flex flex-col bg-black/60 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.5)] group-hover:border-teal-500/40 group-hover:shadow-[0_0_20px_rgba(45,212,191,0.15)] transition-all duration-300 relative">
                                    <div className="absolute inset-0 bg-gradient-to-br from-teal-500/0 via-teal-500/0 to-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                                    
                                    {/* Top Bar of the Container */}
                                    <div className="px-4 py-2.5 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
                                        <div className="flex items-center gap-2 text-[11px] text-zinc-400 tracking-widest font-semibold uppercase">
                                            <Server size={12} className="text-teal-400" />
                                            <span>container_{project.slug.slice(0, 10)}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-[10px] font-bold tracking-wider group-hover:bg-green-500/20 transition-colors bg-white/5 text-green-400 px-2 py-0.5 rounded border border-green-500/20">
                                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.8)]"></span>
                                            ONLINE
                                        </div>
                                    </div>
                                    
                                    {/* Content inside Container */}
                                    <div className="p-6 md:p-8 flex-1 flex flex-col">
                                        <div className="flex items-start justify-between gap-4 mb-4">
                                            <h3 className="text-2xl sm:text-3xl font-bold text-white group-hover:text-teal-400 transition-colors font-heading leading-none">
                                                {project.title}
                                            </h3>
                                            <div className="p-2 rounded bg-white/[0.03] group-hover:bg-teal-500/10 border border-white/5 group-hover:border-teal-500/20 transition-all flex-shrink-0">
                                                <ArrowUpRight size={18} className="text-zinc-500 group-hover:text-teal-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                                            </div>
                                        </div>
                                        
                                        <p className="text-zinc-400 text-sm mb-6 flex-1 leading-relaxed border-l-2 border-white/5 pl-4 group-hover:border-teal-500/20 transition-colors">
                                            {project.subtitle}
                                        </p>
                                        
                                        {/* Tags area */}
                                        <div className="pt-5 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 mt-auto">
                                            <div className="flex items-center gap-2 text-xs text-teal-400/80 font-semibold tracking-wider">
                                                <Terminal size={14} />
                                                <span className="uppercase">{project.category}</span>
                                            </div>
                                            
                                            <div className="flex flex-wrap items-center gap-2 justify-end">
                                                {project.tags.slice(0, 3).map(tag => (
                                                    <span key={tag} className="px-2.5 py-1 text-[10px] uppercase font-bold tracking-wider bg-black border border-white/10 rounded group-hover:border-teal-500/30 group-hover:bg-teal-500/10 text-zinc-400 group-hover:text-teal-300 transition-colors">
                                                        {tag}
                                                    </span>
                                                ))}
                                                {project.tags.length > 3 && (
                                                    <span className="text-[10px] text-zinc-500 italic">+{project.tags.length - 3}</span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {/* View All */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mt-16 flex justify-center"
                >
                    <Link
                        href="/projects"
                        className="group flex items-center gap-3 px-8 py-4 border border-teal-500/30 bg-black rounded text-teal-400 hover:bg-teal-500/10 hover:border-teal-400 transition-all text-sm font-mono uppercase tracking-widest font-bold shadow-[0_0_15px_rgba(45,212,191,0.05)] hover:shadow-[0_0_20px_rgba(45,212,191,0.2)]"
                    >
                        <Terminal size={18} />
                        View_All_Deployments
                        <span className="animate-blink opacity-0 group-hover:opacity-100 bg-teal-400 w-2 h-4 inline-block align-middle shadow-[0_0_8px_rgba(45,212,191,0.8)]"></span>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}

