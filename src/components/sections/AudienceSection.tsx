import React from 'react';
import { Reveal } from '../ui/Reveal';
import { SectionLabel } from '../ui/SectionLabel';

const audiences = [
  {
    tag: 'Residential',
    title: 'Homes',
    body: 'Prevent tank overflow and automate everyday water management with zero manual effort.',
    metric: 'Save 20-30% Water',
    diagram: (
      <svg className="w-full h-8" viewBox="0 0 120 28" fill="none">
        {/* Single Tank Schematic */}
        <rect x="10" y="4" width="22" height="20" rx="3" fill="#041620" stroke="#18BFF2" strokeWidth="1.2" />
        <rect x="12" y="10" width="18" height="12" rx="2" fill="#18BFF2" opacity="0.75" />
        <line x1="32" y1="18" x2="60" y2="18" stroke="#0C2B36" strokeWidth="3" />
        <line x1="32" y1="18" x2="60" y2="18" stroke="#18BFF2" strokeWidth="1.5" />
        <circle cx="60" cy="18" r="4" fill="#061B21" stroke="#34D399" strokeWidth="1.2" />
        <text x="70" y="21" fill="#7C99BA" fontSize="7.5px" fontFamily="monospace">SINGLE TANK</text>
      </svg>
    ),
  },
  {
    tag: 'Multi-Family',
    title: 'Apartments & Societies',
    body: 'Monitor multiple overhead & underground tanks and ensure balanced water distribution.',
    metric: 'Multi-Tank Sync',
    diagram: (
      <svg className="w-full h-8" viewBox="0 0 120 28" fill="none">
        {/* Dual Connected Tanks */}
        <rect x="6" y="6" width="16" height="16" rx="2" fill="#041620" stroke="#18BFF2" strokeWidth="1.2" />
        <rect x="8" y="12" width="12" height="8" rx="1.5" fill="#18BFF2" opacity="0.75" />
        <line x1="22" y1="14" x2="40" y2="14" stroke="#18BFF2" strokeWidth="1.5" />
        <rect x="40" y="6" width="16" height="16" rx="2" fill="#041620" stroke="#18BFF2" strokeWidth="1.2" />
        <rect x="42" y="10" width="12" height="10" rx="1.5" fill="#18BFF2" opacity="0.75" />
        <line x1="56" y1="14" x2="68" y2="14" stroke="#72E4FF" strokeWidth="1" strokeDasharray="2 2" />
        <text x="72" y="17" fill="#7C99BA" fontSize="7.5px" fontFamily="monospace">SYNC 4+ TANKS</text>
      </svg>
    ),
  },
  {
    tag: 'Commercial',
    title: 'Industries & Facilities',
    body: 'Track high-volume flow rates, isolate pipe leakages, and protect operational machinery.',
    metric: 'Continuous Uptime',
    diagram: (
      <svg className="w-full h-8" viewBox="0 0 120 28" fill="none">
        {/* Parallel Grid Schematic */}
        <line x1="8" y1="8" x2="60" y2="8" stroke="#0C2B36" strokeWidth="3" />
        <line x1="8" y1="8" x2="60" y2="8" stroke="#18BFF2" strokeWidth="1.5" />
        <line x1="8" y1="20" x2="60" y2="20" stroke="#0C2B36" strokeWidth="3" />
        <line x1="8" y1="20" x2="60" y2="20" stroke="#18BFF2" strokeWidth="1.5" />
        <line x1="34" y1="8" x2="34" y2="20" stroke="#18BFF2" strokeWidth="1.5" />
        <text x="68" y="17" fill="#7C99BA" fontSize="7.5px" fontFamily="monospace">HIGH VOLUME</text>
      </svg>
    ),
  },
  {
    tag: 'Critical Infrastructure',
    title: 'Hospitals & Institutions',
    body: 'Improve supply reliability and reserve alerting for mission-critical water facilities.',
    metric: '99.99% Reliability',
    diagram: (
      <svg className="w-full h-8" viewBox="0 0 120 28" fill="none">
        {/* Redundant Dual Loop */}
        <path d="M 10,14 L 30,6 L 50,14 L 30,22 Z" fill="#041620" stroke="#34D399" strokeWidth="1.2" />
        <circle cx="30" cy="14" r="3" fill="#18BFF2" />
        <text x="58" y="17" fill="#7C99BA" fontSize="7.5px" fontFamily="monospace">REDUNDANT</text>
      </svg>
    ),
  },
];

export const AudienceSection: React.FC = () => {
  return (
    <section id="audience" className="py-12 md:py-18 border-y border-white/8 bg-[#031014]/60">
      <div className="max-w-shell mx-auto px-6">
        <Reveal className="max-w-3xl mb-8 md:mb-10">
          <SectionLabel color="aqua">Who It Is For</SectionLabel>
          <h2 className="font-display font-bold text-[clamp(1.75rem,3.5vw,2.7rem)] leading-[1.08] tracking-[-.03em] text-mist">
            Same intelligent network. Scaled for any infrastructure.
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-steel">
            From single overhead tanks to multi-tower commercial facilities, Smart Water Flow scales with proven reliability.
          </p>
        </Reveal>

        {/* 4 Compact Audience Cards with Infrastructure Schematics */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3.5 md:gap-4">
          {audiences.map((item, i) => (
            <div
              key={i}
              className="rounded-xl p-5 flex flex-col justify-between min-h-[200px] bg-[#061B21]/80 border border-white/10 group hover:border-aqua/40 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-[10px] tracking-[.16em] uppercase text-aqua">
                    {item.tag}
                  </span>
                  <span className="font-mono text-[9px] text-steel/70">{item.metric}</span>
                </div>
                <h3 className="font-display font-semibold text-lg leading-snug mb-1.5 text-mist group-hover:text-aqua transition-colors">
                  {item.title}
                </h3>
                <p className="text-[13px] leading-relaxed text-steel mb-3">{item.body}</p>
              </div>

              {/* Schematic Scale Illustration */}
              <div className="pt-2.5 border-t border-white/5">
                {item.diagram}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
