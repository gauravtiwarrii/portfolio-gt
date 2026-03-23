"use client";

import { motion } from "framer-motion";
import { GraduationCap, Award, ExternalLink } from "lucide-react";

const education = [
    {
        degree: "Bachelor of Technology — Computer Science & Engineering",
        minor: "",
        institution: "Lovely Professional University",
        location: "Phagwara, Punjab",
        period: "Aug 2023 – Present",
        grade: "CGPA: 7.26",
        highlights: [
            "Data Structures & Algorithms",
            "Database Management Systems",
            "Cloud Computing",
            "Machine Learning",
            "Distributed Systems",
        ],
    },
    {
        degree: "Intermediate — PCM",
        minor: "",
        institution: "Lions School",
        location: "Mirzapur, U.P.",
        period: "Mar 2021 – May 2022",
        grade: "Percentage: 74.6%",
        highlights: [],
    },
    {
        degree: "Matriculation",
        minor: "",
        institution: "Lions School",
        location: "Mirzapur, U.P.",
        period: "Mar 2019 – May 2020",
        grade: "Percentage: 64.2%",
        highlights: [],
    },
];

const certifications = [
    {
        name: "Oracle Cloud Infrastructure 2025 Certified Data Science Professional",
        issuer: "Oracle",
        date: "Aug 2025",
        credentialId: "",
        link: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=CF58B21AFBE3D53A4CB7BF6BB442967C2042A29E60636D0F6F4273C84384E293",
        badge: "OCI",
        color: "#F80000",
    },
    {
        name: "Cloud Computing",
        issuer: "NPTEL",
        date: "Nov 2025",
        credentialId: "",
        link: "https://archive.nptel.ac.in/content/noc/NOC25/SEM2/Ecertificates/106/noc25-cs107/Course/NPTEL25CS107S145870128310531614.pdf",
        badge: "NPT",
        color: "#0F67B1",
    },
    {
        name: "Introduction to Hardware and Operating Systems (with Honors)",
        issuer: "Coursera",
        date: "Aug 2024",
        credentialId: "2XKM8OPBXWYR",
        link: "https://www.coursera.org/account/accomplishments/verify/2XKM8OPBXWYR",
        badge: "CRS",
        color: "#0056D2",
    },
    {
        name: "Crash Course on Python",
        issuer: "Coursera",
        date: "Mar 2024",
        credentialId: "ZTXYHAEJLFGC",
        link: "https://www.coursera.org/account/accomplishments/verify/ZTXYHAEJLFGC",
        badge: "CRS",
        color: "#0056D2",
    },
];

const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { delay, duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
});

export default function EducationCerts() {
    return (
        <div className="space-y-20">
            {/* ── Education ─────────────────────────────────────────── */}
            <div>
                <motion.div {...fadeUp(0)} className="mb-10 flex items-center gap-4">
                    <div className="flex items-center gap-2 text-teal-400 text-sm font-bold tracking-wider">
                        <span>{`//`}</span>
                        <p className="uppercase text-zinc-400">academic_records</p>
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                    {education.map((edu, i) => (
                        <motion.div key={i} {...fadeUp(i * 0.1)}>
                            <div className="h-full p-6 bg-[#050505] border border-white/10 rounded-xl shadow-[0_0_30px_rgba(0,0,0,0.6)] hover:border-teal-500/40 transition-all duration-500 group relative overflow-hidden">
                                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-teal-500/50 via-purple-500/30 to-transparent" />

                                <div className="flex items-start gap-3 mb-4">
                                    <div className="p-2 rounded-lg bg-teal-500/10 border border-teal-500/20 flex-shrink-0 mt-0.5">
                                        <GraduationCap size={16} className="text-teal-400" />
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-bold text-white leading-snug">{edu.degree}</h3>
                                        {edu.minor && (
                                            <span className="text-[10px] text-purple-400 font-semibold uppercase tracking-wider">{edu.minor}</span>
                                        )}
                                    </div>
                                </div>

                                <div className="space-y-1 mb-4 pl-9 text-xs text-zinc-400">
                                    <div className="text-zinc-300 font-semibold">{edu.institution}</div>
                                    <div className="text-zinc-600">{edu.location}</div>
                                    <div className="flex items-center justify-between pt-1">
                                        <span className="text-teal-500/70 font-mono text-[10px] tracking-widest">{edu.period}</span>
                                        <span className="text-green-400 font-bold text-[10px] tracking-wider">{edu.grade}</span>
                                    </div>
                                </div>

                                {edu.highlights.length > 0 && (
                                    <div className="pl-9 pt-3 border-t border-white/5">
                                        <div className="text-[9px] text-zinc-600 uppercase tracking-widest mb-2">Key Modules</div>
                                        <div className="flex flex-wrap gap-1.5">
                                            {edu.highlights.map((h) => (
                                                <span key={h} className="px-2 py-0.5 text-[9px] bg-white/[0.03] border border-white/10 text-zinc-400 rounded tracking-wide uppercase">
                                                    {h}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* ── Certifications ────────────────────────────────────── */}
            <div>
                <motion.div {...fadeUp(0)} className="mb-10 flex items-center gap-4">
                    <div className="flex items-center gap-2 text-teal-400 text-sm font-bold tracking-wider">
                        <span>{`//`}</span>
                        <p className="uppercase text-zinc-400">credentials_verified</p>
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {certifications.map((cert, i) => (
                        <motion.div key={i} {...fadeUp(i * 0.08)}>
                            <a
                                href={cert.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-4 p-5 bg-[#050505] border border-white/10 rounded-xl hover:border-white/25 hover:shadow-[0_0_20px_rgba(255,255,255,0.04)] transition-all duration-400 group"
                            >
                                {/* Badge */}
                                <div
                                    className="w-12 h-12 rounded-xl flex items-center justify-center text-xs font-black tracking-widest flex-shrink-0 border"
                                    style={{
                                        backgroundColor: cert.color + "18",
                                        borderColor: cert.color + "40",
                                        color: cert.color,
                                    }}
                                >
                                    <Award size={20} style={{ color: cert.color }} />
                                </div>

                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between gap-2">
                                        <h4 className="text-sm font-semibold text-white leading-snug group-hover:text-teal-400 transition-colors">
                                            {cert.name}
                                        </h4>
                                        <ExternalLink size={12} className="text-zinc-700 group-hover:text-zinc-400 transition-colors flex-shrink-0 mt-1" />
                                    </div>
                                    <div className="text-xs text-zinc-500 mt-0.5">{cert.issuer}</div>
                                    <div className="flex items-center gap-3 mt-2">
                                        <span className="text-[10px] font-mono text-zinc-600 tracking-widest">{cert.date}</span>
                                        <span className="text-[10px] font-mono text-zinc-700 tracking-widest">ID: {cert.credentialId}</span>
                                    </div>
                                </div>
                            </a>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
