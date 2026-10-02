"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, BookOpen, Calendar, Clock, Search } from "lucide-react";

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
}

export default function BlogClient({ initialPosts }: { initialPosts: BlogPost[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const query = searchQuery.trim().toLowerCase();
  const filteredPosts = initialPosts.filter((post) =>
    `${post.title} ${post.excerpt} ${(post.tags ?? []).join(" ")}`
      .toLowerCase()
      .includes(query),
  );

  return (
    <div className="blog-index shell">
      <header className="blog-masthead">
        <p className="eyebrow flex items-center gap-2">
          <BookOpen size={13} aria-hidden="true" />
          Journal / Engineering notes
        </p>
        <div className="blog-masthead__body">
          <div>
            <h1 className="blog-title">Technical writing</h1>
            <p className="lede mt-5 max-w-[58ch]">
              Deep dives into Data Engineering, Distributed Systems, and Cloud Architecture.
            </p>
          </div>
          <p className="blog-count mono">
            {String(initialPosts.length).padStart(2, "0")}
            <span> published notes</span>
          </p>
        </div>
      </header>

      <div className="blog-tools">
        <label className="blog-search">
          <Search size={15} aria-hidden="true" />
          <span className="sr-only">Search articles and tags</span>
          <input
            type="search"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Search articles or tags"
          />
        </label>
        <p className="blog-results mono" aria-live="polite">
          {String(filteredPosts.length).padStart(2, "0")} / {String(initialPosts.length).padStart(2, "0")} results
        </p>
      </div>

      {filteredPosts.length > 0 ? (
        <ol className="journal-list">
          {filteredPosts.map((post, index) => (
            <li key={post.slug}>
              <Link href={`/blog/${post.slug}`} className="journal-entry group" data-cursor="view">
                <span className="journal-entry__index mono">{String(index + 1).padStart(2, "0")}</span>
                <div className="journal-entry__content">
                  <p className="journal-entry__tags mono">{(post.tags ?? []).join(" · ")}</p>
                  <h2>{post.title}</h2>
                  <p className="journal-entry__excerpt">{post.excerpt}</p>
                  <div className="journal-entry__meta mono">
                    <span><Calendar size={12} aria-hidden="true" />{post.date}</span>
                    <span><Clock size={12} aria-hidden="true" />{post.readTime}</span>
                  </div>
                </div>
                <ArrowUpRight className="journal-entry__arrow" size={18} aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ol>
      ) : (
        <p className="journal-empty" role="status">
          No notes match “{searchQuery}”. Try another title or tag.
        </p>
      )}
    </div>
  );
}