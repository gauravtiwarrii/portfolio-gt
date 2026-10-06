import type { MetadataRoute } from "next";
import { SITE } from "@/data/site";

/* Sitemap — canonical domain is hellogaurav.me (AdSense + SEO must agree). */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url.replace(/\/$/, "");
  const now = new Date();
  return [
    { url: `${base}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/projects`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
  ];
}
