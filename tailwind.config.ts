import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
      },
      colors: {
        pallete: {
          red: "#FA7070",
          white: "#FEFDED",
          green: "#C6EBC5",
          dark: "#A1C398"
        }
      }
    },
  },
  plugins: [],
} satisfies Config;
