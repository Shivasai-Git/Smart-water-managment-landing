// src/features/reports/ReportsPage.tsx
import { useState } from 'react';
import { IconExport, IconFileText } from '../../components/ui/icons';

export default function ReportsPage() {
  const [from, setFrom] = useState('2026-09-01');
  const [to, setTo] = useState('2026-09-18');

  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-display text-2xl text-mist">Reports</h1>

      <section className="rounded-2xl border border-steel/20 bg-ink2 p-5 flex flex-wrap items-end gap-4">
        <label className="flex flex-col gap-1.5">
          <span className="text-xs text-steel">From</span>
          <input type="date" value={from} onChange={(e) => setFrom(e.target.value)} className="rounded-lg bg-ink border border-steel/30 px-3 py-2 text-mist text-sm" />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="text-xs text-steel">To</span>
          <input type="date" value={to} onChange={(e) => setTo(e.target.value)} className="rounded-lg bg-ink border border-steel/30 px-3 py-2 text-mist text-sm" />
        </label>
        <button type="button" className="rounded-lg bg-aqua text-ink text-sm font-medium px-4 py-2 hover:bg-mist transition-colors">
          Generate report
        </button>
      </section>

      <section className="rounded-2xl border border-steel/20 bg-ink2 p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-base text-mist">Consumption & incident summary</h2>
          <div className="flex gap-2">
            <button type="button" className="flex items-center gap-1.5 text-sm text-steel hover:text-mist transition-colors">
              <IconFileText size={14} /> PDF
            </button>
            <button type="button" className="flex items-center gap-1.5 text-sm text-steel hover:text-mist transition-colors">
              <IconExport size={14} /> CSV
            </button>
          </div>
        </div>
        <p className="font-body text-sm text-steel">
          {from} to {to}: 8,940 L total consumption across 7 sections, 1 possible-leak alert (Kitchen, resolved),
          0 pump faults.
        </p>
      </section>
    </div>
  );
}
