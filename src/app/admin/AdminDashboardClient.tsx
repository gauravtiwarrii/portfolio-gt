"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PenSquare, Trash2, LogOut, Plus, BookOpen, Calendar, Tag, ExternalLink, RefreshCw } from "lucide-react";

interface PostMeta {
    slug: string;
    title: string;
    date: string;
    tags: string[];
}

export default function AdminDashboardClient() {
    const [posts, setPosts] = useState<PostMeta[]>([]);
    const [loading, setLoading] = useState(true);
    const [deletingSlug, setDeletingSlug] = useState<string | null>(null);
    const router = useRouter();

    const fetchPosts = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/admin/posts");
            if (res.ok) setPosts(await res.json());
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchPosts(); }, []);

    const handleLogout = async () => {
        await fetch("/api/admin/logout", { method: "POST" });
        router.push("/admin/login");
        router.refresh();
    };

    const handleDelete = async (slug: string) => {
        if (!confirm(`Delete "${slug}"? This cannot be undone.`)) return;
        setDeletingSlug(slug);
        try {
            const res = await fetch(`/api/admin/posts/${slug}`, { method: "DELETE" });
            if (res.ok) fetchPosts();
        } finally {
            setDeletingSlug(null);
        }
    };

    return (
        <div className="min-h-screen px-6 py-10 max-w-5xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-12">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Blog Admin</h1>
                    <p className="text-zinc-500 mt-1 text-sm">{posts.length} article{posts.length !== 1 ? "s" : ""} published</p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={fetchPosts}
                        className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-zinc-400 hover:text-white transition-colors"
                        title="Refresh"
                    >
                        <RefreshCw size={18} />
                    </button>
                    <Link href="/blog" target="_blank" className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-zinc-400 hover:text-white transition-colors" title="View Blog">
                        <ExternalLink size={18} />
                    </Link>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-zinc-400 hover:text-white transition-colors text-sm"
                    >
                        <LogOut size={16} /> Logout
                    </button>
                    <Link
                        href="/admin/new"
                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-black font-semibold text-sm hover:bg-zinc-100 transition-colors"
                    >
                        <Plus size={16} /> New Post
                    </Link>
                </div>
            </div>

            {/* Posts Table */}
            {loading ? (
                <div className="flex items-center justify-center py-32 text-zinc-500">
                    <div className="w-6 h-6 border-2 border-zinc-700 border-t-zinc-300 rounded-full animate-spin mr-3" />
                    Loading posts...
                </div>
            ) : posts.length === 0 ? (
                <div className="text-center py-32">
                    <BookOpen size={48} className="mx-auto mb-4 text-zinc-700" />
                    <h3 className="text-xl font-semibold text-zinc-400 mb-2">No posts yet</h3>
                    <p className="text-zinc-600 mb-6">Start by creating your first article.</p>
                    <Link href="/admin/new" className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white text-black font-semibold hover:bg-zinc-100 transition-colors">
                        <Plus size={18} /> Write First Post
                    </Link>
                </div>
            ) : (
                <div className="flex flex-col gap-3">
                    {posts.map((post) => (
                        <div
                            key={post.slug}
                            className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-white/[0.03] border border-white/[0.07] hover:bg-white/[0.06] hover:border-white/[0.12] transition-all"
                        >
                            <div className="flex-grow min-w-0">
                                <h3 className="font-semibold text-zinc-200 truncate mb-2">{post.title}</h3>
                                <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-500">
                                    <span className="flex items-center gap-1.5">
                                        <Calendar size={12} /> {post.date}
                                    </span>
                                    {post.tags.slice(0, 3).map(tag => (
                                        <span key={tag} className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-zinc-800/60 text-zinc-400 border border-white/5">
                                            <Tag size={10} /> {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="flex items-center gap-2 shrink-0">
                                <Link
                                    href={`/blog/${post.slug}`}
                                    target="_blank"
                                    className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-zinc-500 hover:text-white transition-colors"
                                    title="Preview"
                                >
                                    <ExternalLink size={16} />
                                </Link>
                                <Link
                                    href={`/admin/edit/${post.slug}`}
                                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-zinc-300 hover:text-white hover:bg-white/10 transition-colors text-sm font-medium"
                                >
                                    <PenSquare size={15} /> Edit
                                </Link>
                                <button
                                    onClick={() => handleDelete(post.slug)}
                                    disabled={deletingSlug === post.slug}
                                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition-colors text-sm font-medium disabled:opacity-50"
                                    title="Delete"
                                >
                                    {deletingSlug === post.slug ? (
                                        <div className="w-4 h-4 border-2 border-red-400/30 border-t-red-400 rounded-full animate-spin" />
                                    ) : (
                                        <Trash2 size={15} />
                                    )}
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
