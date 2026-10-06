import type { Metadata } from "next";
import { projects } from "@/data/projects";

type Props = {
    params: Promise<{ slug: string }>;
    children: React.ReactNode;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const resolvedParams = await params;
    const project = projects.find((p) => p.slug === resolvedParams.slug);

    if (!project) return {};

    const encodeTitle = encodeURIComponent(project.title).slice(0, 100);
    const ogUrl = `/api/og?title=${encodeTitle}&type=Project`;

    return {
        title: `${project.title} | Gaurav Tiwari`,
        description: project.subtitle || project.description,
        alternates: { canonical: `/projects/${resolvedParams.slug}` },
        openGraph: {
            title: project.title,
            description: project.subtitle || project.description,
            images: [ogUrl],
        },
        twitter: {
            card: "summary_large_image",
            title: project.title,
            description: project.subtitle || project.description,
            images: [ogUrl],
        },
    };
}

export default function ProjectLayout({ children }: Props) {
    return <>{children}</>;
}
