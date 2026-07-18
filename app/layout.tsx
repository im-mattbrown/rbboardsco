import type { Metadata } from "next";
import { Crimson_Text, Montserrat, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Headings (serif) — Figma uses "Crimson Text"
const crimson = Crimson_Text({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

// Body — substitute for "Avenir Next" (not open-licensed)
const montserrat = Montserrat({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

// Nav + small UI labels — Figma uses "Inter"
const inter = Inter({
  variable: "--font-nav",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "Rb Boards Co — Hand Crafted Cutting Boards",
  description:
    "Hand crafted, one-of-a-kind wooden cutting boards. Made in Newcastle, CA.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${crimson.variable} ${montserrat.variable} ${inter.variable}`}
    >
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
