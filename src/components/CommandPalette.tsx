"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { Search, Code, BookOpen, Mail, Home, User, ArrowRight } from "lucide-react";

export default function CommandPalette() {
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const router = useRouter();

    // Toggle palette on Ctrl+K, Cmd+K, or custom event
    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setIsOpen((open) => !open);
            }
            if (e.key === "Escape") {
                setIsOpen(false);
            }
        };

        const handleCustomEvent = () => setIsOpen(true);

        document.addEventListener("keydown", down);
        window.addEventListener("open-command-palette", handleCustomEvent);
        return () => {
            document.removeEventListener("keydown", down);
            window.removeEventListener("open-command-palette", handleCustomEvent);
        };
    }, []);

    // Prevent scrolling when open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    const navigationLinks = [
        { name: "Home", href: "/", icon: Home, category: "Pages" },
        { name: "About Me", href: "/about", icon: User, category: "Pages" },
        { name: "Projects", href: "/projects", icon: Code, category: "Pages" },
        { name: "Technical Blog", href: "/blog", icon: BookOpen, category: "Pages" },
        { name: "Contact", href: "/contact", icon: Mail, category: "Pages" },
    ];

    const projectLinks = [
        { name: "Retail ETL Pipeline", href: "/projects/retail-etl-pipeline", icon: Code, category: "Projects" },
        { name: "Uber Data Analytics", href: "/projects/uber-data-analytics", icon: Code, category: "Projects" },
        { name: "Real-time Vehicle Tracking", href: "/projects/vehicle-tracking", icon: Code, category: "Projects" },
    ];

    const allLinks = [...navigationLinks, ...projectLinks];

    const filteredLinks = allLinks.filter((link) =>
        link.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleSelect = (href: string) => {
        setIsOpen(false);
        setSearchQuery("");
        router.push(href);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop Overlay */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsOpen(false)}
                        className="fixed inset-0 z-[150] bg-black/40 backdrop-blur-sm"
                    />

                    {/* Spotlight Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -20, filter: "blur(10px)" }}
                        animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
                        exit={{ opacity: 0, scale: 0.95, y: 10, filter: "blur(10px)" }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="fixed top-[15%] left-1/2 -translate-x-1/2 z-[200] w-[90%] max-w-2xl bg-zinc-900/80 backdrop-blur-3xl border border-white/10 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.6)] overflow-hidden"
                    >
                        {/* Search Input Area */}
                        <div className="flex items-center gap-3 px-6 py-4 border-b border-white/10 bg-white/5">
                            <Search size={22} className="text-zinc-400" />
                            <input
                                autoFocus
                                type="text"
                                placeholder="Where do you want to go?"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-transparent border-none outline-none text-zinc-100 placeholder:text-zinc-500 font-medium text-lg"
                            />
                            <div className="flex items-center gap-1 shrink-0">
                                <kbd className="px-2 py-1 bg-white/10 rounded-md text-xs font-mono text-zinc-400 border border-white/5">ESC</kbd>
                            </div>
                        </div>

                        {/* Results Area */}
                        <div className="max-h-[60vh] overflow-y-auto p-4 custom-scrollbar">
                            {filteredLinks.length === 0 ? (
                                <div className="py-12 text-center text-zinc-500">
                                    <Search size={32} className="mx-auto mb-3 opacity-20" />
                                    <p>No results found for &quot;{searchQuery}&quot;</p>
                                </div>
                            ) : (
                                <div className="space-y-1">
                                    {filteredLinks.map((link) => (
                                        <button
                                            key={link.href}
                                            onClick={() => handleSelect(link.href)}
                                            className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-white/10 text-left transition-colors group"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 rounded-lg bg-white/5 text-zinc-400 group-hover:text-white group-hover:bg-white/20 transition-colors">
                                                    <link.icon size={18} />
                                                </div>
                                                <div>
                                                    <span className="text-zinc-200 font-medium block">{link.name}</span>
                                                    <span className="text-xs text-zinc-500 font-mono">{link.category}</span>
                                                </div>
                                            </div>
                                            <ArrowRight size={16} className="text-zinc-600 group-hover:text-zinc-300 transition-colors" />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Footer Hints */}
                        <div className="px-6 py-3 border-t border-white/10 bg-black/20 flex flex-wrap gap-4 text-xs font-mono text-zinc-500">
                            <span className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-indigo-500"></span> Pro tip: Type to filter
                            </span>
                            <span className="flex items-center gap-2">
                                <kbd className="px-1.5 py-0.5 bg-white/10 rounded-md border border-white/5">↑</kbd>
                                <kbd className="px-1.5 py-0.5 bg-white/10 rounded-md border border-white/5">↓</kbd>
                                to navigate
                            </span>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
