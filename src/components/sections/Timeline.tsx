import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { additionalSystems, featuredProjects } from "@/data/projects";
import { EDUCATION } from "@/data/site";

/* ───────────────────────────────────────────────────────────────
   Timeline — §20

   Derived from the project data rather than authored separately, so
   it can never disagree with Selected Work. Grouped by year only:
   nothing in the CV dates these to a month, so no month is implied.
   ─────────────────────────────────────────────────────────────── */

interface Entry {
  title: string;
  meta: string;
  summary: string;
  href?: string;
}

const ENTRIES: (Entry & { year: string })[] = [
  ...featuredProjects.map((p) => ({
    year: p.year,
    title: p.title,
    meta: p.category,
    summary: p.subtitle,
    href: `/projects/${p.slug}`,
  })),
  ...additionalSystems.map((s) => ({
    year: s.year,
    title: s.title,
    meta: s.stack.join(" · "),
    summary: s.summary,
  })),
];

const YEARS = [...new Set(ENTRIES.map((e) => e.year))].sort().reverse();

export default function Timeline() {
  return (
    <section
      id="experience"
      className="section"
      aria-labelledby="experience-title"
    >
      <div className="shell">
        <span className="section__index">06 — Experience</span>

        <div className="section__body">
          <header className="max-w-[60ch]">
            <h2 id="experience-title" className="section-title font-medium">
              Timeline
            </h2>
            <p className="lede mt-4">The record so far, by year.</p>
          </header>

          <div className="mt-12">
            {YEARS.map((year) => {
              const entries = ENTRIES.filter((e) => e.year === year);
              return (
                <div
                  key={year}
                  className="grid gap-4 border-t border-line pt-6 md:grid-cols-12 md:gap-8"
                >
                  <div className="md:col-span-3">
                    <h3 className="mono text-[2rem] font-medium leading-none text-fg md:sticky md:top-28">
                      {year}
                      <span className="mono mt-3 block text-[0.6875rem] font-normal tracking-normal text-fg-faint">
                        {entries.length} systems
                      </span>
                    </h3>
                  </div>

                  <ol className="md:col-span-9">
                    {entries.map((entry) => (
                      <li
                        key={entry.title}
                        className="border-b border-line py-5 first:pt-0 md:py-6 md:first:pt-1"
                      >
                        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                          {entry.href ? (
                            <Link
                              href={entry.href}
                              data-cursor="view"
                              className="group inline-flex items-center gap-2 text-[1.0625rem] font-medium"
                            >
                              {entry.title}
                              <ArrowUpRight
                                size={13}
                                aria-hidden="true"
                                className="text-fg-faint transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                              />
                            </Link>
                          ) : (
                            <span className="text-[1.0625rem] font-medium">
                              {entry.title}
                            </span>
                          )}
                          <span className="mono text-[0.6875rem] text-fg-faint">
                            {entry.meta}
                          </span>
                        </div>
                        <p className="mt-2 max-w-[68ch] text-sm leading-relaxed text-fg-muted">
                          {entry.summary}
                        </p>
                      </li>
                    ))}
                  </ol>
                </div>
              );
            })}

            {/* Education is the one dated fact that isn't a build. */}
            <div className="grid gap-4 border-t border-line pt-6 md:grid-cols-12 md:gap-8">
              <div className="md:col-span-3">
                <h3 className="mono text-[2rem] font-medium leading-none text-fg-faint">
                  {EDUCATION.graduation}
                  <span className="mono mt-3 block text-[0.6875rem] font-normal tracking-normal text-fg-faint">
                    Expected
                  </span>
                </h3>
              </div>
              <div className="md:col-span-9 md:pt-1">
                <p className="text-[1.0625rem] font-medium">
                  {EDUCATION.degree}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-fg-muted">
                  {EDUCATION.institution} · CGPA {EDUCATION.cgpa}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
