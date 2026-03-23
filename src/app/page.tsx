import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import Projects from "@/components/Projects";
import SkillsCategory from "@/components/SkillsCategory";
import ContactSection from "@/components/ContactSection";

export default function Home() {
    return (
        <main>
            <HeroSection />
            <AboutSection />
            <ServicesSection />
            <Projects />
            <SkillsCategory />
            <ContactSection />
        </main>
    );
}
