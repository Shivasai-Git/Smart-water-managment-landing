import React, { useState, useEffect } from 'react';
import { Reveal } from '../ui/Reveal';
import { SectionLabel } from '../ui/SectionLabel';
import { IsoSystemScene } from '../effects/IsoSystemScene';

export const ConnectedDashboardSection: React.FC = () => {
  const [telemetry, setTelemetry] = useState({
    tankLevel: 78,
    flowRate: 12.4,
    dailyConsumption: 485,
    pumpStatus: 'ACTIVE',
    leakStatus: 'NORMAL',
    waterQuality: 'SAFE (TDS 142)',
    systemHealth: 'ONLINE (99.9%)',
  });

  // Subtle intermittent data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setTelemetry((prev) => ({
        ...prev,
        flowRate: Number((12.0 + Math.random() * 0.8).toFixed(1)),
        dailyConsumption: prev.dailyConsumption + 1,
      }));
    }, 4200);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="dashboard" className="max-w-shell mx-auto px-6 py-14 md:py-22 border-t border-white/8">
      <Reveal className="text-center mb-10 md:mb-12">
        <SectionLabel color="aqua" className="mb-3">
          Connected System & Dashboard
        </SectionLabel>
        <h2 className="font-display font-extrabold text-[clamp(1.85rem,4vw,3rem)] leading-[1.06] tracking-[-.03em] max-w-3xl mx-auto text-mist">
          Physical infrastructure becomes digital intelligence.
        </h2>
        <p className="mt-3.5 text-[15px] md:text-[16px] leading-relaxed text-steel max-w-2xl mx-auto">
          Tanks, sensors, and pumps feed live telemetry into the Smart Water Flow platform, providing sub-second visibility and automated hardware control.
        </p>
      </Reveal>

      {/* Live Digital Telemetry Status Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
        {/* Metric 1 */}
        <div className="bg-[#061B21]/90 border border-white/10 rounded-xl p-3.5 flex flex-col justify-between shadow-md">
          <div className="text-steel/70 font-mono text-[9px] uppercase tracking-wider mb-1">
            Tank Level
          </div>
          <div className="font-display font-bold text-xl text-mist">
            {telemetry.tankLevel}
            <span className="text-aqua text-xs font-normal font-mono ml-0.5">%</span>
          </div>
          <div className="text-[10px] font-mono text-emerald-400 mt-1 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            Optimal
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-[#061B21]/90 border border-white/10 rounded-xl p-3.5 flex flex-col justify-between shadow-md">
          <div className="text-steel/70 font-mono text-[9px] uppercase tracking-wider mb-1">
            Pump Status
          </div>
          <div className="font-display font-bold text-xl text-aqua">
            {telemetry.pumpStatus}
          </div>
          <div className="text-[10px] font-mono text-aqua mt-1 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-aqua animate-pulse" />
            Automated ON
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-[#061B21]/90 border border-white/10 rounded-xl p-3.5 flex flex-col justify-between shadow-md">
          <div className="text-steel/70 font-mono text-[9px] uppercase tracking-wider mb-1">
            Inlet Flow
          </div>
          <div className="font-display font-bold text-xl text-mist">
            {telemetry.flowRate}
            <span className="text-steel text-xs font-normal font-mono ml-0.5">L/m</span>
          </div>
          <div className="text-[10px] font-mono text-steel/80 mt-1">Calibrated</div>
        </div>

        {/* Metric 4 */}
        <div className="bg-[#061B21]/90 border border-white/10 rounded-xl p-3.5 flex flex-col justify-between shadow-md">
          <div className="text-steel/70 font-mono text-[9px] uppercase tracking-wider mb-1">
            Today's Usage
          </div>
          <div className="font-display font-bold text-xl text-mist">
            {telemetry.dailyConsumption}
            <span className="text-steel text-xs font-normal font-mono ml-0.5">L</span>
          </div>
          <div className="text-[10px] font-mono text-steel/80 mt-1">Within Budget</div>
        </div>

        {/* Metric 5 */}
        <div className="bg-[#061B21]/90 border border-white/10 rounded-xl p-3.5 flex flex-col justify-between shadow-md">
          <div className="text-steel/70 font-mono text-[9px] uppercase tracking-wider mb-1">
            Leak Status
          </div>
          <div className="font-display font-bold text-xl text-emerald-400">
            {telemetry.leakStatus}
          </div>
          <div className="text-[10px] font-mono text-emerald-400 mt-1 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            Zero Anomalies
          </div>
        </div>

        {/* Metric 6 */}
        <div className="bg-[#061B21]/90 border border-white/10 rounded-xl p-3.5 flex flex-col justify-between shadow-md">
          <div className="text-steel/70 font-mono text-[9px] uppercase tracking-wider mb-1">
            System Health
          </div>
          <div className="font-display font-bold text-base text-mist pt-0.5">
            {telemetry.systemHealth}
          </div>
          <div className="text-[10px] font-mono text-aqua mt-1 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-aqua" />
            Edge Synced
          </div>
        </div>
      </div>

      {/* Interactive Isometric Infrastructure Cutaway Scene */}
      <IsoSystemScene />

      {/* 3 Core Pillars Summary */}
      <div className="mt-8 grid sm:grid-cols-3 gap-4">
        <div className="rounded-xl p-5 md:p-6 text-center bg-[#061B21]/80 border border-white/10">
          <span className="font-mono text-[10px] text-aqua uppercase tracking-[.16em] block mb-1.5">
            Pillar 01
          </span>
          <h3 className="font-display font-semibold text-base mb-1.5 text-mist">
            Unified Hardware
          </h3>
          <p className="text-xs leading-relaxed text-steel">
            Ultrasonic level sensors and pump relays coordinated locally with zero latency.
          </p>
        </div>
        <div className="rounded-xl p-5 md:p-6 text-center bg-[#061B21]/80 border border-white/10">
          <span className="font-mono text-[10px] text-aqua uppercase tracking-[.16em] block mb-1.5">
            Pillar 02
          </span>
          <h3 className="font-display font-semibold text-base mb-1.5 text-mist">
            Zero Blindspots
          </h3>
          <p className="text-xs leading-relaxed text-steel">
            Real-time telemetry answering: What is my level? Is the motor safe? Any leaks?
          </p>
        </div>
        <div className="rounded-xl p-5 md:p-6 text-center bg-[#061B21]/80 border border-white/10">
          <span className="font-mono text-[10px] text-aqua uppercase tracking-[.16em] block mb-1.5">
            Pillar 03
          </span>
          <h3 className="font-display font-semibold text-base mb-1.5 text-mist">
            Autonomous Guard
          </h3>
          <p className="text-xs leading-relaxed text-steel">
            Hardware fail-safes safeguard against overflow and dry-run without human intervention.
          </p>
        </div>
      </div>
    </section>
  );
};
