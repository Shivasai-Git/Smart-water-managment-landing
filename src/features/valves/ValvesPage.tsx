import { useScenario } from '../../state/scenario';
import { StatusPill } from '../../components/ui/StatusPill';
import { IconValve } from '../../components/ui/icons';

export default function ValvesPage() {
  const { sections, lastCommand, requestCloseValve } = useScenario();
  const pendingOnKitchen = lastCommand?.targetId === 'kitchen' && lastCommand.status === 'pending';

  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-display text-2xl text-mist">Valve Control</h1>
      <p className="font-body text-sm text-steel max-w-lg">
        Every close/open request is sent for acknowledgement before it takes effect. Production installations
        also require a local hardware fail-safe independent of this app.
      </p>

      <section className="rounded-2xl border border-steel/20 bg-ink2 divide-y divide-steel/10">
        {sections.map((s) => (
          <div key={s.id} className="flex items-center justify-between px-5 py-4">
            <div className="flex items-center gap-3">
              <span className={`text-steel ${s.valveState === 'closed' ? 'opacity-50' : ''}`}>
                <IconValve size={20} />
              </span>
              <div>
                <p className="font-body text-sm text-mist">{s.name}</p>
                <p className="font-body text-xs text-steel">Last update: {s.lastEventAt ? new Date(s.lastEventAt).toLocaleString() : 'no recent change'}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <StatusPill tone={s.valveState === 'closed' ? 'attention' : 'good'} label={s.valveState} />
              {s.id === 'kitchen' && (
                <button
                  type="button"
                  disabled={pendingOnKitchen || s.valveState === 'closed'}
                  onClick={() => requestCloseValve('kitchen')}
                  className="rounded-lg bg-danger/10 text-danger text-sm font-medium px-3 py-1.5 hover:bg-danger/20 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {pendingOnKitchen ? 'Pending…' : 'Close valve'}
                </button>
              )}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
