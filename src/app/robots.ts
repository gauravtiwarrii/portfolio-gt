import type { MetadataRoute } from "next";
import { SITE } from "@/data/site";

/* robots.txt — allow AdSense / Googlebot, point to canonical sitemap. */
export default function robots(): MetadataRoute.Robots {
  const base = SITE.url.replace(/\/$/, "");
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${base}/sitemap.xml`,
  };
}
