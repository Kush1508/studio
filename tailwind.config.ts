import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#080808",
        surface: "#0e0e0e",
        surfaceElevated: "#141414",
        coral: {
          DEFAULT: "#F79192",
          light: "#FFA4A5",
          hover: "#F87E80",
          dark: "#E56B6D",
          glow: "rgba(247, 145, 146, 0.4)",
        },
        koralCream: "#FFF5EC",
        koralDark: "#0C1014",
      },
      fontFamily: {
        syne: ["var(--font-syne)", "Syne", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "monospace"],
        sans: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        swiss: "-0.05em",
      },
      lineHeight: {
        swiss: "0.88",
      },
    },
  },
  plugins: [],
};
export default config;
