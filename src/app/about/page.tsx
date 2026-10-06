import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import DataPipeline from "@/components/sections/DataPipeline";
import SkillGalaxy from "@/components/sections/SkillGalaxy";
import Timeline from "@/components/sections/Timeline";
import GitHubSection from "@/components/sections/GitHubSection";
import CertificatesSection from "@/components/sections/CertificatesSection";
import { CERTIFICATIONS, EDUCATION, SITE } from "@/data/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Gaurav Tiwari is a software engineer and data engineer building production-grade software, data platforms and AI systems. Background, education, certifications and engineering approach.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About — Gaurav Tiwari",
    description:
      "Software engineer and data engineer building production-grade software, data platforms and AI systems.",
    url: "/about",
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: "About — Gaurav Tiwari",
    description:
      "Software engineer and data engineer building production-grade software, data platforms and AI systems.",
  },
};

const personAboutSchema = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  mainEntity: {
    "@type": "Person",
    name: "Gaurav Tiwari",
    url: `${SITE.url}/about`,
    jobTitle: "Software Engineer, Data Engineer",
    description:
      "Software engineer and data engineer building production-grade software, data platforms and AI systems.",
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: EDUCATION.institution,
    },
    sameAs: [SITE.github, SITE.linkedin],
  },
};

const breadcrumbAboutSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
    { "@type": "ListItem", position: 2, name: "About", item: `${SITE.url}/about` },
  ],
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personAboutSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbAboutSchema) }}
      />
      <div className="shell pb-32 pt-[128px] md:pt-[152px]">
        <nav aria-label="Breadcrumb" className="case-breadcrumb">
          <Link href="/">Home</Link>
          <span aria-hidden="true">/</span>
          <span>About</span>
        </nav>
        <header className="max-w-[68ch] border-b border-line pb-12">
          <p className="eyebrow">About / Operator</p>
          <h1 className="mt-6 text-[2.5rem] font-medium leading-[1.05] md:text-[3rem]">
            Gaurav Tiwari — software and data engineer.
          </h1>
          <p className="lede mt-6">
            I build production-grade software, data platforms and AI systems
            end-to-end.
          </p>
        </header>

        <div className="mt-14 grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <section aria-labelledby="who-runs">
              <h2 id="who-runs" className="text-[1.375rem] font-medium md:text-[1.625rem]">
                Who runs this site
              </h2>
              <div className="mt-5 max-w-[68ch] space-y-5 text-[0.9375rem] leading-relaxed text-fg-muted">
                <p>
                  This website is designed, written and maintained by Gaurav
                  Tiwari, a B.Tech Computer Science student at{" "}
                  {EDUCATION.institution} (graduating {EDUCATION.graduation})
                  focused on software engineering, data engineering and AI systems.
                </p>
                <p>
                  My work centres on systems that must be correct under load:
                  ETL and ELT pipelines, streaming platforms, APIs and
                  full-stack products, and the storage layers beneath them.
                </p>
                <p>
                  Everything here is written from first-hand building
                  experience. Where data is synthetic or a system is still in
                  progress, the page says so directly.
                </p>
              </div>
            </section>

            <section aria-labelledby="what-here" className="mt-12">
              <h2 id="what-here" className="text-[1.375rem] font-medium md:text-[1.625rem]">
                What you will find here
              </h2>
              <ul className="mt-5 grid gap-4">
                <li className="border border-line p-5">
                  <p className="font-medium">Project case studies</p>
                  <p className="mt-2 text-sm leading-relaxed text-fg-muted">
                    Problem, architecture and decisions for each system — start at{" "}
                    <Link href="/projects" className="link">the projects index</Link>.
                  </p>
                </li>
                <li className="border border-line p-5">
                  <p className="font-medium">Technical journal</p>
                  <p className="mt-2 text-sm leading-relaxed text-fg-muted">
                    Notes on data engineering and distributed systems — start at{" "}
                    <Link href="/blog" className="link">the journal</Link>.
                  </p>
                </li>
              </ul>
            </section>

            <section aria-labelledby="edu-cert" className="mt-12">
              <h2 id="edu-cert" className="text-[1.375rem] font-medium md:text-[1.625rem]">
                Education and certifications
              </h2>
              <div className="mt-5 border border-line p-5 text-sm leading-relaxed text-fg-muted">
                <p className="font-medium text-fg">{EDUCATION.degree}</p>
                <p className="mt-1">
                  {EDUCATION.institution} · Graduating {EDUCATION.graduation} ·
                  CGPA {EDUCATION.cgpa}
                </p>
                <ul className="mt-4 space-y-3">
                  {CERTIFICATIONS.map((cert) => (
                    <li key={cert.name} className="border-t border-line pt-3">
                      <p className="font-medium text-fg">{cert.name}</p>
                      <p className="mono mt-1 text-[0.6875rem] uppercase tracking-[0.14em] text-fg-faint">
                        {cert.issuer}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </div>

          <aside className="lg:col-span-5" aria-label="Profile">
            <div className="border border-line p-5">
              <div className="relative aspect-[4/3] overflow-hidden border border-line">
                <Image
                  src="/profile.png"
                  alt="Portrait of Gaurav Tiwari, software and data engineer"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  priority
                />
              </div>
              <dl className="mt-5 space-y-3 text-sm">
                <div className="flex items-baseline justify-between gap-6 border-b border-line pb-3">
                  <dt className="mono text-[0.625rem] uppercase tracking-[0.16em] text-fg-faint">Role</dt>
                  <dd className="text-right">{SITE.role}</dd>
                </div>
                <div className="flex items-baseline justify-between gap-6">
                  <dt className="mono text-[0.625rem] uppercase tracking-[0.16em] text-fg-faint">Email</dt>
                  <dd>
                    <a href={`mailto:${SITE.email}`} className="link break-all">{SITE.email}</a>
                  </dd>
                </div>
              </dl>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link href="/contact" className="btn btn--primary">Contact</Link>
                <Link href="/projects" className="btn btn--secondary">
                  View projects <ArrowUpRight size={15} aria-hidden="true" />
                </Link>
              </div>
            </div>
          </aside>
        </div>

        <div className="mt-20 space-y-24">
          <DataPipeline />
          <SkillGalaxy />
          <GitHubSection />
          <Timeline />
          <CertificatesSection />
        </div>
      </div>
    </>
  );
}
