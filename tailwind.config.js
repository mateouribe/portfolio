/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        main: "#FF730D",
        secondary: "#940DFF",
        black: "#000000",
        white: "#F1F1F0",
        darkGray: "#1F1F1F",
        lightGray: "#E1E1E1",
      },
      fontFamily: {
        satoshi: "'Satoshi', serif",
        cabinet: "'Cabinet', sans-serif",
      },
      screens: {
        xs: "450px",
      },
    },
  },
  plugins: [],
};
