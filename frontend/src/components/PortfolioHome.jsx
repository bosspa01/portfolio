"use client";
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import Marquee from "@/components/sections/Marquee";
import AboutSection from "@/components/sections/AboutSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import SkillsSection from "@/components/sections/SkillsSection";
import JourneySection from "@/components/sections/JourneySection";
import ContactSection from "@/components/sections/ContactSection";
import ProjectDialog from "@/components/projects/ProjectDialog";
import { translations } from "@/data/languages";

const PortfolioHome = () => {
  // แค่ 2 state: ภาษาที่เลือก และโปรเจกต์ที่เปิดดู
  const [lang, setLang] = useState("th");
  const [selectedProject, setSelectedProject] = useState(null);
  const t = translations[lang];

  return (
    <div className="site-shell">
      <Navbar lang={lang} setLang={setLang} t={t} />
      <main>
        <HeroSection lang={lang} t={t} />
        <Marquee />
        <AboutSection lang={lang} t={t} />
        <ProjectsSection lang={lang} t={t} onOpenProject={setSelectedProject} />
        <SkillsSection t={t} />
        <JourneySection t={t} />
        <ContactSection lang={lang} t={t} />
      </main>
      <Footer t={t} />
      <ProjectDialog
        project={selectedProject}
        lang={lang}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
};

export default PortfolioHome;
