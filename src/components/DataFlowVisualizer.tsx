"use client";

import { motion } from "framer-motion";

const STAGES = [
    { id: "ingest", label: "Ingest", desc: "Raw Data", color: "#818cf8" },
    { id: "transform", label: "Transform", desc: "Clean & Parse", color: "#38bdf8" },
    { id: "load", label: "Load", desc: "Warehouse", color: "#34d399" },
    { id: "analyze", label: "Analyze", desc: "Query & Model", color: "#f59e0b" },
    { id: "visualize", label: "Visualize", desc: "Dashboard", color: "#f472b6" },
];

const PACKET_DURATION = 2.4; // seconds to cross one segment

export default function DataFlowVisualizer() {
    return (
        <section className="py-10 relative overflow-hidden">
            <div className="container mx-auto px-6 max-w-5xl">
                {/* Label */}
                <p className="text-[10px] font-mono uppercase tracking-[0.4em] text-zinc-600 text-center mb-6">
                    {"// data pipeline architecture"}
                </p>

                {/* Pipeline */}
                <div className="relative flex items-center justify-between gap-0">
                    {STAGES.map((stage, i) => (
                        <div key={stage.id} className="flex items-center flex-1 last:flex-none">
                            {/* Node */}
                            <motion.div
                                className="relative flex flex-col items-center z-10 shrink-0"
                                initial={{ opacity: 0, y: 12 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.12, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                            >
                                {/* Outer ring pulse */}
                                <motion.div
                                    className="absolute rounded-full"
                                    style={{ border: `1px solid ${stage.color}40`, width: 44, height: 44 }}
                                    animate={{ scale: [1, 1.35, 1], opacity: [0.5, 0, 0.5] }}
                                    transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.4 }}
                                />
                                {/* Inner node */}
                                <div
                                    className="w-9 h-9 rounded-full flex items-center justify-center text-[9px] font-bold font-mono border"
                                    style={{
                                        background: `${stage.color}18`,
                                        borderColor: `${stage.color}50`,
                                        color: stage.color,
                                        boxShadow: `0 0 12px ${stage.color}30`,
                                    }}
                                >
                                    {String(i + 1).padStart(2, "0")}
                                </div>
                                {/* Labels */}
                                <p className="mt-3 text-xs font-semibold text-zinc-300 whitespace-nowrap">{stage.label}</p>
                                <p className="text-[9px] text-zinc-600 font-mono whitespace-nowrap">{stage.desc}</p>
                            </motion.div>

                            {/* Connector + moving packet (between nodes, not after last) */}
                            {i < STAGES.length - 1 && (
                                <div className="flex-1 relative h-px mx-1" style={{ background: "transparent" }}>
                                    {/* Dashed line */}
                                    <div
                                        className="absolute inset-0"
                                        style={{
                                            borderTop: `1px dashed ${STAGES[i].color}30`,
                                        }}
                                    />
                                    {/* Animated data packet */}
                                    <motion.div
                                        className="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full"
                                        style={{
                                            background: STAGES[i].color,
                                            boxShadow: `0 0 6px ${STAGES[i].color}`,
                                        }}
                                        animate={{ left: ["0%", "100%"] }}
                                        transition={{
                                            duration: PACKET_DURATION,
                                            repeat: Infinity,
                                            ease: "linear",
                                            delay: i * (PACKET_DURATION / STAGES.length),
                                        }}
                                    />
                                    {/* Trailing glow */}
                                    <motion.div
                                        className="absolute top-1/2 -translate-y-1/2 w-6 h-px"
                                        style={{ background: `linear-gradient(to right, transparent, ${STAGES[i].color}60)` }}
                                        animate={{ left: ["-5%", "95%"] }}
                                        transition={{
                                            duration: PACKET_DURATION,
                                            repeat: Infinity,
                                            ease: "linear",
                                            delay: i * (PACKET_DURATION / STAGES.length),
                                        }}
                                    />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
