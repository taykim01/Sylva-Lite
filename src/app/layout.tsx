import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "Sylva Lite",
  description: "Personal Bulletin Board",
};

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
      <body>
        {children} <Toaster />
      </body>
    </html>
  );
}
