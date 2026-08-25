import React from 'react';
import { Reveal } from '../ui/Reveal';
import { SectionLabel } from '../ui/SectionLabel';
import { StreamNode } from '../ui/StreamNode';

export const LoopSection: React.FC = () => {
  return (
    <section id="loop" className="max-w-shell mx-auto px-6 py-14 md:py-20">
      <Reveal className="max-w-2xl mb-10">
        <SectionLabel color="aqua">Operational cycle</SectionLabel>
        <h2 className="font-display font-bold text-[clamp(1.8rem,3.8vw,2.8rem)] leading-[1.05] tracking-[-.03em]">
          Sense → Decide → Act → Inform
        </h2>
        <p className="mt-3 text-[15px] leading-relaxed text-steel">
          Four interconnected steps operating continuously. Important safety actions run locally; insights sync to cloud.
        </p>
      </Reveal>

      <StreamNode ratio=".1" />

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Stage 1 */}
        <div className="stage panel rounded-xl p-5 flex flex-col justify-between transition-all">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="stagenum w-9 h-9 rounded-full border border-steel/40 flex items-center justify-center font-mono text-xs text-aqua">
                01
              </div>
              <span className="font-mono text-[9px] uppercase tracking-[.14em] text-aqua/80 bg-aqua/10 px-2 py-0.5 rounded">Continuous</span>
            </div>
            <h3 className="font-display font-bold text-lg mb-2">Sense</h3>
            <p className="text-xs leading-relaxed text-steel">
              Ultrasonic & flow sensors read tank levels, pipe flow, leaks, and quality parameters round-the-clock.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-white/5 font-mono text-[10px] text-steel/60">
            Hardware Nodes
          </div>
        </div>

        {/* Stage 2 */}
        <div className="stage panel rounded-xl p-5 flex flex-col justify-between transition-all">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="stagenum w-9 h-9 rounded-full border border-steel/40 flex items-center justify-center font-mono text-xs text-aqua">
                02
              </div>
              <span className="font-mono text-[9px] uppercase tracking-[.14em] text-aqua/80 bg-aqua/10 px-2 py-0.5 rounded">Local Hub</span>
            </div>
            <h3 className="font-display font-bold text-lg mb-2">Decide</h3>
            <p className="text-xs leading-relaxed text-steel">
              Safety logic runs on the local edge controller. Dry-run prevention and auto-cutoff never wait on internet connectivity.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-white/5 font-mono text-[10px] text-steel/60">
            Edge Intelligence
          </div>
        </div>

        {/* Stage 3 */}
        <div className="stage panel rounded-xl p-5 flex flex-col justify-between transition-all">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="stagenum w-9 h-9 rounded-full border border-steel/40 flex items-center justify-center font-mono text-xs text-aqua">
                03
              </div>
              <span className="font-mono text-[9px] uppercase tracking-[.14em] text-aqua/80 bg-aqua/10 px-2 py-0.5 rounded">Autonomous</span>
            </div>
            <h3 className="font-display font-bold text-lg mb-2">Act</h3>
            <p className="text-xs leading-relaxed text-steel">
              Pump fires safely when tank dips and halts before overflow. Solenoids isolate leaks without human panic.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-white/5 font-mono text-[10px] text-steel/60">
            Relay & Valve Control
          </div>
        </div>

        {/* Stage 4 */}
        <div className="stage panel rounded-xl p-5 flex flex-col justify-between transition-all">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="stagenum w-9 h-9 rounded-full border border-steel/40 flex items-center justify-center font-mono text-xs text-aqua">
                04
              </div>
              <span className="font-mono text-[9px] uppercase tracking-[.14em] text-aqua/80 bg-aqua/10 px-2 py-0.5 rounded">Cloud Sync</span>
            </div>
            <h3 className="font-display font-bold text-lg mb-2">Inform</h3>
            <p className="text-xs leading-relaxed text-steel">
              Telemetry, consumption history, and predictive maintenance alerts synchronize to the mobile app instantly.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-white/5 font-mono text-[10px] text-steel/60">
            Mobile & Dashboard
          </div>
        </div>
      </div>

      <StreamNode ratio=".92" />
    </section>
  );
};

