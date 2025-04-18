import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import localFont from "next/font/local";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Sylva Board",
  description: "Personal Bulletin Board",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    title: "Sylva Board",
  },
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
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
        <meta name="apple-mobile-web-app-title" content="Sylva Board" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/icons/icon-192.png" sizes="192x192" />
        <link rel="icon" href="/icons/icon-512.png" sizes="512x512" />
        <meta name="theme-color" content="#A1A8B4" />
        <meta name="application-name" content="Sylva Board" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
      </head>
      <body className={pretendard.variable}>
        {children} <Toaster position="bottom-left" />
      </body>
    </html>
  );
}
