import type { AdminCustomer, AuditLogEntry } from '../types';

export const adminCustomers: AdminCustomer[] = [
  { id: 'cust-01', name: 'L. Pranay Kumar Goud', propertyName: 'Founder residence', status: 'active', deviceCount: 13, joinedAt: '2026-06-02', dataSource: 'simulated' },
  { id: 'cust-02', name: 'Asha Reddy', propertyName: 'Lakeview apartment', status: 'active', deviceCount: 9, joinedAt: '2026-07-14', dataSource: 'simulated' },
  { id: 'cust-03', name: 'Vikram Shah', propertyName: 'Whitefield villa', status: 'pending', deviceCount: 0, joinedAt: '2026-09-10', dataSource: 'simulated' },
];

export const auditLog: AuditLogEntry[] = [
  { id: 'audit-01', actor: 'admin:priya.k', action: 'Assigned device VC-KIT-01', target: 'cust-01', timestamp: '2026-09-17T11:02:00+05:30', result: 'success', dataSource: 'simulated' },
  { id: 'audit-02', actor: 'customer:cust-01', action: 'Requested close valve VC-KIT-01', target: 'VC-KIT-01', timestamp: '2026-09-18T08:16:00+05:30', result: 'success', dataSource: 'simulated' },
  { id: 'audit-03', actor: 'admin:priya.k', action: 'Registered property Whitefield villa', target: 'cust-03', timestamp: '2026-09-10T14:20:00+05:30', result: 'success', dataSource: 'simulated' },
];
