import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

export default function NotFound() {
  return (
    <section className="not-found shell">
      <p className="eyebrow">GT / 404 / Route not found</p>
      <div className="not-found__composition">
        <span className="not-found__number mono" aria-hidden="true">404</span>
        <div>
          <h1 className="not-found__title">No route<br />matches this address.</h1>
          <p className="mt-5 max-w-[48ch] text-fg-muted">
            The requested path isn&apos;t part of this system. Return to the work or browse the full project archive.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/" className="btn btn--primary">
              <ArrowLeft size={15} aria-hidden="true" />
              Return home
            </Link>
            <Link href="/projects" className="btn btn--secondary">
              Projects index
              <ArrowUpRight size={15} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}