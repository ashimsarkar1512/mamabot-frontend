// app/fonts.ts
import { Comfortaa } from "next/font/google";

export const comfortaa = Comfortaa({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-comfortaa",
});
