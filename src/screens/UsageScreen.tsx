import { useEffect } from 'react';
import { setupUsage } from './behaviors';

export default function UsageScreen() {
  useEffect(() => setupUsage(), []);
  return (
    <>
    <main className="w-full pt-8 pb-12">
      <div className="flex flex-col w-full space-y-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
              <span className="font-label-uppercase text-label-uppercase tracking-widest text-on-surface-variant uppercase">
                Telemetry Node • HydroSense FR-0814
              </span>
            </div>
            <h1 className="font-headline-xl text-headline-xl text-on-surface tracking-tight">
              Water Usage &amp; Analytics
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant mt-1">
              Historical consumption breakdown, peak demand telemetry, and predictive budgeting.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex p-1 bg-surface-container rounded-full shadow-inner" id="period-toggle-group">
              <button className="px-3.5 py-1.5 rounded-full font-label-button text-label-button font-semibold bg-primary text-on-primary transition-all duration-200" type="button">
                Today
              </button>
              <button className="px-3.5 py-1.5 rounded-full font-label-button text-label-button text-on-surface-variant hover:text-on-surface transition-all duration-200" type="button">
                7D
              </button>
              <button className="px-3.5 py-1.5 rounded-full font-label-button text-label-button text-on-surface-variant hover:text-on-surface transition-all duration-200" type="button">
                30D
              </button>
              <button className="px-3.5 py-1.5 rounded-full font-label-button text-label-button text-on-surface-variant hover:text-on-surface transition-all duration-200" type="button">
                12M
              </button>
              <button className="px-3.5 py-1.5 rounded-full font-label-button text-label-button text-on-surface-variant hover:text-on-surface transition-all duration-200" type="button">
                Custom
              </button>
            </div>
            <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-surface-container-lowest text-on-surface hover:bg-surface-container-high transition-all duration-200 shadow-[0_8px_30px_rgba(0,0,0,0.04)] font-label-button text-label-button" type="button">
              <span className="material-symbols-outlined text-[18px]">
                download
              </span>
              <span>
                Export CSV / PDF
              </span>
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          <div className="bg-surface-container-lowest bg-surface-container-lowest flex flex-col justify-between relative overflow-hidden group hover:shadow-[0_16px_40px_rgba(0,0,0,0.06)] transition-all p-6 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
            <div className="flex items-start justify-between">
              <div>
                <span className="font-label-uppercase text-label-uppercase uppercase text-on-surface-variant tracking-wider">
                  Today's Consumption
                </span>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="font-label-metric text-label-metric text-on-surface font-semibold tracking-tight">
                    286
                  </span>
                  <span className="font-body-md text-body-md text-on-surface-variant font-medium">
                    L
                  </span>
                </div>
              </div>
              <div className="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-colors">
                <span className="material-symbols-outlined text-[20px]">
                  water_bottle
                </span>
              </div>
            </div>
            <div className="mt-6 space-y-2">
              <div className="flex justify-between items-center font-body-sm text-body-sm">
                <span className="text-on-surface-variant">
                  Daily Target: 600 L
                </span>
                <span className="font-semibold text-secondary">
                  47.6% used
                </span>
              </div>
              <div className="w-full h-1.5 bg-surface-container rounded-full overflow-hidden">
                <div className="h-full bg-secondary rounded-full transition-all duration-700" style={{ width: "47.6%" }}></div>
              </div>
            </div>
          </div>
          <div className="bg-surface-container-lowest bg-surface-container-lowest flex flex-col justify-between relative overflow-hidden group hover:shadow-[0_16px_40px_rgba(0,0,0,0.06)] transition-all p-6 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
            <div className="flex items-start justify-between">
              <div>
                <span className="font-label-uppercase text-label-uppercase uppercase text-on-surface-variant tracking-wider">
                  Projected Month-End
                </span>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="font-label-metric text-label-metric text-on-surface font-semibold tracking-tight">
                    8,420
                  </span>
                  <span className="font-body-md text-body-md text-on-surface-variant font-medium">
                    L
                  </span>
                </div>
              </div>
              <div className="w-10 h-10 rounded-full bg-secondary-container/20 flex items-center justify-center text-secondary">
                <span className="material-symbols-outlined text-[20px]">
                  trending_down
                </span>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-between">
              <span className="font-body-sm text-body-sm text-on-surface-variant">
                Target Cap: 10,500 L
              </span>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-secondary-container/30 text-secondary font-label-uppercase text-label-uppercase font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                <span>
                  -19.8% UNDER
                </span>
              </div>
            </div>
          </div>
          <div className="bg-surface-container-lowest bg-surface-container-lowest flex flex-col justify-between relative overflow-hidden group hover:shadow-[0_16px_40px_rgba(0,0,0,0.06)] transition-all p-6 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
            <div className="flex items-start justify-between">
              <div>
                <span className="font-label-uppercase text-label-uppercase uppercase text-on-surface-variant tracking-wider">
                  Peak Demand Window
                </span>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="font-headline-md text-headline-md text-on-surface font-semibold tracking-tight">
                    07:45 – 08:30
                  </span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant uppercase">
                    AM
                  </span>
                </div>
              </div>
              <div className="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-[20px]">
                  speed
                </span>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-between font-body-sm text-body-sm">
              <span className="text-on-surface-variant">
                Morning routine surge
              </span>
              <span className="font-mono font-semibold text-on-surface bg-surface-container-high px-2 py-0.5 rounded-full">
                18.4 L/min
              </span>
            </div>
          </div>
          <div className="bg-surface-container-lowest bg-surface-container-lowest flex flex-col justify-between relative overflow-hidden group hover:shadow-[0_16px_40px_rgba(0,0,0,0.06)] transition-all p-6 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
            <div className="flex items-start justify-between">
              <div>
                <span className="font-label-uppercase text-label-uppercase uppercase text-on-surface-variant tracking-wider">
                  Estimated Cost
                </span>
                <div className="flex items-baseline gap-1 mt-2">
                  <span className="font-label-metric text-label-metric text-on-surface font-semibold tracking-tight">
                    $42.80
                  </span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">
                    / cycle
                  </span>
                </div>
              </div>
              <div className="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-[20px]">
                  savings
                </span>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-between font-body-sm text-body-sm">
              <div className="flex items-center gap-1.5 text-secondary">
                <span className="material-symbols-outlined text-[16px]">
                  verified
                </span>
                <span className="font-medium">
                  Tier 1 Rebate
                </span>
              </div>
              <span className="text-on-surface-variant">
                Saved ~$14.20
              </span>
            </div>
          </div>
        </div>
        <div className="bg-surface-container-lowest bg-surface-container-lowest flex flex-col space-y-6 p-8 rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-label-uppercase text-label-uppercase uppercase text-on-surface-variant tracking-wider">
                  Telemetry Readout
                </span>
                <span className="px-2 py-0.5 rounded-full font-label-uppercase text-label-uppercase bg-surface-container-high text-on-surface font-mono">
                  24H RESOLUTION
                </span>
              </div>
              <h2 className="font-headline-md text-headline-md text-on-surface mt-1">
                Consumption Vector &amp; Dynamic Baseline
              </h2>
            </div>
            <div className="flex flex-wrap items-center gap-6 font-body-sm text-body-sm text-on-surface-variant">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-primary"></span>
                <span>
                  Actual telemetry (L)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-0.5 bg-outline-variant"></span>
                <span>
                  AI Predicted Model
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-0.5 border-t border-dashed border-error"></span>
                <span>
                  Target Threshold (35 L/h)
                </span>
              </div>
            </div>
          </div>
          <div className="relative w-full h-80 bg-surface-container-lowest pt-4">
            <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 1000 300">
              <defs>
                <linearGradient id="actualFlowGrad" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#000000" stopOpacity="0.14" />
                  <stop offset="100%" stopColor="#000000" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              <line stroke="#e1e3e4" strokeDasharray="4 4" strokeWidth="1" x1="0" x2="1000" y1="60" y2="60" />
              <line stroke="#e1e3e4" strokeDasharray="4 4" strokeWidth="1" x1="0" x2="1000" y1="120" y2="120" />
              <line stroke="#e1e3e4" strokeDasharray="4 4" strokeWidth="1" x1="0" x2="1000" y1="180" y2="180" />
              <line stroke="#e1e3e4" strokeDasharray="4 4" strokeWidth="1" x1="0" x2="1000" y1="240" y2="240" />
              <line opacity="0.75" stroke="#ba1a1a" strokeDasharray="6 6" strokeWidth="1.5" x1="0" x2="1000" y1="50" y2="50" />
              <path d="M0,250 C120,250 180,240 250,190 C320,140 380,210 450,220 C520,230 620,170 720,130 C820,90 920,200 1000,230" fill="none" stroke="#c8c5ca" strokeDasharray="3 3" strokeWidth="2" />
              <path d="M0,260 L0,260 C80,260 140,260 200,240 C260,220 300,70 340,75 C380,80 430,230 500,210 C560,190 620,200 680,180 C740,160 800,95 860,110 C920,125 960,230 1000,245 L1000,300 L0,300 Z" fill="url(#actualFlowGrad)" />
              <path d="M0,260 C80,260 140,260 200,240 C260,220 300,70 340,75 C380,80 430,230 500,210 C560,190 620,200 680,180 C740,160 800,95 860,110 C920,125 960,230 1000,245" fill="none" stroke="#000000" strokeLinecap="round" strokeWidth="2.5" />
              <circle cx="340" cy="75" fill="#000000" r="5" />
              <circle cx="340" cy="75" fill="#000000" opacity="0.12" r="12" />
              <circle cx="860" cy="110" fill="#000000" r="4.5" />
            </svg>
            <div className="absolute left-[30%] top-6 -translate-x-1/2 p-2.5 bg-primary text-on-primary rounded-3xl shadow-xl flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-secondary-fixed animate-ping"></div>
              <div className="flex flex-col">
                <span className="font-label-uppercase text-label-uppercase tracking-wider opacity-80 text-surface-variant">
                  08:15 AM • SURGE
                </span>
                <span className="font-headline-sm text-headline-sm font-semibold leading-tight">
                  31.2 L
                </span>
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center text-on-surface-variant font-label-uppercase text-label-uppercase tracking-wider pt-2 border-t border-surface-container">
            <span>
              00:00
            </span>
            <span>
              04:00
            </span>
            <span>
              08:00 (Surge)
            </span>
            <span>
              12:00
            </span>
            <span>
              16:00
            </span>
            <span>
              20:00 (Dinner)
            </span>
            <span>
              23:59
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-surface-container">
            <div className="p-4 bg-surface-container-low rounded-2xl flex items-center justify-between">
              <div>
                <div className="font-label-uppercase text-label-uppercase text-on-surface-variant uppercase">
                  Mean Flow Velocity
                </div>
                <div className="font-headline-sm text-headline-sm text-on-surface font-semibold mt-1">
                  11.9 L/h
                </div>
              </div>
              <span className="material-symbols-outlined text-outline text-[24px]">
                air
              </span>
            </div>
            <div className="p-4 bg-surface-container-low rounded-2xl flex items-center justify-between">
              <div>
                <div className="font-label-uppercase text-label-uppercase text-on-surface-variant uppercase">
                  Night Idle Flow
                </div>
                <div className="font-headline-sm text-headline-sm text-secondary font-semibold mt-1">
                  0.02 L/min
                </div>
              </div>
              <div className="flex items-center gap-1 text-secondary">
                <span className="material-symbols-outlined text-[18px]">
                  verified
                </span>
                <span className="font-body-sm text-body-sm font-medium">
                  Zero Leaks
                </span>
              </div>
            </div>
            <div className="p-4 bg-surface-container-low rounded-2xl flex items-center justify-between">
              <div>
                <div className="font-label-uppercase text-label-uppercase text-on-surface-variant uppercase">
                  Hydraulic Pressure Baseline
                </div>
                <div className="font-headline-sm text-headline-sm text-on-surface font-semibold mt-1">
                  4.2 bar{' '}
                  <span className="font-body-sm text-body-sm text-on-surface-variant font-normal">
                    ±0.1
                  </span>
                </div>
              </div>
              <span className="material-symbols-outlined text-outline text-[24px]">
                compress
              </span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
          <div className="bg-surface-container-lowest xl:col-span-7 bg-surface-container-lowest flex flex-col justify-between space-y-6 p-8 rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-label-uppercase text-label-uppercase uppercase text-on-surface-variant tracking-wider">
                  Sub-metering Architecture
                </div>
                <h2 className="font-headline-md text-headline-md text-on-surface mt-1">
                  Usage by Application
                </h2>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-high text-on-surface font-body-sm text-body-sm font-medium">
                <span className="material-symbols-outlined text-[16px]">
                  device_hub
                </span>
                <span>
                  4 Active Sub-Loops
                </span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex h-3 rounded-full overflow-hidden w-full bg-surface-container gap-1 p-0.5">
                <div className="h-full bg-primary rounded-l-full" style={{ width: "38%" }} title="Showers & Baths: 38%"></div>
                <div className="h-full bg-secondary" style={{ width: "26%" }} title="Irrigation: 26%"></div>
                <div className="h-full bg-outline" style={{ width: "21%" }} title="Kitchen: 21%"></div>
                <div className="h-full bg-outline-variant rounded-r-full" style={{ width: "15%" }} title="Laundry: 15%"></div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="p-4 bg-surface-container-low rounded-2xl flex items-center justify-between hover:bg-surface-container transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center">
                    <span className="material-symbols-outlined text-[20px]">
                      shower
                    </span>
                  </div>
                  <div>
                    <h3 className="font-headline-sm text-headline-sm text-on-surface">
                      Showers &amp; Baths
                    </h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      Master Suite &amp; Guest Wing Bathrooms
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <div className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                      108{' '}
                      <span className="font-body-sm text-body-sm text-on-surface-variant font-normal">
                        L
                      </span>
                    </div>
                    <div className="font-body-sm text-body-sm text-on-surface-variant">
                      38% share
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full font-label-uppercase text-label-uppercase font-semibold bg-surface-container-highest text-on-surface">
                    +4% vs LW
                  </span>
                </div>
              </div>
              <div className="p-4 bg-surface-container-low rounded-2xl flex items-center justify-between hover:bg-surface-container transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-secondary text-on-secondary flex items-center justify-center">
                    <span className="material-symbols-outlined text-[20px]">
                      yard
                    </span>
                  </div>
                  <div>
                    <h3 className="font-headline-sm text-headline-sm text-on-surface">
                      Irrigation &amp; Landscape
                    </h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      Zone 1-4 Smart Weather Drippers
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <div className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                      74{' '}
                      <span className="font-body-sm text-body-sm text-on-surface-variant font-normal">
                        L
                      </span>
                    </div>
                    <div className="font-body-sm text-body-sm text-on-surface-variant">
                      26% share
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full font-label-uppercase text-label-uppercase font-semibold bg-secondary-container/40 text-secondary">
                    -12% bench
                  </span>
                </div>
              </div>
              <div className="p-4 bg-surface-container-low rounded-2xl flex items-center justify-between hover:bg-surface-container transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-surface-container-highest text-on-surface flex items-center justify-center">
                    <span className="material-symbols-outlined text-[20px]">
                      countertops
                    </span>
                  </div>
                  <div>
                    <h3 className="font-headline-sm text-headline-sm text-on-surface">
                      Kitchen &amp; Appliances
                    </h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      Miele Dishwasher &amp; Reverse Osmosis Tap
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <div className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                      60{' '}
                      <span className="font-body-sm text-body-sm text-on-surface-variant font-normal">
                        L
                      </span>
                    </div>
                    <div className="font-body-sm text-body-sm text-on-surface-variant">
                      21% share
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full font-label-uppercase text-label-uppercase font-semibold bg-surface-container-highest text-on-surface-variant">
                    Nominal
                  </span>
                </div>
              </div>
              <div className="p-4 bg-surface-container-low rounded-2xl flex items-center justify-between hover:bg-surface-container transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-surface-container-highest text-on-surface flex items-center justify-center">
                    <span className="material-symbols-outlined text-[20px]">
                      local_laundry_service
                    </span>
                  </div>
                  <div>
                    <h3 className="font-headline-sm text-headline-sm text-on-surface">
                      Laundry &amp; Utility
                    </h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      Softener auto-cycle &amp; Washer Eco-loop
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <div className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                      44{' '}
                      <span className="font-body-sm text-body-sm text-on-surface-variant font-normal">
                        L
                      </span>
                    </div>
                    <div className="font-body-sm text-body-sm text-on-surface-variant">
                      15% share
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full font-label-uppercase text-label-uppercase font-semibold bg-surface-container-highest text-on-surface-variant">
                    Eco Active
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="xl:col-span-5 flex flex-col space-y-6">
            <div className="bg-surface-container-lowest bg-surface-container-lowest relative overflow-hidden flex flex-col justify-between space-y-6 p-8 rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary text-[20px]">
                    auto_awesome
                  </span>
                  <span className="font-label-uppercase text-label-uppercase uppercase text-secondary font-bold tracking-wider">
                    Predictive Engine
                  </span>
                </div>
                <div className="px-3 py-1 rounded-full bg-secondary-container/20 text-secondary font-body-sm text-body-sm font-semibold">
                  94/100 Conservation Score
                </div>
              </div>
              <div>
                <h3 className="font-headline-md text-headline-md text-on-surface font-semibold">
                  Stewardship Optimization
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant mt-2">
                  Telemetry indicates high efficiency in irrigation timing. Soil hygrometer links triggered early cutoff.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3.5 bg-surface-container-low rounded-2xl">
                  <div className="font-label-uppercase text-label-uppercase text-on-surface-variant uppercase">
                    Irrigation Avoidance
                  </div>
                  <div className="font-headline-sm text-headline-sm text-secondary font-semibold mt-1">
                    +42 L Saved
                  </div>
                  <div className="font-body-sm text-body-sm text-on-surface-variant">
                    Via rain sensor offset
                  </div>
                </div>
                <div className="p-3.5 bg-surface-container-low rounded-2xl">
                  <div className="font-label-uppercase text-label-uppercase text-on-surface-variant uppercase">
                    Mean Shower Time
                  </div>
                  <div className="font-headline-sm text-headline-sm text-on-surface font-semibold mt-1">
                    6.2 min
                  </div>
                  <div className="font-body-sm text-body-sm text-on-surface-variant">
                    Target is &lt; 8.0 min
                  </div>
                </div>
              </div>
              <div className="p-4 bg-surface-container-low rounded-2xl space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-body-sm text-body-sm font-semibold text-on-surface">
                    Daily Estate Budget Cap
                  </span>
                  <span className="font-headline-sm text-headline-sm font-semibold text-on-surface" id="budgetValue">
                    600 L
                  </span>
                </div>
                <div className="relative flex items-center">
                  <input className="w-full h-2 bg-surface-container-highest rounded-3xl appearance-none cursor-pointer accent-primary" id="budgetSlider" max="1200" min="300" step="50" type="range" defaultValue="600" />
                </div>
                <div className="flex justify-between font-label-uppercase text-label-uppercase text-on-surface-variant">
                  <span>
                    Tight (300L)
                  </span>
                  <span>
                    Balanced (600L)
                  </span>
                  <span>
                    Estate Max (1200L)
                  </span>
                </div>
              </div>
              <button className="w-full py-3.5 px-4 bg-primary text-on-primary rounded-full font-label-button text-label-button font-medium hover:bg-on-surface-variant transition-colors flex items-center justify-center gap-2" type="button">
                <span>
                  Apply Predictive Schedule
                </span>
                <span className="material-symbols-outlined text-[18px]">
                  arrow_forward
                </span>
              </button>
            </div>
            <div className="bg-surface-container-lowest bg-surface-container-lowest flex items-center gap-4 p-6 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
              <div className="w-20 h-20 rounded-2xl overflow-hidden shrink-0 bg-surface-container">
                <img className="w-full h-full object-cover" data-alt="Minimalist luxury residential estate architectural detail featuring clean stone water fountains, modern water filtration piping, serene morning sunlight, slate gray and muted emerald green palette, sharp focus architectural photography." src="/stitch/img-b4d75f7fa0.jpg" />
              </div>
              <div className="flex flex-col justify-center">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-secondary"></span>
                  <span className="font-label-uppercase text-label-uppercase text-on-surface-variant uppercase tracking-wider">
                    Active Loop Control
                  </span>
                </div>
                <span className="font-headline-sm text-headline-sm text-on-surface font-semibold leading-snug">
                  Main Cistern &amp; Borehole Inflow
                </span>
                <span className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                  Balancing level at 88.4% full • Nominal
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
    </>
  );
}
