// tailwind.config.ts
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
        brand: "#005F7B",
        "brand-dark": "#004D63",
      },
      container: {
        center: true,
        padding: "1rem",
        screens: { "2xl": "72rem" },
      },
    },
  },
  plugins: [],
};

export default config;
