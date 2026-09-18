import { adminCustomers } from '../../data/fixtures/admin';
import { BTN_PRIMARY, Card, CardTitle, Icon, Jewel, Page, TD, Table } from '../app-shell/m3';

const TONE = { active: 'nominal', pending: 'advisory', suspended: 'critical' } as const;

export default function AdminCustomersPage() {
  return (
    <Page
      eyebrow="Admin Console • Accounts"
      title="Customers & Properties"
      subtitle="Every household, the property it owns and the hardware assigned to it."
      actions={
        <button type="button" className={BTN_PRIMARY}>
          <Icon name="person_add" />
          <span>Register property</span>
        </button>
      }
    >
      <Card>
        <CardTitle eyebrow="Directory" title={`${adminCustomers.length} customers`} />
        <Table head={['Customer', 'Property', 'Devices', 'Joined', 'Status']}>
          {adminCustomers.map((c) => (
            <tr key={c.id}>
              <td className={TD}>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-primary text-on-primary flex items-center justify-center font-label-button text-label-button">
                    {c.name
                      .split(' ')
                      .map((p) => p[0])
                      .slice(0, 2)
                      .join('')}
                  </div>
                  <div>
                    <p className="font-medium">{c.name}</p>
                    <p className="font-mono text-[11px] text-on-surface-variant">{c.id}</p>
                  </div>
                </div>
              </td>
              <td className={TD}>{c.propertyName}</td>
              <td className={TD}>{c.deviceCount}</td>
              <td className={`${TD} text-on-surface-variant`}>{c.joinedAt}</td>
              <td className={TD}>
                <Jewel tone={TONE[c.status]}>{c.status}</Jewel>
              </td>
            </tr>
          ))}
        </Table>
      </Card>
    </Page>
  );
}
