"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const KEY = "gt-consent-v1";

export type Consent = { necessary: true; ads: boolean; decidedAt: string };

export function readConsent(): Consent | null {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Consent) : null;
  } catch {
    return null;
  }
}

/** True only when the visitor explicitly accepted advertising cookies. */
export function hasAdConsent(): boolean {
  if (typeof window === "undefined") return false;
  return readConsent()?.ads === true;
}

function writeConsent(ads: boolean) {
  const value: Consent = { necessary: true, ads, decidedAt: new Date().toISOString() };
  try {
    localStorage.setItem(KEY, JSON.stringify(value));
  } catch {
    /* Private mode etc. — banner simply reappears next visit. */
  }
  window.dispatchEvent(new CustomEvent("gt-consent", { detail: value }));
}

/* Non-blocking bottom banner. Never covers content permanently and
   never gates access to the site — visitors can ignore it. */
export default function ConsentBanner() {
  const [visible, setVisible] = useState(false);
  const [customising, setCustomising] = useState(false);

  useEffect(() => {
    if (!readConsent()) {
      const t = window.setTimeout(() => setVisible(true), 1200);
      return () => window.clearTimeout(t);
    }
  }, []);

  useEffect(() => {
    const reopen = () => {
      setCustomising(true);
      setVisible(true);
    };
    window.addEventListener("gt-consent-open", reopen);
    return () => window.removeEventListener("gt-consent-open", reopen);
  }, []);

  if (!visible) return null;

  const decide = (ads: boolean) => {
    writeConsent(ads);
    setVisible(false);
    setCustomising(false);
    if (ads) window.location.reload();
  };

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-0 z-[70] border-t border-line bg-bg/95 backdrop-blur-xl"
    >
      <div className="shell flex flex-col gap-4 py-5 md:flex-row md:items-center md:justify-between">
        <p className="max-w-[70ch] text-sm leading-relaxed text-fg-muted">
          This site uses a stored consent choice, privacy-respecting analytics and —
          only with your permission — Google AdSense cookies for ads.{" "}
          <Link href="/cookie-policy" className="link">Cookie Policy</Link> ·{" "}
          <Link href="/privacy-policy" className="link">Privacy</Link>
        </p>
        <div className="flex flex-wrap items-center gap-2">
          {customising ? (
            <>
              <button type="button" onClick={() => decide(false)} className="btn btn--secondary">
                Necessary only
              </button>
              <button type="button" onClick={() => decide(true)} className="btn btn--primary">
                Accept ads
              </button>
            </>
          ) : (
            <>
              <button type="button" onClick={() => decide(false)} className="btn btn--secondary">
                Reject ads
              </button>
              <button type="button" onClick={() => setCustomising(true)} className="btn btn--secondary">
                Settings
              </button>
              <button type="button" onClick={() => decide(true)} className="btn btn--primary">
                Accept
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
