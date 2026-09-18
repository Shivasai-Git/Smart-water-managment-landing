// src/features/tank/TankPage.tsx
import { sumpLevel, overheadTankLevel, tankThresholds } from '../../data/fixtures/tank';
import { Gauge } from '../../components/ui/Gauge';
import { MetricReadout } from '../../components/ui/MetricReadout';
import { StatusPill } from '../../components/ui/StatusPill';

export default function TankPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-display text-2xl text-mist">Tank Monitoring</h1>

      <section className="rounded-2xl border border-steel/20 bg-ink2 p-6 flex flex-wrap gap-10 justify-around">
        <div className="flex flex-col items-center gap-2">
          <Gauge percent={overheadTankLevel.value} label="Overhead tank" />
          <StatusPill tone="good" label="Sensor healthy" />
        </div>
        <div className="flex flex-col items-center gap-2">
          <Gauge percent={sumpLevel.value} label="Sump" toneClassName="fill-good" />
          <StatusPill tone="good" label="Sensor healthy" />
        </div>
      </section>

      <section className="grid grid-cols-2 gap-4">
        <div className="rounded-2xl border border-steel/20 bg-ink2 p-4">
          <MetricReadout label="Low-level threshold" value={tankThresholds.lowPercent} unit="%" note="Alert triggers below this level" />
        </div>
        <div className="rounded-2xl border border-steel/20 bg-ink2 p-4">
          <MetricReadout label="High-level threshold" value={tankThresholds.highPercent} unit="%" note="Overflow warning above this level" />
        </div>
      </section>

      <section className="rounded-2xl border border-steel/20 bg-ink2 p-5">
        <h2 className="font-display text-base text-mist mb-3">Level history — 24 hours</h2>
        <svg viewBox="0 0 480 120" className="w-full h-28" preserveAspectRatio="none" aria-label="simulated tank level trend">
          <path d="M0 40 C60 45 90 38 130 42 S 200 55 260 50 S 340 44 400 40 L 480 38" fill="none" stroke="#3FA9F0" strokeWidth="2.5" />
        </svg>
      </section>
    </div>
  );
}
