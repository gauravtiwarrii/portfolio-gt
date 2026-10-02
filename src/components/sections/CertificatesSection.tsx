import { ArrowUpRight } from "lucide-react";
import { CERTIFICATIONS } from "@/data/site";

/* ───────────────────────────────────────────────────────────────
   Certifications — §19

   Kept deliberately quiet: three credentials should not outweigh
   six case studies. One hairline cell per credential, and a link
   only where a verifiable certificate URL exists.
   ─────────────────────────────────────────────────────────────── */

const cell = "flex h-full flex-col gap-3 px-5 py-6 md:px-6";

export default function CertificatesSection() {
  return (
    <div id="certifications" className="mt-20 border-t border-line pt-12">
      <h3 className="mono text-[0.625rem] uppercase tracking-[0.18em] text-fg-faint">
        Certifications
      </h3>

      <ul className="mt-6 grid gap-px bg-[var(--line)] md:grid-cols-3">
        {CERTIFICATIONS.map((cert) => (
          <li key={cert.name} className="bg-bg">
            {cert.link ? (
              <a
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`group transition-colors duration-200 hover:bg-surface ${cell}`}
              >
                <Body cert={cert} />
                <span className="mono mt-auto inline-flex items-center gap-1.5 pt-2 text-[0.6875rem] text-fg-muted transition-colors duration-150 group-hover:text-accent">
                  Verify
                  <ArrowUpRight size={11} aria-hidden="true" />
                </span>
              </a>
            ) : (
              <div className={cell}>
                <Body cert={cert} />
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Body({
  cert,
}: {
  cert: { name: string; issuer: string; detail: string | null };
}) {
  return (
    <>
      <span className="mono text-[0.625rem] uppercase tracking-[0.16em] text-fg-faint">
        {cert.issuer}
      </span>
      <span className="text-[0.9375rem] font-medium leading-snug">
        {cert.name}
      </span>
      {cert.detail && (
        <span className="text-sm leading-relaxed text-fg-muted">
          {cert.detail}
        </span>
      )}
    </>
  );
}
