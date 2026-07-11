import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gt: {
          bg: "var(--gt-bg)",
          fg: "var(--gt-fg)",
          primary: "var(--gt-primary)",
          secondary: "var(--gt-secondary)",
          accent: "var(--gt-accent)",
          warning: "var(--gt-warning)",
          danger: "var(--gt-danger)",
          border: "var(--gt-border)",
          glow: "var(--gt-glow)",
          surface: "var(--gt-surface)",
          "surface-hover": "var(--gt-surface-hover)",
          muted: "var(--gt-muted)",
          "muted-fg": "var(--gt-muted-fg)",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist)", "var(--font-inter)", "system-ui", "sans-serif"],
        heading: ["var(--font-space-grotesk)", "var(--font-geist)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "Courier New", "monospace"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      animation: {
        "blink": "blink 1s step-end infinite",
        "glow-pulse": "glow-pulse 2s ease-in-out infinite",
        "float": "float 3s ease-in-out infinite",
        "shimmer": "shimmer 2s linear infinite",
        "gradient-shift": "gradient-shift 3s ease infinite",
        "spin-slow": "spin-slow 20s linear infinite",
        "pulse-ring": "pulse-ring 1.5s cubic-bezier(0.215, 0.61, 0.355, 1) infinite",
        "border-glow": "border-glow 2s ease-in-out infinite",
      },
      keyframes: {
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        "glow-pulse": {
          "0%, 100%": {
            boxShadow: "0 0 5px var(--gt-glow), 0 0 10px var(--gt-glow)",
          },
          "50%": {
            boxShadow: "0 0 15px var(--gt-glow), 0 0 30px var(--gt-glow), 0 0 45px var(--gt-glow)",
          },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
      borderRadius: {
        "os": "12px",
      },
      spacing: {
        "taskbar": "48px",
      },
    },
  },
  plugins: [],
};
export default config;
