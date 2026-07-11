"use client";

import { Github, Linkedin, Mail, ArrowUp, Terminal } from "lucide-react";
import Link from "next/link";

const exploreLinks = [
  { label: "./home", href: "/" },
  { label: "./projects", href: "#projects" },
  { label: "./skills", href: "#skills" },
  { label: "./github", href: "#github" },
  { label: "./contact", href: "#contact" },
];

const socialLinks = [
  { label: "github", href: "https://github.com/gauravtiwarrii", icon: Github },
  { label: "linkedin", href: "https://linkedin.com/in/gauravtiwarrii", icon: Linkedin },
  { label: "email", href: "mailto:igauravtiwari1096@gmail.com", icon: Mail },
];

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer
      className="relative overflow-hidden"
      style={{ background: "var(--gt-bg)", borderTop: "1px solid var(--gt-border)" }}
    >
      {/* Tech grid overlay */}
      <div className="absolute inset-0 pointer-events-none bg-tech-grid z-0 mix-blend-screen opacity-5" aria-hidden="true" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-16">
        {/* Top Branding */}
        <div
          className="flex flex-col md:flex-row items-center justify-between mb-16 pb-8"
          style={{ borderBottom: "1px solid var(--gt-border)" }}
        >
          <div className="flex items-center gap-4 mb-6 md:mb-0">
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center"
              style={{
                background: "color-mix(in srgb, var(--gt-primary) 10%, transparent)",
                border: "1px solid color-mix(in srgb, var(--gt-primary) 30%, transparent)",
                color: "var(--gt-primary)",
                boxShadow: `0 0 15px var(--gt-glow)`,
              }}
            >
              <Terminal size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-heading font-bold" style={{ color: "var(--gt-fg)" }}>
                Gaurav Tiwari
              </h2>
              <p className="text-xs font-mono mt-1" style={{ color: "var(--gt-primary)" }}>
                {"sys.admin @ GT_OS v3.0"}
              </p>
            </div>
          </div>

          <div
            className="flex items-center gap-2 font-mono text-xs px-3 py-1.5 rounded-full"
            style={{
              color: "var(--gt-muted-fg)",
              background: "var(--gt-surface)",
              border: "1px solid var(--gt-border)",
            }}
          >
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.8)]" />
            SYSTEM_ONLINE
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {/* Directories */}
          <div>
            <h4 className="flex items-center gap-2 text-xs font-mono font-semibold mb-6" style={{ color: "var(--gt-primary)" }}>
              <span style={{ opacity: 0.5 }}>{"// "}</span>DIRECTORIES
            </h4>
            <ul className="space-y-3 font-mono">
              {exploreLinks.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm transition-all duration-300 flex items-center gap-2 group"
                    style={{ color: "var(--gt-muted-fg)" }}
                  >
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: "var(--gt-primary)" }}>
                      {">"}
                    </span>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connections */}
          <div>
            <h4 className="flex items-center gap-2 text-xs font-mono font-semibold mb-6" style={{ color: "var(--gt-accent)" }}>
              <span style={{ opacity: 0.5 }}>{"// "}</span>CONNECTIONS
            </h4>
            <ul className="space-y-3 font-mono">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-sm transition-all duration-300 group"
                    style={{ color: "var(--gt-muted-fg)" }}
                  >
                    <Icon size={16} className="transition-colors" style={{ color: "var(--gt-muted-fg)" }} />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Location */}
          <div>
            <h4 className="flex items-center gap-2 text-xs font-mono font-semibold mb-6" style={{ color: "var(--gt-warning)" }}>
              <span style={{ opacity: 0.5 }}>{"// "}</span>NETWORK
            </h4>
            <div className="space-y-4 font-mono">
              <a
                href="mailto:igauravtiwari1096@gmail.com"
                className="flex items-center gap-3 text-sm transition-all group"
                style={{ color: "var(--gt-muted-fg)" }}
              >
                <Mail size={16} />
                ping me
              </a>
              <div className="flex items-center gap-3 text-sm" style={{ color: "var(--gt-muted-fg)" }}>
                <span>loc:</span>
                <span style={{ color: "var(--gt-fg)" }}>IN / Earth</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-6 font-mono"
          style={{ borderTop: "1px solid var(--gt-border)" }}
        >
          <p className="text-xs flex items-center gap-2" style={{ color: "var(--gt-muted-fg)" }}>
            <span style={{ color: "var(--gt-primary)" }}>{">"}</span>
            © {new Date().getFullYear()} Gaurav Tiwari. All rights reserved.
          </p>
          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 px-4 py-2 rounded-md text-xs transition-all"
            style={{
              background: "var(--gt-surface)",
              border: "1px solid var(--gt-border)",
              color: "var(--gt-muted-fg)",
            }}
          >
            <ArrowUp size={14} className="group-hover:-translate-y-1 transition-transform" />
            [ return 0; ]
          </button>
        </div>
      </div>
    </footer>
  );
}
