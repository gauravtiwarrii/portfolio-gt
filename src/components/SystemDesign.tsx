
"use client";

import React from "react";
import { motion } from "framer-motion";
import { Server, Zap, Database, Layers } from "lucide-react";
import GlassCard from "./GlassCard";

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
        <section className="py-12">
            <motion.h2
                className="text-3xl font-bold mb-8 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
            >
                System Design & Architecture
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {principles.map((p, index) => (
                    <motion.div
                        key={p.title}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <GlassCard className="p-6 h-full hover:bg-white/5 transition-colors">
                            <div className="p-3 bg-blue-500/10 w-fit rounded-lg mb-4 text-blue-400">
                                <p.icon size={24} />
                            </div>
                            <h3 className="text-xl font-bold mb-2">{p.title}</h3>
                            <p className="text-gray-400 text-sm">{p.desc}</p>
                        </GlassCard>
                    </motion.div>
                ))}
            </div>

            <motion.p
                className="text-center text-gray-400 mt-8 max-w-2xl mx-auto"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
            >
                I approach data engineering with a system-design mindset — focusing on scalability, reliability, automation, and performance.
            </motion.p>
        </section>
    );
}
