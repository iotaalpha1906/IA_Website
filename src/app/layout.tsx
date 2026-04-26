import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { Providers } from "@/components/Providers";
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
  icons: {
    icon: [
      { url: "/branding/APhiA_Crest.png", type: "image/png", sizes: "96x96" },
      { url: "/branding/APhiA_Crest.png", type: "image/png", sizes: "32x32" },
    ],
    apple: [{ url: "/branding/APhiA_Crest.png", type: "image/png", sizes: "180x180" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={montserrat.variable}>
      <body className="min-h-screen font-sans">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
