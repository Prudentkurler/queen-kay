import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { MainLayout } from "@/components/layout/MainLayout";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains-mono",
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
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased font-sans`}
      >
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}
