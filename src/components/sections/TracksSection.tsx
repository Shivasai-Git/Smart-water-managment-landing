import React, { useState } from 'react';
import { Reveal } from '../ui/Reveal';
import { SectionLabel } from '../ui/SectionLabel';
import { StreamNode } from '../ui/StreamNode';
import { TRACKS } from '../../data/tracks';

export const TracksSection: React.FC = () => {
  const [activeTrack, setActiveTrack] = useState(0);
  const track = TRACKS[activeTrack];

  return (
    <section id="tracks" className="py-14 md:py-20 border-y border-white/8">
      <div className="max-w-shell mx-auto px-6">
        <Reveal className="max-w-3xl mb-8">
          <SectionLabel color="aqua">Two installation tracks</SectionLabel>
          <h2 className="font-display font-bold text-[clamp(1.8rem,3.8vw,2.8rem)] leading-[1.05] tracking-[-.03em]">
            For new buildings, and the one you live in today.
          </h2>
        </Reveal>

        <Reveal
          id="trackTabs"
          className="inline-flex relative p-1 rounded-full border border-white/12 bg-ink mb-8"
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
            className={`track-btn relative z-10 px-5 py-2 font-mono text-[11px] tracking-[.13em] uppercase w-[158px] ${
              activeTrack === 0 ? 'text-ink font-medium' : 'text-steel'
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
            className={`track-btn relative z-10 px-5 py-2 font-mono text-[11px] tracking-[.13em] uppercase w-[158px] ${
              activeTrack === 1 ? 'text-ink font-medium' : 'text-steel'
            }`}
            onClick={() => setActiveTrack(1)}
          >
            Wired new build
          </button>
        </Reveal>

        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-8 lg:gap-12 items-center">
          <Reveal id="trackCopy">
            <h3 className="font-display font-bold text-2xl tracking-[-.02em] mb-3" id="tcTitle">
              {track.title}
            </h3>
            <p className="text-[15px] leading-relaxed text-steel mb-6" id="tcBody">
              {track.body}
            </p>
            <ul className="space-y-3" id="tcList">
              {track.list.map(([k, v], idx) => (
                <li key={idx} className="flex items-baseline justify-between gap-4 pb-3 border-b border-white/8 text-sm">
                  <span className="font-mono text-[10px] tracking-[.16em] uppercase text-steel/70">{k}</span>
                  <span className="text-[14px] text-mist text-right font-medium">{v}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal className="panel rounded-xl p-5 md:p-6">
            <div className="flex items-center justify-between mb-4 font-mono text-[10px] tracking-[.18em] uppercase text-steel">
              <span id="dgLabel">{track.label}</span>
              <span className="flex items-center gap-1.5 text-aqua">
                <span className="w-1.5 h-1.5 rounded-full bg-aqua animate-pulse"></span>Active Model
              </span>
            </div>
            <div id="dgWrap" dangerouslySetInnerHTML={{ __html: track.svg }} />
          </Reveal>
        </div>

        <Reveal className="mt-8 text-sm leading-relaxed text-mist max-w-3xl border-l-2 border-aqua pl-4 bg-aqua/[0.02] py-2">
          The retrofit path is how Smart Water Flow deploys instantly — zero wall drilling, zero pipe cutting, ideal for rented flats, student hostels, and residential communities.
        </Reveal>

        <StreamNode ratio=".13" />
      </div>
    </section>
  );
};

