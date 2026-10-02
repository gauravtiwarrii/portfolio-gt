"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Github, Linkedin, Menu, Search, X } from "lucide-react";
import { NAV_LINKS, RESUMES, SITE } from "@/data/site";

const resumes = RESUMES.filter((resume) => resume.available);

/* Section ids the nav tracks on the homepage. Derived from the hrefs so the
   two can never drift apart. */
const SECTION_IDS = NAV_LINKS.map((l) => l.href.split("#")[1]).filter(Boolean);

export default function Nav() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  /* Condense the bar once the hero is behind you. */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Active section. Observer rather than a scroll handler doing maths —
     cheaper, and it stays correct when sections change height. */
  useEffect(() => {
    if (!isHome) {
      return;
    }
    const nodes = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (n): n is HTMLElement => Boolean(n)
    );
    if (!nodes.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, [isHome, pathname]);

  const close = useCallback(() => {
    setOpen(false);
    toggleRef.current?.focus();
  }, []);

  /* Drawer: lock the page, close on Escape. */
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  return (
    <>
      <header
        className={[
          "fixed top-0 inset-x-0 z-50 border-b transition-[height,background-color,border-color,backdrop-filter] duration-300",
          scrolled
            ? "h-[60px] border-line bg-bg/80 backdrop-blur-xl backdrop-saturate-150"
            : "h-[76px] border-transparent bg-transparent",
        ].join(" ")}
        style={{ transitionTimingFunction: "var(--ease-out)" }}
      >
        <nav
          aria-label="Primary"
          className="shell nav-shell flex h-full items-center justify-between gap-6"
        >
          {/* ── Left: wordmark ────────────────────────────────── */}
          <Link
            href="/"
            className="group flex shrink-0 items-center gap-2.5"
            aria-label={`${SITE.name} — home`}
          >
            <span
              aria-hidden="true"
              className="mono grid h-7 w-7 place-items-center rounded border border-line-strong text-[11px] tracking-[0.06em] text-fg-muted transition-colors duration-150 group-hover:border-accent group-hover:text-fg"
            >
              {SITE.monogram}
            </span>
            <span className="hidden text-[0.9375rem] font-medium sm:block">
              {SITE.name}
            </span>
          </Link>

          {/* ── Centre: sections ──────────────────────────────── */}
          <ul className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((link) => {
              const id = link.href.split("#")[1];
              const isActive = isHome && active === id;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={isActive ? "true" : undefined}
                    className={[
                      "relative flex h-8 items-center px-3 text-[0.875rem] transition-colors duration-150 hover:text-fg",
                      isActive ? "text-fg" : "text-fg-muted",
                    ].join(" ")}
                  >
                    {link.label}
                    {/* Active marker is a rule, not just a colour change. */}
                    <span
                      aria-hidden="true"
                      className={[
                        "absolute inset-x-3 -bottom-0.5 h-px origin-left bg-accent transition-transform duration-300",
                        isActive ? "scale-x-100" : "scale-x-0",
                      ].join(" ")}
                      style={{ transitionTimingFunction: "var(--ease)" }}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* ── Right: presence + outbound ────────────────────── */}
          <div className="flex shrink-0 items-center gap-1">
            {SITE.available && (
              <p className="mono mr-2 hidden items-center gap-2 text-[0.6875rem] text-fg-faint xl:flex">
                <span
                  aria-hidden="true"
                  className="status-dot h-1.5 w-1.5 rounded-full bg-ok"
                />
                {SITE.availableLabel}
              </p>
            )}

            <button
              type="button"
              onClick={() => window.dispatchEvent(new Event("command-palette:open"))}
              aria-label="Open command palette"
              aria-keyshortcuts="Meta+K Control+K"
              title="Search commands"
              className="inline-flex h-9 items-center gap-1.5 px-2 text-fg-faint transition-colors duration-150 hover:text-fg"
            >
              <Search size={15} aria-hidden="true" />
              <span className="mono hidden text-[0.625rem] xl:inline">CTRL / ⌘ K</span>
            </button>

            <a
              href={SITE.github}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="open ↗"
              aria-label="GitHub profile"
              className="grid h-9 w-9 place-items-center rounded text-fg-faint transition-colors duration-150 hover:bg-surface-2 hover:text-fg"
            >
              <Github size={16} aria-hidden="true" />
            </a>
            <a
              href={SITE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="open ↗"
              aria-label="LinkedIn profile"
              className="grid h-9 w-9 place-items-center rounded text-fg-faint transition-colors duration-150 hover:bg-surface-2 hover:text-fg"
            >
              <Linkedin size={16} aria-hidden="true" />
            </a>

            {resumes.length > 0 && (
              <details className="resume-menu ml-2 hidden sm:block">
                <summary aria-label="Choose a resume" className="resume-menu__trigger">Resumes</summary>
                <div className="resume-menu__options">
                  {resumes.map((resume) => (
                    <a key={resume.href} href={resume.href} target="_blank" rel="noopener noreferrer" data-cursor="open ↗">
                      {resume.label}
                    </a>
                  ))}
                </div>
              </details>
            )}

            <button
              ref={toggleRef}
              type="button"
              onClick={() => setOpen(true)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label="Open menu"
              className="ml-1 grid h-9 w-9 place-items-center rounded text-fg transition-colors duration-150 hover:bg-surface-2 lg:hidden"
            >
              <Menu size={18} aria-hidden="true" />
            </button>
          </div>
        </nav>
      </header>

      {/* ── Mobile drawer ───────────────────────────────────── */}
      <div
        id="mobile-nav"
        hidden={!open}
        className="mobile-nav fixed inset-0 z-[60] flex flex-col bg-bg lg:hidden"
      >
        <div className="shell flex h-[76px] shrink-0 items-center justify-between">
          <span className="mono text-[0.6875rem] uppercase tracking-[0.18em] text-fg-faint">
            Menu
          </span>
          <button
            type="button"
            onClick={close}
            aria-label="Close menu"
            className="grid h-9 w-9 place-items-center rounded text-fg hover:bg-surface-2"
          >
            <X size={18} aria-hidden="true" />
          </button>
        </div>

        <nav aria-label="Mobile" className="shell flex flex-1 flex-col pt-4">
          <ul className="border-t border-line">
            {NAV_LINKS.map((link, i) => (
              <li key={link.href} className="mobile-nav__item border-b border-line">
                <Link
                  href={link.href}
                  onClick={close}
                  className="flex items-baseline gap-4 py-5 text-2xl font-medium"
                >
                  <span className="mono text-[0.6875rem] text-fg-faint">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-auto flex flex-col gap-4 py-8">
            {resumes.map((resume, index) => (
              <a
                key={resume.href}
                href={resume.href}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="open ↗"
                className={`btn ${index === 0 ? "btn--primary" : "btn--secondary"} w-full justify-center`}
              >
                {resume.label}
              </a>
            ))}
            <div className="flex items-center gap-5">
              <a
                href={SITE.github}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="open ↗"
                className="mono text-xs text-fg-muted"
              >
                GitHub
              </a>
              <a
                href={SITE.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="open ↗"
                className="mono text-xs text-fg-muted"
              >
                LinkedIn
              </a>
              <a
                href={`mailto:${SITE.email}`}
                className="mono text-xs text-fg-muted"
              >
                Email
              </a>
            </div>
            {SITE.available && (
              <p className="mono flex items-center gap-2 text-[0.6875rem] text-fg-faint">
                <span
                  aria-hidden="true"
                  className="status-dot h-1.5 w-1.5 rounded-full bg-ok"
                />
                {SITE.availableLabel}
              </p>
            )}
          </div>
        </nav>
      </div>
    </>
  );
}
