import type { Metadata } from "next";
import { Poppins } from "next/font/google";

import "./globals.css";

import { Toaster } from "@/components/ui/sonner";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "400", "600", "800"]
});

export const metadata: Metadata = {
  title: "DevSync",
  description: "Coomunity Agency website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    
    <html lang="en">
      <body
        className={`${poppins.className} antialiased`}
      >
        <Toaster dir="ltr" position="bottom-right"/>
        {children}
      </body>
    </html>
  );
}
