import type { MetadataRoute } from "next";
import { SITE } from "@/data/site";

/* robots.txt — allow AdSense / Googlebot everywhere public, keep
   admin, auth APIs and Next internals out of the index. */
export default function robots(): MetadataRoute.Robots {
  const base = SITE.url.replace(/\/$/, "");
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/api/admin", "/api/contact"],
      },
      {
        userAgent: "Mediapartners-Google",
        allow: "/",
      },
    ],
    sitemap: `${base}/sitemap.xml`,
  };
}
