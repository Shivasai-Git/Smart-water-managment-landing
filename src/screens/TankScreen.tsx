import { useEffect } from 'react';
import { setupTank } from './behaviors';

export default function TankScreen() {
  useEffect(() => setupTank(), []);
  return (
    <>
    <main className="w-full pt-8 pb-12">
      <div className="flex flex-col w-full space-y-8">
        <div className="flex flex-col gap-8 w-full">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 font-label-uppercase text-label-uppercase text-on-surface-variant tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                <span>
                  TELEMETRY NODE
                </span>
                <span className="text-outline-variant">
                  /
                </span>
                <span className="text-on-surface font-mono">
                  HYDROSENSE TANK-ARRAY TM-02
                </span>
              </div>
              <h1 className="font-headline-xl text-headline-xl text-on-surface tracking-tight">
                Tank Monitoring &amp; Fluid Architecture
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant mt-1">
                Dual-reservoir ultrasonic depth telemetry, automated inflow cycles, and hydrostatic pressure balancing.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center bg-surface-container-low p-1 rounded-full shadow-sm">
                <button className="time-pill px-3.5 py-1.5 rounded-full font-label-button text-label-button text-on-primary bg-primary transition-all" type="button">
                  Live
                </button>
                <button className="time-pill px-3.5 py-1.5 rounded-full font-label-button text-label-button text-on-surface-variant hover:text-on-surface transition-all" type="button">
                  1H
                </button>
                <button className="time-pill px-3.5 py-1.5 rounded-full font-label-button text-label-button text-on-surface-variant hover:text-on-surface transition-all" type="button">
                  24H
                </button>
                <button className="time-pill px-3.5 py-1.5 rounded-full font-label-button text-label-button text-on-surface-variant hover:text-on-surface transition-all" type="button">
                  7D
                </button>
              </div>
              <div className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-surface-container-lowest shadow-sm">
                <span className="font-label-uppercase text-label-uppercase text-on-surface-variant">
                  AUTO-REFILL
                </span>
                <button className="relative inline-flex h-5 w-9 items-center rounded-full bg-secondary transition-colors focus:outline-none" id="toggle-refill" type="button" role="switch" aria-label="Auto-refill">
                  <span className="inline-block h-3.5 w-3.5 transform rounded-full bg-surface-container-lowest transition-transform translate-x-4" id="toggle-refill-dot"></span>
                </button>
                <span className="font-body-sm text-body-sm font-medium text-secondary" id="refill-status-text">
                  Enabled
                </span>
              </div>
              <button className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-on-primary hover:bg-primary-container active:scale-[0.98] transition-all shadow-md" id="btn-manual-fill" type="button">
                <span className="material-symbols-outlined text-[18px]">
                  waves
                </span>
                <span className="font-label-button text-label-button">
                  Manual Reservoir Fill
                </span>
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
            <div className="bg-surface-container-lowest bg-surface-container-lowest flex flex-col justify-between p-6 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
              <div className="flex items-start justify-between gap-2">
                <span className="font-label-uppercase text-label-uppercase text-on-surface-variant tracking-wider">
                  COMBINED RESERVES
                </span>
                <span className="flex items-center gap-1 font-body-sm text-body-sm font-medium text-secondary bg-secondary-container/20 px-2 py-0.5 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"></span>
                  {' '}72%
                </span>
              </div>
              <div className="my-4 flex items-baseline gap-2">
                <span className="font-label-metric text-label-metric text-on-surface tracking-tight">
                  5,040
                </span>
                <span className="font-body-md text-body-md text-on-surface-variant">
                  / 7,000 L Total
                </span>
              </div>
              <div className="flex items-center justify-between font-body-sm text-body-sm text-on-surface-variant">
                <span className="flex items-center gap-1 text-secondary font-medium">
                  <span className="material-symbols-outlined text-[16px]">
                    trending_up
                  </span>
                  {' '}+420 L replenished
                </span>
                <span className="font-mono text-on-surface-variant">
                  Today
                </span>
              </div>
            </div>
            <div className="bg-surface-container-lowest bg-surface-container-lowest flex flex-col justify-between p-6 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
              <div className="flex items-start justify-between gap-2">
                <span className="font-label-uppercase text-label-uppercase text-on-surface-variant tracking-wider">
                  NET INFLOW RATE
                </span>
                <span className="flex items-center gap-1 font-body-sm text-body-sm font-medium text-secondary bg-secondary-container/20 px-2 py-0.5 rounded-full">
                  Optimal
                </span>
              </div>
              <div className="my-4 flex items-baseline gap-2">
                <span className="font-label-metric text-label-metric text-on-surface tracking-tight">
                  18.5
                </span>
                <span className="font-body-md text-body-md text-on-surface-variant">
                  L/min
                </span>
              </div>
              <div className="flex items-center gap-2 font-body-sm text-body-sm text-on-surface-variant">
                <span className="w-2 h-2 rounded-full bg-secondary"></span>
                <span className="truncate">
                  Submersible Active • 1.8 kW
                </span>
              </div>
            </div>
            <div className="bg-surface-container-lowest bg-surface-container-lowest flex flex-col justify-between p-6 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
              <div className="flex items-start justify-between gap-2">
                <span className="font-label-uppercase text-label-uppercase text-on-surface-variant tracking-wider">
                  ULTRASONIC DEPTH
                </span>
                <span className="font-label-uppercase text-label-uppercase text-on-surface-variant bg-surface-container-low px-2 py-0.5 rounded-full font-mono">
                  14ms ping
                </span>
              </div>
              <div className="my-4 flex items-baseline gap-2">
                <span className="font-label-metric text-label-metric text-on-surface tracking-tight">
                  99.8%
                </span>
                <span className="font-body-md text-body-md text-on-surface-variant">
                  Fidelity
                </span>
              </div>
              <div className="flex items-center justify-between font-body-sm text-body-sm text-on-surface-variant">
                <span className="text-on-surface font-medium">
                  Dual-Sensor Array
                </span>
                <span className="font-mono text-secondary">
                  Zero Acoustic Drift
                </span>
              </div>
            </div>
            <div className="bg-surface-container-lowest bg-surface-container-lowest flex flex-col justify-between p-6 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
              <div className="flex items-start justify-between gap-2">
                <span className="font-label-uppercase text-label-uppercase text-on-surface-variant tracking-wider">
                  DEPLETION RUNWAY
                </span>
                <span className="flex items-center gap-1 font-body-sm text-body-sm font-medium text-secondary bg-secondary-container/20 px-2 py-0.5 rounded-full">
                  High Reserve
                </span>
              </div>
              <div className="my-4 flex items-baseline gap-2">
                <span className="font-label-metric text-label-metric text-on-surface tracking-tight">
                  4.2
                </span>
                <span className="font-body-md text-body-md text-on-surface-variant">
                  Days
                </span>
              </div>
              <div className="flex items-center justify-between font-body-sm text-body-sm text-on-surface-variant">
                <span>
                  Est. 286 L/day mean
                </span>
                <span className="font-mono text-on-surface">
                  FR-Household
                </span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-surface-container-lowest bg-surface-container-lowest flex flex-col justify-between gap-6 p-8 rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
              <div className="flex items-start justify-between">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full font-label-uppercase text-label-uppercase bg-surface-container-low text-on-surface-variant">
                      RESERVOIR A
                    </span>
                    <span className="flex items-center gap-1 font-body-sm text-body-sm text-secondary">
                      <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                      {' '}Nominal
                    </span>
                  </div>
                  <h2 className="font-headline-md text-headline-md text-on-surface">
                    Overhead Rooftop Tank
                  </h2>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Gravity distribution plenum to residential fixtures
                  </p>
                </div>
                <div className="text-right">
                  <div className="font-headline-sm text-headline-sm text-on-surface">
                    1,640{' '}
                    <span className="text-body-sm font-normal text-on-surface-variant">
                      / 2,000 L
                    </span>
                  </div>
                  <span className="font-label-uppercase text-label-uppercase text-secondary font-semibold">
                    82% LEVEL
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                <div className="md:col-span-5 flex justify-center py-2">
                  <div className="relative w-44 h-72 bg-surface-container-low rounded-2xl p-2.5 flex flex-col justify-end overflow-hidden shadow-inner">
                    <div className="absolute inset-y-0 right-2 w-6 flex flex-col justify-between py-4 text-right font-mono text-[11px] text-on-surface-variant select-none pointer-events-none z-20">
                      <span>
                        100%
                      </span>
                      <span>
                        75%
                      </span>
                      <span>
                        50%
                      </span>
                      <span>
                        25%
                      </span>
                      <span>
                        0%
                      </span>
                    </div>
                    <div className="absolute inset-x-3 top-[18%] bottom-[18%] flex flex-col justify-between pointer-events-none z-10 opacity-30">
                      <div className="border-b border-outline-variant border-dashed w-full"></div>
                      <div className="border-b border-outline-variant border-dashed w-full"></div>
                      <div className="border-b border-outline-variant border-dashed w-full"></div>
                    </div>
                    <div className="relative w-full h-[82%] bg-gradient-to-t from-secondary via-secondary-fixed-dim/80 to-secondary-fixed rounded-3xl overflow-hidden shadow-lg transition-all duration-700">
                      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.8),transparent_70%)]"></div>
                      <div className="absolute inset-x-0 top-0 h-2 bg-surface-container-lowest/60 blur-[1px]"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="font-headline-lg text-headline-lg font-bold text-on-secondary mix-blend-overlay">
                          82%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="md:col-span-7 flex flex-col gap-3">
                  <div className="grid grid-cols-2 gap-2.5">
                    <div className="p-3 rounded-3xl bg-surface-container-low flex flex-col">
                      <span className="font-label-uppercase text-label-uppercase text-on-surface-variant">
                        HEAD PRESSURE
                      </span>
                      <span className="font-headline-sm text-headline-sm text-on-surface mt-1">
                        2.1{' '}
                        <span className="font-body-sm font-normal text-on-surface-variant">
                          bar
                        </span>
                      </span>
                    </div>
                    <div className="p-3 rounded-3xl bg-surface-container-low flex flex-col">
                      <span className="font-label-uppercase text-label-uppercase text-on-surface-variant">
                        FLUID TEMP
                      </span>
                      <span className="font-headline-sm text-headline-sm text-on-surface mt-1">
                        19.4{' '}
                        <span className="font-body-sm font-normal text-on-surface-variant">
                          °C
                        </span>
                      </span>
                    </div>
                    <div className="p-3 rounded-3xl bg-surface-container-low flex flex-col">
                      <span className="font-label-uppercase text-label-uppercase text-on-surface-variant">
                        FLOAT SWITCH
                      </span>
                      <span className="font-body-md text-body-md text-secondary font-medium mt-1">
                        Engaged (High)
                      </span>
                    </div>
                    <div className="p-3 rounded-3xl bg-surface-container-low flex flex-col">
                      <span className="font-label-uppercase text-label-uppercase text-on-surface-variant">
                        HEADSPACE
                      </span>
                      <span className="font-headline-sm text-headline-sm text-on-surface mt-1">
                        32{' '}
                        <span className="font-body-sm font-normal text-on-surface-variant">
                          cm
                        </span>
                      </span>
                    </div>
                  </div>
                  <div className="p-3 rounded-3xl bg-surface-container-low flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[20px] text-secondary">
                        verified_user
                      </span>
                      <div className="flex flex-col">
                        <span className="font-label-button text-label-button text-on-surface">
                          Auto-Shutoff Valve
                        </span>
                        <span className="font-body-sm text-body-sm text-on-surface-variant">
                          Optical high-level interlock
                        </span>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-full font-label-uppercase text-label-uppercase bg-secondary-container/30 text-on-secondary-container">
                      ARMED
                    </span>
                  </div>
                  <div className="pt-2 flex items-center justify-between border-t border-surface-container-low">
                    <div className="flex flex-col">
                      <span className="font-label-button text-label-button text-on-surface">
                        Gravity Feed Isolation
                      </span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">
                        Main residential manifold bypass
                      </span>
                    </div>
                    <button className="px-4 py-1.5 rounded-full font-label-button text-label-button bg-surface-container-high text-on-surface hover:bg-primary hover:text-on-primary transition-all" type="button">
                      OPEN • NOMINAL
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-surface-container-lowest bg-surface-container-lowest flex flex-col justify-between gap-6 p-8 rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
              <div className="flex items-start justify-between">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full font-label-uppercase text-label-uppercase bg-surface-container-low text-on-surface-variant">
                      RESERVOIR B
                    </span>
                    <span className="flex items-center gap-1 font-body-sm text-body-sm text-secondary">
                      <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                      {' '}Inflow Active
                    </span>
                  </div>
                  <h2 className="font-headline-md text-headline-md text-on-surface">
                    Subterranean Cistern / Sump
                  </h2>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Dual-chamber rainwater harvest and borehole catchment
                  </p>
                </div>
                <div className="text-right">
                  <div className="font-headline-sm text-headline-sm text-on-surface">
                    3,400{' '}
                    <span className="text-body-sm font-normal text-on-surface-variant">
                      / 5,000 L
                    </span>
                  </div>
                  <span className="font-label-uppercase text-label-uppercase text-secondary font-semibold">
                    68% LEVEL
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                <div className="md:col-span-5 flex justify-center py-2">
                  <div className="relative w-44 h-72 bg-surface-container-low rounded-2xl p-2.5 flex flex-col justify-end overflow-hidden shadow-inner">
                    <div className="absolute inset-y-0 right-2 w-6 flex flex-col justify-between py-4 text-right font-mono text-[11px] text-on-surface-variant select-none pointer-events-none z-20">
                      <span>
                        100%
                      </span>
                      <span>
                        75%
                      </span>
                      <span>
                        50%
                      </span>
                      <span>
                        25%
                      </span>
                      <span>
                        0%
                      </span>
                    </div>
                    <div className="absolute inset-x-3 top-[18%] bottom-[18%] flex flex-col justify-between pointer-events-none z-10 opacity-30">
                      <div className="border-b border-outline-variant border-dashed w-full"></div>
                      <div className="border-b border-outline-variant border-dashed w-full"></div>
                      <div className="border-b border-outline-variant border-dashed w-full"></div>
                    </div>
                    <div className="relative w-full h-[68%] bg-gradient-to-t from-secondary via-secondary-fixed-dim/70 to-secondary-fixed/90 rounded-3xl overflow-hidden shadow-lg transition-all duration-700">
                      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.8),transparent_70%)]"></div>
                      <div className="absolute inset-x-0 top-0 h-2 bg-surface-container-lowest/60 blur-[1px]"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="font-headline-lg text-headline-lg font-bold text-on-secondary mix-blend-overlay">
                          68%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="md:col-span-7 flex flex-col gap-3">
                  <div className="grid grid-cols-2 gap-2.5">
                    <div className="p-3 rounded-3xl bg-surface-container-low flex flex-col">
                      <span className="font-label-uppercase text-label-uppercase text-on-surface-variant">
                        BOREHOLE VALVE
                      </span>
                      <span className="font-headline-sm text-headline-sm text-on-surface mt-1">
                        60%{' '}
                        <span className="font-body-sm font-normal text-on-surface-variant">
                          Throttled
                        </span>
                      </span>
                    </div>
                    <div className="p-3 rounded-3xl bg-surface-container-low flex flex-col">
                      <span className="font-label-uppercase text-label-uppercase text-on-surface-variant">
                        SILT INDEX
                      </span>
                      <span className="font-headline-sm text-headline-sm text-on-surface mt-1">
                        0.04%{' '}
                        <span className="font-body-sm font-normal text-secondary font-medium">
                          Pristine
                        </span>
                      </span>
                    </div>
                    <div className="p-3 rounded-3xl bg-surface-container-low flex flex-col">
                      <span className="font-label-uppercase text-label-uppercase text-on-surface-variant">
                        PUMP RELAY
                      </span>
                      <span className="font-body-md text-body-md text-secondary font-medium mt-1 truncate">
                        Pumping to Roof
                      </span>
                    </div>
                    <div className="p-3 rounded-3xl bg-surface-container-low flex flex-col">
                      <span className="font-label-uppercase text-label-uppercase text-on-surface-variant">
                        HEADSPACE
                      </span>
                      <span className="font-headline-sm text-headline-sm text-on-surface mt-1">
                        78{' '}
                        <span className="font-body-sm font-normal text-on-surface-variant">
                          cm
                        </span>
                      </span>
                    </div>
                  </div>
                  <div className="p-3 rounded-3xl bg-surface-container-low flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[20px] text-secondary">
                        speed
                      </span>
                      <div className="flex flex-col">
                        <span className="font-label-button text-label-button text-on-surface">
                          Submersible RPM
                        </span>
                        <span className="font-body-sm text-body-sm text-on-surface-variant">
                          Variable frequency drive
                        </span>
                      </div>
                    </div>
                    <span className="font-mono text-body-sm text-on-surface font-semibold">
                      2,850 RPM
                    </span>
                  </div>
                  <div className="pt-2 flex items-center justify-between border-t border-surface-container-low">
                    <div className="flex flex-col">
                      <span className="font-label-button text-label-button text-on-surface">
                        Deep Sump Drain / Flush
                      </span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">
                        Safety interlocked against dry run
                      </span>
                    </div>
                    <button className="px-4 py-1.5 rounded-full font-label-button text-label-button bg-surface-container-high text-on-surface-variant cursor-not-allowed flex items-center gap-1" type="button">
                      <span className="material-symbols-outlined text-[16px]">
                        lock
                      </span>
                      {' '}LOCKED / SAFE
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="bg-surface-container-lowest lg:col-span-8 bg-surface-container-lowest flex flex-col justify-between gap-6 p-8 rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex flex-col">
                  <span className="font-label-uppercase text-label-uppercase text-on-surface-variant tracking-wider">
                    HYDRAULIC DYNAMICS
                  </span>
                  <h3 className="font-headline-md text-headline-md text-on-surface">
                    24-Hour Cyclic Refill &amp; Drawdown Dynamics
                  </h3>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5 font-body-sm text-body-sm text-on-surface-variant">
                    <span className="w-3 h-1 bg-primary rounded-full"></span>
                    <span>
                      Overhead
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 font-body-sm text-body-sm text-on-surface-variant">
                    <span className="w-3 h-1 bg-secondary rounded-full"></span>
                    <span>
                      Sump
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 font-body-sm text-body-sm text-on-surface-variant">
                    <span className="w-3 h-1 bg-surface-variant rounded-full"></span>
                    <span>
                      Pumping
                    </span>
                  </div>
                </div>
              </div>
              <div className="relative w-full h-64 select-none">
                <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 700 240">
                  <defs>
                    <linearGradient id="grad-sump" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="#006c49" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#006c49" stopOpacity="0.0" />
                    </linearGradient>
                    <linearGradient id="grad-roof" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="#191c1d" stopOpacity="0.12" />
                      <stop offset="100%" stopColor="#191c1d" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  <line stroke="#e1e3e4" strokeDasharray="3 3" strokeWidth="1" x1="0" x2="700" y1="20" y2="20" />
                  <line stroke="#e1e3e4" strokeDasharray="3 3" strokeWidth="1" x1="0" x2="700" y1="80" y2="80" />
                  <line stroke="#e1e3e4" strokeDasharray="3 3" strokeWidth="1" x1="0" x2="700" y1="140" y2="140" />
                  <line stroke="#e1e3e4" strokeDasharray="3 3" strokeWidth="1" x1="0" x2="700" y1="200" y2="200" />
                  <rect fill="#6cf8bb" fillOpacity="0.08" height="180" rx="6" width="120" x="50" y="20" />
                  <rect fill="#6cf8bb" fillOpacity="0.08" height="180" rx="6" width="110" x="420" y="20" />
                  <path d={"M 0,160 \n                     C 60,160 80,60 160,50 \n                     C 220,40 260,110 320,130 \n                     C 380,150 420,70 480,55 \n                     C 540,40 620,80 700,70 \n                     L 700,220 L 0,220 Z"} fill="url(#grad-roof)" />
                  <path d={"M 0,160 \n                     C 60,160 80,60 160,50 \n                     C 220,40 260,110 320,130 \n                     C 380,150 420,70 480,55 \n                     C 540,40 620,80 700,70"} fill="none" stroke="#191c1d" strokeLinecap="round" strokeWidth="2.5" />
                  <path d={"M 0,90 \n                     C 60,85 100,120 160,135 \n                     C 220,150 280,110 340,105 \n                     C 400,100 440,140 500,150 \n                     C 560,160 620,115 700,110 \n                     L 700,220 L 0,220 Z"} fill="url(#grad-sump)" />
                  <path d={"M 0,90 \n                     C 60,85 100,120 160,135 \n                     C 220,150 280,110 340,105 \n                     C 400,100 440,140 500,150 \n                     C 560,160 620,115 700,110"} fill="none" stroke="#006c49" strokeLinecap="round" strokeWidth="2.5" />
                  <circle cx="160" cy="50" fill="#191c1d" r="4" />
                  <circle cx="480" cy="55" fill="#191c1d" r="4" />
                  <circle cx="500" cy="150" fill="#006c49" r="4" />
                </svg>
                <div className="flex justify-between text-[11px] font-mono text-on-surface-variant pt-2 select-none">
                  <span>
                    00:00 (Night Fill)
                  </span>
                  <span>
                    04:00
                  </span>
                  <span>
                    08:00 (Morning Peak)
                  </span>
                  <span>
                    12:00
                  </span>
                  <span>
                    16:00
                  </span>
                  <span>
                    20:00 (Evening Peak)
                  </span>
                  <span>
                    23:59
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-surface-container-low">
                <div className="flex flex-col">
                  <span className="font-label-uppercase text-label-uppercase text-on-surface-variant">
                    CYCLE FREQUENCY
                  </span>
                  <span className="font-headline-sm text-headline-sm text-on-surface mt-0.5">
                    3.2{' '}
                    <span className="text-body-sm font-normal text-on-surface-variant">
                      cycles/day
                    </span>
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="font-label-uppercase text-label-uppercase text-on-surface-variant">
                    PUMP DUTY CYCLE
                  </span>
                  <span className="font-headline-sm text-headline-sm text-on-surface mt-0.5">
                    18%{' '}
                    <span className="text-body-sm font-normal text-secondary font-medium">
                      Optimal
                    </span>
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="font-label-uppercase text-label-uppercase text-on-surface-variant">
                    PUMP POWER
                  </span>
                  <span className="font-headline-sm text-headline-sm text-on-surface mt-0.5">
                    2.4{' '}
                    <span className="text-body-sm font-normal text-on-surface-variant">
                      kWh / 24h
                    </span>
                  </span>
                </div>
              </div>
            </div>
            <div className="bg-surface-container-lowest lg:col-span-4 bg-surface-container-lowest flex flex-col justify-between gap-5 p-8 rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
              <div className="flex flex-col gap-1">
                <span className="font-label-uppercase text-label-uppercase text-on-surface-variant tracking-wider">
                  FAIL-SAFE GUARDS
                </span>
                <h3 className="font-headline-md text-headline-md text-on-surface">
                  Refill Protocols
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Hardware-level interlocks &amp; smart scheduling
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <div className="p-4 rounded-2xl bg-surface-container-low flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="font-label-button text-label-button text-on-surface">
                      Smart Night-Fill Trigger
                    </span>
                    <span className="font-label-uppercase text-label-uppercase text-secondary bg-secondary-container/30 px-2 py-0.5 rounded-full">
                      ACTIVE
                    </span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Recharges cistern during off-peak power tariffs (02:00 – 05:00).
                  </p>
                  <div className="flex items-center justify-between text-[11px] font-mono text-on-surface-variant pt-1 border-t border-surface-container">
                    <span>
                      Savings: $18.40 / mo
                    </span>
                    <span className="text-secondary font-medium">
                      Grid Synced
                    </span>
                  </div>
                </div>
                <div className="p-4 rounded-2xl bg-surface-container-low flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="font-label-button text-label-button text-on-surface">
                      Dry Run Pump Protection
                    </span>
                    <span className="font-label-uppercase text-label-uppercase text-secondary bg-secondary-container/30 px-2 py-0.5 rounded-full">
                      ARMED
                    </span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Auto-trips submersible pump relay if sump fluid collapses &lt; 15%.
                  </p>
                  <div className="flex items-center justify-between text-[11px] font-mono text-on-surface-variant pt-1 border-t border-surface-container">
                    <span>
                      Response: 0.1s
                    </span>
                    <span className="text-on-surface">
                      Zero Cavitation
                    </span>
                  </div>
                </div>
                <div className="p-4 rounded-2xl bg-surface-container-low flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="font-label-button text-label-button text-on-surface">
                      Borehole Silt Sensor Interlock
                    </span>
                    <span className="font-label-uppercase text-label-uppercase text-on-surface bg-surface-container-high px-2 py-0.5 rounded-full">
                      STANDBY
                    </span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Halts intake valve dynamically if water turbidity spikes &gt; 5.0 NTU.
                  </p>
                  <div className="flex items-center justify-between text-[11px] font-mono text-on-surface-variant pt-1 border-t border-surface-container">
                    <span>
                      Current: 0.8 NTU
                    </span>
                    <span className="text-secondary">
                      Pristine
                    </span>
                  </div>
                </div>
              </div>
              <button className="w-full py-2.5 rounded-full font-label-button text-label-button bg-surface-container-high text-on-surface hover:bg-surface-container-highest transition-colors flex items-center justify-center gap-2" type="button">
                <span className="material-symbols-outlined text-[16px]">
                  tune
                </span>
                <span>
                  Configure Sensor Setpoints
                </span>
              </button>
            </div>
          </div>
        </div>
        <div className="fixed inset-0 z-50 bg-primary/40 backdrop-blur-md hidden items-center justify-center p-4" id="manual-fill-modal">
          <div className="bg-surface-container-lowest bg-surface-container-lowest max-w-md w-full flex flex-col gap-5 p-6 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
            <div className="flex items-start justify-between">
              <div className="flex flex-col">
                <span className="font-label-uppercase text-label-uppercase text-on-surface-variant">
                  MANUAL OVERRIDE
                </span>
                <h3 className="font-headline-md text-headline-md text-on-surface">
                  Force Reservoir Fill
                </h3>
              </div>
              <button className="w-8 h-8 rounded-full bg-surface-container-low flex items-center justify-center text-on-surface hover:bg-surface-container-high" id="close-modal" type="button" aria-label="Close">
                <span className="material-symbols-outlined text-[18px]">
                  close
                </span>
              </button>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Initiates high-throughput transfer from Subterranean Cistern to Overhead Tank. Acoustic sensors and cutoff float valves will remain actively monitored.
            </p>
            <div className="p-3 bg-surface-container-low rounded-2xl flex items-center justify-between">
              <span className="font-body-sm text-body-sm text-on-surface-variant">
                Transfer Volume
              </span>
              <span className="font-body-md text-body-md font-semibold text-on-surface">
                360 L (to 100% capacity)
              </span>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <button className="flex-1 py-2.5 rounded-full font-label-button text-label-button bg-surface-container-high text-on-surface hover:bg-surface-container-highest transition-colors" id="cancel-fill" type="button">
                Cancel
              </button>
              <button className="flex-1 py-2.5 rounded-full font-label-button text-label-button bg-primary text-on-primary hover:bg-primary-container transition-colors" id="confirm-fill" type="button">
                Start Cycle
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
    </>
  );
}
