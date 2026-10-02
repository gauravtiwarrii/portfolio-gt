import { NextResponse } from "next/server";
import { SITE } from "@/data/site";

/* ───────────────────────────────────────────────────────────────
   GitHub — live repository data

   There is no fallback dataset. If the API is unreachable or rate
   limited this returns `available: false` and the UI renders a link
   to the profile instead of numbers. Inventing a star count or a
   language split would make the section a liability, not an asset.
   ─────────────────────────────────────────────────────────────── */

export const revalidate = 3600;

interface GitHubRepo {
  name: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  html_url: string;
  pushed_at: string;
  fork: boolean;
  archived: boolean;
}

export async function GET() {
  const headers: HeadersInit = { Accept: "application/vnd.github+json" };
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  try {
    const [userRes, repoRes] = await Promise.all([
      fetch(`https://api.github.com/users/${SITE.githubHandle}`, {
        headers,
        next: { revalidate },
      }),
      fetch(
        `https://api.github.com/users/${SITE.githubHandle}/repos?sort=pushed&per_page=100`,
        { headers, next: { revalidate } },
      ),
    ]);

    if (!userRes.ok || !repoRes.ok) {
      return NextResponse.json({ available: false });
    }

    const user = (await userRes.json()) as {
      public_repos: number;
      created_at: string;
    };
    const all = (await repoRes.json()) as GitHubRepo[];

    const owned = all.filter((r) => !r.fork);
    const languages = [
      ...new Set(owned.map((r) => r.language).filter(Boolean)),
    ] as string[];

    return NextResponse.json({
      available: true,
      publicRepos: user.public_repos,
      totalStars: owned.reduce((sum, r) => sum + r.stargazers_count, 0),
      /* Distinct primary languages across owned repositories — a count
         of repositories, never presented as a proficiency split. */
      languages: languages.slice(0, 8),
      memberSince: user.created_at,
      repos: owned.slice(0, 6).map((r) => ({
        name: r.name,
        description: r.description,
        language: r.language,
        stars: r.stargazers_count,
        forks: r.forks_count,
        url: r.html_url,
        pushedAt: r.pushed_at,
        archived: r.archived,
      })),
    });
  } catch (error) {
    console.error("GitHub API unreachable:", error);
    return NextResponse.json({ available: false });
  }
}
