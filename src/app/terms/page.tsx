import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "Terms of use for hellogaurav.me — acceptable use, intellectual property and liability limits for this personal portfolio.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <div className="shell pb-32 pt-[128px] md:pt-[152px]">
      <nav aria-label="Breadcrumb" className="case-breadcrumb">
        <Link href="/">Home</Link>
        <span aria-hidden="true">/</span>
        <span>Terms of Use</span>
      </nav>
      <header className="max-w-[68ch] border-b border-line pb-12">
        <p className="eyebrow">Legal / Terms</p>
        <h1 className="mt-6 text-[2.5rem] font-medium leading-[1.05] md:text-[3rem]">Terms of Use</h1>
        <p className="lede mt-6">Last updated: October 2026.</p>
      </header>
      <article className="mt-14 max-w-[68ch] space-y-8 text-[0.9375rem] leading-relaxed text-fg-muted">
        <section aria-labelledby="t-use">
          <h2 id="t-use" className="text-[1.25rem] font-medium text-fg">1. Acceptable use</h2>
          <p className="mt-3">Use this site lawfully. Do not abuse the contact form (spam, harassment, malicious payloads), attempt to breach the admin area, scrape aggressively, or misrepresent the content as your own.</p>
        </section>
        <section aria-labelledby="t-ip">
          <h2 id="t-ip" className="text-[1.25rem] font-medium text-fg">2. Intellectual property</h2>
          <p className="mt-3">Articles, case studies and design on this site are by Gaurav Tiwari unless credited otherwise. You may quote brief excerpts with attribution and a link; republishing full articles without permission is not allowed. Code referenced via public GitHub repositories is governed by each repository&apos;s licence.</p>
        </section>
        <section aria-labelledby="t-liab">
          <h2 id="t-liab" className="text-[1.25rem] font-medium text-fg">3. No warranties</h2>
          <p className="mt-3">Content is provided as-is for informational purposes. Engineering notes describe what worked in specific contexts, not guarantees for your systems. See the <Link href="/disclaimer" className="link">Disclaimer</Link>.</p>
        </section>
        <section aria-labelledby="t-links">
          <h2 id="t-links" className="text-[1.25rem] font-medium text-fg">4. External links and ads</h2>
          <p className="mt-3">Outbound links (GitHub, LinkedIn, credentials) and any advertising served by Google AdSense are third-party content; this site is not responsible for them.</p>
        </section>
        <p className="border-t border-line pt-6 text-sm">Related: <Link href="/privacy-policy" className="link">Privacy Policy</Link> · <Link href="/cookie-policy" className="link">Cookie Policy</Link> · <Link href="/contact" className="link">Contact</Link></p>
      </article>
    </div>
  );
}
