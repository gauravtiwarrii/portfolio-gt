import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Github, Info } from "lucide-react";
import ArchitectureGraph from "@/components/systems/ArchitectureGraph";
import { projects } from "@/data/projects";

interface PageProps {
  params: Promise<{ slug: string }>;
}

function findProject(slug: string) {
  return projects.find((item) => item.slug === slug);
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = findProject(slug);
  return project
    ? { title: project.title, description: project.subtitle }
    : { title: "Project not found" };
}

const labelClass = "mono text-[0.625rem] uppercase tracking-[0.16em] text-fg-faint";
const bodyClass = "max-w-[68ch] text-[0.9375rem] leading-relaxed text-fg-muted";

export default async function ProjectDetails({ params }: PageProps) {
  const { slug } = await params;
  const project = findProject(slug);
  if (!project) notFound();

  const Icon = project.icon as React.ComponentType<{ size?: number; className?: string }>;
  const projectIndex = projects.findIndex((item) => item.slug === slug);
  const projectNumber = String(projectIndex + 1).padStart(2, "0");
  const previous = projects[projectIndex - 1];
  const next = projects[projectIndex + 1];

  return (
    <article className="case-file shell">
      <nav aria-label="Breadcrumb" className="case-breadcrumb">
        <Link href="/projects" className="group inline-flex items-center gap-2">
          <ArrowLeft size={14} aria-hidden="true" className="transition-transform group-hover:-translate-x-1" />
          Projects index
        </Link>
        <span aria-hidden="true">/</span>
        <span>{project.title}</span>
      </nav>

      <header className="case-masthead">
        <div className="case-masthead__title">
          <p className="eyebrow flex items-center gap-3">
            <span>{projectNumber} / PROJECT</span>
            <span aria-hidden="true" className="h-px w-8 bg-line-strong" />
            <Icon size={14} className="text-accent" aria-hidden="true" />
            <span>{project.category}</span>
          </p>
          <h1 className="case-title">{project.title}</h1>
          <p className="case-subtitle">{project.subtitle}</p>
          <p className={`${bodyClass} mt-5`}>{project.description}</p>
          <div className="case-actions">
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer" data-cursor="open ↗" className="btn btn--secondary">
                <Github size={15} aria-hidden="true" />
                Source code
              </a>
            )}
            {project.demo && (
              <a href={project.demo} target="_blank" rel="noopener noreferrer" data-cursor="open ↗" className="btn btn--primary">
                Live system
                <ArrowUpRight size={15} aria-hidden="true" />
              </a>
            )}
          </div>
        </div>

        <dl className="case-meta">
          <div>
            <dt className={labelClass}>Year</dt>
            <dd className="mono mt-2 text-sm">{project.year}</dd>
          </div>
          <div>
            <dt className={labelClass}>Status</dt>
            <dd className="mono mt-2 inline-flex items-center gap-2 text-sm">
              <span aria-hidden="true" className={`h-1.5 w-1.5 rounded-full ${project.status === "Live" ? "bg-ok" : project.status === "Building" ? "bg-accent" : "bg-fg-faint"}`} />
              {project.status}
            </dd>
          </div>
          <div className="case-meta__stack">
            <dt className={labelClass}>Technology</dt>
            <dd className="mono mt-2 text-xs leading-[1.9] text-fg-muted">{project.tags.join(" · ")}</dd>
          </div>
          {project.dataNote && (
            <div className="case-meta__note">
              <dt className={`${labelClass} flex items-center gap-2`}><Info size={12} aria-hidden="true" /> Data note</dt>
              <dd className="mt-2 text-xs leading-relaxed text-fg-muted">{project.dataNote}</dd>
            </div>
          )}
        </dl>
      </header>

      <section className="case-section case-architecture" aria-labelledby="architecture-title">
        <div className="case-section__heading">
          <span className={labelClass}>01 / SYSTEM MAP</span>
          <h2 id="architecture-title">Architecture</h2>
        </div>
        <div className="case-section__body">
          {project.flow?.length ? (
            <ArchitectureGraph
              nodes={project.flow}
              title={`${project.category} / flow`}
              unit="stages"
              split={false}
              className="case-flow"
            />
          ) : (
            <p className="case-architecture__description">{project.details.architecture.description}</p>
          )}
          {project.flow?.length ? (
            <p className="case-architecture__description">{project.details.architecture.description}</p>
          ) : null}
        </div>
      </section>

      <div className="case-columns">
        <section className="case-section" aria-labelledby="problem-title">
          <div className="case-section__heading">
            <span className={labelClass}>02 / CONTEXT</span>
            <h2 id="problem-title">The problem</h2>
          </div>
          <div className="case-section__body space-y-5">
            <p className={bodyClass}>{project.problem}</p>
            <div className="case-callout">
              <p className={labelClass}>Engineering challenge</p>
              <p className="mt-3 text-sm leading-relaxed text-fg-muted">{project.details.challenge}</p>
            </div>
          </div>
        </section>

        <section className="case-section" aria-labelledby="approach-title">
          <div className="case-section__heading">
            <span className={labelClass}>03 / DESIGN DECISION</span>
            <h2 id="approach-title">Approach</h2>
          </div>
          <div className="case-section__body">
            <p className={bodyClass}>{project.details.solution}</p>
            {project.details.techStackJustification.length > 0 && (
              <dl className="case-tech-list">
                {project.details.techStackJustification.map((item) => (
                  <div key={item.tech}>
                    <dt>{item.tech}</dt>
                    <dd>{item.reason}</dd>
                  </div>
                ))}
              </dl>
            )}
          </div>
        </section>
      </div>

      <section className="case-section" aria-labelledby="details-title">
        <div className="case-section__heading">
          <span className={labelClass}>04 / IMPLEMENTATION</span>
          <h2 id="details-title">Engineering detail</h2>
        </div>
        <div className="case-section__body">
          <ol className="case-detail-list">
            {project.highlights.map((item, index) => (
              <li key={item}>
                <span className="mono text-xs text-fg-faint">{String(index + 1).padStart(2, "0")}</span>
                <span>{item}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <div className="case-columns">
        {project.details.engineeringPractices.length > 0 && (
          <section className="case-section" aria-labelledby="practices-title">
            <div className="case-section__heading">
              <span className={labelClass}>05 / OPERATING PRINCIPLES</span>
              <h2 id="practices-title">Engineering practices</h2>
            </div>
            <div className="case-section__body">
              <ul className="case-plain-list">
                {project.details.engineeringPractices.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
          </section>
        )}
        {project.details.features.length > 0 && (
          <section className="case-section" aria-labelledby="features-title">
            <div className="case-section__heading">
              <span className={labelClass}>06 / CAPABILITIES</span>
              <h2 id="features-title">Features</h2>
            </div>
            <div className="case-section__body">
              <ul className="case-plain-list">
                {project.details.features.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
          </section>
        )}
      </div>

      {project.details.performance.length > 0 && (
        <section className="case-section" aria-labelledby="results-title">
          <div className="case-section__heading">
            <span className={labelClass}>07 / EVIDENCE</span>
            <h2 id="results-title">Measured results</h2>
          </div>
          <div className="case-section__body">
            <ul className="case-plain-list">
              {project.details.performance.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>
        </section>
      )}

      <nav className="case-next" aria-label="More projects">
        {previous ? (
          <Link href={`/projects/${previous.slug}`} className="case-next__link">
            <span className={labelClass}><ArrowLeft size={11} aria-hidden="true" /> Previous system</span>
            <span>{previous.title}</span>
          </Link>
        ) : <span />}
        {next ? (
          <Link href={`/projects/${next.slug}`} className="case-next__link case-next__link--next">
            <span className={labelClass}>Next system <ArrowUpRight size={11} aria-hidden="true" /></span>
            <span>{next.title}</span>
          </Link>
        ) : <Link href="/projects" className="case-next__link case-next__link--next"><span className={labelClass}>All systems <ArrowUpRight size={11} aria-hidden="true" /></span><span>Projects index</span></Link>}
      </nav>
    </article>
  );
}