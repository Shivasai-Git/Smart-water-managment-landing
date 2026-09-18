import { IconCheck, IconAlertTriangle, IconRadio } from './icons';

type Tone = 'good' | 'attention' | 'danger' | 'idle';

const TONE_STYLES: Record<Tone, string> = {
  good: 'bg-good/10 text-good border-good/30',
  attention: 'bg-saffron/10 text-saffron border-saffron/30',
  danger: 'bg-danger/10 text-danger border-danger/30',
  idle: 'bg-steel/10 text-steel border-steel/30',
};

export function StatusPill({ tone, label }: { tone: Tone; label: string }) {
  const Icon = tone === 'danger' || tone === 'attention' ? IconAlertTriangle : tone === 'good' ? IconCheck : IconRadio;
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-body font-medium ${TONE_STYLES[tone]}`}>
      <Icon size={12} />
      {label}
    </span>
  );
}
