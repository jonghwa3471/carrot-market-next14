import type { Metadata } from "next";
import localFont from "next/font/local";
import { Roboto, Rubik_Scribble } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal"],
  variable: "--roboto-text",
});

const rubik = Rubik_Scribble({
  weight: "400",
  style: "normal",
  subsets: ["latin"],
  variable: "--rubik-text",
});

const metallica = localFont({
  src: "./fonts/metallica.ttf",
  variable: "--font-metallica",
  weight: "100 900",
});

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Carrot Market",
    default: "Carrot Market",
  },
  description: "Sell and buy all the things!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${metallica.variable} ${roboto.variable} ${rubik.variable} mx-auto max-w-screen-sm bg-neutral-900 text-white antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
