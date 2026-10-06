/* ───────────────────────────────────────────────────────────────
   AdSense — single source of truth.
   NEXT_PUBLIC_ADSENSE_CLIENT holds the real publisher ID
   (e.g. ca-pub-7955473428553830). No fake IDs anywhere.
   ─────────────────────────────────────────────────────────────── */
export const ADSENSE_CLIENT = process.env.NEXT_PUBLIC_ADSENSE_CLIENT || "";

/** True only when a real publisher ID is configured. */
export function adsenseEnabled(): boolean {
  return /^ca-pub-\d+$/.test(ADSENSE_CLIENT.trim());
}
