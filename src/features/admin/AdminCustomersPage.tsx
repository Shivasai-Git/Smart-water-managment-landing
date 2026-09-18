// src/features/admin/AdminCustomersPage.tsx
import { adminCustomers } from '../../data/fixtures/admin';
import { DataTable } from '../../components/ui/DataTable';
import { StatusPill } from '../../components/ui/StatusPill';
import type { AdminCustomer } from '../../data/types';

const STATUS_TONE: Record<AdminCustomer['status'], 'good' | 'attention' | 'danger'> = {
  active: 'good',
  pending: 'attention',
  suspended: 'danger',
};

export default function AdminCustomersPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-display text-2xl text-mist">Customers & Properties</h1>
      <section className="rounded-2xl border border-steel/20 bg-ink2 p-5">
        <DataTable
          columns={[
            { key: 'name', label: 'Customer' },
            { key: 'property', label: 'Property' },
            { key: 'status', label: 'Status' },
            { key: 'devices', label: 'Devices' },
            { key: 'joined', label: 'Joined' },
          ]}
          rows={adminCustomers.map((c) => ({
            name: c.name,
            property: c.propertyName,
            status: <StatusPill tone={STATUS_TONE[c.status]} label={c.status} />,
            devices: c.deviceCount,
            joined: c.joinedAt,
          }))}
        />
      </section>
    </div>
  );
}
