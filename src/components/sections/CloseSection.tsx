import React from 'react';
import { Reveal } from '../ui/Reveal';
import { SectionLabel } from '../ui/SectionLabel';
import { IsoSystemScene } from '../effects/IsoSystemScene';

export const CloseSection: React.FC = () => {
  return (
    <section id="close" className="max-w-shell mx-auto px-6 py-32 md:py-40">
      <Reveal className="text-center">
        <SectionLabel color="aqua" className="mb-7">
          The whole idea, in one line
        </SectionLabel>
        <h2 className="font-display font-extrabold text-[clamp(2rem,5.8vw,4.1rem)] leading-[1] tracking-[-.035em] max-w-4xl mx-auto">
          Make water visible. Everything else follows.
        </h2>
        <p className="mt-9 text-[17px] leading-relaxed text-steel max-w-2xl mx-auto">
          Every problem here — the overflow, the dry tank, the burnt motor, the hidden leak, the filter nobody changed — is a consequence of water being the one thing in the home we cannot see.
        </p>
      </Reveal>

      <IsoSystemScene />

      <Reveal className="mt-24 max-w-3xl mx-auto text-center">
        <blockquote className="font-display text-[clamp(1.2rem,2.6vw,1.7rem)] leading-snug text-mist">
          "Nobody knew how much water was in their tank. That's not carelessness — it's just that nobody has ever been given a way to know."
        </blockquote>
      </Reveal>
      <Reveal className="mt-20 grid md:grid-cols-3 gap-5">
        <div className="panel rounded-2xl p-8 text-center">
          <h3 className="font-display font-semibold text-lg mb-2.5">One system</h3>
          <p className="text-[15px] leading-relaxed text-steel">Tank, pump, quality, leak — monitored together, not in silos.</p>
        </div>
        <div className="panel rounded-2xl p-8 text-center">
          <h3 className="font-display font-semibold text-lg mb-2.5">One view</h3>
          <p className="text-[15px] leading-relaxed text-steel">A single app that answers the only question that matters: is my water okay?</p>
        </div>
        <div className="panel rounded-2xl p-8 text-center">
          <h3 className="font-display font-semibold text-lg mb-2.5">Always working</h3>
          <p className="text-[15px] leading-relaxed text-steel">Whether or not anyone is paying attention. That's the point.</p>
        </div>
      </Reveal>
      <Reveal className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-4">
        <a
          href="#"
          className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-aqua text-ink font-medium hover:bg-mist transition-colors"
        >
          Book a site visit <span className="transition-transform group-hover:translate-x-1">→</span>
        </a>
        <a href="#" className="px-8 py-4 rounded-full border border-white/15 hover:border-aqua/60 hover:text-aqua transition-colors">
          Talk to us about a hostel
        </a>
      </Reveal>
    </section>
  );
};
