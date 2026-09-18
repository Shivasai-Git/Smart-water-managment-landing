import { useState } from 'react';
import { devices } from '../../data/fixtures/devices';
import type { Device, DeviceStatus } from '../../data/types';
import { BTN_PRIMARY, Card, CardTitle, Icon, Jewel, Page, TD, Table } from '../app-shell/m3';

const TYPE_ICON: Record<Device['type'], string> = {
  'flow-sensor': 'water',
  'tank-level': 'propane_tank',
  'quality-probe': 'sanitizer',
  'valve-controller': 'tune',
  'pump-controller': 'mode_fan',
  gateway: 'router',
};
const STATUS: Record<DeviceStatus, { tone: 'nominal' | 'advisory' | 'critical'; label: string }> = {
  online: { tone: 'nominal', label: 'Online' },
  attention: { tone: 'advisory', label: 'Attention' },
  offline: { tone: 'critical', label: 'Offline' },
};

function Toggle({ label, hint, defaultOn = true }: { label: string; hint: string; defaultOn?: boolean }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <div className="flex items-center justify-between gap-4 py-3">
      <div>
        <p className="font-body-md text-body-md text-on-surface font-medium">{label}</p>
        <p className="font-body-sm text-body-sm text-on-surface-variant">{hint}</p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={on}
        aria-label={label}
        onClick={() => setOn(!on)}
        className={`relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors focus:outline-none ${on ? 'bg-secondary' : 'bg-surface-container-highest'}`}
      >
        <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-surface-container-lowest transition-transform ${on ? 'translate-x-4' : 'translate-x-1'}`}></span>
      </button>
    </div>
  );
}

function Threshold({ label, unit, min, max, initial }: { label: string; unit: string; min: number; max: number; initial: number }) {
  const [v, setV] = useState(initial);
  return (
    <div className="py-3 space-y-2">
      <div className="flex justify-between font-body-md text-body-md">
        <span className="text-on-surface font-medium">{label}</span>
        <span className="font-semibold text-on-surface">
          {v} {unit}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={v}
        aria-label={label}
        onChange={(e) => setV(Number(e.target.value))}
        className="w-full h-2 bg-surface-container-highest rounded-full appearance-none cursor-pointer accent-primary"
      />
    </div>
  );
}

export default function DevicesPage() {
  const online = devices.filter((d) => d.status === 'online').length;
  return (
    <Page
      eyebrow="Intelligence • Fleet & Preferences"
      title="Devices & Settings"
      subtitle="Inventory of connected hardware and the rules that govern alerts."
      actions={
        <button type="button" className={BTN_PRIMARY}>
          <Icon name="add" />
          <span>Add device</span>
        </button>
      }
    >
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <Card className="xl:col-span-2">
          <CardTitle
            eyebrow="Inventory"
            title={`${devices.length} devices`}
            right={<Jewel tone={online === devices.length ? 'nominal' : 'advisory'}>{online} online</Jewel>}
          />
          <Table head={['Device', 'ID', 'Firmware', 'Last seen', 'Status']}>
            {devices.map((d) => (
              <tr key={d.id}>
                <td className={TD}>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-surface-container-low flex items-center justify-center text-primary shrink-0">
                      <Icon name={TYPE_ICON[d.type]} size={18} />
                    </div>
                    <span className="font-medium">{d.label}</span>
                  </div>
                </td>
                <td className={`${TD} font-mono text-on-surface-variant`}>{d.id}</td>
                <td className={`${TD} text-on-surface-variant`}>v{d.firmwareVersion}</td>
                <td className={`${TD} text-on-surface-variant whitespace-nowrap`}>{d.lastSeen}</td>
                <td className={TD}>
                  <Jewel tone={STATUS[d.status].tone}>{STATUS[d.status].label}</Jewel>
                </td>
              </tr>
            ))}
          </Table>
        </Card>

        <div className="flex flex-col gap-6">
          <Card>
            <CardTitle eyebrow="Alerts" title="Notifications" />
            <div className="divide-y divide-surface-container">
              <Toggle label="Leak detected" hint="Push + SMS the moment flow persists" />
              <Toggle label="Low tank level" hint="Notify below the threshold" />
              <Toggle label="Quality drift" hint="pH, TDS or turbidity out of range" />
              <Toggle label="Weekly digest" hint="Monday summary by email" defaultOn={false} />
            </div>
          </Card>
          <Card>
            <CardTitle eyebrow="Rules" title="Thresholds" />
            <div className="divide-y divide-surface-container">
              <Threshold label="Continuous-flow leak trigger" unit="min" min={5} max={60} initial={15} />
              <Threshold label="Tank low-level warning" unit="%" min={10} max={50} initial={25} />
            </div>
          </Card>
          <Card>
            <CardTitle eyebrow="Household" title="Account & privacy" />
            <dl className="space-y-3 font-body-md text-body-md">
              <div className="flex justify-between">
                <dt className="text-on-surface-variant">Owner</dt>
                <dd className="text-on-surface font-medium">L. Pranay Kumar Goud</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-on-surface-variant">Property</dt>
                <dd className="text-on-surface font-medium">Founder residence</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-on-surface-variant">Data</dt>
                <dd className="text-on-surface font-medium">Stays in this browser (demo)</dd>
              </div>
            </dl>
          </Card>
        </div>
      </div>
    </Page>
  );
}
