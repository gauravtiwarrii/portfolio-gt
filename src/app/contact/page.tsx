"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CobeGlobe } from "@/components/CobeGlobe";
import { sendEmailAction } from "@/app/actions/sendEmail";
import { Mail, Github, Linkedin, Twitter, Copy, CheckCircle2, Terminal, Send } from "lucide-react";

export default function ContactPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formStatus, setFormStatus] = useState<{ type: "success" | "error" | null; message: string }>({ type: null, message: "" });
    const [copied, setCopied] = useState(false);

    const handleCopyEmail = async () => {
        try {
            await navigator.clipboard.writeText("gaurav@example.com"); // Replace with actual email
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
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
        <section className="min-h-screen relative overflow-hidden text-white pt-24 pb-32">
            {/* Ambient Background */}
            <div className="fixed inset-0 pointer-events-none z-[-2]">
                <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-indigo-900/10 blur-[150px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-emerald-900/10 blur-[150px]" />
            </div>

            <div className="fixed inset-0 pointer-events-none z-[-1] opacity-20"
                style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

            <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">

                {/* Header */}
                <motion.div
                    className="text-center mb-16 md:mb-24 mt-12"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8 shadow-xl">
                        <Terminal size={14} className="text-emerald-400" />
                        <span className="text-sm font-mono tracking-wider text-zinc-300 uppercase">Initialize Connection</span>
                    </div>
                    <h1 className="text-5xl sm:text-7xl font-extrabold mb-6 tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-zinc-200 to-zinc-500 pb-2">
                        Get In Touch
                    </h1>
                    <p className="text-xl text-zinc-400 font-medium tracking-tight max-w-2xl mx-auto">
                        Whether you are building the next big data platform or just want to chat about system architecture, my inbox is always open.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                    {/* Left: Interactions, Globe & Information */}
                    <motion.div
                        className="flex flex-col gap-8 order-2 lg:order-1"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, delay: 0.2 }}
                    >
                        {/* 3D Globe Viewport */}
                        <div className="relative w-full aspect-square md:aspect-video lg:aspect-square max-w-[500px] mx-auto rounded-[3rem] bg-[#09090b] border border-white/10 overflow-hidden shadow-2xl flex items-center justify-center p-4">
                            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent z-10" />
                            <CobeGlobe />

                            <div className="absolute bottom-6 left-6 z-20 flex items-center gap-3 backdrop-blur-md bg-black/40 px-4 py-2 rounded-2xl border border-white/10">
                                <div className="w-2.5 h-2.5 rounded-full bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.8)] animate-pulse" />
                                <span className="text-xs font-mono uppercase tracking-widest text-white/80">
                                    Location: Earth
                                </span>
                            </div>
                        </div>

                        {/* Interactive Direct Contact Block */}
                        <div className="p-8 rounded-[2.5rem] bg-[#121214]/60 backdrop-blur-3xl border border-white/10 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            <div className="flex items-center gap-4 relative z-10 w-full md:w-auto">
                                <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                                    <Mail size={24} />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs uppercase tracking-widest text-zinc-500 font-bold mb-1">Direct Email</span>
                                    <span className="text-lg font-medium text-white truncate max-w-[200px] sm:max-w-none">gaurav@example.com</span>
                                </div>
                            </div>

                            <button
                                onClick={handleCopyEmail}
                                className="relative z-10 w-full md:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all font-medium whitespace-nowrap"
                            >
                                {copied ? <CheckCircle2 size={18} className="text-emerald-400" /> : <Copy size={18} className="text-zinc-400" />}
                                {copied ? <span className="text-emerald-400">Copied!</span> : <span className="text-zinc-300">Copy Address</span>}
                            </button>
                        </div>

                        {/* Social Network Array */}
                        <div className="flex items-center gap-4 wrap">
                            {[
                                { icon: Github, label: "GitHub", href: "https://github.com/yourusername" },
                                { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/in/yourusername" },
                                { icon: Twitter, label: "Twitter", href: "https://twitter.com/yourusername" },
                            ].map((social, i) => (
                                <a
                                    key={i}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all flex flex-col items-center justify-center gap-3 group"
                                >
                                    <social.icon size={28} className="text-zinc-400 group-hover:text-indigo-400 transition-colors" />
                                    <span className="text-xs uppercase tracking-widest text-zinc-500 group-hover:text-zinc-300 transition-colors font-medium">
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
                        <div className="relative p-8 sm:p-12 rounded-[3rem] bg-[#121214]/80 backdrop-blur-3xl border border-white/[0.08] shadow-[0_20px_60px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.08)]">
                            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />

                            <h2 className="text-2xl font-bold mb-8 text-white flex items-center gap-3">
                                Transmit Message
                            </h2>

                            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="name" className="text-xs uppercase tracking-widest text-zinc-400 font-bold ml-2">System Identity // Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        required
                                        placeholder="John Doe"
                                        className="w-full bg-[#09090b] border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-zinc-600 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all font-medium"
                                    />
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label htmlFor="email" className="text-xs uppercase tracking-widest text-zinc-400 font-bold ml-2">Return Address // Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        required
                                        placeholder="john@example.com"
                                        className="w-full bg-[#09090b] border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-zinc-600 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all font-medium"
                                    />
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label htmlFor="message" className="text-xs uppercase tracking-widest text-zinc-400 font-bold ml-2">Encrypted Payload // Message</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        required
                                        rows={5}
                                        placeholder="Initialize project parameters here..."
                                        className="w-full bg-[#09090b] border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-zinc-600 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all font-medium resize-none"
                                    ></textarea>
                                </div>

                                {/* Status Messages */}
                                {formStatus.type === "success" && (
                                    <div className="px-6 py-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium flex items-center gap-3">
                                        <CheckCircle2 size={18} />
                                        {formStatus.message}
                                    </div>
                                )}
                                {formStatus.type === "error" && (
                                    <div className="px-6 py-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium">
                                        {formStatus.message}
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="relative w-full group flex items-center justify-center gap-3 bg-white text-black px-8 py-5 rounded-2xl font-bold tracking-wide hover:bg-zinc-200 transition-all mt-4 disabled:opacity-70 disabled:cursor-not-allowed overflow-hidden shadow-[0_0_40px_rgba(255,255,255,0.1)] hover:shadow-[0_0_60px_rgba(255,255,255,0.2)]"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-emerald-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    <span className="relative z-10">{isSubmitting ? "Transmitting..." : "Send Secure Message"}</span>
                                    {!isSubmitting && <Send size={18} className="relative z-10 group-hover:translate-x-1 transition-transform" />}
                                </button>
                            </form>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

