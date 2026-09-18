import { useId } from 'react';

export function Gauge({ percent, label, toneClassName = 'fill-aqua' }: { percent: number; label: string; toneClassName?: string }) {
  const clamped = Math.max(0, Math.min(100, percent));
  const fillY = 100 - clamped;
  const clipId = useId();
  return (
    <div className="flex flex-col items-center gap-2">
      <svg width="48" height="112" viewBox="0 0 48 112" aria-label={`${label}: ${clamped}%`}>
        <rect x="4" y="4" width="40" height="100" rx="16" fill="none" className="stroke-steel" strokeOpacity="0.35" strokeWidth="2" />
        <clipPath id={`gauge-clip-${clipId}`}>
          <rect x="4" y="4" width="40" height="100" rx="16" />
        </clipPath>
        <rect
          x="4"
          y={4 + fillY}
          width="40"
          height={100 - fillY}
          className={toneClassName}
          clipPath={`url(#gauge-clip-${clipId})`}
        />
      </svg>
      <span className="font-mono text-sm text-mist">{clamped}%</span>
      <span className="font-body text-xs text-steel text-center">{label}</span>
    </div>
  );
}
