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

  useEffect(() => {
    const update = () => setTime(formatTime(new Date()));
    update();
    const timer = window.setInterval(update, 60_000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <aside className="system-hud" aria-label="Portfolio system status">
      <span className="system-hud__item system-hud__identity">
        {SITE.monogram} <span aria-hidden="true">/</span> 2026
      </span>
      <span className="system-hud__item system-hud__route">
        {pathname === "/" ? "SYSTEM ONLINE" : pathname.replaceAll("/", " / ").trim()}
      </span>
      <span className="system-hud__item system-hud__availability">
        <span aria-hidden="true" className="system-hud__signal" />
        {SITE.availableLabel}
      </span>
      <span className="system-hud__item system-hud__time">LOCAL {time}</span>
    </aside>
  );
}
