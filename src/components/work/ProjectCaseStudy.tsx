import Link from "next/link";
import { ArrowUpRight, Github, Info } from "lucide-react";
import ArchitectureGraph from "@/components/systems/ArchitectureGraph";
import { featuredProjects, type Project } from "@/data/projects";

/* ───────────────────────────────────────────────────────────────
   ProjectCaseStudy

   Editorial, not a card. Each build gets a full-width spread:
   masthead, the problem, the decision, the flow, then the parts
   that took engineering. Diagram side alternates so six of these
   in a column don't read as a list.
   ─────────────────────────────────────────────────────────────── */

interface Props {
  project: Project;
  index: number;
}

export default function ProjectCaseStudy({ project, index }: Props) {
  const Icon = project.icon as React.ComponentType<{
    size?: number;
    className?: string;
    "aria-hidden"?: boolean;
  }>;
  const flip = index % 2 === 1;
  const n = String(index + 1).padStart(2, "0");
  const nextProject = featuredProjects[index + 1];

  return (
    <article
      aria-labelledby={`project-${project.slug}`}
      className="project-spread border-t border-line py-14 first:border-t-0 md:py-20"
    >
      {/* ── Masthead ──────────────────────────────────────────── */}
      <header className="grid gap-6 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <div className="flex items-center gap-3">
            <span className="mono text-[0.6875rem] text-fg-faint">{n}</span>
            <span aria-hidden="true" className="h-px w-6 bg-line-strong" />
            <Icon size={15} className="text-accent" aria-hidden={true} />
            <span className="mono text-[0.6875rem] uppercase tracking-[0.14em] text-fg-faint">
              {project.category}
            </span>
          </div>

          <h3
            id={`project-${project.slug}`}
            className="project-title mt-5 text-[2rem] font-medium md:text-[3rem] xl:text-[3.5rem]"
          >
            {project.title}
          </h3>
          <p className="project-subtitle mt-3 max-w-[54ch] text-[1.125rem] leading-relaxed text-fg">
            {project.subtitle}
          </p>
          <p className="mt-3 max-w-[54ch] text-[0.9375rem] leading-relaxed text-fg-muted">
            {project.description}
          </p>
        </div>

        <div className="lg:col-span-5 lg:pt-1">
          <dl className="grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-3 lg:justify-items-end">
            <div>
              <dt className="mono text-[0.625rem] uppercase tracking-[0.16em] text-fg-faint">
                Year
              </dt>
              <dd className="mono mt-1.5 text-xs text-fg-muted">{project.year}</dd>
            </div>
            <div>
              <dt className="mono text-[0.625rem] uppercase tracking-[0.16em] text-fg-faint">
                Status
              </dt>
              <dd className="mono mt-1.5 flex items-center gap-2 text-xs text-fg-muted">
                <span
                  aria-hidden="true"
                  className={[
                    "h-1.5 w-1.5 rounded-full",
                    project.status === "Live"
                      ? "bg-ok"
                      : project.status === "Building"
                        ? "bg-accent"
                        : "bg-[var(--fg-faint)]",
                  ].join(" ")}
                />
                {project.status}
              </dd>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <dt className="mono text-[0.625rem] uppercase tracking-[0.16em] text-fg-faint">
                Stack
              </dt>
              <dd className="mono mt-1.5 text-xs leading-relaxed text-fg-muted lg:text-right">
                {project.tags.slice(0, 5).join(" · ")}
              </dd>
            </div>
          </dl>
        </div>
      </header>

      {/* ── Narrative + flow ──────────────────────────────────── */}
      <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-12">
        <div
          className={[
            "space-y-8 lg:col-span-6",
            flip ? "lg:order-2" : "lg:order-1",
          ].join(" ")}
        >
          <div>
            <h4 className="mono text-[0.625rem] uppercase tracking-[0.18em] text-fg-faint">
              Engineering challenge
            </h4>
            <p className="mt-3 max-w-[58ch] text-[0.9375rem] leading-relaxed text-fg-muted">
              {project.details.challenge}
            </p>
          </div>

          <div>
            <h4 className="mono text-[0.625rem] uppercase tracking-[0.18em] text-fg-faint">
              Approach
            </h4>
            <p className="mt-3 max-w-[58ch] text-[0.9375rem] leading-relaxed text-fg-muted">
              {project.details.solution}
            </p>
          </div>

          {project.details.performance.length > 0 && (
            <div>
              <h4 className="mono text-[0.625rem] uppercase tracking-[0.18em] text-fg-faint">
                Measured
              </h4>
              <ul className="mt-3 space-y-2">
                {project.details.performance.map((stat) => (
                  <li
                    key={stat}
                    className="border-l border-line-accent pl-3 text-[0.9375rem] text-fg-muted"
                  >
                    {stat}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {project.dataNote && (
            <p className="flex gap-2.5 border-t border-line pt-4 text-xs leading-relaxed text-fg-faint">
              <Info size={13} className="mt-0.5 shrink-0" aria-hidden="true" />
              <span className="max-w-[56ch]">{project.dataNote}</span>
            </p>
          )}
        </div>

        <div
          className={[
            "lg:col-span-6",
            flip ? "lg:order-1" : "lg:order-2",
          ].join(" ")}
        >
          {project.flow && project.flow.length > 0 && (
            <ArchitectureGraph
              nodes={project.flow}
              title={`${project.category} / flow`}
              unit="stages"
              split={false}
              className="project-architecture"
            />
          )}

          <div className="mt-6">
            <h4 className="mono text-[0.625rem] uppercase tracking-[0.18em] text-fg-faint">
              Engineering detail
            </h4>
            <ul className="mt-3 divide-y divide-[var(--line)]">
              {project.highlights.slice(0, 4).map((item) => (
                <li
                  key={item}
                  className="py-2.5 text-[0.9375rem] leading-relaxed text-fg-muted"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ── Exits ─────────────────────────────────────────────── */}
      <footer className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3">
        <Link
          href={`/projects/${project.slug}`}
          data-cursor="view"
          className="group inline-flex items-center gap-2 text-sm font-medium"
        >
          Read the case study
          <ArrowUpRight
            size={14}
            aria-hidden="true"
            className="text-fg-faint transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
          />
        </Link>

        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="open ↗"
            className="inline-flex items-center gap-2 text-sm text-fg-muted transition-colors duration-150 hover:text-fg"
          >
            <Github size={14} aria-hidden="true" />
            Source
          </a>
        )}

        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="open ↗"
            className="inline-flex items-center gap-2 text-sm text-fg-muted transition-colors duration-150 hover:text-fg"
          >
            <ArrowUpRight size={14} aria-hidden="true" />
            Live
          </a>
        )}
        {nextProject && (
          <Link
            href={`#project-${nextProject.slug}`}
            data-cursor="view"
            className="project-next"
          >
            <span className="mono">NEXT SYSTEM / {String(index + 2).padStart(2, "0")}</span>
            <span className="project-next__title">
              {nextProject.title}
              <ArrowUpRight size={14} aria-hidden="true" />
            </span>
          </Link>
        )}
      </footer>
    </article>
  );
}
