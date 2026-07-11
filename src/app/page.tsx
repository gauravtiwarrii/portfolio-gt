import dynamic from "next/dynamic";
import HeroSection from "@/components/HeroSection";

// Dynamic imports for code splitting — heavy sections load lazily
const AboutSection = dynamic(() => import("@/components/AboutSection"));
const DataPipeline = dynamic(() => import("@/components/sections/DataPipeline"));
const ProjectsGrid = dynamic(() => import("@/components/sections/ProjectsGrid"));
const SkillGalaxy = dynamic(() => import("@/components/sections/SkillGalaxy"));
const GitHubSection = dynamic(() => import("@/components/sections/GitHubSection"));
const Timeline = dynamic(() => import("@/components/sections/Timeline"));
const CertificatesSection = dynamic(() => import("@/components/sections/CertificatesSection"));
const ContactConsole = dynamic(() => import("@/components/sections/ContactConsole"));

export default function Home() {
  return (
    <main>
      <HeroSection />
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
        <AboutSection />
        <DataPipeline />
        <ProjectsGrid />
        <SkillGalaxy />
        <GitHubSection />
        <Timeline />
        <CertificatesSection />
        <ContactConsole />
      </div>
    </main>
  );
}
