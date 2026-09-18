// src/features/usage/UsagePage.tsx
import { useMemo, useState } from 'react';
import { useScenario } from '../../state/scenario';
import { MetricReadout } from '../../components/ui/MetricReadout';

const RANGES = ['Today', '7 days', '30 days'] as const;

export default function UsagePage() {
  const { sections } = useScenario();
  const [sectionFilter, setSectionFilter] = useState<string>('all');
  const [range, setRange] = useState<(typeof RANGES)[number]>('Today');

  const totalFlow = useMemo(
    () => sections.filter((s) => sectionFilter === 'all' || s.id === sectionFilter).reduce((sum, s) => sum + s.flowLpm, 0),
    [sections, sectionFilter],
  );

  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-display text-2xl text-mist">Water Usage</h1>

      <div className="flex flex-wrap gap-3">
        <select
          value={sectionFilter}
          onChange={(e) => setSectionFilter(e.target.value)}
          className="rounded-lg bg-ink2 border border-steel/30 text-mist text-sm px-3 py-2"
        >
          <option value="all">All sections</option>
          {sections.map((s) => (
            <option key={s.id} value={s.id}>{s.name}</option>
          ))}
        </select>
        <div className="flex gap-1 rounded-lg bg-ink2 border border-steel/30 p-1">
          {RANGES.map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRange(r)}
              className={`rounded-md px-3 py-1.5 text-sm transition-colors ${range === r ? 'bg-aqua text-ink' : 'text-steel'}`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      <section className="grid grid-cols-2 gap-4">
        <div className="rounded-2xl border border-steel/20 bg-ink2 p-4">
          <MetricReadout label="Combined current flow" value={totalFlow.toFixed(1)} unit="L/min" />
        </div>
        <div className="rounded-2xl border border-steel/20 bg-ink2 p-4">
          <MetricReadout label={`Total volume — ${range}`} value={range === 'Today' ? '286' : range === '7 days' ? '1,940' : '8,120'} unit="L" />
        </div>
      </section>

      <section className="rounded-2xl border border-steel/20 bg-ink2 p-5">
        <h2 className="font-display text-base text-mist mb-3">Consumption trend</h2>
        <svg viewBox="0 0 480 120" className="w-full h-28" preserveAspectRatio="none" aria-label="simulated consumption trend">
          <path d="M0 90 C60 85 90 95 130 70 S 200 40 260 50 S 340 60 400 35 L 480 20" fill="none" stroke="#3FA9F0" strokeWidth="2.5" />
        </svg>
      </section>
    </div>
  );
}
