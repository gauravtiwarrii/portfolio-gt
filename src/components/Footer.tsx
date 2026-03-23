"use client";

import { Github, Linkedin, Mail, Twitter, ArrowUp, Terminal } from "lucide-react";
import Link from "next/link";

const exploreLinks = [
    { label: "./home", href: "/" },
    { label: "./projects", href: "/projects" },
    { label: "./about", href: "/about" },
    { label: "./blog", href: "/blog" },
];

const socialLinks = [
    { label: "github", href: "https://github.com/gauravtiwarrii", icon: Github },
    { label: "linkedin", href: "https://linkedin.com/in/gauravtiwarrii", icon: Linkedin },
    { label: "twitter", href: "#", icon: Twitter },
];

export default function Footer() {
    const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

    return (
        <footer className="relative bg-black border-t border-teal-500/20 overflow-hidden">
            {/* Tech grid overlay fading to bottom */}
            <div 
                className="absolute inset-0 pointer-events-none bg-tech-grid z-0 mix-blend-screen opacity-10"
                style={{ maskImage: "linear-gradient(to bottom, black, transparent)", WebkitMaskImage: "linear-gradient(to bottom, black, transparent)" }}
            ></div>

            {/* Footer Content */}
            <div className="relative z-10 max-w-5xl mx-auto px-6 py-16">
                
                {/* Top Branding / Terminal header */}
                <div className="flex flex-col md:flex-row items-center justify-between mb-16 pb-8 border-b border-white/10">
                    <div className="flex items-center gap-4 mb-6 md:mb-0">
                        <div className="w-12 h-12 rounded-lg bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400 shadow-[0_0_15px_rgba(45,212,191,0.2)]">
                            <Terminal size={24} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-white font-heading tracking-tight">Gaurav Tiwari</h2>
                            <p className="text-teal-400/80 text-xs font-mono mt-1">{`sys.admin @ portfolio`}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 font-mono text-xs text-zinc-500 bg-white/[0.02] px-3 py-1.5 rounded-full border border-white/5">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.8)]"></span>
                        SYSTEM_ONLINE
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
                    {/* Directories */}
                    <div>
                        <h4 className="flex items-center gap-2 text-xs font-mono font-semibold text-teal-400 mb-6">
                            <span className="text-teal-500/50">{`//`}</span> DIRECTORIES
                        </h4>
                        <ul className="space-y-3 font-mono">
                            {exploreLinks.map(({ label, href }) => (
                                <li key={href}>
                                    <Link
                                        href={href}
                                        className="text-sm text-zinc-500 hover:text-teal-300 hover:pl-2 transition-all duration-300 flex items-center gap-2 group"
                                    >
                                        <span className="opacity-0 group-hover:opacity-100 text-teal-500 transition-opacity">{`>`}</span>
                                        {label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Connections */}
                    <div>
                        <h4 className="flex items-center gap-2 text-xs font-mono font-semibold text-purple-400 mb-6">
                            <span className="text-purple-500/50">{`//`}</span> CONNECTIONS
                        </h4>
                        <ul className="space-y-3 font-mono">
                            {socialLinks.map(({ label, href, icon: Icon }) => (
                                <li key={label}>
                                    <a
                                        href={href}
                                        target={href.startsWith("http") ? "_blank" : undefined}
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-3 text-sm text-zinc-500 hover:text-purple-300 hover:pl-2 transition-all duration-300 group"
                                    >
                                        <Icon size={16} className="text-zinc-600 group-hover:text-purple-400 transition-colors" />
                                        {label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Network */}
                    <div>
                        <h4 className="flex items-center gap-2 text-xs font-mono font-semibold text-yellow-400 mb-6">
                            <span className="text-yellow-500/50">{`//`}</span> NETWORK
                        </h4>
                        <div className="space-y-4 font-mono">
                            <a
                                href="mailto:gaurav@example.com"
                                className="flex items-center gap-3 text-sm text-zinc-500 hover:text-yellow-300 hover:pl-2 transition-all duration-300 group"
                            >
                                <Mail size={16} className="text-zinc-600 group-hover:text-yellow-400 transition-colors" />
                                ping me
                            </a>
                            <div className="flex items-center gap-3 text-sm text-zinc-600">
                                <span className="text-zinc-500">loc:</span> 
                                <span className="text-zinc-400">IN / Earth</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6 font-mono">
                    <p className="text-xs text-zinc-600 flex items-center gap-2 selection:bg-teal-500/30">
                        <span className="text-teal-500">{`>`}</span> 
                        © {new Date().getFullYear()} Gaurav Tiwari. All rights reserved.
                    </p>
                    <button
                        onClick={scrollToTop}
                        className="group flex items-center gap-2 px-4 py-2 rounded-md bg-white/[0.02] border border-white/10 text-zinc-400 hover:text-teal-400 hover:border-teal-400/50 hover:bg-teal-400/10 transition-all text-xs shadow-[0_0_0_rgba(45,212,191,0)] hover:shadow-[0_0_15px_rgba(45,212,191,0.2)]"
                    >
                        <ArrowUp size={14} className="group-hover:-translate-y-1 transition-transform" />
                        [ return 0; ]
                    </button>
                </div>
            </div>
        </footer>
    );
}
