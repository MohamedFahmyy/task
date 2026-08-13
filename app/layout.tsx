import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mohamed Fahmy | AI & Full-Stack Developer Portfolio",
  description: "Professional portfolio of Mohamed Fahmy, an AI, Cloud, and Full-Stack Developer specializing in React, Next.js, Laravel, AWS, Docker, and Gemini API integration.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`} data-theme="dark">
      <body>{children}</body>
    </html>
  );
}

