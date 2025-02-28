/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // Enable class-based dark mode
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "var(--bg-color)",
        text: "var(--text-color)",
      },
    },
  },
  plugins: [],
};
