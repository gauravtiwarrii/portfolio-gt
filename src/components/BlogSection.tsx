
"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, BookOpen, Calendar, Clock } from "lucide-react";
import Link from "next/link";

interface BlogSectionProps {
    blogs: {
        slug: string;
        title: string;
        excerpt: string;
        date: string;
        readTime: string;
        tags: string[];
        url: string;
    }[];
}

export default function BlogSection({ blogs }: BlogSectionProps) {
    return (
        <section className="py-32 relative" id="blog">
            {/* Top divider */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            <div className="container mx-auto px-6 max-w-6xl">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-16">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl mb-6 text-zinc-400 text-sm">
                            <BookOpen size={14} />
                            <span>Technical Writing</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-br from-white via-white to-zinc-500 bg-clip-text text-transparent mb-4">
                            From the Journal
                        </h2>
                        <p className="text-zinc-500 max-w-xl leading-relaxed">
                            Sharing insights on data architecture, engineering patterns, and lessons learned building scalable systems.
                        </p>
                    </motion.div>

                    <Link
                        href="/blog"
                        className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-zinc-300 hover:text-white transition-all text-sm font-medium group"
                    >
                        View all articles
                        <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </Link>
                </div>

                {/* Blog Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {blogs.map((blog, index) => (
                        <motion.div
                            key={blog.slug}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <Link href={blog.url} className="group block h-full">
                                <article className="h-full p-7 rounded-[2rem] bg-white/[0.03] backdrop-blur-2xl border border-white/[0.07] hover:bg-white/[0.06] hover:border-white/[0.15] transition-all duration-500 relative overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.2)] hover:shadow-[0_8px_40px_rgba(0,0,0,0.35)]">
                                    {/* Top shine */}
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent group-hover:via-white/30 transition-colors duration-500" />

                                    {/* Tags + Date row */}
                                    <div className="flex justify-between items-center mb-5">
                                        <div className="flex gap-2 flex-wrap">
                                            {blog.tags.slice(0, 2).map(tag => (
                                                <span key={tag} className="text-xs font-semibold tracking-wide uppercase px-3 py-1 rounded-full bg-zinc-800/60 text-zinc-300 border border-white/5">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <h3 className="text-xl font-bold mb-3 text-zinc-200 group-hover:text-white transition-colors leading-snug tracking-tight">
                                        {blog.title}
                                    </h3>
                                    <p className="text-zinc-500 text-sm mb-6 line-clamp-2 leading-relaxed">
                                        {blog.excerpt}
                                    </p>

                                    {/* Footer meta */}
                                    <div className="flex items-center justify-between text-xs text-zinc-600">
                                        <div className="flex items-center gap-4">
                                            <span className="flex items-center gap-1.5">
                                                <Calendar size={12} />
                                                {blog.date}
                                            </span>
                                            <span className="flex items-center gap-1.5">
                                                <Clock size={12} />
                                                {blog.readTime}
                                            </span>
                                        </div>
                                        <span className="flex items-center gap-1 text-zinc-400 group-hover:text-white transition-colors font-medium">
                                            Read <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                        </span>
                                    </div>
                                </article>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-10 md:hidden text-center">
                    <Link href="/blog" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-zinc-300 text-sm font-medium">
                        View all articles <ArrowUpRight size={14} />
                    </Link>
                </div>
            </div>
        </section>
    );
}
