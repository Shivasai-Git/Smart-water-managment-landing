import { auditLog } from '../../data/fixtures/admin';
import { Card, CardTitle, Jewel, Page, TD, Table } from '../app-shell/m3';

export default function AdminAuditPage() {
  return (
    <Page
      eyebrow="Admin Console • Operations"
      title="Audit Trail"
      subtitle="Who did what, to which target, and whether it succeeded."
    >
      <Card>
        <CardTitle eyebrow="Immutable log" title={`${auditLog.length} entries`} />
        <Table head={['Time', 'Actor', 'Action', 'Target', 'Result']}>
          {auditLog.map((e) => (
            <tr key={e.id}>
              <td className={`${TD} text-on-surface-variant whitespace-nowrap`}>{new Date(e.timestamp).toLocaleString()}</td>
              <td className={`${TD} font-mono`}>{e.actor}</td>
              <td className={TD}>{e.action}</td>
              <td className={`${TD} font-mono text-on-surface-variant`}>{e.target}</td>
              <td className={TD}>
                <Jewel tone={e.result === 'success' ? 'nominal' : 'critical'}>{e.result}</Jewel>
              </td>
            </tr>
          ))}
        </Table>
      </Card>
    </Page>
  );
}
