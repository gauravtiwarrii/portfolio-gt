"use client";

import { useEffect, useRef } from "react";
import { ADSENSE_CLIENT, adsenseEnabled } from "@/lib/adsense";
import { hasAdConsent } from "@/components/privacy/ConsentBanner";

interface AdSlotProps {
  slot: string;
  format?: "auto" | "fluid" | "rectangle";
  label?: string;
}

/* Renders nothing unless: real publisher ID + ad consent + a real ad slot.
   Used only on content-rich pages — never on 404, admin or login. */
export default function AdSlot({ slot, format = "auto", label = "Advertisement" }: AdSlotProps) {
  const ref = useRef<HTMLModElement>(null);
  const pushed = useRef(false);

  useEffect(() => {
    if (!adsenseEnabled() || !hasAdConsent() || !slot || pushed.current) return;
    if (!ref.current || ref.current.dataset.filled === "true") return;
    try {
      ((window as unknown as { adsbygoogle?: unknown[] }).adsbygoogle ||= []).push({});
      pushed.current = true;
      ref.current.dataset.filled = "true";
    } catch {
      /* Ad blockers / failed loads must never break the page. */
    }
  }, [slot]);

  if (!adsenseEnabled() || !slot) return null;

  return (
    <aside aria-label={label} className="my-10 overflow-hidden border border-line p-4">
      <p className="mono mb-3 text-center text-[0.625rem] uppercase tracking-[0.18em] text-fg-faint">
        {label}
      </p>
      <ins
        ref={ref as React.RefObject<HTMLModElement>}
        className="adsbygoogle block min-h-[120px] text-center"
        style={{ display: "block" }}
        data-ad-client={ADSENSE_CLIENT}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </aside>
  );
}
