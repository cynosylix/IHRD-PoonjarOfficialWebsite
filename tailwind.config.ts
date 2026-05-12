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
          50: "#f5f5fb",
          100: "#e8e9f4",
          200: "#cfd1e8",
          300: "#aeb2d6",
          400: "#878cc0",
          500: "#5c619f",
          600: "#000080",
          700: "#000066",
          800: "#000052",
          900: "#000044",
          950: "#000028",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      boxShadow: {
        card: "0 4px 24px -4px rgb(0 0 128 / 0.12)",
      },
    },
  },
  plugins: [],
};

export default config;
