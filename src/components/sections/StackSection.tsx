import React from 'react';
import { Reveal } from '../ui/Reveal';
import { SectionLabel } from '../ui/SectionLabel';
import { StreamNode } from '../ui/StreamNode';

export const StackSection: React.FC = () => {
  return (
    <section id="stack" className="max-w-shell mx-auto px-6 py-28 md:py-36">
      <Reveal className="max-w-2xl mb-14">
        <SectionLabel color="aqua">Proven components. Nothing exotic.</SectionLabel>
        <h2 className="font-display font-bold text-[clamp(1.8rem,4.2vw,2.9rem)] leading-[1.04] tracking-[-.03em]">
          The innovation is in the integration — not in inventing new hardware.
        </h2>
      </Reveal>
      <StreamNode ratio=".89" />
      <div className="grid sm:grid-cols-2 gap-px bg-white/8 rounded-2xl overflow-hidden border border-white/8">
        <Reveal className="bg-ink p-8">
          <span className="font-mono text-[10px] tracking-[.18em] uppercase text-steel/60 block mb-5">Sensor nodes</span>
          <p className="text-[15px] leading-relaxed text-steel">
            Standard microcontroller platforms — the same class of hardware behind most commercial IoT products today. Proven, affordable, repairable.
          </p>
        </Reveal>
        <Reveal className="bg-ink p-8" delay=".08s">
          <span className="font-mono text-[10px] tracking-[.18em] uppercase text-steel/60 block mb-5">Communication</span>
          <p className="text-[15px] leading-relaxed text-steel">
            Short-range wireless inside a building. Long-range radio where the tank is distant. Cellular where nothing else is available. The right protocol for the distance.
          </p>
        </Reveal>
        <Reveal className="bg-ink p-8" delay=".16s">
          <span className="font-mono text-[10px] tracking-[.18em] uppercase text-steel/60 block mb-5">Sensors</span>
          <p className="text-[15px] leading-relaxed text-steel">
            Ultrasonic for tank level. Standard probes for temperature, dissolved solids, acidity and clarity. Off-the-shelf and tested at scale.
          </p>
        </Reveal>
        <Reveal className="bg-ink p-8" delay=".24s">
          <span className="font-mono text-[10px] tracking-[.18em] uppercase text-steel/60 block mb-5">Local hub & backend</span>
          <p className="text-[15px] leading-relaxed text-steel">
            A small single-board computer for local processing. A time-series database in the cloud — built for exactly what water data is: a continuous stream of measurements over time.
          </p>
        </Reveal>
      </div>
      <Reveal className="mt-10 text-[16px] leading-relaxed text-mist max-w-3xl">
        There is no unproven component in this stack. That is deliberate — it makes Smart Water Flow buildable, repairable and affordable at the scale we need to reach.
      </Reveal>
    </section>
  );
};
