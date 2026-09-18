// src/features/devices/DevicesPage.tsx
import { devices } from '../../data/fixtures/devices';
import { DataTable } from '../../components/ui/DataTable';
import { StatusPill } from '../../components/ui/StatusPill';
import { IconPlus } from '../../components/ui/icons';
import type { DeviceStatus } from '../../data/types';

const STATUS_TONE: Record<DeviceStatus, 'good' | 'attention' | 'danger'> = {
  online: 'good',
  attention: 'attention',
  offline: 'danger',
};

export default function DevicesPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl text-mist">Devices & Settings</h1>
        <button type="button" className="flex items-center gap-1.5 rounded-lg bg-ink2 border border-steel/30 text-mist text-sm px-3 py-2 hover:border-aqua/50 transition-colors">
          <IconPlus size={14} /> Add device
        </button>
      </div>

      <section className="rounded-2xl border border-steel/20 bg-ink2 p-5">
        <DataTable
          columns={[
            { key: 'label', label: 'Device' },
            { key: 'type', label: 'Type' },
            { key: 'status', label: 'Status' },
            { key: 'lastSeen', label: 'Last seen' },
            { key: 'firmware', label: 'Firmware' },
          ]}
          rows={devices.map((d) => ({
            label: <><span className="text-mist">{d.label}</span><br /><span className="text-xs text-steel">{d.id}</span></>,
            type: d.type,
            status: <StatusPill tone={STATUS_TONE[d.status]} label={d.status} />,
            lastSeen: d.lastSeen,
            firmware: d.firmwareVersion,
          }))}
        />
      </section>
    </div>
  );
}
