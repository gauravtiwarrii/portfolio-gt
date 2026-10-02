"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, GitFork, Star } from "lucide-react";
import { SITE } from "@/data/site";

/* ───────────────────────────────────────────────────────────────
   Building in Public — §21

   Reads live from /api/github. Three deliberate omissions:

   · No contribution heatmap. The REST API does not expose the
     contribution calendar, and the only way to draw one here would
     be to generate it. So it isn't drawn.
   · No language percentage ring. Repository counts are not a
     proficiency split and shouldn't be dressed up as one.
   · No numbers at all when the request fails — the section falls
     back to the profile link rather than cached figures.
   ─────────────────────────────────────────────────────────────── */

interface Repo {
  name: string;
  description: string | null;
  language: string | null;
  stars: number;
  forks: number;
  url: string;
  pushedAt: string;
  archived: boolean;
}

interface Payload {
  available: boolean;
  publicRepos?: number;
  totalStars?: number;
  languages?: string[];
  repos?: Repo[];
}

const relative = (iso: string) => {
  const days = Math.floor((Date.now() - new Date(iso).getTime()) / 86_400_000);
  if (days <= 0) return "today";
  if (days === 1) return "yesterday";
  if (days < 30) return `${days}d ago`;
  const months = Math.round(days / 30);
  if (months < 18) return `${months}mo ago`;
  return `${Math.round(days / 365)}y ago`;
};

export default function GitHubSection() {
  const [data, setData] = useState<Payload | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/github", { signal: controller.signal })
      .then((r) => (r.ok ? r.json() : { available: false }))
      .then(setData)
      .catch(() => setData({ available: false }));
    return () => controller.abort();
  }, []);

  const live = data?.available ? data : null;

  return (
    <section id="public" className="section" aria-labelledby="public-title">
      <div className="shell">
        <span className="section__index">07 — Public</span>

        <div className="section__body">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <header className="max-w-[60ch]">
              <h2 id="public-title" className="section-title font-medium">
                Building in Public
              </h2>
              <p className="lede mt-4">
                Every system on this page has its source open.
              </p>
            </header>

            <a
              href={SITE.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--secondary"
            >
              @{SITE.githubHandle}
              <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          </div>

          {/* ── Profile figures, only when live ─────────────────── */}
          <dl className="mt-12 grid grid-cols-2 gap-px border-y border-line bg-[var(--line)] sm:grid-cols-3">
            <Stat label="Public repositories" value={live?.publicRepos} />
            <Stat label="Stars received" value={live?.totalStars} />
            <Stat
              label="Primary languages"
              value={live?.languages?.length}
              detail={live?.languages?.slice(0, 4).join(" · ")}
            />
          </dl>

          {/* ── Recent pushes ──────────────────────────────────── */}
          <div className="mt-12">
            <h3 className="mono text-[0.625rem] uppercase tracking-[0.18em] text-fg-faint">
              Recently pushed
            </h3>

            {live?.repos && live.repos.length > 0 ? (
              <ul className="mt-5 border-t border-line">
                {live.repos.map((repo) => (
                  <li key={repo.name} className="border-b border-line">
                    <a
                      href={repo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group grid gap-2 py-4 transition-colors duration-200 md:grid-cols-12 md:items-baseline md:gap-6"
                    >
                      <span className="mono text-[0.9375rem] text-fg transition-colors duration-150 group-hover:text-accent md:col-span-4">
                        {repo.name}
                      </span>
                      <span className="text-sm leading-relaxed text-fg-muted md:col-span-5">
                        {repo.description ?? "No description."}
                      </span>
                      <span className="mono flex items-center gap-4 text-[0.6875rem] text-fg-faint md:col-span-3 md:justify-end">
                        {repo.language && <span>{repo.language}</span>}
                        {repo.stars > 0 && (
                          <span className="inline-flex items-center gap-1">
                            <Star size={11} aria-hidden="true" />
                            {repo.stars}
                          </span>
                        )}
                        {repo.forks > 0 && (
                          <span className="inline-flex items-center gap-1">
                            <GitFork size={11} aria-hidden="true" />
                            {repo.forks}
                          </span>
                        )}
                        <span>{relative(repo.pushedAt)}</span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              /* Skeleton while loading, and the resting state if the
                 API never answers. Identical on purpose — neither
                 case has anything true to show. */
              <ul className="mt-5 border-t border-line" aria-hidden="true">
                {Array.from({ length: 4 }).map((_, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-6 border-b border-line py-4"
                  >
                    <span className="h-3 w-[22%] bg-surface-2" />
                    <span className="h-3 w-[38%] bg-surface" />
                  </li>
                ))}
              </ul>
            )}

            {data && !data.available && (
              <p className="mt-5 text-sm text-fg-faint">
                Repository data isn&apos;t loading right now.{" "}
                <a
                  href={SITE.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link text-fg-muted"
                >
                  Open the profile on GitHub
                </a>
                .
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({
  label,
  value,
  detail,
}: {
  label: string;
  value?: number;
  detail?: string;
}) {
  return (
    <div className="bg-bg px-5 py-6">
      <dt className="mono text-[0.625rem] uppercase tracking-[0.16em] text-fg-faint">
        {label}
      </dt>
      <dd className="mt-3">
        {typeof value === "number" ? (
          <span className="mono text-[1.75rem] font-medium leading-none tracking-[-0.02em]">
            {value}
          </span>
        ) : (
          <span
            aria-hidden="true"
            className="mono block h-7 w-12 bg-surface-2"
          />
        )}
        {detail && (
          <span className="mono mt-2 block text-[0.6875rem] text-fg-faint">
            {detail}
          </span>
        )}
      </dd>
    </div>
  );
}
