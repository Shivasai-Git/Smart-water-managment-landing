// src/features/dashboard/DashboardPage.tsx
import { useScenario } from '../../state/scenario';
import { sumpLevel, overheadTankLevel } from '../../data/fixtures/tank';
import { qualityMetrics } from '../../data/fixtures/quality';
import { Gauge } from '../../components/ui/Gauge';
import { MetricReadout } from '../../components/ui/MetricReadout';
import { StatusPill } from '../../components/ui/StatusPill';

export default function DashboardPage() {
  const { phase, sections, activeAlert, runIncidentDemo } = useScenario();
  const kitchen = sections.find((s) => s.id === 'kitchen')!;
  const qualityGood = qualityMetrics.every((m) => m.status === 'good');

  const headline =
    phase === 'leak'
      ? 'Possible leak detected — Kitchen line'
      : phase === 'contained'
        ? 'Kitchen valve closed — flow stopped'
        : 'All sections operating normally';

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl text-mist">Dashboard</h1>
        <StatusPill tone="good" label="Gateway connected" />
      </div>

      <section className={`rounded-2xl border p-5 flex items-center justify-between gap-4 ${phase === 'leak' ? 'border-danger/40 bg-danger/5' : 'border-steel/20 bg-ink2'}`}>
        <div>
          <h2 className="font-display text-lg text-mist mb-1">{headline}</h2>
          {activeAlert && <p className="font-body text-sm text-steel">{activeAlert.evidence}</p>}
        </div>
        <button
          type="button"
          onClick={runIncidentDemo}
          className="shrink-0 rounded-lg bg-aqua text-ink text-sm font-medium px-4 py-2 hover:bg-mist transition-colors"
        >
          {phase === 'normal' ? 'Run incident demo' : phase === 'leak' ? 'Close Kitchen valve' : 'Reset demo'}
        </button>
      </section>

      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-steel/20 bg-ink2 p-4">
          <MetricReadout label="Kitchen flow" value={kitchen.flowLpm.toFixed(1)} unit="L/min" note={phase === 'leak' ? 'Above expected baseline' : 'Within expected range'} />
        </div>
        <div className="rounded-2xl border border-steel/20 bg-ink2 p-4">
          <MetricReadout label="Today's usage" value={phase === 'leak' ? '412' : '286'} unit="L" note="Daily budget 600 L" />
        </div>
        <div className="rounded-2xl border border-steel/20 bg-ink2 p-4">
          <MetricReadout label="Water quality" value={qualityGood ? 'Good' : 'Attention'} note="pH · TDS · Turbidity · Temp" />
        </div>
        <div className="rounded-2xl border border-steel/20 bg-ink2 p-4">
          <MetricReadout label="Active alerts" value={activeAlert ? 1 : 0} note={activeAlert ? 'Kitchen — possible leak' : 'None open'} />
        </div>
      </section>

      <section className="rounded-2xl border border-steel/20 bg-ink2 p-5 flex flex-wrap gap-8 justify-around">
        <Gauge percent={overheadTankLevel.value} label="Overhead tank" />
        <Gauge percent={sumpLevel.value} label="Sump" toneClassName="fill-good" />
        <Gauge percent={92} label="Water quality score" toneClassName="fill-good" />
      </section>
    </div>
  );
}
