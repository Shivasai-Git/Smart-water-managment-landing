import { useState, useEffect } from 'react';

export function useLiveReadout() {
  const [level, setLevel] = useState(68);
  const [flow, setFlow] = useState(11.4);

  useEffect(() => {
    const interval = setInterval(() => {
      setLevel((prev) => {
        const next = Math.max(24, Math.min(96, prev + (Math.random() * 1.6 - 0.55)));
        return Number(next.toFixed(0));
      });
      setFlow(Number((10 + Math.random() * 3).toFixed(1)));
    }, 2200);

    return () => clearInterval(interval);
  }, []);

  return { level, flow };
}
