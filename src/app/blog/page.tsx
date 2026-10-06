import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";
import { SITE } from "@/data/site";
import BlogClient from "./BlogClient";

export const metadata: Metadata = {
  title: "Journal",
  description:
    "Technical notes by Gaurav Tiwari on data engineering, distributed systems and cloud architecture — ETL pipelines, streaming, warehousing and orchestration.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Journal — Gaurav Tiwari",
    description:
      "Technical notes on data engineering, distributed systems and cloud architecture.",
    url: "/blog",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Journal — Gaurav Tiwari",
    description:
      "Technical notes on data engineering, distributed systems and cloud architecture.",
  },
};

const blogIndexSchema = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: "Gaurav Tiwari — Journal",
  url: `${SITE.url}/blog`,
  description:
    "Technical notes on data engineering, distributed systems and cloud architecture.",
  author: { "@type": "Person", name: "Gaurav Tiwari", url: SITE.url },
};

export default function BlogPage() {
    const posts = getAllPosts();
    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(blogIndexSchema) }}
        />
        <BlogClient initialPosts={posts} />
      </>
    );
}
