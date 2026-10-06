import Link from "next/link";
import { LEGAL_LINKS, NAV_LINKS, RESUMES, SITE } from "@/data/site";

const resumes = RESUMES.filter((resume) => resume.available);

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="shell grid gap-12 py-16 md:grid-cols-[1fr_auto] md:gap-20 md:py-20">
        <div className="max-w-sm">
          <p className="text-[0.9375rem] font-medium">{SITE.name}</p>
          <p className="mt-2 text-sm leading-relaxed text-fg-muted">
            I build production-grade software, data systems and AI-powered
            products.
          </p>
          {SITE.available && (
            <p className="mono mt-5 flex items-center gap-2 text-[0.6875rem] text-fg-faint">
              <span
                aria-hidden="true"
                className="status-dot h-1.5 w-1.5 rounded-full bg-ok"
              />
              {SITE.availableLabel}
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-10 sm:gap-16">
          <nav aria-label="Footer sections">
            <p className="mono mb-4 text-[0.625rem] uppercase tracking-[0.18em] text-fg-faint">
              Sections
            </p>
            <ul className="space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-fg-muted transition-colors duration-150 hover:text-fg"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="mono mb-4 text-[0.625rem] uppercase tracking-[0.18em] text-fg-faint">
              Elsewhere
            </p>
            <ul className="space-y-2.5">
              <li>
                <a
                  href={SITE.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-fg-muted transition-colors duration-150 hover:text-fg"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href={SITE.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-fg-muted transition-colors duration-150 hover:text-fg"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  className="text-sm text-fg-muted transition-colors duration-150 hover:text-fg"
                >
                  Email
                </a>
              </li>
              {resumes.map((resume) => (
                <li key={resume.href}>
                  <a
                    href={resume.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-fg-muted transition-colors duration-150 hover:text-fg"
                  >
                    {resume.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="shell flex flex-wrap items-center justify-between gap-x-6 gap-y-3 py-5">
          <p className="mono text-[0.6875rem] text-fg-faint">
            © 2026 {SITE.name}
          </p>
          <nav aria-label="Legal" className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {LEGAL_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="mono text-[0.6875rem] text-fg-faint transition-colors duration-150 hover:text-fg"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <p className="mono text-[0.6875rem] text-fg-faint">
            Next.js · TypeScript · Vercel
          </p>
        </div>
      </div>
    </footer>
  );
}
