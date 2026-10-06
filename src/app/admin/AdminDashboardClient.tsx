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
        <main className="admin-dashboard">
            {/* Header */}
            <header className="admin-dashboard__header">
                <div>
                    <p className="eyebrow">GT / CMS / Journal</p>
                    <h1 className="admin-dashboard__title">Blog admin</h1>
                    <p className="admin-dashboard__count">{posts.length} article{posts.length !== 1 ? "s" : ""} published</p>
                </div>
                <div className="admin-dashboard__actions">
                    <button
                        onClick={fetchPosts}
                        className="admin-icon-action"
                        aria-label="Refresh articles"
                        title="Refresh"
                    >
                        <RefreshCw size={18} />
                    </button>
                    <Link href="/blog" target="_blank" className="admin-icon-action" aria-label="View blog" title="View Blog">
                        <ExternalLink size={18} />
                    </Link>
                    <button
                        onClick={handleLogout}
                        className="admin-action-secondary"
                    >
                        <LogOut size={16} /> Logout
                    </button>
                    <Link
                        href="/admin/new"
                        className="admin-action-primary"
                    >
                        <Plus size={16} /> New Post
                    </Link>
                </div>
            </header>

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
                <div className="admin-post-list">
                    {posts.map((post) => (
                        <article
                            key={post.slug}
                            className="admin-post-row"
                        >
                            <div className="admin-post-row__content">
                                <h2 className="admin-post-row__title">{post.title}</h2>
                                <div className="admin-post-row__meta">
                                    <span className="flex items-center gap-1.5">
                                        <Calendar size={12} /> {post.date}
                                    </span>
                                    {post.tags.slice(0, 3).map(tag => (
                                        <span key={tag} className="admin-post-tag">
                                            <Tag size={10} /> {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="admin-post-row__actions">
                                <Link
                                    href={`/blog/${post.slug}`}
                                    target="_blank"
                                    className="admin-icon-action"
                                    aria-label={`Preview ${post.title}`}
                                    title="Preview"
                                >
                                    <ExternalLink size={16} />
                                </Link>
                                <Link
                                    href={`/admin/edit/${post.slug}`}
                                    className="admin-action-secondary"
                                >
                                    <PenSquare size={15} /> Edit
                                </Link>
                                <button
                                    onClick={() => handleDelete(post.slug)}
                                    disabled={deletingSlug === post.slug}
                                    className="admin-action-danger"
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
                        </article>
                    ))}
                </div>
            )}
        </main>
    );
}
