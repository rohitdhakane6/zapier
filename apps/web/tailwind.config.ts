import type { Config } from "tailwindcss";
import sharedConfig from "@repo/tailwind-config";

const config: Pick<Config, "content" | "presets" | "theme"> = {
  content: ["./src/**/**/*.{js,ts,jsx,tsx}"],
  presets: [sharedConfig],
  theme: {
    extend: {
      colors: {
        zapierOrange: '#FF4F00',
        earth: '#201515',
        moss: '#1F3121',
        night: '#2B2358',
        lavender: '#C1B7FF',
        cream: '#FFF3E6',
        peach: '#FFBF6E',
        bolt: '#F6FFDB',
        sky: '#CDE4E1',
        almostWhite: '#FFFDF9'
      }
    }
  }
};

export default config;
