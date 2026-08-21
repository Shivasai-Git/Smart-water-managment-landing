import React from 'react';
import { tickerFeed } from '../../data/tickerFeed';

export const TickerSection: React.FC = () => {
  const renderItems = () =>
    tickerFeed.map((item, idx) => (
      <React.Fragment key={idx}>
        <span className="px-7 whitespace-nowrap">{item}</span>
        <span className="text-aqua/40">/</span>
      </React.Fragment>
    ));

  return (
    <section className="border-y border-white/8 overflow-hidden">
      <div className="ticker-track py-3.5 font-mono text-[11px] tracking-[.16em] uppercase text-steel">
        <div className="flex shrink-0" id="tk1">
          {renderItems()}
        </div>
        <div className="flex shrink-0" id="tk2">
          {renderItems()}
        </div>
      </div>
    </section>
  );
};
