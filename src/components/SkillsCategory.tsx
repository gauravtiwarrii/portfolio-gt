
"use client";

import React from "react";
import { motion, useInView } from "framer-motion";
import { skills, skillsCategories } from "@/data/skills";
import { Code, Cloud, Server, Database, GitGraph, Box } from "lucide-react";
import { useRef } from "react";

const iconMap: Record<string, React.ElementType> = {
    Code, Cloud, Server, Database, GitGraph, Box
};

const levelToPercent: Record<string, number> = {
    Expert: 92, Advanced: 78, Intermediate: 62, Beginner: 40,
};

function SkillBar({ name, level, desc, delay }: { name: string; level: string; desc: string; delay: number }) {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-60px" });
    const pct = levelToPercent[level] ?? 60;

    return (
        <div ref={ref}>
            <div className="flex items-center justify-between mb-1.5">
                <span className="text-sm font-semibold text-zinc-200">{name}</span>
                <span className="text-xs font-mono text-zinc-500">{level}</span>
            </div>
            <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-zinc-400 to-zinc-200"
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${pct}%` } : { width: 0 }}
                    transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
                />
            </div>
            {desc && (
                <p className="text-xs text-zinc-600 mt-1 truncate">{desc}</p>
            )}
        </div>
    );
}

export default function SkillsCategory() {
    return (
        <section className="py-24 relative" id="skills">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            <div className="container mx-auto px-6 max-w-6xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-14 text-center"
                >
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-br from-white via-white to-zinc-500 bg-clip-text text-transparent">
                        Technical Arsenal
                    </h2>
                    <p className="mt-3 text-zinc-500">Tools and technologies I work with every day</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                    {skillsCategories.map((category, index) => {
                        const CategoryIcon = iconMap[category.icon];
                        const categorySkills = (skills as Record<string, any[]>)[category.id] ?? [];

                        return (
                            <motion.div
                                key={category.id}
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                                className="relative p-7 rounded-[2rem] bg-white/[0.03] backdrop-blur-2xl border border-white/[0.07] hover:bg-white/[0.06] hover:border-white/[0.12] transition-all group overflow-hidden"
                            >
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2.5 rounded-xl bg-white/5 border border-white/8 group-hover:bg-white/10 transition-colors">
                                        {CategoryIcon && <CategoryIcon size={20} className="text-zinc-300" />}
                                    </div>
                                    <h3 className="font-bold text-lg text-zinc-100">{category.title}</h3>
                                </div>

                                <div className="space-y-5">
                                    {categorySkills.map((skill: any, idx: number) => (
                                        <SkillBar
                                            key={idx}
                                            name={skill.name}
                                            level={skill.level}
                                            desc={skill.desc}
                                            delay={idx * 0.08}
                                        />
                                    ))}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
