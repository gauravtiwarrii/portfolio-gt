
"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle, Github } from "lucide-react";
import GlassCard from "./GlassCard";

const codeQualityItems = [
    "Clean folder structure",
    "Modular code design",
    "requirements.txt",
    "Environment variable management",
    "Docker containerization",
    "Detailed README documentation",
    "Setup & deployment instructions"
];

export default function GitHubSection() {
    return (
        <section className="py-12">
            <GlassCard className="p-8">
                <div className="flex flex-col md:flex-row gap-8 items-start">
                    <div className="flex-1">
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                            <Github className="text-white" />
                            GitHub & Code Quality
                        </h2>
                        <p className="text-gray-400 mb-6">
                            All projects follow production-ready practices. I don&apos;t just write code; I build maintainable software.
                        </p>
                        <a
                            href="https://github.com/gauravtiwarrii"
                            target="_blank"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black rounded-lg font-bold hover:bg-gray-200 transition-colors"
                        >
                            <Github size={20} />
                            Visit My GitHub
                        </a>
                    </div>

                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {codeQualityItems.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="flex items-center gap-2 text-gray-300"
                            >
                                <CheckCircle size={16} className="text-green-400 shrink-0" />
                                <span className="text-sm font-mono">{item}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </GlassCard>
        </section>
    );
}
