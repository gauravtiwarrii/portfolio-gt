"use client";

import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import ScrollProgress from "@/components/layout/ScrollProgress";
import SystemHud from "@/components/layout/SystemHud";

/* Interaction extras are desktop-nice-to-haves, not required for reading
   the page — so they load after hydration and never block first paint. */
const CommandPalette = dynamic(() => import("@/components/layout/CommandPalette"), { ssr: false });
const Cursor = dynamic(() => import("@/components/layout/Cursor"), { ssr: false });

export default function ClientLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();

  /* The admin CMS keeps its own chrome. */
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) return <>{children}</>;

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>

      <ScrollProgress />
      <SystemHud />
      <Nav />

      <main id="main">{children}</main>

      <Footer />

      <CommandPalette />
      <Cursor />
    </>
  );
}
