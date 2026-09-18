// src/features/quality/QualityPage.tsx
import { qualityMetrics, calibrationReminder } from '../../data/fixtures/quality';
import { StatusPill } from '../../components/ui/StatusPill';
import { Gauge } from '../../components/ui/Gauge';

export default function QualityPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-display text-2xl text-mist">Water Quality</h1>

      <section className="rounded-2xl border border-steel/20 bg-ink2 p-6 flex items-center gap-8">
        <Gauge percent={92} label="Quality score" toneClassName="fill-good" />
        <div>
          <StatusPill tone="good" label="Readings within target range" />
          <p className="font-body text-sm text-steel mt-3 max-w-md">
            These readings describe what the sensors measured, not a certification of drinking-water safety.
            pH, TDS, and turbidity alone do not confirm water is safe to drink — treatment decisions require
            source-water testing and qualified guidance.
          </p>
        </div>
      </section>

      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {qualityMetrics.map((m) => (
          <div key={m.id} className="rounded-2xl border border-steel/20 bg-ink2 p-4 flex flex-col gap-1">
            <span className="font-body text-xs text-steel">{m.label}</span>
            <span className="font-mono text-2xl text-mist">
              {m.value}
              {m.unit && <span className="text-sm text-steel ml-1">{m.unit}</span>}
            </span>
            <span className="font-body text-xs text-steel">Target: {m.targetRange}</span>
            <StatusPill tone={m.status} label={m.status === 'good' ? 'Good' : 'Needs attention'} />
          </div>
        ))}
      </section>

      <section className="rounded-2xl border border-saffron/30 bg-saffron/5 p-4">
        <p className="font-body text-sm text-mist">
          Calibration reminder: {calibrationReminder.deviceLabel} is due for calibration in {calibrationReminder.dueInDays} days.
        </p>
      </section>
    </div>
  );
}
