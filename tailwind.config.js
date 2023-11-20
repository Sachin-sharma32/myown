/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./sites/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heebo: "Heebo",
        lobster: "Lobster",
        inter: "Inter",
        poppins: "Poppins",
      },
      screens: {
        fbp: "850px",
        cfbp: "1200px",
        sbp: "670px",
        tbp: "500px",
      },
    },
  },
  plugins: [],
};
