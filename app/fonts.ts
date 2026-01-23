// app/fonts.ts
import { Beau_Rivage, Comfortaa } from "next/font/google";

export const comfortaa = Comfortaa({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-comfortaa",
});

export const beauRivage = Beau_Rivage({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-beau-rivage",
});