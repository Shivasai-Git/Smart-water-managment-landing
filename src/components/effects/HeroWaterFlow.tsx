import React, { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface HeroWaterFlowProps {
  onFlowUpdate?: (step: 'pump' | 'flow' | 'sensor' | 'tank' | 'data' | 'idle') => void;
  className?: string;
}

export const HeroWaterFlow: React.FC<HeroWaterFlowProps> = ({ onFlowUpdate, className = '' }) => {
  const isReduced = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(() => (typeof window !== 'undefined' ? window.innerWidth < 768 : false));

  // Sequence stages:
  // 0: Pump Standby -> Active
  // 1: Water Moving through pipe
  // 2: Flow Sensor Pulse
  // 3: Tank Fill (Water enters rooftop tank)
  // 4: Telemetry Pulse to Dashboard
  // 5: Steady State / Exit transition to Problem Section
  const [stage, setStage] = useState<number>(0);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize, { passive: true });

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
    };
  }, []);

  // Hero Main Sequence Loop (4.4s full cycle)
  useEffect(() => {
    if (!isVisible || isReduced) return;

    let timer: ReturnType<typeof setTimeout>;

    const runLoop = () => {
      // 1. Pump activates
      setStage(0);
      onFlowUpdate?.('pump');

      timer = setTimeout(() => {
        // 2. Water moves through pipe
        setStage(1);
        onFlowUpdate?.('flow');

        timer = setTimeout(() => {
          // 3. Flow sensor pulses
          setStage(2);
          onFlowUpdate?.('sensor');

          timer = setTimeout(() => {
            // 4. Enters tank & raises level
            setStage(3);
            onFlowUpdate?.('tank');

            timer = setTimeout(() => {
              // 5. Data pulse fires to dashboard indicator
              setStage(4);
              onFlowUpdate?.('data');

              timer = setTimeout(() => {
                // 6. Water exits toward next section (Problem Section)
                setStage(5);
                onFlowUpdate?.('idle');

                timer = setTimeout(runLoop, 1400);
              }, 900);
            }, 750);
          }, 650);
        }, 600);
      }, 500);
    };

    runLoop();

    return () => clearTimeout(timer);
  }, [isVisible, isReduced, onFlowUpdate]);

  // Desktop Engineered Conduit Routing:
  // Main Supply [70, 490] -> Pump [70, 370] -> Sensor [70, 260] -> 90° corner [70, 130] -> Horizontal [330, 130] -> Down into Tank [330, 220]
  // Exit conduit: Down from Tank / Supply [70, 490] -> [70, 520] (exits bottom towards Problem section)
  const desktopWaterPath = 'M 70,520 L 70,370 L 70,260 L 70,146 Q 70,130 86,130 L 314,130 Q 330,130 330,146 L 330,220';
  const desktopExitBranch = 'M 70,370 L 70,520';
  const desktopDataPath = 'M 70,260 L 15,260';

  // Mobile Clean Vertical Conduit:
  const mobileWaterPath = 'M 140,290 L 140,230 L 140,150 L 140,65';
  const mobileDataPath = 'M 140,150 L 40,150';

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full pointer-events-none select-none ${className}`}
      aria-label="Hero Water Source & Inflow Infrastructure"
    >
      <svg
        className="w-full h-full overflow-visible"
        viewBox={isMobile ? '0 0 280 300' : '0 0 420 520'}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Continuous Physical Water Gradient (#087EA8 -> #18BFF2 -> #72E4FF) */}
          <linearGradient id="heroFluidGrad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#087EA8" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#18BFF2" stopOpacity="0.98" />
            <stop offset="100%" stopColor="#72E4FF" stopOpacity="0.95" />
          </linearGradient>

          {/* Crisp Water Glow */}
          <filter id="heroWaterGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation={isMobile ? '1.8' : '3'} result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Digital Telemetry Gradient */}
          <linearGradient id="heroTelemetryGrad" x1="100%" y1="0%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#72E4FF" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#18BFF2" stopOpacity="0.3" />
          </linearGradient>
        </defs>

        {/* ================= DESKTOP CONDUIT NETWORK ================= */}
        {!isMobile && (
          <g id="hero-desktop-conduit">
            {/* 1. Outer Static Pipe (Dark Metallic Teal/Steel, 11px) */}
            <path
              d={desktopWaterPath}
              stroke="#061B21"
              strokeWidth="11"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.95"
            />
            <path
              d={desktopWaterPath}
              stroke="#0C2B36"
              strokeWidth="9"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.8"
            />

            {/* 2. Inner Active Water Flow (Continuous Solid Cyan, 5px, 85%+ opacity) */}
            <path
              d={desktopWaterPath}
              stroke="url(#heroFluidGrad)"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity={stage >= 1 ? '0.98' : '0.45'}
              className="transition-opacity duration-300"
            />

            {/* 3. Continuous Traveling Fluid Highlight (1.8px Cyan-White) */}
            {isVisible && !isReduced && (
              <path
                d={desktopWaterPath}
                stroke="#CAF0F8"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="24 130"
                className="water-moving-highlight"
                filter="url(#heroWaterGlow)"
              />
            )}

            {/* Exit Stream continuing to lower edge (Visual continuity to Problem section) */}
            <path
              d={desktopExitBranch}
              stroke="url(#heroFluidGrad)"
              strokeWidth="4"
              strokeLinecap="round"
              opacity="0.75"
            />

            {/* ================= HARDWARE NODES ================= */}

            {/* A. Main Water Supply Entry */}
            <g transform="translate(70, 480)">
              <rect x="-16" y="-10" width="32" height="20" rx="4" fill="#041620" stroke="#0C2B36" strokeWidth="1.5" />
              <circle cx="0" cy="0" r="3.5" fill="#18BFF2" />
              <text x="22" y="3.5" fill="#7C99BA" fontSize="9px" fontFamily="monospace" letterSpacing="0.1em" className="uppercase font-semibold">
                Main Supply
              </text>
            </g>

            {/* B. Smart Pump Housing */}
            <g transform="translate(70, 370)">
              <circle r="17" fill="#061B21" stroke={stage >= 0 ? '#18BFF2' : '#0C2B36'} strokeWidth="1.8" className="transition-colors duration-300" />
              <circle r="10" fill="#04141A" stroke="#123D57" strokeWidth="1" />
              <circle r="4.5" fill={stage >= 0 ? '#18BFF2' : '#0C2B36'} className={stage >= 0 ? 'animate-pulse' : ''} />
              {stage >= 0 && (
                <circle r="22" fill="none" stroke="#18BFF2" strokeWidth="1" opacity="0.3" className="animate-ping" />
              )}
              <text x="24" y="-2" fill="#E4EFFA" fontSize="9.5px" fontFamily="monospace" fontWeight="600" letterSpacing="0.1em" className="uppercase">
                Automated Pump
              </text>
              <text x="24" y="9" fill={stage >= 0 ? '#34D399' : '#7C99BA'} fontSize="8px" fontFamily="monospace" letterSpacing="0.08em" className="uppercase">
                {stage >= 0 ? 'ACTIVE ON' : 'STANDBY'}
              </text>
            </g>

            {/* C. Flow Sensor Node */}
            <g transform="translate(70, 260)">
              <rect x="-13" y="-7" width="26" height="14" rx="3.5" fill="#041620" stroke="#18BFF2" strokeWidth="1.4" />
              <circle cx="0" cy="0" r="3" fill="#72E4FF" />
              {stage === 2 && (
                <circle cx="0" cy="0" r="20" fill="none" stroke="#72E4FF" strokeWidth="1.5" className="animate-ping" />
              )}
              <text x="20" y="3.5" fill="#7C99BA" fontSize="9px" fontFamily="monospace" letterSpacing="0.1em" className="uppercase font-semibold">
                Flow Sensor (12.4 L/m)
              </text>
            </g>

            {/* D. Digital Telemetry Pulse to Dashboard (Sensor -> Data) */}
            <path
              d={desktopDataPath}
              stroke="url(#heroTelemetryGrad)"
              strokeWidth="1.5"
              strokeDasharray="4 5"
              strokeLinecap="round"
              opacity={stage >= 2 ? '0.9' : '0.2'}
              className="transition-opacity duration-300"
            />
            {stage >= 2 && isVisible && !isReduced && (
              <circle cx="42" cy="260" r="2" fill="#72E4FF" className="animate-ping" />
            )}

            {/* E. Rooftop Tank Entry Flange */}
            <g transform="translate(330, 220)">
              <circle r="5.5" fill="#18BFF2" className="animate-pulse" />
              <text x="-68" y="-10" fill="#E4EFFA" fontSize="9px" fontFamily="monospace" letterSpacing="0.08em" className="uppercase font-semibold">
                Tank Intake
              </text>
            </g>
          </g>
        )}

        {/* ================= MOBILE CONDUIT NETWORK (<768px) ================= */}
        {isMobile && (
          <g id="hero-mobile-conduit" transform="translate(10, 5)">
            <path
              d={mobileWaterPath}
              stroke="#061B21"
              strokeWidth="8"
              strokeLinecap="round"
              opacity="0.9"
            />
            <path
              d={mobileWaterPath}
              stroke="url(#heroFluidGrad)"
              strokeWidth="4"
              strokeLinecap="round"
              opacity="0.95"
            />
            {isVisible && !isReduced && (
              <path
                d={mobileWaterPath}
                stroke="#CAF0F8"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeDasharray="16 80"
                className="water-moving-highlight-mobile"
              />
            )}

            {/* Pump */}
            <g transform="translate(140, 230)">
              <circle r="11" fill="#061B21" stroke="#18BFF2" strokeWidth="1.5" />
              <circle r="3.5" fill="#18BFF2" />
              <text x="18" y="3" fill="#E4EFFA" fontSize="8.5px" fontFamily="monospace" letterSpacing="0.08em" className="uppercase font-semibold">
                Pump ON
              </text>
            </g>

            {/* Sensor */}
            <g transform="translate(140, 150)">
              <rect x="-9" y="-5" width="18" height="10" rx="3" fill="#041620" stroke="#72E4FF" strokeWidth="1.2" />
              <circle cx="0" cy="0" r="2.5" fill="#72E4FF" />
              {stage === 2 && (
                <circle cx="0" cy="0" r="13" fill="none" stroke="#72E4FF" strokeWidth="1" className="animate-ping" />
              )}
              <text x="16" y="3" fill="#7C99BA" fontSize="8px" fontFamily="monospace" letterSpacing="0.08em" className="uppercase">
                Sensor 12.4 L/m
              </text>
            </g>

            {/* Telemetry line */}
            <path
              d={mobileDataPath}
              stroke="#72E4FF"
              strokeWidth="1.2"
              strokeDasharray="3 4"
              opacity="0.85"
            />

            {/* Tank entry */}
            <g transform="translate(140, 65)">
              <circle r="4.5" fill="#18BFF2" />
              <text x="15" y="3" fill="#E4EFFA" fontSize="8.5px" fontFamily="monospace" letterSpacing="0.08em" className="uppercase font-semibold">
                Tank Inflow
              </text>
            </g>
          </g>
        )}
      </svg>
    </div>
  );
};
