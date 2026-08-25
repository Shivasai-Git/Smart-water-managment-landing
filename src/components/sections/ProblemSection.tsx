import React from 'react';
import { Reveal } from '../ui/Reveal';
import { SectionLabel } from '../ui/SectionLabel';

const problems = [
  {
    tag: '01 · Waste & Damage',
    title: 'Tank Overflow',
    body: 'Water continues flowing because pumps are not switched off at the right time.',
    icon: (
      <svg className="w-5 h-5 text-saffron" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
      </svg>
    ),
    badge: 'Spill Risk',
  },
  {
    tag: '02 · Motor Burnout',
    title: 'Dry Run',
    body: 'Motors can operate without sufficient water, wasting electricity and damaging equipment.',
    icon: (
      <svg className="w-5 h-5 text-saffron" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    badge: 'Motor Burnout',
  },
  {
    tag: '03 · Silent Loss',
    title: 'Hidden Leakage',
    body: 'Small leaks remain unnoticed until significant water has already been wasted.',
    icon: (
      <svg className="w-5 h-5 text-saffron" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    badge: 'Unseen Waste',
  },
  {
    tag: '04 · Zero Visibility',
    title: 'Manual Monitoring',
    body: 'Users have little real-time visibility into tank levels, flow or consumption.',
    icon: (
      <svg className="w-5 h-5 text-saffron" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    ),
    badge: 'Zero Telemetry',
  },
];

export const ProblemSection: React.FC = () => {
  return (
    <section id="problem" className="py-14 md:py-20 border-y border-white/8 bg-[#031014]/60">
      <div className="max-w-shell mx-auto px-6">
        <Reveal className="max-w-3xl mb-10 md:mb-12">
          <SectionLabel color="saffron">The Problem</SectionLabel>
          <h2 className="font-display font-bold text-[clamp(1.85rem,3.8vw,2.8rem)] leading-[1.08] tracking-[-.03em] text-mist">
            Water is everywhere. Visibility isn't.
          </h2>
          <p className="mt-3.5 text-[15px] md:text-[16px] leading-relaxed text-steel">
            Without automated sensing and smart shutoffs, everyday water infrastructure relies on guesswork, leading to recurring waste and hardware damage.
          </p>
        </Reveal>

        {/* 4 Focused Problem Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {problems.map((item, i) => (
            <div
              key={i}
              className="rounded-xl p-5 md:p-6 flex flex-col justify-between min-h-[190px] bg-[#061B21]/90 border border-white/10 group hover:border-saffron/40 transition-colors shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-[10px] tracking-[.18em] uppercase text-saffron">
                    {item.tag}
                  </span>
                  <div className="p-2 rounded-lg bg-saffron/10 text-saffron">
                    {item.icon}
                  </div>
                </div>
                <h3 className="font-display font-semibold text-lg leading-snug mb-2 text-mist group-hover:text-saffron transition-colors">
                  {item.title}
                </h3>
                <p className="text-[13px] leading-relaxed text-steel">{item.body}</p>
              </div>
              <div className="mt-4 pt-3.5 border-t border-white/5 flex items-center justify-between font-mono text-[9px] uppercase tracking-[.14em]">
                <span className="text-steel/70">{item.badge}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-saffron/70" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
