"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check, Github } from "lucide-react";

const codeQualityItems = [
    "Clean folder structure",
    "Modular code design",
    "requirements.txt",
    "Environment variable mapping",
    "Docker containerization",
    "Detailed README docs",
    "Setup & deploy guides"
];

export default function GitHubSection() {
    return (
        <section className="py-12 relative z-10 font-mono">
            <div className="p-8 border border-white/10 bg-[#050505] shadow-[0_0_30px_rgba(0,0,0,0.8)] relative overflow-hidden group">
                <div className="absolute -right-6 -top-6 opacity-5 group-hover:opacity-10 transition-opacity">
                    <Github size={180} className="text-white" />
                </div>
                
                <div className="flex flex-col md:flex-row gap-12 relative z-10">
                    <div className="flex-1">
                        <h2 className="text-xl font-bold mb-6 flex items-center gap-3 uppercase tracking-widest text-teal-400 border-b border-white/10 pb-4">
                            <Github size={20} />
                            Source_Control
                        </h2>
                        <p className="text-zinc-400 text-sm mb-8 leading-relaxed">
                            All projects follow production-ready practices. I don&apos;t just write code; I build maintainable software architecture.
                        </p>
                        <a
                            href="https://github.com/gauravtiwarrii"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-3 px-6 py-3 border border-teal-500/40 text-teal-400 text-xs font-bold tracking-widest uppercase hover:bg-teal-500/10 hover:border-teal-400 transition-colors"
                        >
                            <Github size={16} />
                            Deploy_Repository
                        </a>
                    </div>

                    <div className="flex-1 bg-[#0A0A0A] border border-white/5 p-6 space-y-4">
                        <div className="text-[10px] text-zinc-500 font-bold tracking-widest uppercase mb-4 pb-2 border-b border-white/5">
                            Quality_Standards_Checklist
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3">
                            {codeQualityItems.map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -10 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.05 }}
                                    className="flex items-center gap-2 text-zinc-300 text-xs tracking-wide"
                                >
                                    <Check size={12} className="text-green-400 shrink-0" />
                                    <span>{item}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

