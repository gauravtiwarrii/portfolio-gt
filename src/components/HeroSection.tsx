"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Github, Linkedin, Mail, Download, ChevronDown } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

const ROLES = [
  "Data Engineer",
  "AI Engineer",
  "Backend Developer",
  "Cloud Enthusiast",
];

const SOCIAL_LINKS = [
  { icon: Github, href: "https://github.com/gauravtiwarrii", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com/in/gauravtiwarrii", label: "LinkedIn" },
  { icon: Mail, href: "#contact", label: "Contact" },
];

export default function HeroSection() {
  const [roleIndex, setRoleIndex] = useState(0);

  // Rotate roles
  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: "var(--gt-bg)" }}
    >
      {/* Ambient Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(circle, var(--gt-glow) 0%, transparent 70%)`,
          opacity: 0.3,
        }}
        aria-hidden="true"
      />

      {/* Secondary Glow */}
      <div
        className="absolute top-1/4 right-1/4 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(circle, color-mix(in srgb, var(--gt-accent) 15%, transparent) 0%, transparent 70%)`,
          opacity: 0.5,
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* System Status */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8 font-mono text-xs"
          style={{
            background: "var(--gt-surface)",
            border: "1px solid var(--gt-border)",
            color: "var(--gt-muted-fg)",
          }}
        >
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.8)]" />
          <span className="tracking-widest uppercase">System Active</span>
          <span style={{ color: "var(--gt-primary)" }}>•</span>
          <span className="tracking-widest uppercase">Ready to Deploy</span>
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="font-heading font-bold tracking-tighter leading-[0.9] mb-6 select-none"
          style={{ fontSize: "clamp(3.5rem, 10vw, 8rem)" }}
        >
          <span style={{ color: "var(--gt-fg)" }}>Gaurav</span>
          <br />
          <span
            className="neon-text-subtle"
            style={{ color: "var(--gt-primary)" }}
          >
            Tiwari
          </span>
        </motion.h1>

        {/* Animated Role */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="h-10 flex items-center justify-center mb-10"
        >
          <div className="flex items-center gap-3 font-mono text-lg sm:text-xl">
            <span style={{ color: "var(--gt-primary)" }}>&gt;</span>
            <AnimatePresence mode="wait">
              <motion.span
                key={roleIndex}
                initial={{ opacity: 0, y: 15, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -15, filter: "blur(4px)" }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                style={{ color: "var(--gt-fg)" }}
              >
                {ROLES[roleIndex]}
              </motion.span>
            </AnimatePresence>
            <span
              className="w-2.5 h-6 animate-blink inline-block"
              style={{
                background: "var(--gt-primary)",
                boxShadow: `0 0 8px var(--gt-glow)`,
              }}
            />
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-3"
        >
          {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
            <Link
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-mono text-xs uppercase tracking-widest transition-all duration-300 group"
              style={{
                border: "1px solid var(--gt-border)",
                color: "var(--gt-muted-fg)",
                background: "var(--gt-surface)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "color-mix(in srgb, var(--gt-primary) 50%, transparent)";
                e.currentTarget.style.color = "var(--gt-primary)";
                e.currentTarget.style.background = "var(--gt-surface-hover)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--gt-border)";
                e.currentTarget.style.color = "var(--gt-muted-fg)";
                e.currentTarget.style.background = "var(--gt-surface)";
              }}
            >
              <Icon size={16} className="group-hover:scale-110 transition-transform" />
              {label}
            </Link>
          ))}

          {/* Download CV */}
          <a
            href="/resume.pdf"
            download="Gaurav_Tiwari_Resume.pdf"
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-mono text-xs uppercase tracking-widest font-bold transition-all duration-300 group neon-border"
            style={{
              color: "var(--gt-primary)",
              background: "color-mix(in srgb, var(--gt-primary) 10%, transparent)",
            }}
          >
            <Download size={16} className="group-hover:translate-y-0.5 transition-transform" />
            Download CV
          </a>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown
            size={20}
            style={{ color: "var(--gt-primary)", opacity: 0.6 }}
          />
        </motion.div>
        <span
          className="text-[9px] uppercase tracking-[0.4em] font-mono font-semibold"
          style={{ color: "var(--gt-muted-fg)" }}
        >
          Scroll
        </span>
      </motion.div>
    </section>
  );
}
