"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Linkedin, ArrowRight, Send, Terminal, CheckCircle, AlertCircle } from "lucide-react";

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
                setErrorMsg(data.error ?? "ERR_TRANSMISSION_FAILED");
                setStatus("error");
            }
        } catch {
            setErrorMsg("ERR_NETWORK_DISCONNECTED");
            setStatus("error");
        }
    };

    return (
        <section className="py-24 relative z-10 font-mono" id="contact">
            <div className="mb-12 flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                    <Terminal size={20} className="text-teal-400" />
                    <h2 className="text-2xl font-bold tracking-widest uppercase text-white">Secure_Channel</h2>
                </div>
                <div className="text-[10px] text-zinc-500 tracking-widest hidden sm:flex items-center gap-2">
                    <span>{`[ ENCRYPTION: ACTIVE ]`}</span>
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                {/* Contact Form */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="lg:col-span-3 bg-[#050505] border border-white/10 p-6 md:p-10 shadow-[0_0_30px_rgba(0,0,0,0.8)] relative group"
                >
                    <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-teal-500/10 to-transparent pointer-events-none"></div>

                    {status === "success" ? (
                        <div className="flex flex-col items-center justify-center py-16 text-center gap-4 h-full">
                            <CheckCircle size={40} className="text-green-400 mb-4" />
                            <h3 className="text-xl font-bold text-white tracking-widest uppercase">TRANSMISSION_LOGGED</h3>
                            <p className="text-zinc-500 text-sm">Signal received. Awaiting protocol response.</p>
                            <button
                                onClick={() => setStatus("idle")}
                                className="mt-8 px-6 py-2 border border-white/10 text-zinc-400 hover:text-white hover:border-white/30 text-xs tracking-widest uppercase transition-colors"
                            >
                                INIT_NEW_COMMS
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="text-xs text-zinc-500 uppercase tracking-widest mb-8 border-b border-white/5 pb-2">
                                Enter Transmission Data
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] text-zinc-500 tracking-widest uppercase">ID_Name</label>
                                    <input
                                        type="text"
                                        value={form.name}
                                        onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))}
                                        className="w-full bg-black border-b border-white/10 px-0 py-2 text-sm text-zinc-200 placeholder:text-zinc-700 outline-none focus:border-teal-400 transition-colors font-mono"
                                        placeholder="guest_user"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] text-zinc-500 tracking-widest uppercase">Comm_Endpoint</label>
                                    <input
                                        type="email"
                                        value={form.email}
                                        onChange={(e) => setForm(f => ({ ...f, email: e.target.value }))}
                                        className="w-full bg-black border-b border-white/10 px-0 py-2 text-sm text-zinc-200 placeholder:text-zinc-700 outline-none focus:border-teal-400 transition-colors font-mono"
                                        placeholder="email@server.com"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2 pt-4">
                                <label className="text-[10px] text-zinc-500 tracking-widest uppercase">Payload_Message</label>
                                <textarea
                                    value={form.message}
                                    onChange={(e) => setForm(f => ({ ...f, message: e.target.value }))}
                                    rows={4}
                                    className="w-full bg-[#0A0A0A] border border-white/10 p-4 text-sm text-zinc-200 placeholder:text-zinc-700 outline-none focus:border-teal-400 transition-colors font-mono resize-none"
                                    placeholder="> Hello World..."
                                    required
                                />
                            </div>

                            {status === "error" && errorMsg && (
                                <div className="flex items-center gap-3 p-3 bg-red-500/10 border border-red-500/30 text-red-400 text-xs uppercase tracking-widest">
                                    <AlertCircle size={16} />
                                    {errorMsg}
                                </div>
                            )}

                            <div className="pt-4 border-t border-white/5 flex justify-end">
                                <button
                                    type="submit"
                                    disabled={status === "sending"}
                                    className="px-8 py-3 bg-teal-500/10 border border-teal-500/30 text-teal-400 font-bold text-xs uppercase tracking-widest flex items-center gap-3 hover:bg-teal-500/20 transition-all disabled:opacity-50"
                                >
                                    {status === "sending" ? (
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
                </motion.div>

                {/* Right Column: Links */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="lg:col-span-2 flex flex-col gap-6"
                >
                    <div className="p-6 bg-[#050505] border border-white/10 flex-1 shadow-[0_0_30px_rgba(0,0,0,0.8)]">
                        <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-6 border-b border-white/5 pb-2">Direct_Routes</h3>
                        <div className="space-y-4">
                            <a href="mailto:igauravtiwari1096@gmail.com" className="flex items-center gap-4 p-4 border border-white/5 hover:border-teal-500/30 bg-[#0A0A0A] hover:bg-teal-500/5 transition-all group">
                                <Mail size={18} className="text-zinc-500 group-hover:text-teal-400 transition-colors" />
                                <div>
                                    <div className="text-[10px] text-zinc-600 tracking-widest uppercase mb-1">Email_Protocol</div>
                                    <div className="text-xs text-zinc-300">igauravtiwari1096@gmail.com</div>
                                </div>
                                <ArrowRight size={14} className="ml-auto text-zinc-700 group-hover:text-teal-400 opacity-0 group-hover:opacity-100 transition-all" />
                            </a>

                            <a href="https://linkedin.com/in/gauravtiwarrii" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 border border-white/5 hover:border-blue-500/30 bg-[#0A0A0A] hover:bg-blue-500/5 transition-all group">
                                <Linkedin size={18} className="text-zinc-500 group-hover:text-blue-400 transition-colors" />
                                <div>
                                    <div className="text-[10px] text-zinc-600 tracking-widest uppercase mb-1">LinkedIn_Network</div>
                                    <div className="text-xs text-zinc-300">@gauravtiwarrii</div>
                                </div>
                                <ArrowRight size={14} className="ml-auto text-zinc-700 group-hover:text-blue-400 opacity-0 group-hover:opacity-100 transition-all" />
                            </a>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
