import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "pitchNoise": "url('/images/pitch-bg.png')",
      },
      colors: {
        "custom-lightgray": "lightgray",
        "custom-overlay": "rgba(255, 246, 241, 0.10)",
      },
      backgroundSize: {
        "custom-size": "100px 100px",
      },
      backdropFilter: {
        "custom-blur": "blur(20px)",
      },
      fontFamily: {
        'regular': ['Pally-Regular', 'sans-serif'],
        'medium': ['Pally-Medium', 'sans-serif'],
        'bold': ['Pally-Bold', 'sans-serif'],
      },
      boxShadow: {
        'custom': '0px 4px 4px 0px rgba(0, 0, 0, 0.18), 0px -7px 11.4px 0px rgba(117, 12, 29, 0.64) inset',
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [],
};
export default config;
