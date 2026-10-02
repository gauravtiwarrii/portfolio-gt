"use client";

import { useState } from "react";
import { ArrowUpRight, Check, Loader2, Mail } from "lucide-react";
import { SITE } from "@/data/site";

/* ───────────────────────────────────────────────────────────────
   Contact — §23

   Three fields, because three is what's needed. The form posts to
   /api/contact; if that fails the email address is still on screen,
   so a failed submit never becomes a dead end.
   ─────────────────────────────────────────────────────────────── */

type State = "idle" | "sending" | "sent" | "error";

const CHANNELS = [
  { label: "Email", value: SITE.email, href: `mailto:${SITE.email}` },
  { label: "GitHub", value: `@${SITE.githubHandle}`, href: SITE.github },
  { label: "LinkedIn", value: "in/gauravtiwarrii", href: SITE.linkedin },
] as const;

const field =
  "mt-2 w-full border-b border-line bg-transparent pb-2.5 text-[0.9375rem] text-fg outline-none transition-colors duration-200 placeholder:text-fg-faint focus:border-accent";

export default function ContactConsole() {
  const [state, setState] = useState<State>("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    setState("sending");
    setError(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const payload = await res.json();

      if (!res.ok) throw new Error(payload.error ?? "Message didn't send.");

      form.reset();
      setState("sent");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Message didn't send.");
      setState("error");
    }
  }

  return (
    <section id="contact" className="section" aria-labelledby="contact-title">
      <div className="shell">
        <span className="section__index">08 — Contact</span>

        <div className="section__body">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            {/* ── Invitation + channels ────────────────────────── */}
            <div className="lg:col-span-5">
              <h2
                id="contact-title"
                className="section-title max-w-[20ch] font-medium"
              >
                Let&apos;s build something worth shipping.
              </h2>
              <p className="lede mt-5 max-w-[42ch]">
                Open to software engineering, data engineering and AI systems
                opportunities.
              </p>

              <dl className="mt-12 border-t border-line">
                {CHANNELS.map((channel) => (
                  <div
                    key={channel.label}
                    className="flex items-baseline justify-between gap-6 border-b border-line py-4"
                  >
                    <dt className="mono text-[0.625rem] uppercase tracking-[0.16em] text-fg-faint">
                      {channel.label}
                    </dt>
                    <dd>
                      <a
                        href={channel.href}
                        {...(channel.href.startsWith("http")
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                        className="group mono inline-flex items-center gap-2 text-[0.8125rem] text-fg-muted transition-colors duration-150 hover:text-fg"
                      >
                        {channel.value}
                        <ArrowUpRight
                          size={12}
                          aria-hidden="true"
                          className="text-fg-faint transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        />
                      </a>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* ── Form ─────────────────────────────────────────── */}
            <div className="lg:col-span-7 lg:pl-8">
              <form onSubmit={onSubmit} className="contact-form max-w-[46rem]">
                <div className="grid gap-8 sm:grid-cols-2">
                  <div className="field-wrap">
                    <label
                      htmlFor="name"
                      className="mono text-[0.625rem] uppercase tracking-[0.16em] text-fg-faint"
                    >
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      autoComplete="name"
                      placeholder="Your name"
                      className={field}
                    />
                  </div>

                  <div className="field-wrap">
                    <label
                      htmlFor="email"
                      className="mono text-[0.625rem] uppercase tracking-[0.16em] text-fg-faint"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      placeholder="you@company.com"
                      className={field}
                    />
                  </div>
                </div>

                <div className="field-wrap mt-8">
                  <label
                    htmlFor="message"
                    className="mono text-[0.625rem] uppercase tracking-[0.16em] text-fg-faint"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    placeholder="What are you building?"
                    className={`${field} resize-y`}
                  />
                </div>

                <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
                  <button
                    type="submit"
                    disabled={state === "sending"}
                    className="btn btn--primary disabled:opacity-60"
                  >
                    {state === "sending" ? (
                      <>
                        <Loader2
                          size={15}
                          aria-hidden="true"
                          className="animate-spin"
                        />
                        Sending
                      </>
                    ) : (
                      <>
                        <Mail size={15} aria-hidden="true" />
                        Send Message
                      </>
                    )}
                  </button>

                  <p
                    aria-live="polite"
                    className="text-sm text-fg-muted"
                    role="status"
                  >
                    {state === "sent" && (
                      <span className="inline-flex items-center gap-2 text-fg">
                        <Check
                          size={14}
                          aria-hidden="true"
                          className="text-ok"
                        />
                        Message sent — I&apos;ll reply to that address.
                      </span>
                    )}
                    {state === "error" && (
                      <span className="text-fg">
                        {error} Email{" "}
                        <a
                          href={`mailto:${SITE.email}`}
                          className="link text-fg-muted"
                        >
                          {SITE.email}
                        </a>{" "}
                        instead.
                      </span>
                    )}
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
