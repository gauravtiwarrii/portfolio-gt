import Image from "next/image";
import { EDUCATION } from "@/data/site";
import CertificatesSection from "@/components/sections/CertificatesSection";

/* ───────────────────────────────────────────────────────────────
   About — §18

   Everything stated here is on the CV: the degree, the institution,
   the graduation year, the CGPA, and the builds already listed
   above. No employment, no clients, no years of experience.
   ─────────────────────────────────────────────────────────────── */

const FACTS = [
  { label: "Degree", value: EDUCATION.degree },
  { label: "Institution", value: EDUCATION.institution },
  { label: "Graduating", value: EDUCATION.graduation },
  { label: "CGPA", value: EDUCATION.cgpa },
] as const;

export default function About() {
  return (
    <section id="about" className="section" aria-labelledby="about-title">
      <div className="shell">
        <span className="section__index">05 — About</span>

        <div className="section__body">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <h2
                id="about-title"
                className="section-title max-w-[22ch] font-medium"
              >
                Engineer. Builder. Problem Solver.
              </h2>

              <div className="mt-8 max-w-[62ch] space-y-5 text-[1.0625rem] leading-relaxed text-fg-muted">
                <p>
                  I&apos;m a final-year Computer Science engineering student at
                  Lovely Professional University, graduating in 2027. Most of
                  what I know about software came from building things that had
                  to actually work — an expense splitter that has to survive
                  concurrent edits, a crawler that has to survive its own
                  workers dying, a pipeline that has to survive a broker
                  restart.
                </p>
                <p>
                  My interest sits one level below the interface. I like the
                  part of the problem where you decide what the boundaries are:
                  what runs synchronously and what gets queued, where state
                  lives, what happens on the second attempt. A feature is
                  finished when it behaves correctly on the unhappy path, not
                  when it renders.
                </p>
                <p>
                  The work splits across three areas that keep converging —
                  full-stack product engineering, data platforms that move
                  events into queryable models, and AI systems built as
                  orchestrated graphs rather than single prompts. The builds
                  listed above are where each of those was worked out in
                  practice.
                </p>
              </div>

              <dl className="mt-12 grid grid-cols-2 gap-x-8 gap-y-6 border-t border-line pt-8 sm:grid-cols-4">
                {FACTS.map((fact) => (
                  <div key={fact.label}>
                    <dt className="mono text-[0.625rem] uppercase tracking-[0.16em] text-fg-faint">
                      {fact.label}
                    </dt>
                    <dd className="mt-2 text-sm leading-snug text-fg">
                      {fact.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="lg:col-span-5">
              <div className="profile-frame relative aspect-[4/5] w-full max-w-[380px] overflow-hidden border border-line">
                <Image
                  src="/profile.png"
                  alt="Gaurav Tiwari"
                  fill
                  sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <p className="meta mt-3">Gaurav Tiwari</p>
            </div>
          </div>

          <CertificatesSection />
        </div>
      </div>
    </section>
  );
}
