import { baselineAlerts, leakAlert } from '../../data/fixtures/alerts';
import { Card, CardTitle, Jewel, Page, TD, Table } from '../app-shell/m3';

const SEVERITY = { low: 'neutral', medium: 'advisory', high: 'critical' } as const;
const ALERTS = [leakAlert, ...baselineAlerts].map((a) => (a.id === leakAlert.id ? { ...a, status: 'resolved' as const, openedAt: '2026-09-18T08:16:00+05:30' } : a));

export default function AdminAlertsPage() {
  return (
    <Page
      eyebrow="Admin Console • Operations"
      title="System Alerts"
      subtitle="Alerts raised across every property, newest first."
    >
      <Card>
        <CardTitle eyebrow="Feed" title={`${ALERTS.length} alerts`} />
        <Table head={['Alert', 'Section', 'Severity', 'Opened', 'Status']}>
          {ALERTS.map((a) => (
            <tr key={a.id}>
              <td className={TD}>
                <p className="font-medium">{a.title}</p>
                <p className="font-body-sm text-body-sm text-on-surface-variant max-w-md">{a.evidence}</p>
              </td>
              <td className={`${TD} text-on-surface-variant`}>{a.sectionId}</td>
              <td className={TD}>
                <Jewel tone={SEVERITY[a.severity]}>{a.severity}</Jewel>
              </td>
              <td className={`${TD} text-on-surface-variant whitespace-nowrap`}>{a.openedAt ? new Date(a.openedAt).toLocaleString() : '—'}</td>
              <td className={TD}>
                <Jewel tone={a.status === 'resolved' ? 'nominal' : 'advisory'}>{a.status}</Jewel>
              </td>
            </tr>
          ))}
        </Table>
      </Card>
    </Page>
  );
}
