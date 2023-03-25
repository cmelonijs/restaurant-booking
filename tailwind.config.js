/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
  "./pages/**/*.{js,ts,jsx,tsx}",
  "./components/**/*.{js,ts,jsx,tsx}"
],
  theme: {
    extend: {},
    fontSize: {
      "2xsm": "10px",
      "xsm": "12px",
      "sm": "13px",
      "reg": "15px",
      "lg": "18px",
      "xl": "22px",
      "2xl": "25px",
      "3xl": "32px",
      "4xl": "40px",
      "5xl": "50px",
      "6xl": "70px",
    }
  },
  plugins: [],
}
