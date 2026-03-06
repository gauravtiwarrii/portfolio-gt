"use client";

import { motion } from "framer-motion";
import { Briefcase, GraduationCap, LucideIcon } from "lucide-react";

interface ExperienceItem {
    year: string;
    title: string;
    company: string;
    description: string;
    icon: LucideIcon;
    color: string;
    iconColor: string;
}

const timelineData: ExperienceItem[] = [
    {
        year: "Nov 2024 - Dec 2024",
        title: "Web & Multimedia Intern",
        company: "Dreamzz Furniture",
        description: "Assisted in backend data handling and automation workflows. Improved database query performance and built internal tools for reporting.",
        icon: Briefcase,
        color: "from-blue-500/20 to-indigo-500/20",
        iconColor: "text-blue-400"
    },
    {
        year: "2022 - 2026",
        title: "B.Tech Computer Science (Minor in Data Science)",
        company: "Lovely Professional University",
        description: "Focusing on building scalable data systems and backend infrastructure. CGPA: 7.26",
        icon: GraduationCap,
        color: "from-emerald-500/20 to-green-500/20",
        iconColor: "text-emerald-400"
    }
];

function ExperienceCard({ item, index }: { item: ExperienceItem; index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full p-8 md:p-10 rounded-[2rem] bg-zinc-900/60 backdrop-blur-2xl border border-white/10 shadow-[0_8px_40px_rgba(0,0,0,0.4)] overflow-hidden group"
        >
            {/* Apple Wallet-style inner gradient overlay */}
            <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-40 group-hover:opacity-60 transition-opacity duration-500 pointer-events-none`} />

            {/* Top edge highlight */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

            <div className="relative z-10 flex flex-col md:flex-row gap-6 items-start">
                {/* Icon */}
                <div className="flex-shrink-0 p-4 rounded-2xl bg-white/5 border border-white/10 shadow-inner">
                    <item.icon size={32} className={item.iconColor} />
                </div>

                <div className="flex-grow">
                    <div className="flex flex-col md:flex-row justify-between md:items-center mb-2 gap-2">
                        <h3 className="text-xl md:text-2xl font-bold text-zinc-100 tracking-tight">{item.title}</h3>
                        <span className="text-xs font-mono font-medium px-3 py-1.5 rounded-full bg-white/10 text-zinc-300 border border-white/5 w-fit shrink-0">
                            {item.year}
                        </span>
                    </div>

                    <h4 className="text-base text-zinc-400 font-medium mb-4">{item.company}</h4>
                    <p className="text-zinc-500 leading-relaxed">
                        {item.description}
                    </p>
                </div>
            </div>
        </motion.div>
    );
}

export default function Experience() {
    return (
        <section className="py-32 relative overflow-hidden" id="experience">
            <div className="container mx-auto px-6 max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="mb-16 text-center"
                >
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-br from-white via-white to-zinc-500 bg-clip-text text-transparent">
                        Experience & Education
                    </h2>
                    <p className="mt-4 text-zinc-500 font-medium">My professional journey and academic background</p>
                </motion.div>

                <div className="flex flex-col gap-6">
                    {timelineData.map((item, index) => (
                        <ExperienceCard key={index} item={item} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}
