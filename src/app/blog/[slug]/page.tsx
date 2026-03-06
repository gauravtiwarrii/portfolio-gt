import { getPostBySlug } from "@/lib/blog";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Calendar, Clock, ArrowLeft, Terminal } from "lucide-react";
import Link from "next/link";
import styles from "./markdown.module.css";
import ReadingProgress from "@/components/ReadingProgress";
import ActionBar from "./ActionBar";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const resolvedParams = await params;
    const post = getPostBySlug(resolvedParams.slug);

    if (!post) return {};

    const encodeTitle = encodeURIComponent(post.title).slice(0, 100);
    const ogUrl = `/api/og?title=${encodeTitle}&type=Blog%20Post`;

    return {
        title: `${post.title} | Gaurav Tiwari`,
        description: post.excerpt,
        openGraph: {
            title: post.title,
            description: post.excerpt,
            images: [ogUrl],
        },
        twitter: {
            card: "summary_large_image",
            title: post.title,
            description: post.excerpt,
            images: [ogUrl],
        },
    };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const resolvedParams = await params;
    const post = getPostBySlug(resolvedParams.slug);

    if (!post) {
        notFound();
    }

    return (
        <div className="text-white selection:bg-indigo-500/30 min-h-screen relative overflow-x-hidden font-sans">
            <ReadingProgress />

            {/* Futuristic Ambient Background */}
            <div className="fixed inset-0 pointer-events-none z-[-2]">
                <div className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-indigo-900/10 blur-[150px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-emerald-900/10 blur-[150px]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[20vw] bg-zinc-800/20 blur-[120px] rounded-[100%]" />
            </div>

            {/* Subtle Grid Pattern Overlay */}
            <div className="fixed inset-0 pointer-events-none z-[-1] opacity-20"
                style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

            <article className="pt-24 md:pt-32 pb-32 px-4 sm:px-6 relative z-10 selection:bg-white/20">
                <div className="container mx-auto max-w-[800px]">

                    {/* Navigation Bar */}
                    <div className="mb-12 md:mb-16 -ml-2">
                        <Link
                            href="/blog"
                            className="group inline-flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.08] hover:border-white/[0.15] backdrop-blur-xl text-zinc-400 hover:text-white transition-all duration-300 shadow-xl"
                        >
                            <ArrowLeft size={18} className="group-hover:-translate-x-1.5 transition-transform duration-300" />
                            <span className="font-semibold tracking-wide text-sm">System // Return to Journal</span>
                        </Link>
                    </div>

                    {/* Hero Header */}
                    <header className="mb-16 md:mb-20">
                        {/* Tags */}
                        <div className="flex flex-wrap gap-2.5 mb-8">
                            {post.tags.map((tag) => (
                                <span key={tag} className="flex items-center gap-1.5 text-xs font-bold tracking-wider uppercase px-3.5 py-1.5 rounded-lg bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 shadow-[0_0_15px_rgba(99,102,241,0.1)]">
                                    <Terminal size={12} className="opacity-70" />
                                    {tag}
                                </span>
                            ))}
                        </div>

                        {/* Title */}
                        <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold mb-8 leading-[1.05] tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-zinc-200 to-zinc-500 pb-2">
                            {post.title}
                        </h1>

                        {/* Meta Data Pill */}
                        <div className="inline-flex flex-wrap items-center gap-4 sm:gap-6 px-6 py-3.5 rounded-2xl bg-zinc-900/80 border border-white/10 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
                            <div className="flex items-center gap-2.5 text-zinc-300">
                                <Calendar size={18} className="text-indigo-400" />
                                <span className="text-sm font-semibold tracking-wide">{post.date}</span>
                            </div>
                            <div className="w-1 h-1 rounded-full bg-zinc-600 hidden sm:block" />
                            <div className="flex items-center gap-2.5 text-zinc-300">
                                <Clock size={18} className="text-emerald-400" />
                                <span className="text-sm font-semibold tracking-wide">{post.readTime}</span>
                            </div>
                        </div>
                    </header>

                    {/* Main Content Area */}
                    <div className="relative">
                        {/* Premium Glass Container */}
                        <div className={`
                            ${styles.markdown} 
                            glass-markdown-container 
                            p-6 sm:p-10 md:p-14 
                            rounded-[2rem] md:rounded-[3rem] 
                            bg-[#121214]/60 
                            backdrop-blur-3xl 
                            border border-white/[0.08] 
                            shadow-[0_20px_60px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.08)] 
                            relative
                            overflow-hidden
                        `}>
                            {/* Inner ambient glows for depth */}
                            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />
                            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/2" />

                            <div className="prose prose-invert lg:prose-xl max-w-none relative z-10 prose-headings:font-bold prose-headings:tracking-tight prose-a:text-indigo-400 hover:prose-a:text-indigo-300 prose-img:rounded-2xl prose-img:border prose-img:border-white/10 prose-hr:border-white/10 prose-blockquote:border-indigo-500/50 prose-blockquote:bg-indigo-500/5 prose-blockquote:rounded-r-lg prose-blockquote:py-1">
                                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                    {post.content}
                                </ReactMarkdown>
                            </div>
                        </div>
                    </div>

                    <ActionBar />

                </div>
            </article>
        </div>
    );
}
