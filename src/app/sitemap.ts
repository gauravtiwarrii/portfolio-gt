import type { MetadataRoute } from "next";
import { SITE } from "@/data/site";
import { getAllPosts } from "@/lib/blog";
import { projects } from "@/data/projects";

/* Sitemap — canonical domain is hellogaurav.me (AdSense + SEO must agree).
   Only canonical, indexable URLs. No admin, login, API or error routes. */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url.replace(/\/$/, "");
  const now = new Date();
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/projects`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.6 },
    { url: `${base}/privacy-policy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/cookie-policy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/disclaimer`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];
  let dynamic: MetadataRoute.Sitemap = [];
  try {
    dynamic = [
      ...projects.map((p) => ({
        url: `${base}/projects/${p.slug}`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: 0.7,
      })),
      ...getAllPosts().map((post) => ({
        url: `${base}/blog/${post.slug}`,
        lastModified: post.date ? new Date(post.date) : now,
        changeFrequency: "monthly" as const,
        priority: 0.6,
      })),
    ];
  } catch {
    /* Build must never fail because content is unreadable. */
  }
  return [...staticPages, ...dynamic];
}
