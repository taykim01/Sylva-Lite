import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import localFont from "next/font/local";
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
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/yyc5pbu.css" />
      </head>
      <body className={pretendard.variable}>
        {children} <Toaster position="bottom-left" />
      </body>
    </html>
  );
}
