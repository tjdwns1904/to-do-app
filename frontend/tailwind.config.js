/** @type {import('tailwindcss').Config} */
export default config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      height: {
        first: "0%",
        second: "33%",
        third: "66%",
        fourth: "100%",
      },
    },
  },
  plugins: [],
};
