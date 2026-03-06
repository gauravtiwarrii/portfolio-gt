"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Calendar, Clock, Search, BookOpen } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Update the type to match the output from getAllPosts
interface BlogPost {
    slug: string;
    title: string;
    excerpt: string;
    date: string;
    readTime: string;
    tags: string[];
}

export default function BlogClient({ initialPosts }: { initialPosts: BlogPost[] }) {
    const [searchQuery, setSearchQuery] = useState("");

    const filteredPosts = initialPosts.filter(post => {
        const titleMatch = post.title?.toLowerCase().includes(searchQuery.toLowerCase()) || false;
        const tagsMatch = (post.tags || []).some(tag => tag?.toLowerCase().includes(searchQuery.toLowerCase()));
        return titleMatch || tagsMatch;
    });

    return (
        <div className="text-white selection:bg-zinc-500/30 overflow-hidden min-h-screen relative">
            {/* Ambient Background Glows */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-zinc-500/10 rounded-full blur-[120px] pointer-events-none" />

            <section className="pt-32 pb-32 px-6 relative z-10">
                <div className="container mx-auto max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="text-center mb-16"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl mb-6 text-zinc-400 font-mono text-sm shadow-[0_4px_24px_rgba(0,0,0,0.2)]">
                            <BookOpen size={14} />
                            <span>Insights & Arcana</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight bg-gradient-to-br from-white via-white to-zinc-500 bg-clip-text text-transparent drop-shadow-sm">
                            Technical Writing
                        </h1>
                        <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                            Deep dives into Data Engineering, Distributed Systems, and Cloud Architecture.
                        </p>
                    </motion.div>

                    {/* Dynamic Island Search Bar */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                        className="mb-12 relative max-w-xl mx-auto group"
                    >
                        <div className="absolute inset-0 bg-white/5 rounded-full blur-xl group-hover:bg-white/10 transition-colors duration-500" />
                        <div className="relative flex items-center bg-[#1c1c1e]/60 backdrop-blur-3xl border border-white/10 rounded-full p-2 shadow-2xl transition-all duration-300 ring-1 ring-white/5 focus-within:ring-white/20">
                            <div className="pl-4 pr-2 text-zinc-500">
                                <Search size={20} />
                            </div>
                            <input
                                type="text"
                                placeholder="Search articles or tags..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-transparent border-none outline-none text-zinc-100 placeholder:text-zinc-600 font-medium h-12 text-lg"
                            />
                        </div>
                    </motion.div>

                    <div className="grid gap-6">
                        <AnimatePresence mode="popLayout">
                            {filteredPosts.map((post, index) => (
                                <motion.div
                                    key={post.slug}
                                    layout
                                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                                    transition={{ duration: 0.5, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
                                >
                                    <Link href={`/blog/${post.slug}`} className="group block">
                                        {/* Extremely rounded glass card matching iOS 17 Pro feel */}
                                        <article className="p-8 md:p-10 rounded-[2.5rem] bg-white/[0.03] backdrop-blur-2xl border border-white/[0.08] hover:bg-white/[0.06] hover:border-white/[0.15] transition-all duration-500 relative overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.2)] hover:shadow-[0_16px_48px_rgba(0,0,0,0.4)]">

                                            {/* Top Highlight Gradient */}
                                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500" />

                                            {/* Subtle Inner Glow on Hover */}
                                            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                                            <div className="relative z-10">
                                                <div className="flex flex-wrap gap-2 mb-6">
                                                    {post.tags.map((tag) => (
                                                        <span key={tag} className="text-xs font-semibold tracking-wide uppercase px-3.5 py-1.5 rounded-full bg-zinc-800/50 text-zinc-300 border border-white/5 group-hover:bg-zinc-700/50 group-hover:text-white transition-colors duration-300">
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>

                                                <h2 className="text-2xl md:text-3xl font-bold mb-4 tracking-tight group-hover:text-white text-zinc-200 transition-colors duration-300">
                                                    {post.title}
                                                </h2>

                                                <p className="text-zinc-500 text-base md:text-lg mb-8 line-clamp-2 leading-relaxed font-medium">
                                                    {post.excerpt}
                                                </p>

                                                <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 text-sm text-zinc-500 font-medium">
                                                    <div className="flex items-center gap-2 bg-white/5 rounded-full px-4 py-2 border border-white/5">
                                                        <Calendar size={14} className="text-zinc-400" />
                                                        <span>{post.date}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2 bg-white/5 rounded-full px-4 py-2 border border-white/5">
                                                        <Clock size={14} className="text-zinc-400" />
                                                        <span>{post.readTime}</span>
                                                    </div>

                                                    {/* iOS style forward button */}
                                                    <div className="sm:ml-auto flex items-center justify-center w-10 h-10 rounded-full bg-white/5 border border-white/10 text-zinc-400 group-hover:bg-white group-hover:text-black group-hover:scale-110 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0)] group-hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                                                        <ArrowUpRight size={18} strokeWidth={2.5} />
                                                    </div>
                                                </div>
                                            </div>
                                        </article>
                                    </Link>
                                </motion.div>
                            ))}
                        </AnimatePresence>

                        {filteredPosts.length === 0 && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-center py-20 text-zinc-500"
                            >
                                <Search size={48} className="mx-auto mb-4 opacity-20" />
                                <p className="text-xl">No articles found matching &quot;{searchQuery}&quot;</p>
                            </motion.div>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
}
