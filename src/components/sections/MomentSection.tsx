import React from 'react';
import { Reveal } from '../ui/Reveal';
import { TiltPanel } from '../ui/TiltPanel';
import { SectionLabel } from '../ui/SectionLabel';
import { StreamNode } from '../ui/StreamNode';

export const MomentSection: React.FC = () => {
  return (
    <section id="moment" className="max-w-shell mx-auto px-6 py-28 md:py-36">
      <Reveal className="max-w-2xl">
        <SectionLabel color="saffron">The question nobody can answer</SectionLabel>
        <h2 className="font-display font-bold text-[clamp(1.9rem,4.4vw,3.1rem)] leading-[1.04] tracking-[-.03em]">
          How much water is in your tank right now?
        </h2>
      </Reveal>
      <StreamNode ratio=".14" />
      <div className="mt-14 grid md:grid-cols-3 gap-5">
        <TiltPanel className="rounded-2xl p-8 min-h-[200px]" delay=".05s">
          <span className="font-mono text-[10px] tracking-[.18em] uppercase text-saffron block mb-6">Mid-shower</span>
          <h3 className="font-display font-semibold text-xl leading-snug">The moment you realize the tank is empty.</h3>
        </TiltPanel>
        <TiltPanel className="rounded-2xl p-8 min-h-[200px]" delay=".15s">
          <span className="font-mono text-[10px] tracking-[.18em] uppercase text-saffron block mb-6">Before guests arrived</span>
          <h3 className="font-display font-semibold text-xl leading-snug">The tank ran dry an hour before they showed up.</h3>
        </TiltPanel>
        <TiltPanel className="rounded-2xl p-8 min-h-[200px]" delay=".25s">
          <span className="font-mono text-[10px] tracking-[.18em] uppercase text-saffron block mb-6">Morning of an exam</span>
          <h3 className="font-display font-semibold text-xl leading-snug">No water. No warning. No time.</h3>
        </TiltPanel>
      </div>
      <Reveal className="mt-12 text-[17px] leading-relaxed text-steel max-w-2xl">
        Water is the only utility we still manage by guesswork.
      </Reveal>
    </section>
  );
};
