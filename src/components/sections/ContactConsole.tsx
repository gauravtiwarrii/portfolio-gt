"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Linkedin, Send, Terminal, CheckCircle, AlertCircle, ArrowRight } from "lucide-react";

export default function ContactConsole() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [charCount, setCharCount] = useState(0);

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
        setCharCount(0);
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

  const isValid = form.name.length > 0 && form.email.includes("@") && form.message.length > 10;

  return (
    <section className="py-24 px-4 sm:px-6 relative z-10" id="contact">
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="mb-12 flex items-center justify-between pb-4" style={{ borderBottom: "1px solid var(--gt-border)" }}>
          <div className="flex items-center gap-3">
            <Terminal size={20} style={{ color: "var(--gt-primary)" }} />
            <h2 className="text-2xl font-heading font-bold tracking-widest uppercase" style={{ color: "var(--gt-fg)" }}>
              Comm_Console
            </h2>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-[10px] font-mono tracking-widest" style={{ color: "var(--gt-muted-fg)" }}>
            <span>{"[ ENCRYPTION: ACTIVE ]"}</span>
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3 p-6 md:p-8 rounded-xl relative group"
            style={{ background: "var(--gt-surface)", border: "1px solid var(--gt-border)" }}
          >
            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="flex flex-col items-center justify-center py-16 text-center gap-4 h-full"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <CheckCircle size={48} className="text-green-400 mb-4" />
                  </motion.div>
                  <h3 className="text-xl font-heading font-bold tracking-widest uppercase" style={{ color: "var(--gt-fg)" }}>
                    TRANSMISSION_LOGGED
                  </h3>
                  <p className="text-sm" style={{ color: "var(--gt-muted-fg)" }}>
                    Signal received. Awaiting protocol response.
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="mt-8 px-6 py-2 text-xs font-mono tracking-widest uppercase transition-all rounded"
                    style={{ border: "1px solid var(--gt-border)", color: "var(--gt-muted-fg)" }}
                  >
                    INIT_NEW_COMMS
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  <div className="text-xs font-mono uppercase tracking-widest pb-3" style={{ color: "var(--gt-muted-fg)", borderBottom: "1px solid var(--gt-border)" }}>
                    {">"} Enter Transmission Data
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-mono uppercase tracking-widest" style={{ color: "var(--gt-muted-fg)" }}>
                        ID_Name
                      </label>
                      <input
                        type="text"
                        value={form.name}
                        onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                        className="w-full px-0 py-2 text-sm font-mono outline-none transition-colors"
                        style={{
                          background: "transparent",
                          borderBottom: `1px solid ${form.name ? "var(--gt-primary)" : "var(--gt-border)"}`,
                          color: "var(--gt-fg)",
                        }}
                        placeholder="guest_user"
                        required
                      />
                      {form.name && (
                        <span className="text-[9px] font-mono" style={{ color: "var(--gt-primary)" }}>✓ valid</span>
                      )}
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-mono uppercase tracking-widest" style={{ color: "var(--gt-muted-fg)" }}>
                        Comm_Endpoint
                      </label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                        className="w-full px-0 py-2 text-sm font-mono outline-none transition-colors"
                        style={{
                          background: "transparent",
                          borderBottom: `1px solid ${form.email.includes("@") ? "var(--gt-primary)" : "var(--gt-border)"}`,
                          color: "var(--gt-fg)",
                        }}
                        placeholder="email@server.com"
                        required
                      />
                      {form.email.includes("@") && (
                        <span className="text-[9px] font-mono" style={{ color: "var(--gt-primary)" }}>✓ valid endpoint</span>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2 pt-4">
                    <div className="flex items-center justify-between">
                      <label className="text-[10px] font-mono uppercase tracking-widest" style={{ color: "var(--gt-muted-fg)" }}>
                        Payload_Message
                      </label>
                      <span className="text-[10px] font-mono" style={{ color: charCount > 10 ? "var(--gt-primary)" : "var(--gt-muted-fg)" }}>
                        {charCount} chars
                      </span>
                    </div>
                    <textarea
                      value={form.message}
                      onChange={(e) => {
                        setForm((f) => ({ ...f, message: e.target.value }));
                        setCharCount(e.target.value.length);
                      }}
                      rows={4}
                      className="w-full p-4 text-sm font-mono outline-none transition-colors resize-none rounded"
                      style={{
                        background: "color-mix(in srgb, var(--gt-bg) 50%, transparent)",
                        border: `1px solid ${charCount > 10 ? "color-mix(in srgb, var(--gt-primary) 40%, transparent)" : "var(--gt-border)"}`,
                        color: "var(--gt-fg)",
                      }}
                      placeholder="> Hello World..."
                      required
                    />
                  </div>

                  {status === "error" && errorMsg && (
                    <div
                      className="flex items-center gap-3 p-3 text-xs font-mono uppercase tracking-widest rounded"
                      style={{
                        background: "color-mix(in srgb, var(--gt-danger) 10%, transparent)",
                        border: "1px solid color-mix(in srgb, var(--gt-danger) 30%, transparent)",
                        color: "var(--gt-danger)",
                      }}
                    >
                      <AlertCircle size={16} />
                      {errorMsg}
                    </div>
                  )}

                  <div className="pt-4 flex justify-end" style={{ borderTop: "1px solid var(--gt-border)" }}>
                    <button
                      type="submit"
                      disabled={status === "sending" || !isValid}
                      className="px-8 py-3 font-bold text-xs font-mono uppercase tracking-widest flex items-center gap-3 transition-all rounded disabled:opacity-40"
                      style={{
                        background: "color-mix(in srgb, var(--gt-primary) 10%, transparent)",
                        border: "1px solid color-mix(in srgb, var(--gt-primary) 40%, transparent)",
                        color: "var(--gt-primary)",
                      }}
                    >
                      {status === "sending" ? (
                        <div className="w-4 h-4 border-2 rounded-full animate-spin" style={{ borderColor: "color-mix(in srgb, var(--gt-primary) 20%, transparent)", borderTopColor: "var(--gt-primary)" }} />
                      ) : (
                        <>
                          <Send size={14} /> EXECUTE_SEND
                        </>
                      )}
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Right: Direct Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 flex flex-col gap-6"
          >
            <div className="p-6 rounded-xl flex-1" style={{ background: "var(--gt-surface)", border: "1px solid var(--gt-border)" }}>
              <h3 className="text-xs font-mono font-bold uppercase tracking-widest mb-6 pb-2" style={{ color: "var(--gt-muted-fg)", borderBottom: "1px solid var(--gt-border)" }}>
                Direct_Routes
              </h3>
              <div className="space-y-3">
                <a
                  href="mailto:igauravtiwari1096@gmail.com"
                  className="flex items-center gap-4 p-4 rounded-lg transition-all group"
                  style={{ border: "1px solid var(--gt-border)", background: "var(--gt-bg)" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "color-mix(in srgb, var(--gt-primary) 40%, transparent)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "var(--gt-border)";
                  }}
                >
                  <Mail size={18} style={{ color: "var(--gt-muted-fg)" }} />
                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-widest mb-1" style={{ color: "var(--gt-muted-fg)" }}>
                      Email_Protocol
                    </div>
                    <div className="text-xs" style={{ color: "var(--gt-fg)" }}>
                      igauravtiwari1096@gmail.com
                    </div>
                  </div>
                  <ArrowRight size={14} className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: "var(--gt-primary)" }} />
                </a>

                <a
                  href="https://linkedin.com/in/gauravtiwarrii"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-lg transition-all group"
                  style={{ border: "1px solid var(--gt-border)", background: "var(--gt-bg)" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "color-mix(in srgb, #3b82f6 40%, transparent)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "var(--gt-border)";
                  }}
                >
                  <Linkedin size={18} style={{ color: "var(--gt-muted-fg)" }} />
                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-widest mb-1" style={{ color: "var(--gt-muted-fg)" }}>
                      LinkedIn_Network
                    </div>
                    <div className="text-xs" style={{ color: "var(--gt-fg)" }}>
                      @gauravtiwarrii
                    </div>
                  </div>
                  <ArrowRight size={14} className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: "#3b82f6" }} />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
