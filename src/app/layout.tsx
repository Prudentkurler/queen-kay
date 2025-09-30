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
  title: "Queenkay Importation - Import Smarter, Save Bigger",
  description: "Pre-order from China at unbeatable prices or shop in-stock items instantly. Quality products, authentic brands, delivered to your door.",
  keywords: ["import", "china", "wholesale", "pre-order", "electronics", "fashion", "deals"],
  authors: [{ name: "Queenkay Importation" }],
  creator: "Queenkay Importation",
  publisher: "Queenkay Importation",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
