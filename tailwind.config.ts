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
        gold: {
          DEFAULT: "#C99700",
          muted: "#a67f00",
          glow: "rgba(201, 151, 0, 0.35)",
        },
        ink: "#0A0A0A",
        panel: "#121212",
        "panel-elevated": "#1a1a1a",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        gold: "0 0 40px rgba(201, 151, 0, 0.12)",
        card: "0 18px 45px rgba(0, 0, 0, 0.45)",
      },
      backgroundImage: {
        "luxury-radial":
          "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(201, 151, 0, 0.15), transparent 55%)",
        "gold-shine":
          "linear-gradient(135deg, rgba(201, 151, 0, 0.12) 0%, transparent 45%, rgba(201, 151, 0, 0.08) 100%)",
      },
      keyframes: {
        "scroll-hint": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(0.4rem)" },
        },
      },
      animation: {
        "scroll-hint": "scroll-hint 1.4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
