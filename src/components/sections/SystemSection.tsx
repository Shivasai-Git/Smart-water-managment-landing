import React from 'react';
import { Reveal } from '../ui/Reveal';
import { SectionLabel } from '../ui/SectionLabel';
import { StreamNode } from '../ui/StreamNode';
import { devices } from '../../data/devices';

export const SystemSection: React.FC = () => {
  return (
    <section id="system" className="py-14 md:py-20 border-y border-white/8">
      <div className="max-w-shell mx-auto px-6">
        <Reveal className="max-w-3xl mb-10">
          <SectionLabel color="aqua">One connected ecosystem</SectionLabel>
          <h2 className="font-display font-bold text-[clamp(1.8rem,3.8vw,2.8rem)] leading-[1.05] tracking-[-.03em]">
            One system. Every water device. One app.
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-steel">
            Bringing tank telemetry, pump safety, pipe flow, water quality, and appliances into a single local hub and unified mobile application.
          </p>
        </Reveal>

        <div id="deviceList" className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {devices.map((device, i) => (
            <Reveal key={i} className="panel rounded-xl p-5 group hover:border-aqua/40 transition-colors" delay={`${i * 0.05}s`}>
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-[10px] text-aqua bg-aqua/10 px-2 py-0.5 rounded">
                  0{i + 1}
                </span>
                <span className="text-steel/50 group-hover:text-aqua group-hover:translate-x-0.5 transition-all text-xs">→</span>
              </div>
              <h3 className="font-display font-semibold text-[17px] mb-1.5 text-mist group-hover:text-aqua transition-colors">
                {device.title}
              </h3>
              <p className="text-xs text-steel leading-relaxed">{device.description}</p>
            </Reveal>
          ))}
          <Reveal className="panel rounded-xl p-5 bg-aqua/[0.04] border-aqua/30 flex flex-col justify-center" delay="0.3s">
            <span className="font-mono text-[10px] text-aqua uppercase tracking-[.14em] mb-1.5 font-medium">The Intelligence Layer</span>
            <p className="text-xs text-mist leading-relaxed">
              Learns normal baseline usage for your building — alerting you before dry-outs or overflows happen.
            </p>
          </Reveal>
        </div>

        <StreamNode ratio=".9" />
      </div>
    </section>
  );
};

