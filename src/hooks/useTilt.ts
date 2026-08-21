import { useCallback, type MouseEvent } from 'react';
import { useReducedMotion } from './useReducedMotion';

export function useTilt() {
  const isReduced = useReducedMotion();

  const handlePointerMove = useCallback(
    (e: MouseEvent<HTMLElement>) => {
      if (isReduced) return;
      if (!window.matchMedia('(hover:hover)').matches) return;

      const card = e.currentTarget;
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;

      card.style.transform = `perspective(1000px) rotateY(${px * 7}deg) rotateX(${-py * 7}deg) translateY(-5px)`;
    },
    [isReduced]
  );

  const handlePointerLeave = useCallback((e: MouseEvent<HTMLElement>) => {
    const card = e.currentTarget;
    card.style.transform = '';
  }, []);

  return {
    onPointerMove: handlePointerMove,
    onPointerLeave: handlePointerLeave,
  };
}
