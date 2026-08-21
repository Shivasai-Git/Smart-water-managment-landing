import React from 'react';
import { Reveal } from '../ui/Reveal';
import { TiltPanel } from '../ui/TiltPanel';
import { SectionLabel } from '../ui/SectionLabel';
import { StreamNode } from '../ui/StreamNode';

export const EdgeSection: React.FC = () => {
  return (
    <section id="edge" className="py-28 md:py-36 border-y border-white/8">
      <div className="max-w-shell mx-auto px-6">
        <Reveal className="max-w-2xl mb-16">
          <SectionLabel color="aqua">Three honest differentiators</SectionLabel>
          <h2 className="font-display font-bold text-[clamp(1.8rem,4.2vw,3rem)] leading-[1.04] tracking-[-.03em]">
            Not a better sensor. A system that finally holds together.
          </h2>
        </Reveal>
        <StreamNode ratio=".12" />
        <div className="grid md:grid-cols-3 gap-5">
          <TiltPanel className="rounded-2xl p-8">
            <h3 className="font-display font-semibold text-xl mb-4">Integration, not accumulation</h3>
            <p className="text-[15px] leading-relaxed text-steel mb-4">
              The value isn't in any single device. It's one system that sees the tank, the pump, the quality and the leak simultaneously — and reasons about them together.
            </p>
            <p className="text-[15px] leading-relaxed text-mist">
              A quality sensor alone tells you the water is hard. A connected system tells you the water is hard, your geyser is scaling, and your filter is three weeks past due.
            </p>
          </TiltPanel>
          <TiltPanel className="rounded-2xl p-8" delay=".1s">
            <h3 className="font-display font-semibold text-xl mb-4">Installation without permission</h3>
            <p className="text-[15px] leading-relaxed text-steel mb-4">
              Designed from the start for buildings that already exist and residents who cannot modify them. No drill, no plumber, no landlord approval.
            </p>
            <p className="text-[15px] leading-relaxed text-mist">This isn't a workaround. It's a core design principle.</p>
          </TiltPanel>
          <TiltPanel className="rounded-2xl p-8" delay=".2s">
            <h3 className="font-display font-semibold text-xl mb-4">Built for local reality</h3>
            <p className="text-[15px] leading-relaxed text-steel mb-4">
              Intermittent supply. Power cuts. Patchy connectivity. Water quality that changes by area and season.
            </p>
            <p className="text-[15px] leading-relaxed text-mist">
              Quality thresholds are referenced to the national drinking water standard — so readings mean something official, not something invented.
            </p>
          </TiltPanel>
        </div>
      </div>
    </section>
  );
};
