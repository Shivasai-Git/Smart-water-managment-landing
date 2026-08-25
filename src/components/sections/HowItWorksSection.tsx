import React, { useEffect, useRef, useState } from 'react';
import { Reveal } from '../ui/Reveal';
import { SectionLabel } from '../ui/SectionLabel';

const flowSteps = [
  {
    step: '01',
    name: 'Sensors',
    badge: 'Continuous',
    desc: 'Sensors continuously monitor tank level, flow and water conditions.',
    tech: 'Ultrasonic & Flow Probes',
  },
  {
    step: '02',
    name: 'Controller',
    badge: 'Edge Logic',
    desc: 'The edge controller processes the data locally with zero-latency safety logic.',
    tech: 'Autonomous MCU Relay',
  },
  {
    step: '03',
    name: 'Cloud Intelligence',
    badge: 'Platform',
    desc: 'Sends real-time telemetry to the Smart Water Flow cloud to model usage baselines.',
    tech: 'Time-Series Engine',
  },
  {
    step: '04',
    name: 'Dashboard',
    badge: 'Real-Time',
    desc: 'Provides instant real-time visibility, usage analytics, and alert delivery.',
    tech: 'Unified Mobile & Web',
  },
  {
    step: '05',
    name: 'Automated Action',
    badge: 'Fail-Safe',
    desc: 'Automatically switches pumps ON and OFF based on tank levels and safety thresholds.',
    tech: 'Smart Actuation',
  },
];

export const HowItWorksSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [animatedStep, setAnimatedStep] = useState<number>(0);
  const hasAnimatedRef = useRef(false);

  // Sequential data signal pulse when section enters viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimatedRef.current) {
          hasAnimatedRef.current = true;
          [0, 1, 2, 3, 4].forEach((s) => {
            setTimeout(() => {
              setAnimatedStep(s + 1);
            }, (s + 1) * 220);
          });
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      className="max-w-shell mx-auto px-6 py-14 md:py-20"
    >
      <Reveal className="max-w-3xl mb-10 md:mb-12">
        <SectionLabel color="aqua">How Smart Water Flow Works</SectionLabel>
        <h2 className="font-display font-bold text-[clamp(1.85rem,3.8vw,2.8rem)] leading-[1.08] tracking-[-.03em] text-mist">
          Physical water measurement transforms into automated action.
        </h2>
        <p className="mt-3.5 text-[15px] md:text-[16px] leading-relaxed text-steel">
          Sensors continuously monitor conditions, the controller processes data instantly, and the system delivers real-time monitoring and automatically controls pumps when required.
        </p>
      </Reveal>

      {/* 5-Step Compact Horizontal Pipeline */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 relative">
        {flowSteps.map((s, idx) => {
          const isLit = animatedStep >= idx + 1;
          return (
            <div
              key={idx}
              className={`rounded-xl p-5 flex flex-col justify-between transition-all duration-500 relative overflow-hidden min-h-[210px] ${
                isLit
                  ? 'bg-[#061B21] border border-aqua/40 shadow-[0_0_16px_rgba(24,191,242,0.12)]'
                  : 'bg-[#041419]/80 border border-white/8 opacity-80'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3.5">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs transition-colors ${
                      isLit
                        ? 'bg-aqua text-ink font-bold shadow-[0_0_10px_#18bff2]'
                        : 'border border-steel/30 text-steel'
                    }`}
                  >
                    {s.step}
                  </div>
                  <span className="font-mono text-[9px] uppercase tracking-[.12em] text-aqua/90 bg-aqua/10 px-2 py-0.5 rounded border border-aqua/20">
                    {s.badge}
                  </span>
                </div>

                <h3 className="font-display font-bold text-base md:text-[17px] mb-2 text-mist">
                  {s.name}
                </h3>

                <p className="text-xs leading-relaxed text-steel">{s.desc}</p>
              </div>

              {/* Bottom Tech Label & Flow Connector Arrow */}
              <div className="mt-4 pt-3.5 border-t border-white/5 font-mono text-[9px] text-steel/60 flex items-center justify-between">
                <span>{s.tech}</span>
                {idx < flowSteps.length - 1 && (
                  <span className={`hidden lg:inline font-mono transition-colors ${isLit ? 'text-aqua font-bold' : 'text-steel/40'}`}>
                    →
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Local-First Safety Callout Banner */}
      <div className="mt-6 p-4 rounded-xl bg-aqua/[0.04] border border-aqua/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-mist">
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-aqua animate-pulse shrink-0" />
          <span>
            <strong>Local-First Safety:</strong> Critical pump cutoffs operate on the edge controller even if internet connectivity drops.
          </span>
        </div>
        <a
          href="#capabilities"
          className="font-mono text-[10px] text-aqua hover:underline uppercase tracking-[.14em] shrink-0"
        >
          Explore Capabilities ↓
        </a>
      </div>
    </section>
  );
};
