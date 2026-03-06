
"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Linkedin, Calendar, ArrowRight, Send, CheckCircle, AlertCircle, User, MessageSquare } from "lucide-react";

export default function ContactSection() {
    const [form, setForm] = useState({ name: "", email: "", message: "" });
    const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
    const [errorMsg, setErrorMsg] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("sending");
        setErrorMsg("");

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            if (res.ok) {
                setStatus("success");
                setForm({ name: "", email: "", message: "" });
            } else {
                const data = await res.json();
                setErrorMsg(data.error ?? "Something went wrong. Please try again.");
                setStatus("error");
            }
        } catch {
            setErrorMsg("Network error. Please try again.");
            setStatus("error");
        }
    };

    return (
        <section className="py-24 md:py-36 relative overflow-hidden" id="contact">
            {/* Background glows */}
            <div className="absolute top-1/4 right-0 w-[500px] h-[400px] bg-indigo-500/8 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[300px] bg-purple-500/8 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            <div className="container mx-auto px-6 max-w-6xl">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-br from-white via-white to-zinc-500 bg-clip-text text-transparent mb-4">
                        Let&apos;s Work Together
                    </h2>
                    <p className="text-zinc-500 text-lg max-w-xl mx-auto">
                        Have a project in mind or just want to say hi? My inbox is always open.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -24 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                        className="lg:col-span-3"
                    >
                        <div className="relative p-8 md:p-10 rounded-[2rem] bg-white/[0.03] backdrop-blur-2xl border border-white/[0.08] shadow-[0_8px_40px_rgba(0,0,0,0.3)] overflow-hidden">
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

                            {status === "success" ? (
                                <div className="flex flex-col items-center justify-center py-16 text-center gap-4">
                                    <div className="p-5 rounded-3xl bg-emerald-500/20 border border-emerald-500/30">
                                        <CheckCircle size={40} className="text-emerald-400" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-white">Message sent!</h3>
                                    <p className="text-zinc-500">Thanks for reaching out. I&apos;ll get back to you soon.</p>
                                    <button
                                        onClick={() => setStatus("idle")}
                                        className="mt-4 px-6 py-2.5 rounded-2xl bg-white/10 border border-white/10 text-zinc-300 hover:text-white text-sm font-medium transition-colors"
                                    >
                                        Send another message
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-5">
                                    <h3 className="text-xl font-bold text-zinc-100 mb-6">Send a message</h3>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="relative">
                                            <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
                                            <input
                                                type="text"
                                                placeholder="Your Name"
                                                value={form.name}
                                                onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))}
                                                className="w-full pl-11 pr-4 py-3.5 bg-zinc-900/60 border border-white/[0.08] rounded-2xl text-zinc-200 placeholder:text-zinc-600 outline-none focus:border-white/25 focus:bg-zinc-900/80 transition-all"
                                                required
                                            />
                                        </div>
                                        <div className="relative">
                                            <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
                                            <input
                                                type="email"
                                                placeholder="your@email.com"
                                                value={form.email}
                                                onChange={(e) => setForm(f => ({ ...f, email: e.target.value }))}
                                                className="w-full pl-11 pr-4 py-3.5 bg-zinc-900/60 border border-white/[0.08] rounded-2xl text-zinc-200 placeholder:text-zinc-600 outline-none focus:border-white/25 focus:bg-zinc-900/80 transition-all"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="relative">
                                        <MessageSquare size={16} className="absolute left-4 top-4 text-zinc-500" />
                                        <textarea
                                            placeholder="Tell me about your project or just say hello..."
                                            value={form.message}
                                            onChange={(e) => setForm(f => ({ ...f, message: e.target.value }))}
                                            rows={5}
                                            className="w-full pl-11 pr-4 py-3.5 bg-zinc-900/60 border border-white/[0.08] rounded-2xl text-zinc-200 placeholder:text-zinc-600 outline-none focus:border-white/25 focus:bg-zinc-900/80 transition-all resize-none"
                                            required
                                        />
                                    </div>

                                    {status === "error" && errorMsg && (
                                        <div className="flex items-center gap-2 px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-sm">
                                            <AlertCircle size={16} />
                                            {errorMsg}
                                        </div>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={status === "sending"}
                                        className="w-full py-4 rounded-2xl bg-white text-black font-semibold flex items-center justify-center gap-2 hover:bg-zinc-100 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                                    >
                                        {status === "sending" ? (
                                            <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                                        ) : (
                                            <>
                                                <Send size={16} /> Send Message
                                            </>
                                        )}
                                    </button>
                                </form>
                            )}
                        </div>
                    </motion.div>

                    {/* Right Column: Quick Links + Booking */}
                    <motion.div
                        initial={{ opacity: 0, x: 24 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                        className="lg:col-span-2 flex flex-col gap-5"
                    >
                        {/* Direct Links */}
                        <div className="p-7 rounded-[2rem] bg-white/[0.03] backdrop-blur-2xl border border-white/[0.08]">
                            <h3 className="text-sm font-semibold uppercase tracking-widest text-zinc-500 mb-5">Direct Contact</h3>
                            <div className="space-y-3">
                                <a href="mailto:gaurav@example.com" className="flex items-center gap-3 p-3.5 rounded-2xl bg-zinc-900/40 border border-white/5 text-zinc-300 hover:text-white hover:border-white/15 transition-all group">
                                    <div className="p-2 rounded-xl bg-white/5 group-hover:bg-white/10 transition-colors">
                                        <Mail size={18} />
                                    </div>
                                    <div>
                                        <div className="text-xs text-zinc-600 mb-0.5">Email</div>
                                        <div className="text-sm font-medium">gaurav@example.com</div>
                                    </div>
                                    <ArrowRight size={14} className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                                </a>
                                <a href="https://linkedin.com/in/gauravtiwarrii" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3.5 rounded-2xl bg-zinc-900/40 border border-white/5 text-zinc-300 hover:text-white hover:border-white/15 transition-all group">
                                    <div className="p-2 rounded-xl bg-white/5 group-hover:bg-white/10 transition-colors">
                                        <Linkedin size={18} />
                                    </div>
                                    <div>
                                        <div className="text-xs text-zinc-600 mb-0.5">LinkedIn</div>
                                        <div className="text-sm font-medium">@gauravtiwarrii</div>
                                    </div>
                                    <ArrowRight size={14} className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                                </a>
                            </div>
                        </div>

                        {/* Booking Card */}
                        <div className="relative p-7 rounded-[2rem] bg-white/[0.03] backdrop-blur-2xl border border-white/[0.08] overflow-hidden flex-grow">
                            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 pointer-events-none" />
                            <div className="relative z-10">
                                <div className="p-3.5 rounded-2xl bg-indigo-500/20 border border-indigo-500/20 w-fit mb-5">
                                    <Calendar size={24} className="text-indigo-400" />
                                </div>
                                <h3 className="text-lg font-bold text-white mb-2">Book a 15-min Chat</h3>
                                <p className="text-sm text-zinc-500 mb-6 leading-relaxed">Discuss your data infrastructure, get architectural advice, or just a virtual coffee. ☕</p>
                                <a
                                    href="https://calendly.com/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-colors"
                                >
                                    Schedule Meeting <ArrowRight size={16} />
                                </a>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}


