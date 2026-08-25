import React from 'react';
import { Reveal } from '../ui/Reveal';
import { TiltPanel } from '../ui/TiltPanel';
import { SectionLabel } from '../ui/SectionLabel';
import { StreamNode } from '../ui/StreamNode';
import { failures } from '../../data/failures';

export const CostSection: React.FC = () => {
  return (
    <section id="cost" className="py-14 md:py-20 border-y border-white/8">
      <div className="max-w-shell mx-auto px-6">
        <Reveal className="max-w-3xl mb-10">
          <SectionLabel color="saffron">The cost of invisibility</SectionLabel>
          <h2 className="font-display font-bold text-[clamp(1.8rem,3.8vw,2.8rem)] leading-[1.05] tracking-[-.03em]">
            Water is the only utility we still manage by guesswork.
          </h2>
          <p className="mt-4 text-[16px] leading-relaxed text-steel">
            Electricity has a meter. Gas has a gauge. Water has a person climbing to the terrace with a torch — or a motor that runs until someone notices the overflow.
          </p>
        </Reveal>

        {/* Relatable Moment Callouts */}
        <Reveal className="grid sm:grid-cols-3 gap-3 mb-8">
          <div className="rounded-xl p-4 bg-white/[0.03] border border-white/8">
            <span className="font-mono text-[10px] tracking-[.18em] uppercase text-saffron block mb-1">Mid-Shower</span>
            <p className="text-sm text-mist font-medium">The moment you realize the tank is completely empty.</p>
          </div>
          <div className="rounded-xl p-4 bg-white/[0.03] border border-white/8">
            <span className="font-mono text-[10px] tracking-[.18em] uppercase text-saffron block mb-1">Guests Arriving</span>
            <p className="text-sm text-mist font-medium">The tank ran dry an hour before they showed up.</p>
          </div>
          <div className="rounded-xl p-4 bg-white/[0.03] border border-white/8">
            <span className="font-mono text-[10px] tracking-[.18em] uppercase text-saffron block mb-1">Exam Morning</span>
            <p className="text-sm text-mist font-medium">No water. No warning. No time to wait for a fill.</p>
          </div>
        </Reveal>

        <StreamNode ratio=".88" />

        <div id="failures" className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {failures.map((item, i) => (
            <TiltPanel key={i} className="rounded-xl p-6 flex flex-col min-h-[190px]" delay={`${i * 0.05}s`}>
              <span className="font-mono text-[10px] tracking-[.18em] uppercase text-saffron mb-3">{item.tag}</span>
              <h3 className="font-display font-semibold text-lg leading-snug mb-2">{item.title}</h3>
              <p className="text-[14px] leading-relaxed text-steel">{item.body}</p>
            </TiltPanel>
          ))}
        </div>

        <Reveal className="mt-8 text-[15px] leading-relaxed text-steel max-w-3xl border-l-2 border-saffron/60 pl-4">
          None of these is a catastrophe. Each one is a small, repeated, preventable loss. Multiply small by daily across millions of homes — and you get the actual scale of the problem.
        </Reveal>
      </div>
    </section>
  );
};

