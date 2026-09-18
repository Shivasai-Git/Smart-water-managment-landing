import type { QualityMetric } from '../types';

export const qualityMetrics: QualityMetric[] = [
  { id: 'q-ph', label: 'pH', value: 7.2, unit: '', targetRange: '6.5 – 8.5', status: 'good', timestamp: '2026-09-18T08:10:00+05:30', dataSource: 'simulated' },
  { id: 'q-tds', label: 'TDS', value: 340, unit: 'ppm', targetRange: '0 – 500 ppm', status: 'good', timestamp: '2026-09-18T08:10:00+05:30', dataSource: 'simulated' },
  { id: 'q-turbidity', label: 'Turbidity', value: 1.8, unit: 'NTU', targetRange: '0 – 5 NTU', status: 'good', timestamp: '2026-09-18T08:10:00+05:30', dataSource: 'simulated' },
  { id: 'q-temp', label: 'Temperature', value: 26.4, unit: '°C', targetRange: '20 – 30°C', status: 'good', timestamp: '2026-09-18T08:10:00+05:30', dataSource: 'simulated' },
];

export const calibrationReminder = {
  deviceLabel: 'Inlet quality probe (WQ-INL-01)',
  dueInDays: 12,
};
