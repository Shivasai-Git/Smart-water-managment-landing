// src/features/admin/AdminAuditPage.tsx
import { auditLog } from '../../data/fixtures/admin';
import { DataTable } from '../../components/ui/DataTable';
import { StatusPill } from '../../components/ui/StatusPill';

export default function AdminAuditPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-display text-2xl text-mist">Audit Trail</h1>
      <section className="rounded-2xl border border-steel/20 bg-ink2 p-5">
        <DataTable
          columns={[
            { key: 'actor', label: 'Actor' },
            { key: 'action', label: 'Action' },
            { key: 'target', label: 'Target' },
            { key: 'timestamp', label: 'Timestamp' },
            { key: 'result', label: 'Result' },
          ]}
          rows={auditLog.map((entry) => ({
            actor: entry.actor,
            action: entry.action,
            target: entry.target,
            timestamp: new Date(entry.timestamp).toLocaleString(),
            result: <StatusPill tone={entry.result === 'success' ? 'good' : 'danger'} label={entry.result} />,
          }))}
        />
      </section>
    </div>
  );
}
