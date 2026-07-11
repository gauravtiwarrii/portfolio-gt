"use client";

import { motion } from "framer-motion";

const PIPELINE_STAGES = [
  { id: "kafka", label: "Kafka", desc: "Event Ingestion", icon: "⬇" },
  { id: "spark", label: "Spark Streaming", desc: "Processing", icon: "⚡" },
  { id: "transform", label: "Transform", desc: "Clean & Enrich", icon: "🔄" },
  { id: "snowflake", label: "Snowflake", desc: "Data Warehouse", icon: "❄️" },
  { id: "powerbi", label: "Power BI", desc: "Visualization", icon: "📊" },
];

const PACKET_DURATION = 2.5;

export default function DataPipeline() {
  return (
    <section className="py-24 px-4 sm:px-6 relative overflow-hidden" id="pipeline">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <p
            className="text-[10px] font-mono uppercase tracking-[0.5em] mb-4"
            style={{ color: "var(--gt-muted-fg)" }}
          >
            {"// live_data_pipeline"}
          </p>
          <h2
            className="font-heading font-bold tracking-tight"
            style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", color: "var(--gt-fg)" }}
          >
            Real-Time Streaming{" "}
            <span style={{ color: "var(--gt-primary)" }}>Architecture</span>
          </h2>
        </motion.div>

        {/* Pipeline Visualization */}
        <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0 pb-4">
          <div className="relative flex items-center justify-between gap-0 min-w-[500px]">
            {PIPELINE_STAGES.map((stage, i) => (
              <div key={stage.id} className="flex items-center flex-1 last:flex-none">
                {/* Node */}
                <motion.div
                  className="relative flex flex-col items-center z-10 shrink-0"
                  initial={{ opacity: 0, y: 12, scale: 0.8 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  {/* Pulse ring */}
                  <motion.div
                    className="absolute rounded-full"
                    style={{
                      border: `1px solid color-mix(in srgb, var(--gt-primary) 30%, transparent)`,
                      width: 56,
                      height: 56,
                    }}
                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.4 }}
                  />

                  {/* Inner node */}
                  <motion.div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-base font-bold cursor-default"
                    style={{
                      background: "color-mix(in srgb, var(--gt-primary) 10%, transparent)",
                      border: "1px solid color-mix(in srgb, var(--gt-primary) 40%, transparent)",
                      color: "var(--gt-primary)",
                      boxShadow: `0 0 20px var(--gt-glow), inset 0 0 10px color-mix(in srgb, var(--gt-primary) 10%, transparent)`,
                    }}
                    whileHover={{
                      scale: 1.15,
                      boxShadow: `0 0 30px var(--gt-glow), inset 0 0 15px color-mix(in srgb, var(--gt-primary) 20%, transparent)`,
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  >
                    {stage.icon}
                  </motion.div>

                  {/* Labels */}
                  <p className="mt-3 text-xs font-semibold whitespace-nowrap" style={{ color: "var(--gt-fg)" }}>
                    {stage.label}
                  </p>
                  <p className="text-[9px] font-mono whitespace-nowrap" style={{ color: "var(--gt-muted-fg)" }}>
                    {stage.desc}
                  </p>
                </motion.div>

                {/* Connector with animated packets */}
                {i < PIPELINE_STAGES.length - 1 && (
                  <div className="flex-1 relative h-px mx-2">
                    {/* Static line */}
                    <div
                      className="absolute inset-0"
                      style={{
                        background: `linear-gradient(to right, color-mix(in srgb, var(--gt-primary) 25%, transparent), color-mix(in srgb, var(--gt-primary) 25%, transparent))`,
                      }}
                    />

                    {/* Animated data packet */}
                    <motion.div
                      className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full"
                      style={{
                        background: "var(--gt-primary)",
                        boxShadow: `0 0 8px var(--gt-primary), 0 0 16px var(--gt-glow)`,
                      }}
                      animate={{ left: ["0%", "100%"] }}
                      transition={{
                        duration: PACKET_DURATION,
                        repeat: Infinity,
                        ease: "linear",
                        delay: i * (PACKET_DURATION / PIPELINE_STAGES.length),
                      }}
                    />

                    {/* Trailing glow */}
                    <motion.div
                      className="absolute top-1/2 -translate-y-1/2 w-12 h-px"
                      style={{
                        background: `linear-gradient(to right, transparent, color-mix(in srgb, var(--gt-primary) 50%, transparent))`,
                      }}
                      animate={{ left: ["-5%", "92%"] }}
                      transition={{
                        duration: PACKET_DURATION,
                        repeat: Infinity,
                        ease: "linear",
                        delay: i * (PACKET_DURATION / PIPELINE_STAGES.length),
                      }}
                    />

                    {/* Second packet — offset */}
                    <motion.div
                      className="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full"
                      style={{
                        background: "var(--gt-accent)",
                        boxShadow: `0 0 6px var(--gt-accent)`,
                      }}
                      animate={{ left: ["0%", "100%"] }}
                      transition={{
                        duration: PACKET_DURATION * 1.4,
                        repeat: Infinity,
                        ease: "linear",
                        delay: i * (PACKET_DURATION / PIPELINE_STAGES.length) + PACKET_DURATION * 0.5,
                      }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Live Counter */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 flex items-center justify-center gap-6 font-mono text-xs"
          style={{ color: "var(--gt-muted-fg)" }}
        >
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span>Pipeline Status: <span className="font-bold" style={{ color: "var(--gt-primary)" }}>STREAMING</span></span>
          </div>
          <span>•</span>
          <span>Throughput: <span className="font-bold" style={{ color: "var(--gt-primary)" }}>5,000 events/min</span></span>
          <span className="hidden sm:inline">•</span>
          <span className="hidden sm:inline">Latency: <span className="font-bold" style={{ color: "var(--gt-primary)" }}>&lt;5s</span></span>
        </motion.div>
      </div>
    </section>
  );
}
