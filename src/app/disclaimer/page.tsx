import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Disclaimer",
  description:
    "Disclaimer for hellogaurav.me — the portfolio and journal content is informational and based on personal building experience.",
  alternates: { canonical: "/disclaimer" },
};

export default function DisclaimerPage() {
  return (
    <div className="shell pb-32 pt-[128px] md:pt-[152px]">
      <nav aria-label="Breadcrumb" className="case-breadcrumb">
        <Link href="/">Home</Link>
        <span aria-hidden="true">/</span>
        <span>Disclaimer</span>
      </nav>
      <header className="max-w-[68ch] border-b border-line pb-12">
        <p className="eyebrow">Legal / Disclaimer</p>
        <h1 className="mt-6 text-[2.5rem] font-medium leading-[1.05] md:text-[3rem]">Disclaimer</h1>
        <p className="lede mt-6">Last updated: October 2026.</p>
      </header>
      <article className="mt-14 max-w-[68ch] space-y-8 text-[0.9375rem] leading-relaxed text-fg-muted">
        <section aria-labelledby="d-info">
          <h2 id="d-info" className="text-[1.25rem] font-medium text-fg">1. Informational content</h2>
          <p className="mt-3">Case studies and journal articles describe systems the author built and what was learned. They are educational notes, not professional advice, and architectures should be evaluated against your own requirements, scale and compliance obligations before reuse.</p>
        </section>
        <section aria-labelledby="d-ads">
          <h2 id="d-ads" className="text-[1.25rem] font-medium text-fg">2. Advertising</h2>
          <p className="mt-3">Any ads served by Google AdSense are clearly third-party content. The site operator does not endorse advertised products and is not responsible for them.</p>
        </section>
        <section aria-labelledby="d-links">
          <h2 id="d-links" className="text-[1.25rem] font-medium text-fg">3. External links</h2>
          <p className="mt-3">Links to GitHub, LinkedIn, credential verifiers and documentation leave this site. Availability and accuracy of external pages are outside the operator&apos;s control.</p>
        </section>
        <section aria-labelledby="d-contact">
          <h2 id="d-contact" className="text-[1.25rem] font-medium text-fg">4. Corrections</h2>
          <p className="mt-3">Spotted an error? Please report it via the <Link href="/contact" className="link">contact page</Link> so it can be corrected.</p>
        </section>
        <p className="border-t border-line pt-6 text-sm">Related: <Link href="/privacy-policy" className="link">Privacy Policy</Link> · <Link href="/terms" className="link">Terms</Link> · <Link href="/cookie-policy" className="link">Cookie Policy</Link></p>
      </article>
    </div>
  );
}
