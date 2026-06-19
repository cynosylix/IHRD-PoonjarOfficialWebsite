import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f0f1f8",
          100: "#dfe1f0",
          200: "#b8bdd9",
          300: "#9198c2",
          400: "#6a73ab",
          500: "#434e94",
          600: "#1a1a5e",
          700: "#141448",
          800: "#0f0c29",
          900: "#0a0820",
          950: "#050418",
        },
        gold: {
          50: "#fdf8eb",
          100: "#f9edd0",
          200: "#f0d99a",
          300: "#e8c564",
          400: "#dfb23e",
          500: "#c9a84c",
          600: "#a8873a",
          700: "#87662d",
          800: "#664d22",
          900: "#453416",
        },
        accent: {
          crimson: "#c0392b",
          teal: "#0d9488",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-playfair)", "Georgia", "serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      fontSize: {
        "fluid-sm": "clamp(0.875rem, 0.8rem + 0.35vw, 1rem)",
        "fluid-base": "clamp(1rem, 0.9rem + 0.5vw, 1.125rem)",
        "fluid-lg": "clamp(1.125rem, 1rem + 0.6vw, 1.375rem)",
        "fluid-xl": "clamp(1.25rem, 1.1rem + 0.75vw, 1.75rem)",
        "fluid-2xl": "clamp(1.5rem, 1.2rem + 1.5vw, 2.25rem)",
        "fluid-3xl": "clamp(1.875rem, 1.4rem + 2.4vw, 3rem)",
        "fluid-4xl": "clamp(2.25rem, 1.6rem + 3.2vw, 3.75rem)",
        "fluid-5xl": "clamp(2.75rem, 2rem + 3.75vw, 4.5rem)",
      },
      letterSpacing: {
        luxury: "0.08em",
        wide: "0.12em",
        wider: "0.16em",
      },
      boxShadow: {
        card: "0 4px 24px -4px rgb(15 12 41 / 0.12)",
        "card-hover": "0 20px 40px -12px rgb(15 12 41 / 0.18)",
        glass: "0 8px 32px -8px rgb(15 12 41 / 0.15)",
        glow: "0 0 24px -4px rgb(201 168 76 / 0.35)",
        "glow-lg": "0 0 40px -8px rgb(201 168 76 / 0.45)",
      },
      backgroundImage: {
        "gradient-premium":
          "linear-gradient(135deg, #0f0c29 0%, #1a1a2e 40%, #24243e 100%)",
        "gradient-gold":
          "linear-gradient(135deg, #f5c842 0%, #c9a84c 50%, #a8873a 100%)",
        "gradient-hero":
          "linear-gradient(135deg, #0B1026 0%, #1A237E 50%, #283593 100%)",
        "gradient-hero-premium":
          "linear-gradient(160deg, #0B1026 0%, #1A237E 45%, #283593 100%)",
        "gradient-footer":
          "linear-gradient(180deg, #0a0820 0%, #050418 100%)",
      },
      animation: {
        shimmer: "shimmer 2s linear infinite",
        float: "float 6s ease-in-out infinite",
        "float-delayed": "float 6s ease-in-out 2s infinite",
        "spin-slow": "spin 20s linear infinite",
        "pulse-soft": "pulse-soft 3s ease-in-out infinite",
        "fade-up": "fade-up 0.6s ease-out forwards",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "50%": { transform: "translateY(-12px) rotate(3deg)" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.7" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      transitionTimingFunction: {
        premium: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
