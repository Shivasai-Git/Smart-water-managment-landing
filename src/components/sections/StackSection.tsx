import React from 'react';
import { Reveal } from '../ui/Reveal';
import { SectionLabel } from '../ui/SectionLabel';
import { StreamNode } from '../ui/StreamNode';

export const StackSection: React.FC = () => {
  return (
    <section id="stack" className="max-w-shell mx-auto px-6 py-14 md:py-20">
      <Reveal className="max-w-3xl mb-8">
        <SectionLabel color="aqua">Hardware & Architecture Stack</SectionLabel>
        <h2 className="font-display font-bold text-[clamp(1.8rem,3.8vw,2.8rem)] leading-[1.05] tracking-[-.03em]">
          Proven off-the-shelf components. Zero exotic hardware.
        </h2>
      </Reveal>
      <StreamNode ratio=".89" />
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 bg-white/5 rounded-xl p-1 border border-white/8">
        <Reveal className="bg-ink p-5 rounded-lg">
          <span className="font-mono text-[10px] tracking-[.18em] uppercase text-aqua block mb-2">01 · Controllers</span>
          <h4 className="font-display font-semibold text-base mb-1.5">Sensor Nodes</h4>
          <p className="text-xs leading-relaxed text-steel">
            Standard 32-bit MCU platforms with ultra-low power sleep states and onboard flash.
          </p>
        </Reveal>
        <Reveal className="bg-ink p-5 rounded-lg" delay=".06s">
          <span className="font-mono text-[10px] tracking-[.18em] uppercase text-aqua block mb-2">02 · Connectivity</span>
          <h4 className="font-display font-semibold text-base mb-1.5">Hybrid RF & Wi-Fi</h4>
          <p className="text-xs leading-relaxed text-steel">
            Sub-GHz LoRa / BLE for deep-concrete penetration to rooftop tanks; Wi-Fi for hub sync.
          </p>
        </Reveal>
        <Reveal className="bg-ink p-5 rounded-lg" delay=".12s">
          <span className="font-mono text-[10px] tracking-[.18em] uppercase text-aqua block mb-2">03 · Probes</span>
          <h4 className="font-display font-semibold text-base mb-1.5">Industrial Sensors</h4>
          <p className="text-xs leading-relaxed text-steel">
            Ultrasonic level detection, Hall-effect turbine flowmeters, and calibrated TDS probes.
          </p>
        </Reveal>
        <Reveal className="bg-ink p-5 rounded-lg" delay=".18s">
          <span className="font-mono text-[10px] tracking-[.18em] uppercase text-aqua block mb-2">04 · Backend</span>
          <h4 className="font-display font-semibold text-base mb-1.5">Edge SBC + Cloud TSDB</h4>
          <p className="text-xs leading-relaxed text-steel">
            Local Linux/RTOS edge engine paired with a scalable time-series database for real-time telemetry.
          </p>
        </Reveal>
      </div>
      <Reveal className="mt-6 text-xs leading-relaxed text-mist max-w-3xl border-l-2 border-aqua pl-3">
        Deliberately built on standard, high-reliability components so Smart Water Flow is easily buildable, repairable, and affordable at scale.
      </Reveal>
    </section>
  );
};

