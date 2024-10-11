/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  safelist: [
    {
      pattern: /(from|to)-(blue|green|yellow|red|indigo|purple|pink)-(400|600)/,
    },
  ],
  darkMode: ["class", '[data-theme="dark"]'],
  daisyui: {
    themes: ["light", "dark"],
  },
  plugins: [daisyui],
};
