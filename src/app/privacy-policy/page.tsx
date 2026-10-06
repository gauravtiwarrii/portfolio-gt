import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/data/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy policy for hellogaurav.me — what data the contact form, analytics and advertising collect, and how it is used.",
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="shell pb-32 pt-[128px] md:pt-[152px]">
      <nav aria-label="Breadcrumb" className="case-breadcrumb">
        <Link href="/">Home</Link>
        <span aria-hidden="true">/</span>
        <span>Privacy Policy</span>
      </nav>
      <header className="max-w-[68ch] border-b border-line pb-12">
        <p className="eyebrow">Legal / Privacy</p>
        <h1 className="mt-6 text-[2.5rem] font-medium leading-[1.05] md:text-[3rem]">Privacy Policy</h1>
        <p className="lede mt-6">Last updated: October 2026.</p>
      </header>
      <article className="mt-14 max-w-[68ch] space-y-8 text-[0.9375rem] leading-relaxed text-fg-muted">
        <section aria-labelledby="pp-who">
          <h2 id="pp-who" className="text-[1.25rem] font-medium text-fg">1. Who operates this site</h2>
          <p className="mt-3">hellogaurav.me is a personal portfolio and technical journal run by Gaurav Tiwari. Contact: <a className="link" href={`mailto:${SITE.email}`}>{SITE.email}</a>. The site publishes project case studies and engineering notes; it sells nothing and runs no user accounts.</p>
        </section>
        <section aria-labelledby="pp-what">
          <h2 id="pp-what" className="text-[1.25rem] font-medium text-fg">2. Data collected</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            <li><strong className="text-fg">Contact form</strong> — name, email and message, used only to reply.</li>
            <li><strong className="text-fg">Analytics</strong> — aggregate page views via Vercel Analytics, no ad cookies.</li>
            <li><strong className="text-fg">Advertising</strong> — Google AdSense may set cookies for ad serving and measurement, only after consent.</li>
            <li><strong className="text-fg">Server logs</strong> — standard technical logs processed by the host (Vercel) for security.</li>
          </ul>
        </section>
        <section aria-labelledby="pp-third">
          <h2 id="pp-third" className="text-[1.25rem] font-medium text-fg">3. Third parties</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            <li>Vercel — hosting and analytics.</li>
            <li>Google AdSense — advertising, per <a className="link" href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google&apos;s Privacy Policy</a>.</li>
            <li>Resend — contact-form email delivery on submit.</li>
          </ul>
        </section>
        <section aria-labelledby="pp-rights">
          <h2 id="pp-rights" className="text-[1.25rem] font-medium text-fg">4. Your rights</h2>
          <p className="mt-3">Request access, correction or deletion of data you submitted by emailing <a className="link" href={`mailto:${SITE.email}`}>{SITE.email}</a>. Withdraw ad consent anytime via the consent banner&apos;s settings control.</p>
        </section>
        <p className="border-t border-line pt-6 text-sm">Related: <Link href="/cookie-policy" className="link">Cookie Policy</Link> · <Link href="/terms" className="link">Terms</Link> · <Link href="/disclaimer" className="link">Disclaimer</Link></p>
      </article>
    </div>
  );
}
