import ArchitectureGraph from "@/components/systems/ArchitectureGraph";
import { DATA_CAPABILITIES, DATA_FLOW } from "@/data/site";

/* §15 — Data Systems. Also rendered on /about. */
export default function DataPipeline() {
  return (
    <section id="systems" className="section" aria-labelledby="systems-title">
      <div className="shell">
        <span className="section__index">01 — Systems</span>

        <div className="section__body">
          <header className="max-w-[60ch]">
            <h2 id="systems-title" className="section-title font-medium">
              Data Systems
            </h2>
            <p className="lede mt-4">
              From raw events to reliable analytical systems.
            </p>
          </header>

          <div className="mt-12">
            <ArchitectureGraph
              nodes={DATA_FLOW}
              title="Platform topology"
              unit="stages"
              orientation="horizontal"
            />
          </div>

          {/* Hairline grid: the 1px gaps are the parent showing through. */}
          <dl className="mt-14 grid gap-px bg-[var(--line)] sm:grid-cols-2 lg:grid-cols-3">
            {DATA_CAPABILITIES.map((cap) => (
              <div key={cap.name} className="bg-bg px-5 py-6 first:pl-0 sm:first:pl-5">
                <dt className="text-[0.9375rem] font-medium">{cap.name}</dt>
                <dd className="mt-1.5 max-w-[38ch] text-sm leading-relaxed text-fg-muted">
                  {cap.note}
                </dd>
              </div>
            ))}
            {/* Keeps the final row's hairlines honest. */}
            <div aria-hidden="true" className="hidden bg-bg sm:block lg:col-span-2" />
          </dl>
        </div>
      </div>
    </section>
  );
}
