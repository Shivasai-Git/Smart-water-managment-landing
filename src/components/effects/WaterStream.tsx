import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useScrollTick } from '../../hooks/useScrollTick';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { buildStreamPath, progressAtY, type StreamState, NDROPS, SN } from '../../lib/streamPath';

export const WaterStream: React.FC = () => {
  const isReduced = useReducedMotion();
  const [streamState, setStreamState] = useState<StreamState>({
    L: 0,
    samples: null,
    stageOff: [],
    built: false,
    d: '',
    joints: [],
    W: 0,
    H: 0,
  });

  const progRef = useRef(0);
  const dropsRef = useRef<SVGCircleElement[]>([]);

  const waterPRef = useRef<SVGPathElement | null>(null);
  const glowPRef = useRef<SVGPathElement | null>(null);
  const flowMaskRef = useRef<SVGPathElement | null>(null);

  const rebuild = useCallback(() => {
    const nextState = buildStreamPath();
    setStreamState(nextState);
  }, []);

  useEffect(() => {
    let rt: ReturnType<typeof setTimeout>;

    const handleResize = () => {
      clearTimeout(rt);
      rt = setTimeout(rebuild, 220);
    };

    window.addEventListener('resize', handleResize);
    window.visualViewport?.addEventListener('resize', handleResize);

    const t1 = setTimeout(rebuild, 150);
    const t2 = setTimeout(rebuild, 400);
    const t3 = setTimeout(rebuild, 1200);

    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined') {
      let lastH = document.documentElement.scrollHeight;
      let lastW = document.documentElement.clientWidth;
      ro = new ResizeObserver(() => {
        const h = document.documentElement.scrollHeight;
        const w = document.documentElement.clientWidth;
        if (Math.abs(h - lastH) > 24 || Math.abs(w - lastW) > 1) {
          lastW = w;
          lastH = h;
          clearTimeout(rt);
          rt = setTimeout(rebuild, 140);
        }
      });
      ro.observe(document.body);
    }

    if (document.fonts) {
      document.fonts.ready.then(() => setTimeout(rebuild, 80));
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      window.visualViewport?.removeEventListener('resize', handleResize);
      clearTimeout(rt);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      if (ro) ro.disconnect();
    };
  }, [rebuild]);

  const tickCallback = useCallback(
    (now: number) => {
      if (!streamState.built || !streamState.samples) return;

      const vh = window.visualViewport?.height || window.innerHeight;
      const sy = window.scrollY;
      const p = progressAtY(sy + vh * 0.82, streamState.samples);
      progRef.current = p;

      const off = (streamState.L * (1 - p)).toFixed(1);
      if (waterPRef.current) waterPRef.current.style.strokeDashoffset = off;
      if (glowPRef.current) glowPRef.current.style.strokeDashoffset = off;
      if (flowMaskRef.current) flowMaskRef.current.style.strokeDashoffset = off;

      const stages = Array.from(document.querySelectorAll<HTMLElement>('.stage'));
      for (let i = 0; i < stages.length; i++) {
        if (streamState.stageOff[i]) {
          const top = streamState.stageOff[i][0] - sy;
          const h = streamState.stageOff[i][1];
          stages[i].classList.toggle('lit', top < vh * 0.74 && top + h > 60);
        }
      }

      if (isReduced || p <= 0) return;

      const base = now * 4e-5;
      const dropEls = dropsRef.current;
      const nd = dropEls.length;
      for (let i = 0; i < nd; i++) {
        const dropEl = dropEls[i];
        if (!dropEl) continue;
        const phase = (base + i / nd) % 1;
        const u = phase * p;
        const k = (u * SN) | 0;

        if (streamState.samples) {
          dropEl.setAttribute('cx', streamState.samples[k * 2].toFixed(1));
          dropEl.setAttribute('cy', streamState.samples[k * 2 + 1].toFixed(1));
          dropEl.setAttribute('opacity', (0.28 + 0.62 * Math.sin(phase * Math.PI) ** 2).toFixed(2));
        }
      }
    },
    [streamState, isReduced]
  );

  useScrollTick(tickCallback);

  const isMobile = streamState.W > 0 && streamState.W < 640;

  return (
    <svg
      id="stream"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${streamState.W || 1} ${streamState.H || 1}`}
      width={streamState.W}
      height={streamState.H}
      preserveAspectRatio="none"
      style={{
        overflow: 'visible',
        width: streamState.W ? `${streamState.W}px` : '100%',
        height: streamState.H ? `${streamState.H}px` : '100%',
      }}
    >
      <defs>
        <mask
          id="flowReveal"
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width={streamState.W || 1}
          height={streamState.H || 1}
          style={{ maskType: 'luminance' }}
        >
          <path
            ref={flowMaskRef}
            id="flowMask"
            fill="none"
            stroke="white"
            strokeWidth={isMobile ? '10' : '14'}
            strokeLinecap="round"
            d={streamState.d}
            style={{ strokeDasharray: `${streamState.L} ${streamState.L}` }}
          />
        </mask>
      </defs>
      <path id="pipe" d={streamState.d} fill="none" stroke="#7C99BA" strokeWidth={isMobile ? '6' : '9'} strokeLinecap="round" opacity=".10" />
      <path
        ref={glowPRef}
        id="wglow"
        d={streamState.d}
        fill="none"
        stroke="#3FA9F0"
        strokeWidth={isMobile ? '6' : '9'}
        strokeLinecap="round"
        opacity=".13"
        style={{ strokeDasharray: `${streamState.L} ${streamState.L}` }}
      />
      <path
        ref={waterPRef}
        id="water"
        d={streamState.d}
        fill="none"
        stroke="#3FA9F0"
        strokeWidth={isMobile ? '2.4' : '3.2'}
        strokeLinecap="round"
        opacity=".55"
        style={{ strokeDasharray: `${streamState.L} ${streamState.L}` }}
      />
      <path
        id="current"
        d={streamState.d}
        fill="none"
        stroke="#8FD3FF"
        strokeWidth={isMobile ? '2.6' : '3.4'}
        strokeLinecap="round"
        opacity=".95"
        mask="url(#flowReveal)"
      />
      <g id="drops">
        {Array.from({ length: NDROPS }).map((_, i) => (
          <circle
            key={i}
            ref={(el) => {
              if (el) dropsRef.current[i] = el;
            }}
            r={isMobile ? '2.6' : '3.2'}
            fill="#8FD3FF"
            opacity="0"
          />
        ))}
      </g>
      <g id="joints">
        {streamState.joints.map(([x, y], i) => (
          <circle
            key={i}
            cx={x.toFixed(1)}
            cy={y.toFixed(1)}
            r={isMobile ? '4' : '5'}
            fill="#04121E"
            stroke="#3FA9F0"
            strokeWidth={isMobile ? '1.4' : '1.6'}
            opacity=".5"
          />
        ))}
      </g>
    </svg>
  );
};
