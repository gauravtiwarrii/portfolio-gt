import Experience from "@/components/Experience";
import HeroSection from "@/components/HeroSection";
import Projects from "@/components/Projects";
import ChatWidget from "@/components/ChatWidget";
import TechMarquee from "@/components/TechMarquee";
import ContactSection from "@/components/ContactSection";
import BlogSection from "@/components/BlogSection";
import StatsSection from "@/components/StatsSection";
import SkillsCategory from "@/components/SkillsCategory";
import DataFlowVisualizer from "@/components/DataFlowVisualizer";
import styles from "./page.module.css";

import { getAllPosts } from "@/lib/blog";

export default function Home() {
  const allBlogs = getAllPosts().map(post => ({
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    date: post.date,
    readTime: post.readTime,
    tags: post.tags,
    url: `/blog/${post.slug}`
  }));

  const recentBlogs = allBlogs.slice(0, 4);

  return (
    <main className={styles.main}>
      <HeroSection />
      <DataFlowVisualizer />
      <StatsSection />
      <div className="section-divider"><div className="section-divider-icon" /></div>
      <TechMarquee />
      <div className="section-divider"><div className="section-divider-icon" /></div>
      <Projects />
      <div className="section-divider"><div className="section-divider-icon" /></div>
      <Experience />
      <div className="section-divider"><div className="section-divider-icon" /></div>
      <SkillsCategory />
      <div className="section-divider"><div className="section-divider-icon" /></div>
      <BlogSection blogs={recentBlogs} />
      <div className="section-divider"><div className="section-divider-icon" /></div>
      <ContactSection />
      <ChatWidget />
    </main>
  );
}
