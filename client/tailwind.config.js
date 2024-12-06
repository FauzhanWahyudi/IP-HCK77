/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";
import typography from "@tailwindcss/typography"
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
  plugins: [typography,daisyui],
  daisyui: {
    themes: ["coffee"],
  },
};
