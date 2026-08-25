import React, { useEffect, useState, useMemo } from 'react';
import { useActiveSection, type SectionState } from '../../hooks/useActiveSection';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface PersistentWaterSystemProps {
  onStateChange?: (state: SectionState, metrics: { level: number; flow: number; pump: boolean }) => void;
}

export const PersistentWaterSystem: React.FC<PersistentWaterSystemProps> = ({ onStateChange }) => {
  const activeSection = useActiveSection();
  const isReduced = useReducedMotion();
  const [isMobile, setIsMobile] = useState(() => (typeof window !== 'undefined' ? window.innerWidth < 768 : false));

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // System State Configuration for each of the 7 Sections
  const stateConfig = useMemo(() => {
    switch (activeSection) {
      case 'hero':
        return {
          tankLevel: 58,
          pumpActive: true,
          flowRate: 12.4,
          leakDetected: false,
          overflowWarning: false,
          sensorPulsing: true,
          containerClass: 'lg:right-[4%] lg:top-[12%] lg:scale-[1.02] lg:opacity-100',
          tankScale: 1.05,
          statusLabel: 'INFLOW ACTIVE · FILLING',
          flowSpeedClass: 'water-moving-highlight-fast',
        };
      case 'problem':
        return {
          tankLevel: 94,
          pumpActive: false,
          flowRate: 0.0,
          leakDetected: true,
          overflowWarning: true,
          sensorPulsing: false,
          containerClass: 'lg:right-[2%] lg:top-[16%] lg:scale-[0.92] lg:opacity-85',
          tankScale: 0.92,
          statusLabel: 'OVERFLOW RISK · PUMP CUTOFF',
          flowSpeedClass: 'water-moving-highlight-paused',
        };
      case 'how-it-works':
        return {
          tankLevel: 70,
          pumpActive: true,
          flowRate: 12.4,
          leakDetected: false,
          overflowWarning: false,
          sensorPulsing: true,
          containerClass: 'lg:right-[2%] lg:top-[14%] lg:scale-[0.88] lg:opacity-80',
          tankScale: 0.88,
          statusLabel: 'SENSOR → CLOUD TELEMETRY',
          flowSpeedClass: 'water-moving-highlight',
        };
      case 'capabilities':
        return {
          tankLevel: 75,
          pumpActive: true,
          flowRate: 12.4,
          leakDetected: false,
          overflowWarning: false,
          sensorPulsing: true,
          containerClass: 'lg:right-[2%] lg:top-[15%] lg:scale-[0.86] lg:opacity-80',
          tankScale: 0.86,
          statusLabel: 'AUTONOMOUS MULTI-ZONE GUARD',
          flowSpeedClass: 'water-moving-highlight',
        };
      case 'dashboard':
        return {
          tankLevel: 78,
          pumpActive: true,
          flowRate: 12.4,
          leakDetected: false,
          overflowWarning: false,
          sensorPulsing: true,
          containerClass: 'lg:right-[3%] lg:top-[10%] lg:scale-[0.96] lg:opacity-95',
          tankScale: 0.96,
          statusLabel: 'CLOSED-LOOP SYNC · 78% OPTIMAL',
          flowSpeedClass: 'water-moving-highlight',
        };
      case 'audience':
        return {
          tankLevel: 75,
          pumpActive: true,
          flowRate: 12.4,
          leakDetected: false,
          overflowWarning: false,
          sensorPulsing: false,
          containerClass: 'lg:right-[1%] lg:top-[16%] lg:scale-[0.82] lg:opacity-75',
          tankScale: 0.82,
          statusLabel: 'SCALED NETWORK ACTIVE',
          flowSpeedClass: 'water-moving-highlight-slow',
        };
      case 'vision':
      default:
        return {
          tankLevel: 78,
          pumpActive: true,
          flowRate: 12.4,
          leakDetected: false,
          overflowWarning: false,
          sensorPulsing: false,
          containerClass: 'lg:right-[6%] lg:top-[14%] lg:scale-[0.95] lg:opacity-95',
          tankScale: 0.95,
          statusLabel: 'SYSTEM STABLE · 100% PROTECTED',
          flowSpeedClass: 'water-moving-highlight-slow',
        };
    }
  }, [activeSection]);

  // Broadcast state changes to UI listeners if needed
  useEffect(() => {
    onStateChange?.(activeSection, {
      level: stateConfig.tankLevel,
      flow: stateConfig.flowRate,
      pump: stateConfig.pumpActive,
    });
  }, [activeSection, stateConfig, onStateChange]);

  // Water level height calculations (tank height = 240px)
  const tankHeight = 240;
  const waterFillHeight = (stateConfig.tankLevel / 100) * 190;
  const waterTopY = 270 - waterFillHeight;

  // Main Engineered Conduit Path (from Bottom Supply -> Pump -> Flow Sensor -> 90° Corner -> Tank Intake Spout)
  const pipePath = 'M 40,490 L 40,380 L 40,260 L 40,118 Q 40,100 58,100 L 250,100 Q 268,100 268,118 L 268,160';
  const dataTelemetryPath = 'M 40,260 L 2,260';

  return (
    <div
      id="persistent-water-system"
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-[8] overflow-hidden select-none"
    >
      {/* Dynamic Fluid Infrastructure Visual Container */}
      <div
        className={`absolute transition-all duration-700 ease-out right-0 top-16 w-[320px] sm:w-[440px] lg:w-[480px] h-[560px] ${
          isMobile ? 'scale-75 origin-top-right opacity-80' : stateConfig.containerClass
        }`}
      >
        <svg
          viewBox="0 0 460 540"
          className="w-full h-full overflow-visible"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* High-Visibility Water Gradient: #087EA8 -> #18BFF2 -> #72E4FF */}
            <linearGradient id="mainFluidGrad" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#087EA8" stopOpacity="0.9" />
              <stop offset="60%" stopColor="#18BFF2" stopOpacity="0.98" />
              <stop offset="100%" stopColor="#72E4FF" stopOpacity="1" />
            </linearGradient>

            {/* Subtle Caustic Tank Water Pattern */}
            <linearGradient id="tankFillGrad" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#063E56" stopOpacity="0.95" />
              <stop offset="40%" stopColor="#0E6B91" stopOpacity="0.95" />
              <stop offset="85%" stopColor="#18BFF2" stopOpacity="0.92" />
              <stop offset="100%" stopColor="#72E4FF" stopOpacity="0.98" />
            </linearGradient>

            {/* Soft Radial Backlight behind Tank */}
            <radialGradient id="tankBacklight" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#18BFF2" stopOpacity="0.25" />
              <stop offset="60%" stopColor="#087EA8" stopOpacity="0.08" />
              <stop offset="100%" stopColor="transparent" stopOpacity="0" />
            </radialGradient>

            {/* Fluid Glow Filter */}
            <filter id="fluidGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Tank Clipping Path */}
            <clipPath id="tankInnerClip">
              <rect x="202" y="78" width="136" height="194" rx="14" />
            </clipPath>
          </defs>

          {/* 0. Soft Radial Separation Glow Behind Tank */}
          <circle cx="270" cy="180" r="160" fill="url(#tankBacklight)" />

          {/* =========================================================================
              1. PERSISTENT PHYSICAL WATER PIPE NETWORK (90° Orthogonal Routing)
              ========================================================================= */}
          <g id="persistent-pipe-conduit">
            {/* Outer Static Metallic Conduit (12px Steel/Dark Teal) */}
            <path
              d={pipePath}
              stroke="#061B21"
              strokeWidth="12"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.95"
            />
            <path
              d={pipePath}
              stroke="#0C2B36"
              strokeWidth="9"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.85"
            />

            {/* Inner Active Water Stream (Continuous Solid Cyan, 5.5px, 80%+ opacity) */}
            <path
              d={pipePath}
              stroke="url(#mainFluidGrad)"
              strokeWidth="5.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity={stateConfig.pumpActive ? '0.98' : '0.45'}
              className="transition-opacity duration-500"
            />

            {/* Traveling Bright Highlight (1.8px Cyan-White, Continuous Fluid Movement) */}
            {!isReduced && stateConfig.pumpActive && (
              <path
                d={pipePath}
                stroke="#CAF0F8"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="26 130"
                className={stateConfig.flowSpeedClass}
                filter="url(#fluidGlow)"
              />
            )}

            {/* Water Inflow Waterfall directly pouring into Tank from Spout */}
            {stateConfig.pumpActive && (
              <g transform="translate(268, 160)">
                <line
                  x1="0"
                  y1="0"
                  x2="0"
                  y2={Math.max(10, waterTopY - 160)}
                  stroke="#72E4FF"
                  strokeWidth="3.5"
                  strokeDasharray="8 4"
                  className="water-moving-highlight-fast"
                  opacity="0.85"
                />
                <circle cx="0" cy="0" r="3" fill="#CAF0F8" className="animate-pulse" />
              </g>
            )}
          </g>

          {/* =========================================================================
              2. THE PERSISTENT WATER TANK (With Dynamic Water Column & Meniscus)
              ========================================================================= */}
          <g id="persistent-water-tank" transform="translate(0, 0)">
            {/* Outer Acrylic/Steel Tank Housing */}
            <rect
              x="200"
              y="75"
              width="140"
              height={tankHeight}
              rx="16"
              fill="#041620"
              fillOpacity="0.45"
              stroke="#0C2B36"
              strokeWidth="2.5"
            />

            {/* Internal Visible Water Column (Clipped cleanly inside the tank) */}
            <g clipPath="url(#tankInnerClip)">
              <rect
                x="200"
                y={waterTopY}
                width="140"
                height={waterFillHeight + 20}
                fill="url(#tankFillGrad)"
                className="transition-all duration-700 ease-out"
              />

              {/* Water Surface Meniscus (Oscillating Bright Surface Line) */}
              <ellipse
                cx="270"
                cy={waterTopY}
                rx="66"
                ry="7"
                fill="#72E4FF"
                fillOpacity="0.9"
                stroke="#CAF0F8"
                strokeWidth="1.5"
                className="transition-all duration-700 ease-out"
              />

              {/* Subtle Internal Water Level Line Markers */}
              {[25, 50, 75, 90].map((pct) => {
                const markY = 270 - (pct / 100) * 190;
                return (
                  <line
                    key={pct}
                    x1="206"
                    y1={markY}
                    x2="216"
                    y2={markY}
                    stroke="#CAF0F8"
                    strokeWidth="1"
                    strokeOpacity="0.4"
                  />
                );
              })}
            </g>

            {/* Structural Reinforcement Rings */}
            {[115, 160, 205, 250].map((ry, i) => (
              <line
                key={i}
                x1="200"
                y1={ry}
                x2="340"
                y2={ry}
                stroke={i === 0 ? '#18BFF2' : '#144660'}
                strokeWidth="1.5"
                strokeOpacity="0.6"
              />
            ))}

            {/* Top Ultrasonic Sensor Node Mounted on Tank Lid */}
            <g transform="translate(270, 75)">
              <rect x="-18" y="-12" width="36" height="14" rx="4" fill="#061B21" stroke="#18BFF2" strokeWidth="1.5" />
              {/* Sensor Status LED */}
              <circle cx="0" cy="-5" r="3" fill={stateConfig.sensorPulsing ? '#72E4FF' : '#18BFF2'} className="animate-pulse" />
              {/* Downward Ultrasonic Acoustic Cone */}
              <path
                d="M -12,2 L -35,50 L 35,50 Z"
                fill="#18BFF2"
                fillOpacity={stateConfig.sensorPulsing ? '0.08' : '0.03'}
                className="transition-opacity duration-300"
              />
            </g>

            {/* Live Tank Percentage Digital Readout Tag */}
            <g transform={`translate(348, ${waterTopY - 4})`} className="transition-all duration-700 ease-out">
              <rect
                x="0"
                y="-11"
                width="56"
                height="22"
                rx="5"
                fill="#061B21"
                stroke={stateConfig.overflowWarning ? '#FFA03C' : '#18BFF2'}
                strokeWidth="1.2"
              />
              <text
                x="28"
                y="4"
                textAnchor="middle"
                fill={stateConfig.overflowWarning ? '#FFA03C' : '#E4EFFA'}
                fontSize="11px"
                fontFamily="monospace"
                fontWeight="bold"
              >
                {stateConfig.tankLevel}%
              </text>
            </g>

            {/* Overflow Risk Warning Indicator */}
            {stateConfig.overflowWarning && (
              <g transform="translate(270, 52)">
                <rect x="-60" y="-12" width="120" height="22" rx="6" fill="#FFA03C" fillOpacity="0.15" stroke="#FFA03C" strokeWidth="1.2" />
                <text x="0" y="3" textAnchor="middle" fill="#FFA03C" fontSize="9px" fontFamily="monospace" fontWeight="bold" letterSpacing="0.08em" className="animate-pulse">
                  ⚠ OVERFLOW RISK
                </text>
              </g>
            )}
          </g>

          {/* =========================================================================
              3. SMART PUMP & FLOW SENSOR HARDWARE NODES
              ========================================================================= */}
          
          {/* Smart Pump Node */}
          <g transform="translate(40, 380)">
            <circle
              r="17"
              fill="#061B21"
              stroke={stateConfig.pumpActive ? '#18BFF2' : '#0C2B36'}
              strokeWidth="2"
              className="transition-colors duration-300"
            />
            <circle r="10" fill="#04141A" stroke="#123D57" strokeWidth="1" />
            <circle
              r="4.5"
              fill={stateConfig.pumpActive ? '#18BFF2' : '#0C2B36'}
              className={stateConfig.pumpActive ? 'animate-pulse' : ''}
            />
            {stateConfig.pumpActive && (
              <circle r="22" fill="none" stroke="#18BFF2" strokeWidth="1" opacity="0.3" className="animate-ping" />
            )}
            <text x="24" y="-2" fill="#E4EFFA" fontSize="9.5px" fontFamily="monospace" fontWeight="600" letterSpacing="0.1em" className="uppercase">
              Pump Relay
            </text>
            <text
              x="24"
              y="9"
              fill={stateConfig.pumpActive ? '#34D399' : '#FFA03C'}
              fontSize="8px"
              fontFamily="monospace"
              letterSpacing="0.08em"
              className="uppercase"
            >
              {stateConfig.pumpActive ? 'STATUS: ACTIVE' : 'STATUS: CUTOFF'}
            </text>
          </g>

          {/* Flow Sensor Node */}
          <g transform="translate(40, 260)">
            <rect x="-13" y="-7" width="26" height="14" rx="3.5" fill="#041620" stroke="#18BFF2" strokeWidth="1.4" />
            <circle cx="0" cy="0" r="3" fill="#72E4FF" />
            {stateConfig.sensorPulsing && (
              <circle cx="0" cy="0" r="18" fill="none" stroke="#72E4FF" strokeWidth="1.2" className="animate-ping" />
            )}
            <text x="20" y="3.5" fill="#7C99BA" fontSize="9px" fontFamily="monospace" letterSpacing="0.1em" className="uppercase font-semibold">
              Flow Sensor ({stateConfig.flowRate} L/m)
            </text>
          </g>

          {/* Digital Telemetry Signal Line */}
          <path
            d={dataTelemetryPath}
            stroke="#72E4FF"
            strokeWidth="1.5"
            strokeDasharray="4 4"
            opacity={stateConfig.sensorPulsing ? '0.85' : '0.2'}
            className="transition-opacity duration-300"
          />

          {/* Main Supply Source Node */}
          <g transform="translate(40, 490)">
            <rect x="-16" y="-10" width="32" height="20" rx="4" fill="#041620" stroke="#0C2B36" strokeWidth="1.5" />
            <circle cx="0" cy="0" r="3.5" fill="#18BFF2" />
            <text x="22" y="3.5" fill="#7C99BA" fontSize="9px" fontFamily="monospace" letterSpacing="0.1em" className="uppercase font-semibold">
              Main Inflow Supply
            </text>
          </g>

          {/* Persistent Live Infrastructure State Label */}
          <g transform="translate(180, 520)">
            <rect x="0" y="-14" width="230" height="24" rx="6" fill="#061B21" fillOpacity="0.85" stroke="#18BFF2" strokeWidth="1" strokeOpacity="0.3" />
            <circle cx="12" cy="-2" r="3" fill={stateConfig.pumpActive ? '#34D399' : '#FFA03C'} className="animate-pulse" />
            <text x="22" y="1" fill="#E4EFFA" fontSize="8.5px" fontFamily="monospace" letterSpacing="0.12em" className="uppercase font-medium">
              {stateConfig.statusLabel}
            </text>
          </g>
        </svg>
      </div>
    </div>
  );
};
