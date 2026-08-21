import React from 'react';
import { Reveal } from '../ui/Reveal';
import { SectionLabel } from '../ui/SectionLabel';
import { StreamNode } from '../ui/StreamNode';

export const LoopSection: React.FC = () => {
  return (
    <section id="loop" className="max-w-shell mx-auto px-6 py-28 md:py-40">
      <Reveal className="max-w-2xl mb-20">
        <SectionLabel color="aqua">The whole architecture</SectionLabel>
        <h2 className="font-display font-bold text-[clamp(1.9rem,4.4vw,3.1rem)] leading-[1.04] tracking-[-.03em]">
          Sense → Decide → Act → Inform
        </h2>
        <p className="mt-6 text-[17px] leading-relaxed text-steel">
          Four steps, and you can explain it to anyone. Watch the water carry it down the page.
        </p>
      </Reveal>

      <div className="space-y-24 md:space-y-32">
        <StreamNode ratio=".1" />
        <div className="stage grid md:grid-cols-[auto_1fr] gap-6 md:gap-10 max-w-xl">
          <div className="stagenum w-14 h-14 rounded-full border border-steel/40 flex items-center justify-center font-mono text-xs shrink-0">
            01
          </div>
          <div>
            <h3 className="font-display font-bold text-2xl mb-3">Sense</h3>
            <p className="text-[16px] leading-relaxed text-steel">
              Quiet sensors read level, flow, temperature and quality continuously — not when somebody remembers to check.
            </p>
          </div>
        </div>

        <StreamNode ratio=".92" />
        <div className="stage grid md:grid-cols-[auto_1fr] gap-6 md:gap-10 max-w-xl md:ml-auto">
          <div className="stagenum w-14 h-14 rounded-full border border-steel/40 flex items-center justify-center font-mono text-xs shrink-0">
            02
          </div>
          <div>
            <h3 className="font-display font-bold text-2xl mb-3">Decide</h3>
            <p className="text-[16px] leading-relaxed text-steel">
              Safety-critical decisions run locally, on the hub, so they never wait on a network. Dry-run protection doesn't need the internet to work.
            </p>
          </div>
        </div>

        <StreamNode ratio=".1" />
        <div className="stage grid md:grid-cols-[auto_1fr] gap-6 md:gap-10 max-w-xl">
          <div className="stagenum w-14 h-14 rounded-full border border-steel/40 flex items-center justify-center font-mono text-xs shrink-0">
            03
          </div>
          <div>
            <h3 className="font-display font-bold text-2xl mb-3">Act</h3>
            <p className="text-[16px] leading-relaxed text-steel">
              The pump starts when it should and stops before overflow. The system operates itself — the household doesn't operate the system.
            </p>
          </div>
        </div>

        <StreamNode ratio=".92" />
        <div className="stage grid md:grid-cols-[auto_1fr] gap-6 md:gap-10 max-w-xl md:ml-auto">
          <div className="stagenum w-14 h-14 rounded-full border border-steel/40 flex items-center justify-center font-mono text-xs shrink-0">
            04
          </div>
          <div>
            <h3 className="font-display font-bold text-2xl mb-3">Inform</h3>
            <p className="text-[16px] leading-relaxed text-steel">
              Everything else syncs to the cloud — history, trends, and alerts that arrive before the problem does.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
