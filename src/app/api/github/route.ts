import { NextResponse } from "next/server";

export const revalidate = 3600; // Cache for 1 hour

export async function GET() {
  const username = "gauravtiwarrii";

  try {
    const headers: HeadersInit = {
      Accept: "application/vnd.github.v3+json",
    };

    // Use token if available for higher rate limits
    if (process.env.GITHUB_TOKEN) {
      headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
    }

    const res = await fetch(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=30`,
      { headers, next: { revalidate: 3600 } }
    );

    if (!res.ok) {
      throw new Error(`GitHub API error: ${res.status}`);
    }

    const repos = await res.json();

    // Calculate stats
    const totalStars = repos.reduce(
      (sum: number, r: { stargazers_count: number }) => sum + r.stargazers_count,
      0
    );

    // Language distribution
    const langCount: Record<string, number> = {};
    let totalLangCount = 0;
    for (const repo of repos) {
      if (repo.language) {
        langCount[repo.language] = (langCount[repo.language] || 0) + 1;
        totalLangCount++;
      }
    }

    const languages: Record<string, number> = {};
    for (const [lang, count] of Object.entries(langCount)) {
      languages[lang] = Math.round(((count as number) / totalLangCount) * 100);
    }

    // Sort languages by percentage
    const sortedLanguages = Object.fromEntries(
      Object.entries(languages).sort(([, a], [, b]) => b - a)
    );

    return NextResponse.json({
      repos: repos.slice(0, 10).map(
        (r: {
          name: string;
          description: string;
          language: string;
          stargazers_count: number;
          forks_count: number;
          html_url: string;
          updated_at: string;
        }) => ({
          name: r.name,
          description: r.description,
          language: r.language,
          stargazers_count: r.stargazers_count,
          forks_count: r.forks_count,
          html_url: r.html_url,
          updated_at: r.updated_at,
        })
      ),
      totalStars,
      totalRepos: repos.length,
      languages: sortedLanguages,
    });
  } catch (error) {
    console.error("GitHub API error:", error);

    // Fallback data
    return NextResponse.json({
      repos: [],
      totalStars: 12,
      totalRepos: 15,
      languages: {
        Python: 45,
        SQL: 25,
        TypeScript: 15,
        JavaScript: 10,
        Shell: 5,
      },
    });
  }
}
