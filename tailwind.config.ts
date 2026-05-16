import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // Parchment / codex palette
        paper:   "#f0e9d7",   // page
        page:    "#ebe2cb",   // slightly darker for panels
        margin:  "#d8cdb1",
        ink:     "#1a140a",   // deep brown-black body
        deep:    "#0e0a05",
        soot:    "#3a2c19",
        sepia:   "#6e573a",
        mute:    "#8a7350",
        vermillion: "#b9352a", // cinnabar accent
        rouge:   "#8c2a22",
        gilt:    "#a07f49",
        gold:    "#c9a96e",
        verdant: "#3f5c3d",
      },
      fontFamily: {
        display: ["var(--font-display)", "ui-serif", "Georgia", "serif"],
        body:    ["var(--font-body)", "ui-serif", "Georgia", "serif"],
        sans:    ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono:    ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
        zh:      ["var(--font-zh)", "ui-serif", "serif"],
      },
      letterSpacing: {
        cinema: "0.36em",
        wide2:  "0.22em",
      },
      keyframes: {
        ember: {
          "0%,100%": { opacity: "0.4", transform: "scale(1)" },
          "50%":     { opacity: "1",   transform: "scale(1.06)" },
        },
        drift: {
          "0%,100%": { transform: "translate3d(0,0,0)" },
          "50%":     { transform: "translate3d(0,-8px,0)" },
        },
        scribe: {
          from: { strokeDashoffset: "400" },
          to:   { strokeDashoffset: "0" },
        },
      },
      animation: {
        ember:  "ember 5s ease-in-out infinite",
        drift:  "drift 16s ease-in-out infinite",
        scribe: "scribe 2.4s ease-out forwards",
      },
    },
  },
  plugins: [],
};
export default config;
