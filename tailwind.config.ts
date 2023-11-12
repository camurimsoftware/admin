import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        primary: "#36749D",
        secondary: "#333F48",
        neutral: "#F8F3EA",
      },
      fontFamily: {
        montserrat: ['var(--font-montserrat)', ...fontFamily.sans],
        quick: ['var(--font-quick)', ...fontFamily.sans],
      },
    },
  },
  plugins: [],
} satisfies Config;
