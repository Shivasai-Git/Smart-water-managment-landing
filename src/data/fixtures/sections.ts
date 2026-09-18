import type { Section, SectionId } from '../types';

export const sections: Section[] = [
  { id: 'kitchen', name: 'Kitchen', flowLpm: 4.6, status: 'nominal', valveState: 'auto', lastEventAt: null, dataSource: 'simulated' },
  { id: 'bathroom-1', name: 'Bathroom 1', flowLpm: 0, status: 'idle', valveState: 'auto', lastEventAt: null, dataSource: 'simulated' },
  { id: 'bathroom-2', name: 'Bathroom 2', flowLpm: 0, status: 'idle', valveState: 'auto', lastEventAt: null, dataSource: 'simulated' },
  { id: 'bathroom-3', name: 'Bathroom 3', flowLpm: 0, status: 'offline', valveState: 'auto', lastEventAt: '2026-09-16T09:12:00+05:30', dataSource: 'simulated' },
  { id: 'washing-area', name: 'Washing Area', flowLpm: 6.1, status: 'nominal', valveState: 'auto', lastEventAt: null, dataSource: 'simulated' },
  { id: 'garden', name: 'Garden', flowLpm: 0, status: 'idle', valveState: 'closed', lastEventAt: null, dataSource: 'simulated' },
  { id: 'parking', name: 'Parking', flowLpm: 0, status: 'idle', valveState: 'auto', lastEventAt: null, dataSource: 'simulated' },
];

export function sectionById(id: SectionId): Section | undefined {
  return sections.find((s) => s.id === id);
}
