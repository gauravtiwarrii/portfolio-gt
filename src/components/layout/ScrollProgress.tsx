"use client";

import { useEffect, useRef, useState } from "react";

/* A 2px rule pinned to the top of the viewport, scaled to scroll depth.
   Deliberately plain JS: one passive listener, one rAF, one transform —
   no layout reads inside the frame. */
export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const el = barRef.current;
      if (!el) return;
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      const ratio = scrollable > 0 ? window.scrollY / scrollable : 0;
      el.style.transform = `scaleX(${Math.min(1, Math.max(0, ratio))})`;
      setVisible(window.scrollY > 8);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-[70] h-0.5"
    >
      <div
        ref={barRef}
        className="h-full w-full origin-left bg-accent transition-opacity duration-300"
        style={{ transform: "scaleX(0)", opacity: visible ? 1 : 0 }}
      />
    </div>
  );
}
