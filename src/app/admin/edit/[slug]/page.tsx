import { notFound } from "next/navigation";
import PostEditor from "../../PostEditor";

interface EditPageProps {
    params: { slug: string };
}

async function getPostRaw(slug: string): Promise<string | null> {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/admin/posts/${slug}`, {
            headers: { Cookie: `admin_session=1` },
            cache: "no-store",
        });
        if (!res.ok) return null;
        const data = await res.json();
        return data.raw;
    } catch {
        return null;
    }
}

function parseFrontmatter(raw: string) {
    const match = raw.match(/^---\n([\s\S]*?)\n---\n\n?([\s\S]*)$/);
    if (!match) return { title: "", excerpt: "", tags: "", date: "", content: raw };

    const fm = match[1];
    const content = match[2];

    const get = (key: string) => fm.match(new RegExp(`^${key}:\\s*"?(.+?)"?\\s*$`, "m"))?.[1] ?? "";
    const tagsMatch = fm.match(/^tags:\s*\[(.*?)\]/m);
    const tags = tagsMatch?.[1]?.replace(/["']/g, "").replace(/,\s*/g, ", ") ?? "";

    return {
        title: get("title"),
        excerpt: get("excerpt"),
        date: get("date"),
        tags,
        content,
    };
}

export default async function EditPostPage({ params }: EditPageProps) {
    const raw = await getPostRaw(params.slug);
    if (!raw) notFound();

    const initialData = parseFrontmatter(raw);

    return <PostEditor mode="edit" slug={params.slug} initialData={initialData} />;
}
