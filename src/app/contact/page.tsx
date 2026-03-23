"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CobeGlobe } from "@/components/CobeGlobe";
import { sendEmailAction } from "@/app/actions/sendEmail";
import { Mail, Github, Linkedin, Twitter, Copy, CheckCircle2, Terminal, Send, Activity, AlertCircle } from "lucide-react";

export default function ContactPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formStatus, setFormStatus] = useState<{ type: "success" | "error" | null; message: string }>({ type: null, message: "" });
    const [copied, setCopied] = useState(false);

    const handleCopyEmail = async () => {
        try {
            await navigator.clipboard.writeText("gaurav@example.com"); // Replace with actual email
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            console.error("Failed to copy email");
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setFormStatus({ type: null, message: "" });

        const formData = new FormData(e.currentTarget);
        const result = await sendEmailAction(formData);

        if (result.error) {
            setFormStatus({ type: "error", message: result.error });
        } else if (result.success) {
            setFormStatus({ type: "success", message: result.message! });
            (e.target as HTMLFormElement).reset();
        }

        setIsSubmitting(false);
    };

    return (
        <section className="min-h-screen relative overflow-hidden bg-black text-white selection:bg-teal-500/30 pt-28 pb-32 font-mono">
            {/* Ambient Tech Grid Background */}
            <div className="fixed inset-0 bg-tech-grid opacity-10 pointer-events-none mix-blend-screen mask-image:linear-gradient(to_bottom,black,transparent)"></div>

            <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
                {/* Header */}
                <motion.div
                    className="mb-16 border-b border-white/10 pb-8 mt-12"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    <div className="flex items-center gap-2 mb-6 text-teal-400 text-sm font-bold tracking-wider">
                        <span>{`//`}</span>
                        <p className="uppercase text-zinc-400">global_initialization /protocol</p>
                    </div>

                    <h1 className="text-5xl sm:text-7xl font-bold mb-6 tracking-tighter text-white font-heading">
                        Comms_Link
                        <span className="text-teal-500/50 animate-pulse ml-2">_</span>
                    </h1>
                    <p className="text-lg md:text-xl text-zinc-400 font-medium tracking-tight max-w-2xl border-l-2 border-teal-500/30 pl-4 bg-white/[0.02] py-2">
                        Whether you are building the next big data platform or just want to chat about system architecture, my inbox is always open.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
                    {/* Left: Interactions, Globe & Information */}
                    <motion.div
                        className="flex flex-col gap-6 order-2 lg:order-1"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, delay: 0.2 }}
                    >
                        {/* 3D Globe Viewport / Telemetry Datapost */}
                        <div className="relative w-full aspect-square md:aspect-video lg:aspect-square max-w-[500px] border border-white/10 bg-[#050505] shadow-[0_0_30px_rgba(0,0,0,0.8)] overflow-hidden flex items-center justify-center p-4 group">
                            <div className="absolute top-0 right-0 p-4 z-20 flex items-center justify-between text-[10px] text-teal-400 font-bold tracking-widest uppercase opacity-70 group-hover:opacity-100 transition-opacity w-full">
                                <span>TELEMETRY_DATAPOST</span>
                                <span className="flex items-center gap-2"><Activity size={12} className="animate-pulse" /> TRACKING_ACTIVE</span>
                            </div>
                            
                            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-teal-500/50 to-transparent z-10" />
                            
                            {/* Globe */}
                            <div className="scale-[0.8] sm:scale-100 w-full h-full flex items-center justify-center pt-8">
                                <CobeGlobe />
                            </div>

                            <div className="absolute bottom-4 left-4 z-20 space-y-2 bg-black/60 backdrop-blur-md p-3 rounded border border-white/10 w-[calc(100%-32px)]">
                                <div className="flex justify-between items-center text-[10px] tracking-widest text-zinc-400 uppercase">
                                    <span>Signal_Origin</span>
                                    <span className="text-green-400 flex items-center gap-1">
                                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,1)]"></div>
                                        Earth_Node
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Interactive Direct Contact Block */}
                        <div className="p-6 bg-[#0A0A0A] border border-white/5 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 relative group hover:border-teal-500/30 transition-all">
                            <div className="absolute inset-0 bg-gradient-to-r from-teal-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                            <div className="flex items-center gap-4 relative z-10 w-full md:w-auto">
                                <div className="w-12 h-12 bg-black border border-white/10 flex items-center justify-center text-teal-400 shrink-0">
                                    <Mail size={20} />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-1">Direct_Protocol</span>
                                    <span className="text-sm font-medium text-white max-w-[200px] sm:max-w-none">gaurav@example.com</span>
                                </div>
                            </div>

                            <button
                                onClick={handleCopyEmail}
                                className="relative z-10 w-full md:w-auto flex items-center justify-center gap-3 px-6 py-3 bg-black border border-white/10 hover:bg-teal-500/10 hover:border-teal-500/40 transition-all whitespace-nowrap group/btn"
                            >
                                {copied ? <CheckCircle2 size={16} className="text-green-400" /> : <Copy size={16} className="text-zinc-400 group-hover/btn:text-teal-400 transition-colors" />}
                                {copied ? <span className="text-green-400 text-xs font-bold uppercase tracking-widest">Sys_Copied</span> : <span className="text-zinc-300 text-xs font-bold uppercase tracking-widest group-hover/btn:text-white transition-colors">Copy_Address</span>}
                            </button>
                        </div>

                        {/* Social Network Array */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {[
                                { icon: Github, label: "GitHub_Repo", href: "https://github.com/yourusername" },
                                { icon: Linkedin, label: "LinkedIn_Net", href: "https://linkedin.com/in/yourusername" },
                                { icon: Twitter, label: "Twitter_Feed", href: "https://twitter.com/yourusername" },
                            ].map((social, i) => (
                                <a
                                    key={i}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-4 bg-[#050505] border border-white/5 hover:border-teal-500/30 hover:bg-teal-500/5 transition-all flex flex-col items-center justify-center gap-4 group"
                                >
                                    <social.icon size={24} className="text-zinc-500 group-hover:text-teal-400 transition-colors" />
                                    <span className="text-[10px] uppercase tracking-widest text-zinc-500 group-hover:text-zinc-300 transition-colors font-bold">
                                        {social.label}
                                    </span>
                                </a>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right: The Advanced Contact Form */}
                    <motion.div
                        className="order-1 lg:order-2"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, delay: 0.3 }}
                    >
                        <div className="relative p-8 md:p-10 bg-[#050505] border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.8)] group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-teal-500/10 to-transparent pointer-events-none"></div>

                            <div className="flex justify-between items-center mb-8 border-b border-white/5 pb-6">
                                <h2 className="text-xl sm:text-2xl font-bold text-teal-400 flex items-center gap-3 uppercase tracking-widest">
                                    <Terminal size={24} className="text-teal-400" />
                                    Secure_Comms
                                </h2>
                                <div className="hidden sm:flex items-center gap-3 px-3 py-1 border border-green-500/30 bg-green-500/10 rounded text-green-400 text-[10px] font-bold tracking-widest">
                                    <span>ENCRYPTION: SHIELDED</span>
                                </div>
                            </div>

                            {formStatus.type === "success" ? (
                                <div className="flex flex-col items-center justify-center py-20 text-center gap-4 h-full">
                                    <CheckCircle2 size={40} className="text-green-400 mb-4" />
                                    <h3 className="text-xl font-bold text-white tracking-widest uppercase">TRANSMISSION_LOGGED</h3>
                                    <p className="text-zinc-500 text-sm">Signal received. Protocol acknowledged.</p>
                                    <button
                                        onClick={() => setFormStatus({ type: null, message: "" })}
                                        className="mt-8 px-6 py-2 border border-white/10 text-zinc-400 hover:text-white hover:border-white/30 text-xs tracking-widest uppercase transition-colors"
                                    >
                                        INIT_NEW_COMMS
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="flex flex-col gap-6 relative z-10">
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="name" className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold ml-1">ID_Name</label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            required
                                            placeholder="guest_user"
                                            className="w-full bg-black border-b border-white/10 px-0 py-3 text-sm text-zinc-200 placeholder:text-zinc-700 outline-none focus:border-teal-400 transition-colors font-mono"
                                        />
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="email" className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold ml-1">Comm_Endpoint</label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            required
                                            placeholder="email@server.com"
                                            className="w-full bg-black border-b border-white/10 px-0 py-3 text-sm text-zinc-200 placeholder:text-zinc-700 outline-none focus:border-teal-400 transition-colors font-mono"
                                        />
                                    </div>

                                    <div className="flex flex-col gap-2 pt-2">
                                        <label htmlFor="message" className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold ml-1">Payload_Message</label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            required
                                            rows={5}
                                            placeholder="> Initialize project parameters here..."
                                            className="w-full bg-[#0A0A0A] border border-white/10 p-4 text-sm text-zinc-200 placeholder:text-zinc-700 outline-none focus:border-teal-400 transition-colors font-mono resize-none"
                                        ></textarea>
                                    </div>

                                    {formStatus.type === "error" && (
                                        <div className="flex items-center gap-3 p-3 bg-red-500/10 border border-red-500/30 text-red-400 text-xs uppercase tracking-widest mt-2">
                                            <AlertCircle size={16} />
                                            {formStatus.message}
                                        </div>
                                    )}

                                    <div className="pt-6 mt-2 border-t border-white/5 flex justify-end">
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="px-8 py-4 bg-teal-500/10 border border-teal-500/30 text-teal-400 font-bold text-xs uppercase tracking-widest flex items-center gap-3 hover:bg-teal-500/20 transition-all disabled:opacity-50 w-full sm:w-auto justify-center"
                                        >
                                            {isSubmitting ? (
                                                <div className="w-4 h-4 border-2 border-teal-400/20 border-t-teal-400 rounded-full animate-spin" />
                                            ) : (
                                                <>
                                                    <Send size={14} /> EXECUTE_SEND
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
