import React from 'react';
import { tickerFeed } from '../../data/tickerFeed';

export const TickerSection: React.FC = () => {
  return (
    <section className="border-y border-white/8 bg-[#020A0D]/80 overflow-hidden select-none">
      <div className="ticker-track py-3 font-mono text-[10px] md:text-[11px] tracking-[.16em] uppercase text-steel/80 flex items-center">
        <div className="flex shrink-0 items-center">
          {tickerFeed.map((item, idx) => (
            <React.Fragment key={`a-${idx}`}>
              <span className="px-6 whitespace-nowrap">{item}</span>
              <span className="text-aqua/40 text-[9px]">/</span>
            </React.Fragment>
          ))}
        </div>
        <div className="flex shrink-0 items-center">
          {tickerFeed.map((item, idx) => (
            <React.Fragment key={`b-${idx}`}>
              <span className="px-6 whitespace-nowrap">{item}</span>
              <span className="text-aqua/40 text-[9px]">/</span>
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};
