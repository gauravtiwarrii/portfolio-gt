"use client";

import { useEffect, useState } from "react";
import { Star, GitFork } from "lucide-react";

interface GithubStatsProps {
    url: string;
}

export default function GithubStats({ url }: GithubStatsProps) {
    const [stats, setStats] = useState<{ stars: number; forks: number } | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchStats() {
            try {
                // Parse owner/repo from URL
                // e.g. https://github.com/gauravtiwarrii/retail-etl
                const match = url.match(/github\.com\/([^\/]+)\/([^\/]+)/);
                if (!match) {
                    setLoading(false);
                    return;
                }

                const owner = match[1];
                const repo = match[2];

                const res = await fetch(`https://api.github.com/repos/${owner}/${repo}`);
                if (!res.ok) {
                    setLoading(false);
                    return;
                }

                const data = await res.json();
                setStats({
                    stars: data.stargazers_count || 0,
                    forks: data.forks_count || 0,
                });
            } catch {
                // Silently fail for invalid repos or rate limits
            } finally {
                setLoading(false);
            }
        }

        fetchStats();
    }, [url]);

    if (loading || !stats) {
        return null; // Silent fail/loading, don't show empty stats
    }

    return (
        <div className="flex gap-3">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mono font-bold tracking-wider hover:bg-amber-500/20 transition-colors shadow-[0_0_15px_rgba(245,158,11,0.15)]">
                <Star size={14} className="fill-amber-400/50" />
                {stats.stars} Stars
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-mono font-bold tracking-wider hover:bg-indigo-500/20 transition-colors shadow-[0_0_15px_rgba(99,102,241,0.15)]">
                <GitFork size={14} />
                {stats.forks} Forks
            </div>
        </div>
    );
}
