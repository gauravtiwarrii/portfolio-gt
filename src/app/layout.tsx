import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import ClientLayout from "./ClientLayout";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

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
      <body className={`${inter.variable} ${outfit.variable}`} suppressHydrationWarning>
        <ClientLayout>
          {children}
        </ClientLayout>
        <Analytics />
      </body>
    </html>
  );
}
