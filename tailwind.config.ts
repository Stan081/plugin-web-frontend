import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
xs: "300px"
      },
      backgroundImage: {
        'custom-gradient': 'linear-gradient(182.95deg, #FFF6F1 5.6%, #FDE5E3 92.46%)',
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "pitchNoise": "url('/images/pitch-bg.png')",
        "whiteNoise": "url('/images/white-bg.png')",
        "pinkNoise": "url('/images/pink-bg.png')",
        "blueNoise": "url('/images/blue-bg.png')",
        "creamNoise": "url('/images/cream-bg.png')",
        "seagreenNoise": "url('/images/seagreen-bg.png')",
        "topLocation": "url('/images/top-location-bg.png')",
        "bgListEvent": "url('/images/list-event-bg.png')",
        "bgCampaignHeader": "url('https://ik.imagekit.io/pluginImage/Plugin-images/campaign.png?updatedAt=1728314071319')",
        "bgHero": "url('https://res.cloudinary.com/dbhbyikta/image/upload/v1742917303/WhatsApp_Image_2025-03-25_at_4.39.23_PM_1_fsphvb.jpg')",
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
        'pally-regular': ['Pally-Regular', 'sans-serif'],
        'pally-medium': ['Pally-Medium', 'sans-serif'],
        'pally-bold': ['Pally-Bold', 'sans-serif'],
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
