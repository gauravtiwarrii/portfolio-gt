"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  SiPython, SiApacheairflow, SiApachespark, SiApachekafka,
  SiPostgresql, SiMysql, SiMongodb, SiAmazonwebservices,
  SiDocker, SiTypescript, SiNextdotjs, SiGit, SiSnowflake,
  SiGooglecloud, SiApachehadoop, SiFlask, SiStreamlit,
} from "react-icons/si";
import { Cpu, type LucideIcon } from "lucide-react";
import type { IconType } from "react-icons";

interface SkillNode {
  id: string;
  name: string;
  icon: IconType | LucideIcon;
  color: string;
  category: string;
  level: "Expert" | "Advanced" | "Intermediate";
  projects: string[];
  related: string[];
}

const SKILLS: SkillNode[] = [
  { id: "python", name: "Python", icon: SiPython, color: "#3776AB", category: "Languages", level: "Expert", projects: ["All Projects"], related: ["pyspark", "flask", "airflow"] },
  { id: "sql", name: "SQL", icon: SiPostgresql, color: "#4169E1", category: "Languages", level: "Expert", projects: ["Flight Analytics", "E-Commerce DW"], related: ["postgresql", "mysql", "snowflake"] },
  { id: "typescript", name: "TypeScript", icon: SiTypescript, color: "#3178C6", category: "Languages", level: "Advanced", projects: ["Portfolio"], related: ["nextjs"] },
  { id: "kafka", name: "Apache Kafka", icon: SiApachekafka, color: "#231F20", category: "Data Engineering", level: "Advanced", projects: ["Real-Time Retail Pipeline", "Streaming Pipeline"], related: ["spark", "python"] },
  { id: "spark", name: "Apache Spark", icon: SiApachespark, color: "#E25A1C", category: "Data Engineering", level: "Advanced", projects: ["PySpark Big Data", "Streaming Pipeline"], related: ["kafka", "pyspark", "hadoop"] },
  { id: "pyspark", name: "PySpark", icon: SiApachespark, color: "#E25A1C", category: "Data Engineering", level: "Advanced", projects: ["PySpark Big Data"], related: ["spark", "python"] },
  { id: "airflow", name: "Apache Airflow", icon: SiApacheairflow, color: "#017CEE", category: "Data Engineering", level: "Advanced", projects: ["Retail ETL", "Flight Analytics"], related: ["python", "docker"] },
  { id: "snowflake", name: "Snowflake", icon: SiSnowflake, color: "#29B5E8", category: "Warehousing", level: "Advanced", projects: ["Flight Analytics DW"], related: ["sql", "dbt"] },
  { id: "postgresql", name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1", category: "Databases", level: "Expert", projects: ["Flight Delay Prediction", "Retail ETL"], related: ["sql", "mysql"] },
  { id: "mysql", name: "MySQL", icon: SiMysql, color: "#4479A1", category: "Databases", level: "Advanced", projects: [], related: ["sql", "postgresql"] },
  { id: "mongodb", name: "MongoDB", icon: SiMongodb, color: "#47A248", category: "Databases", level: "Intermediate", projects: [], related: [] },
  { id: "aws", name: "AWS", icon: SiAmazonwebservices, color: "#FF9900", category: "Cloud", level: "Advanced", projects: ["Real-Time Retail Pipeline", "PySpark Big Data"], related: ["docker", "s3"] },
  { id: "gcp", name: "Google Cloud", icon: SiGooglecloud, color: "#4285F4", category: "Cloud", level: "Intermediate", projects: [], related: ["bigquery"] },
  { id: "docker", name: "Docker", icon: SiDocker, color: "#2496ED", category: "DevOps", level: "Advanced", projects: ["Retail ETL"], related: ["aws", "git"] },
  { id: "git", name: "Git", icon: SiGit, color: "#F05032", category: "DevOps", level: "Expert", projects: ["All Projects"], related: ["docker"] },
  { id: "hadoop", name: "Hadoop", icon: SiApachehadoop, color: "#66CCFF", category: "Data Engineering", level: "Intermediate", projects: ["PySpark Big Data"], related: ["spark"] },
  { id: "flask", name: "Flask", icon: SiFlask, color: "#ffffff", category: "Backend", level: "Advanced", projects: ["Flight Delay Prediction"], related: ["python", "streamlit"] },
  { id: "streamlit", name: "Streamlit", icon: SiStreamlit, color: "#FF4B4B", category: "Backend", level: "Advanced", projects: ["Flight Delay Prediction"], related: ["python", "flask"] },
  { id: "nextjs", name: "Next.js", icon: SiNextdotjs, color: "#ffffff", category: "Frontend", level: "Advanced", projects: ["Portfolio"], related: ["typescript"] },
];

const LEVEL_COLORS = {
  Expert: "#22c55e",
  Advanced: "#3b82f6",
  Intermediate: "#f59e0b",
};

const CATEGORIES = [...new Set(SKILLS.map((s) => s.category))];

export default function SkillGalaxy() {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredSkills = selectedCategory
    ? SKILLS.filter((s) => s.category === selectedCategory)
    : SKILLS;

  const hoveredNode = SKILLS.find((s) => s.id === hoveredSkill);

  return (
    <section className="py-24 px-4 sm:px-6 relative overflow-hidden" id="skills">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Cpu size={20} style={{ color: "var(--gt-accent)" }} />
              <h2 className="text-2xl font-heading font-bold tracking-widest uppercase" style={{ color: "var(--gt-fg)" }}>
                Skill_Galaxy
              </h2>
            </div>
            <p className="text-sm font-mono" style={{ color: "var(--gt-muted-fg)" }}>
              {"// interactive technology constellation"}
            </p>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory(null)}
              className="px-3 py-1 text-[10px] font-mono uppercase tracking-widest rounded-full transition-all"
              style={{
                background: !selectedCategory ? "color-mix(in srgb, var(--gt-primary) 15%, transparent)" : "var(--gt-surface)",
                border: `1px solid ${!selectedCategory ? "color-mix(in srgb, var(--gt-primary) 40%, transparent)" : "var(--gt-border)"}`,
                color: !selectedCategory ? "var(--gt-primary)" : "var(--gt-muted-fg)",
              }}
            >
              All
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat === selectedCategory ? null : cat)}
                className="px-3 py-1 text-[10px] font-mono uppercase tracking-widest rounded-full transition-all"
                style={{
                  background: selectedCategory === cat ? "color-mix(in srgb, var(--gt-primary) 15%, transparent)" : "var(--gt-surface)",
                  border: `1px solid ${selectedCategory === cat ? "color-mix(in srgb, var(--gt-primary) 40%, transparent)" : "var(--gt-border)"}`,
                  color: selectedCategory === cat ? "var(--gt-primary)" : "var(--gt-muted-fg)",
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {filteredSkills.map((skill, index) => {
            const Icon = skill.icon;
            const isHovered = hoveredSkill === skill.id;
            const isRelated = hoveredNode?.related.includes(skill.id);

            return (
              <motion.div
                key={skill.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.03, duration: 0.3 }}
                onMouseEnter={() => setHoveredSkill(skill.id)}
                onMouseLeave={() => setHoveredSkill(null)}
                className="relative group flex flex-col p-4 rounded-xl cursor-default transition-all duration-300"
                style={{
                  background: isHovered || isRelated ? "var(--gt-surface-hover)" : "var(--gt-surface)",
                  border: `1px solid ${isHovered ? `color-mix(in srgb, var(--gt-primary) 50%, transparent)` : isRelated ? `color-mix(in srgb, var(--gt-accent) 40%, transparent)` : "var(--gt-border)"}`,
                  boxShadow: isHovered ? `0 0 25px var(--gt-glow)` : "none",
                }}
              >
                {/* Level indicator */}
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[8px] font-mono uppercase tracking-widest font-bold" style={{ color: LEVEL_COLORS[skill.level] }}>
                    {skill.level}
                  </span>
                  <span
                    className="w-2 h-2 rounded-full transition-colors"
                    style={{ background: isHovered ? skill.color : "var(--gt-muted)" }}
                  />
                </div>

                {/* Icon */}
                <div className="flex flex-col items-center justify-center gap-2 flex-1 mb-3 relative z-10">
                  <Icon
                    size={32}
                    className="transition-all duration-300"
                    style={{
                      color: isHovered || isRelated ? skill.color : "var(--gt-muted-fg)",
                      filter: isHovered ? `drop-shadow(0 0 8px ${skill.color}80)` : "none",
                      transform: isHovered ? "scale(1.15)" : "scale(1)",
                    }}
                  />
                  <span className="text-xs font-bold tracking-wide text-center" style={{ color: isHovered ? "var(--gt-fg)" : "var(--gt-muted-fg)" }}>
                    {skill.name}
                  </span>
                </div>

                {/* Category tag */}
                <div className="mt-auto pt-2 text-center" style={{ borderTop: "1px solid var(--gt-border)" }}>
                  <span className="text-[8px] font-mono uppercase tracking-widest" style={{ color: "var(--gt-muted-fg)" }}>
                    {skill.category}
                  </span>
                </div>

                {/* Hover Tooltip */}
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute -top-2 left-1/2 -translate-x-1/2 -translate-y-full w-52 p-3 rounded-lg z-50 font-mono text-xs"
                    style={{
                      background: "var(--gt-bg)",
                      border: "1px solid var(--gt-border)",
                      boxShadow: "0 10px 40px rgba(0,0,0,0.6)",
                    }}
                  >
                    <div className="font-bold mb-1" style={{ color: "var(--gt-fg)" }}>{skill.name}</div>
                    <div style={{ color: LEVEL_COLORS[skill.level] }}>{skill.level}</div>
                    {skill.projects.length > 0 && (
                      <div className="mt-2">
                        <span style={{ color: "var(--gt-muted-fg)" }}>Projects: </span>
                        <span style={{ color: "var(--gt-primary)" }}>{skill.projects.join(", ")}</span>
                      </div>
                    )}
                    {skill.related.length > 0 && (
                      <div className="mt-1">
                        <span style={{ color: "var(--gt-muted-fg)" }}>Related: </span>
                        <span style={{ color: "var(--gt-accent)" }}>
                          {skill.related.map((r) => SKILLS.find((s) => s.id === r)?.name).filter(Boolean).join(", ")}
                        </span>
                      </div>
                    )}
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
