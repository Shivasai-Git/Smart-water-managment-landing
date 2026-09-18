import type { ReactNode } from 'react';

/** Building blocks that reproduce the Stitch "Hydro Architect" page furniture used by the exported screens. */

export function TopBar({ crumb = 'Founder residence', code = 'FR-0814', onMenu }: { crumb?: string; code?: string; onMenu?: () => void }) {
  return (
    <header className="sticky top-4 mt-4 h-16 bg-surface-container-lowest/80 backdrop-blur-xl rounded-3xl shadow-[0_4px_24px_rgba(0,0,0,0.03)] z-40 px-4 sm:px-6 flex items-center justify-between gap-3">
      <div className="flex items-center gap-3 min-w-0">
        {onMenu && (
          <button
            type="button"
            onClick={onMenu}
            aria-label="Open navigation"
            className="lg:hidden w-9 h-9 shrink-0 rounded-full bg-surface-container-low flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">menu</span>
          </button>
        )}
        <div className="flex items-center gap-2 font-body-md text-body-md text-on-surface-variant min-w-0">
          <span className="hidden sm:inline text-on-surface-variant">Installation</span>
          <span className="hidden sm:inline material-symbols-outlined text-[16px]">chevron_right</span>
          <span className="font-medium text-on-surface truncate">{crumb}</span>
        </div>
        <span className="hidden sm:inline px-2.5 py-0.5 rounded-full font-body-sm text-body-sm bg-surface-container text-on-surface-variant font-mono">{code}</span>
      </div>
      <div className="flex items-center gap-3 sm:gap-4 shrink-0">
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary-container/20 text-on-secondary-container font-body-sm text-body-sm font-medium">
          <span className="w-2 h-2 rounded-full bg-secondary"></span>
          <span>Gateway connected 98ms</span>
        </div>
        <button type="button" aria-label="Notifications" className="w-9 h-9 rounded-full bg-surface-container-low flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors">
          <span className="material-symbols-outlined text-[20px]">notifications</span>
        </button>
        <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center" aria-hidden="true">
          <span className="material-symbols-outlined text-on-primary text-[20px]">person</span>
        </div>
      </div>
    </header>
  );
}

export function Page({
  eyebrow,
  title,
  subtitle,
  actions,
  children,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  actions?: ReactNode;
  children: ReactNode;
}) {
  return (
    <>
      <main className="w-full pt-8 pb-12">
        <div className="flex flex-col w-full space-y-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                <span className="font-label-uppercase text-label-uppercase tracking-widest text-on-surface-variant uppercase">{eyebrow}</span>
              </div>
              <h1 className="font-headline-xl text-headline-xl text-on-surface tracking-tight">{title}</h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant mt-1">{subtitle}</p>
            </div>
            {actions && <div className="flex flex-wrap items-center gap-3">{actions}</div>}
          </div>
          {children}
        </div>
      </main>
    </>
  );
}

export const CARD = 'p-6 bg-surface-container-lowest rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.04)]';

export function Card({ className = '', children }: { className?: string; children: ReactNode }) {
  return <div className={`${CARD} ${className}`}>{children}</div>;
}

export function CardTitle({ eyebrow, title, right }: { eyebrow?: string; title: string; right?: ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-4 mb-6">
      <div>
        {eyebrow && <span className="font-label-uppercase text-label-uppercase uppercase text-on-surface-variant tracking-wider">{eyebrow}</span>}
        <h2 className="font-headline-sm text-headline-sm text-on-surface tracking-tight">{title}</h2>
      </div>
      {right}
    </div>
  );
}

export function Metric({ label, value, unit, note, icon }: { label: string; value: string; unit?: string; note?: string; icon: string }) {
  return (
    <div className={`${CARD} flex flex-col justify-between group hover:shadow-[0_16px_40px_rgba(0,0,0,0.06)] transition-all duration-300`}>
      <div className="flex items-start justify-between">
        <div>
          <span className="font-label-uppercase text-label-uppercase uppercase text-on-surface-variant tracking-wider">{label}</span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="font-label-metric text-label-metric text-on-surface font-semibold tracking-tight">{value}</span>
            {unit && <span className="font-body-md text-body-md text-on-surface-variant font-medium">{unit}</span>}
          </div>
        </div>
        <div className="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-colors">
          <span className="material-symbols-outlined text-[20px]">{icon}</span>
        </div>
      </div>
      {note && <p className="mt-6 font-body-sm text-body-sm text-on-surface-variant">{note}</p>}
    </div>
  );
}

const TONES = {
  nominal: 'bg-secondary-container/20 text-on-secondary-container',
  advisory: 'bg-amber-500/10 text-amber-600',
  critical: 'bg-error-container text-on-error-container',
  neutral: 'bg-surface-container text-on-surface-variant',
} as const;
const DOTS = { nominal: 'bg-secondary', advisory: 'bg-amber-500', critical: 'bg-error', neutral: 'bg-outline' } as const;

export function Jewel({ tone = 'nominal', children }: { tone?: keyof typeof TONES; children: ReactNode }) {
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full font-body-sm text-body-sm font-medium ${TONES[tone]}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${DOTS[tone]}`}></span>
      {children}
    </span>
  );
}

export const BTN_PRIMARY = 'inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-on-primary font-label-button text-label-button hover:opacity-90 active:scale-[0.98] transition-all duration-200';
export const BTN_SECONDARY = 'inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-surface-container-lowest text-on-surface hover:bg-surface-container-high transition-all duration-200 shadow-[0_8px_30px_rgba(0,0,0,0.04)] font-label-button text-label-button';

export function Icon({ name, size = 18 }: { name: string; size?: number }) {
  return (
    <span className="material-symbols-outlined" style={{ fontSize: size }}>
      {name}
    </span>
  );
}

export function Table({ head, children }: { head: string[]; children: ReactNode }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-surface-container">
            {head.map((h) => (
              <th key={h} className="pb-3 pr-4 font-label-uppercase text-label-uppercase uppercase text-on-surface-variant tracking-wider whitespace-nowrap">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-surface-container">{children}</tbody>
      </table>
    </div>
  );
}

export const TD = 'py-3.5 pr-4 font-body-md text-body-md text-on-surface align-middle';
