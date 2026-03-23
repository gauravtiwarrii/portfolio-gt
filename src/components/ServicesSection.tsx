"use client";

import { motion } from "framer-motion";
import { Database, Cloud, BarChart3, Code2 } from "lucide-react";

const services = [
    {
        icon: Database,
        title: "Data Engineering & ETL",
        description: "Building robust pipelines, data warehouses, and automated batch/stream processing systems.",
        color: "text-purple-400",
        borderColor: "hover:border-purple-500/30",
    },
    {
        icon: Cloud,
        title: "Cloud Architecture",
        description: "Designing scalable cloud infrastructure on AWS with containerization and orchestration.",
        color: "text-yellow-400",
        borderColor: "hover:border-yellow-500/30",
    },
    {
        icon: BarChart3,
        title: "Big Data & Analytics",
        description: "Processing large-scale datasets with Spark, Kafka, and real-time analytics pipelines.",
        color: "text-teal-400",
        borderColor: "hover:border-teal-500/30",
    },
    {
        icon: Code2,
        title: "Full-Stack Development",
        description: "Creating modern web applications with Next.js, TypeScript, and PostgreSQL databases.",
        color: "text-green-400",
        borderColor: "hover:border-green-500/30",
    },
];

export default function ServicesSection() {
    return (
        <section className="py-24 px-4 sm:px-6 bg-black" id="services">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16"
                >
                    <div className="flex items-center gap-2 text-zinc-500 text-sm font-mono tracking-wider mb-4">
                        <span className="text-yellow-500">{`>`}</span>
                        <span>{`ls -la ./services`}</span>
                        <span className="w-2 h-4 bg-yellow-500 animate-pulse opacity-70" />
                    </div>
                    <h2
                        className="font-bold tracking-tight text-white"
                        style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)" }}
                    >
                        What I Do
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {services.map((service, index) => {
                        const Icon = service.icon;
                        return (
                            <motion.div
                                key={service.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                                className={`group p-6 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.05] ${service.borderColor} transition-all duration-300 cursor-default`}
                            >
                                <div className={`mb-5 ${service.color} transition-transform duration-300 group-hover:scale-110`}>
                                    <Icon size={36} strokeWidth={1.5} />
                                </div>
                                <h3 className="text-white font-semibold text-lg mb-2">
                                    {service.title}
                                </h3>
                                <p className="text-zinc-500 text-sm leading-relaxed">
                                    {service.description}
                                </p>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
