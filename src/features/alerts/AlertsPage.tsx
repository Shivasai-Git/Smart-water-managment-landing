import { useMemo, useState } from 'react';
import { useScenario } from '../../state/scenario';
import { baselineAlerts } from '../../data/fixtures/alerts';
import { DataTable } from '../../components/ui/DataTable';
import { StatusPill } from '../../components/ui/StatusPill';
import type { Alert } from '../../data/types';

const SEVERITY_TONE: Record<Alert['severity'], 'good' | 'attention' | 'danger'> = {
  low: 'good',
  medium: 'attention',
  high: 'danger',
};

export default function AlertsPage() {
  const { sections, activeAlert } = useScenario();
  const [acknowledged, setAcknowledged] = useState<Record<string, boolean>>({});

  const allAlerts = useMemo(() => (activeAlert ? [activeAlert, ...baselineAlerts] : baselineAlerts), [activeAlert]);

  const rows = allAlerts.map((a) => {
    const section = sections.find((s) => s.id === a.sectionId);
    const isAck = acknowledged[a.id];
    return {
      severity: <StatusPill tone={SEVERITY_TONE[a.severity]} label={a.severity} />,
      section: section?.name ?? a.sectionId,
      title: a.title,
      openedAt: a.openedAt ? new Date(a.openedAt).toLocaleString() : '—',
      status: isAck ? (
        <StatusPill tone="good" label="Acknowledged" />
      ) : (
        <button
          type="button"
          onClick={() => setAcknowledged((prev) => ({ ...prev, [a.id]: true }))}
          className="text-aqua text-sm hover:text-mist transition-colors"
        >
          Acknowledge
        </button>
      ),
    };
  });

  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-display text-2xl text-mist">Leakage & Alerts</h1>
      <p className="font-body text-sm text-steel max-w-lg">
        New alerts are labeled as possible leaks, not confirmed ones, until reviewed.
      </p>
      <section className="rounded-2xl border border-steel/20 bg-ink2 p-5">
        <DataTable
          columns={[
            { key: 'severity', label: 'Severity' },
            { key: 'section', label: 'Section' },
            { key: 'title', label: 'Event' },
            { key: 'openedAt', label: 'Opened' },
            { key: 'status', label: 'Status' },
          ]}
          rows={rows}
          emptyLabel="No alerts — everything is operating normally."
        />
      </section>
    </div>
  );
}
