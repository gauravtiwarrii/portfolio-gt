"use client";

import { Github, Linkedin, Mail, Twitter, ArrowUp, Code2 } from "lucide-react";
import Link from "next/link";

const navLinks = [
    { label: "Home", href: "/" },
    { label: "Projects", href: "/projects" },
    { label: "About", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
];

const techBadges = ["Next.js", "TypeScript", "Framer Motion", "Tailwind CSS"];

export default function Footer() {
    const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

    return (
        <footer className="relative mt-0 border-t border-white/[0.06]">
            {/* Top gradient */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            <div className="container mx-auto px-6 max-w-6xl py-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
                    {/* Brand */}
                    <div>
                        <h3 className="text-xl font-bold text-white mb-3 tracking-tight">Gaurav Tiwari</h3>
                        <p className="text-zinc-500 text-sm leading-relaxed mb-5 max-w-xs">
                            Data Engineer building scalable pipelines, warehouses, and real-time data systems.
                        </p>
                        {/* Status */}
                        <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/5 border border-white/10 text-xs text-zinc-400">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                            </span>
                            Available for new projects
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-5">Navigation</h4>
                        <ul className="space-y-3">
                            {navLinks.map(({ label, href }) => (
                                <li key={href}>
                                    <Link href={href} className="text-sm text-zinc-400 hover:text-white transition-colors">
                                        {label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Social + Contact */}
                    <div>
                        <h4 className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-5">Connect</h4>
                        <div className="flex flex-wrap gap-3 mb-6">
                            {[
                                { icon: Github, href: "https://github.com/gauravtiwarrii", label: "GitHub" },
                                { icon: Linkedin, href: "https://linkedin.com/in/gauravtiwarrii", label: "LinkedIn" },
                                { icon: Mail, href: "mailto:gaurav@example.com", label: "Email" },
                                { icon: Twitter, href: "#", label: "Twitter" },
                            ].map(({ icon: Icon, href, label }) => (
                                <a
                                    key={label}
                                    href={href}
                                    target={href.startsWith("http") ? "_blank" : undefined}
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/5 border border-white/8 text-zinc-400 hover:text-white hover:bg-white/10 transition-all text-sm"
                                    aria-label={label}
                                >
                                    <Icon size={15} /> {label}
                                </a>
                            ))}
                        </div>
                        <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-300 transition-colors">
                            <Code2 size={14} /> Download Resume
                        </a>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-3 flex-wrap justify-center sm:justify-start">
                        <p className="text-xs text-zinc-600">
                            © {new Date().getFullYear()} Gaurav Tiwari. All rights reserved.
                        </p>
                        <div className="flex items-center gap-2">
                            {techBadges.map(badge => (
                                <span key={badge} className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 border border-white/8 text-zinc-600">
                                    {badge}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Back to top */}
                    <button
                        onClick={scrollToTop}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/8 text-zinc-400 hover:text-white hover:bg-white/10 transition-all text-xs font-medium"
                    >
                        <ArrowUp size={14} /> Back to top
                    </button>
                </div>
            </div>
        </footer>
    );
}
