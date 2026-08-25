import React, { useState } from 'react';
import { HeroTankVisual } from '../effects/HeroTankVisual';

export const HeroSection: React.FC = () => {
  const [tankLevel] = useState(74);
  const flowRate = 12.4;
  const pumpActive = true;

  return (
    <section
      id="top"
      className="relative min-h-[88svh] lg:min-h-[92svh] flex items-center pt-24 pb-14 md:pb-18 overflow-hidden"
    >
      {/* 1. Left-Side Local Gradient Shading for Maximum Text Contrast (Leaves Tank Completely Uncovered) */}
      <div
        className="hero-shade absolute inset-y-0 left-0 w-full lg:w-[60%] pointer-events-none bg-[radial-gradient(ellipse_at_22%_50%,rgba(3,16,20,0.98)_30%,rgba(3,16,20,0.72)_65%,transparent_92%)]"
        style={{ zIndex: 2 }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-20 pointer-events-none bg-gradient-to-t from-[#031014] to-transparent"
        style={{ zIndex: 2 }}
      />

      {/* 2. Main Hero Container Grid (Left Text, Right Realistic Tank) */}
      <div className="relative z-10 max-w-shell mx-auto px-6 w-full flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-8">
        {/* Left Column: Product Story, Headline, Dual CTAs & Telemetry */}
        <div className="max-w-[560px] w-full shrink-0">
          {/* Status Tag */}
          <div
            className="lift inline-flex items-center gap-2 px-3 py-1 rounded-full border border-aqua/30 bg-aqua/10 text-aqua font-mono text-[11px] tracking-[.18em] uppercase mb-4 md:mb-5"
            style={{ animationDelay: '.05s' }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-aqua animate-pulse" />
            Intelligent Water Platform
          </div>

          {/* Main Headline */}
          <h1
            className="lift font-display font-extrabold leading-[0.98] tracking-[-0.035em] text-[clamp(2.5rem,5.8vw,4.4rem)] text-mist"
            style={{ animationDelay: '.15s' }}
          >
            Smart Water Flow
          </h1>

          {/* Subheadline */}
          <p
            className="lift mt-4 font-display text-lg md:text-xl font-medium text-mist/95 leading-snug"
            style={{ animationDelay: '.22s' }}
          >
            Intelligent water management for homes, apartments and infrastructure.
          </p>

          {/* Supporting Copy */}
          <p
            className="lift mt-3.5 text-[15px] md:text-[16px] leading-relaxed text-steel max-w-[31rem]"
            style={{ animationDelay: '.3s' }}
          >
            Monitor water levels, automate pumps, detect leaks and understand water usage from one connected system.
          </p>

          {/* Primary & Secondary CTAs */}
          <div
            className="lift mt-7 flex flex-wrap items-center gap-3.5"
            style={{ animationDelay: '.4s' }}
          >
            <a
              href="#capabilities"
              className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-aqua text-ink font-medium text-[14px] hover:bg-mist transition-colors shadow-[0_0_24px_rgba(24,191,242,0.35)]"
            >
              Explore the System{' '}
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>
            <a
              href="#how-it-works"
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full border border-white/15 text-mist text-[14px] hover:border-aqua/60 hover:text-aqua transition-colors bg-[#061B21]/70 backdrop-blur-sm"
            >
              How It Works
            </a>
          </div>

          {/* Live Telemetry Card Strip */}
          <div
            className="lift mt-8 pt-5 border-t border-white/10 flex flex-wrap gap-3 font-mono text-[11px] tracking-[.1em] uppercase"
            style={{ animationDelay: '.5s' }}
          >
            {/* Metric 1: Tank Level */}
            <div className="bg-[#061B21]/90 border border-white/10 rounded-xl px-4 py-2.5 min-w-[130px]">
              <div className="text-steel/70 text-[10px] mb-0.5">Overhead Tank</div>
              <div className="text-[21px] font-bold tracking-normal normal-case text-mist">
                <span>{tankLevel}</span>
                <span className="text-aqua text-[13px] font-normal">%</span>
              </div>
            </div>

            {/* Metric 2: Inlet Flow Rate */}
            <div className="bg-[#061B21]/90 border border-white/10 rounded-xl px-4 py-2.5 min-w-[130px]">
              <div className="text-steel/70 text-[10px] mb-0.5">Inlet Flow</div>
              <div className="text-[21px] font-bold tracking-normal text-aqua normal-case">
                <span>{flowRate}</span>
                <span className="text-steel text-[12px] font-normal"> L/m</span>
              </div>
            </div>

            {/* Metric 3: Automated Pump Status */}
            <div className="bg-[#061B21]/90 border border-white/10 rounded-xl px-4 py-2.5 min-w-[140px] flex flex-col justify-center">
              <div className="text-steel/70 text-[10px] mb-0.5">Pump Status</div>
              <div className="text-[14px] font-bold tracking-normal normal-case flex items-center gap-2 text-mist pt-0.5">
                <span
                  className={`w-2 h-2 rounded-full ${
                    pumpActive
                      ? 'bg-emerald-400 shadow-[0_0_8px_#34d399]'
                      : 'bg-steel/50'
                  }`}
                />
                {pumpActive ? 'AUTOMATED ON' : 'STANDBY'}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Realistic Overhead Water Storage Tank */}
        <div className="w-full lg:w-[50%] flex items-center justify-center lg:justify-end relative z-10">
          <HeroTankVisual level={tankLevel} className="max-w-[480px] lg:max-w-[520px]" />
        </div>
      </div>
    </section>
  );
};
