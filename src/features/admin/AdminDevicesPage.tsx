import { devices } from '../../data/fixtures/devices';
import type { DeviceStatus } from '../../data/types';
import { Card, CardTitle, Jewel, Metric, Page, TD, Table } from '../app-shell/m3';

const TONE: Record<DeviceStatus, 'nominal' | 'advisory' | 'critical'> = { online: 'nominal', attention: 'advisory', offline: 'critical' };

export default function AdminDevicesPage() {
  const count = (s: DeviceStatus) => devices.filter((d) => d.status === s).length;
  return (
    <Page
      eyebrow="Admin Console • Hardware"
      title="Devices"
      subtitle="Every sensor, controller and gateway registered to the fleet."
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Metric label="Online" value={String(count('online'))} icon="check_circle" note="Reporting normally" />
        <Metric label="Attention" value={String(count('attention'))} icon="warning" note="Controller degraded" />
        <Metric label="Offline" value={String(count('offline'))} icon="cloud_off" note="No telemetry" />
      </div>
      <Card>
        <CardTitle eyebrow="Registry" title="All devices" />
        <Table head={['ID', 'Label', 'Type', 'Firmware', 'Last seen', 'Status']}>
          {devices.map((d) => (
            <tr key={d.id}>
              <td className={`${TD} font-mono`}>{d.id}</td>
              <td className={TD}>{d.label}</td>
              <td className={`${TD} text-on-surface-variant`}>{d.type}</td>
              <td className={`${TD} text-on-surface-variant`}>v{d.firmwareVersion}</td>
              <td className={`${TD} text-on-surface-variant whitespace-nowrap`}>{d.lastSeen}</td>
              <td className={TD}>
                <Jewel tone={TONE[d.status]}>{d.status}</Jewel>
              </td>
            </tr>
          ))}
        </Table>
      </Card>
    </Page>
  );
}
