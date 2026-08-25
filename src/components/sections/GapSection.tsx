import React from 'react';
import { Reveal } from '../ui/Reveal';
import { TiltPanel } from '../ui/TiltPanel';
import { SectionLabel } from '../ui/SectionLabel';
import { StreamNode } from '../ui/StreamNode';

export const GapSection: React.FC = () => {
  return (
    <section id="gap" className="max-w-shell mx-auto px-6 py-14 md:py-20">
      <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
        <Reveal>
          <SectionLabel color="aqua">The integration gap</SectionLabel>
          <h2 className="font-display font-bold text-[clamp(1.7rem,3.6vw,2.5rem)] leading-[1.05] tracking-[-.03em]">
            Good devices that don't talk to each other.
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-steel">
            Four separate products. Four apps. Four logins. And no single place that answers the only question that matters: <strong className="text-mist">is my water okay?</strong>
          </p>
          <p className="mt-3 text-[15px] leading-relaxed text-steel">
            Most legacy systems also require invasive wall drilling and complex plumbing changes — impossible for rented flats, hostels, and existing homes.
          </p>
          <div className="mt-5 p-3.5 rounded-lg bg-aqua/5 border border-aqua/20">
            <p className="text-sm text-mist leading-snug">
              The failure isn't a lack of sensors. It's a failure of <span className="text-aqua font-medium">integration</span> and <span className="text-aqua font-medium">installation friction</span>.
            </p>
          </div>
        </Reveal>

        <StreamNode ratio=".16" />

        <Reveal className="grid sm:grid-cols-2 gap-3">
          <TiltPanel className="rounded-xl p-5">
            <span className="font-mono text-[10px] uppercase tracking-[.16em] text-steel/60 block mb-2">App 01</span>
            <h4 className="font-display font-semibold text-base mb-1">Tank sensor</h4>
            <p className="text-xs text-steel leading-relaxed">Its own app and login. Siloed data.</p>
          </TiltPanel>
          <TiltPanel className="rounded-xl p-5">
            <span className="font-mono text-[10px] uppercase tracking-[.16em] text-steel/60 block mb-2">App 02</span>
            <h4 className="font-display font-semibold text-base mb-1">Smart geyser</h4>
            <p className="text-xs text-steel leading-relaxed">Separate alerts, unaware of tank level.</p>
          </TiltPanel>
          <TiltPanel className="rounded-xl p-5">
            <span className="font-mono text-[10px] uppercase tracking-[.16em] text-steel/60 block mb-2">App 03</span>
            <h4 className="font-display font-semibold text-base mb-1">RO purifier</h4>
            <p className="text-xs text-steel leading-relaxed">Beeps unexpectedly when filters clog.</p>
          </TiltPanel>
          <TiltPanel className="rounded-xl p-5">
            <span className="font-mono text-[10px] uppercase tracking-[.16em] text-steel/60 block mb-2">App 04</span>
            <h4 className="font-display font-semibold text-base mb-1">Pump switch</h4>
            <p className="text-xs text-steel leading-relaxed">A dumb timer with no dry-run sensing.</p>
          </TiltPanel>
        </Reveal>
      </div>
    </section>
  );
};

