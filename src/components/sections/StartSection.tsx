import React from 'react';
import { Reveal } from '../ui/Reveal';
import { TiltPanel } from '../ui/TiltPanel';
import { SectionLabel } from '../ui/SectionLabel';
import { StreamNode } from '../ui/StreamNode';

export const StartSection: React.FC = () => {
  return (
    <section id="start" className="max-w-shell mx-auto px-6 py-28 md:py-36">
      <Reveal className="max-w-2xl mb-14">
        <SectionLabel color="aqua">Where the pain is sharpest</SectionLabel>
        <h2 className="font-display font-bold text-[clamp(1.8rem,4.2vw,3rem)] leading-[1.04] tracking-[-.03em]">
          Start where the buyer is one person.
        </h2>
        <p className="mt-6 text-[17px] leading-relaxed text-steel">
          We could say "every household in India" — technically true, completely useless as a plan. Here is the sharper answer.
        </p>
      </Reveal>
      <StreamNode ratio=".87" />
      <div className="grid md:grid-cols-2 gap-5 mb-14">
        <TiltPanel className="rounded-2xl p-8">
          <span className="font-mono text-[11px] text-aqua block mb-5">01</span>
          <h3 className="font-display font-semibold text-lg mb-2.5">The pain is bigger</h3>
          <p className="text-[15px] leading-relaxed text-steel">
            More people, more taps, more devices — more failures per week, and more people affected by each one.
          </p>
        </TiltPanel>
        <TiltPanel className="rounded-2xl p-8" delay=".08s">
          <span className="font-mono text-[11px] text-aqua block mb-5">02</span>
          <h3 className="font-display font-semibold text-lg mb-2.5">The cost of failure is measurable</h3>
          <p className="text-[15px] leading-relaxed text-steel">
            A dry tank at home is an inconvenience. In a hostel, it's fifty complaints and a warden's entire morning.
          </p>
        </TiltPanel>
        <TiltPanel className="rounded-2xl p-8" delay=".16s">
          <span className="font-mono text-[11px] text-aqua block mb-5">03</span>
          <h3 className="font-display font-semibold text-lg mb-2.5">One decision-maker</h3>
          <p className="text-[15px] leading-relaxed text-steel">
            A warden or operator can approve a purchase for an entire building. In individual homes, you sell one unit at a time.
          </p>
        </TiltPanel>
        <TiltPanel className="rounded-2xl p-8" delay=".24s">
          <span className="font-mono text-[11px] text-aqua block mb-5">04</span>
          <h3 className="font-display font-semibold text-lg mb-2.5">They're already spending</h3>
          <p className="text-[15px] leading-relaxed text-steel">
            On repairs, tanker water, manual monitoring, burnt motors. This isn't a new expense — it's a better one.
          </p>
        </TiltPanel>
      </div>
      <Reveal className="panel rounded-2xl p-8 md:p-11">
        <p className="font-mono text-[10px] tracking-[.18em] uppercase text-saffron mb-6">The real test</p>
        <p className="font-display font-semibold text-[clamp(1.25rem,2.6vw,1.75rem)] leading-snug max-w-3xl">
          We are not looking for people who agree water management is a problem. We are looking for people who have already spent money on it.
        </p>
        <p className="mt-5 text-[15px] text-steel">That's proof the problem is real and urgent — not just relatable.</p>
      </Reveal>
    </section>
  );
};
