import { BTN_PRIMARY, BTN_SECONDARY, Card, CardTitle, Icon, Jewel, Page } from '../app-shell/m3';

const INSIGHTS = [
  { icon: 'plumbing', label: 'Predicted leak risk', value: '12%', unit: 'kitchen supply line', confidence: 91, tone: 'advisory' as const, tag: 'Watch', note: 'Micro-flow of 0.4 L/min held for 6 nights points to a slow joint seep.' },
  { icon: 'trending_up', label: 'Consumption forecast', value: '2,010', unit: 'L next 7 days', confidence: 87, tone: 'nominal' as const, tag: 'On track', note: 'Weekend garden irrigation is the main driver; 6% under budget.' },
  { icon: 'propane_tank', label: 'Refill optimisation', value: '₹412', unit: 'saved / month', confidence: 94, tone: 'nominal' as const, tag: 'Applied', note: 'Shifting overhead refill into the 02:00–05:00 off-peak window.' },
  { icon: 'filter_alt', label: 'Filter life prediction', value: '41', unit: 'days remaining', confidence: 82, tone: 'advisory' as const, tag: 'Plan swap', note: 'Pressure drop across the sediment stage is trending 1.8× faster.' },
];

const ACTIONS = [
  { title: 'Schedule a joint inspection for the kitchen supply line', meta: 'Impact: prevents a likely 40 L/day loss', icon: 'home_repair_service' },
  { title: 'Cap Garden valve to 20 minutes on weekend mornings', meta: 'Impact: −180 L / week', icon: 'grass' },
  { title: 'Order a replacement sediment cartridge (SF-10)', meta: 'Impact: avoids turbidity drift in 5–6 weeks', icon: 'inventory_2' },
];

const ACTIVITY = [
  { time: '08:42', text: 'Re-trained flow baseline with 14 days of Kitchen telemetry', tone: 'nominal' as const },
  { time: '06:10', text: 'Flagged nocturnal micro-flow on VC-KIT-01 (confidence 91%)', tone: 'advisory' as const },
  { time: '02:05', text: 'Confirmed night-fill window saved 18 kWh-equivalent load', tone: 'nominal' as const },
  { time: 'Yesterday', text: 'Recalibrated quality-drift model against inlet probe WQ-INL-01', tone: 'neutral' as const },
];

export default function InsightsPage() {
  return (
    <Page
      eyebrow="Intelligence • Predictive Engine"
      title="AI Insights"
      subtitle="Forecasts, anomaly reasoning and recommended actions for the residence."
      actions={
        <button type="button" className={BTN_SECONDARY}>
          <Icon name="refresh" />
          <span>Re-run analysis</span>
        </button>
      }
    >
      <div className="relative overflow-hidden rounded-3xl bg-primary-container text-on-primary p-8 shadow-[0_20px_40px_rgba(0,0,0,0.08)]">
        <div className="flex items-center gap-2 mb-4">
          <Icon name="auto_awesome" size={18} />
          <span className="font-label-uppercase text-label-uppercase uppercase tracking-widest text-on-primary-container">Weekly summary • generated 08:42</span>
        </div>
        <p className="font-headline-md text-headline-md max-w-3xl">
          Usage is 6% below budget this week, but the kitchen line shows a slow overnight seep worth inspecting before it grows.
        </p>
        <p className="font-body-md text-body-md text-on-primary-container mt-3 max-w-2xl">
          The model compared 14 days of section-level flow against seasonal baselines. Nothing requires immediate shutoff; three low-effort actions are queued below.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {INSIGHTS.map((i) => (
          <Card key={i.label} className="flex flex-col justify-between gap-6">
            <div className="flex items-start justify-between">
              <div className="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center text-primary">
                <Icon name={i.icon} size={20} />
              </div>
              <Jewel tone={i.tone}>{i.tag}</Jewel>
            </div>
            <div>
              <span className="font-label-uppercase text-label-uppercase uppercase text-on-surface-variant tracking-wider">{i.label}</span>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="font-label-metric text-label-metric text-on-surface font-semibold tracking-tight">{i.value}</span>
                <span className="font-body-sm text-body-sm text-on-surface-variant">{i.unit}</span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-3">{i.note}</p>
            </div>
            <div className="space-y-1.5">
              <div className="flex justify-between font-body-sm text-body-sm">
                <span className="text-on-surface-variant">Confidence</span>
                <span className="font-semibold text-on-surface">{i.confidence}%</span>
              </div>
              <div className="w-full h-1.5 bg-surface-container rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full" style={{ width: `${i.confidence}%` }}></div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <Card className="xl:col-span-2">
          <CardTitle eyebrow="Recommended" title="Actions queued for you" />
          <ul className="divide-y divide-surface-container">
            {ACTIONS.map((a) => (
              <li key={a.title} className="flex flex-col sm:flex-row sm:items-center gap-4 py-4 first:pt-0 last:pb-0">
                <div className="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center text-primary shrink-0">
                  <Icon name={a.icon} size={20} />
                </div>
                <div className="flex-1">
                  <p className="font-body-md text-body-md text-on-surface font-medium">{a.title}</p>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">{a.meta}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button type="button" className={`${BTN_PRIMARY} !py-2`}>Apply</button>
                  <button type="button" className="px-4 py-2 rounded-full font-label-button text-label-button text-on-surface-variant hover:bg-surface-container-high transition-colors">Dismiss</button>
                </div>
              </li>
            ))}
          </ul>
        </Card>

        <Card>
          <CardTitle eyebrow="Model activity" title="Recent reasoning" />
          <ol className="relative space-y-5 pl-5 before:absolute before:left-[5px] before:top-1 before:bottom-1 before:w-px before:bg-surface-container-highest">
            {ACTIVITY.map((a) => (
              <li key={a.text} className="relative">
                <span className={`absolute -left-5 top-1.5 w-[11px] h-[11px] rounded-full border-2 border-surface-container-lowest ${a.tone === 'nominal' ? 'bg-secondary' : a.tone === 'advisory' ? 'bg-amber-500' : 'bg-outline'}`}></span>
                <span className="font-label-uppercase text-label-uppercase uppercase tracking-wider text-on-surface-variant">{a.time}</span>
                <p className="font-body-sm text-body-sm text-on-surface mt-0.5">{a.text}</p>
              </li>
            ))}
          </ol>
        </Card>
      </div>
    </Page>
  );
}
