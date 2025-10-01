import type { Metadata } from "next";
import "./globals.css";

// Using system fonts instead of Google Fonts to avoid timeout issues
const fontSans = {
  variable: "--font-geist-sans",
  className: "font-sans",
};

const fontMono = {
  variable: "--font-geist-mono", 
  className: "font-mono",
};

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
        className={`${fontSans.variable} ${fontMono.variable} antialiased font-sans`}
      >
        {children}
      </body>
    </html>
  );
}
