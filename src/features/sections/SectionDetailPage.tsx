import { Link, useParams } from 'react-router-dom';
import { devices } from '../../data/fixtures/devices';
import { sections } from '../../data/fixtures/sections';
import type { Section } from '../../data/types';
import { BTN_SECONDARY, Card, CardTitle, Icon, Jewel, Metric, Page } from '../app-shell/m3';

const TONE: Record<Section['status'], 'nominal' | 'advisory' | 'critical' | 'neutral'> = {
  nominal: 'nominal',
  idle: 'neutral',
  attention: 'critical',
  offline: 'advisory',
};
const HOURLY = [4, 2, 1, 1, 2, 9, 18, 24, 12, 8, 6, 9, 14, 10, 7, 6, 9, 16, 22, 18, 12, 8, 5, 3];

export default function SectionDetailPage() {
  const { sectionId } = useParams<{ sectionId: string }>();
  const section = sections.find((s) => s.id === sectionId);

  if (!section) {
    return (
      <Page eyebrow="My Home" title="Section not found" subtitle="That section does not exist in this residence.">
        <Link to="/app/sections" className={`${BTN_SECONDARY} w-fit`}>
          <Icon name="arrow_back" />
          <span>Back to My Home</span>
        </Link>
      </Page>
    );
  }

  const fixtures = devices.filter((d) => d.sectionId === section.id);
  const max = Math.max(...HOURLY);

  return (
    <Page
      eyebrow={`My Home • ${section.id}`}
      title={section.name}
      subtitle="Live flow, valve state and recent history for this section."
      actions={
        <Link to="/app/sections" className={BTN_SECONDARY}>
          <Icon name="arrow_back" />
          <span>All sections</span>
        </Link>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Metric label="Current flow" value={section.flowLpm.toFixed(1)} unit="L/min" icon="water" note="Simulated telemetry" />
        <Metric label="Valve" value={section.valveState === 'auto' ? 'Auto' : section.valveState === 'open' ? 'Open' : 'Closed'} icon="tune" note="Controlled from Pump & Valve Control" />
        <div className="p-6 bg-surface-container-lowest rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] flex flex-col justify-between">
          <span className="font-label-uppercase text-label-uppercase uppercase text-on-surface-variant tracking-wider">Status</span>
          <div className="mt-3">
            <Jewel tone={TONE[section.status]}>{section.status === 'attention' ? 'Possible leak' : section.status}</Jewel>
          </div>
          <p className="mt-6 font-body-sm text-body-sm text-on-surface-variant">
            {section.lastEventAt ? `Last event ${new Date(section.lastEventAt).toLocaleString()}` : 'No events on record'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <Card className="xl:col-span-2">
          <CardTitle eyebrow="Usage history" title="Last 24 hours" />
          <div className="flex items-end gap-1.5 h-40">
            {HOURLY.map((v, i) => (
              <div key={i} className="flex-1 flex flex-col justify-end h-full">
                <div className="w-full rounded-t-full bg-primary" style={{ height: `${(v / max) * 100}%`, opacity: 0.35 + (v / max) * 0.65 }}></div>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-3 font-mono text-[11px] text-on-surface-variant">
            <span>00:00</span>
            <span>06:00</span>
            <span>12:00</span>
            <span>18:00</span>
            <span>23:59</span>
          </div>
        </Card>
        <Card>
          <CardTitle eyebrow="Hardware" title="Connected devices" />
          {fixtures.length === 0 ? (
            <p className="font-body-md text-body-md text-on-surface-variant">No devices assigned.</p>
          ) : (
            <ul className="divide-y divide-surface-container">
              {fixtures.map((d) => (
                <li key={d.id} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
                  <div>
                    <p className="font-body-md text-body-md text-on-surface font-medium">{d.label}</p>
                    <p className="font-mono text-[11px] text-on-surface-variant">{d.id}</p>
                  </div>
                  <Jewel tone={d.status === 'online' ? 'nominal' : d.status === 'attention' ? 'advisory' : 'critical'}>{d.status}</Jewel>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>
    </Page>
  );
}
