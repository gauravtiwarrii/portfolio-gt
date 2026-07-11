"use client";

import { motion } from "framer-motion";

const TIMELINE_ITEMS = [
  { year: "2023", label: "Python", desc: "Started programming with Python, Data Structures & Algorithms", icon: "🐍" },
  { year: "2023", label: "SQL", desc: "Mastered complex queries, window functions, and optimization", icon: "📊" },
  { year: "2024", label: "Power BI", desc: "Built interactive dashboards for business intelligence", icon: "📈" },
  { year: "2024", label: "Kafka & Streaming", desc: "Real-time event streaming and message brokers", icon: "⚡" },
  { year: "2024", label: "Apache Spark", desc: "Distributed computing, PySpark, batch processing at scale", icon: "🔥" },
  { year: "2025", label: "AWS & Cloud", desc: "S3, EC2, Redshift, Lambda — cloud architecture", icon: "☁️" },
  { year: "2025", label: "AI & ML", desc: "Machine learning pipelines, Scikit-Learn, prediction systems", icon: "🤖" },
  { year: "Future", label: "What's Next?", desc: "Snowflake, dbt, Kubernetes, Flink, MLOps", icon: "🚀" },
];

export default function Timeline() {
  return (
    <section className="py-24 px-4 sm:px-6 relative overflow-hidden" id="timeline">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <p className="text-[10px] font-mono uppercase tracking-[0.5em] mb-4" style={{ color: "var(--gt-muted-fg)" }}>
            {"// evolution_timeline"}
          </p>
          <h2
            className="font-heading font-bold tracking-tight"
            style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", color: "var(--gt-fg)" }}
          >
            Growth <span style={{ color: "var(--gt-primary)" }}>Journey</span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Center Line */}
          <div
            className="absolute left-6 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-px"
            style={{ background: "linear-gradient(to bottom, transparent, var(--gt-primary), var(--gt-accent), transparent)" }}
          />

          {TIMELINE_ITEMS.map((item, i) => {
            const isLeft = i % 2 === 0;
            const isFuture = item.year === "Future";

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: isLeft ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className={`relative flex items-center mb-8 last:mb-0 ${isLeft ? "md:flex-row" : "md:flex-row-reverse"} flex-row`}
              >
                {/* Content Card */}
                <div className={`flex-1 ${isLeft ? "md:pr-12 md:text-right" : "md:pl-12"} pl-14 md:pl-0`}>
                  <div
                    className="p-5 rounded-xl transition-all duration-300 group cursor-default"
                    style={{
                      background: "var(--gt-surface)",
                      border: `1px solid ${isFuture ? "color-mix(in srgb, var(--gt-accent) 40%, transparent)" : "var(--gt-border)"}`,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "color-mix(in srgb, var(--gt-primary) 50%, transparent)";
                      e.currentTarget.style.boxShadow = `0 0 20px var(--gt-glow)`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = isFuture ? "color-mix(in srgb, var(--gt-accent) 40%, transparent)" : "var(--gt-border)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    <span className="text-[10px] font-mono uppercase tracking-widest font-bold" style={{ color: isFuture ? "var(--gt-accent)" : "var(--gt-primary)" }}>
                      {item.year}
                    </span>
                    <h3 className="text-lg font-heading font-bold mt-1" style={{ color: "var(--gt-fg)" }}>
                      {item.icon} {item.label}
                    </h3>
                    <p className="text-sm mt-1" style={{ color: "var(--gt-muted-fg)" }}>
                      {item.desc}
                    </p>
                  </div>
                </div>

                {/* Timeline Dot */}
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-10">
                  <motion.div
                    className="w-4 h-4 rounded-full"
                    style={{
                      background: isFuture ? "var(--gt-accent)" : "var(--gt-primary)",
                      boxShadow: `0 0 12px ${isFuture ? "var(--gt-accent)" : "var(--gt-glow)"}`,
                    }}
                    animate={isFuture ? { scale: [1, 1.3, 1] } : {}}
                    transition={isFuture ? { duration: 2, repeat: Infinity } : {}}
                  />
                </div>

                {/* Spacer for opposite side */}
                <div className="hidden md:block flex-1" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
