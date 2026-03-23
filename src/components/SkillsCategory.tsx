"use client";

import { motion } from "framer-motion";
import { 
    SiPython, SiApacheairflow, SiApachespark, SiApachekafka, 
    SiPostgresql, SiMysql, SiMongodb, SiAmazonwebservices, 
    SiDocker, SiTypescript, SiNextdotjs, SiGit
} from "react-icons/si";
import { Cpu } from "lucide-react";

const techStack = [
    { icon: SiPython, name: "Python", color: "#3776AB", load: 82 },
    { icon: SiApacheairflow, name: "Airflow", color: "#017CEE", load: 67 },
    { icon: SiApachespark, name: "Spark", color: "#E25A1C", load: 74 },
    { icon: SiApachekafka, name: "Kafka", color: "#231F20", load: 58 },
    { icon: SiPostgresql, name: "PostgreSQL", color: "#4169E1", load: 45 },
    { icon: SiMysql, name: "MySQL", color: "#4479A1", load: 39 },
    { icon: SiMongodb, name: "MongoDB", color: "#47A248", load: 62 },
    { icon: SiAmazonwebservices, name: "AWS", color: "#FF9900", load: 71 },
    { icon: SiDocker, name: "Docker", color: "#2496ED", load: 55 },
    { icon: SiTypescript, name: "TypeScript", color: "#3178C6", load: 48 },
    { icon: SiNextdotjs, name: "Next.js", color: "#ffffff", load: 43 },
    { icon: SiGit, name: "Git", color: "#F05032", load: 77 },
];

export default function SkillsCategory() {
    return (
        <section className="py-24 relative z-10 font-mono" id="skills">
            <div className="mb-12 flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                    <Cpu size={20} className="text-purple-400" />
                    <h2 className="text-2xl font-bold tracking-widest uppercase text-white">Tech_Stack</h2>
                </div>
                <div className="text-[10px] text-zinc-500 tracking-widest hidden sm:flex items-center gap-2">
                    <span>{`{ DEPENDENCIES }`}</span>
                    <span className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-pulse"></span>
                </div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
            >
                {techStack.map((tech, index) => {
                    const Icon = tech.icon;
                    return (
                        <motion.div
                            key={tech.name}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05, duration: 0.3 }}
                            className="group flex flex-col p-4 bg-[#050505] border border-white/10 hover:border-purple-500/50 transition-all duration-300 relative overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-b from-purple-500/0 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            
                            {/* Top info */}
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-[9px] text-zinc-600 font-bold uppercase">{`ID:${index.toString().padStart(2, '0')}`}</span>
                                <span className="w-1.5 h-1.5 rounded-full bg-zinc-700 group-hover:bg-green-500 transition-colors"></span>
                            </div>

                            <div className="flex flex-col items-center justify-center gap-3 flex-1 mb-4 z-10">
                                <Icon
                                    size={36}
                                    className="opacity-70 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110 drop-shadow-md"
                                    style={{ color: tech.color }}
                                />
                                <span className="text-xs font-bold text-zinc-300 group-hover:text-white transition-colors tracking-wide">
                                    {tech.name}
                                </span>
                            </div>

                            <div className="mt-auto pt-3 border-t border-white/5 flex items-center justify-between text-[9px] text-zinc-500 z-10">
                                <span>LOAD:</span>
                                <span>{tech.load}%</span>
                            </div>
                        </motion.div>
                    );
                })}
            </motion.div>
        </section>
    );
}

