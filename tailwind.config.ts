import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./data/**/*.ts"],
  theme: {
    extend: {
      colors: {
        ink: "#080808",
        charcoal: "#111111",
        card: "#171717",
        brand: { DEFAULT: "#E63946", deep: "#A4161A" },
        gold: { DEFAULT: "#D4AF37", light: "#F5D76E" },
        fg: "#F5F5F5",
        muted: "#A3A3A3",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Georgia", "serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      keyframes: {
        float1: {
          "0%,100%": { transform: "translate3d(0,0,0) scale(1)" },
          "33%": { transform: "translate3d(40px,-30px,0) scale(1.08)" },
          "66%": { transform: "translate3d(-30px,25px,0) scale(0.95)" },
        },
        float2: {
          "0%,100%": { transform: "translate3d(0,0,0) scale(1)" },
          "50%": { transform: "translate3d(-50px,40px,0) scale(1.12)" },
        },
        gradientShift: {
          "0%,100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        spinSlow: { to: { transform: "rotate(360deg)" } },
        sweep: {
          "0%": { transform: "translateX(-120%)" },
          "100%": { transform: "translateX(220%)" },
        },
        bob: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(8px)" },
        },
      },
      animation: {
        float1: "float1 22s ease-in-out infinite",
        float2: "float2 28s ease-in-out infinite",
        gradientShift: "gradientShift 8s ease infinite",
        spinSlow: "spinSlow 6s linear infinite",
        sweep: "sweep 5s ease-in-out infinite",
        bob: "bob 1.8s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
