import { useEffect } from 'react';
import { setupHomeSpatial } from './behaviors';

export default function HomeSpatialScreen() {
  useEffect(() => setupHomeSpatial(), []);
  return (
    <>
    <main className="w-full pt-8 pb-12">
      <div className="flex flex-col w-full space-y-8">
        <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
              <span className="font-label-uppercase text-label-uppercase text-secondary tracking-widest uppercase">
                Telemetry Live • FR-0814
              </span>
            </div>
            <h1 className="font-headline-xl text-headline-xl text-on-surface tracking-tight">
              My Home
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant mt-1">
              Spatial hydraulic mapping &amp; zone-by-zone volumetric consumption
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="p-1 bg-surface-container rounded-full flex items-center shadow-inner">
              <button className="floor-pill px-4 py-1.5 rounded-full font-label-button text-label-button bg-surface-container-lowest text-on-surface shadow-sm transition-all duration-200" id="floor-btn-ground" data-onclick="switchFloor('ground')">
                Ground Floor
              </button>
              <button className="floor-pill px-4 py-1.5 rounded-full font-label-button text-label-button text-on-surface-variant hover:text-on-surface transition-all duration-200" id="floor-btn-level1" data-onclick="switchFloor('level1')">
                Level 1
              </button>
              <button className="floor-pill px-4 py-1.5 rounded-full font-label-button text-label-button text-on-surface-variant hover:text-on-surface transition-all duration-200" id="floor-btn-exterior" data-onclick="switchFloor('exterior')">
                Exterior / Landscape
              </button>
            </div>
            <div className="flex items-center gap-2.5 px-3.5 py-2 rounded-full bg-surface-container-lowest shadow-sm">
              <div className="relative flex items-center justify-center">
                <span className="w-2 h-2 rounded-full bg-secondary"></span>
                <span className="absolute w-3.5 h-3.5 rounded-full bg-secondary-fixed-dim/50 animate-ping"></span>
              </div>
              <span className="font-label-button text-label-button text-on-surface">
                All Zones Active
              </span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-on-primary shadow-sm">
              <span className="material-symbols-outlined text-[18px]">
                speed
              </span>
              <div className="flex items-baseline gap-1">
                <span className="font-label-uppercase text-label-uppercase tracking-wider opacity-70">
                  Master Flow
                </span>
                <span className="font-label-button text-label-button tracking-tight">
                  4.6 L/min
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          <div className="bg-surface-container-lowest bg-surface-container-lowest flex flex-col justify-between hover:translate-y-[-2px] transition-transform duration-200 p-6 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
            <div className="flex items-center justify-between text-on-surface-variant">
              <span className="font-label-uppercase text-label-uppercase tracking-wider uppercase">
                Active Manifolds
              </span>
              <div className="w-8 h-8 rounded-full bg-surface-container-low flex items-center justify-center">
                <span className="material-symbols-outlined text-[18px]">
                  account_tree
                </span>
              </div>
            </div>
            <div className="mt-4 mb-2">
              <div className="flex items-baseline gap-2">
                <span className="font-label-metric text-label-metric text-on-surface tracking-tight">
                  4 / 5
                </span>
                <span className="font-body-md text-body-md text-secondary font-medium">
                  Active
                </span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                Zone 5 (Guest Suite) on standby
              </p>
            </div>
            <div className="w-full bg-surface-container-low rounded-full h-1.5 mt-2 overflow-hidden">
              <div className="bg-secondary h-1.5 rounded-full" style={{ width: "80%" }}></div>
            </div>
          </div>
          <div className="bg-surface-container-lowest bg-surface-container-lowest flex flex-col justify-between hover:translate-y-[-2px] transition-transform duration-200 p-6 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
            <div className="flex items-center justify-between text-on-surface-variant">
              <span className="font-label-uppercase text-label-uppercase tracking-wider uppercase">
                Instant Pressure
              </span>
              <div className="w-8 h-8 rounded-full bg-surface-container-low flex items-center justify-center">
                <span className="material-symbols-outlined text-[18px]">
                  compress
                </span>
              </div>
            </div>
            <div className="mt-4 mb-2">
              <div className="flex items-baseline gap-1.5">
                <span className="font-label-metric text-label-metric text-on-surface tracking-tight">
                  2.4
                </span>
                <span className="font-headline-sm text-headline-sm text-on-surface-variant">
                  bar
                </span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                Optimal operating line gradient
              </p>
            </div>
            <div className="flex items-center gap-1.5 mt-2">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
              <span className="font-label-uppercase text-label-uppercase text-secondary font-medium">
                Nominal Range (2.2 - 2.8)
              </span>
            </div>
          </div>
          <div className="bg-surface-container-lowest bg-surface-container-lowest flex flex-col justify-between hover:translate-y-[-2px] transition-transform duration-200 p-6 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
            <div className="flex items-center justify-between text-on-surface-variant">
              <span className="font-label-uppercase text-label-uppercase tracking-wider uppercase">
                Monitored Endpoints
              </span>
              <div className="w-8 h-8 rounded-full bg-surface-container-low flex items-center justify-center">
                <span className="material-symbols-outlined text-[18px]">
                  sensors
                </span>
              </div>
            </div>
            <div className="mt-4 mb-2">
              <div className="flex items-baseline gap-2">
                <span className="font-label-metric text-label-metric text-on-surface tracking-tight">
                  18
                </span>
                <span className="font-headline-sm text-headline-sm text-on-surface-variant">
                  Fixtures
                </span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                0 abnormal micro-leaks detected
              </p>
            </div>
            <div className="flex items-center gap-1.5 mt-2">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
              <span className="font-label-uppercase text-label-uppercase text-on-surface-variant font-medium">
                100% Sonic Acoustic Health
              </span>
            </div>
          </div>
          <div className="bg-surface-container-lowest bg-surface-container-lowest flex flex-col justify-between hover:translate-y-[-2px] transition-transform duration-200 p-6 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
            <div className="flex items-center justify-between text-on-surface-variant">
              <span className="font-label-uppercase text-label-uppercase tracking-wider uppercase">
                Irrigation Status
              </span>
              <div className="w-8 h-8 rounded-full bg-surface-container-low flex items-center justify-center">
                <span className="material-symbols-outlined text-[18px]">
                  yard
                </span>
              </div>
            </div>
            <div className="mt-4 mb-2">
              <div className="flex items-baseline gap-1.5">
                <span className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
                  05:30
                </span>
                <span className="font-body-md text-body-md text-on-surface-variant">
                  AM Tomorrow
                </span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                Weather-adjusted: Rain delay skipped
              </p>
            </div>
            <div className="flex items-center gap-1.5 mt-2">
              <span className="material-symbols-outlined text-[16px] text-secondary">
                cloud_done
              </span>
              <span className="font-label-uppercase text-label-uppercase text-secondary font-medium">
                Predictive Evapotranspiration
              </span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-12 items-start gap-6">
          <div className="xl:col-span-8 flex flex-col gap-6">
            <div className="bg-surface-container-lowest bg-surface-container-lowest relative overflow-hidden p-6 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6">
                <div className="space-y-1">
                  <span className="font-label-uppercase text-label-uppercase text-on-surface-variant tracking-wider uppercase">
                    Architectural Telemetry Overlay
                  </span>
                  <h2 className="font-headline-md text-headline-md text-on-surface tracking-tight">
                    Residence Hydraulic Spatial Map
                  </h2>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container-low text-on-surface-variant font-body-sm text-body-sm">
                    <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
                    <span>
                      Conduit Flow Visualizer
                    </span>
                  </div>
                  <button className="p-2 rounded-full bg-surface-container-low hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface transition-colors" data-onclick="resetZoneZoom()" title="Reset Viewport">
                    <span className="material-symbols-outlined text-[18px]">
                      crop_free
                    </span>
                  </button>
                </div>
              </div>
              <div className="relative w-full rounded-2xl bg-surface-container-low/40 p-4 lg:p-6 overflow-hidden">
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "radial-gradient(#000 1px, transparent 1px)", backgroundSize: "24px 24px" }}></div>
                <svg className="w-full h-auto drop-shadow-sm select-none" viewBox="0 0 860 480" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="pipeFlow" x1="0%" x2="100%" y1="0%" y2="0%">
                      <stop offset="0%" stopColor="#006c49" stopOpacity="0.2" />
                      <stop offset="50%" stopColor="#006c49" stopOpacity="0.9" />
                      <stop offset="100%" stopColor="#006c49" stopOpacity="0.2" />
                    </linearGradient>
                    <linearGradient id="pipeIdle" x1="0%" x2="100%" y1="0%" y2="0%">
                      <stop offset="0%" stopColor="#78767b" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#78767b" stopOpacity="0.3" />
                    </linearGradient>
                  </defs>
                  <rect fill="#f8f9fa" height="400" opacity="0.9" rx="20" stroke="none" width="780" x="40" y="40" />
                  <path className="conduit-active" d="M 120 240 L 260 240 L 260 140 L 410 140" fill="none" stroke="#006c49" strokeDasharray="6,4" strokeLinecap="round" strokeWidth="3" />
                  <path className="conduit-active" d="M 260 240 L 260 340 L 410 340" fill="none" stroke="#006c49" strokeDasharray="6,4" strokeLinecap="round" strokeWidth="3" />
                  <path d="M 410 140 L 580 140" fill="none" stroke="#c8c5ca" strokeLinecap="round" strokeWidth="2.5" />
                  <path d="M 410 340 L 580 340" fill="none" stroke="#006c49" strokeDasharray="4,4" strokeWidth="2.5" />
                  <path d="M 580 340 L 720 340" fill="none" stroke="#c8c5ca" strokeLinecap="round" strokeWidth="2" />
                  <g className="cursor-pointer transition-transform duration-200 hover:scale-[1.02]" id="zone-node-1" data-onclick="selectZone(1)">
                    <rect fill="#ffffff" filter="drop-shadow(0 4px 12px rgba(0,0,0,0.04))" height="120" rx="16" width="220" x="290" y="80" />
                    <rect fill="#006c49" height="120" rx="2" width="5" x="290" y="80" />
                    <text fill="#191c1d" fontFamily="Plus Jakarta Sans" fontSize="14" fontWeight="600" x="312" y="112">
                      Zone 1 • Kitchen &amp; Pantry
                    </text>
                    <text fill="#47464a" fontFamily="Plus Jakarta Sans" fontSize="12" x="312" y="132">
                      Sink, Dishwasher, Ice Maker
                    </text>
                    <circle cx="316" cy="162" fill="#006c49" r="4" />
                    <text fill="#006c49" fontFamily="Plus Jakarta Sans" fontSize="13" fontWeight="600" x="328" y="166">
                      2.1 L/min
                    </text>
                    <rect fill="#e7e8e9" height="24" rx="12" width="64" x="428" y="150" />
                    <text fill="#191c1d" fontFamily="Plus Jakarta Sans" fontSize="11" fontWeight="600" x="446" y="166">
                      OPEN
                    </text>
                  </g>
                  <g className="cursor-pointer transition-transform duration-200 hover:scale-[1.02]" id="zone-node-2" data-onclick="selectZone(2)">
                    <rect fill="#ffffff" filter="drop-shadow(0 4px 12px rgba(0,0,0,0.04))" height="120" rx="16" width="220" x="540" y="80" />
                    <rect fill="#78767b" height="120" rx="2" width="5" x="540" y="80" />
                    <text fill="#191c1d" fontFamily="Plus Jakarta Sans" fontSize="14" fontWeight="600" x="562" y="112">
                      Zone 2 • Master Bath &amp; Spa
                    </text>
                    <text fill="#47464a" fontFamily="Plus Jakarta Sans" fontSize="12" x="562" y="132">
                      Rain Shower, Soaking Tub, Vanities
                    </text>
                    <circle cx="566" cy="162" fill="#78767b" r="4" />
                    <text fill="#47464a" fontFamily="Plus Jakarta Sans" fontSize="13" fontWeight="500" x="578" y="166">
                      0.0 L/min • Idle
                    </text>
                    <rect fill="#e7e8e9" height="24" rx="12" width="64" x="678" y="150" />
                    <text fill="#191c1d" fontFamily="Plus Jakarta Sans" fontSize="11" fontWeight="600" x="696" y="166">
                      OPEN
                    </text>
                  </g>
                  <g className="cursor-pointer transition-transform duration-200 hover:scale-[1.02]" id="zone-node-3" data-onclick="selectZone(3)">
                    <rect fill="#ffffff" filter="drop-shadow(0 4px 12px rgba(0,0,0,0.04))" height="120" rx="16" width="220" x="290" y="280" />
                    <rect fill="#006c49" height="120" rx="2" width="5" x="290" y="280" />
                    <text fill="#191c1d" fontFamily="Plus Jakarta Sans" fontSize="14" fontWeight="600" x="312" y="312">
                      Zone 3 • Utility &amp; Powder
                    </text>
                    <text fill="#47464a" fontFamily="Plus Jakarta Sans" fontSize="12" x="312" y="332">
                      High-efficiency Washer, Basin
                    </text>
                    <circle cx="316" cy="362" fill="#006c49" r="4" />
                    <text fill="#006c49" fontFamily="Plus Jakarta Sans" fontSize="13" fontWeight="600" x="328" y="366">
                      1.5 L/min
                    </text>
                    <rect fill="#e7e8e9" height="24" rx="12" width="64" x="428" y="350" />
                    <text fill="#191c1d" fontFamily="Plus Jakarta Sans" fontSize="11" fontWeight="600" x="446" y="366">
                      OPEN
                    </text>
                  </g>
                  <g className="cursor-pointer transition-transform duration-200 hover:scale-[1.02]" id="zone-node-4" data-onclick="selectZone(4)">
                    <rect fill="#ffffff" filter="drop-shadow(0 4px 12px rgba(0,0,0,0.04))" height="120" rx="16" width="220" x="540" y="280" />
                    <rect fill="#4edea3" height="120" rx="2" width="5" x="540" y="280" />
                    <text fill="#191c1d" fontFamily="Plus Jakarta Sans" fontSize="14" fontWeight="600" x="562" y="312">
                      Zone 4 • Drip Irrigation
                    </text>
                    <text fill="#47464a" fontFamily="Plus Jakarta Sans" fontSize="12" x="562" y="332">
                      Soil Moisture: 64% • Courtyard
                    </text>
                    <circle cx="566" cy="362" fill="#006c49" r="4" />
                    <text fill="#006c49" fontFamily="Plus Jakarta Sans" fontSize="13" fontWeight="600" x="578" y="366">
                      1.0 L/min
                    </text>
                    <rect fill="#6cf8bb" fillOpacity="0.3" height="24" rx="12" width="74" x="668" y="350" />
                    <text fill="#005236" fontFamily="Plus Jakarta Sans" fontSize="11" fontWeight="600" x="677" y="366">
                      50% FLOW
                    </text>
                  </g>
                  <g className="cursor-pointer" id="main-inlet">
                    <circle cx="120" cy="240" fill="#1c1b1d" filter="drop-shadow(0 4px 16px rgba(0,0,0,0.12))" r="32" />
                    <circle cx="120" cy="240" fill="#000000" r="24" />
                    <path d="M 112 240 L 128 240 M 120 232 L 120 248" stroke="#ffffff" strokeLinecap="round" strokeWidth="2.5" />
                    <text fill="#191c1d" fontFamily="Plus Jakarta Sans" fontSize="12" fontWeight="600" textAnchor="middle" x="120" y="292">
                      MAIN INLET
                    </text>
                    <text fill="#47464a" fontFamily="Plus Jakarta Sans" fontSize="10" textAnchor="middle" x="120" y="308">
                      2.4 bar line
                    </text>
                  </g>
                  <g className="cursor-pointer transition-transform duration-200 hover:scale-[1.02]" id="zone-node-5" data-onclick="selectZone(5)">
                    <rect fill="#ffffff" height="60" opacity="0.9" rx="12" width="92" x="74" y="330" />
                    <text fill="#78767b" fontFamily="Plus Jakarta Sans" fontSize="11" fontWeight="600" textAnchor="middle" x="120" y="354">
                      ZONE 5
                    </text>
                    <text fill="#ba1a1a" fontFamily="Plus Jakarta Sans" fontSize="10" fontWeight="600" textAnchor="middle" x="120" y="372">
                      CLOSED
                    </text>
                  </g>
                </svg>
              </div>
              <div className="mt-6 flex flex-wrap items-center justify-between gap-4 pt-4">
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-1 rounded-full bg-secondary"></span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">
                      Active Pressurized Flow
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-1 rounded-full bg-outline-variant"></span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">
                      Pressurized Standby
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-1 rounded-full bg-error"></span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">
                      Solenoid Isolated
                    </span>
                  </div>
                </div>
                <span className="font-label-uppercase text-label-uppercase text-on-surface-variant tracking-wider">
                  Plan Scale 1:50 Architectural Metric
                </span>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="bg-surface-container-lowest bg-surface-container-lowest space-y-4 p-6 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-surface-container-low flex items-center justify-center">
                      <span className="material-symbols-outlined text-[18px]">
                        valve
                      </span>
                    </div>
                    <div>
                      <h3 className="font-headline-sm text-headline-sm text-on-surface">
                        Manifold Hydraulic Balancing
                      </h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">
                        Continuous differential differential vector
                      </p>
                    </div>
                  </div>
                  <span className="font-label-button text-label-button px-2.5 py-1 rounded-full bg-surface-container-high text-on-surface">
                    99.4% Eq
                  </span>
                </div>
                <div className="space-y-3 pt-1">
                  <div className="space-y-1">
                    <div className="flex justify-between font-body-sm text-body-sm">
                      <span className="text-on-surface font-medium">
                        Kitchen Trunk Line
                      </span>
                      <span className="text-on-surface-variant">
                        2.41 bar
                      </span>
                    </div>
                    <div className="w-full bg-surface-container-low rounded-full h-1.5 overflow-hidden">
                      <div className="bg-primary h-1.5 rounded-full" style={{ width: "86%" }}></div>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between font-body-sm text-body-sm">
                      <span className="text-on-surface font-medium">
                        Master Spa Branch
                      </span>
                      <span className="text-on-surface-variant">
                        2.39 bar
                      </span>
                    </div>
                    <div className="w-full bg-surface-container-low rounded-full h-1.5 overflow-hidden">
                      <div className="bg-primary h-1.5 rounded-full" style={{ width: "84%" }}></div>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between font-body-sm text-body-sm">
                      <span className="text-on-surface font-medium">
                        Utility &amp; Laundry
                      </span>
                      <span className="text-on-surface-variant">
                        2.38 bar
                      </span>
                    </div>
                    <div className="w-full bg-surface-container-low rounded-full h-1.5 overflow-hidden">
                      <div className="bg-primary h-1.5 rounded-full" style={{ width: "83%" }}></div>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between font-body-sm text-body-sm">
                      <span className="text-on-surface font-medium">
                        Exterior Hydro-Loop
                      </span>
                      <span className="text-on-surface-variant">
                        2.15 bar (PRV Throttled)
                      </span>
                    </div>
                    <div className="w-full bg-surface-container-low rounded-full h-1.5 overflow-hidden">
                      <div className="bg-secondary h-1.5 rounded-full" style={{ width: "74%" }}></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-surface-container-lowest bg-surface-container-lowest space-y-4 p-6 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-surface-container-low flex items-center justify-center">
                      <span className="material-symbols-outlined text-[18px]">
                        verified_user
                      </span>
                    </div>
                    <div>
                      <h3 className="font-headline-sm text-headline-sm text-on-surface">
                        Autonomous Protection
                      </h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">
                        Acoustic &amp; pressure decay guard
                      </p>
                    </div>
                  </div>
                  <span className="w-2.5 h-2.5 rounded-full bg-secondary"></span>
                </div>
                <div className="space-y-2.5 pt-1">
                  <div className="p-3 rounded-3xl bg-surface-container-low/60 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-secondary text-[20px]">
                        shield
                      </span>
                      <div>
                        <div className="font-label-button text-label-button text-on-surface">
                          Auto-Shutoff on Burst
                        </div>
                        <div className="font-body-sm text-body-sm text-on-surface-variant">
                          Threshold &gt; 35 L/min for 90 sec
                        </div>
                      </div>
                    </div>
                    <span className="font-label-uppercase text-label-uppercase text-secondary font-semibold">
                      Armed
                    </span>
                  </div>
                  <div className="p-3 rounded-3xl bg-surface-container-low/60 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-secondary text-[20px]">
                        nightlight
                      </span>
                      <div>
                        <div className="font-label-button text-label-button text-on-surface">
                          Nocturnal Decay Test
                        </div>
                        <div className="font-body-sm text-body-sm text-on-surface-variant">
                          Next run scheduled at 03:00 AM
                        </div>
                      </div>
                    </div>
                    <span className="font-label-uppercase text-label-uppercase text-on-surface-variant font-semibold">
                      Ready
                    </span>
                  </div>
                  <div className="p-3 rounded-3xl bg-surface-container-low/60 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-secondary text-[20px]">
                        thermostat
                      </span>
                      <div>
                        <div className="font-label-button text-label-button text-on-surface">
                          Thermal Freeze Mitigator
                        </div>
                        <div className="font-body-sm text-body-sm text-on-surface-variant">
                          Trunk pipe temp 18.4°C (Safe)
                        </div>
                      </div>
                    </div>
                    <span className="font-label-uppercase text-label-uppercase text-secondary font-semibold">
                      Active
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="xl:col-span-4 space-y-6">
            <div className="bg-surface-container-lowest bg-surface-container-lowest space-y-6 p-6 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <span className="font-label-uppercase text-label-uppercase text-on-surface-variant tracking-wider uppercase">
                    Zonal Control
                  </span>
                  <h2 className="font-headline-md text-headline-md text-on-surface tracking-tight">
                    Quick Isolation
                  </h2>
                </div>
                <button className="px-3.5 py-1.5 rounded-full bg-error-container text-on-error-container hover:bg-error hover:text-on-error transition-colors font-label-button text-label-button flex items-center gap-1.5" data-onclick="emergencyIsolationConfirm()">
                  <span className="material-symbols-outlined text-[16px]">
                    power_settings_new
                  </span>
                  <span>
                    Emergency Shutoff
                  </span>
                </button>
              </div>
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-surface-container-low/50 hover:bg-surface-container-low transition-colors duration-150 space-y-3" id="card-zone-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-surface-container-lowest flex items-center justify-center shadow-sm">
                        <span className="material-symbols-outlined text-[18px] text-on-surface">
                          restaurant
                        </span>
                      </div>
                      <div>
                        <h4 className="font-label-button text-label-button text-on-surface">
                          Kitchen &amp; Pantry
                        </h4>
                        <span className="font-body-sm text-body-sm text-secondary font-medium">
                          Active • 2.1 L/min
                        </span>
                      </div>
                    </div>
                    <button className="valve-toggle-btn px-3 py-1 rounded-full bg-primary text-on-primary font-label-button text-label-button tracking-wider hover:opacity-90 active:scale-95 transition-all" data-onclick="toggleValve(1, this)">
                      OPEN
                    </button>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between font-body-sm text-body-sm text-on-surface-variant">
                      <span>
                        Daily Consumption Share
                      </span>
                      <span className="font-medium text-on-surface">
                        42% (260 L)
                      </span>
                    </div>
                    <div className="w-full bg-surface-container-highest rounded-full h-1.5 overflow-hidden">
                      <div className="bg-primary h-1.5 rounded-full" style={{ width: "42%" }}></div>
                    </div>
                  </div>
                </div>
                <div className="p-4 rounded-2xl bg-surface-container-low/50 hover:bg-surface-container-low transition-colors duration-150 space-y-3" id="card-zone-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-surface-container-lowest flex items-center justify-center shadow-sm">
                        <span className="material-symbols-outlined text-[18px] text-on-surface">
                          bathtub
                        </span>
                      </div>
                      <div>
                        <h4 className="font-label-button text-label-button text-on-surface">
                          Master Bath &amp; Spa
                        </h4>
                        <span className="font-body-sm text-body-sm text-on-surface-variant">
                          Standby • 0.0 L/min
                        </span>
                      </div>
                    </div>
                    <button className="valve-toggle-btn px-3 py-1 rounded-full bg-primary text-on-primary font-label-button text-label-button tracking-wider hover:opacity-90 active:scale-95 transition-all" data-onclick="toggleValve(2, this)">
                      OPEN
                    </button>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between font-body-sm text-body-sm text-on-surface-variant">
                      <span>
                        Daily Consumption Share
                      </span>
                      <span className="font-medium text-on-surface">
                        28% (175 L)
                      </span>
                    </div>
                    <div className="w-full bg-surface-container-highest rounded-full h-1.5 overflow-hidden">
                      <div className="bg-primary h-1.5 rounded-full" style={{ width: "28%" }}></div>
                    </div>
                  </div>
                </div>
                <div className="p-4 rounded-2xl bg-surface-container-low/50 hover:bg-surface-container-low transition-colors duration-150 space-y-3" id="card-zone-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-surface-container-lowest flex items-center justify-center shadow-sm">
                        <span className="material-symbols-outlined text-[18px] text-on-surface">
                          local_laundry_service
                        </span>
                      </div>
                      <div>
                        <h4 className="font-label-button text-label-button text-on-surface">
                          Powder Room &amp; Utility
                        </h4>
                        <span className="font-body-sm text-body-sm text-secondary font-medium">
                          Active • 1.5 L/min
                        </span>
                      </div>
                    </div>
                    <button className="valve-toggle-btn px-3 py-1 rounded-full bg-primary text-on-primary font-label-button text-label-button tracking-wider hover:opacity-90 active:scale-95 transition-all" data-onclick="toggleValve(3, this)">
                      OPEN
                    </button>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between font-body-sm text-body-sm text-on-surface-variant">
                      <span>
                        Daily Consumption Share
                      </span>
                      <span className="font-medium text-on-surface">
                        18% (112 L)
                      </span>
                    </div>
                    <div className="w-full bg-surface-container-highest rounded-full h-1.5 overflow-hidden">
                      <div className="bg-primary h-1.5 rounded-full" style={{ width: "18%" }}></div>
                    </div>
                  </div>
                </div>
                <div className="p-4 rounded-2xl bg-surface-container-low/50 hover:bg-surface-container-low transition-colors duration-150 space-y-3" id="card-zone-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-surface-container-lowest flex items-center justify-center shadow-sm">
                        <span className="material-symbols-outlined text-[18px] text-on-surface">
                          potted_plant
                        </span>
                      </div>
                      <div>
                        <h4 className="font-label-button text-label-button text-on-surface">
                          Garden &amp; Drip Lines
                        </h4>
                        <span className="font-body-sm text-body-sm text-secondary font-medium">
                          Throttled • 1.0 L/min
                        </span>
                      </div>
                    </div>
                    <button className="valve-toggle-btn px-3 py-1 rounded-full bg-secondary text-on-secondary font-label-button text-label-button tracking-wider hover:opacity-90 active:scale-95 transition-all" data-onclick="toggleValve(4, this)">
                      50% FLOW
                    </button>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between font-body-sm text-body-sm text-on-surface-variant">
                      <span>
                        Daily Consumption Share
                      </span>
                      <span className="font-medium text-on-surface">
                        12% (75 L)
                      </span>
                    </div>
                    <div className="w-full bg-surface-container-highest rounded-full h-1.5 overflow-hidden">
                      <div className="bg-secondary h-1.5 rounded-full" style={{ width: "12%" }}></div>
                    </div>
                  </div>
                </div>
                <div className="p-4 rounded-2xl bg-surface-container-low/30 border-dashed border-outline-variant space-y-3" id="card-zone-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-surface-container-low flex items-center justify-center shadow-sm">
                        <span className="material-symbols-outlined text-[18px] text-on-surface-variant">
                          hotel
                        </span>
                      </div>
                      <div>
                        <h4 className="font-label-button text-label-button text-on-surface-variant">
                          Guest Pavilion
                        </h4>
                        <span className="font-body-sm text-body-sm text-on-surface-variant">
                          Vacation Mode • Isolated
                        </span>
                      </div>
                    </div>
                    <button className="valve-toggle-btn px-3 py-1 rounded-full bg-surface-container-high text-on-surface font-label-button text-label-button tracking-wider hover:bg-surface-variant active:scale-95 transition-all" data-onclick="toggleValve(5, this)">
                      CLOSED
                    </button>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between font-body-sm text-body-sm text-on-surface-variant">
                      <span>
                        Daily Consumption Share
                      </span>
                      <span className="font-medium text-on-surface">
                        0% (0 L)
                      </span>
                    </div>
                    <div className="w-full bg-surface-container-highest rounded-full h-1.5 overflow-hidden">
                      <div className="bg-outline h-1.5 rounded-full" style={{ width: "0%" }}></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-surface-container-low space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-label-uppercase text-label-uppercase text-on-surface-variant uppercase tracking-wider">
                    Estimated Day Projection
                  </span>
                  <span className="font-headline-sm text-headline-sm text-on-surface">
                    622 L / 800 L
                  </span>
                </div>
                <div className="w-full bg-surface-container-highest rounded-full h-2 overflow-hidden flex">
                  <div className="bg-primary h-2" style={{ width: "58%" }}></div>
                  <div className="bg-secondary h-2" style={{ width: "19%" }}></div>
                  <div className="bg-surface-tint/20 h-2" style={{ width: "23%" }}></div>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Estate running 22% under maximum sustainability baseline threshold.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
    </>
  );
}
