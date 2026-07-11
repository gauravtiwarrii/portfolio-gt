"use client";

import { motion } from "framer-motion";

const KafkaIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" fill="#10B981" />
    <path d="M12 7V17M12 17L8 13M12 17L16 13" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const SparkIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" fill="#EF4444" />
    <path d="M13 3L5 12H12L11 21L19 12H12L13 3Z" fill="white" />
  </svg>
);

const TransformIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="20" height="20" x="2" y="2" rx="4" fill="#3B82F6" />
    <path d="M16 12C16 14.2091 14.2091 16 12 16C10.7416 16 9.6192 15.4194 8.87784 14.5M8 12C8 9.79086 9.79086 8 12 8C13.2584 8 14.3808 8.58058 15.1222 9.5M16 7V10H13M8 17V14H11" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const SnowflakeIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2V22M2 12H22M12 12L5 5M12 12L19 19M12 12L5 19M12 12L19 5" stroke="#22D3EE" strokeWidth="2" strokeLinecap="round" />
    <path d="M12 5L9 8M12 5L15 8M12 19L9 16M12 19L15 16M5 12L8 9M5 12L8 15M22 12L19 9M22 12L19 15" stroke="#22D3EE" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const PowerBIIcon = () => (
  <svg className="w-5.5 h-5.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="13" width="4.5" height="7" rx="1" fill="#F2C811" />
    <rect x="9.75" y="8" width="4.5" height="12" rx="1" fill="#F2A104" />
    <rect x="15.5" y="4" width="4.5" height="16" rx="1" fill="#E61C5D" />
  </svg>
);

const PIPELINE_STAGES = [
  { id: "kafka", label: "Kafka", desc: "Event Ingestion", icon: <KafkaIcon /> },
  { id: "spark", label: "Spark Streaming", desc: "Processing", icon: <SparkIcon /> },
  { id: "transform", label: "Transform", desc: "Clean & Enrich", icon: <TransformIcon /> },
  { id: "snowflake", label: "Snowflake", desc: "Data Warehouse", icon: <SnowflakeIcon /> },
  { id: "powerbi", label: "Power BI", desc: "Visualization", icon: <PowerBIIcon /> },
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
