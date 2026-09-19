import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import FloatingNav from './FloatingNav';
import ZoneMap from './ZoneMap';
import { FluidFlowGrid } from '@/components/ui/fluid-flow-grid';
import { useLandingMotion } from './useLandingMotion';
import { setupLanding } from '../../screens/behaviors';

/** Phones get a tighter, lighter grid so the dots stay fine and the wave stays cheap to paint. */
function useCompactViewport() {
  const [compact, setCompact] = useState(() => typeof window !== 'undefined' && window.matchMedia('(max-width: 640px)').matches);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 640px)');
    const on = () => setCompact(mq.matches);
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);
  return compact;
}

export default function MarketingPage() {
  const compact = useCompactViewport();
  useEffect(() => setupLanding(), []);
  useLandingMotion();
  return (
    <div className="stitch-landing bg-surface font-body-md text-on-surface antialiased selection:bg-secondary selection:text-on-secondary">
      <FloatingNav />
      <main id="top" className="w-full pt-24 bg-surface min-h-[calc(100vh-80px)]">
        <div className="flex flex-col w-full">
          <FluidFlowGrid
            id="hero"
            spacing={compact ? 30 : 36}
            reach={compact ? 150 : 220}
            fps={compact ? 30 : 60}
            className="w-full px-margin-sm md:px-margin lg:px-margin-lg pt-space-lg pb-space-xl"
          >
            <div className="absolute -top-32 right-1/4 w-[580px] h-[580px] rounded-full blob-mint pointer-events-none -z-10 hero-blob"></div>
            <div className="absolute top-48 left-10 w-[420px] h-[420px] rounded-full blob-stone pointer-events-none -z-10 hero-blob hero-blob-2"></div>
            {/* Soft wash keeps the copy legible while rings pass underneath; the bottom fade blends into the next section. */}
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_75%_38%_at_50%_38%,rgba(248,249,250,0.72)_0%,transparent_100%)] md:bg-[radial-gradient(ellipse_40%_40%_at_50%_42%,rgba(248,249,250,0.9)_0%,rgba(248,249,250,0.55)_45%,transparent_100%)]"></div>
            <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-28 -z-10 bg-gradient-to-t from-[#f8f9fa] to-transparent"></div>
            <div className="max-w-7xl mx-auto flex flex-col items-center text-center hero-stagger">
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-surface-container-lowest shadow-sm mb-space-md">
                <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
                <span className="font-label-uppercase text-label-uppercase text-on-surface tracking-widest">
                  SMART WATER FLOW • RESIDENTIAL PLATFORM
                </span>
              </div>
              <h1 className="font-display-lg-mobile lg:font-display-lg text-display-lg-mobile lg:text-display-lg text-primary max-w-4xl tracking-tight mb-space-sm">
                Intelligent water management for modern homes.
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mb-space-lg">
                Make water measurable, understandable and controllable — from flow and tank levels to possible leaks, device health and connected water-system control.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-space-sm mb-space-xl">
                <Link className="px-space-lg py-3.5 rounded-full font-label-button text-label-button bg-primary text-on-primary hover:bg-primary-container active:scale-[0.98] transition-all shadow-md flex items-center gap-2 group" data-path="estate-assessment" to="/login">
                  <span className="">
                    Explore Smart Water Flow
                  </span>
                  <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
                    arrow_forward
                  </span>
                </Link>
                <a className="px-space-lg py-3.5 rounded-full font-label-button text-label-button bg-surface-container-lowest text-on-surface hover:bg-surface-container-high active:scale-[0.98] transition-all shadow-sm flex items-center gap-2" href="#interactive-preview">
                  <span className="material-symbols-outlined text-[18px] text-secondary">
                    tune
                  </span>
                  <span className="">
                    View System Architecture
                  </span>
                </a>
              </div>
              <div className="bg-surface-container-lowest w-full grid grid-cols-2 md:grid-cols-4 gap-gutter bg-surface-container-lowest p-6 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
                <div className="flex flex-col items-center md:items-start text-center md:text-left px-space-xs">
                  <span className="font-label-metric text-label-metric text-primary flex items-baseline gap-1">
                    Real-Time
                  </span>
                  <span className="font-label-uppercase text-label-uppercase text-on-surface-variant mt-1">
                    Flow &amp; Consumption
                  </span>
                  <span className="font-body-sm text-body-sm text-secondary mt-0.5">
                    Continuous flow &amp; volume tracking
                  </span>
                </div>
                <div className="flex flex-col items-center md:items-start text-center md:text-left px-space-xs">
                  <span className="font-label-metric text-label-metric text-primary flex items-baseline gap-1">
                    Dual Level
                  </span>
                  <span className="font-label-uppercase text-label-uppercase text-on-surface-variant mt-1">
                    Tank Monitoring
                  </span>
                  <span className="font-body-sm text-body-sm text-secondary mt-0.5">
                    Overhead tank &amp; sump / source
                  </span>
                </div>
                <div className="flex flex-col items-center md:items-start text-center md:text-left px-space-xs">
                  <span className="font-label-metric text-label-metric text-primary flex items-baseline gap-1">
                    pH • TDS
                  </span>
                  <span className="font-label-uppercase text-label-uppercase text-on-surface-variant mt-1">
                    Water Quality
                  </span>
                  <span className="font-body-sm text-body-sm text-secondary mt-0.5">
                    Turbidity &amp; temp (hardware dependent)
                  </span>
                </div>
                <div className="flex flex-col items-center md:items-start text-center md:text-left px-space-xs">
                  <span className="font-label-metric text-label-metric text-primary flex items-baseline gap-1">
                    Pump &amp; Valve
                  </span>
                  <span className="font-label-uppercase text-label-uppercase text-on-surface-variant mt-1">
                    Control &amp; Safety
                  </span>
                  <span className="font-body-sm text-body-sm text-secondary mt-0.5">
                    Command authorization &amp; audit trails
                  </span>
                </div>
              </div>
            </div>
          </FluidFlowGrid>
          <section className="w-full px-margin-sm md:px-margin lg:px-margin-lg py-space-xl" id="interactive-preview">
            <div className="max-w-7xl mx-auto">
              <div className="bg-surface-container-lowest bg-surface-container-lowest relative overflow-hidden p-6 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-sm pb-space-md mb-space-md border-b-0">
                  <div className="flex items-center gap-space-sm">
                    <div className="w-3 h-3 rounded-full bg-secondary animate-ping"></div>
                    <div className="flex flex-col">
                      <span className="font-headline-sm text-headline-sm text-primary">
                        System Preview // Prototype Mode
                      </span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">
                        Simulated Data • Node: Local Gateway
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-space-xs flex-wrap">
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-container/20 text-secondary font-label-uppercase text-label-uppercase">
                      <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                      {' '}Pumps Nominal
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container text-on-surface-variant font-label-uppercase text-label-uppercase">
                      <span className="material-symbols-outlined text-[14px]">
                        lock
                      </span>
                      {' '}Local Controller Link
                    </div>
                    <button className="px-3.5 py-1 rounded-full bg-primary text-on-primary font-label-button text-label-button hover:bg-primary-container transition-all" id="system-cycle-btn">
                      Cycle Diagnostic
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-lg items-center">
                  <div className="lg:col-span-5 bg-surface-container-low rounded-3xl p-space-md flex flex-col justify-between">
                    <div className="flex items-center justify-between mb-space-md">
                      <span className="font-label-uppercase text-label-uppercase text-primary">
                        Dual Tank Monitoring
                      </span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">
                        Overhead &amp; Sump Storage
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-gutter my-space-xs">
                      <div className="flex flex-col items-center">
                        <div className="relative w-24 h-48 rounded-3xl bg-surface-container-high overflow-hidden flex flex-col justify-end p-1.5 shadow-inner">
                          <div className="w-full bg-gradient-to-t from-secondary via-secondary/70 to-secondary-fixed rounded-b-[0.75rem] transition-all duration-700 relative" id="tank-gravity" style={{ height: "78%" }}>
                            <div className="absolute top-0 inset-x-0 h-1 bg-surface-container-lowest/80 shadow-sm animate-pulse"></div>
                          </div>
                          <div className="absolute inset-y-2 left-2 flex flex-col justify-between pointer-events-none opacity-40">
                            <span className="text-[11px] font-mono text-on-surface">
                              100%
                            </span>
                            <span className="text-[11px] font-mono text-on-surface">
                              75%
                            </span>
                            <span className="text-[11px] font-mono text-on-surface">
                              50%
                            </span>
                            <span className="text-[11px] font-mono text-on-surface">
                              25%
                            </span>
                          </div>
                        </div>
                        <span className="font-headline-sm text-headline-sm text-primary mt-space-sm" id="val-gravity">
                          78% (Simulated)
                        </span>
                        <span className="font-body-sm text-body-sm text-on-surface-variant">
                          Overhead Tank
                        </span>
                        <span className="font-label-uppercase text-label-uppercase text-secondary mt-1">
                          Target Reserve Tracking
                        </span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="relative w-24 h-48 rounded-3xl bg-surface-container-high overflow-hidden flex flex-col justify-end p-1.5 shadow-inner">
                          <div className="w-full bg-gradient-to-t from-tertiary-container via-on-tertiary-fixed-variant to-tertiary-fixed-dim rounded-b-[0.75rem] transition-all duration-700 relative" id="tank-cistern" style={{ height: "64%" }}>
                            <div className="absolute top-0 inset-x-0 h-1 bg-surface-container-lowest/70 shadow-sm"></div>
                          </div>
                          <div className="absolute inset-y-2 left-2 flex flex-col justify-between pointer-events-none opacity-40">
                            <span className="text-[11px] font-mono text-on-surface">
                              100%
                            </span>
                            <span className="text-[11px] font-mono text-on-surface">
                              75%
                            </span>
                            <span className="text-[11px] font-mono text-on-surface">
                              50%
                            </span>
                            <span className="text-[11px] font-mono text-on-surface">
                              25%
                            </span>
                          </div>
                        </div>
                        <span className="font-headline-sm text-headline-sm text-primary mt-space-sm" id="val-cistern">
                          64% (Simulated)
                        </span>
                        <span className="font-body-sm text-body-sm text-on-surface-variant">
                          Sump / Source
                        </span>
                        <span className="font-label-uppercase text-label-uppercase text-on-surface-variant mt-1">
                          Source Inflow Tracking
                        </span>
                      </div>
                    </div>
                    <div className="mt-space-md p-space-xs rounded-full bg-surface-container flex items-center justify-between px-4">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-secondary text-[16px]">
                          check_circle
                        </span>
                        <span className="font-body-sm text-body-sm text-on-surface">
                          Main Line Actuator
                        </span>
                      </div>
                      <span className="font-label-uppercase text-label-uppercase text-secondary">
                        ARMED • 100% OPEN
                      </span>
                    </div>
                  </div>
                  <div className="lg:col-span-7 flex flex-col gap-space-md">
                    <div className="bg-surface-container-low rounded-3xl p-space-md relative">
                      <div className="flex items-center justify-between mb-space-sm">
                        <div>
                          <span className="font-label-uppercase text-label-uppercase text-primary block">
                            Diurnal Flow vs Baseline (Simulated Pattern)
                          </span>
                          <span className="font-body-sm text-body-sm text-on-surface-variant">
                            Residential flow profile against typical household baseline envelope
                          </span>
                        </div>
                        <span className="font-label-uppercase text-label-uppercase text-secondary bg-secondary-container/20 px-2 py-0.5 rounded-full">
                          Rule-Based Envelope
                        </span>
                      </div>
                      <div className="w-full h-44 overflow-hidden relative">
                        <svg className="w-full h-full text-secondary" fill="none" preserveAspectRatio="none" viewBox="0 0 600 160">
                          <defs>
                            <linearGradient id="flowGradient" x1="0%" x2="0%" y1="0%" y2="100%">
                              <stop offset="0%" stopColor="currentColor" stopOpacity="0.25" />
                              <stop offset="100%" stopColor="currentColor" stopOpacity="0.0" />
                            </linearGradient>
                            <linearGradient id="envelopeGradient" x1="0%" x2="0%" y1="0%" y2="100%">
                              <stop offset="0%" stopColor="#0b1c30" stopOpacity="0.08" />
                              <stop offset="100%" stopColor="#0b1c30" stopOpacity="0.0" />
                            </linearGradient>
                          </defs>
                          <line stroke="#c8c5ca" strokeDasharray="4 4" strokeOpacity="0.3" x1="0" x2="600" y1="40" y2="40" />
                          <line stroke="#c8c5ca" strokeDasharray="4 4" strokeOpacity="0.3" x1="0" x2="600" y1="80" y2="80" />
                          <line stroke="#c8c5ca" strokeDasharray="4 4" strokeOpacity="0.3" x1="0" x2="600" y1="120" y2="120" />
                          <path d="M0,110 Q90,95 180,60 T360,45 T540,80 L600,75 L600,160 L0,160 Z" fill="url(#envelopeGradient)" />
                          <path d="M0,120 Q60,115 120,70 T240,40 T360,50 T480,95 T600,85" fill="none" id="telemetry-wave" stroke="currentColor" strokeLinecap="round" strokeWidth="2.5" />
                          <path d="M0,120 Q60,115 120,70 T240,40 T360,50 T480,95 T600,85 L600,160 L0,160 Z" fill="url(#flowGradient)" />
                          <circle className="fill-primary animate-pulse" cx="480" cy="95" r="4.5" />
                          <line stroke="#000000" strokeDasharray="2 2" strokeOpacity="0.2" x1="480" x2="480" y1="0" y2="160" />
                        </svg>
                        <div className="absolute bottom-1 right-2 bg-surface-container-lowest/90 px-2 py-0.5 rounded-2xl text-[11px] font-mono text-on-surface">
                          T-00:00:00 (Sample Sync)
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-[11px] font-mono text-on-surface-variant mt-2 px-1">
                        <span className="">
                          00:00 Inactive
                        </span>
                        <span className="">
                          06:00 Morning Rise
                        </span>
                        <span className="">
                          12:00 Midday Usage
                        </span>
                        <span className="">
                          18:00 Evening Peak
                        </span>
                        <span className="">
                          23:59 Night Rest
                        </span>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-gutter">
                      <div className="bg-surface-container-low rounded-3xl p-space-sm">
                        <span className="font-label-uppercase text-label-uppercase text-on-surface-variant block">
                          Line Pressure
                        </span>
                        <div className="flex items-baseline gap-1 mt-1">
                          <span className="font-headline-lg text-headline-lg text-primary" id="tele-pressure">
                            2.4
                          </span>
                          <span className="font-body-sm text-body-sm text-on-surface-variant">
                            bar (Demo)
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 mt-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                          <span className="font-body-sm text-body-sm text-secondary">
                            Normal Band
                          </span>
                        </div>
                      </div>
                      <div className="bg-surface-container-low rounded-3xl p-space-sm">
                        <span className="font-label-uppercase text-label-uppercase text-on-surface-variant block">
                          Flow Rate
                        </span>
                        <div className="flex items-baseline gap-1 mt-1">
                          <span className="font-headline-lg text-headline-lg text-primary" id="tele-flow">
                            4.6
                          </span>
                          <span className="font-body-sm text-body-sm text-on-surface-variant">
                            L/min (Simulated)
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 mt-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                          <span className="font-body-sm text-body-sm text-secondary">
                            Within Expected Envelope
                          </span>
                        </div>
                      </div>
                      <div className="bg-surface-container-low rounded-3xl p-space-sm">
                        <span className="font-label-uppercase text-label-uppercase text-on-surface-variant block">
                          Connectivity
                        </span>
                        <div className="flex items-baseline gap-1 mt-1">
                          <span className="font-headline-lg text-headline-lg text-primary" id="tele-acoustic">
                            Connected
                          </span>
                          <span className="font-body-sm text-body-sm text-on-surface-variant">
                            (Sample)
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 mt-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                          <span className="font-body-sm text-body-sm text-secondary">
                            Gateway Heartbeat OK
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section id="features" className="w-full px-margin-sm md:px-margin lg:px-margin-lg py-space-xl bg-surface-container-low">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-lg">
                <div>
                  <span className="font-label-uppercase text-label-uppercase text-secondary tracking-widest block mb-space-xs">
                    CORE CAPABILITIES
                  </span>
                  <h2 className="font-headline-xl-mobile lg:font-headline-xl text-headline-xl-mobile lg:text-headline-xl text-primary max-w-xl">
                    Practical water monitoring built for real homes.
                  </h2>
                </div>
                <p className="font-body-md text-body-md text-on-surface-variant max-w-md mt-space-sm md:mt-0">
                  From rule-based anomaly detection to safe multi-step valve actuation, Smart Water Flow brings clarity, auditability, and control to everyday domestic plumbing.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter-lg">
                <div className="bg-surface-container-lowest bg-surface-container-lowest flex flex-col justify-between hover:shadow-md transition-shadow p-8 rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
                  <div>
                    <div className="w-12 h-12 rounded-3xl bg-surface-container flex items-center justify-center text-primary mb-space-md">
                      <span className="material-symbols-outlined text-[26px]">
                        hearing
                      </span>
                    </div>
                    <span className="font-label-uppercase text-label-uppercase text-on-surface-variant">
                      MONITOR &amp; DETECT
                    </span>
                    <h3 className="font-headline-md text-headline-md text-primary mt-1 mb-space-sm">
                      Possible Leak &amp; Anomaly Detection
                    </h3>
                    <p className="font-body-md text-body-md text-on-surface-variant mb-space-md">
                      Identifies potential leaks when continuous unexpected flow persists beyond configured durations or during inactive hours. Supported by sensor debounce windows and optional physical moisture detection.
                    </p>
                  </div>
                  <div className="pt-space-md border-t-0 bg-surface-container-low rounded-3xl p-space-sm">
                    <div className="flex items-center justify-between text-body-sm font-body-sm">
                      <span className="text-on-surface-variant">
                        Detection Logic
                      </span>
                      <span className="font-headline-sm text-headline-sm text-primary">
                        Rule-Based • Configurable
                      </span>
                    </div>
                    <div className="w-full bg-surface-container-high h-1.5 rounded-full mt-2 overflow-hidden">
                      <div className="bg-secondary h-full rounded-full" style={{ width: "100%" }}></div>
                    </div>
                  </div>
                </div>
                <div className="bg-surface-container-lowest bg-surface-container-lowest flex flex-col justify-between hover:shadow-md transition-shadow p-8 rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
                  <div>
                    <div className="w-12 h-12 rounded-3xl bg-surface-container flex items-center justify-center text-primary mb-space-md">
                      <span className="material-symbols-outlined text-[26px]">
                        biotech
                      </span>
                    </div>
                    <span className="font-label-uppercase text-label-uppercase text-on-surface-variant">
                      QUALITY &amp; SENSORS
                    </span>
                    <h3 className="font-headline-md text-headline-md text-primary mt-1 mb-space-sm">
                      Water-Quality Observations
                    </h3>
                    <p className="font-body-md text-body-md text-on-surface-variant mb-space-md">
                      Tracks pH, TDS, turbidity, and water temperature depending on connected sensor hardware. Provides sensor health status, calibration reminders, and trend monitoring without claiming potable certification.
                    </p>
                  </div>
                  <div className="pt-space-md border-t-0 bg-surface-container-low rounded-3xl p-space-sm">
                    <div className="flex items-center justify-between text-body-sm font-body-sm">
                      <span className="text-on-surface-variant">
                        Parameters
                      </span>
                      <span className="font-headline-sm text-headline-sm text-primary">
                        pH, TDS, NTU, °C • Sensor Health
                      </span>
                    </div>
                    <div className="w-full bg-surface-container-high h-1.5 rounded-full mt-2 overflow-hidden">
                      <div className="bg-secondary h-full rounded-full" style={{ width: "100%" }}></div>
                    </div>
                  </div>
                </div>
                <div className="bg-surface-container-lowest bg-surface-container-lowest flex flex-col justify-between hover:shadow-md transition-shadow p-8 rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
                  <div>
                    <div className="w-12 h-12 rounded-3xl bg-surface-container flex items-center justify-center text-primary mb-space-md">
                      <span className="material-symbols-outlined text-[26px]">
                        shield
                      </span>
                    </div>
                    <span className="font-label-uppercase text-label-uppercase text-on-surface-variant">
                      CONTROL &amp; AUTOMATION
                    </span>
                    <h3 className="font-headline-md text-headline-md text-primary mt-1 mb-space-sm">
                      Safe Pump &amp; Valve Actuation
                    </h3>
                    <p className="font-body-md text-body-md text-on-surface-variant mb-space-md">
                      Execute pump and section-level valve commands with mandatory multi-step authorization, safety validation, timeout handling, and complete audit trail event logging.
                    </p>
                  </div>
                  <div className="pt-space-md border-t-0 bg-surface-container-low rounded-3xl p-space-sm">
                    <div className="flex items-center justify-between text-body-sm font-body-sm">
                      <span className="text-on-surface-variant">
                        Command States
                      </span>
                      <span className="font-headline-sm text-headline-sm text-primary">
                        Pending • Ack • Audit Logged
                      </span>
                    </div>
                    <div className="w-full bg-surface-container-high h-1.5 rounded-full mt-2 overflow-hidden">
                      <div className="bg-primary h-full rounded-full" style={{ width: "100%" }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section id="topology" className="w-full px-margin-sm md:px-margin lg:px-margin-lg py-space-xl">
            <div className="max-w-7xl mx-auto">
              <div className="text-center max-w-2xl mx-auto mb-space-lg">
                <span className="font-label-uppercase text-label-uppercase text-secondary tracking-widest block mb-space-xs">
                  RESIDENTIAL TOPOLOGY
                </span>
                <h2 className="font-headline-xl-mobile lg:font-headline-xl text-headline-xl-mobile lg:text-headline-xl text-primary">
                  Physical Residential Water-System Structure
                </h2>
                <p className="font-body-md text-body-md text-on-surface-variant mt-space-xs">
                  Section-level residential monitoring across seven planned functional zones rather than complex fixture-level sensors.
                </p>
              </div>
              <div className="bg-surface-container-lowest bg-surface-container-lowest p-6 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
                <div className="flex flex-wrap gap-2 justify-center mb-space-lg" id="topology-nodes">
                  <button className="topology-btn px-4 py-2 rounded-full font-label-button text-label-button bg-primary text-on-primary transition-all flex items-center gap-2" data-zone="kitchen">
                    <span className="w-2 h-2 rounded-full bg-secondary"></span>
                    <span className="">
                      Kitchen
                    </span>
                  </button>
                  <button className="topology-btn px-4 py-2 rounded-full font-label-button text-label-button bg-surface-container text-on-surface hover:bg-surface-container-high transition-all flex items-center gap-2" data-zone="bath1">
                    <span className="w-2 h-2 rounded-full bg-secondary"></span>
                    <span className="">
                      Bathroom 1
                    </span>
                  </button>
                  <button className="topology-btn px-4 py-2 rounded-full font-label-button text-label-button bg-surface-container text-on-surface hover:bg-surface-container-high transition-all flex items-center gap-2" data-zone="bath2">
                    <span className="w-2 h-2 rounded-full bg-secondary"></span>
                    <span className="">
                      Bathroom 2
                    </span>
                  </button>
                  <button className="topology-btn px-4 py-2 rounded-full font-label-button text-label-button bg-surface-container text-on-surface hover:bg-surface-container-high transition-all flex items-center gap-2" data-zone="bath3">
                    <span className="w-2 h-2 rounded-full bg-secondary"></span>
                    <span className="">
                      Bathroom 3
                    </span>
                  </button>
                  <button className="topology-btn px-4 py-2 rounded-full font-label-button text-label-button bg-surface-container text-on-surface hover:bg-surface-container-high transition-all flex items-center gap-2" data-zone="washing">
                    <span className="w-2 h-2 rounded-full bg-secondary"></span>
                    <span className="">
                      Washing Area
                    </span>
                  </button>
                  <button className="topology-btn px-4 py-2 rounded-full font-label-button text-label-button bg-surface-container text-on-surface hover:bg-surface-container-high transition-all flex items-center gap-2" data-zone="parking">
                    <span className="w-2 h-2 rounded-full bg-secondary"></span>
                    <span className="">
                      Parking
                    </span>
                  </button>
                  <button className="topology-btn px-4 py-2 rounded-full font-label-button text-label-button bg-surface-container text-on-surface hover:bg-surface-container-high transition-all flex items-center gap-2" data-zone="garden">
                    <span className="w-2 h-2 rounded-full bg-secondary"></span>
                    <span className="">
                      Garden
                    </span>
                  </button>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-lg items-center">
                  <div className="lg:col-span-7 relative rounded-3xl overflow-hidden h-[320px] sm:h-[380px] bg-surface-container-lowest border border-outline-variant/40 pt-3 px-3 pb-20 sm:pb-16">
                    <ZoneMap />
                                        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-primary">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-secondary">
                          hub
                        </span>
                        <span className="font-headline-sm text-headline-sm" id="zone-display-title">
                          Kitchen &amp; Utility Inflow • Normal
                        </span>
                      </div>
                      <span className="hidden sm:inline font-label-uppercase text-label-uppercase px-2.5 py-1 rounded-full bg-surface-container-high">
                        ESP32 / IoT Controller
                      </span>
                    </div>
                  </div>
                  <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-space-md">
                    <div className="bg-surface-container-low rounded-3xl p-space-md">
                      <div className="flex items-center justify-between mb-space-xs">
                        <span className="font-label-uppercase text-label-uppercase text-on-surface-variant">
                          Section Status
                        </span>
                        <span className="font-label-uppercase text-label-uppercase text-secondary font-semibold" id="zone-status">
                          Monitored
                        </span>
                      </div>
                      <p className="font-body-md text-body-md text-on-surface" id="zone-desc">
                        Dedicated residential line equipped with pulse flow metering, section motorized shutoff valve, and local telemetry reporting.
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-space-sm">
                      <div className="bg-surface-container-low rounded-3xl p-space-sm">
                        <span className="font-label-uppercase text-label-uppercase text-on-surface-variant">
                          Current Flow
                        </span>
                        <div className="flex items-baseline gap-1 mt-1">
                          <span className="font-headline-md text-headline-md text-primary" id="zone-pressure">
                            2.1
                          </span>
                          <span className="font-body-sm text-body-sm text-on-surface-variant">
                            L/min (Simulated)
                          </span>
                        </div>
                      </div>
                      <div className="bg-surface-container-low rounded-3xl p-space-sm">
                        <span className="font-label-uppercase text-label-uppercase text-on-surface-variant">
                          Valve State
                        </span>
                        <div className="flex items-baseline gap-1 mt-1">
                          <span className="font-headline-md text-headline-md text-primary" id="zone-jitter">
                            Open
                          </span>
                          <span className="font-body-sm text-body-sm text-on-surface-variant">
                            (Verified)
                          </span>
                        </div>
                      </div>
                      <div className="bg-surface-container-low rounded-3xl p-space-sm">
                        <span className="font-label-uppercase text-label-uppercase text-on-surface-variant">
                          Leak Flag
                        </span>
                        <div className="flex items-baseline gap-1 mt-1">
                          <span className="font-headline-md text-headline-md text-primary" id="zone-tds">
                            None
                          </span>
                          <span className="font-body-sm text-body-sm text-on-surface-variant">
                            No Abnormal Flow
                          </span>
                        </div>
                      </div>
                      <div className="bg-surface-container-low rounded-3xl p-space-sm">
                        <span className="font-label-uppercase text-label-uppercase text-on-surface-variant">
                          Controller Status
                        </span>
                        <div className="flex items-baseline gap-1 mt-1">
                          <span className="font-headline-md text-headline-md text-primary" id="zone-db">
                            Online
                          </span>
                          <span className="font-body-sm text-body-sm text-on-surface-variant">
                            100% Signal
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="p-space-sm rounded-3xl bg-surface-container-high flex items-center justify-between">
                      <span className="font-body-sm text-body-sm text-on-surface-variant">
                        Transport Security
                      </span>
                      <span className="font-label-button text-label-button text-secondary flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px]">
                          verified
                        </span>
                        {' '}Secure Transport • Section Control
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section id="comparison" className="w-full px-margin-sm md:px-margin lg:px-margin-lg py-space-xl bg-surface-container-low">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-lg">
                <div>
                  <span className="font-label-uppercase text-label-uppercase text-secondary tracking-widest block mb-space-xs">
                    SPECIFICATION BENCHMARK
                  </span>
                  <h2 className="font-headline-xl-mobile lg:font-headline-xl text-headline-xl-mobile lg:text-headline-xl text-primary max-w-xl">
                    Residential Water Management Comparison
                  </h2>
                </div>
                <p className="font-body-md text-body-md text-on-surface-variant max-w-md">
                  Comparing standard unmonitored home plumbing with Smart Water Flow's connected residential platform.
                </p>
              </div>
              <div className="bg-surface-container-lowest rounded-3xl shadow-sm overflow-hidden">
                <div className="grid grid-cols-12 p-space-md bg-surface-container text-on-surface font-label-uppercase text-label-uppercase">
                  <div className="col-span-5 md:col-span-6">
                    Feature / Capability
                  </div>
                  <div className="col-span-3 md:col-span-3 text-center text-on-surface-variant">
                    Standard Residential Plumbing
                  </div>
                  <div className="col-span-4 md:col-span-3 text-right md:text-center text-primary font-semibold">
                    Smart Water Flow (MVP Platform)
                  </div>
                </div>
                <div className="grid grid-cols-12 p-space-md items-center hover:bg-surface-container-low transition-colors">
                  <div className="col-span-5 md:col-span-6 flex flex-col">
                    <span className="font-headline-sm text-headline-sm text-primary">
                      Flow &amp; Consumption Tracking
                    </span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">
                      Overall usage insight across the household
                    </span>
                  </div>
                  <div className="col-span-3 md:col-span-3 text-center font-body-md text-body-md text-on-surface-variant">
                    Monthly utility meter estimate only
                  </div>
                  <div className="col-span-4 md:col-span-3 text-right md:text-center font-headline-sm text-headline-sm text-secondary">
                    Continuous section-level flow &amp; volume tracking
                  </div>
                </div>
                <div className="grid grid-cols-12 p-space-md items-center bg-surface-container-lowest/50 hover:bg-surface-container-low transition-colors">
                  <div className="col-span-5 md:col-span-6 flex flex-col">
                    <span className="font-headline-sm text-headline-sm text-primary">
                      Possible Leak Detection
                    </span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">
                      Early recognition of runaway or nocturnal water loss
                    </span>
                  </div>
                  <div className="col-span-3 md:col-span-3 text-center font-body-md text-body-md text-on-surface-variant">
                    Discovered after visible water damage
                  </div>
                  <div className="col-span-4 md:col-span-3 text-right md:text-center font-headline-sm text-headline-sm text-secondary">
                    Configurable duration &amp; unexpected flow alerts
                  </div>
                </div>
                <div className="grid grid-cols-12 p-space-md items-center hover:bg-surface-container-low transition-colors">
                  <div className="col-span-5 md:col-span-6 flex flex-col">
                    <span className="font-headline-sm text-headline-sm text-primary">
                      Tank &amp; Sump Level Monitoring
                    </span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">
                      Overhead and reservoir storage observation
                    </span>
                  </div>
                  <div className="col-span-3 md:col-span-3 text-center font-body-md text-body-md text-on-surface-variant">
                    Manual inspection / physical overflow
                  </div>
                  <div className="col-span-4 md:col-span-3 text-right md:text-center font-headline-sm text-headline-sm text-secondary">
                    Automated overhead tank &amp; sump level monitoring
                  </div>
                </div>
                <div className="grid grid-cols-12 p-space-md items-center bg-surface-container-lowest/50 hover:bg-surface-container-low transition-colors">
                  <div className="col-span-5 md:col-span-6 flex flex-col">
                    <span className="font-headline-sm text-headline-sm text-primary">
                      Pump &amp; Valve Management
                    </span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">
                      Actuation safety and remote state verification
                    </span>
                  </div>
                  <div className="col-span-3 md:col-span-3 text-center font-body-md text-body-md text-on-surface-variant">
                    Manual switches &amp; mechanical valves
                  </div>
                  <div className="col-span-4 md:col-span-3 text-right md:text-center font-headline-sm text-headline-sm text-secondary">
                    Authorized section-valve &amp; pump control with audit log
                  </div>
                </div>
                <div className="grid grid-cols-12 p-space-md items-center hover:bg-surface-container-low transition-colors">
                  <div className="col-span-5 md:col-span-6 flex flex-col">
                    <span className="font-headline-sm text-headline-sm text-primary">
                      Water-Quality Observations
                    </span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">
                      Baseline physical and chemical telemetry
                    </span>
                  </div>
                  <div className="col-span-3 md:col-span-3 text-center font-body-md text-body-md text-on-surface-variant">
                    Untracked or periodic third-party testing
                  </div>
                  <div className="col-span-4 md:col-span-3 text-right md:text-center font-headline-sm text-headline-sm text-primary">
                    pH, TDS, turbidity &amp; temperature monitoring (hardware dependent)
                  </div>
                </div>
                <div className="grid grid-cols-12 p-space-md items-center bg-surface-container-lowest/50 hover:bg-surface-container-low transition-colors">
                  <div className="col-span-5 md:col-span-6 flex flex-col">
                    <span className="font-headline-sm text-headline-sm text-primary">
                      Analytics &amp; Incident History
                    </span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">
                      Longitudinal usage records and alert auditing
                    </span>
                  </div>
                  <div className="col-span-3 md:col-span-3 text-center font-body-md text-body-md text-on-surface-variant">
                    Paper bills with no breakdown
                  </div>
                  <div className="col-span-4 md:col-span-3 text-right md:text-center font-headline-sm text-headline-sm text-primary">
                    Web dashboard, usage analytics &amp; downloadable reports
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="w-full px-margin-sm md:px-margin lg:px-margin-lg py-space-xl">
            <div className="max-w-7xl mx-auto">
              <div className="text-center max-w-xl mx-auto mb-space-lg">
                <span className="font-label-uppercase text-label-uppercase text-secondary tracking-widest block mb-space-xs">
                  SYSTEM PHILOSOPHY
                </span>
                <h2 className="font-headline-xl-mobile lg:font-headline-xl text-headline-xl-mobile lg:text-headline-xl text-primary">
                  Built for Practical Residential Water Management
                </h2>
                <p className="font-body-md text-body-md text-on-surface-variant mt-space-xs">
                  Engineering principles guiding the Smart Water Flow architecture and rollout.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter-lg">
                <div className="bg-surface-container-lowest bg-surface-container-lowest flex flex-col justify-between p-8 rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
                  <div>
                    <div className="flex items-center gap-1 text-secondary mb-space-sm">
                      <span className="material-symbols-outlined text-[18px]">
                        verified_user
                      </span>
                      <span className="font-label-uppercase text-label-uppercase ml-1">
                        PRINCIPLE 01
                      </span>
                    </div>
                    <h3 className="font-headline-sm text-headline-sm text-primary mb-space-xs">
                      Measurable &amp; Transparent
                    </h3>
                    <p className="font-body-md text-body-md text-on-surface mb-space-md italic">
                      “Water management begins with transparent, rule-based observations. We avoid black-box assumptions and provide clear, verifiable data from source to tap.”
                    </p>
                  </div>
                  <div className="pt-space-sm border-t-0 flex items-center gap-space-sm">
                    <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-primary font-headline-sm">
                      T
                    </div>
                    <div className="flex flex-col">
                      <span className="font-headline-sm text-headline-sm text-primary">
                        Core Architecture Principle
                      </span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">
                        Telemetry &amp; Data Transparency
                      </span>
                    </div>
                  </div>
                </div>
                <div className="bg-surface-container-lowest bg-surface-container-lowest flex flex-col justify-between p-8 rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
                  <div>
                    <div className="flex items-center gap-1 text-secondary mb-space-sm">
                      <span className="material-symbols-outlined text-[18px]">
                        security
                      </span>
                      <span className="font-label-uppercase text-label-uppercase ml-1">
                        PRINCIPLE 02
                      </span>
                    </div>
                    <h3 className="font-headline-sm text-headline-sm text-primary mb-space-xs">
                      Safety-First Control
                    </h3>
                    <p className="font-body-md text-body-md text-on-surface mb-space-md italic">
                      “Every physical actuator command requires strict safety verification, device timeout handling, and immutable audit logging before execution.”
                    </p>
                  </div>
                  <div className="pt-space-sm border-t-0 flex items-center gap-space-sm">
                    <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-primary font-headline-sm">
                      S
                    </div>
                    <div className="flex flex-col">
                      <span className="font-headline-sm text-headline-sm text-primary">
                        Actuation Standard
                      </span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">
                        Command Safety &amp; Verification
                      </span>
                    </div>
                  </div>
                </div>
                <div className="bg-surface-container-lowest bg-surface-container-lowest flex flex-col justify-between p-8 rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
                  <div>
                    <div className="flex items-center gap-1 text-secondary mb-space-sm">
                      <span className="material-symbols-outlined text-[18px]">
                        memory
                      </span>
                      <span className="font-label-uppercase text-label-uppercase ml-1">
                        PRINCIPLE 03
                      </span>
                    </div>
                    <h3 className="font-headline-sm text-headline-sm text-primary mb-space-xs">
                      Modular Hardware Integration
                    </h3>
                    <p className="font-body-md text-body-md text-on-surface mb-space-md italic">
                      “Designed around open IoT controller architectures (ESP32) and standard industrial sensor interfaces, allowing flexible hardware selection and calibration.”
                    </p>
                  </div>
                  <div className="pt-space-sm border-t-0 flex items-center gap-space-sm">
                    <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-primary font-headline-sm">
                      M
                    </div>
                    <div className="flex flex-col">
                      <span className="font-headline-sm text-headline-sm text-primary">
                        Hardware Foundation
                      </span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">
                        Extensible IoT Ecosystem
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section id="contact" className="w-full px-margin-sm md:px-margin lg:px-margin-lg pb-space-xl">
            <div className="max-w-7xl mx-auto">
              <div className="bg-primary text-on-primary rounded-3xl p-space-lg md:p-space-xl relative overflow-hidden shadow-xl">
                <div className="absolute -right-20 -bottom-20 w-[420px] h-[420px] rounded-full blob-emerald pointer-events-none"></div>
                <div className="absolute -left-20 -top-20 w-[300px] h-[300px] rounded-full blob-emerald opacity-60 pointer-events-none"></div>
                <div className="relative z-10 max-w-3xl">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-highest/20 text-secondary-fixed font-label-uppercase text-label-uppercase mb-space-sm">
                    <span className="">
                      RESIDENTIAL WATER PLATFORM
                    </span>
                  </div>
                  <h2 className="font-headline-xl-mobile lg:font-headline-xl text-headline-xl-mobile lg:text-headline-xl text-on-primary tracking-tight mb-space-sm">
                    Bring your home's water system into view.
                  </h2>
                  <p className="font-body-lg text-body-lg text-on-primary-container max-w-xl mb-space-lg">
                    Monitor flow, tank levels, water quality, connected devices and possible leaks from one integrated residential water-management platform.
                  </p>
                  <form className="flex flex-col sm:flex-row gap-space-sm max-w-lg" id="estate-intake-form" data-onsubmit="event.preventDefault(); document.getElementById('intake-success').classList.remove('hidden'); this.classList.add('hidden');">
                    <div className="relative flex-grow">
                      <input className="w-full px-space-md py-3.5 rounded-full bg-surface-container-lowest/10 text-on-primary placeholder:text-on-primary-container/60 focus:outline-none focus:bg-surface-container-lowest/20 transition-colors text-body-md font-body-md" placeholder="Enter your contact email..." required type="email" />
                    </div>
                    <button className="px-space-lg py-3.5 rounded-full bg-secondary text-on-secondary font-label-button text-label-button hover:bg-secondary/90 active:scale-[0.98] transition-all shrink-0" type="submit">
                      Explore Smart Water Flow →
                    </button>
                  </form>
                  <div className="hidden p-space-md rounded-3xl bg-surface-container-lowest/15 text-on-primary max-w-lg" id="intake-success">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-secondary-fixed text-[20px]">
                        check_circle
                      </span>
                      <span className="font-headline-sm text-headline-sm">
                        Interest Registered
                      </span>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-primary-container mt-1">
                      Thank you for exploring Smart Water Flow. Our team will share details regarding hardware compatibility and prototype onboarding.
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-space-md mt-space-lg text-[12px] text-on-primary-container">
                    <span className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-secondary-fixed"></span>
                      {' '}Prototype MVP Phase
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-secondary-fixed"></span>
                      {' '}Modular Hardware Compatibility
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-secondary-fixed"></span>
                      {' '}Transparent Data Rules
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      <footer className="w-full bg-surface-container-low text-on-surface shadow-[0_-1px_0_rgba(0,0,0,0.03)]">
        <div className="w-full px-margin-lg py-margin-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-gutter-lg pb-margin-lg">
            <div className="lg:col-span-2 flex flex-col gap-space-sm pr-space-lg">
              <div className="flex items-center gap-space-xs">
                <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center text-on-primary">
                  <span className="material-symbols-outlined text-[16px]">
                    water_drop
                  </span>
                </div>
                <span className="font-headline-sm text-headline-sm text-primary tracking-tight">
                  SMART WATER FLOW
                </span>
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-sm">
                Intelligent IoT water-management platform for residential monitoring, leak alerts, and connected water-system control.
              </p>
              <div className="flex items-center gap-space-sm mt-space-xs">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface text-on-surface-variant font-label-uppercase text-label-uppercase shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                  Residential MVP
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface text-on-surface-variant font-label-uppercase text-label-uppercase shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
                  ESP32 Compatible
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-space-sm">
              <span className="font-label-uppercase text-label-uppercase text-primary">
                Platform
              </span>
              <Link className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors" data-path="dashboard" to="/app/dashboard">
                Dashboard
              </Link>
              <Link className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors" data-path="my-home" to="/app/sections">
                My Home
              </Link>
              <Link className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors" data-path="usage" to="/app/usage">
                Water Usage
              </Link>
              <Link className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors" data-path="tanks" to="/app/tank">
                Tank Monitoring
              </Link>
            </div>
            <div className="flex flex-col gap-space-sm">
              <span className="font-label-uppercase text-label-uppercase text-primary">
                Systems
              </span>
              <Link className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors" data-path="water-quality" to="/app/quality">
                Water Quality
              </Link>
              <Link className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors" data-path="leak-detection" to="/app/alerts">
                Leak Detection
              </Link>
              <Link className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors" data-path="valve-control" to="/app/pump">
                Pump &amp; Valve Control
              </Link>
              <Link className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors" data-path="devices" to="/app/devices">
                Devices &amp; Settings
              </Link>
            </div>
            <div className="flex flex-col gap-space-sm">
              <span className="font-label-uppercase text-label-uppercase text-primary">
                Architecture
              </span>
              <span className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors" data-path="iot-controller">
                IoT Controller (ESP32)
              </span>
              <span className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors" data-path="secure-transport">
                Secure Transport
              </span>
              <span className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors" data-path="rule-alerts">
                Rule-Based Alerts
              </span>
              <span className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors" data-path="reports">
                Downloadable Reports
              </span>
            </div>
            <div className="flex flex-col gap-space-sm">
              <span className="font-label-uppercase text-label-uppercase text-primary">
                Project &amp; Status
              </span>
              <span className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors" data-path="residential-mvp">
                Residential MVP
              </span>
              <span className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors" data-path="roadmap">
                Development Roadmap
              </span>
              <span className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors" data-path="handoff">
                Developer Handoff
              </span>
              <span className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors" data-path="privacy">
                Privacy Policy
              </span>
            </div>
          </div>
          <div className="pt-space-md border-t border-surface-container flex flex-col md:flex-row items-center justify-between gap-space-sm">
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Smart Water Flow © 2025. Prototype specifications subject to hardware validation.
            </p>
            <div className="flex items-center gap-space-md">
              <span className="font-label-uppercase text-label-uppercase text-on-surface-variant">
                Status: Prototype / Demo Mode
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
