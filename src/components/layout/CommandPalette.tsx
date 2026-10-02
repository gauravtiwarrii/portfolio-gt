"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowUpRight,
  CornerDownLeft,
  Download,
  FileText,
  Github,
  Home,
  Layers,
  Linkedin,
  Mail,
  Search,
  User,
} from "lucide-react";
import { RESUMES, SITE } from "@/data/site";
import { featuredProjects } from "@/data/projects";

type Action = {
  id: string;
  label: string;
  group: string;
  keywords?: string;
  icon: React.ElementType;
  run: (router: ReturnType<typeof useRouter>) => void;
  external?: boolean;
};

const resume = RESUMES.find((r) => r.available);

const open = (url: string) => window.open(url, "_blank", "noopener,noreferrer");

const BASE_ACTIONS: Action[] = [
  { id: "home", label: "Go Home", group: "Navigate", icon: Home, run: (r) => r.push("/") },
  { id: "work", label: "View Work", group: "Navigate", keywords: "projects selected", icon: Layers, run: (r) => r.push("/#work") },
  { id: "systems", label: "Data Systems", group: "Navigate", keywords: "pipeline kafka spark", icon: Layers, run: (r) => r.push("/#systems") },
  { id: "about", label: "About", group: "Navigate", keywords: "education background", icon: User, run: (r) => r.push("/#about") },
  { id: "contact", label: "Contact", group: "Navigate", keywords: "email hire message", icon: Mail, run: (r) => r.push("/#contact") },
  ...(resume
    ? [
        {
          id: "resume",
          label: "Download Resume",
          group: "Profile",
          keywords: "cv pdf",
          icon: Download,
          run: () => open(resume.href),
          external: true,
        } satisfies Action,
      ]
    : []),
  { id: "github", label: "GitHub", group: "Profile", keywords: "code repositories source", icon: Github, run: () => open(SITE.github), external: true },
  { id: "linkedin", label: "LinkedIn", group: "Profile", keywords: "profile network", icon: Linkedin, run: () => open(SITE.linkedin), external: true },
  { id: "email", label: `Email ${SITE.email}`, group: "Profile", keywords: "mail contact", icon: Mail, run: () => { window.location.href = `mailto:${SITE.email}`; }, external: true },
  ...featuredProjects.map(
    (p): Action => ({
      id: `project-${p.slug}`,
      label: p.title,
      group: "Case studies",
      keywords: `${p.category} ${p.tags.join(" ")}`,
      icon: FileText,
      run: (r) => r.push(`/projects/${p.slug}`),
    })
  ),
];

export default function CommandPalette() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState(0);
  const [isMac, setIsMac] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const restoreRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    setIsMac(/Mac|iPhone|iPad/.test(navigator.userAgent));
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    setQuery("");
    setIndex(0);
    restoreRef.current?.focus?.();
  }, []);

  const show = useCallback(() => {
    restoreRef.current = document.activeElement as HTMLElement;
    setIsOpen(true);
  }, []);

  /* ⌘K / Ctrl K anywhere, plus a custom event so any button can open it. */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((v) => {
          if (v) return false;
          restoreRef.current = document.activeElement as HTMLElement;
          return true;
        });
      }
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("command-palette:open", show);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("command-palette:open", show);
    };
  }, [show]);

  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    inputRef.current?.focus();
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return BASE_ACTIONS;
    return BASE_ACTIONS.filter((a) =>
      `${a.label} ${a.group} ${a.keywords ?? ""}`.toLowerCase().includes(q)
    );
  }, [query]);

  useEffect(() => {
    setIndex(0);
  }, [query]);

  /* Keep the highlighted row in view when driving with the keyboard. */
  useEffect(() => {
    if (!isOpen) return;
    const node = listRef.current?.querySelector<HTMLElement>(
      `[data-row="${index}"]`
    );
    node?.scrollIntoView({ block: "nearest" });
  }, [index, isOpen]);

  const commit = useCallback(
    (action?: Action) => {
      const chosen = action ?? results[index];
      if (!chosen) return;
      close();
      chosen.run(router);
    },
    [results, index, close, router]
  );

  if (!isOpen) {
    return (
      /* Discoverability: a hint that is also the trigger. */
      <button
        type="button"
        onClick={show}
        aria-keyshortcuts="Meta+K Control+K"
        className="mono fixed bottom-5 right-5 z-40 hidden items-center gap-2 rounded border border-line bg-surface/80 px-3 py-2 text-[0.6875rem] text-fg-faint backdrop-blur-md transition-colors duration-150 hover:border-line-strong hover:text-fg-muted lg:flex"
      >
        <Search size={12} aria-hidden="true" />
        <span>{isMac ? "⌘" : "Ctrl"} K</span>
        <span className="sr-only">Open command palette</span>
      </button>
    );
  }

  let lastGroup = "";

  return (
    <div className="fixed inset-0 z-[90] flex items-start justify-center px-4 pt-[12vh]">
      <button
        type="button"
        aria-label="Close command palette"
        onClick={close}
        className="absolute inset-0 cursor-default bg-black/70 backdrop-blur-sm"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        className="relative w-full max-w-[560px] overflow-hidden rounded-lg border border-line-strong bg-surface shadow-[0_24px_80px_-20px_rgba(0,0,0,0.8)]"
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            e.preventDefault();
            close();
          } else if (e.key === "ArrowDown") {
            e.preventDefault();
            setIndex((i) => (results.length ? (i + 1) % results.length : 0));
          } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setIndex((i) =>
              results.length ? (i - 1 + results.length) % results.length : 0
            );
          } else if (e.key === "Enter") {
            e.preventDefault();
            commit();
          }
        }}
      >
        <div className="flex items-center gap-3 border-b border-line px-4">
          <Search size={15} className="shrink-0 text-fg-faint" aria-hidden="true" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search sections, case studies and links"
            aria-label="Search commands"
            aria-controls="palette-results"
            aria-activedescendant={results[index] ? `palette-${results[index].id}` : undefined}
            className="h-14 w-full bg-transparent text-[0.9375rem] outline-none"
          />
        </div>

        <div
          ref={listRef}
          id="palette-results"
          role="listbox"
          aria-label="Commands"
          className="max-h-[52vh] overflow-y-auto py-2"
        >
          {results.length === 0 && (
            <p className="px-4 py-8 text-center text-sm text-fg-faint">
              Nothing matches “{query}”.
            </p>
          )}

          {results.map((action, i) => {
            const header = action.group !== lastGroup ? action.group : null;
            lastGroup = action.group;
            const Icon = action.icon;
            const selected = i === index;
            return (
              <div key={action.id}>
                {header && (
                  <p className="mono px-4 pb-1.5 pt-3 text-[0.625rem] uppercase tracking-[0.18em] text-fg-faint">
                    {header}
                  </p>
                )}
                <div
                  id={`palette-${action.id}`}
                  data-row={i}
                  role="option"
                  aria-selected={selected}
                  tabIndex={-1}
                  onMouseMove={() => setIndex(i)}
                  onClick={() => commit(action)}
                  className={[
                    "mx-2 flex cursor-pointer items-center gap-3 rounded px-2.5 py-2.5 text-sm",
                    selected ? "bg-surface-3 text-fg" : "text-fg-muted",
                  ].join(" ")}
                >
                  <Icon size={14} className="shrink-0 text-fg-faint" aria-hidden="true" />
                  <span className="truncate">{action.label}</span>
                  {action.external && (
                    <ArrowUpRight
                      size={12}
                      className="ml-auto shrink-0 text-fg-faint"
                      aria-hidden="true"
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mono flex items-center gap-4 border-t border-line px-4 py-2.5 text-[0.625rem] text-fg-faint">
          <span className="flex items-center gap-1.5">
            <CornerDownLeft size={11} aria-hidden="true" /> select
          </span>
          <span>↑↓ navigate</span>
          <span>esc close</span>
        </div>
      </div>
    </div>
  );
}
