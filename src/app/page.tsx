import Hero from "@/components/sections/Hero";
import SelectedWork from "@/components/sections/SelectedWork";
import DataPipeline from "@/components/sections/DataPipeline";
import Philosophy from "@/components/sections/Philosophy";
import SkillGalaxy from "@/components/sections/SkillGalaxy";
import About from "@/components/sections/About";
import Timeline from "@/components/sections/Timeline";
import GitHubSection from "@/components/sections/GitHubSection";
import ResumeCTA from "@/components/sections/ResumeCTA";
import ContactConsole from "@/components/sections/ContactConsole";

/* ───────────────────────────────────────────────────────────────
   Homepage

   Read top to bottom it argues one case: here is the work, here is
   how the systems are shaped, here is the method, here is the
   toolchain, here is the person, here is the record, here is the
   source. The résumé band sits last because by then there's a
   reason to want it.

   Static imports throughout. Only three of these ship JavaScript —
   the technology field, the GitHub reader and the contact form —
   and each is its own client boundary, so the route's initial
   payload stays small without hand-managed dynamic() wrappers.
   ─────────────────────────────────────────────────────────────── */

export default function Home() {
  return (
    <>
      <Hero />
      <SelectedWork />
      <DataPipeline />
      <Philosophy />
      <SkillGalaxy />
      <About />
      <Timeline />
      <GitHubSection />
      <ResumeCTA />
      <ContactConsole />
    </>
  );
}
