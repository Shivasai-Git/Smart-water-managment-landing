import React, { useEffect, useRef, useState } from 'react';
import { Reveal } from '../ui/Reveal';
import { SectionLabel } from '../ui/SectionLabel';

const capabilities = [
  {
    num: '01',
    title: 'Automatic Pump Control',
    description: 'Automatically switch pumps ON and OFF based on tank levels.',
    icon: (
      <svg className="w-5 h-5 text-aqua" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    detail: 'Configurable low/high thresholds with intelligent dry-run cutoff protection.',
  },
  {
    num: '02',
    title: 'Overflow Prevention',
    description: 'Stop water supply before tanks overflow.',
    icon: (
      <svg className="w-5 h-5 text-aqua" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    detail: 'Hardware fail-safe cutoffs prevent ceiling leaks and structural water damage.',
  },
  {
    num: '03',
    title: 'Leak Detection',
    description: 'Identify abnormal water-flow patterns that may indicate leakage.',
    icon: (
      <svg className="w-5 h-5 text-aqua" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    ),
    detail: 'Continuous flow analysis spots micro-drips and concealed pipeline fractures.',
  },
  {
    num: '04',
    title: 'Real-Time Monitoring',
    description: 'View tank levels, water flow and system status instantly.',
    icon: (
      <svg className="w-5 h-5 text-aqua" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    detail: 'Sub-second sensor telemetry rendered across synchronized mobile and web apps.',
  },
  {
    num: '05',
    title: 'Water Usage Analytics',
    description: 'Understand consumption patterns and identify unnecessary usage.',
    icon: (
      <svg className="w-5 h-5 text-aqua" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
      </svg>
    ),
    detail: 'Hourly, daily, and seasonal trends to budget water and curb utility bills.',
  },
  {
    num: '06',
    title: 'Smart Alerts',
    description: 'Receive warnings for abnormal water levels, leakage or system faults.',
    icon: (
      <svg className="w-5 h-5 text-aqua" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
      </svg>
    ),
    detail: 'Instant push notifications for dry run, pipe blockages, and low reserve alerts.',
  },
];

export const CapabilitiesSection: React.FC = () => {
  const [activeCap, setActiveCap] = useState<number>(0);
  const sectionRef = useRef<HTMLElement>(null);
  const hasAnimatedRef = useRef(false);

  // Slow sequential capability branch pulse (run once on entry, then pause)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimatedRef.current) {
          hasAnimatedRef.current = true;
          [0, 1, 2, 3, 4, 5].forEach((i) => {
            setTimeout(() => {
              setActiveCap(i);
            }, i * 500);
          });
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="capabilities" className="py-12 md:py-18 border-y border-white/8 bg-[#031014]/70">
      <div className="max-w-shell mx-auto px-6">
        <Reveal className="max-w-3xl mb-8 md:mb-10">
          <SectionLabel color="aqua">Core Capabilities</SectionLabel>
          <h2 className="font-display font-bold text-[clamp(1.75rem,3.5vw,2.7rem)] leading-[1.08] tracking-[-.03em] text-mist">
            Intelligent features built for total water security.
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-steel">
            Every layer of water management unified into one intuitive, autonomous system.
          </p>
        </Reveal>

        {/* 6 Responsive Feature Cards in 3x2 Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3.5 md:gap-4">
          {capabilities.map((cap, i) => {
            const isHighlighted = activeCap === i;
            return (
              <div
                key={i}
                className={`rounded-xl p-5 md:p-6 flex flex-col justify-between transition-all duration-300 ${
                  isHighlighted
                    ? 'bg-[#061B21] border border-aqua/50 shadow-[0_0_16px_rgba(24,191,242,0.15)]'
                    : 'bg-[#061B21]/80 border border-white/10'
                } group hover:border-aqua/40`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`font-mono text-[10px] px-2 py-0.5 rounded transition-colors ${
                        isHighlighted
                          ? 'bg-aqua text-ink font-bold shadow-[0_0_8px_#18bff2]'
                          : 'text-aqua bg-aqua/10 border border-aqua/20'
                      }`}
                    >
                      {cap.num}
                    </span>
                    <div className="p-2 rounded-lg bg-white/[0.04] text-aqua group-hover:bg-aqua/15 transition-colors">
                      {cap.icon}
                    </div>
                  </div>

                  <h3 className="font-display font-semibold text-lg mb-2 text-mist group-hover:text-aqua transition-colors">
                    {cap.title}
                  </h3>

                  <p className="text-[13px] text-mist/85 leading-relaxed mb-3">
                    {cap.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/5 font-mono text-[10px] text-steel/70 leading-relaxed">
                  {cap.detail}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
