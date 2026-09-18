import type { Alert } from '../types';

export const baselineAlerts: Alert[] = [
  {
    id: 'alert-01',
    sectionId: 'bathroom-3',
    severity: 'medium',
    status: 'open',
    title: 'Bathroom 3 sensor offline',
    evidence: 'No telemetry from FS-BTH3-01 for 2 days.',
    openedAt: '2026-09-16T09:12:00+05:30',
    acknowledgedAt: null,
    resolvedAt: null,
    dataSource: 'simulated',
  },
];

export const leakAlert: Alert = {
  id: 'alert-leak-kitchen',
  sectionId: 'kitchen',
  severity: 'high',
  status: 'open',
  title: 'Possible leak — Kitchen line',
  evidence: 'Continuous flow of 42.8 L/min for 18 minutes during an expected low-use period. No corresponding fixture activity logged.',
  openedAt: '',
  acknowledgedAt: null,
  resolvedAt: null,
  dataSource: 'simulated',
};
