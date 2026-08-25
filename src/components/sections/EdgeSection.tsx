import React from 'react';
import { Reveal } from '../ui/Reveal';
import { TiltPanel } from '../ui/TiltPanel';
import { SectionLabel } from '../ui/SectionLabel';
import { StreamNode } from '../ui/StreamNode';

export const EdgeSection: React.FC = () => {
  return (
    <section id="edge" className="py-14 md:py-20 border-y border-white/8">
      <div className="max-w-shell mx-auto px-6">
        <Reveal className="max-w-3xl mb-10">
          <SectionLabel color="aqua">Unfair Advantages</SectionLabel>
          <h2 className="font-display font-bold text-[clamp(1.8rem,3.8vw,2.8rem)] leading-[1.05] tracking-[-.03em]">
            Not a single point sensor. A unified system.
          </h2>
        </Reveal>
        <StreamNode ratio=".12" />
        <div className="grid md:grid-cols-3 gap-4">
          <TiltPanel className="rounded-xl p-6">
            <span className="font-mono text-[10px] text-aqua block mb-2 font-medium">01 · Holistic Context</span>
            <h3 className="font-display font-semibold text-lg mb-2">Integration, not accumulation</h3>
            <p className="text-xs leading-relaxed text-steel mb-3">
              One system observes tank level, pump health, hardness, and hidden leaks simultaneously.
            </p>
            <p className="text-xs leading-relaxed text-mist/90 bg-white/[0.02] p-2.5 rounded border border-white/5">
              TDS spike + high pump run-time triggers geyser scaling alerts before element failure.
            </p>
          </TiltPanel>
          <TiltPanel className="rounded-xl p-6" delay=".08s">
            <span className="font-mono text-[10px] text-aqua block mb-2 font-medium">02 · Zero Friction</span>
            <h3 className="font-display font-semibold text-lg mb-2">Install without permission</h3>
            <p className="text-xs leading-relaxed text-steel mb-3">
              Engineered for existing buildings. No pipe cutting, no wall chipping, no landlord approval needed.
            </p>
            <p className="text-xs leading-relaxed text-mist/90 bg-white/[0.02] p-2.5 rounded border border-white/5">
              Non-invasive clamp & sonar mounts deploy in under 30 minutes.
            </p>
          </TiltPanel>
          <TiltPanel className="rounded-xl p-6" delay=".16s">
            <span className="font-mono text-[10px] text-aqua block mb-2 font-medium">03 · Practical Reality</span>
            <h3 className="font-display font-semibold text-lg mb-2">Built for Indian conditions</h3>
            <p className="text-xs leading-relaxed text-steel mb-3">
              Survives intermittent supply, power cuts, and patchy Wi-Fi with edge memory storage.
            </p>
            <p className="text-xs leading-relaxed text-mist/90 bg-white/[0.02] p-2.5 rounded border border-white/5">
              Calibrated against IS 10500 national drinking water standards.
            </p>
          </TiltPanel>
        </div>
      </div>
    </section>
  );
};

