import React from 'react';
import { Reveal } from '../ui/Reveal';

export const CloseSection: React.FC = () => {
  return (
    <section id="vision" className="relative py-16 md:py-24 overflow-hidden border-t border-white/8 bg-[#031014] transform-gpu">
      {/* Soft Local Glow Behind Resolved State (Pure CSS gradient, NO expensive blur filter) */}
      <div
        className="absolute w-[600px] h-[350px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(24,191,242,0.35) 0%, rgba(8,126,168,0.15) 50%, transparent 72%)',
        }}
      />

      <div className="relative z-10 max-w-shell mx-auto px-6 text-center">
        <Reveal className="max-w-3xl mx-auto">
          {/* Resolved Stable System Indicator Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 text-emerald-400 font-mono text-[11px] tracking-[.16em] uppercase mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            System State: Optimal · 100% Protected
          </div>

          <h2 className="font-display font-extrabold text-[clamp(2.2rem,5vw,3.8rem)] leading-[1.02] tracking-[-.035em] text-mist mb-5">
            Every Drop. Visible. Controlled. Intelligent.
          </h2>

          <p className="text-[16px] md:text-[18px] leading-relaxed text-steel max-w-2xl mx-auto mb-9">
            Smart Water Flow transforms traditional water infrastructure into a connected, measurable and automated system.
          </p>

          {/* Resolved Calm Closed-Loop Graphic */}
          <div className="max-w-md mx-auto mb-9 p-3 rounded-xl bg-[#061B21]/80 border border-white/10 flex items-center justify-between text-[11px] font-mono text-steel">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#18BFF2]" />
              <span className="text-mist font-semibold">Zero Overflows</span>
            </div>
            <span className="text-steel/40">·</span>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="text-mist font-semibold">Dry-Run Safe</span>
            </div>
            <span className="text-steel/40">·</span>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#72E4FF]" />
              <span className="text-mist font-semibold">Live Telemetry</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="#top"
              className="group inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-aqua text-ink font-medium text-[15px] hover:bg-mist transition-colors shadow-[0_0_28px_rgba(24,191,242,0.4)]"
            >
              Experience Smart Water Flow
              <span className="transition-transform group-hover:-translate-y-0.5">↑</span>
            </a>
            <a
              href="#dashboard"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-white/15 text-mist text-[14px] hover:border-aqua/60 hover:text-aqua transition-colors bg-[#061B21]/60 backdrop-blur-sm"
            >
              Review Connected Dashboard
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
