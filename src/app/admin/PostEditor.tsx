"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArrowLeft, Save, Eye, Edit3, Loader2, CheckCircle } from "lucide-react";

interface PostEditorProps {
    mode: "new" | "edit";
    slug?: string;
    initialData?: {
        title: string;
        excerpt: string;
        tags: string;
        date: string;
        content: string;
    };
}

export default function PostEditor({ mode, slug, initialData }: PostEditorProps) {
    const router = useRouter();
    const today = new Date().toISOString().split("T")[0];

    const [title, setTitle] = useState(initialData?.title ?? "");
    const [excerpt, setExcerpt] = useState(initialData?.excerpt ?? "");
    const [tags, setTags] = useState(initialData?.tags ?? "");
    const [date, setDate] = useState(initialData?.date ?? today);
    const [content, setContent] = useState(initialData?.content ?? "");
    const [activeTab, setActiveTab] = useState<"write" | "preview">("write");
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const [error, setError] = useState("");

    const handleSave = useCallback(async () => {
        if (!title.trim() || !content.trim()) {
            setError("Title and content are required.");
            return;
        }
        setSaving(true);
        setError("");

        const payload = { title, excerpt, tags, date, content };
        const url = mode === "new" ? "/api/admin/posts" : `/api/admin/posts/${slug}`;
        const method = mode === "new" ? "POST" : "PUT";

        try {
            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (res.ok) {
                setSaved(true);
                setTimeout(() => setSaved(false), 2500);
                if (mode === "new") {
                    const data = await res.json();
                    router.push(`/admin/edit/${data.slug}`);
                }
            } else {
                const data = await res.json();
                setError(data.error ?? "Failed to save.");
            }
        } catch {
            setError("Network error. Please try again.");
        } finally {
            setSaving(false);
        }
    }, [title, excerpt, tags, date, content, mode, slug, router]);

    // Keyboard shortcut: Ctrl/Cmd + S to save
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if ((e.ctrlKey || e.metaKey) && e.key === "s") {
            e.preventDefault();
            handleSave();
        }
    };

    const wordCount = content.trim().split(/\s+/).filter(Boolean).length;
    const readTime = Math.max(1, Math.round(wordCount / 200));

    return (
        <div className="min-h-screen flex flex-col" onKeyDown={handleKeyDown}>
            {/* Top Bar */}
            <header className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 bg-zinc-950/80 backdrop-blur-xl border-b border-white/[0.06]">
                <div className="flex items-center gap-4">
                    <Link href="/admin" className="p-2 rounded-xl text-zinc-500 hover:text-white hover:bg-white/5 transition-all">
                        <ArrowLeft size={20} />
                    </Link>
                    <div>
                        <p className="text-xs text-zinc-500 font-mono">{mode === "new" ? "New Article" : `Editing: ${slug}`}</p>
                        <p className="text-xs text-zinc-600">{wordCount} words · {readTime} min read · Ctrl+S to save</p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    {/* Write / Preview Toggle */}
                    <div className="flex items-center p-1 rounded-xl bg-zinc-900 border border-white/10">
                        <button
                            onClick={() => setActiveTab("write")}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${activeTab === "write" ? "bg-white/10 text-white" : "text-zinc-500 hover:text-zinc-300"}`}
                        >
                            <Edit3 size={14} /> Write
                        </button>
                        <button
                            onClick={() => setActiveTab("preview")}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${activeTab === "preview" ? "bg-white/10 text-white" : "text-zinc-500 hover:text-zinc-300"}`}
                        >
                            <Eye size={14} /> Preview
                        </button>
                    </div>

                    {slug && (
                        <Link href={`/blog/${slug}`} target="_blank" className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-zinc-300 text-sm hover:bg-white/10 transition-colors">
                            View Live
                        </Link>
                    )}

                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all ${saved ? "bg-emerald-500 text-white" : "bg-white text-black hover:bg-zinc-100"
                            } disabled:opacity-60`}
                    >
                        {saving ? (
                            <><Loader2 size={16} className="animate-spin" /> Saving...</>
                        ) : saved ? (
                            <><CheckCircle size={16} /> Saved!</>
                        ) : (
                            <><Save size={16} /> {mode === "new" ? "Publish" : "Save Changes"}</>
                        )}
                    </button>
                </div>
            </header>

            {error && (
                <div className="mx-6 mt-4 px-5 py-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
                    {error}
                </div>
            )}

            {/* Meta Fields */}
            <div className="px-6 py-6 border-b border-white/[0.06] bg-zinc-950/50">
                <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="lg:col-span-2">
                        <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-2">Title *</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Article title..."
                            className="w-full px-4 py-3 bg-zinc-900/60 border border-white/10 rounded-xl text-white placeholder:text-zinc-600 outline-none focus:border-white/30 transition-all text-lg font-semibold"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-2">Date</label>
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="w-full px-4 py-3 bg-zinc-900/60 border border-white/10 rounded-xl text-white outline-none focus:border-white/30 transition-all"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-2">Tags (comma-separated)</label>
                        <input
                            type="text"
                            value={tags}
                            onChange={(e) => setTags(e.target.value)}
                            placeholder="e.g. Data, Python, ETL"
                            className="w-full px-4 py-3 bg-zinc-900/60 border border-white/10 rounded-xl text-white placeholder:text-zinc-600 outline-none focus:border-white/30 transition-all"
                        />
                    </div>
                    <div className="lg:col-span-4">
                        <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-2">Excerpt / Summary</label>
                        <input
                            type="text"
                            value={excerpt}
                            onChange={(e) => setExcerpt(e.target.value)}
                            placeholder="A short description shown on the blog listing..."
                            className="w-full px-4 py-3 bg-zinc-900/60 border border-white/10 rounded-xl text-white placeholder:text-zinc-600 outline-none focus:border-white/30 transition-all"
                        />
                    </div>
                </div>
            </div>

            {/* Editor / Preview */}
            <div className="flex-1 px-6 py-8">
                <div className="max-w-4xl mx-auto h-full">
                    {activeTab === "write" ? (
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder={`# Start writing your article here...\n\nMarkdown is supported. Use ## for headings, **bold**, *italic*, \`code\`, etc.`}
                            className="w-full h-[calc(100vh-380px)] min-h-[400px] px-6 py-6 bg-zinc-900/40 border border-white/[0.06] rounded-2xl text-zinc-200 placeholder:text-zinc-700 outline-none focus:border-white/20 transition-all font-mono text-[15px] leading-relaxed resize-none"
                        />
                    ) : (
                        <div className="w-full min-h-[400px] px-8 py-8 bg-zinc-900/40 border border-white/[0.06] rounded-2xl overflow-auto">
                            {content ? (
                                <div className="prose prose-invert prose-lg max-w-none">
                                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                        {content}
                                    </ReactMarkdown>
                                </div>
                            ) : (
                                <p className="text-zinc-600 italic">Nothing to preview yet. Start writing in the Write tab.</p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
