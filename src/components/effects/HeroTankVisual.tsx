import React from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface HeroTankVisualProps {
  level?: number;
  className?: string;
}

export const HeroTankVisual: React.FC<HeroTankVisualProps> = ({
  level = 74,
  className = '',
}) => {
  const isReduced = useReducedMotion();

  // Water level calculations (internal chamber height: 250px)
  const chamberTop = 130;
  const chamberHeight = 250;
  const waterHeight = (level / 100) * chamberHeight;
  const waterSurfaceY = chamberTop + chamberHeight - waterHeight;

  return (
    <div
      className={`relative w-full max-w-[500px] aspect-[440/560] select-none pointer-events-none flex items-center justify-center transform-gpu ${className}`}
      aria-label="Overhead Water Storage Tank 3D Isometric View"
    >
      {/* 1. Soft Radial Illumination Glow Behind Tank (Pure gradient, NO blur filter) */}
      <div
        className="absolute w-[110%] h-[110%] -top-[5%] -left-[5%] rounded-full opacity-35 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(24,191,242,0.3) 0%, rgba(8,126,168,0.12) 45%, transparent 70%)',
        }}
      />

      <svg
        viewBox="0 0 460 580"
        className="w-full h-full overflow-visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Main Tank Body Cylindrical Shading Gradient (Dark Navy / Charcoal) */}
          <linearGradient id="tankBodyGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#061822" />
            <stop offset="25%" stopColor="#0B2738" />
            <stop offset="60%" stopColor="#10364C" />
            <stop offset="85%" stopColor="#0B2738" />
            <stop offset="100%" stopColor="#05151F" />
          </linearGradient>

          {/* Structural Rib Shadow / Highlight Gradient */}
          <linearGradient id="ribGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#04121A" />
            <stop offset="35%" stopColor="#144663" />
            <stop offset="70%" stopColor="#1A587D" />
            <stop offset="100%" stopColor="#030E14" />
          </linearGradient>

          {/* Vibrant Cyan Water Gradient inside Cutaway Window */}
          <linearGradient id="waterChamberGrad" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#064866" stopOpacity="0.95" />
            <stop offset="40%" stopColor="#0E759E" stopOpacity="0.95" />
            <stop offset="85%" stopColor="#18BFF2" stopOpacity="0.98" />
            <stop offset="100%" stopColor="#72E4FF" stopOpacity="1" />
          </linearGradient>

          {/* Cyan Rim Lighting Gradient (Left & Right Outlines) */}
          <linearGradient id="rimLightGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#72E4FF" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#18BFF2" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#087EA8" stopOpacity="0.2" />
          </linearGradient>

          {/* Cutaway Level Window Clipping Mask */}
          <clipPath id="inspectionWindowClip">
            <rect x="135" y={chamberTop} width="150" height={chamberHeight} rx="12" />
          </clipPath>
        </defs>

        {/* =========================================================================
            1. INLET SUPPLY PIPE & THREADED COUPLER (Top Left)
            ========================================================================= */}
        <g id="inlet-pipe-assembly">
          {/* Metallic Supply Pipe Coming in from Left */}
          <path
            d="M 30,80 L 140,80 Q 155,80 155,95 L 155,120"
            stroke="#061B21"
            strokeWidth="16"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M 30,80 L 140,80 Q 155,80 155,95 L 155,120"
            stroke="#0C2B36"
            strokeWidth="11"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Active Flowing Cyan Water inside pipe */}
          <path
            d="M 30,80 L 140,80 Q 155,80 155,95 L 155,120"
            stroke="#18BFF2"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Traveling Bright Highlight Segment */}
          {!isReduced && (
            <path
              d="M 30,80 L 140,80 Q 155,80 155,95 L 155,120"
              stroke="#CAF0F8"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray="20 90"
              className="water-moving-highlight-fast"
            />
          )}
          {/* Brass/Steel Flange Coupler */}
          <rect x="142" y="112" width="26" height="10" rx="3" fill="#144663" stroke="#18BFF2" strokeWidth="1" />
        </g>

        {/* =========================================================================
            2. MAIN CYLINDRICAL TANK BODY (Heavy-Duty Charcoal/Navy Polyethylene)
            ========================================================================= */}
        <g id="tank-body-structure">
          {/* Bottom Tank Base Ellipse Shadow */}
          <ellipse cx="210" cy="485" rx="162" ry="24" fill="#02090D" fillOpacity="0.8" />

          {/* Main Cylindrical Shell */}
          <path
            d="M 52,140 
               L 52,470 
               C 52,495 368,495 368,470 
               L 368,140 
               Z"
            fill="url(#tankBodyGrad)"
            stroke="#164A6B"
            strokeWidth="2"
          />

          {/* Left & Right Subtle Cyan Rim Light Strokes */}
          <line x1="52" y1="140" x2="52" y2="470" stroke="url(#rimLightGrad)" strokeWidth="3" />
          <line x1="368" y1="140" x2="368" y2="470" stroke="url(#rimLightGrad)" strokeWidth="3" />

          {/* Horizontal Structural Reinforcement Ribs (6 Prominent Heavy Ribs) */}
          {[175, 225, 275, 325, 375, 425].map((yRib, idx) => (
            <g key={idx}>
              {/* Outer Rib Ridge */}
              <ellipse
                cx="210"
                cy={yRib}
                rx="158"
                ry="18"
                fill="none"
                stroke="url(#ribGrad)"
                strokeWidth="7"
              />
              {/* Top Highlight on Rib */}
              <path
                d={`M 62,${yRib} C 120,${yRib + 12} 300,${yRib + 12} 358,${yRib}`}
                fill="none"
                stroke="#1A5C82"
                strokeWidth="1.5"
                opacity="0.85"
              />
            </g>
          ))}

          {/* Tank Top Shoulder Dome */}
          <ellipse cx="210" cy="140" rx="158" ry="24" fill="#0C2B3E" stroke="#164A6B" strokeWidth="2" />
          <ellipse cx="210" cy="136" rx="146" ry="20" fill="#082030" />

          {/* Stepped Heavy-Duty Inspection Lid on Top */}
          <ellipse cx="210" cy="120" rx="72" ry="15" fill="#061824" stroke="#18BFF2" strokeWidth="1.5" />
          <ellipse cx="210" cy="116" rx="60" ry="12" fill="#0A2A3E" stroke="#164A6B" strokeWidth="1" />
          <rect x="204" y="106" width="12" height="6" rx="2" fill="#144663" />
        </g>

        {/* =========================================================================
            3. ULTRASONIC LEVEL SENSOR MODULE (Mounted on Top Center Lid)
            ========================================================================= */}
        <g id="ultrasonic-sensor" transform="translate(210, 114)">
          {/* Sensor Puck Housing */}
          <rect x="-14" y="-16" width="28" height="14" rx="4" fill="#04121A" stroke="#18BFF2" strokeWidth="1.5" />
          {/* Sensor Status Pulsing LED */}
          <circle cx="0" cy="-9" r="3.5" fill="#72E4FF" className="animate-pulse" />
          {/* Downward Sensing Acoustic Pulse Cone */}
          <polygon
            points="-8,0 8,0 36,45 -36,45"
            fill="#18BFF2"
            fillOpacity="0.12"
          />
          {/* Sensor Telemetry Pulse Rings */}
          <ellipse cx="0" cy="22" rx="18" ry="4" fill="none" stroke="#72E4FF" strokeWidth="1" opacity="0.6" className="animate-ping" />
        </g>

        {/* =========================================================================
            4. CUTAWAY LEVEL INSPECTION WINDOW (Bright Cyan Water Column)
            ========================================================================= */}
        <g id="transparent-level-window">
          {/* Window Frame Recess */}
          <rect
            x="133"
            y={chamberTop - 2}
            width="154"
            height={chamberHeight + 4}
            rx="14"
            fill="#030C12"
            stroke="#164A6B"
            strokeWidth="2.5"
          />

          {/* Inside Clipped Water Body */}
          <g clipPath="url(#inspectionWindowClip)">
            {/* Background Chamber Tone */}
            <rect x="135" y={chamberTop} width="150" height={chamberHeight} fill="#051824" />

            {/* Active Cyan-Blue Water Volume */}
            <rect
              x="135"
              y={waterSurfaceY}
              width="150"
              height={chamberTop + chamberHeight - waterSurfaceY}
              fill="url(#waterChamberGrad)"
            />

            {/* Internal Caustic Water Highlight Band */}
            <rect
              x="142"
              y={waterSurfaceY + 12}
              width="30"
              height={chamberTop + chamberHeight - waterSurfaceY - 16}
              fill="#72E4FF"
              fillOpacity="0.15"
              rx="4"
            />

            {/* Glowing Water Surface Meniscus */}
            <ellipse
              cx="210"
              cy={waterSurfaceY}
              rx="75"
              ry="9"
              fill="#72E4FF"
              fillOpacity="0.95"
              stroke="#CAF0F8"
              strokeWidth="2"
            />

            {/* Internal Scale Calibration Hash Marks (25%, 50%, 75%, 100%) */}
            {[25, 50, 75, 100].map((pct) => {
              const markY = chamberTop + chamberHeight - (pct / 100) * chamberHeight;
              return (
                <g key={pct}>
                  <line
                    x1="138"
                    y1={markY}
                    x2="152"
                    y2={markY}
                    stroke="#CAF0F8"
                    strokeWidth="1.5"
                    strokeOpacity="0.75"
                  />
                  <text
                    x="156"
                    y={markY + 3.5}
                    fill="#CAF0F8"
                    fontSize="9px"
                    fontFamily="monospace"
                    fontWeight="bold"
                    opacity="0.8"
                  >
                    {pct}%
                  </text>
                </g>
              );
            })}
          </g>

          {/* Polycarbonate Glass Surface Gloss Reflection Streak */}
          <path
            d={`M 140,${chamberTop + 6} L 180,${chamberTop + 6} L 155,${chamberTop + chamberHeight - 10} L 140,${chamberTop + chamberHeight - 10} Z`}
            fill="#FFFFFF"
            fillOpacity="0.06"
          />

          {/* Outer Glass Highlight Border */}
          <rect
            x="135"
            y={chamberTop}
            width="150"
            height={chamberHeight}
            rx="12"
            fill="none"
            stroke="#18BFF2"
            strokeWidth="1.5"
            strokeOpacity="0.4"
          />
        </g>
      </svg>
    </div>
  );
};
