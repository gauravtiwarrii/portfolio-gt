"use client";

import React from "react";
import { motion } from "framer-motion";
import { Server, Zap, Database, Layers, Terminal } from "lucide-react";

const principles = [
    {
        icon: Layers,
        title: "Batch Processing Architecture",
        desc: "Optimized for high-throughput ETL jobs."
    },
    {
        icon: Zap,
        title: "Real-Time Streaming",
        desc: "Low-latency ingestion with Kafka & Spark."
    },
    {
        icon: Database,
        title: "Data Lake Architecture",
        desc: "Bronze/Silver/Gold layers on S3."
    },
    {
        icon: Server,
        title: "ETL vs ELT Design",
        desc: "Choosing the right pattern for scale."
    }
];

export default function SystemDesign() {
    return (
        <section className="py-12 relative z-10 font-mono">
            <motion.div
                className="mb-8 flex items-center justify-between border-b border-white/10 pb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
            >
                <div className="flex items-center gap-3">
                    <Terminal size={20} className="text-teal-400" />
                    <h2 className="text-2xl font-bold tracking-widest uppercase">System_Architecture</h2>
                </div>
                <div className="text-[10px] text-zinc-500 tracking-widest hidden sm:block">
                    CORE_PRINCIPLES_V_1.0
                </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {principles.map((p, index) => (
                    <motion.div
                        key={p.title}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="p-5 bg-[#050505] border border-white/10 flex flex-col group hover:border-teal-500/50 transition-colors relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                            <p.icon size={60} className="text-teal-400" />
                        </div>
                        <div className="mb-6 relative z-10">
                            <h3 className="text-sm font-bold text-teal-400 mb-2 uppercase tracking-wide leading-tight">{p.title}</h3>
                            <p className="text-zinc-400 text-xs leading-relaxed">{p.desc}</p>
                        </div>
                        <div className="mt-auto pt-4 border-t border-white/5 relative z-10 flex items-center justify-between text-[10px] text-zinc-500 font-bold tracking-widest">
                            <span>MODULE_ACTIVE</span>
                            <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse"></span>
                        </div>
                    </motion.div>
                ))}
            </div>

            <motion.div
                className="mt-8 p-4 border border-white/10 bg-[#0A0A0A] text-xs text-zinc-400 flex items-center gap-3"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
            >
                <span className="text-teal-400 font-bold">{`>`}</span>
                <p>I approach data engineering with a system-design mindset — focusing on scalability, reliability, automation, and performance.</p>
                <span className="animate-blink w-2 h-3 bg-teal-400 ml-1"></span>
            </motion.div>
        </section>
    );
}

