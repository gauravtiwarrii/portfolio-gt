import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        surface: {
          DEFAULT: "var(--surface)",
          2: "var(--surface-2)",
          3: "var(--surface-3)",
        },
        line: {
          DEFAULT: "var(--line)",
          strong: "var(--line-strong)",
          accent: "var(--line-accent)",
        },
        fg: {
          DEFAULT: "var(--fg)",
          muted: "var(--fg-muted)",
          faint: "var(--fg-faint)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          bright: "var(--accent-bright)",
          wash: "var(--accent-wash)",
          wire: "var(--accent-wire)",
        },
        ok: "var(--status-ok)",

        /* Legacy gt-* aliases so /about, /blog, /contact and /projects
           keep compiling until they are migrated in the next pass. */
        gt: {
          bg: "var(--bg)",
          fg: "var(--fg)",
          primary: "var(--accent)",
          secondary: "var(--accent-bright)",
          accent: "var(--accent)",
          warning: "#e0a030",
          danger: "#e05555",
          border: "var(--line)",
          glow: "var(--accent-wash)",
          surface: "var(--surface)",
          "surface-hover": "var(--surface-2)",
          muted: "var(--surface-3)",
          "muted-fg": "var(--fg-faint)",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      fontSize: {
        "2xs": ["0.6875rem", { lineHeight: "1.4", letterSpacing: "0.16em" }],
      },
      maxWidth: {
        page: "var(--page-max)",
      },
      borderRadius: {
        DEFAULT: "var(--radius)",
        lg: "var(--radius-lg)",
      },
      transitionTimingFunction: {
        ease: "var(--ease)",
        "ease-out": "var(--ease-out)",
      },
      keyframes: {
        reveal: {
          from: { opacity: "0", transform: "translateY(8px)" },
          to: { opacity: "1", transform: "none" },
        },
      },
      animation: {
        reveal: "reveal var(--slow) var(--ease) both",
      },
    },
  },
  plugins: [],
};

export default config;
