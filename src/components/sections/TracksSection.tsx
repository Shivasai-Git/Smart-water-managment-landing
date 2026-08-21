import React, { useState } from 'react';
import { Reveal } from '../ui/Reveal';
import { SectionLabel } from '../ui/SectionLabel';
import { StreamNode } from '../ui/StreamNode';
import { TRACKS } from '../../data/tracks';

export const TracksSection: React.FC = () => {
  const [activeTrack, setActiveTrack] = useState(0);
  const track = TRACKS[activeTrack];

  return (
    <section id="tracks" className="py-28 md:py-36 border-y border-white/8">
      <div className="max-w-shell mx-auto px-6">
        <Reveal className="max-w-2xl mb-14">
          <SectionLabel color="aqua">Two ways in</SectionLabel>
          <h2 className="font-display font-bold text-[clamp(1.8rem,4.2vw,3rem)] leading-[1.04] tracking-[-.03em]">
            A version for new buildings. A version for the one you already live in.
          </h2>
        </Reveal>

        <Reveal
          id="trackTabs"
          className="inline-flex relative p-1 rounded-full border border-white/12 bg-ink mb-12"
        >
          <span
            id="trackInd"
            className="track-ind absolute top-1 bottom-1 left-1 rounded-full bg-aqua"
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
            className={`track-btn relative z-10 px-5 py-2.5 font-mono text-[11px] tracking-[.13em] uppercase w-[158px] ${
              activeTrack === 0 ? 'text-ink' : 'text-steel'
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
            className={`track-btn relative z-10 px-5 py-2.5 font-mono text-[11px] tracking-[.13em] uppercase w-[158px] ${
              activeTrack === 1 ? 'text-ink' : 'text-steel'
            }`}
            onClick={() => setActiveTrack(1)}
          >
            Wired new build
          </button>
        </Reveal>

        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-16 items-center">
          <Reveal id="trackCopy">
            <h3 className="font-display font-bold text-3xl tracking-[-.02em] mb-4" id="tcTitle">
              {track.title}
            </h3>
            <p className="text-[16px] leading-relaxed text-steel mb-8" id="tcBody">
              {track.body}
            </p>
            <ul className="space-y-4" id="tcList">
              {track.list.map(([k, v], idx) => (
                <li key={idx} className="flex items-baseline justify-between gap-6 pb-4 border-b border-white/8">
                  <span className="font-mono text-[10px] tracking-[.16em] uppercase text-steel/70">{k}</span>
                  <span className="text-[15px] text-mist text-right">{v}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal className="panel rounded-2xl p-6 md:p-8">
            <div className="flex items-center justify-between mb-5 font-mono text-[10px] tracking-[.18em] uppercase text-steel">
              <span id="dgLabel">{track.label}</span>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-aqua"></span>Live
              </span>
            </div>
            <div id="dgWrap" dangerouslySetInnerHTML={{ __html: track.svg }} />
          </Reveal>
        </div>

        <Reveal className="mt-14 text-[17px] leading-relaxed text-mist max-w-3xl border-l-2 border-aqua pl-5">
          If we only build for new construction, we're building for a market that arrives slowly and by permission. The retrofit path is how this reaches people this year — including every rented flat and hostel where nobody has permission to drill anything.
        </Reveal>

        <StreamNode ratio=".13" />
      </div>
    </section>
  );
};
