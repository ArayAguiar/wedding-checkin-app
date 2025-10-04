// src/fonts/fonts.ts
import { Cinzel, Cinzel_Decorative as CinzelDecorative } from "next/font/google";

export const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const cinzelDecorative = CinzelDecorative({
  subsets: ["latin"],
  weight: ["400", "700"],
});
