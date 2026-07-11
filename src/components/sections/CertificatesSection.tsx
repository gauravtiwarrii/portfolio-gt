"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Award, ExternalLink, Lock, Unlock, GraduationCap } from "lucide-react";

const education = [
  {
    degree: "Bachelor of Technology — CSE",
    institution: "Lovely Professional University",
    location: "Phagwara, Punjab",
    period: "Aug 2023 – Present",
    grade: "CGPA: 7.26",
    highlights: ["Data Structures & Algorithms", "DBMS", "Cloud Computing", "ML", "Distributed Systems"],
  },
  {
    degree: "Intermediate — PCM",
    institution: "Lions School",
    location: "Mirzapur, U.P.",
    period: "Mar 2021 – May 2022",
    grade: "74.6%",
    highlights: [],
  },
  {
    degree: "Matriculation",
    institution: "Lions School",
    location: "Mirzapur, U.P.",
    period: "Mar 2019 – May 2020",
    grade: "64.2%",
    highlights: [],
  },
];

const certifications = [
  {
    name: "Google Cloud Professional Data Engineer",
    issuer: "Google Cloud",
    date: "In Progress",
    link: "#",
    color: "#4285F4",
    inProgress: true,
  },
  {
    name: "Oracle Cloud Infrastructure 2025 — Data Science Professional",
    issuer: "Oracle",
    date: "Aug 2025",
    link: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=CF58B21AFBE3D53A4CB7BF6BB442967C2042A29E60636D0F6F4273C84384E293",
    color: "#F80000",
  },
  {
    name: "Cloud Computing",
    issuer: "NPTEL",
    date: "Nov 2025",
    link: "https://archive.nptel.ac.in/content/noc/NOC25/SEM2/Ecertificates/106/noc25-cs107/Course/NPTEL25CS107S145870128310531614.pdf",
    color: "#0F67B1",
  },
  {
    name: "Introduction to Hardware and Operating Systems (Honors)",
    issuer: "Coursera",
    date: "Aug 2024",
    link: "https://www.coursera.org/account/accomplishments/verify/2XKM8OPBXWYR",
    color: "#0056D2",
  },
  {
    name: "Crash Course on Python",
    issuer: "Coursera",
    date: "Mar 2024",
    link: "https://www.coursera.org/account/accomplishments/verify/ZTXYHAEJLFGC",
    color: "#0056D2",
  },
];

export default function CertificatesSection() {
  const [unlockedCerts, setUnlockedCerts] = useState<Set<number>>(new Set());

  const unlockCert = (index: number) => {
    setUnlockedCerts((prev) => new Set(prev).add(index));
  };

  return (
    <section className="py-24 px-4 sm:px-6 relative overflow-hidden" id="education">
      <div className="max-w-[1200px] mx-auto">
        {/* Education */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-8">
            <GraduationCap size={20} style={{ color: "var(--gt-primary)" }} />
            <h2 className="text-2xl font-heading font-bold tracking-widest uppercase" style={{ color: "var(--gt-fg)" }}>
              Academic_Records
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {education.map((edu, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-5 rounded-xl relative overflow-hidden transition-all duration-300 group"
                style={{ background: "var(--gt-surface)", border: "1px solid var(--gt-border)" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "color-mix(in srgb, var(--gt-primary) 40%, transparent)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--gt-border)";
                }}
              >
                {/* Top glow */}
                <div
                  className="absolute top-0 left-0 right-0 h-px"
                  style={{ background: "linear-gradient(to right, var(--gt-primary), var(--gt-accent), transparent)" }}
                />

                <h3 className="text-sm font-bold mb-1" style={{ color: "var(--gt-fg)" }}>{edu.degree}</h3>
                <p className="text-xs font-semibold" style={{ color: "var(--gt-muted-fg)" }}>{edu.institution}</p>
                <p className="text-[10px] mt-1" style={{ color: "var(--gt-muted-fg)" }}>{edu.location}</p>

                <div className="flex items-center justify-between mt-3 text-[10px] font-mono tracking-widest">
                  <span style={{ color: "var(--gt-muted-fg)" }}>{edu.period}</span>
                  <span className="font-bold" style={{ color: "var(--gt-primary)" }}>{edu.grade}</span>
                </div>

                {edu.highlights.length > 0 && (
                  <div className="mt-3 pt-3 flex flex-wrap gap-1" style={{ borderTop: "1px solid var(--gt-border)" }}>
                    {edu.highlights.map((h) => (
                      <span key={h} className="px-2 py-0.5 text-[9px] rounded uppercase tracking-wide" style={{ background: "var(--gt-surface-hover)", color: "var(--gt-muted-fg)", border: "1px solid var(--gt-border)" }}>
                        {h}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-8">
            <Award size={20} style={{ color: "var(--gt-accent)" }} />
            <h2 className="text-2xl font-heading font-bold tracking-widest uppercase" style={{ color: "var(--gt-fg)" }}>
              Achievements_Unlocked
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {certifications.map((cert, i) => {
              const isUnlocked = unlockedCerts.has(i);
              const isInProgress = cert.inProgress;

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                    transition: { delay: i * 0.08 },
                  }}
                  viewport={{ once: true }}
                  onViewportEnter={() => {
                    // Auto-unlock with delay for animation effect
                    setTimeout(() => unlockCert(i), i * 200 + 300);
                  }}
                  className="relative cursor-default"
                >
                  <div
                    className="p-5 rounded-xl transition-all duration-500 group"
                    style={{
                      background: isUnlocked ? "var(--gt-surface)" : "var(--gt-bg)",
                      border: `1px solid ${isUnlocked ? `${cert.color}40` : "var(--gt-border)"}`,
                      opacity: isUnlocked ? 1 : 0.5,
                      filter: isUnlocked ? "none" : "grayscale(100%)",
                      boxShadow: isUnlocked ? `0 0 20px ${cert.color}15` : "none",
                    }}
                    onMouseEnter={(e) => {
                      if (isUnlocked) {
                        e.currentTarget.style.boxShadow = `0 0 30px ${cert.color}25`;
                        e.currentTarget.style.transform = "translateY(-2px)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = isUnlocked ? `0 0 20px ${cert.color}15` : "none";
                      e.currentTarget.style.transform = "translateY(0)";
                    }}
                  >
                    <div className="flex items-start gap-4">
                      {/* Badge */}
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-all"
                        style={{
                          background: `${cert.color}15`,
                          border: `1px solid ${cert.color}30`,
                        }}
                      >
                        {isUnlocked ? (
                          <Unlock size={18} style={{ color: cert.color }} />
                        ) : (
                          <Lock size={18} style={{ color: "var(--gt-muted-fg)" }} />
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="text-sm font-bold leading-snug transition-colors" style={{ color: "var(--gt-fg)" }}>
                            {cert.name}
                          </h4>
                          {cert.link && cert.link !== "#" && (
                            <a href={cert.link} target="_blank" rel="noopener noreferrer" className="shrink-0">
                              <ExternalLink size={12} style={{ color: "var(--gt-muted-fg)" }} />
                            </a>
                          )}
                        </div>
                        <p className="text-xs mt-0.5" style={{ color: "var(--gt-muted-fg)" }}>{cert.issuer}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-[10px] font-mono tracking-widest" style={{ color: isInProgress ? "var(--gt-warning)" : "var(--gt-muted-fg)" }}>
                            {cert.date}
                          </span>
                          {isInProgress && (
                            <span className="text-[9px] font-mono uppercase tracking-widest px-2 py-0.5 rounded-full" style={{ background: "color-mix(in srgb, var(--gt-warning) 15%, transparent)", color: "var(--gt-warning)", border: "1px solid color-mix(in srgb, var(--gt-warning) 30%, transparent)" }}>
                              In Progress
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
