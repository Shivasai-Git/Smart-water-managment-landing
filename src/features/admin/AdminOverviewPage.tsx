import { Link } from 'react-router-dom';
import { adminCustomers, auditLog } from '../../data/fixtures/admin';
import { devices } from '../../data/fixtures/devices';
import { baselineAlerts } from '../../data/fixtures/alerts';
import { BTN_SECONDARY, Card, CardTitle, Icon, Jewel, Metric, Page } from '../app-shell/m3';

export default function AdminOverviewPage() {
  const online = devices.filter((d) => d.status === 'online').length;
  return (
    <Page
      eyebrow="Admin Console • Fleet"
      title="Fleet Overview"
      subtitle="Health of every installation under management."
      actions={
        <Link to="/admin/customers" className={BTN_SECONDARY}>
          <Icon name="groups" />
          <span>Manage customers</span>
        </Link>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <Metric label="Customers" value={String(adminCustomers.length)} icon="groups" note={`${adminCustomers.filter((c) => c.status === 'active').length} active`} />
        <Metric label="Devices online" value={`${online}/${devices.length}`} icon="memory" note="Across all properties" />
        <Metric label="Open alerts" value={String(baselineAlerts.length)} icon="notification_important" note="1 medium severity" />
        <Metric label="Commands (24h)" value="1" icon="terminal" note="100% acknowledged" />
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <Card>
          <CardTitle eyebrow="Recent" title="Audit activity" right={<Link to="/admin/audit" className="font-label-button text-label-button text-on-surface-variant hover:text-on-surface">View all</Link>} />
          <ul className="divide-y divide-surface-container">
            {auditLog.map((e) => (
              <li key={e.id} className="py-3 first:pt-0 last:pb-0 flex items-start justify-between gap-4">
                <div>
                  <p className="font-body-md text-body-md text-on-surface font-medium">{e.action}</p>
                  <p className="font-mono text-[11px] text-on-surface-variant">{e.actor}</p>
                </div>
                <Jewel tone={e.result === 'success' ? 'nominal' : 'critical'}>{e.result}</Jewel>
              </li>
            ))}
          </ul>
        </Card>
        <Card>
          <CardTitle eyebrow="Attention" title="Open system alerts" right={<Link to="/admin/alerts" className="font-label-button text-label-button text-on-surface-variant hover:text-on-surface">View all</Link>} />
          <ul className="divide-y divide-surface-container">
            {baselineAlerts.map((a) => (
              <li key={a.id} className="py-3 first:pt-0 last:pb-0 flex items-start justify-between gap-4">
                <div>
                  <p className="font-body-md text-body-md text-on-surface font-medium">{a.title}</p>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">{a.evidence}</p>
                </div>
                <Jewel tone="advisory">{a.severity}</Jewel>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </Page>
  );
}
