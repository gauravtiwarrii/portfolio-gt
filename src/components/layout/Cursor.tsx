"use client";

import { useEffect, useRef, useState } from "react";

/* ───────────────────────────────────────────────────────────────
   Cursor augment — a ring that trails the pointer and picks up a
   label from `data-cursor` on whatever it's over.

   The native cursor stays visible on purpose. Hiding it is the usual
   move here, but it costs real affordance (text carets, resize
   handles, the OS accessibility cursor settings) for a decorative
   win. This layer adds signal instead of replacing it.

   Mounted only for fine pointers; removed entirely under
   prefers-reduced-motion.
   ─────────────────────────────────────────────────────────────── */

type Mode = "idle" | "interactive" | "label";

export default function Cursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [mode, setMode] = useState<Mode>("idle");
  const [label, setLabel] = useState("");
  const [visible, setVisible] = useState(false);

  /* Gate on input type and motion preference. */
  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)");
    const still = window.matchMedia("(prefers-reduced-motion: reduce)");
    const evaluate = () => setEnabled(fine.matches && !still.matches);
    evaluate();
    fine.addEventListener("change", evaluate);
    still.addEventListener("change", evaluate);
    return () => {
      fine.removeEventListener("change", evaluate);
      still.removeEventListener("change", evaluate);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    let frame = 0;
    let started = false;

    const render = () => {
      /* Light easing — enough to feel damped, not enough to lag behind. */
      current.x += (target.x - current.x) * 0.22;
      current.y += (target.y - current.y) * 0.22;
      const el = ringRef.current;
      if (el) {
        el.style.transform = `translate3d(${current.x}px, ${current.y}px, 0) translate(-50%, -50%)`;
      }
      frame = requestAnimationFrame(render);
    };

    const onMove = (e: PointerEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      if (!started) {
        current.x = e.clientX;
        current.y = e.clientY;
        started = true;
        setVisible(true);
        frame = requestAnimationFrame(render);
      }
    };

    const onOver = (e: PointerEvent) => {
      const node = e.target as Element | null;
      if (!node || typeof node.closest !== "function") return;

      const labelled = node.closest<HTMLElement>("[data-cursor]");
      if (labelled) {
        setLabel(labelled.dataset.cursor || "");
        setMode("label");
        return;
      }
      const interactive = node.closest(
        "a, button, [role='button'], input, textarea, select, summary"
      );
      setLabel("");
      setMode(interactive ? "interactive" : "idle");
    };

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    document.addEventListener("pointerenter", onEnter);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      document.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("pointerenter", onEnter);
    };
  }, [enabled]);

  if (!enabled) return null;

  const size = mode === "label" ? 64 : mode === "interactive" ? 34 : 22;

  return (
    <div
      aria-hidden="true"
      className="cursor-layer pointer-events-none fixed inset-0 z-[80]"
    >
      <div
        ref={ringRef}
        className="absolute left-0 top-0 grid place-items-center rounded-full border transition-[width,height,border-color,background-color,opacity] duration-200"
        style={{
          width: size,
          height: size,
          opacity: visible ? 1 : 0,
          borderColor:
            mode === "idle" ? "var(--line-strong)" : "var(--accent-wire)",
          backgroundColor:
            mode === "label" ? "var(--accent-wash)" : "transparent",
          transitionTimingFunction: "var(--ease)",
        }}
      >
        {mode === "label" && label && (
          <span className="mono text-[0.5625rem] uppercase tracking-[0.16em] text-fg">
            {label}
          </span>
        )}
      </div>
    </div>
  );
}
