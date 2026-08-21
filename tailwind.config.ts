import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        surface: "var(--surface)",
        surface2: "var(--surface-2)",
        border: "var(--border)",
        text: "var(--text)",
        muted: "var(--muted)",
        accent: "var(--accent)",
        accent2: "var(--accent-2)",
        danger: "var(--danger)",
      },
      fontFamily: {
        display: ["var(--font-display)", "var(--font-khmer)", "sans-serif"],
        body: ["var(--font-body)", "var(--font-khmer)", "sans-serif"],
        mono: ["var(--font-mono)", "var(--font-khmer)", "monospace"],
        khmer: ["var(--font-khmer)", "sans-serif"],
      },
      backgroundImage: {
        "grid-pattern":
          "linear-gradient(to right, var(--border) 1px, transparent 1px), linear-gradient(to bottom, var(--border) 1px, transparent 1px)",
      },
      keyframes: {
        blink: {
          "0%, 49%": { opacity: "1" },
          "50%, 100%": { opacity: "0" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        typing: {
          from: { width: "0" },
          to: { width: "100%" },
        },
      },
      animation: {
        blink: "blink 1s step-end infinite",
        "fade-up": "fade-up 0.6s ease-out forwards",
      },
    },
  },
  
  
  plugins: [],
};


export default config;
