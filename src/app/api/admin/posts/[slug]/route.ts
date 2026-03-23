import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import fs from "fs";
import path from "path";

const postsDirectory = path.join(process.cwd(), "content/blogs");

async function isAuthenticated(): Promise<boolean> {
    const cookieStore = await cookies();
    return cookieStore.get("admin_session")?.value === "1";
}

function estimateReadTime(content: string): string {
    const words = content.split(/\s+/).length;
    const minutes = Math.max(1, Math.round(words / 200));
    return `${minutes} min read`;
}

export async function GET(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
    if (!(await isAuthenticated())) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const slug = (await params).slug;
    const filePath = path.join(postsDirectory, `${slug}.md`);
    if (!fs.existsSync(filePath)) {
        return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const raw = fs.readFileSync(filePath, "utf8");
    return NextResponse.json({ raw });
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
    if (!(await isAuthenticated())) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const slug = (await params).slug;
    const body = await req.json();
    const { title, excerpt, tags, content, date } = body;
    const postDate = date || new Date().toISOString().split("T")[0];
    const tagsArray = typeof tags === "string"
        ? tags.split(",").map((t: string) => t.trim()).filter(Boolean)
        : tags || [];
    const readTime = estimateReadTime(content);

    const frontmatter = `---
title: "${title}"
excerpt: "${excerpt || ""}"
date: "${postDate}"
readTime: "${readTime}"
tags: [${tagsArray.map((t: string) => `"${t}"`).join(", ")}]
---

${content}`;

    const filePath = path.join(postsDirectory, `${slug}.md`);
    fs.writeFileSync(filePath, frontmatter, "utf8");

    return NextResponse.json({ success: true });
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
    if (!(await isAuthenticated())) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const slug = (await params).slug;
    const filePath = path.join(postsDirectory, `${slug}.md`);
    if (!fs.existsSync(filePath)) {
        return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    fs.unlinkSync(filePath);
    return NextResponse.json({ success: true });
}
