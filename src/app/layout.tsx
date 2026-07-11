import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk, Geist } from "next/font/google";
import "./globals.css";
import ClientLayout from "./ClientLayout";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "GT_OS v3.0 | Gaurav Tiwari — Data & AI Engineer",
  description:
    "An immersive futuristic operating system portfolio built by Gaurav Tiwari. Data Engineer, AI Engineer, and Backend Developer specializing in Kafka, Spark, Snowflake, and Cloud Architecture.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
  ),
  keywords: [
    "Gaurav Tiwari",
    "Data Engineer",
    "AI Engineer",
    "Kafka",
    "Spark",
    "Snowflake",
    "AWS",
    "Python",
    "Portfolio",
  ],
  authors: [{ name: "Gaurav Tiwari" }],
  openGraph: {
    title: "GT_OS v3.0 | Gaurav Tiwari — Data & AI Engineer",
    description:
      "An immersive futuristic operating system portfolio. Data Engineer specializing in Kafka, Spark, Snowflake, and Cloud Architecture.",
    images: ["/api/og?title=GT_OS+v3.0&type=Portfolio"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GT_OS v3.0 | Gaurav Tiwari",
    description:
      "An immersive futuristic operating system portfolio. Data & AI Engineer.",
    images: ["/api/og?title=GT_OS+v3.0&type=Portfolio"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} ${geist.variable}`}
        suppressHydrationWarning
      >
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <ClientLayout>{children}</ClientLayout>
        <Analytics />
      </body>
    </html>
  );
}
