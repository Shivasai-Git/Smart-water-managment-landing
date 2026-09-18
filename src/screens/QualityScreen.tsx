import { useEffect } from 'react';
import { setupQuality } from './behaviors';

export default function QualityScreen() {
  useEffect(() => setupQuality(), []);
  return (
    <>
    <main className="w-full pt-8 pb-12">
      <div className="flex flex-col w-full space-y-8">
        <section className="flex flex-col xl:flex-row xl:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
              <span className="font-label-uppercase text-label-uppercase text-secondary uppercase tracking-widest font-semibold">
                Spectrometry Node • Aqua-Purity Sensor Lab #WQ-09
              </span>
              <span className="text-outline-variant font-mono text-body-sm">
                •
              </span>
              <span className="font-body-sm text-body-sm text-on-surface-variant font-mono">
                ISO 17025 Compliant Realtime Telemetry
              </span>
            </div>
            <h1 className="font-headline-xl text-headline-xl text-on-surface tracking-tight">
              Water Quality &amp; Purification Lab
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant mt-1">
              Real-time electrochemical spectrometry, multi-stage filtration health, and biochemical purity indexes calibrated at sub-part-per-million fidelity.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex p-1 bg-surface-container-low rounded-full">
              <button className="px-4 py-1.5 rounded-full font-label-button text-label-button transition-all bg-surface-container-lowest text-on-surface shadow-sm" id="tab-live" data-onclick="setActiveRange('live')">
                Live Spectrometry
              </button>
              <button className="px-4 py-1.5 rounded-full font-label-button text-label-button transition-all text-on-surface-variant hover:text-on-surface" id="tab-24h" data-onclick="setActiveRange('24h')">
                24H Trend
              </button>
              <button className="px-4 py-1.5 rounded-full font-label-button text-label-button transition-all text-on-surface-variant hover:text-on-surface" id="tab-30d" data-onclick="setActiveRange('30d')">
                30D Log
              </button>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-surface-container-lowest text-on-surface hover:bg-surface-container-high transition-colors font-label-button text-label-button shadow-sm" data-onclick="triggerCalibration()">
              <span className="material-symbols-outlined text-[18px] text-on-surface-variant" id="calib-icon">
                tune
              </span>
              <span id="calib-text">
                Calibrate Sensors
              </span>
            </button>
            <button className="flex items-center gap-2 px-5 py-2 rounded-full bg-primary text-on-primary hover:bg-primary/90 transition-all font-label-button text-label-button active:scale-[0.98] shadow-sm">
              <span className="material-symbols-outlined text-[18px]">
                verified
              </span>
              <span>
                Export Lab Certificate
              </span>
            </button>
          </div>
        </section>
        <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          <div className="bg-surface-container-lowest relative overflow-hidden bg-surface-container-lowest flex flex-col justify-between group hover:shadow-md transition-shadow p-6 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
            <div className="flex items-start justify-between gap-4">
              <div className="flex flex-col gap-1">
                <span className="font-label-uppercase text-label-uppercase text-on-surface-variant uppercase tracking-wider">
                  Composite Purity
                </span>
                <span className="font-body-sm text-body-sm text-on-surface-variant">
                  Electrochemical Index
                </span>
              </div>
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-secondary-container/30 text-on-secondary-container font-label-button text-label-button">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                {' '}Grade A+ Potable
              </span>
            </div>
            <div className="my-5 flex items-baseline gap-2">
              <span className="font-display-lg text-display-lg text-on-surface tracking-tight">
                98.4
              </span>
              <span className="font-headline-sm text-headline-sm text-on-surface-variant font-light">
                / 100
              </span>
            </div>
            <div className="pt-3 flex flex-col gap-2">
              <div className="w-full bg-surface-container-low h-1.5 rounded-full overflow-hidden">
                <div className="bg-secondary h-full rounded-full" style={{ width: "98.4%" }}></div>
              </div>
              <div className="flex items-center justify-between font-body-sm text-body-sm text-on-surface-variant">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px] text-secondary">
                    check_circle
                  </span>
                  {' '}Exceeds WHO &amp; EPA Standards
                </span>
                <span className="font-mono text-[11px]">
                  Δ +0.3%
                </span>
              </div>
            </div>
          </div>
          <div className="bg-surface-container-lowest relative overflow-hidden bg-surface-container-lowest flex flex-col justify-between group hover:shadow-md transition-shadow p-6 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
            <div className="flex items-start justify-between gap-4">
              <div className="flex flex-col gap-1">
                <span className="font-label-uppercase text-label-uppercase text-on-surface-variant uppercase tracking-wider">
                  Total Dissolved Solids
                </span>
                <span className="font-body-sm text-body-sm text-on-surface-variant">
                  Post-Permeation Core
                </span>
              </div>
              <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-secondary-container/20 text-on-secondary-container font-label-button text-label-button font-mono">
                -85% TDS
              </span>
            </div>
            <div className="my-5 flex items-baseline gap-2">
              <span className="font-display-lg text-display-lg text-on-surface tracking-tight">
                42
              </span>
              <span className="font-headline-sm text-headline-sm text-on-surface-variant">
                ppm
              </span>
            </div>
            <div className="pt-3 flex flex-col gap-2">
              <div className="flex items-center justify-between font-body-sm text-body-sm text-on-surface-variant">
                <span>
                  Feedwater incoming: 280 ppm
                </span>
                <span className="font-medium text-secondary">
                  Ultra-Pure RO
                </span>
              </div>
              <div className="w-full bg-surface-container-low h-1.5 rounded-full overflow-hidden flex">
                <div className="bg-secondary h-full" style={{ width: "15%" }}></div>
                <div className="bg-surface-variant h-full" style={{ width: "85%" }}></div>
              </div>
            </div>
          </div>
          <div className="bg-surface-container-lowest relative overflow-hidden bg-surface-container-lowest flex flex-col justify-between group hover:shadow-md transition-shadow p-6 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
            <div className="flex items-start justify-between gap-4">
              <div className="flex flex-col gap-1">
                <span className="font-label-uppercase text-label-uppercase text-on-surface-variant uppercase tracking-wider">
                  pH Equilibrium
                </span>
                <span className="font-body-sm text-body-sm text-on-surface-variant">
                  Calibrated Potentiometric
                </span>
              </div>
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container-high text-on-surface font-label-button text-label-button">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                {' '}Neutral Alkaline
              </span>
            </div>
            <div className="my-5 flex items-baseline gap-2">
              <span className="font-display-lg text-display-lg text-on-surface tracking-tight">
                7.35
              </span>
              <span className="font-headline-sm text-headline-sm text-on-surface-variant font-normal">
                pH
              </span>
            </div>
            <div className="pt-3 space-y-1.5">
              <div className="relative w-full bg-surface-container-low h-1.5 rounded-full">
                <div className="absolute left-[30%] right-[30%] bg-secondary-fixed-dim/40 h-full"></div>
                <div className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-primary -ml-1.5" style={{ left: "52%" }}></div>
              </div>
              <div className="flex items-center justify-between font-body-sm text-body-sm text-on-surface-variant font-mono text-[11px]">
                <span>
                  Acidic (6.0)
                </span>
                <span className="text-on-surface font-semibold">
                  Target 7.0 - 7.6
                </span>
                <span>
                  Basic (8.5)
                </span>
              </div>
            </div>
          </div>
          <div className="bg-surface-container-lowest relative overflow-hidden bg-surface-container-lowest flex flex-col justify-between group hover:shadow-md transition-shadow p-6 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
            <div className="flex items-start justify-between gap-4">
              <div className="flex flex-col gap-1">
                <span className="font-label-uppercase text-label-uppercase text-on-surface-variant uppercase tracking-wider">
                  Turbidity &amp; Clarity
                </span>
                <span className="font-body-sm text-body-sm text-on-surface-variant">
                  Laser Nephelometer 860nm
                </span>
              </div>
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-secondary-container/20 text-on-secondary-container font-label-button text-label-button">
                Crystal Clear
              </span>
            </div>
            <div className="my-5 flex items-baseline gap-2">
              <span className="font-display-lg text-display-lg text-on-surface tracking-tight">
                0.18
              </span>
              <span className="font-headline-sm text-headline-sm text-on-surface-variant font-normal">
                NTU
              </span>
            </div>
            <div className="pt-3 flex flex-col gap-2">
              <div className="flex items-center justify-between font-body-sm text-body-sm text-on-surface-variant">
                <span>
                  WHO Safety Limit &lt; 1.0 NTU
                </span>
                <span className="font-mono text-secondary text-[11px]">
                  82% Under limit
                </span>
              </div>
              <div className="w-full bg-surface-container-low h-1.5 rounded-full overflow-hidden">
                <div className="bg-secondary h-full rounded-full" style={{ width: "18%" }}></div>
              </div>
            </div>
          </div>
        </section>
        <section className="bg-surface-container-lowest bg-surface-container-lowest space-y-6 p-8 rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-label-uppercase text-label-uppercase text-on-surface-variant uppercase tracking-wider">
                  Hydraulic Defense Array
                </span>
                <span className="px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant font-mono text-[11px]">
                  4-Stage In-Line Sequence
                </span>
              </div>
              <h2 className="font-headline-lg text-headline-lg text-on-surface mt-1">
                Filtration &amp; Disinfection Lifecycle
              </h2>
            </div>
            <div className="flex items-center gap-4 text-on-surface-variant font-body-sm text-body-sm">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-secondary"></span>
                <span>
                  Optimal Performance
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-tertiary-fixed-dim"></span>
                <span>
                  Photolytic Core
                </span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 relative">
            <div className="bg-surface-container-low rounded-3xl p-5 flex flex-col justify-between space-y-5 relative group hover:bg-surface-container transition-colors">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-label-uppercase text-label-uppercase text-on-surface-variant">
                    Stage 01
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-secondary-container/40 text-on-secondary-container font-label-button text-[11px]">
                    Healthy
                  </span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface">
                  Sediment &amp; Silt
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  5 Micron Polypropylene depth matrix
                </p>
              </div>
              <div className="space-y-3">
                <div className="flex items-baseline justify-between">
                  <span className="font-body-sm text-body-sm text-on-surface-variant">
                    Cartridge Life
                  </span>
                  <span className="font-label-metric-mobile text-label-metric-mobile text-on-surface font-semibold">
                    78%
                  </span>
                </div>
                <div className="w-full bg-surface-variant h-2 rounded-full overflow-hidden">
                  <div className="bg-primary h-full rounded-full" style={{ width: "78%" }}></div>
                </div>
                <div className="flex items-center justify-between text-[11px] font-mono text-on-surface-variant">
                  <span>
                    Est. 142 Days left
                  </span>
                  <span>
                    ΔP: 0.12 bar
                  </span>
                </div>
              </div>
              <div className="pt-3 bg-surface-container-lowest/60 p-3 rounded-3xl flex items-center justify-between font-mono text-[11px]">
                <span className="text-on-surface-variant">
                  SKU: AP-SED-05
                </span>
                <span className="text-secondary font-medium">
                  Flow: 14.2 LPM
                </span>
              </div>
            </div>
            <div className="bg-surface-container-low rounded-3xl p-5 flex flex-col justify-between space-y-5 relative group hover:bg-surface-container transition-colors">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-label-uppercase text-label-uppercase text-on-surface-variant">
                    Stage 02
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-secondary-container/40 text-on-secondary-container font-label-button text-[11px]">
                    Optimal
                  </span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface">
                  Activated Carbon
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Coconut Shell extruded porous block
                </p>
              </div>
              <div className="space-y-3">
                <div className="flex items-baseline justify-between">
                  <span className="font-body-sm text-body-sm text-on-surface-variant">
                    Cartridge Life
                  </span>
                  <span className="font-label-metric-mobile text-label-metric-mobile text-on-surface font-semibold">
                    64%
                  </span>
                </div>
                <div className="w-full bg-surface-variant h-2 rounded-full overflow-hidden">
                  <div className="bg-primary h-full rounded-full" style={{ width: "64%" }}></div>
                </div>
                <div className="flex items-center justify-between text-[11px] font-mono text-on-surface-variant">
                  <span>
                    Est. 98 Days left
                  </span>
                  <span>
                    Cl₂ Absorp: 99.4%
                  </span>
                </div>
              </div>
              <div className="pt-3 bg-surface-container-lowest/60 p-3 rounded-3xl flex items-center justify-between font-mono text-[11px]">
                <span className="text-on-surface-variant">
                  SKU: AP-CARB-10
                </span>
                <span className="text-secondary font-medium">
                  VOC &lt; 0.01 ppb
                </span>
              </div>
            </div>
            <div className="bg-surface-container-low rounded-3xl p-5 flex flex-col justify-between space-y-5 relative group hover:bg-surface-container transition-colors">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-label-uppercase text-label-uppercase text-on-surface-variant">
                    Stage 03
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-secondary-container/40 text-on-secondary-container font-label-button text-[11px]">
                    Prime Spec
                  </span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface">
                  Hyper-Osmosis
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Polyamide thin-film composite sheet
                </p>
              </div>
              <div className="space-y-3">
                <div className="flex items-baseline justify-between">
                  <span className="font-body-sm text-body-sm text-on-surface-variant">
                    Membrane Integrity
                  </span>
                  <span className="font-label-metric-mobile text-label-metric-mobile text-on-surface font-semibold">
                    89%
                  </span>
                </div>
                <div className="w-full bg-surface-variant h-2 rounded-full overflow-hidden">
                  <div className="bg-primary h-full rounded-full" style={{ width: "89%" }}></div>
                </div>
                <div className="flex items-center justify-between text-[11px] font-mono text-on-surface-variant">
                  <span>
                    Est. 410 Days left
                  </span>
                  <span>
                    Rejection: 97.8%
                  </span>
                </div>
              </div>
              <div className="pt-3 bg-surface-container-lowest/60 p-3 rounded-3xl flex items-center justify-between font-mono text-[11px]">
                <span className="text-on-surface-variant">
                  SKU: AP-ROM-75G
                </span>
                <span className="text-secondary font-medium">
                  Flux: 1.2 L/min
                </span>
              </div>
            </div>
            <div className="bg-surface-container-low rounded-3xl p-5 flex flex-col justify-between space-y-5 relative group hover:bg-surface-container transition-colors">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-label-uppercase text-label-uppercase text-on-surface-variant">
                    Stage 04
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-button text-[11px] flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping"></span>
                    {' '}Active 265nm
                  </span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface">
                  UV-C Bio-Chamber
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Quantum-dot solid state germicidal array
                </p>
              </div>
              <div className="space-y-3">
                <div className="flex items-baseline justify-between">
                  <span className="font-body-sm text-body-sm text-on-surface-variant">
                    Dosage Delivery
                  </span>
                  <span className="font-label-metric-mobile text-label-metric-mobile text-on-surface font-semibold">
                    99.999%
                  </span>
                </div>
                <div className="w-full bg-surface-variant h-2 rounded-full overflow-hidden">
                  <div className="bg-primary h-full rounded-full" style={{ width: "99.9%" }}></div>
                </div>
                <div className="flex items-center justify-between text-[11px] font-mono text-on-surface-variant">
                  <span>
                    9,200 hrs lamp life
                  </span>
                  <span>
                    Chamber: 22.1°C
                  </span>
                </div>
              </div>
              <div className="pt-3 bg-surface-container-lowest/60 p-3 rounded-3xl flex items-center justify-between font-mono text-[11px]">
                <span className="text-on-surface-variant">
                  EMITTER: UVC-NICHIA
                </span>
                <span className="text-secondary font-medium">
                  Sterile Core
                </span>
              </div>
            </div>
          </div>
        </section>
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="bg-surface-container-lowest lg:col-span-7 bg-surface-container-lowest space-y-6 flex flex-col justify-between p-8 rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4">
                <div>
                  <span className="font-label-uppercase text-label-uppercase text-on-surface-variant uppercase tracking-wider">
                    Multi-Channel Spectrometry
                  </span>
                  <h3 className="font-headline-md text-headline-md text-on-surface">
                    Biochemical &amp; Mineral Ion Matrix
                  </h3>
                </div>
                <span className="font-mono text-body-sm text-on-surface-variant bg-surface-container px-3 py-1 rounded-full w-fit">
                  Sampling: 200 ms interval
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-3xl bg-surface-container-low flex flex-col justify-between space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-body-md text-body-md text-on-surface-variant">
                      Dissolved Oxygen (DO)
                    </span>
                    <span className="material-symbols-outlined text-[18px] text-on-surface-variant">
                      air
                    </span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-label-metric text-label-metric text-on-surface font-semibold">
                      8.4
                    </span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant font-mono">
                      mg/L
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] font-mono text-on-surface-variant">
                    <span className="text-secondary">
                      High aeration (Fresh spring profile)
                    </span>
                    <span>
                      Nominal &gt; 6.5
                    </span>
                  </div>
                </div>
                <div className="p-4 rounded-3xl bg-surface-container-low flex flex-col justify-between space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-body-md text-body-md text-on-surface-variant">
                      Total Hardness (CaCO₃)
                    </span>
                    <span className="material-symbols-outlined text-[18px] text-on-surface-variant">
                      grain
                    </span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-label-metric text-label-metric text-on-surface font-semibold">
                      35
                    </span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant font-mono">
                      mg/L
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] font-mono text-on-surface-variant">
                    <span className="text-secondary">
                      Silky Soft (Appliance safe)
                    </span>
                    <span>
                      Ideal 30-50
                    </span>
                  </div>
                </div>
                <div className="p-4 rounded-3xl bg-surface-container-low flex flex-col justify-between space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-body-md text-body-md text-on-surface-variant">
                      Residual Free Chlorine
                    </span>
                    <span className="material-symbols-outlined text-[18px] text-on-surface-variant">
                      science
                    </span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-label-metric text-label-metric text-on-surface font-semibold">
                      &lt; 0.02
                    </span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant font-mono">
                      mg/L
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] font-mono text-on-surface-variant">
                    <span className="text-secondary">
                      Non-detectable at tap
                    </span>
                    <span>
                      EPA Limit 4.0
                    </span>
                  </div>
                </div>
                <div className="p-4 rounded-3xl bg-surface-container-low flex flex-col justify-between space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-body-md text-body-md text-on-surface-variant">
                      Electrical Conductivity
                    </span>
                    <span className="material-symbols-outlined text-[18px] text-on-surface-variant">
                      bolt
                    </span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-label-metric text-label-metric text-on-surface font-semibold">
                      68
                    </span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant font-mono">
                      µS/cm
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] font-mono text-on-surface-variant">
                    <span className="text-secondary">
                      Optimal mineral balance
                    </span>
                    <span>
                      Baseline 420
                    </span>
                  </div>
                </div>
                <div className="p-4 rounded-3xl bg-surface-container-low flex flex-col justify-between space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-body-md text-body-md text-on-surface-variant">
                      Heavy Metals (Pb/Cu/As)
                    </span>
                    <span className="material-symbols-outlined text-[18px] text-on-surface-variant">
                      shield_with_heart
                    </span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-label-metric text-label-metric text-on-surface font-semibold">
                      0.000
                    </span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant font-mono">
                      mg/L
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] font-mono text-on-surface-variant">
                    <span className="text-secondary">
                      Inductively Coupled Plasma 0 ppb
                    </span>
                    <span>
                      Safe 100%
                    </span>
                  </div>
                </div>
                <div className="p-4 rounded-3xl bg-surface-container-low flex flex-col justify-between space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-body-md text-body-md text-on-surface-variant">
                      Microbial &amp; Coliform
                    </span>
                    <span className="material-symbols-outlined text-[18px] text-on-surface-variant">
                      biotech
                    </span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-label-metric text-label-metric text-on-surface font-semibold">
                      0
                    </span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant font-mono">
                      CFU/100ml
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] font-mono text-on-surface-variant">
                    <span className="text-secondary">
                      Completely Sterile Pipeline
                    </span>
                    <span>
                      Standard 0
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4 rounded-3xl bg-surface-container flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-body-sm text-body-sm mt-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-surface-container-lowest flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[18px] text-secondary">
                    update
                  </span>
                </div>
                <div>
                  <div className="text-on-surface font-medium">
                    Automatic Micro-Calibration Routine
                  </div>
                  <div className="text-on-surface-variant text-[12px]">
                    Last optical laser zeroing executed today at 04:00 AM (Variance 0.01%)
                  </div>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full bg-surface-container-lowest text-on-surface font-mono text-[11px] font-semibold shrink-0">
                Node Verified
              </span>
            </div>
          </div>
          <div className="lg:col-span-5 space-y-5 flex flex-col">
            <div className="bg-surface-container-lowest bg-surface-container-lowest space-y-4 p-6 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary text-[20px]">
                      waves
                    </span>
                  </div>
                  <div>
                    <h4 className="font-headline-sm text-headline-sm text-on-surface">
                      Intelligent Flusher
                    </h4>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      Anti-stagnation automated cycle
                    </p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-secondary-container/30 text-on-secondary-container font-label-button text-[11px]">
                  Armed &amp; Active
                </span>
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Monitors hydrostatic dwell time across low-use branch manifolds. If stagnant water exceeds 48 hours, high-velocity pulsed backwash evacuates the run.
              </p>
              <div className="p-3 bg-surface-container-low rounded-3xl flex items-center justify-between font-mono text-body-sm text-on-surface">
                <span className="text-on-surface-variant">
                  Next Scheduled Sweep:
                </span>
                <span className="font-semibold text-primary">
                  In 14 hrs (Guest Wing East)
                </span>
              </div>
            </div>
            <div className="bg-surface-container-lowest bg-surface-container-lowest space-y-4 p-6 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary text-[20px]">
                      shopping_cart_checkout
                    </span>
                  </div>
                  <div>
                    <h4 className="font-headline-sm text-headline-sm text-on-surface">
                      Replacement Concierge
                    </h4>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      Predictive OEM procurement
                    </p>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant font-mono text-[11px]">
                  Auto-Order 15%
                </span>
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Telemetry directly schedules genuine medical-grade replacement cartridges with factory serial authentication before any flow decay occurs.
              </p>
              <div className="flex items-center justify-between pt-1">
                <div className="flex flex-col font-mono text-[11px]">
                  <span className="text-on-surface-variant">
                    Upcoming: AP-CARB-10
                  </span>
                  <span className="text-on-surface font-medium">
                    Estimated order: ~60 days
                  </span>
                </div>
                <button className="px-3.5 py-1.5 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface font-label-button text-[12px] transition-colors">
                  Configure Replenish
                </button>
              </div>
            </div>
            <div className="bg-primary text-on-primary rounded-2xl p-6 shadow-sm space-y-4 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-on-primary-container">
                  <span className="font-label-uppercase text-label-uppercase text-inverse-primary uppercase tracking-wider">
                    Estate Fixture Protection
                  </span>
                  <span className="material-symbols-outlined text-[20px] text-inverse-primary">
                    water_ph
                  </span>
                </div>
                <h4 className="font-headline-sm text-headline-sm text-on-primary">
                  Mineral Balance &amp; Fixture Longevity
                </h4>
                <p className="font-body-sm text-body-sm text-inverse-primary leading-relaxed">
                  Current balanced mineralization profile safeguards unlacquered brass Dornbracht fixtures, protects high-heat steam shower heating elements from calcification, and produces pristine 1.2% TDS extraction for La Marzocco espresso brewing.
                </p>
              </div>
              <div className="pt-4 flex items-center justify-between font-mono text-body-sm">
                <div className="flex flex-col">
                  <span className="text-inverse-primary text-[11px]">
                    Langelier Saturation (LSI)
                  </span>
                  <span className="text-on-primary font-medium">
                    +0.04 (Corrosion &amp; Scale Neutral)
                  </span>
                </div>
                <div className="w-8 h-8 rounded-full bg-surface-container-highest/20 flex items-center justify-center">
                  <span className="material-symbols-outlined text-on-primary text-[18px]">
                    verified_user
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
    </>
  );
}
