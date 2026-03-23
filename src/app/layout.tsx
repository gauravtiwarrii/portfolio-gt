import type { Metadata } from "next";
import { Inter, Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import ClientLayout from "./ClientLayout";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains-mono" });

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: "Gaurav Tiwari | Data Engineer",
  description: "Engineering Data for the Future",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  openGraph: {
    title: "Gaurav Tiwari | Data Engineer",
    description: "Engineering Data for the Future",
    images: ["/api/og?title=Gaurav Tiwari&type=Portfolio"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gaurav Tiwari | Data Engineer",
    description: "Engineering Data for the Future",
    images: ["/api/og?title=Gaurav Tiwari&type=Portfolio"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${outfit.variable} ${jetbrainsMono.variable} bg-black`} suppressHydrationWarning>
        <div className="fixed inset-0 pointer-events-none bg-tech-grid z-0 mix-blend-screen opacity-20"></div>
        <ClientLayout>
          {children}
        </ClientLayout>
        <Analytics />
      </body>
    </html>
  );
}
