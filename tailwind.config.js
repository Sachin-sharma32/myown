/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                heebo: "Heebo",
                lobster: "Lobster",
                inter: "Inter",
                poppins: "Poppins",
            },
        },
    },
    plugins: [],
};
