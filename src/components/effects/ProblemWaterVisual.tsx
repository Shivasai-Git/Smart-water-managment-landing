import React from 'react';

export const ProblemWaterVisual: React.FC = () => {
  return (
    <div
      className="w-full my-6 p-4 rounded-2xl bg-[#041419]/90 border border-white/10 relative overflow-hidden"
      aria-label="Infrastructure Problem Detection Diagnostics"
    >
      <div className="flex items-center justify-between mb-3 px-2">
        <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[.14em] text-saffron">
          <span className="w-1.5 h-1.5 rounded-full bg-saffron animate-pulse" />
          <span>Diagnostic Pipeline · Real-World Failure Modes</span>
        </div>
        <span className="font-mono text-[9px] uppercase tracking-wider text-steel/70">
          Unmonitored Plumbing
        </span>
      </div>

      {/* 4 Problem Diagnostic Nodes Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {/* Mode 1: Tank Overflow */}
        <div className="p-3 rounded-xl bg-[#061B21]/90 border border-saffron/20 flex flex-col justify-between min-h-[110px]">
          <div className="flex items-center justify-between text-[10px] font-mono text-saffron uppercase">
            <span>01 · Overflow</span>
            <span className="w-1.5 h-1.5 rounded-full bg-saffron" />
          </div>
          {/* Mini Diagnostic Graphic */}
          <div className="my-2 relative h-9 w-full bg-[#020A0D] rounded-lg border border-white/10 overflow-hidden flex items-end p-1">
            <div className="w-full bg-saffron/80 h-[92%] rounded transition-all duration-700 relative">
              <span className="absolute -top-1.5 right-1 text-[8px] font-mono text-saffron font-bold animate-pulse">
                MAX 100%
              </span>
            </div>
          </div>
          <p className="text-[11px] text-steel font-mono leading-tight">
            Level exceeds rim · pump continues running
          </p>
        </div>

        {/* Mode 2: Dry Run Motor */}
        <div className="p-3 rounded-xl bg-[#061B21]/90 border border-saffron/20 flex flex-col justify-between min-h-[110px]">
          <div className="flex items-center justify-between text-[10px] font-mono text-saffron uppercase">
            <span>02 · Dry Run</span>
            <span className="w-1.5 h-1.5 rounded-full bg-saffron" />
          </div>
          {/* Mini Diagnostic Graphic */}
          <div className="my-2 relative h-9 w-full bg-[#020A0D] rounded-lg border border-white/10 flex items-center justify-center gap-1.5 px-2">
            <span className="text-[10px] font-mono text-steel line-through">0.0 L/m</span>
            <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-saffron/20 text-saffron border border-saffron/40 animate-pulse">
              MOTOR HOT
            </span>
          </div>
          <p className="text-[11px] text-steel font-mono leading-tight">
            Zero inflow detected · motor overheating
          </p>
        </div>

        {/* Mode 3: Hidden Leakage */}
        <div className="p-3 rounded-xl bg-[#061B21]/90 border border-saffron/20 flex flex-col justify-between min-h-[110px]">
          <div className="flex items-center justify-between text-[10px] font-mono text-saffron uppercase">
            <span>03 · Concealed Leak</span>
            <span className="w-1.5 h-1.5 rounded-full bg-saffron" />
          </div>
          {/* Mini Diagnostic Graphic */}
          <div className="my-2 relative h-9 w-full bg-[#020A0D] rounded-lg border border-white/10 flex items-center justify-center px-2">
            <svg className="w-full h-6" viewBox="0 0 100 24" fill="none">
              <line x1="0" y1="12" x2="100" y2="12" stroke="#0C2B36" strokeWidth="4" />
              <line x1="0" y1="12" x2="50" y2="12" stroke="#18BFF2" strokeWidth="2" />
              <line x1="50" y1="12" x2="50" y2="24" stroke="#FFA03C" strokeWidth="2" strokeDasharray="2 3" />
              <circle cx="50" cy="12" r="2.5" fill="#FFA03C" />
            </svg>
          </div>
          <p className="text-[11px] text-steel font-mono leading-tight">
            Branch fracture · 1.4 L/min silent loss
          </p>
        </div>

        {/* Mode 4: Manual Guesswork */}
        <div className="p-3 rounded-xl bg-[#061B21]/90 border border-saffron/20 flex flex-col justify-between min-h-[110px]">
          <div className="flex items-center justify-between text-[10px] font-mono text-saffron uppercase">
            <span>04 · Zero Telemetry</span>
            <span className="w-1.5 h-1.5 rounded-full bg-steel/50" />
          </div>
          {/* Mini Diagnostic Graphic */}
          <div className="my-2 relative h-9 w-full bg-[#020A0D] rounded-lg border border-white/10 flex items-center justify-center px-2">
            <span className="text-[10px] font-mono text-steel/60">-- NO SENSOR SIGNAL --</span>
          </div>
          <p className="text-[11px] text-steel font-mono leading-tight">
            Blind spot · manual roof inspection needed
          </p>
        </div>
      </div>

      {/* Transition Banner: Physical Water to Sensor Transformation */}
      <div className="mt-3 pt-3 border-t border-white/8 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs font-mono">
        <div className="flex items-center gap-2 text-steel">
          <span className="w-2 h-2 rounded-full bg-[#18BFF2]" />
          <span>Physical Water Flow</span>
          <span className="text-aqua">→</span>
          <span className="text-[#72E4FF] font-semibold">Ultrasonic Sensor</span>
          <span className="text-aqua">→</span>
          <span className="text-mist font-semibold">Digital Telemetry (Automated Prevention)</span>
        </div>
        <a href="#how-it-works" className="text-aqua hover:underline uppercase text-[10px] tracking-wider shrink-0">
          How It Automates ↓
        </a>
      </div>
    </div>
  );
};
