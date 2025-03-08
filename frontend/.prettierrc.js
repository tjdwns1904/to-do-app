/**
 * @type {import("prettier").Config}
 */
const config = {
  trailingComma: "es6",
  printWidth: 80,
  tabWidth: 2,
  semi: false,
  singleQuote: true,
  tailwindStylesheet: "./app.css",
  tailwindConfig: "./tailwind.config.js",
  plugins: ["prettier-plugin-tailwindcss"],
};

export default config;
