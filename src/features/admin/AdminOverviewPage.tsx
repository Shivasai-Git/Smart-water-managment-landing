// src/features/admin/AdminOverviewPage.tsx
import { adminCustomers } from '../../data/fixtures/admin';
import { devices } from '../../data/fixtures/devices';
import { baselineAlerts } from '../../data/fixtures/alerts';
import { MetricReadout } from '../../components/ui/MetricReadout';

export default function AdminOverviewPage() {
  const onlineDevices = devices.filter((d) => d.status === 'online').length;

  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-display text-2xl text-mist">Overview</h1>
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-steel/20 bg-ink2 p-4">
          <MetricReadout label="Active customers" value={adminCustomers.filter((c) => c.status === 'active').length} />
        </div>
        <div className="rounded-2xl border border-steel/20 bg-ink2 p-4">
          <MetricReadout label="Devices online" value={`${onlineDevices}/${devices.length}`} />
        </div>
        <div className="rounded-2xl border border-steel/20 bg-ink2 p-4">
          <MetricReadout label="Open system alerts" value={baselineAlerts.length} />
        </div>
        <div className="rounded-2xl border border-steel/20 bg-ink2 p-4">
          <MetricReadout label="Pending onboarding" value={adminCustomers.filter((c) => c.status === 'pending').length} />
        </div>
      </section>
    </div>
  );
}
