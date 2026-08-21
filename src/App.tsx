import React from 'react';
import { OceanBackground } from './components/effects/OceanBackground';
import { WaterStream } from './components/effects/WaterStream';
import { WaveSeparator } from './components/effects/WaveSeparator';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { useRevealObserver } from './hooks/useRevealObserver';

import { HeroSection } from './components/sections/HeroSection';
import { TickerSection } from './components/sections/TickerSection';
import { MomentSection } from './components/sections/MomentSection';
import { CostSection } from './components/sections/CostSection';
import { GapSection } from './components/sections/GapSection';
import { SystemSection } from './components/sections/SystemSection';
import { LoopSection } from './components/sections/LoopSection';
import { TracksSection } from './components/sections/TracksSection';
import { StartSection } from './components/sections/StartSection';
import { EdgeSection } from './components/sections/EdgeSection';
import { StackSection } from './components/sections/StackSection';
import { RoadmapSection } from './components/sections/RoadmapSection';
import { CloseSection } from './components/sections/CloseSection';

export const App: React.FC = () => {
  useRevealObserver();

  return (
    <div className="font-body text-mist min-h-screen bg-ink">
      <OceanBackground />
      <WaterStream />
      <Header />
      <main>
        <HeroSection />
        <TickerSection />
        <MomentSection />
        <WaveSeparator />
        <CostSection />
        <WaveSeparator />
        <GapSection />
        <WaveSeparator />
        <SystemSection />
        <WaveSeparator />
        <LoopSection />
        <WaveSeparator />
        <TracksSection />
        <WaveSeparator />
        <StartSection />
        <WaveSeparator />
        <EdgeSection />
        <StackSection />
        <WaveSeparator />
        <RoadmapSection />
        <WaveSeparator />
        <CloseSection />
      </main>
      <Footer />
    </div>
  );
};

export default App;
