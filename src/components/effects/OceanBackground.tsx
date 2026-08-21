import React, { useMemo } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export const OceanBackground: React.FC = () => {
  const isReduced = useReducedMotion();

  const bubbles = useMemo(() => {
    if (isReduced) return [];
    return Array.from({ length: 15 }, (_, i) => {
      const sz = (4 + Math.random() * 13).toFixed(1);
      const dur = (15 + Math.random() * 20).toFixed(1);
      const left = (Math.random() * 100).toFixed(1);
      const dx = (Math.random() * 70 - 35).toFixed(0);
      const del = (-Math.random() * 30).toFixed(1);
      return { id: i, sz, dur, left, dx, del };
    });
  }, [isReduced]);

  return (
    <div id="ocean" aria-hidden="true">
      <div id="depth"></div>
      <div className="caustic c1"></div>
      <div className="caustic c2"></div>
      <div className="caustic c3"></div>
      {!isReduced && <div id="shafts"></div>}
      {!isReduced && (
        <div id="bubbles">
          {bubbles.map((b) => (
            <span
              key={b.id}
              style={{
                left: `${b.left}%`,
                width: `${b.sz}px`,
                height: `${b.sz}px`,
                ['--dx' as string]: `${b.dx}px`,
                animationDuration: `${b.dur}s`,
                animationDelay: `${b.del}s`,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};
