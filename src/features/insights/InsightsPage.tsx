// src/features/insights/InsightsPage.tsx
import { useScenario } from '../../state/scenario';
import { StatusPill } from '../../components/ui/StatusPill';

export default function InsightsPage() {
  const { phase } = useScenario();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <h1 className="font-display text-2xl text-mist">AI Insights</h1>
        <StatusPill tone="attention" label="Beta, rule-based" />
      </div>
      <p className="font-body text-sm text-steel max-w-lg">
        These are transparent, rule-based observations, not predictions from a trained model. A trained model
        will be introduced only after enough real-world data has been collected.
      </p>

      <section className="rounded-2xl border border-steel/20 bg-ink2 p-5 flex flex-col gap-3">
        {phase === 'leak' ? (
          <p className="font-body text-sm text-mist">
            Kitchen line flow has held above its expected range for longer than the configured confirmation
            window, with no matching fixture activity logged. This pattern matches the rule for a possible
            continuous-flow leak.
          </p>
        ) : (
          <p className="font-body text-sm text-mist">
            No section has shown a sustained flow pattern outside its configured baseline in the last 24 hours.
          </p>
        )}
      </section>
    </div>
  );
}
