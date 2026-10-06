"use client";

import { useMemo, useState } from "react";
import { additionalSystems, projects } from "@/data/projects";
import { TECH_GROUPS } from "@/data/site";

const ALIASES: Record<string, readonly string[]> = {
  "Tailwind CSS": ["Tailwind"],
  Kafka: ["Apache Kafka"],
  Spark: ["Spark Structured Streaming", "PySpark"],
  S3: ["Amazon S3"],
  LangGraph: ["LangGraph.js"],
  Gemini: ["Google Gemini"],
};

const BUILDS: { title: string; stack: readonly string[] }[] = [
  ...projects.map((project) => ({ title: project.title, stack: project.tags })),
  ...additionalSystems.map((system) => ({ title: system.title, stack: system.stack })),
];

function usedIn(tech: string) {
  const names = [tech, ...(ALIASES[tech] ?? [])];
  return BUILDS.filter((build) => build.stack.some((item) => names.includes(item))).map(
    (build) => build.title,
  );
}

interface TechNode {
  tech: string;
  group: string;
  builds: string[];
}

const NODES: TechNode[] = TECH_GROUPS.flatMap((group) =>
  group.items.map((tech) => ({ tech, group: group.name, builds: usedIn(tech) })),
);

const POSITIONED_NODES = NODES.map((node) => {
  const groupIndex = TECH_GROUPS.findIndex((group) => group.name === node.group);
  const group = TECH_GROUPS[groupIndex];
  const groupItems: readonly string[] = group.items;
  const itemIndex = groupItems.indexOf(node.tech);
  const y = groupItems.length === 1 ? 320 : 126 + (itemIndex * 392) / (groupItems.length - 1);
  return { ...node, x: 78 + groupIndex * 174, y };
});

const POSITION_BY_TECH = new Map(POSITIONED_NODES.map((node) => [node.tech, node]));

const CONNECTIONS = NODES.flatMap((source, index) =>
  NODES.slice(index + 1)
    .filter((target) => target.builds.some((build) => source.builds.includes(build)))
    .map((target) => ({ source: source.tech, target: target.tech })),
);

export default function SkillGalaxy() {
  const [pinned, setPinned] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const active = hovered ?? pinned;
  const node = active ? POSITION_BY_TECH.get(active) : undefined;

  const related = useMemo(() => {
    if (!node || node.builds.length === 0) return new Set<string>();
    return new Set(
      NODES.filter(
        (other) =>
          other.tech !== node.tech &&
          other.builds.some((build) => node.builds.includes(build)),
      ).map((other) => other.tech),
    );
  }, [node]);

  const techButton = (item: TechNode, compact = false) => {
    const isActive = active === item.tech;
    const isRelated = related.has(item.tech);
    const dimmed = Boolean(active) && !isActive && !isRelated;

    return (
      <button
        type="button"
        key={item.tech}
        aria-label={`${item.tech}, ${item.group}, used in ${item.builds.length} ${item.builds.length === 1 ? "system" : "systems"}`}
        aria-pressed={pinned === item.tech}
        data-cursor="explore"
        onPointerEnter={() => setHovered(item.tech)}
        onFocus={() => setHovered(item.tech)}
        onBlur={() => setHovered(null)}
        onClick={() => setPinned((current) => (current === item.tech ? null : item.tech))}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            setPinned((current) => (current === item.tech ? null : item.tech));
          }
        }}
        className={[
          compact ? "technology-link" : "technology-node",
          isActive ? "is-active" : "",
          isRelated ? "is-related" : "",
          dimmed ? "is-dimmed" : "",
        ].join(" ")}
      >
        <span>{item.tech}</span>
        <span className="technology-node__count" aria-hidden="true">{item.builds.length}</span>
      </button>
    );
  };

  return (
    <section id="stack" className="section" aria-labelledby="stack-title">
      <div className="shell">
        <span className="section__index">03 — Technology map</span>

        <div className="section__body">
          <header className="max-w-[60ch]">
            <h2 id="stack-title" className="section-title font-medium">Technology map</h2>
            <p className="lede mt-4">
              Connections link tools that appear together in a listed system. Select a node to trace its actual use.
            </p>
          </header>

          <div
            className="technology-network mt-12"
            role="group"
            aria-label="Technology network. Connections represent technologies used together in a project or system."
            onPointerLeave={() => setHovered(null)}
          >
            <div className="technology-network__grid" aria-hidden="true" />
            <svg className="technology-network__edges" viewBox="0 0 1200 640" preserveAspectRatio="none" aria-hidden="true">
              {CONNECTIONS.map((connection) => {
                const source = POSITION_BY_TECH.get(connection.source)!;
                const target = POSITION_BY_TECH.get(connection.target)!;
                const touchesActive = connection.source === active || connection.target === active;
                const joinsRelated = related.has(connection.source) && related.has(connection.target);
                const dimmed = Boolean(active) && !touchesActive && !joinsRelated;
                return (
                  <line
                    key={`${connection.source}-${connection.target}`}
                    x1={source.x}
                    y1={source.y}
                    x2={target.x}
                    y2={target.y}
                    className={touchesActive || joinsRelated ? "is-lit" : dimmed ? "is-dimmed" : ""}
                  />
                );
              })}
            </svg>

            {TECH_GROUPS.map((group, groupIndex) => (
              <span
                key={group.name}
                className="technology-network__group mono"
                style={{ left: `${((78 + groupIndex * 174) / 1200) * 100}%` }}
              >
                {group.name}
              </span>
            ))}

            {POSITIONED_NODES.map((item) => (
              <span
                key={item.tech}
                className="technology-network__position"
                style={{ left: `${(item.x / 1200) * 100}%`, top: `${(item.y / 640) * 100}%` }}
              >
                {techButton(item)}
              </span>
            ))}
          </div>

          <div className="technology-list mt-8" onPointerLeave={() => setHovered(null)}>
            {TECH_GROUPS.map((group) => (
              <div key={group.name} className="technology-list__group">
                <h3 className="mono text-[0.6875rem] uppercase tracking-[0.14em] text-fg-faint">{group.name}</h3>
                <ul>
                  {group.items.map((tech) => (
                    <li key={tech}>{techButton(POSITION_BY_TECH.get(tech)!, true)}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div aria-live="polite" className="technology-readout mt-8">
            {node ? (
              <>
                <p className="text-[0.9375rem]">
                  <span className="font-medium">{node.tech}</span>
                  <span className="mono ml-3 text-[0.6875rem] text-fg-faint">{node.group}</span>
                </p>
                <p className="mt-2 max-w-[70ch] text-sm leading-relaxed text-fg-muted">
                  {node.builds.length > 0
                    ? `Used in ${node.builds.join(", ")}.`
                    : "Part of the working toolchain, not the stack of a listed system."}
                </p>
              </>
            ) : (
              <p className="text-sm leading-relaxed text-fg-faint">
                Node counts are derived from the projects and systems on this site. Lines indicate actual co-use.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}