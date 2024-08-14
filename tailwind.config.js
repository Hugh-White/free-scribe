/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      dropShadow: {
        glow: [
          "0 0px 20px rgba(160, 0, 255, 0.85)",
          "0 0px 65px rgba(180, 0, 255, 0.95)",
        ],
      },
    },
  },
  plugins: [],
};
