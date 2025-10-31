import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ConditionalLayout } from "@/components/layout/ConditionalLayout";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Queenkay Importation - Premium Tech & Fashion",
  description: "Experience the future of online shopping with Queenkay. Pre-order exclusive items from China or shop our in-stock collection of high-end electronics and fashion.",
  keywords: ["premium electronics", "luxury fashion", "pre-order China", "exclusive tech", "Queenkay"],
  authors: [{ name: "Queenkay Importation" }],
  creator: "Queenkay Importation",
  publisher: "Queenkay Importation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-white font-sans antialiased",
          inter.variable
        )}
      >
        <ConditionalLayout>{children}</ConditionalLayout>
      </body>
    </html>
  );
}
