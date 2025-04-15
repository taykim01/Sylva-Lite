import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import localFont from "next/font/local";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Sylva Lite",
  description: "Personal Bulletin Board",
};

const pretendard = localFont({
  src: "./fonts/Pretendard.woff2",
  variable: "--font-pretendard",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/yyc5pbu.css" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
        <meta name="apple-mobile-web-app-title" content="Sylva Lite" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/icons/icon-192x192.png" sizes="192x192" />
        <link rel="icon" href="/icons/icon-512x512.png" sizes="512x512" />
        <meta name="theme-color" content="#A1A8B4" />
      </head>
      <body className={pretendard.variable}>
        {children} <Toaster position="bottom-left" />
      </body>
    </html>
  );
}
