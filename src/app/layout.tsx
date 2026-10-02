import type { Metadata } from "next";
import { Geist, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import ClientLayout from "./ClientLayout";
import { Analytics } from "@vercel/analytics/react";
import { SITE } from "@/data/site";

/* Two families, deliberately: Geist carries display and body, JetBrains Mono
   carries technical metadata. Dropped Inter and Space Grotesk — four font
   families was payload without hierarchy. */
const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#08090b",
};

const title = "Gaurav Tiwari — Software Engineer, Data Engineer, AI Systems";
const description =
  "I build production-grade software, data systems and AI-powered products. Full-stack applications, data platforms, distributed systems and AI workflows engineered end-to-end.";

export const metadata: Metadata = {
  title: {
    default: title,
    template: "%s — Gaurav Tiwari",
  },
  description,
  metadataBase: new URL(SITE.url),
  alternates: {
    canonical: "/",
  },
  keywords: [
    "Gaurav Tiwari",
    "Software Engineer",
    "Data Engineer",
    "AI Engineer",
    "Next.js Developer",
    "Python Developer",
    "Data Engineering",
    "Distributed Systems",
    "AI Systems",
    "TypeScript",
    "PostgreSQL",
    "Kafka",
    "Spark",
    "Airflow",
  ],
  authors: [{ name: "Gaurav Tiwari", url: SITE.url }],
  creator: "Gaurav Tiwari",
  openGraph: {
    title,
    description,
    url: SITE.url,
    siteName: "Gaurav Tiwari",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/api/og",
        width: 1200,
        height: 630,
        alt: "Gaurav Tiwari — Software Engineer, Data Engineer, AI Systems",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/api/og"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

/* Structured data. Only facts that appear in the CV. */
const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Gaurav Tiwari",
  url: SITE.url,
  jobTitle: "Software Engineer, Data Engineer",
  description,
  email: `mailto:${SITE.email}`,
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Lovely Professional University",
  },
  knowsAbout: [
    "Software Engineering",
    "Data Engineering",
    "Distributed Systems",
    "AI Systems",
    "TypeScript",
    "Python",
    "SQL",
  ],
  sameAs: [SITE.github, SITE.linkedin],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geist.variable} ${mono.variable}`}>
        <ClientLayout>{children}</ClientLayout>
        <Analytics />
        <script
          type="application/ld+json"
          // Static, locally-authored object — no user input reaches this.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </body>
    </html>
  );
}
