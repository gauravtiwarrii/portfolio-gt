import Link from "next/link";
import { ArrowDown, Download } from "lucide-react";
import ArchitectureGraph from "@/components/systems/ArchitectureGraph";
import { HERO_FLOW, RESUMES, SITE } from "@/data/site";

const resume = RESUMES.find((r) => r.available);

const STACK = [
  "Python",
  "TypeScript",
  "SQL",
  "Next.js",
  "PostgreSQL",
  "Kafka",
  "Spark",
];

/* The only choreographed entrance on the page. Everything below the
   fold arrives on scroll or not at all. */
const step = (i: number) => ({ animationDelay: `${60 * i}ms` });

export default function Hero() {
  return (
    <section className="section section--flush hero-stage" aria-labelledby="hero-title">
      <div className="shell hero-shell grid items-start gap-14 pt-[128px] md:pt-[152px] lg:grid-cols-12 lg:gap-10 lg:pt-[168px]">
        <div className="lg:col-span-7">
          <p className="eyebrow hero-kicker reveal" style={step(0)}>
            <span className="hero-badge">GT</span>
            Gaurav Tiwari <span aria-hidden="true">/</span> 2027
          </p>

          <h1
            id="hero-title"
            className="hero-title reveal mt-7 font-medium"
            style={step(1)}
          >
            I build systems that turn <em>complex</em> problems into simple products.
          </h1>

          <p className="eyebrow reveal mt-8" style={step(2)}>
            Software Engineer · Data Engineer · AI Systems Builder
          </p>

          <p className="lede reveal mt-5 max-w-[52ch]" style={step(3)}>
            Full-stack applications, data platforms, distributed systems and AI
            workflows engineered end-to-end.
          </p>

          <div
            className="reveal mt-10 flex flex-wrap items-center gap-3"
            style={step(4)}
          >
            <Link href="/#work" className="btn btn--primary">
              View Work
              <ArrowDown size={15} aria-hidden="true" />
            </Link>
            {resume && (
              <a
                href={resume.href}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--secondary"
              >
                <Download size={15} aria-hidden="true" />
                Download Resume
              </a>
            )}
            <span aria-hidden="true" className="mx-1 h-5 w-px bg-line-strong" />
            <a
              href={SITE.github}
              target="_blank"
              rel="noopener noreferrer"
              className="link text-sm text-fg-muted"
            >
              GitHub
            </a>
            <a
              href={SITE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="link text-sm text-fg-muted"
            >
              LinkedIn
            </a>
          </div>

          <ul
            className="reveal mt-14 flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-line pt-5"
            style={step(5)}
          >
            {STACK.map((tech, i) => (
              <li key={tech} className="mono flex items-center gap-3 text-xs text-fg-faint">
                {i > 0 && <span aria-hidden="true">·</span>}
                {tech}
              </li>
            ))}
          </ul>
        </div>

        <div className="reveal hero-visual lg:col-span-5 lg:pt-8" style={step(6)}>
          <div className="hero-ring" aria-hidden="true" />
          <ArchitectureGraph
            nodes={HERO_FLOW}
            title="Request path"
            unit="layers"
            split={false}
            className="hero-graph"
          />
          <p className="meta mt-3 pl-1">
            The shape most of these systems share. Select a layer.
          </p>
        </div>
      </div>
    </section>
  );
}
