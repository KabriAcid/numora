/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#EFF9F0", // New primary color
        },
        secondary: {
          DEFAULT: "#13070C", // New secondary color
        },
        dark: {
          DEFAULT: "#23272F", // Custom dark color
        },
        accent: {
          DEFAULT: "#f97316",
          light: "#fdba74",
          dark: "#c2410c",
        },
        neutral: {
          DEFAULT: "#f3f4f6",
          dark: "#374151",
        },
        error: "#ef4444",
        success: "#22c55e",
        info: "#3b82f6",
        warning: "#facc15",
      },
      fontFamily: {
        ginto: ["Ginto", "ui-sans-serif", "system-ui"],
      },
    },
  },
  plugins: [],
};
