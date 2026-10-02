import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { getPostBySlug } from "@/lib/blog";
import ReadingProgress from "@/components/ReadingProgress";
import ActionBar from "./ActionBar";
import styles from "./markdown.module.css";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  const ogUrl = `/api/og?title=${encodeURIComponent(post.title).slice(0, 100)}&type=Blog%20Post`;
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { title: post.title, description: post.excerpt, images: [ogUrl] },
    twitter: { card: "summary_large_image", title: post.title, description: post.excerpt, images: [ogUrl] },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <article className="article-page shell">
      <ReadingProgress />

      <nav className="article-breadcrumb" aria-label="Breadcrumb">
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
        </div>
      </header>

      <div className="article-body" id="article-content">
        <div className={styles.markdown}>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
        </div>
      </div>

      <ActionBar />
    </article>
  );
}