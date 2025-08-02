import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#FAFAFA",
          dark: "#121212",
          DEFAULT: "#FAFAFA",
        },
        secondary: "#22c55e",
      },
      fontFamily: {
        sans: ["var(--font-dm-sans)", "DM Sans", "sans-serif"],
        serif: ["var(--font-playfair)", "Playfair Display", "serif"],
      },
    },
  },
  plugins: [],
};

export default config;
