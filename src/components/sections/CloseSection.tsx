import React from 'react';
import { Reveal } from '../ui/Reveal';
import { SectionLabel } from '../ui/SectionLabel';
import { IsoSystemScene } from '../effects/IsoSystemScene';

export const CloseSection: React.FC = () => {
  return (
    <section id="close" className="max-w-shell mx-auto px-6 py-14 md:py-24">
      <Reveal className="text-center mb-8">
        <SectionLabel color="aqua" className="mb-4">
          The core thesis
        </SectionLabel>
        <h2 className="font-display font-extrabold text-[clamp(1.9rem,4.5vw,3.2rem)] leading-[1.05] tracking-[-.035em] max-w-3xl mx-auto">
          Make water visible. Everything else follows.
        </h2>
        <p className="mt-4 text-[15px] leading-relaxed text-steel max-w-xl mx-auto">
          Overflows, dry tanks, burnt motors, and hidden leaks are symptoms of managing water in the dark.
        </p>
      </Reveal>

      <IsoSystemScene />

      <Reveal className="mt-10 grid sm:grid-cols-3 gap-3">
        <div className="panel rounded-xl p-5 text-center">
          <h3 className="font-display font-semibold text-base mb-1 text-mist">One System</h3>
          <p className="text-xs leading-relaxed text-steel">Tank, pump, quality, leak — monitored together, not in silos.</p>
        </div>
        <div className="panel rounded-xl p-5 text-center">
          <h3 className="font-display font-semibold text-base mb-1 text-mist">One View</h3>
          <p className="text-xs leading-relaxed text-steel">Single mobile app answering the key question: is my water okay?</p>
        </div>
        <div className="panel rounded-xl p-5 text-center">
          <h3 className="font-display font-semibold text-base mb-1 text-mist">Autonomous Guard</h3>
          <p className="text-xs leading-relaxed text-steel">Safeguards motors and tanks without requiring human memory.</p>
        </div>
      </Reveal>

      <Reveal className="mt-10 flex flex-wrap items-center justify-center gap-3">
        <a
          href="#top"
          className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-aqua text-ink font-medium text-sm hover:bg-mist transition-colors"
        >
          Explore Prototype Specs <span className="transition-transform group-hover:-translate-y-0.5">↑</span>
        </a>
        <a href="#tracks" className="px-6 py-3 rounded-full border border-white/15 text-mist text-sm hover:border-aqua/60 hover:text-aqua transition-colors">
          View Retrofit Track
        </a>
      </Reveal>
    </section>
  );
};

