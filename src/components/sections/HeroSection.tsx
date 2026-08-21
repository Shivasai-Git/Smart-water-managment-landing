import React from 'react';
import { HeroTank3D } from '../effects/HeroTank3D';
import { StreamNode } from '../ui/StreamNode';
import { useLiveReadout } from '../../hooks/useLiveReadout';

export const HeroSection: React.FC = () => {
  const { level, flow } = useLiveReadout();

  return (
    <section id="top" className="min-h-[100svh] flex items-center pt-24 pb-16 overflow-hidden">
      <HeroTank3D level={level} />
      <div
        className="hero-shade absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_18%_50%,rgba(7,22,26,.97)_24%,rgba(7,22,26,.5)_56%,transparent_78%)]"
        style={{ zIndex: 6 }}
      ></div>
      <div
        className="absolute inset-x-0 bottom-0 h-40 pointer-events-none bg-gradient-to-t from-ink to-transparent"
        style={{ zIndex: 6 }}
      ></div>

      <div className="above max-w-shell mx-auto px-6 w-full">
        <div className="max-w-[660px]">
          <p className="lift font-mono text-[11px] tracking-[.2em] uppercase text-aqua mb-6" style={{ animationDelay: '.05s' }}>
            A household water intelligence system
          </p>
          <h1 className="lift font-display font-extrabold leading-[.93] tracking-[-.035em] text-[clamp(2.5rem,7vw,5rem)]" style={{ animationDelay: '.15s' }}>
            Every home manages water.<br />Almost none of them{' '}
            <span className="relative inline-block">
              measure it
              <svg className="absolute -bottom-2 left-0 w-full h-3" viewBox="0 0 300 12" preserveAspectRatio="none">
                <path
                  d="M2 8 Q75 1,150 7 T298 5"
                  fill="none"
                  stroke="#3FA9F0"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  className="draw"
                  style={{ animationDelay: '1.1s' }}
                />
              </svg>
            </span>
            .
          </h1>
          <p className="lift mt-9 text-[17px] leading-relaxed text-steel max-w-[31rem]" style={{ animationDelay: '.3s' }}>
            Electricity has a meter. Gas has a gauge. Water has a person climbing to the terrace with a torch — or a motor that runs until somebody notices the overflow.
          </p>
          <div className="lift mt-10 flex flex-wrap items-center gap-4" style={{ animationDelay: '.42s' }}>
            <a href="#system" className="group inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-aqua text-ink font-medium text-[15px] hover:bg-mist transition-colors">
              See the system <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>
            <a href="#cost" className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full border border-white/15 text-mist text-[15px] hover:border-aqua/60 hover:text-aqua transition-colors">
              What it costs today
            </a>
          </div>
          <div className="lift mt-14 flex flex-wrap gap-x-10 gap-y-5 font-mono text-[11px] tracking-[.1em] uppercase" style={{ animationDelay: '.55s' }}>
            <div>
              <div className="text-steel/70 mb-1.5">Overhead tank</div>
              <div className="text-[22px] tracking-normal normal-case">
                <span id="lvl">{level}</span>
                <span className="text-steel text-[14px]">%</span>
              </div>
            </div>
            <div>
              <div className="text-steel/70 mb-1.5">Inlet flow</div>
              <div className="text-[22px] tracking-normal text-aqua normal-case">
                <span id="flw">{flow}</span>
                <span className="text-steel text-[14px]"> L/min</span>
              </div>
            </div>
            <div>
              <div className="text-steel/70 mb-1.5">Pump</div>
              <div className="text-[22px] tracking-normal normal-case flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-aqua"></span>Running
              </div>
            </div>
          </div>
        </div>
      </div>
      <StreamNode ratio=".52" className="bottom-0 left-0 w-full h-px" />
    </section>
  );
};
