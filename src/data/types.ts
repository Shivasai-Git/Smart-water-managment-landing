export type SectionId =
  | 'bathroom-1'
  | 'bathroom-2'
  | 'bathroom-3'
  | 'kitchen'
  | 'washing-area'
  | 'parking'
  | 'garden';

export interface Section {
  id: SectionId;
  name: string;
  flowLpm: number;
  status: 'nominal' | 'idle' | 'attention' | 'offline';
  valveState: 'open' | 'closed' | 'auto';
  lastEventAt: string | null;
  dataSource: 'simulated';
}

export interface Property {
  id: string;
  name: string;
  ownerName: string;
  timezone: string;
  dataSource: 'simulated';
}

export type DeviceStatus = 'online' | 'offline' | 'attention';

export interface Device {
  id: string;
  type: 'flow-sensor' | 'tank-level' | 'quality-probe' | 'valve-controller' | 'pump-controller' | 'gateway';
  label: string;
  sectionId: SectionId | null;
  status: DeviceStatus;
  lastSeen: string;
  firmwareVersion: string;
  dataSource: 'simulated';
}

export interface SensorReading {
  id: string;
  deviceId: string;
  metric: string;
  value: number;
  unit: string;
  timestamp: string;
  qualityFlag: 'good' | 'stale' | 'fault';
  dataSource: 'simulated';
}

export type AlertSeverity = 'low' | 'medium' | 'high';
export type AlertStatus = 'open' | 'acknowledged' | 'resolved';

export interface Alert {
  id: string;
  sectionId: SectionId;
  severity: AlertSeverity;
  status: AlertStatus;
  title: string;
  evidence: string;
  openedAt: string;
  acknowledgedAt: string | null;
  resolvedAt: string | null;
  dataSource: 'simulated';
}

export type CommandStatus = 'pending' | 'acknowledged' | 'failed' | 'timed-out';

export interface Command {
  id: string;
  targetId: string;
  action: 'open-valve' | 'close-valve' | 'start-pump' | 'stop-pump';
  requestedBy: string;
  requestedAt: string;
  status: CommandStatus;
  acknowledgedAt: string | null;
  failureReason: string | null;
  dataSource: 'simulated';
}

export interface PumpRun {
  id: string;
  pumpId: string;
  startedAt: string;
  stoppedAt: string | null;
  durationMinutes: number | null;
  stopReason: string | null;
  fault: boolean;
  dataSource: 'simulated';
}

export interface AuditLogEntry {
  id: string;
  actor: string;
  action: string;
  target: string;
  timestamp: string;
  result: 'success' | 'failed';
  dataSource: 'simulated';
}

export interface QualityMetric {
  id: string;
  label: string;
  value: number;
  unit: string;
  targetRange: string;
  status: 'good' | 'attention';
  timestamp: string;
  dataSource: 'simulated';
}

export interface AdminCustomer {
  id: string;
  name: string;
  propertyName: string;
  status: 'active' | 'pending' | 'suspended';
  deviceCount: number;
  joinedAt: string;
  dataSource: 'simulated';
}
