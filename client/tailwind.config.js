/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";

export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // primary: "#DC851F",
        // secondary: "#FFA737",
        // third: "#7E5920",
        // background: "#343330",
        // text: "#FFFACD",
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: ["coffee"],
  },
};
