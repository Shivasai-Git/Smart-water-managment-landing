import { useEffect } from 'react';
import { setupPumpValve } from './behaviors';

export default function PumpValveScreen() {
  useEffect(() => setupPumpValve(), []);
  return (
    <>
    <main className="w-full pt-8 pb-12">
      <div className="flex flex-col w-full space-y-8">
        <div className="flex flex-col space-y-space-lg max-w-7xl mx-auto w-full px-2">
          <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-6 pb-2">
            <div className="flex flex-col space-y-2">
              <div className="inline-flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                <span className="font-label-uppercase text-label-uppercase text-on-surface-variant tracking-widest uppercase">
                  ELECTROMECHANICAL ACTUATORS • SCADA RELAY ARRAY • FR-0814
                </span>
              </div>
              <h1 className="font-headline-xl text-headline-xl text-on-surface tracking-tight">
                Pump &amp; Valve Actuator Command
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant mt-1">
                Direct digital relay actuation, variable frequency drive motor harmonics, and automated motorized ball-valve positioning across high-pressure distribution loops.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-container-lowest shadow-sm">
                <div className="relative flex items-center justify-center">
                  <span className="w-2 h-2 rounded-full bg-secondary"></span>
                  <span className="absolute w-3.5 h-3.5 rounded-full bg-secondary/30 animate-ping"></span>
                </div>
                <span className="font-label-button text-label-button text-on-surface">
                  All Relays Nominal
                </span>
              </div>
              <button className="px-4 py-2 rounded-full bg-surface-container-lowest text-on-surface hover:bg-surface-container-high transition-all duration-200 font-label-button text-label-button shadow-sm flex items-center gap-2 active:scale-[0.98]">
                <span className="material-symbols-outlined text-[18px]">
                  sync_alt
                </span>
                <span>
                  Auto-Cycle Diagnostics
                </span>
              </button>
              <button className="px-4 py-2 rounded-full bg-error text-on-error hover:bg-error/90 transition-all duration-200 font-label-button text-label-button shadow-sm flex items-center gap-2 active:scale-[0.98]" id="btn-interlock">
                <span className="material-symbols-outlined text-[18px]">
                  lock_reset
                </span>
                <span>
                  Emergency Global Interlock
                </span>
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between min-w-0">
            <div className="inline-flex max-w-full overflow-x-auto p-1 rounded-full bg-surface-container-high/60 shadow-inner [&>button]:shrink-0 [&>button]:whitespace-nowrap">
              <button className="px-3 sm:px-5 py-1.5 rounded-full bg-surface-container-lowest text-on-surface font-label-button text-label-button shadow-sm transition-all">
                Direct Command
              </button>
              <button className="px-3 sm:px-5 py-1.5 rounded-full text-on-surface-variant hover:text-on-surface font-label-button text-label-button transition-all">
                Automated Schedules
              </button>
              <button className="px-3 sm:px-5 py-1.5 rounded-full text-on-surface-variant hover:text-on-surface font-label-button text-label-button transition-all">
                Safety Interlocks
              </button>
            </div>
            <div className="hidden sm:flex items-center gap-2 font-body-sm text-body-sm text-on-surface-variant">
              <span className="material-symbols-outlined text-[16px] text-secondary">
                verified_user
              </span>
              <span>
                Hardware interlocks armed: 0.1s response
              </span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-gutter">
            <div className="bg-surface-container-lowest bg-surface-container-lowest flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow p-6 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
              <div className="flex items-center justify-between">
                <span className="font-label-uppercase text-label-uppercase text-on-surface-variant uppercase tracking-wider">
                  Connected Actuators
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-secondary-container/30 text-on-secondary-container font-body-sm text-body-sm font-medium">
                  100% Signal
                </span>
              </div>
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="font-label-metric text-label-metric text-on-surface tracking-tight">
                    14 / 14
                  </span>
                  <span className="font-body-md text-body-md text-on-surface-variant">
                    Online
                  </span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                  6 Motorized Valves • 4 Pumps • 4 Solenoids
                </p>
              </div>
              <div className="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden">
                <div className="bg-secondary h-full rounded-full" style={{ width: "100%" }}></div>
              </div>
            </div>
            <div className="bg-surface-container-lowest bg-surface-container-lowest flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow p-6 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
              <div className="flex items-center justify-between">
                <span className="font-label-uppercase text-label-uppercase text-on-surface-variant uppercase tracking-wider">
                  Actuator Power Draw
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-secondary-container/30 text-on-secondary-container font-body-sm text-body-sm font-medium">
                  Eco Dynamic
                </span>
              </div>
              <div>
                <div className="flex items-baseline gap-1">
                  <span className="font-label-metric text-label-metric text-on-surface tracking-tight">
                    1.84
                  </span>
                  <span className="font-headline-sm text-headline-sm text-on-surface-variant font-normal">
                    kW
                  </span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                  Active duty load • 38% rated capacity
                </p>
              </div>
              <div className="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden">
                <div className="bg-primary h-full rounded-full" style={{ width: "38%" }}></div>
              </div>
            </div>
            <div className="bg-surface-container-lowest bg-surface-container-lowest flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow p-6 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
              <div className="flex items-center justify-between">
                <span className="font-label-uppercase text-label-uppercase text-on-surface-variant uppercase tracking-wider">
                  Mean Bus Voltage
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-surface-container-high text-on-surface font-body-sm text-body-sm font-medium">
                  Clean Power
                </span>
              </div>
              <div>
                <div className="flex items-baseline gap-1">
                  <span className="font-label-metric text-label-metric text-on-surface tracking-tight">
                    230.4
                  </span>
                  <span className="font-body-md text-body-md text-on-surface-variant">
                    V • 50.1 Hz
                  </span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                  Total Harmonic Distortion &lt; 1.2%
                </p>
              </div>
              <div className="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden">
                <div className="bg-secondary h-full rounded-full" style={{ width: "95%" }}></div>
              </div>
            </div>
            <div className="bg-surface-container-lowest bg-surface-container-lowest flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow p-6 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
              <div className="flex items-center justify-between">
                <span className="font-label-uppercase text-label-uppercase text-on-surface-variant uppercase tracking-wider">
                  Relay Longevity
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-secondary-container/30 text-on-secondary-container font-body-sm text-body-sm font-medium">
                  Prime Health
                </span>
              </div>
              <div>
                <div className="flex items-baseline gap-1">
                  <span className="font-label-metric text-label-metric text-on-surface tracking-tight">
                    98.2
                  </span>
                  <span className="font-headline-sm text-headline-sm text-on-surface-variant font-normal">
                    %
                  </span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                  14,200 / 100k rated cycles elapsed
                </p>
              </div>
              <div className="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden">
                <div className="bg-secondary h-full rounded-full" style={{ width: "86%" }}></div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
            <div className="lg:col-span-8 flex flex-col space-y-space-lg">
              <div className="flex flex-col space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-primary"></span>
                    <h2 className="font-headline-md text-headline-md text-on-surface tracking-tight">
                      High-Pressure &amp; Transfer Pumping Units
                    </h2>
                  </div>
                  <span className="font-label-uppercase text-label-uppercase text-on-surface-variant">
                    3 UNIT VFD ARRAYS
                  </span>
                </div>
                <div className="bg-surface-container-lowest bg-surface-container-lowest flex flex-col space-y-5 relative overflow-hidden p-6 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-3xl bg-surface-container flex items-center justify-center text-on-surface shrink-0">
                        <span className="material-symbols-outlined text-[24px]">
                          water
                        </span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-headline-sm text-headline-sm text-on-surface">
                            Submersible Deep-Well Pump
                          </h3>
                          <span className="px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant font-mono font-body-sm text-body-sm">
                            PMP-01
                          </span>
                        </div>
                        <p className="font-body-md text-body-md text-on-surface-variant">
                          Borehole Sump Vector • Grundfos SQE Inverter
                        </p>
                      </div>
                    </div>
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary-container/20 text-on-secondary-container font-body-sm text-body-sm font-medium self-start sm:self-center">
                      <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
                      <span>
                        Active • Pumping
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 bg-surface-container-low rounded-3xl">
                    <div>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">
                        Motor Spec
                      </span>
                      <p className="font-body-md text-body-md text-on-surface font-semibold">
                        1.5 kW VFD
                      </p>
                    </div>
                    <div>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">
                        Shaft Velocity
                      </span>
                      <p className="font-body-md text-body-md text-on-surface font-semibold">
                        2,850 RPM
                      </p>
                    </div>
                    <div>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">
                        Current Flow
                      </span>
                      <p className="font-body-md text-body-md text-on-surface font-semibold">
                        18.5 L/min
                      </p>
                    </div>
                    <div>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">
                        Head Pressure
                      </span>
                      <p className="font-body-md text-body-md text-on-surface font-semibold">
                        3.8 bar
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-1">
                    <div className="flex-1 flex flex-col space-y-2">
                      <div className="flex items-center justify-between font-body-sm text-body-sm">
                        <span className="text-on-surface-variant">
                          VFD Target Velocity
                        </span>
                        <span className="font-semibold text-on-surface" id="speed-val">
                          75%
                        </span>
                      </div>
                      <input className="w-full accent-primary bg-surface-container-high h-2 rounded-full cursor-pointer" id="vfd-slider" max="100" min="0" type="range" defaultValue="75" />
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="inline-flex p-1 rounded-full bg-surface-container">
                        <button className="px-3 py-1 rounded-full bg-surface-container-lowest text-on-surface font-label-button text-label-button shadow-sm">
                          Auto (Refill)
                        </button>
                        <button className="px-3 py-1 rounded-full text-on-surface-variant font-label-button text-label-button">
                          Manual
                        </button>
                      </div>
                      <button className="px-4 py-2 rounded-full bg-primary text-on-primary font-label-button text-label-button flex items-center gap-1.5 hover:bg-primary-container active:scale-[0.98] transition-all" id="btn-toggle-pmp1">
                        <span className="material-symbols-outlined text-[16px]">
                          pause
                        </span>
                        <span>
                          Soft Stop
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="bg-surface-container-lowest bg-surface-container-lowest flex flex-col space-y-5 relative overflow-hidden p-6 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-3xl bg-surface-container flex items-center justify-center text-on-surface shrink-0">
                        <span className="material-symbols-outlined text-[24px]">
                          compress
                        </span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-headline-sm text-headline-sm text-on-surface">
                            Overhead Distribution Booster Pump
                          </h3>
                          <span className="px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant font-mono font-body-sm text-body-sm">
                            PMP-02
                          </span>
                        </div>
                        <p className="font-body-md text-body-md text-on-surface-variant">
                          Main Residence Pressure Loop • 0.75 kW Constant-Pressure Inverter
                        </p>
                      </div>
                    </div>
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-container text-on-surface font-body-sm text-body-sm font-medium self-start sm:self-center">
                      <span className="w-2 h-2 rounded-full bg-on-surface-variant"></span>
                      <span>
                        Standby • On-Demand
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 bg-surface-container-low rounded-3xl">
                    <div>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">
                        Inverter Target
                      </span>
                      <p className="font-body-md text-body-md text-on-surface font-semibold">
                        2.4 bar (P-Reg)
                      </p>
                    </div>
                    <div>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">
                        Static Pressure
                      </span>
                      <p className="font-body-md text-body-md text-on-surface font-semibold">
                        2.38 bar
                      </p>
                    </div>
                    <div>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">
                        Standby Current
                      </span>
                      <p className="font-body-md text-body-md text-on-surface font-semibold">
                        0.02 A
                      </p>
                    </div>
                    <div>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">
                        Reaction Latency
                      </span>
                      <p className="font-body-md text-body-md text-on-surface font-semibold">
                        120 ms
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
                    <div className="flex items-center gap-3">
                      <span className="font-body-sm text-body-sm text-on-surface-variant">
                        Line Pressure Setpoint:
                      </span>
                      <div className="inline-flex items-center bg-surface-container rounded-full p-0.5">
                        <button className="w-7 h-7 rounded-full bg-surface-container-lowest text-on-surface flex items-center justify-center hover:bg-surface-container-high transition-colors text-sm font-bold shadow-sm">
                          -
                        </button>
                        <span className="px-3 font-body-md text-body-md font-semibold text-on-surface">
                          2.4 bar
                        </span>
                        <button className="w-7 h-7 rounded-full bg-surface-container-lowest text-on-surface flex items-center justify-center hover:bg-surface-container-high transition-colors text-sm font-bold shadow-sm">
                          +
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="inline-flex p-1 rounded-full bg-surface-container">
                        <button className="px-3 py-1 rounded-full bg-surface-container-lowest text-on-surface font-label-button text-label-button shadow-sm">
                          Auto
                        </button>
                        <button className="px-3 py-1 rounded-full text-on-surface-variant font-label-button text-label-button">
                          Off
                        </button>
                      </div>
                      <button className="px-4 py-2 rounded-full bg-surface-container text-on-surface hover:bg-surface-container-high font-label-button text-label-button transition-colors active:scale-[0.98]">
                        Run Test Cycle
                      </button>
                    </div>
                  </div>
                </div>
                <div className="bg-surface-container-lowest bg-surface-container-lowest flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-3xl bg-surface-container flex items-center justify-center text-on-surface shrink-0">
                      <span className="material-symbols-outlined text-[20px]">
                        heat_pump
                      </span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-headline-sm text-headline-sm text-on-surface">
                          Hot Water Recirculation Loop Pump
                        </h4>
                        <span className="px-2 py-0.5 rounded-full bg-secondary-container/20 text-on-secondary-container font-body-sm text-body-sm font-medium">
                          Active • Low Pulse
                        </span>
                      </div>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">
                        45W Ultra-Quiet Brushless DC • Master Suite instant-hot micro-circuit (Flow: 1.2 L/min)
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <span className="font-label-uppercase text-label-uppercase text-on-surface-variant font-mono">
                      DUTY: 20 MIN/H
                    </span>
                    <div className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface">
                      <span className="material-symbols-outlined text-[16px]">
                        tune
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col space-y-4 pt-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-primary"></span>
                    <h2 className="font-headline-md text-headline-md text-on-surface tracking-tight">
                      Motorized Isolation &amp; Zone Control Valves
                    </h2>
                  </div>
                  <span className="font-label-uppercase text-label-uppercase text-on-surface-variant">
                    IP68 ROTARY ACTUATORS
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
                  <div className="bg-surface-container-lowest bg-surface-container-lowest flex flex-col justify-between space-y-4 p-6 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="font-label-uppercase text-label-uppercase text-on-surface-variant font-mono">
                          VALVE-01 • PRIMARY INLET
                        </span>
                        <h4 className="font-headline-sm text-headline-sm text-on-surface mt-0.5">
                          Master Municipal Inflow
                        </h4>
                        <p className="font-body-sm text-body-sm text-on-surface-variant">
                          1.5-inch Stainless Steel Motorized Ball Valve
                        </p>
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full bg-secondary-container/30 text-on-secondary-container font-body-sm text-body-sm font-medium">
                        100% OPEN
                      </span>
                    </div>
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[18px] text-secondary">
                          check_circle
                        </span>
                        <span className="font-body-sm text-body-sm text-on-surface-variant">
                          Line Pressure: 4.1 bar
                        </span>
                      </div>
                      <button className="px-4 py-1.5 rounded-full bg-surface-container text-on-surface hover:bg-surface-container-high font-label-button text-label-button transition-colors active:scale-[0.98]">
                        Close Valve
                      </button>
                    </div>
                  </div>
                  <div className="bg-surface-container-lowest bg-surface-container-lowest flex flex-col justify-between space-y-4 p-6 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="font-label-uppercase text-label-uppercase text-on-surface-variant font-mono">
                          VALVE-02 • GRAVITY MANIFOLD
                        </span>
                        <h4 className="font-headline-sm text-headline-sm text-on-surface mt-0.5">
                          Overhead Tank Gravity Supply
                        </h4>
                        <p className="font-body-sm text-body-sm text-on-surface-variant">
                          Proportional positioner • Flow: 4.6 L/min
                        </p>
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full bg-secondary-container/30 text-on-secondary-container font-body-sm text-body-sm font-medium">
                        100% OPEN
                      </span>
                    </div>
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[18px] text-secondary">
                          check_circle
                        </span>
                        <span className="font-body-sm text-body-sm text-on-surface-variant">
                          Direct feed active
                        </span>
                      </div>
                      <button className="px-4 py-1.5 rounded-full bg-surface-container text-on-surface hover:bg-surface-container-high font-label-button text-label-button transition-colors active:scale-[0.98]">
                        Close Valve
                      </button>
                    </div>
                  </div>
                  <div className="bg-surface-container-lowest bg-surface-container-lowest flex flex-col justify-between space-y-4 p-6 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="font-label-uppercase text-label-uppercase text-on-surface-variant font-mono">
                          VALVE-03 • DIVERTER
                        </span>
                        <h4 className="font-headline-sm text-headline-sm text-on-surface mt-0.5">
                          Cistern Inflow Diverter Solenoid
                        </h4>
                        <p className="font-body-sm text-body-sm text-on-surface-variant">
                          Automated Tank Overflow Safeguard
                        </p>
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full bg-surface-container text-on-surface-variant font-body-sm text-body-sm font-medium">
                        CLOSED (82%)
                      </span>
                    </div>
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[18px] text-on-surface-variant">
                          shield
                        </span>
                        <span className="font-body-sm text-body-sm text-on-surface-variant">
                          Auto-interlocked
                        </span>
                      </div>
                      <button className="px-4 py-1.5 rounded-full bg-primary text-on-primary hover:bg-primary-container font-label-button text-label-button transition-colors active:scale-[0.98]">
                        Open Diverter
                      </button>
                    </div>
                  </div>
                  <div className="bg-surface-container-lowest bg-surface-container-lowest flex flex-col justify-between space-y-4 p-6 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="font-label-uppercase text-label-uppercase text-on-surface-variant font-mono">
                          VALVE-04 • EXTERIOR
                        </span>
                        <h4 className="font-headline-sm text-headline-sm text-on-surface mt-0.5">
                          Irrigation &amp; Landscape Manifold
                        </h4>
                        <p className="font-body-sm text-body-sm text-on-surface-variant">
                          Proportional Micro-Flow Actuator
                        </p>
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full bg-surface-container-highest text-on-surface font-body-sm text-body-sm font-medium">
                        50% THROTTLED
                      </span>
                    </div>
                    <div className="flex items-center justify-between pt-2">
                      <div className="inline-flex p-0.5 bg-surface-container rounded-full">
                        <button className="px-2.5 py-1 rounded-full text-on-surface-variant text-xs font-medium">
                          Open
                        </button>
                        <button className="px-2.5 py-1 rounded-full bg-surface-container-lowest text-on-surface text-xs font-semibold shadow-sm">
                          50%
                        </button>
                        <button className="px-2.5 py-1 rounded-full text-on-surface-variant text-xs font-medium">
                          Shut
                        </button>
                      </div>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">
                        Zone 1 &amp; 3 Active
                      </span>
                    </div>
                  </div>
                  <div className="bg-surface-container-lowest bg-surface-container-lowest md:col-span-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-3xl bg-surface-container-low flex items-center justify-center text-on-surface shrink-0">
                        <span className="material-symbols-outlined text-[20px]">
                          meeting_room
                        </span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-headline-sm text-headline-sm text-on-surface">
                            Guest Wing Rapid Isolation Valve (Zone 04)
                          </h4>
                          <span className="px-2.5 py-0.5 rounded-full bg-surface-container text-on-surface-variant font-body-sm text-body-sm">
                            Vacation Sealed
                          </span>
                        </div>
                        <p className="font-body-sm text-body-sm text-on-surface-variant">
                          Position: 0% CLOSED • Motorized emergency isolation against unoccupied leaks • Zero static drop
                        </p>
                      </div>
                    </div>
                    <button className="px-4 py-2 rounded-full bg-surface-container text-on-surface hover:bg-surface-container-high font-label-button text-label-button transition-colors active:scale-[0.98] shrink-0 self-start sm:self-center">
                      Unseal &amp; Prime Wing
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-4 flex flex-col space-y-space-md">
              <div className="bg-surface-container-lowest rounded-3xl overflow-hidden shadow-sm flex flex-col">
                <div className="relative h-44 w-full bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 flex items-center justify-center">
                  <span className="material-symbols-outlined text-white/25 text-[88px]">water_pump</span>
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent"></div>
                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-on-primary">
                    <div>
                      <span className="font-label-uppercase text-label-uppercase tracking-wider opacity-80 uppercase">
                        Sub-Basement Vault
                      </span>
                      <p className="font-headline-sm text-headline-sm">
                        Plant Room Bay 2
                      </p>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-surface-container-lowest/20 backdrop-blur-md text-xs font-mono">
                      SCADA NODES OK
                    </span>
                  </div>
                </div>
                <div className="p-4 bg-surface-container-lowest flex items-center justify-between font-body-sm text-body-sm text-on-surface-variant">
                  <span>
                    Enclosure Temp: 21.4°C
                  </span>
                  <span>
                    Humidity: 42% RH
                  </span>
                </div>
              </div>
              <div className="bg-surface-container-lowest bg-surface-container-lowest flex flex-col space-y-4 p-6 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-3xl bg-surface-container flex items-center justify-center text-on-surface">
                    <span className="material-symbols-outlined text-[18px]">
                      calendar_month
                    </span>
                  </div>
                  <div>
                    <h3 className="font-headline-sm text-headline-sm text-on-surface">
                      Smart Cycling Maintenance
                    </h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      Anti-Seize Exercise Routine
                    </p>
                  </div>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                  Automated weekly 5-second actuation pulse across all idle ball-valves to prevent mineral crystallization and seat calcification.
                </p>
                <div className="p-3 bg-surface-container-low rounded-3xl flex items-center justify-between">
                  <div>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">
                      Next Scheduled Run
                    </span>
                    <p className="font-body-md text-body-md font-semibold text-on-surface">
                      Sunday • 04:00 AM
                    </p>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-surface-container text-on-surface font-mono font-body-sm text-body-sm">
                    In 4 Days
                  </span>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <span className="font-body-sm text-body-sm text-on-surface-variant">
                    Dry-Run Interlocks
                  </span>
                  <span className="inline-flex items-center gap-1.5 font-body-sm text-body-sm font-semibold text-secondary">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                    {' '}Active Hardware Cutoff
                  </span>
                </div>
              </div>
              <div className="bg-surface-container-lowest bg-surface-container-lowest flex flex-col space-y-4 p-6 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-3xl bg-surface-container flex items-center justify-center text-on-surface">
                    <span className="material-symbols-outlined text-[18px]">
                      equalizer
                    </span>
                  </div>
                  <div>
                    <h3 className="font-headline-sm text-headline-sm text-on-surface">
                      Hydraulic Balancing
                    </h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      Transient &amp; Hammer Protection
                    </p>
                  </div>
                </div>
                <div className="space-y-3 pt-1">
                  <div className="flex flex-col space-y-1.5">
                    <div className="flex justify-between font-body-sm text-body-sm">
                      <span className="text-on-surface-variant">
                        Water Hammer Dampener Surge
                      </span>
                      <span className="font-semibold text-on-surface">
                        0.20 bar / 1.5 bar max
                      </span>
                    </div>
                    <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
                      <div className="bg-secondary h-full rounded-full" style={{ width: "14%" }}></div>
                    </div>
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <div className="flex justify-between font-body-sm text-body-sm">
                      <span className="text-on-surface-variant">
                        Pump Casing Temp (PMP-01)
                      </span>
                      <span className="font-semibold text-on-surface">
                        34.2°C (Safe &lt; 65°C)
                      </span>
                    </div>
                    <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
                      <div className="bg-secondary h-full rounded-full" style={{ width: "52%" }}></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-surface-container-low rounded-3xl mt-2">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[18px] text-secondary">
                        bolt
                      </span>
                      <span className="font-body-sm text-body-sm font-medium text-on-surface">
                        Inrush Current Limiter
                      </span>
                    </div>
                    <span className="font-body-sm text-body-sm text-secondary font-semibold">
                      Active Zero-Cross
                    </span>
                  </div>
                </div>
              </div>
              <div className="bg-surface-container-lowest bg-surface-container-lowest flex flex-col space-y-3 font-mono p-6 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
                <div className="flex items-center justify-between text-xs text-on-surface-variant">
                  <span>
                    SCADA BUS EVENTS
                  </span>
                  <span className="w-2 h-2 rounded-full bg-secondary"></span>
                </div>
                <div className="space-y-1.5 text-xs text-on-surface-variant">
                  <div className="flex justify-between">
                    <span className="text-on-surface">
                      11:42:01.04
                    </span>
                    <span>
                      PMP-01 VFD Target: 75% OK
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-on-surface">
                      11:39:18.22
                    </span>
                    <span>
                      VALVE-03 Position Confirmed: 0°
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-on-surface">
                      11:30:00.00
                    </span>
                    <span>
                      Bus Harmonic FFT Check: 1.18% THD
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
    </>
  );
}
