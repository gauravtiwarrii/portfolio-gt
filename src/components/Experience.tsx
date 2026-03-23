"use client";

import { motion } from "framer-motion";
import { Terminal, Briefcase, GraduationCap, LucideIcon } from "lucide-react";

interface ExperienceItem {
    year: string;
    title: string;
    company: string;
    description: string;
    icon: LucideIcon;
    color: string;
}

const timelineData: ExperienceItem[] = [
    {
        year: "Nov 2024 - Dec 2024",
        title: "Web & Multimedia Intern",
        company: "Dreamzz Furniture",
        description: "Assisted in backend data handling and automation workflows. Improved database query performance and built internal tools for reporting.",
        icon: Briefcase,
        color: "text-blue-400"
    },
    {
        year: "2022 - 2026",
        title: "B.Tech Computer Science (Minor in Data Science)",
        company: "Lovely Professional University",
        description: "Focusing on building scalable data systems and backend infrastructure. CGPA: 7.26",
        icon: GraduationCap,
        color: "text-emerald-400"
    }
];

function ExperienceCard({ item, index }: { item: ExperienceItem; index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative pl-8 md:pl-0"
        >
            <div className="md:grid md:grid-cols-5 md:gap-8 items-start group">
                {/* Timeline Node left side on md */}
                <div className="hidden md:flex flex-col items-end pt-1">
                    <span className="text-xs font-mono font-bold text-zinc-500 uppercase tracking-widest">{item.year}</span>
                    <div className="flex items-center gap-2 mt-2">
                        <span className={`text-[10px] uppercase font-bold tracking-widest ${item.color}`}>STATUS: OK</span>
                        <div className="w-1.5 h-1.5 rounded-full bg-zinc-700 group-hover:bg-zinc-400 transition-colors"></div>
                    </div>
                </div>

                {/* Timeline Line & Icon */}
                <div className="absolute left-0 md:left-auto md:relative md:col-span-1 flex flex-col items-center h-full">
                    <div className="w-px h-full bg-white/5 absolute top-0 -z-10 group-hover:bg-white/10 transition-colors"></div>
                    <div className="p-3 bg-black border border-white/10 rounded-lg group-hover:border-white/30 transition-colors z-10 mt-1">
                        <item.icon size={20} className={item.color} />
                    </div>
                </div>

                {/* Content right side */}
                <div className="md:col-span-3 pb-12 pt-1 border-b border-white/5 group-hover:border-white/10 transition-colors">
                    <div className="md:hidden mb-3">
                        <span className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest bg-white/[0.02] px-2 py-1 rounded border border-white/5">{item.year}</span>
                    </div>
                    <h3 className="text-xl font-bold text-white tracking-tight mb-1 group-hover:text-teal-400 transition-colors">{item.title}</h3>
                    <h4 className="text-sm text-zinc-400 font-mono tracking-wide uppercase mb-4 flex items-center gap-2">
                        <Terminal size={12} />
                        {item.company}
                    </h4>
                    <p className="text-zinc-500 text-sm leading-relaxed">
                        {item.description}
                    </p>
                </div>
            </div>
        </motion.div>
    );
}

export default function Experience() {
    return (
        <section className="py-24 relative z-10 font-mono" id="experience">
            <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-6">
                <div>
                    <div className="flex items-center gap-2 text-teal-400 text-sm font-bold tracking-wider mb-4">
                        <span>{`//`}</span>
                        <span className="uppercase text-zinc-400 tracking-widest leading-none">TIMELINE_LOG</span>
                    </div>
                    <h2 className="font-bold tracking-tight leading-[1.1] text-white font-heading text-3xl md:text-5xl">
                        Experience_History
                    </h2>
                </div>
            </div>

            <div className="flex flex-col">
                {timelineData.map((item, index) => (
                    <ExperienceCard key={index} item={item} index={index} />
                ))}
            </div>
        </section>
    );
}
