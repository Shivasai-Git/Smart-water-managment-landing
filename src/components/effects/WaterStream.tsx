import React, { useEffect, useState, useCallback, useRef } from 'react';
import { buildIndustrialNetwork, type IndustrialSystemNetwork } from '../../lib/industrialPipes';
import { StreamNode } from '../ui/StreamNode';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface WaterStreamProps {
  className?: string;
}

export const WaterStream: React.FC<WaterStreamProps> = ({ className = '' }) => {
  const isReduced = useReducedMotion();
  const [network, setNetwork] = useState<IndustrialSystemNetwork | null>(null);
  const resizeTimerRef = useRef<number | null>(null);

  // Cached layout values to eliminate layout thrashing
  const totalWaterLenRef = useRef<number>(1500);
  const waterFillPathRef = useRef<SVGPathElement>(null);
  const rafIdRef = useRef<number | null>(null);

  const updateNetwork = useCallback(() => {
    if (typeof window === 'undefined') return;
    const net = buildIndustrialNetwork();
    totalWaterLenRef.current = net.totalWaterLength || 1500;
    setNetwork(net);
  }, []);

  useEffect(() => {
    const timer = setTimeout(updateNetwork, 100);

    const handleResize = () => {
      if (resizeTimerRef.current) window.clearTimeout(resizeTimerRef.current);
      resizeTimerRef.current = window.setTimeout(updateNetwork, 150);
    };

    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('orientationchange', handleResize, { passive: true });

    return () => {
      clearTimeout(timer);
      if (resizeTimerRef.current) window.clearTimeout(resizeTimerRef.current);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, [updateNetwork]);

  // High-Performance Passive Scroll Listener (Pure GPU Compositor friendly)
  useEffect(() => {
    if (isReduced) return;

    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        rafIdRef.current = requestAnimationFrame(() => {
          const sy = window.scrollY;
          const docH = document.documentElement.scrollHeight - window.innerHeight;
          const progress = docH > 0 ? Math.min(1, Math.max(0.12, (sy + window.innerHeight * 0.7) / docH)) : 1;

          if (waterFillPathRef.current) {
            const totalLen = totalWaterLenRef.current;
            const offset = totalLen * (1 - progress);
            waterFillPathRef.current.style.strokeDashoffset = `${offset}`;
          }
          ticking = false;
        });
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    // Initial run
    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [isReduced, network]);

  if (!network || !network.waterPath) {
    return null;
  }

  const totalLen = network.totalWaterLength || 1500;

  return (
    <div
      id="water-stream-fullpage"
      aria-hidden="true"
      className={`absolute inset-0 pointer-events-none z-[4] overflow-hidden ${className}`}
      style={{
        width: '100%',
        height: `${network.height}px`,
      }}
    >
      <svg
        width={network.width}
        height={network.height}
        viewBox={`0 0 ${network.width} ${network.height}`}
        className="w-full h-full overflow-visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Main Active Water Fluid Gradient (High contrast & hardware accelerated) */}
          <linearGradient id="streamFluidGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#72E4FF" stopOpacity="1" />
            <stop offset="40%" stopColor="#18BFF2" stopOpacity="0.95" />
            <stop offset="80%" stopColor="#087EA8" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#18BFF2" stopOpacity="0.95" />
          </linearGradient>
        </defs>

        {/* 1. LAYER 1: Metallic Pipe Housing (12px Dark Steel) */}
        <path
          d={network.waterPath}
          stroke="#061B21"
          strokeWidth="12"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.95"
        />
        <path
          d={network.waterPath}
          stroke="#0C2B36"
          strokeWidth="8.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.85"
        />

        {/* 2. LAYER 2: Physical Water Stream (Fills dynamically with zero lag) */}
        <path
          ref={waterFillPathRef}
          d={network.waterPath}
          stroke="url(#streamFluidGrad)"
          strokeWidth="5.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            strokeDasharray: isReduced ? 'none' : `${totalLen}`,
            strokeDashoffset: isReduced ? '0' : `${totalLen * 0.85}`,
            willChange: 'stroke-dashoffset',
          }}
          opacity="0.95"
        />

        {/* 3. LAYER 3: GPU-Accelerated Moving Fluid Highlight (Silky Smooth CSS Keyframes, No Expensive Filters) */}
        {!isReduced && (
          <path
            d={network.waterPath}
            stroke="#CAF0F8"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="36 140"
            className="water-moving-highlight"
            style={{ willChange: 'stroke-dashoffset' }}
            opacity="0.95"
          />
        )}

        {/* 4. LAYER 4: Digital Telemetry Signal (Smooth CSS dash animation) */}
        {network.dataPath && (
          <path
            d={network.dataPath}
            stroke="#72E4FF"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="4 8"
            className="sig"
            style={{ willChange: 'stroke-dashoffset' }}
            opacity="0.65"
          />
        )}
      </svg>

      {/* 5. Static Lightweight Stream Nodes */}
      {network.nodes.map((node) => (
        <StreamNode key={node.id} node={node} />
      ))}
    </div>
  );
};
