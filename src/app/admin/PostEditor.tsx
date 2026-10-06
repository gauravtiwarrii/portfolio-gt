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
        <div className="admin-editor" onKeyDown={handleKeyDown}>
            {/* Top Bar */}
            <header className="admin-editor__bar">
                <div className="flex items-center gap-4">
                    <Link href="/admin" className="admin-editor__back" aria-label="Back to admin">
                        <ArrowLeft size={18} aria-hidden="true" />
                    </Link>
                    <div>
                        <p className="admin-editor__context">{mode === "new" ? "New article" : `Editing / ${slug}`}</p>
                        <p className="admin-editor__context">{wordCount} words · {readTime} min read · Ctrl+S to save</p>
                    </div>
                </div>

                <div className="admin-editor__bar-actions">
                    {/* Write / Preview Toggle */}
                    <div className="admin-editor__tabs" role="group" aria-label="Editor mode">
                        <button
                            type="button"
                            onClick={() => setActiveTab("write")}
                            aria-pressed={activeTab === "write"}
                            className="admin-editor__tab"
                        >
                            <Edit3 size={14} /> Write
                        </button>
                        <button
                            type="button"
                            onClick={() => setActiveTab("preview")}
                            aria-pressed={activeTab === "preview"}
                            className="admin-editor__tab"
                        >
                            <Eye size={14} /> Preview
                        </button>
                    </div>

                    {slug && (
                        <Link href={`/blog/${slug}`} target="_blank" className="admin-action-secondary">
                            View Live
                        </Link>
                    )}

                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className={`admin-action-primary admin-editor__publish ${saved ? "is-saved" : ""} disabled:opacity-60`}
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
                <div className="admin-editor__error" role="alert">
                    {error}
                </div>
            )}

            {/* Meta Fields */}
            <div className="admin-editor__meta">
                <div className="admin-editor__fields grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="lg:col-span-2">
                        <label className="admin-field__label" htmlFor="post-title">Title *</label>
                        <input
                            id="post-title"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Article title..."
                            className="admin-field__input"
                        />
                    </div>
                    <div>
                        <label className="admin-field__label" htmlFor="post-date">Date</label>
                        <input
                            id="post-date"
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="admin-field__input"
                        />
                    </div>
                    <div>
                        <label className="admin-field__label" htmlFor="post-tags">Tags (comma-separated)</label>
                        <input
                            id="post-tags"
                            type="text"
                            value={tags}
                            onChange={(e) => setTags(e.target.value)}
                            placeholder="e.g. Data, Python, ETL"
                            className="admin-field__input"
                        />
                    </div>
                    <div className="lg:col-span-4">
                        <label className="admin-field__label" htmlFor="post-excerpt">Excerpt / Summary</label>
                        <input
                            id="post-excerpt"
                            type="text"
                            value={excerpt}
                            onChange={(e) => setExcerpt(e.target.value)}
                            placeholder="A short description shown on the blog listing..."
                            className="admin-field__input"
                        />
                    </div>
                </div>
            </div>

            {/* Editor / Preview */}
            <div className="flex-1 px-6 py-8">
                <div className="max-w-4xl mx-auto h-full">
                    {activeTab === "write" ? (
                        <textarea
                            aria-label="Markdown content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder={`# Start writing your article here...\n\nMarkdown is supported. Use ## for headings, **bold**, *italic*, \`code\`, etc.`}
                            className="admin-editor__textarea"
                        />
                    ) : (
                        <div className="admin-editor__preview">
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
