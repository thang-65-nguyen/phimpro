/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      backgroundImage: {
        "ct-right": "linear-gradient(to right, #272727, rgb(39 39 39 / 0))",
        "ct-left": "linear-gradient(to left, #272727, rgb(39 39 39 / 0))",
      },
      screens: {
        "ipad-pro": { min: "1024px", max: "1366px" },
      },
    },
  },
  plugins: [],
};
