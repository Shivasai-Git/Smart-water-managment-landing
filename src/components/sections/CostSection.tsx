import React from 'react';
import { Reveal } from '../ui/Reveal';
import { TiltPanel } from '../ui/TiltPanel';
import { SectionLabel } from '../ui/SectionLabel';
import { StreamNode } from '../ui/StreamNode';
import { failures } from '../../data/failures';

export const CostSection: React.FC = () => {
  return (
    <section id="cost" className="py-28 md:py-36 border-y border-white/8">
      <div className="max-w-shell mx-auto px-6">
        <Reveal className="max-w-2xl mb-16">
          <SectionLabel color="saffron">Not scarce. Unmanaged.</SectionLabel>
          <h2 className="font-display font-bold text-[clamp(1.9rem,4.4vw,3.1rem)] leading-[1.04] tracking-[-.03em]">
            The problem isn't availability. It's invisibility.
          </h2>
          <p className="mt-6 text-[17px] leading-relaxed text-steel">And invisible has a very real cost.</p>
        </Reveal>
        <StreamNode ratio=".88" />
        <div id="failures" className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {failures.map((item, i) => (
            <TiltPanel key={i} className="rounded-2xl p-8 flex flex-col min-h-[250px]" delay={`${i * 0.07}s`}>
              <span className="font-mono text-[10px] tracking-[.18em] uppercase text-saffron mb-6">{item.tag}</span>
              <h3 className="font-display font-semibold text-xl leading-snug mb-3">{item.title}</h3>
              <p className="text-[15px] leading-relaxed text-steel">{item.body}</p>
            </TiltPanel>
          ))}
        </div>
        <Reveal className="mt-14 text-[17px] leading-relaxed text-steel max-w-3xl">
          None of these is a catastrophe. Each one is a small, repeated, entirely preventable loss. Multiply small by daily by millions of homes — and you get the actual scale of the problem.
        </Reveal>
      </div>
    </section>
  );
};
