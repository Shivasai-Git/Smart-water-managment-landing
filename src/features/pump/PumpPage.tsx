import { useState } from 'react';
import { StatusPill } from '../../components/ui/StatusPill';
import { DataTable } from '../../components/ui/DataTable';
import type { CommandStatus } from '../../data/types';

const RUN_HISTORY = [
  { id: 'run-1', started: '2026-09-18 06:02', duration: '18 min', reason: 'Scheduled fill', fault: false },
  { id: 'run-2', started: '2026-09-17 19:40', duration: '22 min', reason: 'Manual start', fault: false },
  { id: 'run-3', started: '2026-09-16 06:00', duration: '4 min', reason: 'Dry-run cutoff', fault: true },
];

export default function PumpPage() {
  const [mode, setMode] = useState<'manual' | 'auto' | 'off'>('auto');
  const [running, setRunning] = useState(false);
  const [commandStatus, setCommandStatus] = useState<CommandStatus | null>(null);

  const requestToggle = () => {
    setCommandStatus('pending');
    setTimeout(() => {
      setCommandStatus('acknowledged');
      setRunning((r) => !r);
    }, 1000);
  };

  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-display text-2xl text-mist">Pump Control</h1>

      <section className="rounded-2xl border border-steel/20 bg-ink2 p-5 flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <StatusPill tone={running ? 'good' : 'idle'} label={running ? 'Running' : 'Stopped'} />
          {commandStatus === 'pending' && <StatusPill tone="attention" label="Command pending" />}
        </div>
        <div className="flex items-center gap-3">
          <div className="flex gap-1 rounded-lg bg-ink border border-steel/30 p-1">
            {(['manual', 'auto', 'off'] as const).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setMode(m)}
                className={`rounded-md px-3 py-1.5 text-sm capitalize transition-colors ${mode === m ? 'bg-aqua text-ink' : 'text-steel'}`}
              >
                {m}
              </button>
            ))}
          </div>
          <button
            type="button"
            disabled={mode === 'off' || commandStatus === 'pending'}
            onClick={requestToggle}
            className="rounded-lg bg-aqua text-ink text-sm font-medium px-4 py-2 hover:bg-mist transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {running ? 'Request stop' : 'Request start'}
          </button>
        </div>
      </section>

      <section className="rounded-2xl border border-steel/20 bg-ink2 p-5">
        <h2 className="font-display text-base text-mist mb-3">Run-time history</h2>
        <DataTable
          columns={[
            { key: 'started', label: 'Started' },
            { key: 'duration', label: 'Duration' },
            { key: 'reason', label: 'Stop reason' },
            { key: 'fault', label: 'Fault' },
          ]}
          rows={RUN_HISTORY.map((r) => ({
            started: r.started,
            duration: r.duration,
            reason: r.reason,
            fault: r.fault ? <StatusPill tone="danger" label="Fault" /> : <StatusPill tone="good" label="Normal" />,
          }))}
        />
      </section>
    </div>
  );
}
