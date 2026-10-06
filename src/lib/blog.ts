import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "content/blogs");

export interface BlogPost {
    slug: string;
    title: string;
    excerpt: string;
    date: string;
    updated?: string;
    readTime: string;
    tags: string[];
    content: string;
    coverImage?: string;
}

/* AdSense reviewers flag thin placeholder posts instantly — only files
   with real front matter and a non-trivial body are listed. */
function isPublishable(data: Record<string, unknown>, content: string): boolean {
  const title = typeof data.title === "string" ? data.title.trim() : "";
  const excerpt = typeof data.excerpt === "string" ? data.excerpt.trim() : "";
  return title.length > 0 && excerpt.length > 0 && content.trim().length > 1500;
}

export function getAllPosts(): BlogPost[] {
    if (!fs.existsSync(postsDirectory)) {
        return [];
    }

    const fileNames = fs.readdirSync(postsDirectory);
    const listed: BlogPost[] = [];

    for (const fileName of fileNames) {
        if (!fileName.endsWith(".md")) continue;
        const slug = fileName.replace(/\.md$/, "");
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, "utf8");
        const { data, content } = matter(fileContents);
        if (!isPublishable(data as Record<string, unknown>, content)) continue;
        listed.push({
            slug,
            title: data.title,
            excerpt: data.excerpt,
            date: data.date,
            updated: data.updated,
            readTime: data.readTime,
            tags: data.tags || [],
            coverImage: data.coverImage,
            content,
        });
    }

    return listed.sort((a, b) => (new Date(a.date) > new Date(b.date) ? -1 : 1));
}

export function getPostBySlug(slug: string): BlogPost | null {
    try {
        const fullPath = path.join(postsDirectory, `${slug}.md`);
        const fileContents = fs.readFileSync(fullPath, "utf8");
        const { data, content } = matter(fileContents);

        return {
            slug,
            title: data.title,
            excerpt: data.excerpt,
            date: data.date,
            readTime: data.readTime,
            tags: data.tags || [],
            coverImage: data.coverImage,
            content,
        };
    } catch {
        return null;
    }
}
