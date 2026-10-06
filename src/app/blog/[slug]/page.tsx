import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { SITE } from "@/data/site";
import ReadingProgress from "@/components/ReadingProgress";
import ActionBar from "./ActionBar";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  const ogUrl = `/api/og?title=${encodeURIComponent(post.title).slice(0, 100)}&type=Blog%20Post`;
  return {
    title: post.title,
    description: post.excerpt,
    authors: [{ name: "Gaurav Tiwari", url: SITE.url }],
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `/blog/${slug}`,
      type: "article",
      publishedTime: post.date,
      authors: ["Gaurav Tiwari"],
      tags: post.tags,
      images: [ogUrl],
    },
    twitter: { card: "summary_large_image", title: post.title, description: post.excerpt, images: [ogUrl] },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const related = getAllPosts()
    .filter(
      (p) => p.slug !== post.slug && p.tags.some((t) => post.tags.includes(t)),
    )
    .slice(0, 3);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    url: `${SITE.url}/blog/${post.slug}`,
    datePublished: post.date,
    author: { "@type": "Person", name: "Gaurav Tiwari", url: SITE.url },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
      { "@type": "ListItem", position: 2, name: "Journal", item: `${SITE.url}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: `${SITE.url}/blog/${post.slug}` },
    ],
  };

  return (
    <article className="article-page shell">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ReadingProgress />

      <nav className="article-breadcrumb" aria-label="Breadcrumb">
        <Link href="/" className="group inline-flex items-center gap-2">
          Home
        </Link>
        <span aria-hidden="true">/</span>
        <Link href="/blog" className="group inline-flex items-center gap-2">
          <ArrowLeft size={13} aria-hidden="true" className="transition-transform group-hover:-translate-x-1" />
          Journal
        </Link>
        <span aria-hidden="true">/</span>
        <span>{post.title}</span>
      </nav>

      <header className="article-masthead">
        <p className="eyebrow">Journal / Technical notes</p>
        <ul className="article-tags" aria-label="Topics">
          {post.tags.map((tag) => <li key={tag}>{tag}</li>)}
        </ul>
        <h1 className="article-title">{post.title}</h1>
        <p className="article-excerpt">{post.excerpt}</p>
        <div className="article-meta mono">
          <span><Calendar size={13} aria-hidden="true" />{post.date}</span>
          <span><Clock size={13} aria-hidden="true" />{post.readTime}</span>
          <span>By Gaurav Tiwari</span>
        </div>
      </header>

      <div className="article-body" id="article-content">
        <div className="markdown">
          <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
            {post.content}
          </ReactMarkdown>
        </div>
      </div>

      <section aria-labelledby="author-box" className="mt-12 border border-line p-5">
        <h2 id="author-box" className="font-medium">About the author</h2>
        <p className="mt-2 text-sm leading-relaxed text-fg-muted">
          Gaurav Tiwari is a software and data engineer building production-grade
          software, data platforms and AI systems. More background on the{" "}
          <Link href="/about" className="link">About page</Link>, source code on{" "}
          <a href={SITE.github} target="_blank" rel="noopener noreferrer" className="link">GitHub</a>.
        </p>
      </section>

      {related.length > 0 && (
        <nav aria-label="Related articles" className="mt-12">
          <h2 className="mono text-[0.625rem] uppercase tracking-[0.18em] text-fg-faint">
            Related notes
          </h2>
          <ul className="mt-4 grid gap-4 md:grid-cols-3">
            {related.map((item) => (
              <li key={item.slug} className="border border-line p-4">
                <Link href={`/blog/${item.slug}`} className="group block">
                  <p className="mono text-[0.625rem] uppercase tracking-[0.14em] text-fg-faint">
                    {(item.tags ?? []).slice(0, 2).join(" · ")}
                  </p>
                  <p className="mt-2 font-medium leading-snug group-hover:text-accent">
                    {item.title}
                  </p>
                  <p className="mono mt-2 text-[0.6875rem] text-fg-faint">{item.readTime}</p>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}

      <ActionBar />
    </article>
  );
}