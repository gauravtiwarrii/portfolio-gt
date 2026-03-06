"use client";

import { motion } from "framer-motion";
import GlassCard from "@/components/GlassCard";
import BentoGrid from "@/components/BentoGrid";
import { ExternalLink, Github, ArrowRight } from "lucide-react";
import styles from "./projects.module.css";
import { projects } from "@/data/projects";
import Link from "next/link";

export default function ProjectsPage() {
    return (
        <section className={styles.container}>
            <motion.div
                className={styles.header}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <h1 className={styles.title}>All Projects</h1>
                <p className={styles.subtitle}>Deep dive into my engineering portfolio.</p>
            </motion.div>

            <BentoGrid className={styles.grid}>
                {projects.map((project, index) => {
                    // Simple grid logic: Toggle between span 2 and span 1 for visual interest
                    // or just use span 1 for a grid of cards?
                    // Let's use the logic: 3n === 0 ? span-2 : span-1 to create a rhythm
                    const spanClass = index % 3 === 0 ? styles.colSpan2 : styles.colSpan1;

                    return (
                        <motion.div
                            key={project.slug}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className={spanClass}
                        >
                            <Link href={`/projects/${project.slug}`} className="block h-full">
                                <GlassCard className="h-full flex flex-col justify-between p-6 hover:bg-white/5 transition-colors group cursor-pointer">
                                    <div>
                                        <div className="flex justify-between items-start mb-4">
                                            <div className={styles.iconWrapper}>
                                                <project.icon size={32} className="text-blue-400 group-hover:text-blue-300 transition-colors" />
                                            </div>
                                            <div className="flex gap-2">
                                                {/* Prevent link propagation if clicking card goes to details */}
                                                <object>
                                                    <a href={project.github} target="_blank" className={styles.link} onClick={(e) => e.stopPropagation()}><Github size={20} /></a>
                                                </object>
                                                <ArrowRight size={20} className="text-gray-400 group-hover:translate-x-1 transition-transform" />
                                            </div>
                                        </div>
                                        <h3 className={styles.cardTitle}>{project.title}</h3>
                                        <p className={styles.cardDesc}>{project.description}</p>
                                    </div>
                                    <div className={styles.tags}>
                                        {project.tags.map(tag => (
                                            <span key={tag} className={styles.tag}>{tag}</span>
                                        ))}
                                    </div>
                                </GlassCard>
                            </Link>
                        </motion.div>
                    );
                })}
            </BentoGrid>
        </section>
    );
}
