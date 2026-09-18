export default function DashboardScreen() {
  return (
    <>
    <main className="w-full pt-8 pb-12">
      <div className="flex flex-col w-full space-y-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div>
            <h1 className="font-headline-xl text-headline-xl text-on-surface tracking-tight">
              Dashboard
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant mt-1">
              Real-time hydraulic telemetry &amp; consumption breakdown
            </p>
          </div>
          <div className="flex items-center gap-2.5 flex-wrap">
            <div className="inline-flex p-1 rounded-full bg-zinc-200/60 backdrop-blur-md border border-zinc-200/70 text-xs font-medium text-ink-600 shadow-inner">
              <button className="px-3 py-1 rounded-full bg-white text-ink-950 shadow-xs font-semibold">
                Today
              </button>
              <button className="px-3 py-1 rounded-full hover:text-ink-900 transition-colors">
                7D
              </button>
              <button className="px-3 py-1 rounded-full hover:text-ink-900 transition-colors">
                30D
              </button>
            </div>
            <button className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-zinc-200/80 bg-white/80 hover:bg-white text-xs font-medium text-ink-800 shadow-2xs transition-all duration-150" type="button">
              <span className="material-symbols-outlined text-[18px] text-ink-500">
                refresh
              </span>
              <span>
                Refresh
              </span>
            </button>
          </div>
        </div>
        <div className="bg-surface-container-lowest flex flex-wrap items-center justify-between gap-4 relative overflow-hidden p-6 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.04)]" data-purpose="status-banner">
          <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-zinc-200/20 rounded-full blur-2xl pointer-events-none"></div>
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-zinc-100 to-white flex items-center justify-center border border-zinc-200/70 shadow-xs shrink-0">
              <span className="material-symbols-outlined text-[18px] text-ink-500">
                check
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h2 className="text-sm font-semibold text-ink-950">
                  All sections operating normally
                </h2>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] uppercase font-semibold bg-zinc-900 text-white tracking-wider shadow-xs">
                  System nominal
                </span>
              </div>
              <p className="text-xs text-ink-500 mt-0.5">
                Sensors calibrated • Flow velocity nominal across 4 manifold zones
              </p>
            </div>
          </div>
          <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-medium tracking-wide transition-all shadow-md shadow-zinc-900/15 active:scale-[0.98]" type="button">
            <span className="material-symbols-outlined text-[18px]">
              play_arrow
            </span>
            <span>
              Run incident demo
            </span>
          </button>
        </div>
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" data-purpose="kpi-metrics-grid">
          <div className="bg-surface-container-lowest flex flex-col justify-between hover:shadow-md transition-all duration-300 p-6 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
            <div className="flex items-center justify-between text-xs text-ink-500 font-medium">
              <span className="tracking-tight font-medium">
                Kitchen flow
              </span>
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-zinc-100 text-ink-700 border border-zinc-200/50">
                Live
              </span>
            </div>
            <div className="mt-4">
              <div className="flex items-baseline gap-1.5">
                <span className="text-3xl font-bold tracking-tight text-ink-950">
                  4.6
                </span>
                <span className="text-xs font-medium text-ink-500">
                  L/min
                </span>
              </div>
              <div className="flex items-center gap-1.5 mt-2 text-xs text-ink-600">
                <span className="material-symbols-outlined text-[18px] text-ink-500">
                  ssid_chart
                </span>
                <span>
                  Within expected range
                </span>
              </div>
            </div>
            <div className="w-full bg-zinc-100/90 h-1.5 rounded-full mt-4 overflow-hidden p-0.5 border border-zinc-200/40">
              <div className="bg-zinc-950 h-full rounded-full w-[46%]" style={{ width: "46%" }}></div>
            </div>
          </div>
          <div className="bg-surface-container-lowest flex flex-col justify-between hover:shadow-md transition-all duration-300 p-6 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
            <div className="flex items-center justify-between text-xs text-ink-500 font-medium">
              <span className="tracking-tight font-medium">
                Today's usage
              </span>
              <span className="text-[11px] text-ink-400">
                Target &lt; 600L
              </span>
            </div>
            <div className="mt-4">
              <div className="flex items-baseline gap-1.5">
                <span className="text-3xl font-bold tracking-tight text-ink-950">
                  286
                </span>
                <span className="text-xs font-medium text-ink-500">
                  L
                </span>
              </div>
              <div className="flex items-center justify-between mt-2 text-xs text-ink-600">
                <span>
                  Daily budget 600 L
                </span>
                <span className="text-[11px] font-semibold text-ink-900">
                  47.6%
                </span>
              </div>
            </div>
            <div className="w-full bg-zinc-100/90 h-1.5 rounded-full mt-4 overflow-hidden p-0.5 border border-zinc-200/40">
              <div className="bg-zinc-950 h-full rounded-full" style={{ width: "47.6%" }}></div>
            </div>
          </div>
          <div className="bg-surface-container-lowest flex flex-col justify-between hover:shadow-md transition-all duration-300 p-6 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
            <div className="flex items-center justify-between text-xs text-ink-500 font-medium">
              <span className="tracking-tight font-medium">
                Water quality
              </span>
              <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-emerald-700 bg-emerald-50/80 border border-emerald-200/70 px-2 py-0.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                {' '}Grade A
              </span>
            </div>
            <div className="mt-4">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold tracking-tight text-ink-950">
                  Good
                </span>
              </div>
              <div className="flex items-center gap-1.5 mt-2 text-xs text-ink-500 truncate">
                <span className="text-ink-700">
                  pH 7.4
                </span>
                <span>
                  •
                </span>
                <span className="text-ink-700">
                  142 TDS
                </span>
                <span>
                  •
                </span>
                <span className="text-ink-700">
                  22.4°C
                </span>
              </div>
            </div>
            <div className="w-full bg-zinc-100/90 h-1.5 rounded-full mt-4 overflow-hidden p-0.5 border border-zinc-200/40">
              <div className="bg-zinc-950 h-full rounded-full" style={{ width: "92%" }}></div>
            </div>
          </div>
          <div className="bg-surface-container-lowest flex flex-col justify-between hover:shadow-md transition-all duration-300 p-6 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
            <div className="flex items-center justify-between text-xs text-ink-500 font-medium">
              <span className="tracking-tight font-medium">
                Active alerts
              </span>
              <span className="text-[11px] text-ink-400">
                Autonomous
              </span>
            </div>
            <div className="mt-4">
              <div className="flex items-baseline gap-1.5">
                <span className="text-3xl font-bold tracking-tight text-ink-950">
                  0
                </span>
                <span className="text-xs text-ink-400">
                  incidents
                </span>
              </div>
              <div className="flex items-center gap-1.5 mt-2 text-xs text-ink-600">
                <span className="material-symbols-outlined text-[18px] text-ink-500">
                  shield
                </span>
                <span>
                  None open • All valves closed
                </span>
              </div>
            </div>
            <div className="w-full bg-zinc-100/90 h-1.5 rounded-full mt-4 overflow-hidden p-0.5 border border-zinc-200/40">
              <div className="bg-emerald-500 h-full rounded-full" style={{ width: "100%" }}></div>
            </div>
          </div>
        </section>
        <section className="bg-surface-container-lowest p-8 rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.04)]" data-purpose="tank-and-quality-gauges">
          <div className="flex flex-wrap items-center justify-between border-b border-zinc-100/80 pb-5 mb-8 gap-2">
            <div>
              <h2 className="text-xs font-bold uppercase tracking-widest text-ink-950">
                Fluid Storage &amp; Purity Architecture
              </h2>
              <p className="text-xs text-ink-500 mt-0.5">
                Dual-reservoir optical depth sensors with ultrasound validation
              </p>
            </div>
            <div className="flex items-center gap-4 text-xs text-ink-500">
              <span className="inline-flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-zinc-950 shadow-xs"></span>
                {' '}High density fill
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-zinc-200 border border-zinc-300"></span>
                {' '}Headspace
              </span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-2">
            <div className="flex flex-col items-center text-center">
              <div className="relative w-32 h-64 liquid-cylinder rounded-[32px] p-2 flex flex-col justify-end overflow-hidden border border-white/90">
                <div className="absolute inset-y-4 right-3 flex flex-col justify-between pointer-events-none text-[11px] text-ink-400 select-none text-right z-10">
                  <span className="opacity-80">
                    100%
                  </span>
                  <span className="opacity-60">
                    75%
                  </span>
                  <span className="opacity-60">
                    50%
                  </span>
                  <span className="opacity-60">
                    25%
                  </span>
                  <span className="opacity-80">
                    0%
                  </span>
                </div>
                <div className="absolute inset-x-3 inset-y-4 border-r border-dashed border-zinc-300/60 pointer-events-none"></div>
                <div className="w-full liquid-fill-primary rounded-[24px] relative transition-all duration-700 ease-out" style={{ height: "82%" }}>
                  <div className="absolute -top-1.5 inset-x-2 h-3 bg-white/20 rounded-full blur-[2px]"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white text-xs font-bold tracking-tight">
                      82%
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-6 space-y-1.5">
                <div className="text-sm font-semibold text-ink-950">
                  Overhead tank
                </div>
                <div className="text-xs text-ink-600">
                  1,640 L{' '}
                  <span className="text-ink-400">
                    / 2,000 L
                  </span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-100/90 text-[11px] text-ink-700 border border-zinc-200/50 mt-1">
                  Pressure: 2.1 bar
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="relative w-32 h-64 liquid-cylinder rounded-[32px] p-2 flex flex-col justify-end overflow-hidden border border-white/90">
                <div className="absolute inset-y-4 right-3 flex flex-col justify-between pointer-events-none text-[11px] text-ink-400 select-none text-right z-10">
                  <span className="opacity-80">
                    100%
                  </span>
                  <span className="opacity-60">
                    75%
                  </span>
                  <span className="opacity-60">
                    50%
                  </span>
                  <span className="opacity-60">
                    25%
                  </span>
                  <span className="opacity-80">
                    0%
                  </span>
                </div>
                <div className="absolute inset-x-3 inset-y-4 border-r border-dashed border-zinc-300/60 pointer-events-none"></div>
                <div className="w-full liquid-fill-secondary rounded-[24px] relative transition-all duration-700 ease-out" style={{ height: "68%" }}>
                  <div className="absolute -top-1.5 inset-x-2 h-3 bg-white/20 rounded-full blur-[2px]"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white text-xs font-bold tracking-tight">
                      68%
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-6 space-y-1.5">
                <div className="text-sm font-semibold text-ink-950">
                  Sump
                </div>
                <div className="text-xs text-ink-600">
                  3,400 L{' '}
                  <span className="text-ink-400">
                    / 5,000 L
                  </span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-100/90 text-[11px] text-ink-700 border border-zinc-200/50 mt-1">
                  Submersible: Active
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="relative w-32 h-64 liquid-cylinder rounded-[32px] p-2 flex flex-col justify-end overflow-hidden border border-white/90">
                <div className="absolute inset-y-4 right-3 flex flex-col justify-between pointer-events-none text-[11px] text-ink-400 select-none text-right z-10">
                  <span className="opacity-80">
                    100%
                  </span>
                  <span className="opacity-60">
                    75%
                  </span>
                  <span className="opacity-60">
                    50%
                  </span>
                  <span className="opacity-60">
                    25%
                  </span>
                  <span className="opacity-80">
                    0%
                  </span>
                </div>
                <div className="absolute inset-x-3 inset-y-4 border-r border-dashed border-zinc-300/60 pointer-events-none"></div>
                <div className="w-full liquid-fill-emerald rounded-[24px] relative transition-all duration-700 ease-out" style={{ height: "92%" }}>
                  <div className="absolute -top-1.5 inset-x-2 h-3 bg-emerald-300/30 rounded-full blur-[2px]"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white text-xs font-bold tracking-tight">
                      92%
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-6 space-y-1.5">
                <div className="text-sm font-semibold text-ink-950">
                  Water quality score
                </div>
                <div className="text-xs text-ink-600">
                  92 / 100{' '}
                  <span className="text-ink-400">
                    • Purified
                  </span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-100/90 text-[11px] text-ink-700 border border-zinc-200/50 mt-1">
                  Micro-filtration: OK
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="glass-card rounded-3xl p-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)]" data-purpose="quick-actuators">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-2xl bg-zinc-100 border border-zinc-200/70 flex items-center justify-center text-ink-800">
                <span className="material-symbols-outlined text-[18px]">
                  tune
                </span>
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-ink-950">
                  Actuator Quick Override
                </span>
                <p className="text-[11px] text-ink-500">
                  Manual safety relays • 2 pumps online
                </p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2.5 px-3.5 py-2 rounded-2xl border border-zinc-200/60 bg-white/70 shadow-2xs">
                <span className="text-xs font-medium text-ink-800">
                  Main Feed Pump:
                </span>
                <span className="text-xs text-ink-500">
                  Auto
                </span>
                <button aria-label="Toggle Main Feed Pump" className="w-9 h-5 bg-zinc-950 rounded-full relative p-0.5 transition-colors focus:outline-none" type="button">
                  <div className="w-4 h-4 bg-white rounded-full ml-auto shadow-sm"></div>
                </button>
              </div>
              <div className="flex items-center gap-2.5 px-3.5 py-2 rounded-2xl border border-zinc-200/60 bg-white/70 shadow-2xs">
                <span className="text-xs font-medium text-ink-800">
                  City Water Solenoid:
                </span>
                <span className="text-xs text-emerald-700 font-medium">
                  Open
                </span>
                <button aria-label="Toggle City Water Solenoid" className="w-9 h-5 bg-zinc-950 rounded-full relative p-0.5 transition-colors focus:outline-none" type="button">
                  <div className="w-4 h-4 bg-white rounded-full ml-auto shadow-sm"></div>
                </button>
              </div>
              <button className="px-4 py-2 rounded-2xl border border-red-200 bg-red-50/70 text-red-700 text-xs font-semibold hover:bg-red-100 transition-all duration-150 shadow-2xs" type="button">
                Emergency Shutoff
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
    </>
  );
}
