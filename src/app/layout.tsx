import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Abdee Alfarizi | Design & Photography",
  description: "Graphic designer & photographer — brand identity, editorial, dan fotografi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${inter.variable} ${playfair.variable} dark`}>
      <body className="antialiased bg-background text-foreground min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}
