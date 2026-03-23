"use client";

import { motion } from "framer-motion";

const STAGES = [
    { id: "ingest", label: "Ingest", desc: "Raw Data", color: "#818cf8", icon: "⬇" },
    { id: "transform", label: "Transform", desc: "Clean & Parse", color: "#38bdf8", icon: "⚡" },
    { id: "load", label: "Load", desc: "Warehouse", color: "#34d399", icon: "📦" },
    { id: "analyze", label: "Analyze", desc: "Query & Model", color: "#f59e0b", icon: "🔍" },
    { id: "visualize", label: "Visualize", desc: "Dashboard", color: "#f472b6", icon: "📊" },
];

const PACKET_DURATION = 2.4;

export default function DataFlowVisualizer() {
    return (
        <section className="py-10 relative overflow-hidden">
            <div className="container mx-auto px-6 max-w-5xl">
                <p className="text-[10px] font-mono uppercase tracking-[0.4em] text-zinc-600 text-center mb-6">
                    {"// data pipeline architecture"}
                </p>

                <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0 pb-2">
                    <div className="relative flex items-center justify-between gap-0 min-w-[420px] sm:min-w-0">
                        {STAGES.map((stage, i) => (
                            <div key={stage.id} className="flex items-center flex-1 last:flex-none">
                                {/* Node */}
                                <motion.div
                                    className="relative flex flex-col items-center z-10 shrink-0"
                                    initial={{ opacity: 0, y: 12, scale: 0.8 }}
                                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.12, duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
                                >
                                    {/* Outer ring pulse */}
                                    <motion.div
                                        className="absolute rounded-full"
                                        style={{ border: `1px solid ${stage.color}40`, width: 52, height: 52 }}
                                        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                                        transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.4 }}
                                    />
                                    {/* Second ring */}
                                    <motion.div
                                        className="absolute rounded-full"
                                        style={{ border: `1px solid ${stage.color}20`, width: 64, height: 64 }}
                                        animate={{ scale: [1, 1.6, 1], opacity: [0.3, 0, 0.3] }}
                                        transition={{ duration: 2.8, repeat: Infinity, delay: i * 0.4 + 0.3 }}
                                    />

                                    {/* Inner node — with 3D transform */}
                                    <motion.div
                                        className="w-11 h-11 rounded-full flex items-center justify-center text-sm font-bold border cursor-default"
                                        style={{
                                            background: `${stage.color}18`,
                                            borderColor: `${stage.color}50`,
                                            color: stage.color,
                                            boxShadow: `0 0 20px ${stage.color}30, inset 0 0 10px ${stage.color}10`,
                                        }}
                                        whileHover={{
                                            scale: 1.2,
                                            boxShadow: `0 0 30px ${stage.color}50, inset 0 0 15px ${stage.color}20`,
                                        }}
                                        transition={{ type: "spring", stiffness: 400, damping: 15 }}
                                    >
                                        {stage.icon}
                                    </motion.div>

                                    {/* Labels */}
                                    <p className="mt-3 text-xs font-semibold text-zinc-300 whitespace-nowrap">{stage.label}</p>
                                    <p className="text-[9px] text-zinc-600 font-mono whitespace-nowrap">{stage.desc}</p>
                                </motion.div>

                                {/* Connector + moving packets */}
                                {i < STAGES.length - 1 && (
                                    <div className="flex-1 relative h-px mx-1" style={{ background: "transparent" }}>
                                        {/* Gradient line */}
                                        <div
                                            className="absolute inset-0"
                                            style={{
                                                background: `linear-gradient(to right, ${STAGES[i].color}30, ${STAGES[i + 1].color}30)`,
                                            }}
                                        />

                                        {/* Animated data packet 1 */}
                                        <motion.div
                                            className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full"
                                            style={{
                                                background: STAGES[i].color,
                                                boxShadow: `0 0 8px ${STAGES[i].color}, 0 0 16px ${STAGES[i].color}50`,
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
                                            className="absolute top-1/2 -translate-y-1/2 w-10 h-px"
                                            style={{ background: `linear-gradient(to right, transparent, ${STAGES[i].color}60)` }}
                                            animate={{ left: ["-5%", "95%"] }}
                                            transition={{
                                                duration: PACKET_DURATION,
                                                repeat: Infinity,
                                                ease: "linear",
                                                delay: i * (PACKET_DURATION / STAGES.length),
                                            }}
                                        />
                                        {/* Second packet — offset */}
                                        <motion.div
                                            className="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full"
                                            style={{
                                                background: STAGES[i + 1].color,
                                                boxShadow: `0 0 6px ${STAGES[i + 1].color}`,
                                            }}
                                            animate={{ left: ["0%", "100%"] }}
                                            transition={{
                                                duration: PACKET_DURATION * 1.3,
                                                repeat: Infinity,
                                                ease: "linear",
                                                delay: i * (PACKET_DURATION / STAGES.length) + PACKET_DURATION * 0.5,
                                            }}
                                        />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
