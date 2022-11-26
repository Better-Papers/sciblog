/** @type {import('tailwindcss').Config} */
const config = {
  mode: "jit",
  content: ["./src/**/*.{html,js,svelte,ts}"],
  plugins: [require("@tailwindcss/typography"), require("@tailwindcss/forms")],
  theme: {
    extend: {
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme("colors.gray.900"),
          },
        },
      }),
    },
  },
};

module.exports = config;
