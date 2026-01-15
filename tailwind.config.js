/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#6366f1",
        secondary: "#020617",
      },
      fontFamily: {
        sans: ["Geist Sans", "Arial", "Helvetica", "sans-serif"],
        mono: ["Fira Code", "monospace"],
      },
      theme: {
        screens: {
          sm: "640px",
          md: "768px", // iPad portrait
          ipad: "820px", // iPad Air / Pro
          lg: "1024px", // iPad landscape
          xl: "1280px",
        },
      },
    },
  },
  plugins: [],
};
