import type { SensorReading } from '../types';

export const sumpLevel: SensorReading = {
  id: 'reading-sump-01',
  deviceId: 'TL-SUMP-01',
  metric: 'tank-level-percent',
  value: 68,
  unit: '%',
  timestamp: '2026-09-18T08:14:00+05:30',
  qualityFlag: 'good',
  dataSource: 'simulated',
};

export const overheadTankLevel: SensorReading = {
  id: 'reading-oht-01',
  deviceId: 'TL-OHT-01',
  metric: 'tank-level-percent',
  value: 82,
  unit: '%',
  timestamp: '2026-09-18T08:14:00+05:30',
  qualityFlag: 'good',
  dataSource: 'simulated',
};

export const tankThresholds = {
  lowPercent: 20,
  highPercent: 95,
};
