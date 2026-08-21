import React from 'react';
import { Reveal } from '../ui/Reveal';
import { TiltPanel } from '../ui/TiltPanel';
import { SectionLabel } from '../ui/SectionLabel';
import { StreamNode } from '../ui/StreamNode';

export const GapSection: React.FC = () => {
  return (
    <section id="gap" className="max-w-shell mx-auto px-6 py-28 md:py-36">
      <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
        <Reveal>
          <SectionLabel color="aqua">Why this hasn't been solved</SectionLabel>
          <h2 className="font-display font-bold text-[clamp(1.8rem,4vw,2.8rem)] leading-[1.05] tracking-[-.03em]">
            The market is full of good devices that don't talk to each other.
          </h2>
          <p className="mt-7 text-[16px] leading-relaxed text-steel">
            Four products. Four apps. Four logins. And no single place that answers the only question the household actually has: is my water okay?
          </p>
          <p className="mt-5 text-[16px] leading-relaxed text-steel">
            A second barrier is specific to our context. Most systems were designed for homes where you can drill into a wall and call a plumber-electrician who understands IoT. That describes almost no Indian household — and no rented home or hostel at all.
          </p>
          <p className="mt-7 text-[16px] leading-relaxed text-mist border-l-2 border-aqua pl-5">
            The failure isn't a failure of sensors. It's a failure of integration and a failure of installation.
          </p>
        </Reveal>
        <StreamNode ratio=".16" />
        <Reveal className="grid sm:grid-cols-2 gap-4">
          <TiltPanel className="rounded-xl p-6">
            <span className="font-mono text-[10px] uppercase tracking-[.16em] text-steel/60 block mb-4">App 01</span>
            <h4 className="font-display font-semibold mb-2">A tank sensor</h4>
            <p className="text-sm text-steel leading-relaxed">Its own app, its own login.</p>
          </TiltPanel>
          <TiltPanel className="rounded-xl p-6">
            <span className="font-mono text-[10px] uppercase tracking-[.16em] text-steel/60 block mb-4">App 02</span>
            <h4 className="font-display font-semibold mb-2">A smart geyser</h4>
            <p className="text-sm text-steel leading-relaxed">A second set of alerts. No connection to the first.</p>
          </TiltPanel>
          <TiltPanel className="rounded-xl p-6">
            <span className="font-mono text-[10px] uppercase tracking-[.16em] text-steel/60 block mb-4">App 03</span>
            <h4 className="font-display font-semibold mb-2">An RO unit that beeps</h4>
            <p className="text-sm text-steel leading-relaxed">When it feels like it.</p>
          </TiltPanel>
          <TiltPanel className="rounded-xl p-6">
            <span className="font-mono text-[10px] uppercase tracking-[.16em] text-steel/60 block mb-4">App 04</span>
            <h4 className="font-display font-semibold mb-2">A pump controller</h4>
            <p className="text-sm text-steel leading-relaxed">That's really just a timer.</p>
          </TiltPanel>
        </Reveal>
      </div>
    </section>
  );
};
