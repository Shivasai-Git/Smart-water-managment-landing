import type { Device } from '../types';

export const devices: Device[] = [
  { id: 'FS-KIT-01', type: 'flow-sensor', label: 'Kitchen flow sensor', sectionId: 'kitchen', status: 'online', lastSeen: '12 sec ago', firmwareVersion: '1.4.2', dataSource: 'simulated' },
  { id: 'FS-BTH1-01', type: 'flow-sensor', label: 'Bathroom 1 flow sensor', sectionId: 'bathroom-1', status: 'online', lastSeen: '18 sec ago', firmwareVersion: '1.4.2', dataSource: 'simulated' },
  { id: 'FS-BTH2-01', type: 'flow-sensor', label: 'Bathroom 2 flow sensor', sectionId: 'bathroom-2', status: 'online', lastSeen: '20 sec ago', firmwareVersion: '1.4.2', dataSource: 'simulated' },
  { id: 'FS-BTH3-01', type: 'flow-sensor', label: 'Bathroom 3 flow sensor', sectionId: 'bathroom-3', status: 'offline', lastSeen: '2 days ago', firmwareVersion: '1.3.9', dataSource: 'simulated' },
  { id: 'FS-WSH-01', type: 'flow-sensor', label: 'Washing area flow sensor', sectionId: 'washing-area', status: 'online', lastSeen: '9 sec ago', firmwareVersion: '1.4.2', dataSource: 'simulated' },
  { id: 'FS-GDN-01', type: 'flow-sensor', label: 'Garden flow sensor', sectionId: 'garden', status: 'online', lastSeen: '15 sec ago', firmwareVersion: '1.4.2', dataSource: 'simulated' },
  { id: 'FS-PRK-01', type: 'flow-sensor', label: 'Parking flow sensor', sectionId: 'parking', status: 'online', lastSeen: '11 sec ago', firmwareVersion: '1.4.2', dataSource: 'simulated' },
  { id: 'TL-SUMP-01', type: 'tank-level', label: 'Sump level sensor', sectionId: null, status: 'online', lastSeen: '6 sec ago', firmwareVersion: '1.2.0', dataSource: 'simulated' },
  { id: 'TL-OHT-01', type: 'tank-level', label: 'Overhead tank level sensor', sectionId: null, status: 'online', lastSeen: '6 sec ago', firmwareVersion: '1.2.0', dataSource: 'simulated' },
  { id: 'WQ-INL-01', type: 'quality-probe', label: 'Inlet quality probe', sectionId: null, status: 'online', lastSeen: '30 sec ago', firmwareVersion: '2.0.1', dataSource: 'simulated' },
  { id: 'VC-KIT-01', type: 'valve-controller', label: 'Kitchen valve controller', sectionId: 'kitchen', status: 'attention', lastSeen: '1 min ago', firmwareVersion: '1.1.5', dataSource: 'simulated' },
  { id: 'PC-MAIN-01', type: 'pump-controller', label: 'Main pump controller', sectionId: null, status: 'online', lastSeen: '4 sec ago', firmwareVersion: '1.5.0', dataSource: 'simulated' },
  { id: 'GW-HOME-01', type: 'gateway', label: 'Home gateway', sectionId: null, status: 'online', lastSeen: '2 sec ago', firmwareVersion: '3.1.0', dataSource: 'simulated' },
];
