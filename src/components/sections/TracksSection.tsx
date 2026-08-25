import React, { useState } from 'react';
import { Reveal } from '../ui/Reveal';
import { SectionLabel } from '../ui/SectionLabel';
import { StreamNode } from '../ui/StreamNode';
import { TRACKS } from '../../data/tracks';

export const TracksSection: React.FC = () => {
  const [activeTrack, setActiveTrack] = useState(0);
  const track = TRACKS[activeTrack];

  return (
    <section id="deployment" className="max-w-shell mx-auto px-6 py-12 md:py-18">
      <Reveal className="max-w-3xl mb-8">
        <SectionLabel color="aqua">Deployment & Architecture</SectionLabel>
        <h2 className="font-display font-bold text-[clamp(1.75rem,3.5vw,2.7rem)] leading-[1.08] tracking-[-.03em]">
          Engineered for existing homes and new builds.
        </h2>
        <p className="mt-3 text-[15px] leading-relaxed text-steel">
          Choose a zero-drill retrofit that attaches in under 30 minutes, or a hardwired industrial setup for new construction.
        </p>
      </Reveal>

      <Reveal
        id="trackTabs"
        className="inline-flex relative p-1 rounded-full border border-white/12 bg-ink mb-8"
      >
        <span
          id="trackInd"
          className="track-ind absolute top-1 bottom-1 left-1 rounded-full bg-aqua shadow-[0_0_15px_rgba(63,169,240,0.4)]"
          style={{
            width: '158px',
            transform: activeTrack ? 'translateX(100%)' : 'translateX(0)',
          }}
        ></span>
        <button
          type="button"
          data-track="0"
          role="tab"
          aria-selected={activeTrack === 0}
          className={`track-btn relative z-10 px-5 py-2 font-mono text-[11px] tracking-[.13em] uppercase w-[158px] transition-colors ${
            activeTrack === 0 ? 'text-ink font-semibold' : 'text-steel hover:text-mist'
          }`}
          onClick={() => setActiveTrack(0)}
        >
          No-drill retrofit
        </button>
        <button
          type="button"
          data-track="1"
          role="tab"
          aria-selected={activeTrack === 1}
          className={`track-btn relative z-10 px-5 py-2 font-mono text-[11px] tracking-[.13em] uppercase w-[158px] transition-colors ${
            activeTrack === 1 ? 'text-ink font-semibold' : 'text-steel hover:text-mist'
          }`}
          onClick={() => setActiveTrack(1)}
        >
          Wired new build
        </button>
      </Reveal>

      <div className="grid lg:grid-cols-[1fr_1.1fr] gap-8 lg:gap-12 items-center">
        <Reveal id="trackCopy">
          <h3 className="font-display font-bold text-2xl tracking-[-.02em] mb-3 text-mist" id="tcTitle">
            {track.title}
          </h3>
          <p className="text-[14px] md:text-[15px] leading-relaxed text-steel mb-6" id="tcBody">
            {track.body}
          </p>
          <ul className="space-y-3" id="tcList">
            {track.list.map(([k, v], idx) => (
              <li key={idx} className="flex items-baseline justify-between gap-4 pb-2.5 border-b border-white/8 text-sm">
                <span className="font-mono text-[10px] tracking-[.16em] uppercase text-steel/70">{k}</span>
                <span className="text-[13px] text-mist text-right font-medium">{v}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="panel rounded-xl p-5 md:p-6 bg-ink/80 border-white/10">
          <div className="flex items-center justify-between mb-4 font-mono text-[10px] tracking-[.18em] uppercase text-steel">
            <span id="dgLabel">{track.label}</span>
            <span className="flex items-center gap-1.5 text-aqua">
              <span className="w-1.5 h-1.5 rounded-full bg-aqua animate-pulse"></span>Active Configuration
            </span>
          </div>
          <div id="dgWrap" dangerouslySetInnerHTML={{ __html: track.svg }} />
        </Reveal>
      </div>

      {/* Compact Hardware Stack Strip */}
      <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-3 bg-white/[0.03] rounded-xl p-3 border border-white/8">
        <div className="p-3">
          <span className="font-mono text-[9px] uppercase tracking-[.14em] text-aqua block mb-1">01 · Edge Nodes</span>
          <p className="text-xs text-steel leading-relaxed">Low-power 32-bit MCU with local memory backup.</p>
        </div>
        <div className="p-3">
          <span className="font-mono text-[9px] uppercase tracking-[.14em] text-aqua block mb-1">02 · RF & Wi-Fi</span>
          <p className="text-xs text-steel leading-relaxed">Sub-GHz long-range links penetrate concrete slabs to rooftop.</p>
        </div>
        <div className="p-3">
          <span className="font-mono text-[9px] uppercase tracking-[.14em] text-aqua block mb-1">03 · Probes</span>
          <p className="text-xs text-steel leading-relaxed">Non-contact ultrasonic sensing and calibrated flowmeters.</p>
        </div>
        <div className="p-3">
          <span className="font-mono text-[9px] uppercase tracking-[.14em] text-aqua block mb-1">04 · Cloud TSDB</span>
          <p className="text-xs text-steel leading-relaxed">High-frequency telemetry stream with instant alert delivery.</p>
        </div>
      </div>

      <StreamNode ratio=".13" />
    </section>
  );
};
