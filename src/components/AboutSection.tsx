"use client";

import { motion } from "framer-motion";
import { Terminal, Code2, Play } from "lucide-react";

const LINE_NUMBERS = Array.from({ length: 19 }, (_, i) => i + 1);

export default function AboutSection() {
    const lines = LINE_NUMBERS;

    return (
        <section className="py-24 px-4 sm:px-6 bg-black font-mono relative overflow-hidden" id="about">
            <div className="absolute inset-0 bg-tech-grid opacity-5 pointer-events-none mix-blend-screen mask-image:linear-gradient(to_bottom,black,transparent)"></div>
            
            <div className="max-w-[1400px] mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6"
                >
                    <div>
                        <div className="flex items-center gap-2 text-teal-400 text-sm font-bold tracking-wider mb-4">
                            <span>{`//`}</span>
                            <span className="uppercase text-zinc-400 tracking-widest leading-none">SYSTEM_ARCHITECTURE</span>
                        </div>
                        <h2 className="font-bold tracking-tight leading-[1.1] text-white font-heading" style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}>
                            Engineering <br /> 
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-purple-500">
                                Scalable Solutions
                            </span>
                        </h2>
                    </div>
                    
                    <div className="hidden md:flex gap-4">
                        <div className="text-xs text-zinc-500 text-right bg-white/[0.02] border border-white/5 p-3 rounded-lg">
                            <div>STATUS: <span className="text-green-400 font-bold">OPTIMIZED</span></div>
                            <div>COMPILER: <span className="text-purple-400 font-bold">v18.2.0</span></div>
                        </div>
                    </div>
                </motion.div>

                {/* IDE Layout */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="grid grid-cols-1 lg:grid-cols-12 gap-0 border border-white/10 rounded-xl overflow-hidden shadow-[0_0_30px_rgba(45,212,191,0.05)] bg-[#0A0A0A]"
                >
                    {/* Left Pane: Code Editor */}
                    <div className="col-span-1 lg:col-span-7 border-b lg:border-b-0 lg:border-r border-white/10 flex flex-col">
                        <div className="h-10 border-b border-white/10 flex items-center justify-between px-4 bg-white/[0.03]">
                            <div className="flex items-center gap-2">
                                <Code2 size={14} className="text-teal-400" />
                                <span className="text-xs text-zinc-300 font-semibold tracking-wider">about.ts</span>
                            </div>
                            <div className="hidden sm:flex gap-2">
                                <div className="w-2.5 h-2.5 rounded-full bg-zinc-700"></div>
                                <div className="w-2.5 h-2.5 rounded-full bg-zinc-700"></div>
                            </div>
                        </div>
                        <div className="flex-1 p-4 flex gap-4 overflow-x-auto text-[13px] md:text-sm leading-relaxed text-zinc-300">
                            {/* Line Numbers */}
                            <div className="flex flex-col text-zinc-700 select-none text-right min-w-[1.5rem] text-xs pt-[2px]">
                                {lines.map(l => <span key={l}>{l}</span>)}
                            </div>
                            {/* Code Content */}
                            <div className="flex-1 min-w-[500px]">
                                <div><span className="text-purple-400 font-medium">import</span> {`{ ProfessionalEngineer }`} <span className="text-purple-400 font-medium">from</span> <span className="text-yellow-300">{`'@core/identity'`}</span>;</div>
                                <div><span className="text-purple-400 font-medium">import</span> {`{ Pipeline, Architecture }`} <span className="text-purple-400 font-medium">from</span> <span className="text-yellow-300">{`'@gcp/dataflow'`}</span>;</div>
                                <br />
                                <div><span className="text-purple-400 font-medium">export class</span> <span className="text-emerald-400 font-semibold">GauravTiwari</span> <span className="text-purple-400 font-medium">implements</span> <span className="text-teal-400 font-semibold">ProfessionalEngineer</span> {`{`}</div>
                                <div className="pl-6"><span className="text-zinc-500 italic">{`/**`}</span></div>
                                <div className="pl-6"><span className="text-zinc-500 italic">{` * Engineering enterprise-scale, GCP-native pipelines`}</span></div>
                                <div className="pl-6"><span className="text-zinc-500 italic">{` * powered by BigQuery, Dataflow, and Pub/Sub —`}</span></div>
                                <div className="pl-6"><span className="text-zinc-500 italic">{` * turning raw data into strategic assets at scale.`}</span></div>
                                <div className="pl-6"><span className="text-zinc-500 italic">{` */`}</span></div>
                                <div className="pl-6"><span className="text-blue-400">role</span>: <span className="text-yellow-300">{`"Professional Data Engineer"`}</span>;</div>
                                <div className="pl-6"><span className="text-blue-400">location</span>: <span className="text-yellow-300">{`"India"`}</span>;</div>
                                <br />
                                <div className="pl-6"><span className="text-red-400 font-medium">async</span> <span className="text-blue-400">buildInfrastructure</span>() {`{`}</div>
                                <div className="pl-12"><span className="text-purple-400 font-medium">return new</span> <span className="text-emerald-400 font-semibold">Pipeline</span>({`{`} </div>
                                <div className="pl-16">scalable: <span className="text-purple-400">true</span>,</div>
                                <div className="pl-16">cloud: <span className="text-yellow-300">{`"gcp"`}</span>,</div>
                                <div className="pl-16">latency: <span className="text-yellow-300">{`"sub-second"`}</span></div>
                                <div className="pl-12">{`});`}</div>
                                <div className="pl-6">{`}`}</div>
                                <div>{`}`}</div>
                            </div>
                        </div>
                    </div>

                    {/* Right Pane: Terminal Output */}
                    <div className="col-span-1 lg:col-span-5 flex flex-col bg-[#020202]">
                        <div className="h-10 border-b border-white/10 flex items-center justify-between px-4 bg-white/[0.03]">
                            <div className="flex items-center gap-2">
                                <Terminal size={14} className="text-purple-400" />
                                <span className="text-xs text-zinc-300 font-semibold tracking-wider">Execution Log</span>
                            </div>
                            <button className="flex items-center gap-1.5 px-3 py-1 rounded bg-green-500/10 border border-green-500/30 text-[10px] text-green-400 hover:bg-green-500/20 hover:border-green-400 transition-colors font-bold tracking-widest">
                                <Play size={10} fill="currentColor" /> RUN
                            </button>
                        </div>
                        <div className="flex-1 p-5 text-[12px] opacity-90 overflow-y-auto space-y-3">
                            <div className="flex items-center gap-2">
                                <span className="text-purple-400 font-bold">{`>`}</span>
                                <span className="text-zinc-300">tsc about.ts --outDir ./dist</span>
                            </div>
                            <div className="text-zinc-500 pl-4 border-l border-white/10 ml-1">Compiling 1 file...</div>
                            <div className="text-green-400 pl-4 border-l border-white/10 ml-1">✓ Compilation successful. Time: 142ms</div>
                            <br />
                            <div className="flex items-center gap-2">
                                <span className="text-purple-400 font-bold">{`>`}</span>
                                <span className="text-zinc-300">node ./dist/about.js</span>
                            </div>
                            <div className="text-zinc-400 pl-4 border-l border-white/10 ml-1">Initializing Professional Data Engineer Instance...</div>
                            <div className="text-yellow-500 border-l border-yellow-500/50 pl-4 ml-1 space-y-1">
                                <div>[INFO] Connecting to Cloud Infrastructure...</div>
                                <div>[INFO] Establishing real-time pipelines...</div>
                                <div>[INFO] Optimizing query performance...</div>
                            </div>
                            <div className="text-emerald-400 mt-4 font-bold flex items-center gap-2">
                                INSTANCE_DEPLOYED_SUCCESSFULLY
                                <span className="animate-blink inline-block w-2.5 h-4 bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]"></span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
