import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description:
    "Cookie policy for hellogaurav.me — which cookies the site, analytics and Google AdSense use, and how to control them.",
  alternates: { canonical: "/cookie-policy" },
};

export default function CookiePolicyPage() {
  return (
    <div className="shell pb-32 pt-[128px] md:pt-[152px]">
      <nav aria-label="Breadcrumb" className="case-breadcrumb">
        <Link href="/">Home</Link>
        <span aria-hidden="true">/</span>
        <span>Cookie Policy</span>
      </nav>
      <header className="max-w-[68ch] border-b border-line pb-12">
        <p className="eyebrow">Legal / Cookies</p>
        <h1 className="mt-6 text-[2.5rem] font-medium leading-[1.05] md:text-[3rem]">Cookie Policy</h1>
        <p className="lede mt-6">Last updated: October 2026.</p>
      </header>
      <article className="mt-14 max-w-[68ch] space-y-8 text-[0.9375rem] leading-relaxed text-fg-muted">
        <section aria-labelledby="c-what">
          <h2 id="c-what" className="text-[1.25rem] font-medium text-fg">1. What this site stores</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            <li><strong className="text-fg">Consent choice</strong> — a first-party localStorage entry remembering your cookie selection. No tracking.</li>
            <li><strong className="text-fg">Admin session</strong> — a cookie for the private admin area only; visitors never receive it.</li>
            <li><strong className="text-fg">Preferences</strong> — no accounts, no marketing profiles, no cross-site tracking by this site itself.</li>
          </ul>
        </section>
        <section aria-labelledby="c-ads">
          <h2 id="c-ads" className="text-[1.25rem] font-medium text-fg">2. Advertising cookies</h2>
          <p className="mt-3">If you accept advertising cookies, Google AdSense may set cookies to serve, personalise (where allowed) and measure ads. Google may use the DoubleClick cookie for interest-based ads. Learn more: <a className="link" href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer">How Google uses data from partner sites</a>. Ad scripts load only after you consent.</p>
        </section>
        <section aria-labelledby="c-ctrl">
          <h2 id="c-ctrl" className="text-[1.25rem] font-medium text-fg">3. Your controls</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            <li>Use the consent banner&apos;s Accept / Reject / Settings controls at any time.</li>
            <li>Clear site data in your browser to remove the stored consent choice.</li>
            <li>Opt out of personalised Google ads at <a className="link" href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer">adssettings.google.com</a>.</li>
          </ul>
        </section>
        <p className="border-t border-line pt-6 text-sm">Related: <Link href="/privacy-policy" className="link">Privacy Policy</Link> · <Link href="/terms" className="link">Terms</Link> · <Link href="/disclaimer" className="link">Disclaimer</Link></p>
      </article>
    </div>
  );
}
