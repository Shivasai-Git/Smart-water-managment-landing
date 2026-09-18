// src/features/sections/SectionDetailPage.tsx
import { Link, useParams } from 'react-router-dom';
import { useScenario } from '../../state/scenario';
import { StatusPill } from '../../components/ui/StatusPill';
import { MetricReadout } from '../../components/ui/MetricReadout';
import type { Section } from '../../data/types';

const STATUS_TONE: Record<Section['status'], 'good' | 'attention' | 'danger' | 'idle'> = {
  nominal: 'good',
  idle: 'idle',
  attention: 'danger',
  offline: 'attention',
};

export default function SectionDetailPage() {
  const { sectionId } = useParams<{ sectionId: string }>();
  const { sections } = useScenario();
  const section = sections.find((s) => s.id === sectionId);

  if (!section) {
    return (
      <div className="flex flex-col gap-4">
        <p className="font-body text-sm text-steel">Section not found.</p>
        <Link to="/app/sections" className="font-body text-sm text-aqua">Back to My Home</Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <Link to="/app/sections" className="font-body text-sm text-steel hover:text-mist transition-colors w-fit">
        ← Back to My Home
      </Link>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl text-mist">{section.name}</h1>
        <StatusPill tone={STATUS_TONE[section.status]} label={section.status === 'attention' ? 'Possible leak' : section.status} />
      </div>
      <section className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="rounded-2xl border border-steel/20 bg-ink2 p-4">
          <MetricReadout label="Current flow" value={section.flowLpm.toFixed(1)} unit="L/min" />
        </div>
        <div className="rounded-2xl border border-steel/20 bg-ink2 p-4">
          <MetricReadout label="Valve state" value={section.valveState} />
        </div>
        <div className="rounded-2xl border border-steel/20 bg-ink2 p-4">
          <MetricReadout label="Last event" value={section.lastEventAt ? new Date(section.lastEventAt).toLocaleString() : 'None'} />
        </div>
      </section>
      <section className="rounded-2xl border border-steel/20 bg-ink2 p-5">
        <h2 className="font-display text-base text-mist mb-2">Usage history</h2>
        <p className="font-body text-sm text-steel">Historical trend charts for this section will appear here once at least 24 hours of simulated readings have accumulated.</p>
      </section>
    </div>
  );
}
