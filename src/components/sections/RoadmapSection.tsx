import React from 'react';
import { Reveal } from '../ui/Reveal';
import { SectionLabel } from '../ui/SectionLabel';
import { StreamNode } from '../ui/StreamNode';
import { doneItems } from '../../data/doneItems';

export const RoadmapSection: React.FC = () => {
  return (
    <section id="roadmap" className="py-14 md:py-20 border-y border-white/8">
      <div className="max-w-shell mx-auto px-6">
        <Reveal className="max-w-3xl mb-10">
          <SectionLabel color="aqua">Current Stage & Execution Roadmap</SectionLabel>
          <h2 className="font-display font-bold text-[clamp(1.8rem,3.8vw,2.8rem)] leading-[1.05] tracking-[-.03em]">
            Designed, documented, and ready for prototype validation.
          </h2>
        </Reveal>
        <StreamNode ratio=".11" />

        <div className="grid lg:grid-cols-2 gap-4 mb-8">
          <Reveal className="panel rounded-xl p-6">
            <p className="font-mono text-[10px] tracking-[.18em] uppercase text-aqua mb-4 font-medium">Completed Milestones</p>
            <ul id="doneList" className="space-y-2.5">
              {doneItems.map((item, i) => (
                <li key={i} className="flex items-start gap-2.5 text-xs leading-relaxed text-steel">
                  <span className="text-aqua shrink-0 font-bold">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal className="panel rounded-xl p-6 bg-saffron/[0.02] border-saffron/20" delay=".08s">
            <p className="font-mono text-[10px] tracking-[.18em] uppercase text-saffron mb-4 font-medium">Immediate Next Step</p>
            <p className="text-sm font-semibold text-mist mb-2">
              Physical Prototype & Controlled Building Pilot
            </p>
            <p className="text-xs leading-relaxed text-steel mb-4">
              Building physical sensor nodes, testing non-invasive tank mounting in live hostel conditions, and verifying fail-safe cutoff logic before productizing.
            </p>
            <div className="pt-3 border-t border-white/5 font-mono text-[10px] text-saffron/90">
              Clear staging builds trust — no premature product claims.
            </div>
          </Reveal>
        </div>

        {/* 3-Phase Progression Tracker */}
        <Reveal className="panel rounded-xl p-6 mb-6">
          <p className="font-mono text-[10px] uppercase tracking-[.18em] text-steel/60 mb-4">Development Phases</p>
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="relative border-l sm:border-l-0 sm:border-t-2 border-aqua pt-3 pl-3 sm:pl-0">
              <span className="font-mono text-[10px] text-aqua block mb-1">Phase 01 · Current</span>
              <h4 className="font-display font-semibold text-sm mb-1 text-mist">Prototype</h4>
              <p className="text-xs text-steel">Fabricate MCU nodes & hub; validate end-to-end loop.</p>
            </div>
            <div className="relative border-l sm:border-l-0 sm:border-t-2 border-white/20 pt-3 pl-3 sm:pl-0">
              <span className="font-mono text-[10px] text-steel/60 block mb-1">Phase 02 · Next</span>
              <h4 className="font-display font-semibold text-sm mb-1 text-mist">Controlled Pilot</h4>
              <p className="text-xs text-steel">Deploy inside real hostel building; stress-test edge cases.</p>
            </div>
            <div className="relative border-l sm:border-l-0 sm:border-t-2 border-white/10 pt-3 pl-3 sm:pl-0">
              <span className="font-mono text-[10px] text-steel/40 block mb-1">Phase 03 · Scale</span>
              <h4 className="font-display font-semibold text-sm mb-1 text-mist">Commercial Product</h4>
              <p className="text-xs text-steel">Enclosure tooling, certification, and multi-site rollouts.</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

