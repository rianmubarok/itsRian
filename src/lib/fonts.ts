import {
  DM_Sans,
  Playfair_Display,
  Sacramento,
  Manrope,
  Noto_Serif_Display,
  Onest,
} from "next/font/google";

export const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
});

export const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-playfair",
});

export const sacramento = Sacramento({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  variable: "--font-sacramento",
});

export const manrope = Manrope({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-manrope",
});

export const notoSerifDisplay = Noto_Serif_Display({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-noto-serif-display",
});

export const onest = Onest({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-onest",
});
