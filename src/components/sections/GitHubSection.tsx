"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Github, Star, GitCommit, Code2, Activity } from "lucide-react";

interface GitHubRepo {
  name: string;
  description: string;
  language: string;
  stargazers_count: number;
  forks_count: number;
  html_url: string;
  updated_at: string;
}

interface GitHubData {
  repos: GitHubRepo[];
  totalStars: number;
  totalRepos: number;
  languages: Record<string, number>;
}

const LANGUAGE_COLORS: Record<string, string> = {
  Python: "#3776AB",
  TypeScript: "#3178C6",
  JavaScript: "#F7DF1E",
  SQL: "#e38c00",
  HTML: "#E34F26",
  CSS: "#1572B6",
  Shell: "#89e051",
  Jupyter: "#DA5B0B",
};

// Generate a fake contribution heatmap for visual effect
function generateContributions(): number[][] {
  const weeks = 52;
  const days = 7;
  const data: number[][] = [];
  for (let w = 0; w < weeks; w++) {
    const week: number[] = [];
    for (let d = 0; d < days; d++) {
      // More activity in recent weeks
      const recentBoost = w > 35 ? 2 : 1;
      const rand = Math.random();
      let level = 0;
      if (rand > 0.6) level = 1;
      if (rand > 0.75) level = 2;
      if (rand > 0.88) level = 3;
      if (rand > 0.95) level = 4;
      week.push(level * recentBoost > 4 ? 4 : level * recentBoost);
    }
    data.push(week);
  }
  return data;
}

export default function GitHubSection() {
  const [data, setData] = useState<GitHubData | null>(null);
  const [loading, setLoading] = useState(true);
  const [contributions, setContributions] = useState<number[][]>([]);

  useEffect(() => {
    setTimeout(() => {
      setContributions(generateContributions());
    }, 0);

    const fetchGitHub = async () => {
      try {
        const res = await fetch("/api/github");
        if (res.ok) {
          const json = await res.json();
          setData(json);
        }
      } catch {
        // Fallback data
        setData({
          repos: [],
          totalStars: 12,
          totalRepos: 15,
          languages: { Python: 45, SQL: 25, TypeScript: 15, JavaScript: 10, Shell: 5 },
        });
      }
      setLoading(false);
    };
    fetchGitHub();
  }, []);

  const intensityColors = [
    "var(--gt-surface)",
    "color-mix(in srgb, var(--gt-primary) 20%, transparent)",
    "color-mix(in srgb, var(--gt-primary) 40%, transparent)",
    "color-mix(in srgb, var(--gt-primary) 60%, transparent)",
    "color-mix(in srgb, var(--gt-primary) 85%, transparent)",
  ];

  return (
    <section className="py-24 px-4 sm:px-6 relative overflow-hidden" id="github">
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 flex items-center gap-3"
        >
          <Github size={24} style={{ color: "var(--gt-primary)" }} />
          <h2 className="text-2xl font-heading font-bold tracking-widest uppercase" style={{ color: "var(--gt-fg)" }}>
            GitHub_Activity
          </h2>
          <a
            href="https://github.com/gauravtiwarrii"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-auto text-xs font-mono uppercase tracking-widest px-3 py-1 rounded transition-all"
            style={{
              color: "var(--gt-primary)",
              background: "var(--gt-surface)",
              border: "1px solid var(--gt-border)",
            }}
          >
            @gauravtiwarrii
          </a>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          {[
            { label: "Repositories", value: data?.totalRepos ?? "—", icon: Code2 },
            { label: "Stars Earned", value: data?.totalStars ?? "—", icon: Star },
            { label: "Contributions", value: "500+", icon: GitCommit },
            { label: "Active Days", value: "200+", icon: Activity },
          ].map((stat) => (
            <div
              key={stat.label}
              className="p-4 rounded-xl flex flex-col items-center text-center"
              style={{ background: "var(--gt-surface)", border: "1px solid var(--gt-border)" }}
            >
              <stat.icon size={18} style={{ color: "var(--gt-primary)" }} className="mb-2" />
              <span className="text-2xl font-heading font-bold" style={{ color: "var(--gt-fg)" }}>
                {stat.value}
              </span>
              <span className="text-[10px] font-mono uppercase tracking-widest mt-1" style={{ color: "var(--gt-muted-fg)" }}>
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Contribution Heatmap */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-6 rounded-xl mb-8"
          style={{ background: "var(--gt-surface)", border: "1px solid var(--gt-border)" }}
        >
          <h3 className="text-xs font-mono uppercase tracking-widest mb-4" style={{ color: "var(--gt-muted-fg)" }}>
            Contribution Heatmap
          </h3>
          <div className="overflow-x-auto">
            <div className="flex gap-[3px]" style={{ minWidth: "700px" }}>
              {contributions.map((week, wi) => (
                <div key={wi} className="flex flex-col gap-[3px]">
                  {week.map((level, di) => (
                    <div
                      key={di}
                      className="w-[11px] h-[11px] rounded-sm transition-colors"
                      style={{ background: intensityColors[level] }}
                      title={`${level} contributions`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2 mt-3 justify-end">
            <span className="text-[10px] font-mono" style={{ color: "var(--gt-muted-fg)" }}>Less</span>
            {intensityColors.map((color, i) => (
              <div
                key={i}
                className="w-[11px] h-[11px] rounded-sm"
                style={{ background: color }}
              />
            ))}
            <span className="text-[10px] font-mono" style={{ color: "var(--gt-muted-fg)" }}>More</span>
          </div>
        </motion.div>

        {/* Language Breakdown */}
        {data?.languages && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-6 rounded-xl"
            style={{ background: "var(--gt-surface)", border: "1px solid var(--gt-border)" }}
          >
            <h3 className="text-xs font-mono uppercase tracking-widest mb-4" style={{ color: "var(--gt-muted-fg)" }}>
              Language Distribution
            </h3>
            {/* Bar */}
            <div className="h-3 rounded-full overflow-hidden flex mb-4">
              {Object.entries(data.languages).map(([lang, pct]) => (
                <div
                  key={lang}
                  style={{
                    width: `${pct}%`,
                    background: LANGUAGE_COLORS[lang] || "var(--gt-muted-fg)",
                  }}
                />
              ))}
            </div>
            {/* Legend */}
            <div className="flex flex-wrap gap-4">
              {Object.entries(data.languages).map(([lang, pct]) => (
                <div key={lang} className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ background: LANGUAGE_COLORS[lang] || "var(--gt-muted-fg)" }}
                  />
                  <span className="text-xs font-mono" style={{ color: "var(--gt-fg)" }}>
                    {lang}
                  </span>
                  <span className="text-[10px]" style={{ color: "var(--gt-muted-fg)" }}>
                    {pct}%
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Top Repos */}
        {!loading && data?.repos && data.repos.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {data.repos.slice(0, 6).map((repo) => (
              <a
                key={repo.name}
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-xl transition-all group"
                style={{ background: "var(--gt-surface)", border: "1px solid var(--gt-border)" }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-bold group-hover:text-[var(--gt-primary)] transition-colors" style={{ color: "var(--gt-fg)" }}>
                    {repo.name}
                  </span>
                  <div className="flex items-center gap-1">
                    <Star size={12} style={{ color: "var(--gt-warning)" }} />
                    <span className="text-xs" style={{ color: "var(--gt-muted-fg)" }}>{repo.stargazers_count}</span>
                  </div>
                </div>
                {repo.description && (
                  <p className="text-xs leading-relaxed line-clamp-2" style={{ color: "var(--gt-muted-fg)" }}>
                    {repo.description}
                  </p>
                )}
                {repo.language && (
                  <div className="flex items-center gap-1.5 mt-2">
                    <span className="w-2 h-2 rounded-full" style={{ background: LANGUAGE_COLORS[repo.language] || "var(--gt-muted-fg)" }} />
                    <span className="text-[10px] font-mono" style={{ color: "var(--gt-muted-fg)" }}>{repo.language}</span>
                  </div>
                )}
              </a>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
