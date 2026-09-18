// src/features/admin/AdminDevicesPage.tsx
import { devices } from '../../data/fixtures/devices';
import { DataTable } from '../../components/ui/DataTable';
import { StatusPill } from '../../components/ui/StatusPill';
import type { DeviceStatus } from '../../data/types';

const STATUS_TONE: Record<DeviceStatus, 'good' | 'attention' | 'danger'> = {
  online: 'good',
  attention: 'attention',
  offline: 'danger',
};

export default function AdminDevicesPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-display text-2xl text-mist">Devices</h1>
      <section className="rounded-2xl border border-steel/20 bg-ink2 p-5">
        <DataTable
          columns={[
            { key: 'id', label: 'Device ID' },
            { key: 'type', label: 'Type' },
            { key: 'status', label: 'Status' },
            { key: 'lastSeen', label: 'Last seen' },
          ]}
          rows={devices.map((d) => ({
            id: d.id,
            type: d.type,
            status: <StatusPill tone={STATUS_TONE[d.status]} label={d.status} />,
            lastSeen: d.lastSeen,
          }))}
        />
      </section>
    </div>
  );
}
