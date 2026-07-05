import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";

const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-sora",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nymbl — Automated marketing for busy businesses",
  description:
    "Nymbl builds your videos, posts them everywhere, captures your leads, and handles the busywork across 9,000+ apps—automatically.",
  icons: {
    icon: "/icon.svg",
  },
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en" className={`${sora.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
