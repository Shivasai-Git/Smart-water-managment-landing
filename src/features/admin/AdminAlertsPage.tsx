// src/features/admin/AdminAlertsPage.tsx
import { useMemo } from 'react';
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

export default function AdminAlertsPage() {
  const { activeAlert } = useScenario();
  const allAlerts = useMemo(() => (activeAlert ? [activeAlert, ...baselineAlerts] : baselineAlerts), [activeAlert]);

  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-display text-2xl text-mist">System Alerts</h1>
      <section className="rounded-2xl border border-steel/20 bg-ink2 p-5">
        <DataTable
          columns={[
            { key: 'severity', label: 'Severity' },
            { key: 'section', label: 'Section' },
            { key: 'title', label: 'Event' },
            { key: 'status', label: 'Status' },
          ]}
          rows={allAlerts.map((a) => ({
            severity: <StatusPill tone={SEVERITY_TONE[a.severity]} label={a.severity} />,
            section: a.sectionId,
            title: a.title,
            status: <StatusPill tone={a.status === 'open' ? 'attention' : 'good'} label={a.status} />,
          }))}
          emptyLabel="No system-wide alerts."
        />
      </section>
    </div>
  );
}
