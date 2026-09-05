import React from "react";
import { useModals } from "../../context/ModalContext";
import { BeeHero } from "./sections/BeeHero";
import { TrustLogos } from "./sections/TrustLogos";
import { ServicesSection } from "./sections/ServicesSection";
import { CaseStudiesSection } from "./sections/CaseStudiesSection";
import { StatsSection } from "./sections/StatsSection";
import { AILabSection } from "./sections/AILabSection";
import { CtaSection } from "./sections/CtaSection";

export const HomePage: React.FC = () => {
  const { openDemo, openDayTimeline } = useModals();

  return (
    <div className="w-full bg-white selection:bg-blue-100 selection:text-[#0282EB] overflow-hidden">
      {/* 1. Editorial Hero Section with 3D Mascot & Platform */}
      <BeeHero onOpenDemoModal={openDemo} onOpenDayTimeline={openDayTimeline} />

      {/* 2. Trusted By Section */}
      <TrustLogos />

      {/* 3. Services Section (4 Cards) */}
      <ServicesSection />

      {/* 4. Case Studies Section (3 Large Realistic Cards) */}
      <CaseStudiesSection />

      {/* 5. High-Impact Horizontal Stats Section */}
      <StatsSection />

      {/* 6. AI Lab / Experimental Architectures Showcase */}
      <AILabSection />

      {/* 7. Call To Action (CTA) Section */}
      <CtaSection onOpenDemoModal={openDemo} />
    </div>
  );
};
export default HomePage;
