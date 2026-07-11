"use client";

import { motion } from "framer-motion";
import ContactConsole from "@/components/sections/ContactConsole";

export default function ContactPage() {
  return (
    <section className="min-h-screen relative overflow-hidden text-white selection:bg-teal-500/30 pt-28 pb-32 font-mono" style={{ background: "var(--gt-bg)" }}>
      {/* Ambient Tech Grid Background */}
      <div className="fixed inset-0 bg-tech-grid opacity-10 pointer-events-none mix-blend-screen" />

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

        {/* Contact Console Component */}
        <ContactConsole />
      </div>
    </section>
  );
}
