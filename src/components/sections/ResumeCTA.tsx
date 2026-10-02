import { Download, Linkedin } from "lucide-react";
import { RESUMES, SITE } from "@/data/site";

/* ───────────────────────────────────────────────────────────────
   Résumé — §22

   Two résumés are supported, one per track. Only the ones whose PDF
   actually exists in /public render, so this never offers a file
   that 404s.
   ─────────────────────────────────────────────────────────────── */

const available = RESUMES.filter((r) => r.available);

export default function ResumeCTA() {
  return (
    <section
      aria-labelledby="resume-title"
      className="border-y border-line bg-surface"
    >
      <div className="shell py-16 md:py-20">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-12">
          <div className="lg:col-span-7">
            <h2
              id="resume-title"
              className="text-[clamp(1.5rem,3vw,2.125rem)] font-medium tracking-[-0.025em]"
            >
              Want the full technical profile?
            </h2>
            <p className="mt-3 max-w-[54ch] text-[0.9375rem] leading-relaxed text-fg-muted">
              {available.length > 1
                ? "Two versions, depending on the role you're hiring for."
                : "Coursework, credentials and the complete project list."}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 lg:col-span-5 lg:justify-end">
            {available.map((resume, i) => (
              <a
                key={resume.label}
                href={resume.href}
                target="_blank"
                rel="noopener noreferrer"
                className={
                  i === 0 ? "btn btn--primary" : "btn btn--secondary"
                }
              >
                <Download size={15} aria-hidden="true" />
                {available.length > 1 ? resume.label : "Download Resume"}
              </a>
            ))}

            <a
              href={SITE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--secondary"
            >
              <Linkedin size={15} aria-hidden="true" />
              View LinkedIn
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
