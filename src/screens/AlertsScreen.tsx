import { useEffect } from 'react';
import { setupAlerts } from './behaviors';

export default function AlertsScreen() {
  useEffect(() => setupAlerts(), []);
  return (
    <>
    <main className="w-full pt-8 pb-12">
      <div className="flex flex-col w-full space-y-8">
        <div className="flex flex-col space-y-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-high text-on-surface-variant font-label-uppercase text-label-uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                <span>
                  ACOUSTIC SENSING NODE • HYDRO-DEFENSE • NET-08
                </span>
              </div>
              <div className="space-y-1">
                <h1 className="font-headline-xl text-headline-xl text-on-surface tracking-tight">
                  Leakage &amp; Incident Control
                </h1>
                <p className="font-body-lg text-body-lg text-on-surface-variant mt-1">
                  Sub-harmonic acoustic leak detection, hydrostatic pressure decay telemetry, and autonomous micro-solenoid burst containment.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              <button className="px-5 py-2.5 rounded-full bg-surface-container-lowest shadow-sm hover:bg-surface-container-high text-on-surface font-label-button text-label-button transition-all duration-200 flex items-center gap-2" id="btn-acoustic-test">
                <span className="material-symbols-outlined text-[18px]">
                  hearing
                </span>
                <span>
                  System Acoustic Test
                </span>
              </button>
              <button className="px-5 py-2.5 rounded-full bg-primary hover:bg-primary-container text-on-primary font-label-button text-label-button shadow-md transition-all duration-200 flex items-center gap-2 active:scale-95" id="btn-emergency-shutoff">
                <span className="material-symbols-outlined text-[18px] text-error-container">
                  power_settings_new
                </span>
                <span>
                  Emergency Global Shutoff
                </span>
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between pb-1">
            <div className="inline-flex p-1 rounded-full bg-surface-container-high text-on-surface-variant text-body-sm font-body-sm">
              <button className="px-4 py-1.5 rounded-full bg-surface-container-lowest text-on-surface font-medium shadow-sm transition-all">
                Live Monitor
              </button>
              <button className="px-4 py-1.5 rounded-full text-on-surface-variant hover:text-on-surface transition-colors">
                24H Incident Log
              </button>
              <button className="px-4 py-1.5 rounded-full text-on-surface-variant hover:text-on-surface transition-colors">
                Archive
              </button>
            </div>
            <div className="hidden sm:flex items-center gap-2 text-body-sm font-body-sm text-on-surface-variant">
              <span className="inline-block w-2 h-2 rounded-full bg-secondary"></span>
              <span>
                Acoustic Matrix: 8/8 Nodes Responding Synchronously
              </span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-surface-container-lowest bg-surface-container-lowest flex flex-col justify-between p-6 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
              <div className="flex items-start justify-between">
                <span className="font-label-uppercase text-label-uppercase text-on-surface-variant tracking-wider uppercase">
                  Hydraulic Integrity Score
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-secondary-container/30 text-on-secondary-container font-label-uppercase text-label-uppercase font-semibold">
                  Nominal
                </span>
              </div>
              <div className="my-4 space-y-1">
                <div className="font-label-metric text-label-metric text-on-surface tracking-tight">
                  100%
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Pristine • No Micro-Fissures Detected
                </p>
              </div>
              <div className="flex items-center gap-1.5 pt-3 font-body-sm text-body-sm text-secondary">
                <span className="material-symbols-outlined text-[16px]">
                  trending_flat
                </span>
                <span>
                  +0.0% vs 30d baseline
                </span>
              </div>
            </div>
            <div className="bg-surface-container-lowest bg-surface-container-lowest flex flex-col justify-between p-6 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
              <div className="flex items-start justify-between">
                <span className="font-label-uppercase text-label-uppercase text-on-surface-variant tracking-wider uppercase">
                  Acoustic Noise Floor
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-secondary-container/30 text-on-secondary-container font-label-uppercase text-label-uppercase font-semibold">
                  Optimal Silence
                </span>
              </div>
              <div className="my-4 space-y-1">
                <div className="font-label-metric text-label-metric text-on-surface tracking-tight">
                  14.2{' '}
                  <span className="font-body-md text-body-md text-on-surface-variant">
                    dB
                  </span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Ultrasonic baseline 12–18 dB target
                </p>
              </div>
              <div className="flex items-center gap-1.5 pt-3 font-body-sm text-body-sm text-on-surface-variant">
                <span className="material-symbols-outlined text-[16px]">
                  graphic_eq
                </span>
                <span>
                  Listening Array: Nominal
                </span>
              </div>
            </div>
            <div className="bg-surface-container-lowest bg-surface-container-lowest flex flex-col justify-between p-6 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
              <div className="flex items-start justify-between">
                <span className="font-label-uppercase text-label-uppercase text-on-surface-variant tracking-wider uppercase">
                  Night Pressure Decay
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-secondary-container/30 text-on-secondary-container font-label-uppercase text-label-uppercase font-semibold">
                  Acoustic Pass
                </span>
              </div>
              <div className="my-4 space-y-1">
                <div className="font-label-metric text-label-metric text-on-surface tracking-tight">
                  0.00{' '}
                  <span className="font-body-md text-body-md text-on-surface-variant">
                    bar/h
                  </span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Zero Drop Verified at 03:00 AM
                </p>
              </div>
              <div className="flex items-center gap-1.5 pt-3 font-body-sm text-body-sm text-secondary">
                <span className="material-symbols-outlined text-[16px]">
                  check_circle
                </span>
                <span>
                  Hydrostatic seal absolute
                </span>
              </div>
            </div>
            <div className="bg-surface-container-lowest bg-surface-container-lowest flex flex-col justify-between p-6 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
              <div className="flex items-start justify-between">
                <span className="font-label-uppercase text-label-uppercase text-on-surface-variant tracking-wider uppercase">
                  Active Incidents
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-secondary-container/30 text-on-secondary-container font-label-uppercase text-label-uppercase font-semibold">
                  Guarded
                </span>
              </div>
              <div className="my-4 space-y-1">
                <div className="font-label-metric text-label-metric text-on-surface tracking-tight">
                  0{' '}
                  <span className="font-body-md text-body-md text-on-surface-variant">
                    Active
                  </span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  1 Resolved in Past 7 Days
                </p>
              </div>
              <div className="flex items-center gap-1.5 pt-3 font-body-sm text-body-sm text-on-surface-variant">
                <span className="material-symbols-outlined text-[16px]">
                  shield
                </span>
                <span>
                  Solenoid interlocks ready
                </span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-8">
              <div className="bg-surface-container-lowest bg-surface-container-lowest space-y-6 p-8 rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h2 className="font-headline-sm text-headline-sm text-on-surface">
                      Acoustic Frequency Spectrum &amp; Vibration Telemetry
                    </h2>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      Fast Fourier Transform (FFT) continuous ultrasonic stream • 20 kHz – 100 kHz
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="flex h-2 w-2 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
                    </span>
                    <span className="font-label-uppercase text-label-uppercase text-secondary uppercase font-semibold">
                      Live Spectrum
                    </span>
                  </div>
                </div>
                <div className="relative bg-surface-container-low rounded-3xl p-4 overflow-hidden">
                  <div className="flex items-center justify-between pb-3 font-body-sm text-body-sm text-on-surface-variant">
                    <span>
                      Cavitation Risk Horizon: Nil (&lt;0.01%)
                    </span>
                    <span className="font-mono text-body-sm">
                      Transducer Sensitivity: 0.002 Pa
                    </span>
                  </div>
                  <div className="h-44 w-full relative flex items-end">
                    <svg className="w-full h-full" fill="none" preserveAspectRatio="none" viewBox="0 0 700 160">
                      <defs>
                        <linearGradient id="spectrumGradient" x1="0" x2="0" y1="0" y2="1">
                          <stop offset="0%" stopColor="#006c49" stopOpacity="0.18" />
                          <stop offset="100%" stopColor="#006c49" stopOpacity="0.0" />
                        </linearGradient>
                        <linearGradient id="thresholdGradient" x1="0" x2="1" y1="0" y2="0">
                          <stop offset="0%" stopColor="#c8c5ca" stopOpacity="0.3" />
                          <stop offset="100%" stopColor="#c8c5ca" stopOpacity="0.8" />
                        </linearGradient>
                      </defs>
                      <line className="text-error" opacity="0.35" stroke="currentColor" strokeDasharray="4 4" strokeWidth="1" x1="0" x2="700" y1="35" y2="35" />
                      <text className="text-[11px] fill-current text-error font-mono" x="6" y="30">
                        CRITICAL TURBULENCE THRESHOLD (42 dB)
                      </text>
                      <line className="text-outline-variant" stroke="currentColor" strokeDasharray="2 4" strokeWidth="0.75" x1="0" x2="700" y1="80" y2="80" />
                      <line className="text-outline-variant" stroke="currentColor" strokeDasharray="2 4" strokeWidth="0.75" x1="0" x2="700" y1="120" y2="120" />
                      <path d="M0,135 Q35,130 70,138 T140,132 T210,136 T280,128 T350,133 T420,129 T490,135 T560,131 T630,134 T700,132 L700,160 L0,160 Z" fill="url(#spectrumGradient)" />
                      <path d="M0,135 Q35,130 70,138 T140,132 T210,136 T280,128 T350,133 T420,129 T490,135 T560,131 T630,134 T700,132" stroke="#006c49" strokeWidth="2" />
                      <circle className="fill-secondary" cx="350" cy="133" r="4" />
                      <circle className="fill-secondary" cx="560" cy="131" r="4" />
                    </svg>
                  </div>
                  <div className="flex items-center justify-between pt-2 text-body-sm font-body-sm text-on-surface-variant font-mono">
                    <span>
                      20 kHz
                    </span>
                    <span>
                      40 kHz
                    </span>
                    <span>
                      60 kHz
                    </span>
                    <span>
                      80 kHz
                    </span>
                    <span>
                      100 kHz
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 pt-1">
                  <div className="p-3 bg-surface-container-low rounded-3xl space-y-1">
                    <span className="font-label-uppercase text-label-uppercase text-on-surface-variant uppercase">
                      Ultrasonic Envelope
                    </span>
                    <div className="font-headline-sm text-headline-sm text-on-surface font-medium">
                      14.2 dB
                    </div>
                    <p className="font-body-sm text-body-sm text-secondary">
                      Nominal (Safe &lt;26 dB)
                    </p>
                  </div>
                  <div className="p-3 bg-surface-container-low rounded-3xl space-y-1">
                    <span className="font-label-uppercase text-label-uppercase text-on-surface-variant uppercase">
                      Micro-Pinhole Risk
                    </span>
                    <div className="font-headline-sm text-headline-sm text-on-surface font-medium">
                      0.00%
                    </div>
                    <p className="font-body-sm text-body-sm text-secondary">
                      Zero signature match
                    </p>
                  </div>
                  <div className="p-3 bg-surface-container-low rounded-3xl space-y-1">
                    <span className="font-label-uppercase text-label-uppercase text-on-surface-variant uppercase">
                      Solenoid Transit Latency
                    </span>
                    <div className="font-headline-sm text-headline-sm text-on-surface font-medium">
                      180 ms
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      Calibrated &amp; primed
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-surface-container-lowest bg-surface-container-lowest space-y-6 p-8 rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="font-headline-sm text-headline-sm text-on-surface">
                      Spatial Acoustic Sensor Array Health &amp; Diagnostic Mesh
                    </h2>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      Independent listening nodes monitoring hydraulic nodes across estate topology
                    </p>
                  </div>
                  <span className="material-symbols-outlined text-on-surface-variant text-[20px]">
                    hub
                  </span>
                </div>
                <div className="space-y-3">
                  <div className="p-4 bg-surface-container-low rounded-3xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-surface-container transition-colors">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-surface-container-highest flex items-center justify-center shrink-0 mt-0.5">
                        <span className="material-symbols-outlined text-[18px] text-on-surface">
                          water
                        </span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-body-md text-body-md font-semibold text-on-surface">
                            Zone 1: Main Inflow Manifold
                          </span>
                          <span className="font-mono text-body-sm text-on-surface-variant">
                            SN-A109
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-body-sm font-body-sm text-on-surface-variant mt-0.5">
                          <span>
                            Acoustic Fidelity: 99.8%
                          </span>
                          <span>
                            •
                          </span>
                          <span>
                            Loss: 0.00 L/h
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 self-end sm:self-center">
                      <span className="px-2.5 py-1 rounded-full bg-secondary-container/30 text-on-secondary-container font-label-uppercase text-label-uppercase font-semibold">
                        Secured
                      </span>
                      <span className="material-symbols-outlined text-[18px] text-secondary">
                        verified
                      </span>
                    </div>
                  </div>
                  <div className="p-4 bg-surface-container-low rounded-3xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-surface-container transition-colors">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-surface-container-highest flex items-center justify-center shrink-0 mt-0.5">
                        <span className="material-symbols-outlined text-[18px] text-on-surface">
                          domain
                        </span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-body-md text-body-md font-semibold text-on-surface">
                            Zone 2: Primary Riser (Floors 1–2)
                          </span>
                          <span className="font-mono text-body-sm text-on-surface-variant">
                            SN-A112
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-body-sm font-body-sm text-on-surface-variant mt-0.5">
                          <span>
                            Acoustic Fidelity: 99.4%
                          </span>
                          <span>
                            •
                          </span>
                          <span>
                            Loss: 0.00 L/h
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 self-end sm:self-center">
                      <span className="px-2.5 py-1 rounded-full bg-secondary-container/30 text-on-secondary-container font-label-uppercase text-label-uppercase font-semibold">
                        Secured
                      </span>
                      <span className="material-symbols-outlined text-[18px] text-secondary">
                        verified
                      </span>
                    </div>
                  </div>
                  <div className="p-4 bg-surface-container-low rounded-3xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-surface-container transition-colors">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-surface-container-highest flex items-center justify-center shrink-0 mt-0.5">
                        <span className="material-symbols-outlined text-[18px] text-on-surface">
                          hot_tub
                        </span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-body-md text-body-md font-semibold text-on-surface">
                            Zone 3: Master Bathroom &amp; Spa Sub-Manifold
                          </span>
                          <span className="font-mono text-body-sm text-on-surface-variant">
                            SN-A118
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-body-sm font-body-sm text-on-surface-variant mt-0.5">
                          <span>
                            Acoustic Fidelity: 98.9%
                          </span>
                          <span>
                            •
                          </span>
                          <span>
                            Loss: 0.00 L/h
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 self-end sm:self-center">
                      <span className="px-2.5 py-1 rounded-full bg-secondary-container/30 text-on-secondary-container font-label-uppercase text-label-uppercase font-semibold">
                        Secured
                      </span>
                      <span className="material-symbols-outlined text-[18px] text-secondary">
                        verified
                      </span>
                    </div>
                  </div>
                  <div className="p-4 bg-surface-container-low rounded-3xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-surface-container transition-colors">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-surface-container-highest flex items-center justify-center shrink-0 mt-0.5">
                        <span className="material-symbols-outlined text-[18px] text-on-surface">
                          waves
                        </span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-body-md text-body-md font-semibold text-on-surface">
                            Zone 4: Subterranean Cistern Loop
                          </span>
                          <span className="font-mono text-body-sm text-on-surface-variant">
                            SN-A125
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-body-sm font-body-sm text-on-surface-variant mt-0.5">
                          <span>
                            Acoustic Fidelity: 99.1%
                          </span>
                          <span>
                            •
                          </span>
                          <span>
                            Loss: 0.00 L/h
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 self-end sm:self-center">
                      <span className="px-2.5 py-1 rounded-full bg-secondary-container/30 text-on-secondary-container font-label-uppercase text-label-uppercase font-semibold">
                        Secured
                      </span>
                      <span className="material-symbols-outlined text-[18px] text-secondary">
                        verified
                      </span>
                    </div>
                  </div>
                  <div className="p-4 bg-surface-container-low rounded-3xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-surface-container transition-colors">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-surface-container-highest flex items-center justify-center shrink-0 mt-0.5">
                        <span className="material-symbols-outlined text-[18px] text-on-surface">
                          yard
                        </span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-body-md text-body-md font-semibold text-on-surface">
                            Zone 5: Landscape &amp; Perimeter Hydrant
                          </span>
                          <span className="font-mono text-body-sm text-on-surface-variant">
                            SN-A130
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-body-sm font-body-sm text-on-surface-variant mt-0.5">
                          <span>
                            Micro-vibrations detected during irrigation (expected cycle)
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 self-end sm:self-center">
                      <span className="px-2.5 py-1 rounded-full bg-surface-container-highest text-on-surface-variant font-label-uppercase text-label-uppercase font-semibold">
                        Bypassed / Normal
                      </span>
                      <span className="material-symbols-outlined text-[18px] text-on-surface-variant">
                        schedule
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-5 space-y-8">
              <div className="bg-surface-container-lowest bg-surface-container-lowest space-y-6 p-8 rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
                <div>
                  <h2 className="font-headline-sm text-headline-sm text-on-surface">
                    Autonomous Shutoff Protocols
                  </h2>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Zero-latency edge mitigation matrix triggers
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="p-4 bg-surface-container-low rounded-3xl space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-body-md text-body-md font-semibold text-on-surface">
                        Pinhole Cavitation Detection
                      </span>
                      <button className="px-3 py-1 rounded-full bg-primary text-on-primary font-label-uppercase text-label-uppercase">
                        Armed
                      </button>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                      Auto-flags continuous micro-flow (&gt;0.05 L/min) exceeding 3 consecutive hours. Triggers advisory alert and reduces line pressure by 20%.
                    </p>
                  </div>
                  <div className="p-4 bg-surface-container-low rounded-3xl space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-body-md text-body-md font-semibold text-on-surface">
                        Catastrophic Pipe Burst Interlock
                      </span>
                      <button className="px-3 py-1 rounded-full bg-primary text-on-primary font-label-uppercase text-label-uppercase">
                        Armed
                      </button>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                      Trip threshold &gt;45 L/min for 60s without recognized human presence. Actuates master obsidian ball valve in 180ms.
                    </p>
                  </div>
                  <div className="p-4 bg-surface-container-low rounded-3xl space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-body-md text-body-md font-semibold text-on-surface">
                        Freeze &amp; Thermal Expansion Relief
                      </span>
                      <button className="px-3 py-1 rounded-full bg-primary text-on-primary font-label-uppercase text-label-uppercase">
                        Armed
                      </button>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                      Pulses riser circulation solenoid when exposed manifold temperatures dip beneath 2.0°C to inhibit ice crystals.
                    </p>
                  </div>
                  <div className="p-4 bg-surface-container-low rounded-3xl space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-body-md text-body-md font-semibold text-on-surface">
                        Nocturnal Pressure Decay Lockout
                      </span>
                      <button className="px-3 py-1 rounded-full bg-surface-container-highest text-on-surface-variant font-label-uppercase text-label-uppercase">
                        Scheduled
                      </button>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                      Closes incoming municipal check valve daily between 02:00–04:00 to run 45-minute hydrostatic precision static decay calibration.
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-surface-container-lowest bg-surface-container-lowest space-y-6 p-8 rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="font-headline-sm text-headline-sm text-on-surface">
                      Recent Historical Events
                    </h2>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      Immutable telemetry &amp; verification log
                    </p>
                  </div>
                  <span className="font-mono text-body-sm text-on-surface-variant">
                    LOG-AUDIT
                  </span>
                </div>
                <div className="space-y-4">
                  <div className="flex gap-3 pb-3">
                    <div className="w-2 h-2 rounded-full bg-secondary mt-2 shrink-0"></div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-body-md text-body-md font-semibold text-on-surface">
                          Night Decay Check Completed
                        </span>
                        <span className="text-body-sm font-body-sm text-on-surface-variant">
                          • Today 03:15 AM
                        </span>
                      </div>
                      <p className="text-body-sm font-body-sm text-on-surface-variant">
                        0.00 bar drop recorded over 45 minutes of complete isolation.
                      </p>
                      <div className="inline-flex items-center gap-1 font-body-sm text-body-sm text-secondary">
                        <span className="material-symbols-outlined text-[16px]">
                          done_all
                        </span>
                        <span>
                          Result: Verified Leak-Free
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-3 pb-3">
                    <div className="w-2 h-2 rounded-full bg-on-surface-variant mt-2 shrink-0"></div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-body-md text-body-md font-semibold text-on-surface">
                          High-Velocity Spigot Surge
                        </span>
                        <span className="text-body-sm font-body-sm text-on-surface-variant">
                          • Yesterday 16:40 PM
                        </span>
                      </div>
                      <p className="text-body-sm font-body-sm text-on-surface-variant">
                        28 L/min sustained for 4 minutes at Garden Hydrant.
                      </p>
                      <div className="inline-flex items-center gap-1 font-body-sm text-body-sm text-on-surface-variant">
                        <span className="material-symbols-outlined text-[16px]">
                          psychology
                        </span>
                        <span>
                          AI Classifier: Benign Human Operation (Irrigation)
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-2 h-2 rounded-full bg-on-surface-variant mt-2 shrink-0"></div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-body-md text-body-md font-semibold text-on-surface">
                          Automatic Transducer Re-zeroing
                        </span>
                        <span className="text-body-sm font-body-sm text-on-surface-variant">
                          • 2 days ago
                        </span>
                      </div>
                      <p className="text-body-sm font-body-sm text-on-surface-variant">
                        Ultrasonic calibration offset tuned by 0.02ms across all 8 spatial receivers.
                      </p>
                      <div className="inline-flex items-center gap-1 font-body-sm text-body-sm text-on-surface-variant">
                        <span className="material-symbols-outlined text-[16px]">
                          tune
                        </span>
                        <span>
                          Precision Alignment: Complete
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="fixed inset-0 z-50 bg-inverse-surface/40 backdrop-blur-sm hidden items-center justify-center p-4" id="modal-confirm">
          <div className="bg-surface-container-lowest bg-surface-container-lowest max-w-md w-full space-y-6 p-8 rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
            <div className="flex items-center gap-3 text-error">
              <div className="w-10 h-10 rounded-full bg-error-container flex items-center justify-center">
                <span className="material-symbols-outlined text-[24px] text-on-error-container">
                  warning
                </span>
              </div>
              <div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface">
                  Emergency Main Isolation
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Dual-motor actuated shutoff
                </p>
              </div>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant">
              This will immediately actuate the master obsidian high-torque valve, depressing pressure throughout the residence within 180 milliseconds. Confirm immediate isolation?
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button className="px-5 py-2 rounded-full bg-surface-container-high text-on-surface font-label-button text-label-button hover:bg-surface-container transition-colors" id="btn-cancel-modal">
                Cancel
              </button>
              <button className="px-5 py-2 rounded-full bg-error text-on-error font-label-button text-label-button shadow-md hover:opacity-90 transition-all" id="btn-confirm-modal">
                Execute Isolation
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
    </>
  );
}
