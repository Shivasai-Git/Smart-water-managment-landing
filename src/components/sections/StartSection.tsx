import React from 'react';
import { Reveal } from '../ui/Reveal';
import { TiltPanel } from '../ui/TiltPanel';
import { SectionLabel } from '../ui/SectionLabel';
import { StreamNode } from '../ui/StreamNode';

export const StartSection: React.FC = () => {
  return (
    <section id="start" className="max-w-shell mx-auto px-6 py-14 md:py-20">
      <Reveal className="max-w-3xl mb-8">
        <SectionLabel color="aqua">Target Market Focus</SectionLabel>
        <h2 className="font-display font-bold text-[clamp(1.8rem,3.8vw,2.8rem)] leading-[1.05] tracking-[-.03em]">
          Starting where water failure has a real dollar cost.
        </h2>
        <p className="mt-3 text-[15px] leading-relaxed text-steel">
          Individual households are the long-term volume; student hostels, PGs, and shared residential buildings are the immediate high-pain entry market.
        </p>
      </Reveal>
      <StreamNode ratio=".87" />
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <TiltPanel className="rounded-xl p-5">
          <span className="font-mono text-[10px] text-aqua block mb-2">01 · Higher Impact</span>
          <h3 className="font-display font-semibold text-base mb-1.5">Amplified Pain</h3>
          <p className="text-xs leading-relaxed text-steel">
            50+ residents affected per dry tank or overflow — creating immediate escalation and urgency.
          </p>
        </TiltPanel>
        <TiltPanel className="rounded-xl p-5" delay=".06s">
          <span className="font-mono text-[10px] text-aqua block mb-2">02 · Quantifiable Loss</span>
          <h3 className="font-display font-semibold text-base mb-1.5">Measurable Cost</h3>
          <p className="text-xs leading-relaxed text-steel">
            Emergency water tankers, motor rewindings, and damaged building plaster add up every semester.
          </p>
        </TiltPanel>
        <TiltPanel className="rounded-xl p-5" delay=".12s">
          <span className="font-mono text-[10px] text-aqua block mb-2">03 · Single Buyer</span>
          <h3 className="font-display font-semibold text-base mb-1.5">One Decision-Maker</h3>
          <p className="text-xs leading-relaxed text-steel">
            A single warden or property manager approves installation for the entire building.
          </p>
        </TiltPanel>
        <TiltPanel className="rounded-xl p-5" delay=".18s">
          <span className="font-mono text-[10px] text-aqua block mb-2">04 · Existing Budget</span>
          <h3 className="font-display font-semibold text-base mb-1.5">Active Maintenance</h3>
          <p className="text-xs leading-relaxed text-steel">
            Already spending money on recurring plumbing repairs — this replaces reactive chaos with automation.
          </p>
        </TiltPanel>
      </div>
      <Reveal className="panel rounded-xl p-6 bg-saffron/[0.03] border-saffron/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="font-mono text-[10px] tracking-[.18em] uppercase text-saffron block mb-1">Commercial Validation</span>
          <p className="font-display font-semibold text-lg text-mist">
            Targeting operators who already spend on water repairs — not convincing people that water matters.
          </p>
        </div>
      </Reveal>
    </section>
  );
};

