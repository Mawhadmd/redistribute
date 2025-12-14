import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Redistribute.io - Content Distribution Platform",
  description: "Distribute your content everywhere, all at once",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`!${montserrat.variable} font-montserrat antialiased text-secondary flex flex-col min-h-screen bg-primary`}
      >
        {children}
      </body>
    </html>
  );
}
