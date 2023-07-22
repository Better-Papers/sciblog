module.exports = {
  plugins: [require("prettier-plugin-tailwindcss"), require("prettier-plugin-svelte")],
  tailwindConfig: "tailwind.config.cjs",

  printWidth: 150,
  useTabs: false,
  htmlWhitespaceSensitivity: "ignore",
};
