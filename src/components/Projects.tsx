"use client";

import BentoGrid from "./BentoGrid";
import GlassCard from "./GlassCard";
import MagneticButton from "./MagneticButton";
import styles from "./Projects.module.css";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Terminal, Github, ExternalLink } from "lucide-react";
import { projects } from "@/data/projects";
import Link from "next/link";
import { useRef, MouseEvent } from "react";

// ── 3D Tilt Card Wrapper ──────────────────────────────────────────────────────
function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), { stiffness: 200, damping: 20 });
    const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), { stiffness: 200, damping: 20 });

    const handleMove = (e: MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        x.set((e.clientX - rect.left) / rect.width - 0.5);
        y.set((e.clientY - rect.top) / rect.height - 0.5);
    };
    const handleLeave = () => { x.set(0); y.set(0); };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMove}
            onMouseLeave={handleLeave}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 800 }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

export default function Projects() {
    const featuredProjects = projects.filter(p => p.featured);

    return (
        <section className={styles.section} id="projects">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-14"
            >
                <p className="text-[10px] font-mono uppercase tracking-[0.4em] text-zinc-600 mb-3">{"// selected works"}</p>
                <h2 className={styles.heading}>Selected Works</h2>
            </motion.div>

            <BentoGrid className={styles.grid}>
                {featuredProjects.map((project, index) => {
                    let spanClass = styles.colSpan2;
                    if (index === 2) spanClass = styles.colSpan2;

                    return (
                        <TiltCard key={project.slug} className={spanClass}>
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="h-full"
                            >
                                <Link href={`/projects/${project.slug}`} className="block h-full">
                                    <GlassCard className="h-full flex flex-col hover:bg-white/[0.06] transition-all cursor-pointer group relative overflow-hidden">
                                        {/* Animated top border on hover */}
                                        <motion.div
                                            className="absolute top-0 left-0 h-px bg-gradient-to-r from-transparent via-indigo-400 to-transparent w-0 group-hover:w-full transition-all duration-700 z-10"
                                        />

                                        {/* Visual Header Preview */}
                                        <div className="h-32 min-h-[128px] w-full relative overflow-hidden bg-gradient-to-br from-indigo-500/5 to-purple-500/5 border-b border-white/5 flex items-center justify-center shrink-0">
                                            <div className="absolute inset-0 opacity-[0.15]" style={{
                                                backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.8) 1px, transparent 0)',
                                                backgroundSize: '24px 24px'
                                            }} />
                                            <project.icon size={64} className="text-white/10 group-hover:scale-110 group-hover:text-white/20 transition-all duration-500" />
                                        </div>

                                        <div className="p-6 flex-grow flex flex-col justify-between">
                                            <div>
                                                <div className="flex justify-between items-start mb-4">
                                                    <div className={styles.iconWrapper}>
                                                        <project.icon size={28} className="text-indigo-400 group-hover:text-indigo-300 transition-colors" />
                                                    </div>
                                                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <span className="font-mono text-[10px] text-zinc-400 tracking-wider">&gt;_ {project.tags[0]?.toLowerCase()}</span>
                                                        <ExternalLink size={14} className="text-zinc-400" />
                                                    </div>
                                                </div>
                                                <h3 className={styles.cardTitle}>{project.title}</h3>
                                                <p className={styles.cardDesc}>{project.description}</p>
                                            </div>
                                            <div className={styles.tags}>
                                                {project.tags.slice(0, 3).map(tag => (
                                                    <span key={tag}>{tag}</span>
                                                ))}
                                            </div>
                                        </div>
                                    </GlassCard>
                                </Link>
                            </motion.div>
                        </TiltCard>
                    );
                })}

                {/* Skills Terminal */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className={styles.colSpan1}
                >
                    <MagneticButton className="h-full w-full text-left">
                        <GlassCard className="h-full font-mono text-sm group hover:bg-white/[0.06] transition-colors p-6">
                            <div className="flex items-center gap-2 mb-3 opacity-60">
                                <Terminal size={14} />
                                <span className="text-xs text-zinc-300">skills.sh</span>
                                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            </div>
                            <div className="text-green-400 text-xs space-y-1">
                                <div><span className="text-zinc-500">$</span> ./list-skills</div>
                                {["Python", "SQL", "AWS", "dbt", "Spark"].map((s, i) => (
                                    <motion.div
                                        key={s}
                                        initial={{ opacity: 0, x: -4 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.12 }}
                                    >
                                        <span className="text-zinc-500">&gt; </span><span className="text-zinc-200">{s}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </GlassCard>
                    </MagneticButton>
                </motion.div>

                {/* GitHub Feed */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className={styles.colSpan3}
                >
                    <Link href="https://github.com/gauravtiwarrii" target="_blank" className="block h-full">
                        <GlassCard className="h-full flex items-center justify-between hover:bg-white/[0.06] transition-colors group p-6">
                            <div className="flex items-center gap-4">
                                <Github size={36} className="text-zinc-300 group-hover:text-white transition-colors" />
                                <div>
                                    <h3 className={styles.cardTitle}>@gauravtiwarrii</h3>
                                    <p className={styles.cardDesc}>Check out my latest commits and contributions.</p>
                                </div>
                            </div>
                            <div className={styles.stat}>
                                <span className="text-2xl font-bold text-zinc-100">1,204</span>
                                <span className="text-xs opacity-70 block text-zinc-300">Commits</span>
                            </div>
                        </GlassCard>
                    </Link>
                </motion.div>
            </BentoGrid>
        </section>
    );
}
