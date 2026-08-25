import React from 'react';
import { IndustrialBackground } from './components/effects/IndustrialBackground';
import { WaterStream } from './components/effects/WaterStream';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { useRevealObserver } from './hooks/useRevealObserver';

import { HeroSection } from './components/sections/HeroSection';
import { ProblemSection } from './components/sections/ProblemSection';
import { HowItWorksSection } from './components/sections/HowItWorksSection';
import { CapabilitiesSection } from './components/sections/CapabilitiesSection';
import { ConnectedDashboardSection } from './components/sections/ConnectedDashboardSection';
import { AudienceSection } from './components/sections/AudienceSection';
import { CloseSection } from './components/sections/CloseSection';

export const App: React.FC = () => {
  useRevealObserver();

  return (
    <div className="font-body text-mist min-h-screen bg-[#031014] relative selection:bg-aqua selection:text-ink">
      {/* Engineered Dark Industrial Blueprint Background */}
      <IndustrialBackground />

      {/* Full-Page Animated Water Flow Infrastructure Stream */}
      <WaterStream />

      {/* Global Navigation Header */}
      <Header />

      {/* 7 Structured Product Sections */}
      <main className="relative z-10">
        <HeroSection />
        <ProblemSection />
        <HowItWorksSection />
        <CapabilitiesSection />
        <ConnectedDashboardSection />
        <AudienceSection />
        <CloseSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default App;
