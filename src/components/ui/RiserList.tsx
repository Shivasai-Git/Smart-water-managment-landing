import type { Section, SectionId } from '../../data/types';
import { StatusPill } from './StatusPill';

const STATUS_TONE: Record<Section['status'], 'good' | 'attention' | 'danger' | 'idle'> = {
  nominal: 'good',
  idle: 'idle',
  attention: 'danger',
  offline: 'attention',
};

const STATUS_LABEL: Record<Section['status'], string> = {
  nominal: 'Nominal',
  idle: 'Idle',
  attention: 'Possible leak',
  offline: 'Offline',
};

export function RiserList({ sections, onSelect }: { sections: Section[]; onSelect?: (id: SectionId) => void }) {
  return (
    <ul className="relative pl-6">
      <span aria-hidden="true" className="absolute left-2 top-2 bottom-2 w-px bg-steel/30" />
      {sections.map((s) => (
        <li key={s.id} className="relative py-2.5">
          <span aria-hidden="true" className="absolute -left-4 top-1/2 -translate-y-1/2 w-3 border-t border-steel/40" />
          <button
            type="button"
            onClick={() => onSelect?.(s.id)}
            className="w-full flex items-center justify-between gap-3 rounded-lg px-3 py-2 text-left hover:bg-ink2 transition-colors"
          >
            <span className="font-body text-sm text-mist">{s.name}</span>
            <span className="flex items-center gap-3">
              <span className="font-mono text-sm text-steel">{s.flowLpm.toFixed(1)} L/min</span>
              <StatusPill tone={STATUS_TONE[s.status]} label={STATUS_LABEL[s.status]} />
            </span>
          </button>
        </li>
      ))}
    </ul>
  );
}
