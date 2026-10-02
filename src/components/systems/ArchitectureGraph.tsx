"use client";

import { Fragment, useId, useRef, useState } from "react";

/* ───────────────────────────────────────────────────────────────
   ArchitectureGraph

   One diagram primitive, two layouts. Used for the hero request
   path, the data platform rail, and the per-project flows.

   Interaction is a tabs pattern, not a hover-only reveal: pointer
   users preview by hovering, keyboard users arrow through the
   layers, and the explanation lives in a real tabpanel so it is
   reachable without a mouse.
   ─────────────────────────────────────────────────────────────── */

export interface GraphNode {
  label: string;
  role: string;
  note: string;
  branches?: readonly string[];
}

interface Props {
  nodes: readonly GraphNode[];
  /** Small label in the panel header, e.g. "Request path". */
  title?: string;
  /** Noun for the node count, e.g. "layers", "stages". */
  unit?: string;
  orientation?: "vertical" | "horizontal";
  /** Vertical only. Side-by-side nodes and detail on wide viewports.
      Turn off when the diagram sits in a narrow column. */
  split?: boolean;
  className?: string;
}

export default function ArchitectureGraph({
  nodes,
  title = "Architecture",
  unit = "layers",
  orientation = "vertical",
  split = true,
  className = "",
}: Props) {
  const uid = useId();
  const [active, setActive] = useState(0);
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);

  const node = nodes[active] ?? nodes[0];
  const horizontal = orientation === "horizontal";

  const focusTab = (i: number) => {
    setActive(i);
    tabsRef.current[i]?.focus();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    const forward = horizontal ? "ArrowRight" : "ArrowDown";
    const back = horizontal ? "ArrowLeft" : "ArrowUp";
    if (e.key === forward) {
      e.preventDefault();
      focusTab((active + 1) % nodes.length);
    } else if (e.key === back) {
      e.preventDefault();
      focusTab((active - 1 + nodes.length) % nodes.length);
    } else if (e.key === "Home") {
      e.preventDefault();
      focusTab(0);
    } else if (e.key === "End") {
      e.preventDefault();
      focusTab(nodes.length - 1);
    }
  };

  const tabProps = (i: number) => ({
    ref: (el: HTMLButtonElement | null) => {
      tabsRef.current[i] = el;
    },
    role: "tab" as const,
    id: `${uid}-tab-${i}`,
    "aria-selected": i === active,
    "aria-controls": `${uid}-panel`,
    tabIndex: i === active ? 0 : -1,
    onPointerEnter: () => setActive(i),
    onFocus: () => setActive(i),
    onClick: () => setActive(i),
    "data-cursor": "explore",
  });

  /* The marker carries state through fill *and* ring size, so the
     active layer is legible without relying on colour. */
  const dot = (i: number) =>
    [
      "block rounded-full transition-all duration-200",
      i === active
        ? "h-2 w-2 bg-accent ring-4 ring-[var(--accent-wash)]"
        : "h-2 w-2 bg-[var(--line-strong)] ring-0",
    ].join(" ");

  const detail = (
    <div
      id={`${uid}-panel`}
      role="tabpanel"
      aria-labelledby={`${uid}-tab-${active}`}
      tabIndex={0}
      className="min-h-[148px] border-line p-5 md:min-h-[176px]"
    >
      <p className="mono text-[0.625rem] uppercase tracking-[0.18em] text-fg-faint">
        {node.role}
      </p>
      <p className="mt-2.5 text-[1.0625rem] font-medium tracking-[-0.015em]">
        {node.label}
      </p>
      <p className="mt-2 max-w-[46ch] text-sm leading-relaxed text-fg-muted">
        {node.note}
      </p>
      {node.branches && node.branches.length > 0 && (
        <ul className="mt-4 flex flex-wrap gap-2">
          {node.branches.map((b) => (
            <li
              key={b}
              className="mono rounded border border-line px-2 py-1 text-[0.6875rem] text-fg-faint"
            >
              {b}
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  return (
    <figure className={`panel graph-panel grid-texture overflow-hidden ${className}`}>
      <figcaption className="flex items-center justify-between border-b border-line px-5 py-3">
        <span className="mono text-[0.625rem] uppercase tracking-[0.18em] text-fg-faint">
          {title}
        </span>
        <span className="mono text-[0.625rem] text-fg-faint">
          {nodes.length} {unit}
        </span>
      </figcaption>

      {horizontal ? (
        <>
          <div
            role="tablist"
            aria-label={`${title} stages`}
            aria-orientation="horizontal"
            onKeyDown={onKeyDown}
            className="rail gap-0 px-5 py-7"
          >
            {nodes.map((n, i) => (
              <Fragment key={n.label}>
                <button
                  {...tabProps(i)}
                  type="button"
                  className="group flex shrink-0 snap-start basis-[112px] flex-col items-start gap-2.5 pr-3 text-left"
                >
                  <span aria-hidden="true" className={dot(i)} />
                  <span
                    className={[
                      "text-[0.8125rem] font-medium leading-tight transition-colors duration-150",
                      i === active ? "text-fg" : "text-fg-muted group-hover:text-fg",
                    ].join(" ")}
                  >
                    {n.label}
                  </span>
                  <span className="mono text-[0.625rem] uppercase tracking-[0.12em] text-fg-faint">
                    {n.role}
                  </span>
                </button>
                {i < nodes.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="connector connector--x mr-3 mt-[3.5px] shrink-0 basis-6"
                    style={{ animationDelay: `${i * 0.34}s` }}
                  />
                )}
              </Fragment>
            ))}
          </div>
          <div className="border-t border-line">{detail}</div>
        </>
      ) : (
        <div className={split ? "grid md:grid-cols-2" : "grid"}>
          <div
            role="tablist"
            aria-label={`${title} layers`}
            aria-orientation="vertical"
            onKeyDown={onKeyDown}
            className={`p-5 ${split ? "md:border-r md:border-line" : ""}`}
          >
            {nodes.map((n, i) => (
              <Fragment key={n.label}>
                <button
                  {...tabProps(i)}
                  type="button"
                  className="group flex w-full items-center gap-3.5 py-1 text-left"
                >
                  <span aria-hidden="true" className={dot(i)} />
                  <span
                    className={[
                      "text-[0.9375rem] transition-colors duration-150",
                      i === active ? "text-fg" : "text-fg-muted group-hover:text-fg",
                    ].join(" ")}
                  >
                    {n.label}
                  </span>
                  <span className="mono ml-auto text-[0.625rem] uppercase tracking-[0.12em] text-fg-faint">
                    {n.role}
                  </span>
                </button>
                {i < nodes.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="connector connector--y ml-[3.5px]"
                    style={{ animationDelay: `${i * 0.36}s` }}
                  />
                )}
              </Fragment>
            ))}
          </div>
          <div
            className={`border-t border-line ${split ? "md:border-t-0" : ""}`}
          >
            {detail}
          </div>
        </div>
      )}
    </figure>
  );
}
