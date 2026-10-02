import Link from "next/link";
import { ArrowDown, ArrowDownRight, Download } from "lucide-react";
import ArchitectureGraph from "@/components/systems/ArchitectureGraph";
import { HERO_FLOW, RESUMES } from "@/data/site";

const resumes = RESUMES.filter((resume) => resume.available);

/* The only choreographed entrance on the page. Everything below the
   fold arrives on scroll or not at all. */
const step = (i: number) => ({ animationDelay: `${60 * i}ms` });

export default function Hero() {
  return (
    <section className="section section--flush hero-stage" aria-labelledby="hero-title">
      <div className="shell hero-shell grid min-h-[min(900px,100svh)] content-start items-center gap-12 pb-16 pt-[132px] md:pb-20 md:pt-[152px] lg:grid-cols-12 lg:content-center lg:gap-10 lg:pt-[168px]">
        <div className="lg:col-span-7">
          <p className="eyebrow hero-kicker reveal" style={step(0)}>
            <span className="hero-badge">GT / 2026</span>
            Engineering workspace <span aria-hidden="true">/</span> 001
          </p>

          <h1
            id="hero-title"
            className="hero-title reveal mt-7 font-medium"
            style={step(1)}
          >
            I BUILD<br />
            SOFTWARE<br />
            <em>SYSTEMS.</em>
          </h1>

          <p className="eyebrow reveal mt-8" style={step(2)}>
            Software engineering <span aria-hidden="true">/</span> Data engineering <span aria-hidden="true">/</span> AI systems
          </p>

          <p className="lede reveal mt-5 max-w-[52ch]" style={step(3)}>
            Full-stack products, data platforms, distributed systems and AI
            workflows engineered end-to-end.
          </p>

          <div
            className="reveal mt-10 flex flex-wrap items-center gap-3"
            style={step(4)}
          >
            <Link href="/#work" className="btn btn--primary">
              Explore selected work
              <ArrowDownRight size={15} aria-hidden="true" />
            </Link>
            {resumes.map((resume) => (
              <a
                key={resume.href}
                href={resume.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open ${resume.label}`}
                className="hero-resume-link mono"
              >
                <Download size={15} aria-hidden="true" />
                {resume.label.replace(" Resume", "")}
              </a>
            ))}
          </div>
        </div>

        <div className="reveal hero-visual lg:col-span-5 lg:pt-8" style={step(5)}>
          <ArchitectureGraph
            nodes={HERO_FLOW}
            title="System / request path"
            unit="layers"
            split={false}
            className="hero-graph"
          />
          <p className="meta mt-3 pl-1">
            A working model. Select a layer to inspect its boundary.
          </p>
        </div>

        <a href="#work" className="hero-scroll mono lg:col-span-12" aria-label="Scroll to selected work">
          <span className="hero-scroll__line" aria-hidden="true" />
          Scroll to explore
          <ArrowDown size={13} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
