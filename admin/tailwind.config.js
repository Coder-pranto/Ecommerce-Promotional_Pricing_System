/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0E8AA5",
        secondary: "#6DB7C7",
      },
    },
  },

  // plugins: [require("daisyui")],
  plugins: [],
};
