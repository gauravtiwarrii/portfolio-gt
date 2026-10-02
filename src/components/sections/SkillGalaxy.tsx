"use client";

import { useMemo, useState } from "react";
import { additionalSystems, projects } from "@/data/projects";
import { TECH_GROUPS } from "@/data/site";

/* ───────────────────────────────────────────────────────────────
   Technology field — §17

   Not a logo grid, and deliberately not proficiency bars: there is
   no honest way to put a percentage on "how much" someone knows
   Kafka. What can be stated truthfully is where each technology has
   actually been used, so that is the only axis encoded here.

   Weight and size come from a real count of builds in the project
   data. Selecting a technology lights up the others it ships
   alongside — the relationships are read from the stacks, not
   authored by hand, so they cannot drift out of sync.
   ─────────────────────────────────────────────────────────────── */

/** Spellings in the project data that differ from the canonical name. */
const ALIASES: Record<string, readonly string[]> = {
  "Tailwind CSS": ["Tailwind"],
  Kafka: ["Apache Kafka"],
  Spark: ["Spark Structured Streaming", "PySpark"],
  S3: ["Amazon S3"],
  LangGraph: ["LangGraph.js"],
  Gemini: ["Google Gemini"],
};

const BUILDS: { title: string; stack: readonly string[] }[] = [
  ...projects.map((p) => ({ title: p.title, stack: p.tags })),
  ...additionalSystems.map((s) => ({ title: s.title, stack: s.stack })),
];

function usedIn(tech: string) {
  const names = [tech, ...(ALIASES[tech] ?? [])];
  return BUILDS.filter((b) => b.stack.some((t) => names.includes(t))).map(
    (b) => b.title,
  );
}

interface Node {
  tech: string;
  group: string;
  builds: string[];
}

const NODES: Node[] = TECH_GROUPS.flatMap((g) =>
  g.items.map((tech) => ({ tech, group: g.name, builds: usedIn(tech) })),
);

const byTech = new Map(NODES.map((n) => [n.tech, n]));

export default function SkillGalaxy() {
  const [pinned, setPinned] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const active = hovered ?? pinned;

  const node = active ? byTech.get(active) : undefined;

  /* Technologies that appear in at least one build alongside the
     active one. Empty when nothing is selected. */
  const related = useMemo(() => {
    if (!node || node.builds.length === 0) return new Set<string>();
    const set = new Set<string>();
    for (const other of NODES) {
      if (other.tech === node.tech) continue;
      if (other.builds.some((b) => node.builds.includes(b))) set.add(other.tech);
    }
    return set;
  }, [node]);

  return (
    <section id="stack" className="section" aria-labelledby="stack-title">
      <div className="shell">
        <span className="section__index">04 — Stack</span>

        <div className="section__body">
          <header className="max-w-[60ch]">
            <h2 id="stack-title" className="section-title font-medium">
              Technology
            </h2>
            <p className="lede mt-4">
              Every tool below has shipped in something on this page. Select one
              to see where.
            </p>
          </header>

          <div
            className="mt-12 border-t border-line"
            onPointerLeave={() => setHovered(null)}
          >
            {TECH_GROUPS.map((group) => (
              <div
                key={group.name}
                className="grid gap-3 border-b border-line py-6 md:grid-cols-12 md:items-baseline md:gap-8"
              >
                <h3 className="mono text-[0.6875rem] uppercase tracking-[0.14em] text-fg-faint md:col-span-3">
                  {group.name}
                </h3>

                <ul className="flex flex-wrap items-baseline gap-x-5 gap-y-3 md:col-span-9">
                  {group.items.map((tech) => {
                    const n = byTech.get(tech)!;
                    const count = n.builds.length;
                    const isActive = active === tech;
                    const isRelated = related.has(tech);
                    const dimmed = Boolean(active) && !isActive && !isRelated;

                    return (
                      <li key={tech}>
                        <button
                          type="button"
                          aria-pressed={pinned === tech}
                          data-cursor="explore"
                          onPointerEnter={() => setHovered(tech)}
                          onFocus={() => setHovered(tech)}
                          onBlur={() => setHovered(null)}
                          onClick={() =>
                            setPinned((p) => (p === tech ? null : tech))
                          }
                          className={[
                            "inline-flex items-baseline gap-1.5 rounded-sm transition-[color,opacity] duration-200",
                            /* Size carries the real usage count. */
                            count >= 3
                              ? "text-[1.0625rem]"
                              : count >= 1
                                ? "text-[0.9375rem]"
                                : "text-[0.875rem]",
                            isActive
                              ? "text-fg"
                              : dimmed
                                ? "text-fg-faint opacity-45"
                                : count >= 1
                                  ? "text-fg-muted hover:text-fg"
                                  : "text-fg-faint hover:text-fg-muted",
                          ].join(" ")}
                        >
                          <span
                            className={
                              isActive
                                ? "border-b border-accent pb-0.5"
                                : "border-b border-transparent pb-0.5"
                            }
                          >
                            {tech}
                          </span>
                          {count > 0 && (
                            <span
                              className="mono text-[0.625rem] text-fg-faint"
                              aria-label={`used in ${count} ${count === 1 ? "build" : "builds"}`}
                            >
                              {count}
                            </span>
                          )}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>

          {/* ── Readout ───────────────────────────────────────────
              Fixed minimum height: the field above must not shift
              when a selection appears or clears. */}
          <div
            aria-live="polite"
            className="mt-8 min-h-[4.5rem] border-l border-line-accent pl-5"
          >
            {node ? (
              <>
                <p className="text-[0.9375rem]">
                  <span className="font-medium">{node.tech}</span>
                  <span className="mono ml-3 text-[0.6875rem] text-fg-faint">
                    {node.group}
                  </span>
                </p>
                {node.builds.length > 0 ? (
                  <p className="mt-2 max-w-[70ch] text-sm leading-relaxed text-fg-muted">
                    Used in {node.builds.join(", ")}.
                  </p>
                ) : (
                  <p className="mt-2 text-sm leading-relaxed text-fg-muted">
                    Part of the working toolchain, not the stack of any build
                    listed here.
                  </p>
                )}
              </>
            ) : (
              <p className="text-sm leading-relaxed text-fg-faint">
                The number beside a technology is how many of the builds on this
                page use it.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
