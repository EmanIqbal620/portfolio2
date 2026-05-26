import { Navbar } from '@/components/ui/Navbar';
import { HeroSection } from '@/components/hero/HeroSection';
import { WhatIBuildSection } from '@/components/what-i-build/WhatIBuildSection';
import { AboutSection } from '@/components/about/AboutSection';
import { WorkSection } from '@/components/work/WorkSection';
import { TechStackSection } from '@/components/tech-stack/TechStackSection';
import { ContactSection } from '@/components/contact/ContactSection';
import { CustomCursor } from '@/components/cursor/CustomCursor';
import { LoadingScreen } from '@/components/ui/LoadingScreen';
import { Footer } from '@/components/ui/Footer';

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <LoadingScreen />
      <CustomCursor />

      {/* Content */}
      <div className="relative z-10">
        <Navbar />

        <HeroSection />

        <WhatIBuildSection />

        <WorkSection />
        <AboutSection />
        <TechStackSection />
        <ContactSection />

        <Footer />
      </div>
    </main>
  );
}
