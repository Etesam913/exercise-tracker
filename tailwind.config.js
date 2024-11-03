/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}", "./libs/ui/**/*.{html,ts}"],
  presets: [require("@spartan-ng/ui-core/hlm-tailwind-preset")],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Bricolage Grotesque", "sans-serif"],
      },
    },
  },
  plugins: [],
};
