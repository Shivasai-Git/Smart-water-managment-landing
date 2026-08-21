import { useEffect } from 'react';

type TickCallback = (now: number) => void;

const tickSubscribers = new Set<TickCallback>();
let sy = 0;
let moved = true;
let isLoopRunning = false;

export function getScrollState() {
  return { sy, moved };
}

function tickLoop(t: number) {
  const currentY = window.scrollY;
  moved = Math.abs(currentY - sy) > 0.5;
  sy = currentY;

  tickSubscribers.forEach((cb) => {
    try {
      cb(t);
    } catch (e) {
      console.error('Error in scroll tick callback:', e);
    }
  });

  if (tickSubscribers.size > 0) {
    requestAnimationFrame(tickLoop);
  } else {
    isLoopRunning = false;
  }
}

function startLoopIfNeeded() {
  if (!isLoopRunning) {
    isLoopRunning = true;
    sy = window.scrollY;
    moved = true;
    requestAnimationFrame(tickLoop);
  }
}

export function useScrollTick(callback: TickCallback) {
  useEffect(() => {
    tickSubscribers.add(callback);
    startLoopIfNeeded();

    return () => {
      tickSubscribers.delete(callback);
    };
  }, [callback]);
}
