import { useEffect } from 'react';

type TickCallback = (now: number) => void;

const tickSubscribers = new Set<TickCallback>();
let sy = 0;
let moved = true;
let isLoopRunning = false;
let rafId: number | null = null;
let idleFrames = 0;

export function getScrollState() {
  return { sy, moved };
}

function tickLoop(t: number) {
  const currentY = window.scrollY;
  const delta = Math.abs(currentY - sy);
  moved = delta > 0.5;
  sy = currentY;

  if (moved) {
    idleFrames = 0;
  } else {
    idleFrames++;
  }

  tickSubscribers.forEach((cb) => {
    try {
      cb(t);
    } catch (e) {
      console.error('Error in scroll tick callback:', e);
    }
  });

  // Keep looping during active scrolling or for a brief settle period, then pause to save mobile battery and GPU
  if (tickSubscribers.size > 0 && idleFrames < 120) {
    rafId = requestAnimationFrame(tickLoop);
  } else {
    isLoopRunning = false;
    rafId = null;
  }
}

function wakeLoop() {
  idleFrames = 0;
  if (!isLoopRunning) {
    isLoopRunning = true;
    sy = window.scrollY;
    moved = true;
    rafId = requestAnimationFrame(tickLoop);
  }
}

export function useScrollTick(callback: TickCallback) {
  useEffect(() => {
    tickSubscribers.add(callback);
    wakeLoop();

    const onPassiveScroll = () => {
      wakeLoop();
    };

    window.addEventListener('scroll', onPassiveScroll, { passive: true });
    window.addEventListener('resize', onPassiveScroll, { passive: true });

    return () => {
      tickSubscribers.delete(callback);
      window.removeEventListener('scroll', onPassiveScroll);
      window.removeEventListener('resize', onPassiveScroll);
      if (tickSubscribers.size === 0 && rafId !== null) {
        cancelAnimationFrame(rafId);
        isLoopRunning = false;
      }
    };
  }, [callback]);
}

