import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import fs from "fs";
import path from "path";

const postsDirectory = path.join(process.cwd(), "content/blogs");

async function isAuthenticated(): Promise<boolean> {
    const cookieStore = await cookies();
    return cookieStore.get("admin_session")?.value === "1";
}

function slugifyTitle(title: string): string {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .trim();
}

function estimateReadTime(content: string): string {
    const words = content.split(/\s+/).length;
    const minutes = Math.max(1, Math.round(words / 200));
    return `${minutes} min read`;
}

export async function GET() {
    if (!(await isAuthenticated())) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!fs.existsSync(postsDirectory)) {
        return NextResponse.json([]);
    }

    const files = fs.readdirSync(postsDirectory).filter(f => f.endsWith(".md"));
    const posts = files.map(file => {
        const slug = file.replace(/\.md$/, "");
        const content = fs.readFileSync(path.join(postsDirectory, file), "utf8");
        // Extract frontmatter title for display
        const titleMatch = content.match(/^title:\s*["']?(.+?)["']?\s*$/m);
        const dateMatch = content.match(/^date:\s*(.+)$/m);
        const tagsMatch = content.match(/^tags:\s*\[(.*?)\]/m);
        return {
            slug,
            title: titleMatch?.[1] ?? slug,
            date: dateMatch?.[1] ?? "",
            tags: tagsMatch?.[1]?.split(",").map(t => t.trim().replace(/['"]/g, "")) ?? [],
        };
    });

    return NextResponse.json(posts);
}

export async function POST(req: NextRequest) {
    try {
        if (!(await isAuthenticated())) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();
        const { title, slug: rawSlug, excerpt, tags, content, date } = body;

        if (!title || !content) {
            return NextResponse.json({ error: "Title and content are required" }, { status: 400 });
        }

        const slug = rawSlug || slugifyTitle(title);

        // Safely parse date
        let postDate = new Date().toISOString().split("T")[0];
        if (date) {
            try {
                const parsed = new Date(date);
                if (!isNaN(parsed.getTime())) {
                    postDate = parsed.toISOString().split("T")[0];
                }
            } catch {
                // fallback to today safely
            }
        }

        // Safely parse tags
        let tagsArray: string[] = [];
        try {
            if (typeof tags === "string" && tags.trim().length > 0) {
                tagsArray = tags.split(",").map((t: string) => t.trim()).filter(Boolean);
            } else if (Array.isArray(tags)) {
                tagsArray = tags.filter(Boolean).map(String);
            }
        } catch {
            // fallback to empty array
        }

        // Safely estimate read time
        let readTime = "1 min read";
        try {
            readTime = estimateReadTime(content || "");
        } catch { }

        const frontmatter = `---
title: "${title}"
excerpt: "${excerpt || ""}"
date: "${postDate}"
readTime: "${readTime}"
tags: [${tagsArray.map((t: string) => `"${t}"`).join(", ")}]
---

${content}`;

        if (!fs.existsSync(postsDirectory)) {
            fs.mkdirSync(postsDirectory, { recursive: true });
        }

        const filePath = path.join(postsDirectory, `${slug}.md`);
        fs.writeFileSync(filePath, frontmatter, "utf8");

        return NextResponse.json({ success: true, slug });
    } catch (err: unknown) {
        console.error("GLOBAL API ERROR IN POST:", err);
        return NextResponse.json({ error: "Server crashed: " + (err instanceof Error ? err.message : String(err)) }, { status: 500 });
    }
}
