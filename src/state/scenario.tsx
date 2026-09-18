// src/state/scenario.tsx
import { createContext, useContext, useMemo, useRef, useState, type ReactNode } from 'react';
import { sections as baseSections } from '../data/fixtures/sections';
import { leakAlert } from '../data/fixtures/alerts';
import type { Alert, Command, Section, SectionId } from '../data/types';

type Phase = 'normal' | 'leak' | 'contained';

interface ScenarioState {
  phase: Phase;
  affectedSectionId: SectionId;
  sections: Section[];
  activeAlert: Alert | null;
  lastCommand: Command | null;
  runIncidentDemo: () => void;
  requestCloseValve: (sectionId: SectionId) => void;
  reset: () => void;
}

const AFFECTED: SectionId = 'kitchen';
const ScenarioContext = createContext<ScenarioState | null>(null);

export function ScenarioProvider({ children }: { children: ReactNode }) {
  const [phase, setPhase] = useState<Phase>('normal');
  const [lastCommand, setLastCommand] = useState<Command | null>(null);
  const commandCounter = useRef(0);

  const sections = useMemo<Section[]>(
    () =>
      baseSections.map((s) =>
        s.id !== AFFECTED
          ? s
          : {
              ...s,
              flowLpm: phase === 'leak' ? 42.8 : phase === 'contained' ? 0 : s.flowLpm,
              status: phase === 'leak' ? 'attention' : phase === 'contained' ? 'idle' : s.status,
              valveState: phase === 'contained' ? 'closed' : s.valveState,
            },
      ),
    [phase],
  );

  const activeAlert = useMemo<Alert | null>(
    () => (phase === 'normal' ? null : { ...leakAlert, openedAt: '2026-09-18T08:16:00+05:30' }),
    [phase],
  );

  const runIncidentDemo = () => setPhase((p) => (p === 'normal' ? 'leak' : p === 'leak' ? 'contained' : 'normal'));

  const requestCloseValve = (sectionId: SectionId) => {
    commandCounter.current += 1;
    const id = `cmd-${commandCounter.current}`;
    setLastCommand({
      id,
      targetId: sectionId,
      action: 'close-valve',
      requestedBy: 'customer:demo-user',
      requestedAt: new Date().toISOString(),
      status: 'pending',
      acknowledgedAt: null,
      failureReason: null,
      dataSource: 'simulated',
    });
    setTimeout(() => {
      setLastCommand((cmd) =>
        cmd && cmd.id === id ? { ...cmd, status: 'acknowledged', acknowledgedAt: new Date().toISOString() } : cmd,
      );
      setPhase('contained');
    }, 1200);
  };

  const reset = () => {
    setPhase('normal');
    setLastCommand(null);
  };

  const value: ScenarioState = { phase, affectedSectionId: AFFECTED, sections, activeAlert, lastCommand, runIncidentDemo, requestCloseValve, reset };

  return <ScenarioContext.Provider value={value}>{children}</ScenarioContext.Provider>;
}

export function useScenario(): ScenarioState {
  const ctx = useContext(ScenarioContext);
  if (!ctx) throw new Error('useScenario must be used within ScenarioProvider');
  return ctx;
}
