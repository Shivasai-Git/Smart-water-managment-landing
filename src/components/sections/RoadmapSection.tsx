import React from 'react';
import { Reveal } from '../ui/Reveal';
import { SectionLabel } from '../ui/SectionLabel';
import { StreamNode } from '../ui/StreamNode';
import { doneItems } from '../../data/doneItems';

export const RoadmapSection: React.FC = () => {
  return (
    <section id="roadmap" className="py-28 md:py-36 border-y border-white/8">
      <div className="max-w-shell mx-auto px-6">
        <Reveal className="max-w-2xl mb-16">
          <SectionLabel color="aqua">Where the project stands</SectionLabel>
          <h2 className="font-display font-bold text-[clamp(1.8rem,4.2vw,3rem)] leading-[1.04] tracking-[-.03em]">
            Designed, documented, and ready to build.
          </h2>
        </Reveal>
        <StreamNode ratio=".11" />

        <div className="grid lg:grid-cols-2 gap-6 mb-20">
          <Reveal className="panel rounded-2xl p-8 md:p-9">
            <p className="font-mono text-[10px] tracking-[.18em] uppercase text-aqua mb-7">Complete so far</p>
            <ul id="doneList" className="space-y-4">
              {doneItems.map((item, i) => (
                <li key={i} className="flex items-start gap-3.5 text-[15px] leading-relaxed text-steel">
                  <span className="text-aqua shrink-0">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal className="panel rounded-2xl p-8 md:p-9" delay=".1s">
            <p className="font-mono text-[10px] tracking-[.18em] uppercase text-saffron mb-7">What's next</p>
            <p className="text-[16px] leading-relaxed text-mist mb-4">
              Building and testing the physical prototype. Running it in a real building. Learning what breaks.
            </p>
            <p className="text-[15px] leading-relaxed text-steel mb-8">
              Because something always does — and finding out early is the entire point of a prototype. That honesty is not a weakness in the plan. It is the plan.
            </p>
            <div className="rule mb-7"></div>
            <p className="font-mono text-[10px] tracking-[.18em] uppercase text-steel/70 mb-3">
              Why be straight about the stage
            </p>
            <p className="text-[15px] leading-relaxed text-steel">
              Overclaiming a prototype as a product destroys credibility. Presenting the design stage clearly, with a defined path forward, builds it.
            </p>
          </Reveal>
        </div>

        <Reveal className="font-display font-bold text-2xl mb-10 tracking-[-.02em]">
          Prototype → Pilot → Product
        </Reveal>
        <div className="relative grid md:grid-cols-3 gap-10 md:gap-8">
          <div className="hidden md:block absolute left-0 right-0 top-[26px] h-px bg-white/10">
            <div id="phaseLine" className="h-full bg-aqua w-0 transition-[width] duration-[1900ms] ease-out"></div>
          </div>
          <Reveal className="relative">
            <div className="relative z-10 w-[52px] h-[52px] rounded-full border border-aqua/40 bg-ink flex items-center justify-center font-mono text-sm text-aqua mb-6">
              01
            </div>
            <h4 className="font-display font-semibold text-lg mb-2.5">Prototype</h4>
            <p className="text-[15px] leading-relaxed text-steel">Build sensor nodes and hub; validate the loop end to end.</p>
          </Reveal>
          <Reveal className="relative" delay=".15s">
            <div className="relative z-10 w-[52px] h-[52px] rounded-full border border-aqua/40 bg-ink flex items-center justify-center font-mono text-sm text-aqua mb-6">
              02
            </div>
            <h4 className="font-display font-semibold text-lg mb-2.5">Pilot</h4>
            <p className="text-[15px] leading-relaxed text-steel">
              Install in a real building; gather insights from people who didn't design it.
            </p>
          </Reveal>
          <Reveal className="relative" delay=".3s">
            <div className="relative z-10 w-[52px] h-[52px] rounded-full border border-aqua/40 bg-ink flex items-center justify-center font-mono text-sm text-aqua mb-6">
              03
            </div>
            <h4 className="font-display font-semibold text-lg mb-2.5">Product</h4>
            <p className="text-[15px] leading-relaxed text-steel">Refine, harden the hardware, scale installations.</p>
          </Reveal>
        </div>

        <Reveal className="mt-16 grid lg:grid-cols-2 gap-6">
          <div className="panel rounded-2xl p-8">
            <h4 className="font-display font-semibold text-lg mb-3 text-saffron">The critical gap</h4>
            <p className="text-[15px] leading-relaxed text-steel">
              The transition from Phase 1 to Phase 2 is where most hardware projects quietly die. Real-world installation reveals what lab testing cannot: what the mounting must survive, which alerts people ignore, and what users wish the system did differently.
            </p>
          </div>
          <div className="panel rounded-2xl p-8">
            <h4 className="font-display font-semibold text-lg mb-3 text-aqua">Why retrofit matters here</h4>
            <p className="text-[15px] leading-relaxed text-steel">
              The no-drill design is what makes Phase 2 achievable without construction permission. It's not just a product feature — it's what keeps the roadmap on track and the pilot reachable.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
