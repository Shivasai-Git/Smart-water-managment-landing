import React from 'react';
import { Reveal } from '../ui/Reveal';
import { SectionLabel } from '../ui/SectionLabel';
import { StreamNode } from '../ui/StreamNode';
import { devices } from '../../data/devices';

export const SystemSection: React.FC = () => {
  return (
    <section id="system" className="py-28 md:py-36 border-y border-white/8">
      <div className="max-w-shell mx-auto px-6 grid lg:grid-cols-[.9fr_1.1fr] gap-14 lg:gap-20">
        <Reveal className="lg:sticky lg:top-28 lg:self-start">
          <SectionLabel color="aqua">One roof</SectionLabel>
          <h2 className="font-display font-bold text-[clamp(1.9rem,4.2vw,3rem)] leading-[1.04] tracking-[-.03em]">
            One system. Every water device. One app.
          </h2>
          <p className="mt-6 text-[16px] leading-relaxed text-steel">
            A single connected system that brings every water-related device in a building under one cloud backend, one mobile app, one unified view.
          </p>
          <div className="mt-8 rule"></div>
          <p className="mt-6 text-[15px] leading-relaxed text-mist">
            The intelligence layer learns what normal looks like for your household — so it can tell you when something isn't.{' '}
            <span className="text-steel">A sensor tells you a number. This tells you what the number means.</span>
          </p>
        </Reveal>
        <Reveal>
          <div className="rule mb-1"></div>
          <div id="deviceList">
            {devices.map((device, i) => (
              <div key={i} className="device group flex items-start gap-5 py-6 border-b border-white/8">
                <span className="font-mono text-[10px] text-steel/50 pt-1.5 w-6 shrink-0">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="flex-1">
                  <h3 className="font-display font-semibold text-[19px] mb-1.5 group-hover:text-aqua transition-colors">
                    {device.title}
                  </h3>
                  <p className="text-[15px] leading-relaxed text-steel">{device.description}</p>
                </div>
                <span className="arw text-aqua pt-1.5">→</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
      <StreamNode ratio=".9" />
    </section>
  );
};
