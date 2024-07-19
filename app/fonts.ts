import { Montserrat } from "next/font/google";
import localFont from "next/font/local";
export const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-mont",
});

export const tradeGothic = localFont({
  src: [
    {
      path: "./fonts/Trade-Gothic-LT-Bold.ttf",
      weight: "700" /* Bold */,
      style: "normal",
    },
    {
      path: "./fonts/Trade-Gothic-LT-Light.ttf",
      weight: "400" /* Light */,
      style: "normal",
    },
    {
      path: "./fonts/Trade-Gothic-LT.ttf",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-gothic",
});

export const tradeGothicExtended = localFont({
  src: [
    {
      path: "./fonts/TradeGothic LT Extended Bold.ttf",
      weight: "700" /* Bold */,
      style: "normal",
    },
  ],
  variable: "--font-gothic-extended",
});
// export const gothic = Gothic_A1({
//     subsets: ["latin"],

// })
