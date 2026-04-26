import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Iota Alpha Chapter | Alpha Phi Alpha Fraternity, Inc.",
  description:
    "Iota Alpha Chapter at George Mason University — developing leaders, building legacy, and serving the community.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={montserrat.variable}>
      <body className="min-h-screen font-sans">{children}</body>
    </html>
  );
}
