import { PRINCIPLES } from "@/data/site";

/* §16 — How I Build */
export default function Philosophy() {
  return (
    <section
      id="philosophy"
      className="section"
      aria-labelledby="philosophy-title"
    >
      <div className="shell">
        <span className="section__index">03 — Method</span>

        <div className="section__body">
          <header className="max-w-[60ch]">
            <h2 id="philosophy-title" className="section-title font-medium">
              How I Build
            </h2>
          </header>

          <ol className="mt-12 border-t border-line">
            {PRINCIPLES.map((p) => (
              <li
                key={p.index}
                className="grid gap-2 border-b border-line py-7 md:grid-cols-12 md:gap-8 md:py-9"
              >
                <span className="mono text-[0.6875rem] text-fg-faint md:col-span-1">
                  {p.index}
                </span>
                <h3 className="text-[1.25rem] font-medium md:col-span-4">
                  {p.title}
                </h3>
                <p className="max-w-[56ch] text-[0.9375rem] leading-relaxed text-fg-muted md:col-span-7">
                  {p.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
