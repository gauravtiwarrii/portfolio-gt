import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import ProjectCaseStudy from "@/components/work/ProjectCaseStudy";
import { additionalSystems, featuredProjects } from "@/data/projects";

export default function SelectedWork() {
  return (
    <section id="work" className="section" aria-labelledby="work-title">
      <div className="shell">
        <span className="section__index">02 — Work</span>

        <div className="section__body">
          <header className="max-w-[60ch]">
            <h2 id="work-title" className="section-title font-medium">
              Selected Work
            </h2>
            <p className="lede mt-4">
              Systems I&apos;ve designed, engineered and shipped.
            </p>
          </header>

          <div className="work-layout mt-16">
            <nav className="work-index" aria-label="Featured project index">
              <div className="work-index__heading mono">
                <span>Case files</span>
                <span>{String(featuredProjects.length).padStart(2, "0")}</span>
              </div>
              <ol className="work-index__list">
                {featuredProjects.map((project, index) => (
                  <li key={project.slug}>
                    <a href={`#project-${project.slug}`} data-cursor="view">
                      <span className="mono">{String(index + 1).padStart(2, "0")}</span>
                      <span>{project.title}</span>
                    </a>
                  </li>
                ))}
              </ol>
              <Link href="/projects" className="work-index__archive">
                Project archive <ArrowUpRight size={12} aria-hidden="true" />
              </Link>
            </nav>

            <div className="work-layout__spreads">
              {featuredProjects.map((project, i) => (
                <ProjectCaseStudy key={project.slug} project={project} index={i} />
              ))}
            </div>
          </div>

          {/* ── Secondary builds ──────────────────────────────── */}
          {additionalSystems.length > 0 && (
            <div className="mt-20 border-t border-line pt-12">
              <h3 className="mono text-[0.625rem] uppercase tracking-[0.18em] text-fg-faint">
                Also built
              </h3>
              <ul className="mt-6">
                {additionalSystems.map((item) => (
                  <li
                    key={item.title}
                    className="group grid gap-2 border-b border-line py-5 md:grid-cols-12 md:items-baseline md:gap-6"
                  >
                    <div className="md:col-span-4">
                      <p className="text-[0.9375rem] font-medium">
                        {item.title}
                      </p>
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
                          Source
                          <ArrowUpRight size={12} aria-hidden="true" />
                        </a>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
