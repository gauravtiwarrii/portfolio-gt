import type { Metadata } from "next";
import Link from "next/link";
import ContactConsole from "@/components/sections/ContactConsole";
import { SITE } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Gaurav Tiwari about software engineering, data engineering and AI systems work. Email, GitHub, LinkedIn and a direct contact form.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact — Gaurav Tiwari",
    description:
      "Get in touch about engineering work, collaboration or opportunities.",
    url: "/contact",
  },
};

const breadcrumbContactSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
    { "@type": "ListItem", position: 2, name: "Contact", item: `${SITE.url}/contact` },
  ],
};

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbContactSchema) }}
      />
      <div className="shell pb-32 pt-[128px] md:pt-[152px]">
        <nav aria-label="Breadcrumb" className="case-breadcrumb">
          <Link href="/">Home</Link>
          <span aria-hidden="true">/</span>
          <span>Contact</span>
        </nav>
        <header className="max-w-[68ch] border-b border-line pb-12">
          <p className="eyebrow">Contact / Direct channels</p>
          <h1 className="mt-6 text-[2.5rem] font-medium leading-[1.05] md:text-[3rem]">
            Get in touch.
          </h1>
          <p className="lede mt-6">
            For engineering roles, collaboration or questions about the work
            documented here — email is fastest, the form below works too.
          </p>
        </header>
        <div className="mt-14">
          <ContactConsole />
        </div>
      </div>
    </>
  );
}
