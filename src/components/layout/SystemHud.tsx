"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { SITE } from "@/data/site";

function formatTime(date: Date) {
  return new Intl.DateTimeFormat(undefined, {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date);
}

export default function SystemHud() {
  const pathname = usePathname();
  const [time, setTime] = useState("--:--");
  const [scroll, setScroll] = useState(0);
  const [bootVisible, setBootVisible] = useState(true);

  useEffect(() => {
    const update = () => setTime(formatTime(new Date()));
    update();
    const timer = window.setInterval(update, 60_000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        const range = document.documentElement.scrollHeight - window.innerHeight;
        setScroll(range > 0 ? Math.round((window.scrollY / range) * 100) : 0);
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [pathname]);

  useEffect(() => {
    if (pathname !== "/") return;
    const timer = window.setTimeout(() => setBootVisible(false), 760);
    return () => window.clearTimeout(timer);
  }, [pathname]);

  return (
    <aside className="system-hud" aria-label="Portfolio system status">
      <span className="system-hud__item system-hud__identity">
        {SITE.monogram} <span aria-hidden="true">/</span> 2026
      </span>
      <span className="system-hud__item system-hud__availability">
        {pathname === "/" && <span aria-hidden="true" className="system-hud__signal" />}
        {pathname === "/" ? SITE.availableLabel : pathname.replaceAll("/", " / ").trim()}
      </span>
      <span className="system-hud__item system-hud__scroll">SCROLL / {String(scroll).padStart(3, "0")}</span>
      <span className="system-hud__item system-hud__time">LOCAL {time}</span>
      {pathname === "/" && bootVisible && (
        <div className="system-boot" aria-hidden="true">
          <span>GT / SYSTEM</span>
          <span>INITIALIZING PORTFOLIO</span>
          <span className="system-boot__track"><i /></span>
          <span>100%</span>
        </div>
      )}
    </aside>
  );
}
