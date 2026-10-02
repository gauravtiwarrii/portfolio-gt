import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Github } from "lucide-react";
import { additionalSystems, projects } from "@/data/projects";
import { SITE } from "@/data/site";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Full-stack products, data platforms, distributed systems and AI workflows built by Gaurav Tiwari.",
  alternates: { canonical: "/projects" },
};

/* ───────────────────────────────────────────────────────────────
   Project index

   An index, not a second homepage: every build in one scannable
   list, with the case studies linked through. Status comes from the
   project data — nothing is labelled "live" that isn't.
   ─────────────────────────────────────────────────────────────── */

const statusDot = (status: string) =>
  status === "Live" ? "bg-ok" : status === "Building" ? "bg-accent" : "bg-[var(--fg-faint)]";

export default function ProjectsPage() {
  return (
    <div className="shell pb-32 pt-[128px] md:pt-[152px]">
      <header className="max-w-[64ch] border-b border-line pb-12">
        <p className="eyebrow">Index</p>
        <h1 className="mt-6 text-[2.5rem] font-medium leading-[1.05] md:text-[3rem] xl:text-[3.75rem]">
          Everything I&apos;ve built.
        </h1>
        <p className="lede mt-6">
          {projects.length} case studies and {additionalSystems.length} smaller
          systems. Each case study covers the problem, the architecture and the
          parts that took engineering.
        </p>
      </header>

      {/* ── Case studies ────────────────────────────────────────── */}
      <ol className="mt-16">
        {projects.map((project, i) => (
          <li key={project.slug} className="border-b border-line">
            <Link
              href={`/projects/${project.slug}`}
              data-cursor="view"
              className="group grid gap-4 py-8 md:grid-cols-12 md:gap-8 md:py-10"
            >
              <div className="flex items-baseline gap-4 md:col-span-5">
                <span className="mono text-[0.6875rem] text-fg-faint">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h2 className="text-[1.375rem] font-medium transition-colors duration-200 group-hover:text-accent md:text-[1.625rem]">
                    {project.title}
                  </h2>
                  <p className="mono mt-2 text-[0.6875rem] uppercase tracking-[0.14em] text-fg-faint">
                    {project.category}
                  </p>
                </div>
              </div>

              <p className="max-w-[54ch] text-[0.9375rem] leading-relaxed text-fg-muted md:col-span-5">
                {project.description}
              </p>

              <div className="flex items-start justify-between gap-6 md:col-span-2 md:flex-col md:items-end md:gap-3">
                <span className="mono inline-flex items-center gap-2 text-[0.6875rem] text-fg-faint">
                  <span
                    aria-hidden="true"
                    className={`h-1.5 w-1.5 rounded-full ${statusDot(project.status)}`}
                  />
                  {project.status} · {project.year}
                </span>
                <ArrowUpRight
                  size={16}
                  aria-hidden="true"
                  className="text-fg-faint transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                />
              </div>
            </Link>
          </li>
        ))}
      </ol>

      {/* ── Secondary builds ────────────────────────────────────── */}
      <section aria-labelledby="also-built" className="mt-20">
        <h2
          id="also-built"
          className="mono text-[0.625rem] uppercase tracking-[0.18em] text-fg-faint"
        >
          Also built
        </h2>
        <ul className="mt-6 border-t border-line">
          {additionalSystems.map((item) => (
            <li
              key={item.title}
              className="grid gap-2 border-b border-line py-5 md:grid-cols-12 md:items-baseline md:gap-6"
            >
              <div className="md:col-span-4">
                <p className="text-[0.9375rem] font-medium">{item.title}</p>
                <p className="mono mt-1 text-[0.6875rem] text-fg-faint">
                  {item.year}
                </p>
              </div>
              <p className="text-sm leading-relaxed text-fg-muted md:col-span-5">
                {item.summary}
              </p>
              <p className="mono text-[0.6875rem] leading-relaxed text-fg-faint md:col-span-2">
                {item.stack.join(" · ")}
              </p>
              <div className="md:col-span-1 md:justify-self-end">
                {item.github && (
                  <a
                    href={item.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-fg-muted transition-colors duration-150 hover:text-fg"
                  >
                    <Github size={13} aria-hidden="true" />
                    Source
                  </a>
                )}
              </div>
            </li>
          ))}
        </ul>
      </section>

      <p className="mt-16 text-sm text-fg-muted">
        More on{" "}
        <a
          href={SITE.github}
          target="_blank"
          rel="noopener noreferrer"
          className="link"
        >
          GitHub
        </a>
        .
      </p>
    </div>
  );
}
