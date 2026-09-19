export default function ReportsScreen() {
  return (
    <>
    <main className="w-full pt-8 pb-12">
      <div className="flex flex-col w-full space-y-8">
        <section className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-slate-400">
                Audit &amp; Consumption Intelligence
              </span>
            </div>
            <h1 className="font-headline-xl text-headline-xl text-on-surface tracking-tight">
              Reports &amp; Compliance
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant mt-1">
              Autonomous volumetric analytics, municipal compliance filings, and certified water purity dossiers.
            </p>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center p-1 rounded-full bg-white border border-slate-200/80 shadow-sm text-xs font-semibold text-slate-600">
              <button className="px-4 py-1.5 rounded-full text-slate-500 hover:text-slate-900 transition-colors">
                Weekly
              </button>
              <button className="px-4 py-1.5 rounded-full bg-black text-white shadow-sm transition-colors">
                Monthly
              </button>
              <button className="px-4 py-1.5 rounded-full text-slate-500 hover:text-slate-900 transition-colors">
                Quarterly
              </button>
            </div>
            <button className="flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-black hover:bg-slate-900 text-white text-xs font-bold tracking-wide shadow-md shadow-black/15 transition-all active:scale-95">
              <span className="material-symbols-outlined text-[16px] font-semibold">
                add_circle
              </span>
              <span>
                Generate report
              </span>
            </button>
          </div>
        </section>
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-surface-container-lowest flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-shadow p-6 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Total Consumption
              </span>
              <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-100">
                -8.4% MoM
              </span>
            </div>
            <div className="mt-4">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-extrabold tracking-tight text-slate-950">
                  8,420
                </span>
                <span className="text-base font-semibold text-slate-400">
                  Liters
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium mt-1">
                Target cap: 10,500 L • Current cycle: 28 days elapsed
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
              <span className="text-slate-400">
                Daily average:{' '}
                <strong className="text-slate-700">
                  300.7 L/day
                </strong>
              </span>
              <span className="text-emerald-600 font-semibold flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">
                  trending_down
                </span>
                {' '}Within green tier
              </span>
            </div>
          </div>
          <div className="bg-surface-container-lowest flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-shadow p-6 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Cost Estimate
              </span>
              <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-100 text-slate-600">
                Tier 1 Utility
              </span>
            </div>
            <div className="mt-4">
              <div className="flex items-baseline gap-1.5">
                <span className="text-4xl font-extrabold tracking-tight text-slate-950">
                  $42.80
                </span>
                <span className="text-xs font-semibold text-slate-400">
                  / estimated
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium mt-1">
                Projected end-of-month: $46.20 (Under $60 budget)
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
              <span className="text-slate-400">
                Off-peak rate savings:{' '}
                <strong className="text-slate-700">
                  $14.20
                </strong>
              </span>
              <span className="text-emerald-600 font-semibold flex items-center gap-0.5">
                <span className="material-symbols-outlined text-[16px]">
                  verified
                </span>
                {' '}Solar/Night refill
              </span>
            </div>
          </div>
          <div className="bg-surface-container-lowest flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-shadow p-6 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Saved vs. Baseline
              </span>
              <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-100 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                {' '}94 Score
              </span>
            </div>
            <div className="mt-4">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-extrabold tracking-tight text-slate-950">
                  +1,850
                </span>
                <span className="text-base font-semibold text-slate-400">
                  L saved
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium mt-1">
                Acoustic leak avoidance + smart weather-skip irrigation
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
              <span className="text-slate-400">
                Eco-rebate eligible:{' '}
                <strong className="text-slate-700">
                  Level 3 Platinum
                </strong>
              </span>
              <span className="text-slate-600 font-medium">
                Estate Benchmark: Top 5%
              </span>
            </div>
          </div>
        </section>
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="bg-surface-container-lowest lg:col-span-7 flex flex-col justify-between p-6 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-base font-bold text-slate-900 tracking-tight">
                    Scheduled Automated Dispatches
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Recurring compiled telemetry sent directly to estate managers &amp; local authorities.
                  </p>
                </div>
                <button className="text-xs font-semibold text-slate-700 hover:text-black flex items-center gap-1">
                  <span>
                    Add schedule
                  </span>
                  <span className="material-symbols-outlined text-[16px]">
                    add
                  </span>
                </button>
              </div>
              <div className="space-y-3.5 mt-2">
                <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 flex items-center justify-between hover:bg-slate-50 transition-colors">
                  <div className="flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-2xl bg-white border border-slate-200/80 flex items-center justify-center text-slate-700 shrink-0">
                      <span className="material-symbols-outlined text-[20px]">
                        calendar_month
                      </span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900">
                          Monthly Stewardship &amp; Consumption Audit
                        </span>
                        <span className="px-2 py-0.5 text-[11px] font-bold rounded-full bg-slate-200 text-slate-700">
                          1st of month
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Recipients:{' '}
                        <span className="font-medium text-slate-700">
                          founder@estate.io, accounting@residence.com
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
                    </label>
                  </div>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 flex items-center justify-between hover:bg-slate-50 transition-colors">
                  <div className="flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-2xl bg-white border border-slate-200/80 flex items-center justify-center text-slate-700 shrink-0">
                      <span className="material-symbols-outlined text-[20px]">
                        water_drop
                      </span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900">
                          Bi-Weekly Water Quality &amp; Filtration Health
                        </span>
                        <span className="px-2 py-0.5 text-[11px] font-bold rounded-full bg-slate-200 text-slate-700">
                          Alternate Sundays
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Recipients:{' '}
                        <span className="font-medium text-slate-700">
                          facilities@estate.io, lab@aquacheck.net
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
                    </label>
                  </div>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 flex items-center justify-between hover:bg-slate-50 transition-colors">
                  <div className="flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-2xl bg-white border border-slate-200/80 flex items-center justify-center text-slate-700 shrink-0">
                      <span className="material-symbols-outlined text-[20px]">
                        shield
                      </span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900">
                          Weekly Acoustic Leak &amp; Pressure Telemetry Brief
                        </span>
                        <span className="px-2 py-0.5 text-[11px] font-bold rounded-full bg-slate-200 text-slate-700">
                          Mondays 08:00 AM
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Recipients:{' '}
                        <span className="font-medium text-slate-700">
                          lead-engineer@hydrolink.io
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
              <span>
                Encrypted dispatch via AES-256 secure PDF vault
              </span>
              <span className="text-slate-600 font-semibold cursor-pointer hover:underline">
                Notification settings →
              </span>
            </div>
          </div>
          <div className="bg-surface-container-lowest lg:col-span-5 flex flex-col justify-between p-6 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-base font-bold text-slate-900 tracking-tight">
                    Compliance &amp; Certificates
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Official third-party &amp; municipality verification seals.
                  </p>
                </div>
                <span className="material-symbols-outlined text-emerald-600 text-[20px]">
                  verified
                </span>
              </div>
              <div className="space-y-3 mt-2">
                <div className="p-3.5 rounded-2xl bg-slate-50/80 border border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-2xl bg-emerald-100/70 text-emerald-800 flex items-center justify-center font-bold text-xs">
                      ISO
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">
                        ISO 17025 Realtime Telemetry
                      </h4>
                      <p className="text-[11px] text-slate-400">
                        Certified Potability Grade A+ • Valid thru 2026
                      </p>
                    </div>
                  </div>
                  <button className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:text-black hover:border-slate-400 transition-colors" aria-label="Download">
                    <span className="material-symbols-outlined text-[18px]">
                      download
                    </span>
                  </button>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-50/80 border border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-2xl bg-blue-100/70 text-blue-800 flex items-center justify-center font-bold text-xs">
                      EPA
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">
                        EPA WaterSense Residential Tier
                      </h4>
                      <p className="text-[11px] text-slate-400">
                        Zero unmitigated runoff • Verified 0.00 bar leak
                      </p>
                    </div>
                  </div>
                  <button className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:text-black hover:border-slate-400 transition-colors" aria-label="Download">
                    <span className="material-symbols-outlined text-[18px]">
                      download
                    </span>
                  </button>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-50/80 border border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-2xl bg-slate-200 text-slate-800 flex items-center justify-center font-bold text-xs">
                      NSF
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">
                        NSF/ANSI Standard 58 &amp; 55
                      </h4>
                      <p className="text-[11px] text-slate-400">
                        UV-C Bio-Chamber &amp; RO membrane audit
                      </p>
                    </div>
                  </div>
                  <button className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:text-black hover:border-slate-400 transition-colors" aria-label="Download">
                    <span className="material-symbols-outlined text-[18px]">
                      download
                    </span>
                  </button>
                </div>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
              <span className="text-slate-400">
                All certificates cryptographically signed
              </span>
              <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                100% Compliant
              </span>
            </div>
          </div>
        </section>
        <section className="bg-surface-container-lowest p-6 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-base font-bold text-slate-900 tracking-tight">
                Generated Archive Dossiers
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Browse and retrieve verified telemetry exports, regulatory filings, and cost breakdowns.
              </p>
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="relative flex-1 min-w-0 sm:flex-none">
                <span className="material-symbols-outlined text-slate-400 text-[18px] absolute left-3 top-2.5">
                  search
                </span>
                <input type="text" placeholder="Search reports..." className="w-full sm:w-auto pl-9 pr-4 py-2 rounded-full bg-slate-50 border border-slate-200/80 text-xs font-medium focus:outline-none focus:border-black transition-colors w-48 lg:w-60" />
              </div>
              <button className="shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors">
                <span className="material-symbols-outlined text-[16px]">
                  tune
                </span>
                <span>
                  Filter
                </span>
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">
                  <th className="pb-3.5 pl-2">
                    Report Name
                  </th>
                  <th className="pb-3.5 px-4">
                    Period
                  </th>
                  <th className="pb-3.5 px-4">
                    Format
                  </th>
                  <th className="pb-3.5 px-4">
                    File Size
                  </th>
                  <th className="pb-3.5 px-4">
                    Generated Date
                  </th>
                  <th className="pb-3.5 px-4">
                    Status
                  </th>
                  <th className="pb-3.5 pr-2 text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100/80 text-xs">
                <tr className="group hover:bg-slate-50/60 transition-colors">
                  <td className="py-4 pl-2 font-bold text-slate-900 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-600 group-hover:bg-black group-hover:text-white transition-colors">
                      <span className="material-symbols-outlined text-[18px]">
                        picture_as_pdf
                      </span>
                    </div>
                    <div>
                      <span className="block">
                        Monthly Residence Water Audit — October 2024
                      </span>
                      <span className="text-[11px] font-medium text-slate-400">
                        DOC-2024-10-MTR
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4 font-medium text-slate-600">
                    Oct 01 – Oct 31, 2024
                  </td>
                  <td className="py-4 px-4">
                    <span className="px-2 py-0.5 rounded-md text-[11px] font-extrabold bg-rose-50 text-rose-700 border border-rose-100">
                      PDF
                    </span>
                  </td>
                  <td className="py-4 px-4 text-slate-500 text-[11px]">
                    3.8 MB
                  </td>
                  <td className="py-4 px-4 text-slate-600">
                    Nov 01, 2024 • 00:05
                  </td>
                  <td className="py-4 px-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      {' '}Verified
                    </span>
                  </td>
                  <td className="py-4 pr-2 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button title="Download report" className="w-8 h-8 rounded-full bg-slate-100 hover:bg-black hover:text-white flex items-center justify-center text-slate-600 transition-colors">
                        <span className="material-symbols-outlined text-[18px]">
                          download
                        </span>
                      </button>
                      <button title="Share link" className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-800 transition-colors">
                        <span className="material-symbols-outlined text-[18px]">
                          share
                        </span>
                      </button>
                    </div>
                  </td>
                </tr>
                <tr className="group hover:bg-slate-50/60 transition-colors">
                  <td className="py-4 pl-2 font-bold text-slate-900 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-600 group-hover:bg-black group-hover:text-white transition-colors">
                      <span className="material-symbols-outlined text-[18px]">
                        table_chart
                      </span>
                    </div>
                    <div>
                      <span className="block">
                        Sub-Manifold Volumetric Raw Telemetry
                      </span>
                      <span className="text-[11px] font-medium text-slate-400">
                        RAW-2024-W44
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4 font-medium text-slate-600">
                    Oct 21 – Oct 27, 2024
                  </td>
                  <td className="py-4 px-4">
                    <span className="px-2 py-0.5 rounded-md text-[11px] font-extrabold bg-emerald-50 text-emerald-700 border border-emerald-100">
                      CSV
                    </span>
                  </td>
                  <td className="py-4 px-4 text-slate-500 text-[11px]">
                    840 KB
                  </td>
                  <td className="py-4 px-4 text-slate-600">
                    Oct 28, 2024 • 08:00
                  </td>
                  <td className="py-4 px-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      {' '}Verified
                    </span>
                  </td>
                  <td className="py-4 pr-2 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button title="Download report" className="w-8 h-8 rounded-full bg-slate-100 hover:bg-black hover:text-white flex items-center justify-center text-slate-600 transition-colors">
                        <span className="material-symbols-outlined text-[18px]">
                          download
                        </span>
                      </button>
                      <button title="Share link" className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-800 transition-colors">
                        <span className="material-symbols-outlined text-[18px]">
                          share
                        </span>
                      </button>
                    </div>
                  </td>
                </tr>
                <tr className="group hover:bg-slate-50/60 transition-colors">
                  <td className="py-4 pl-2 font-bold text-slate-900 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-600 group-hover:bg-black group-hover:text-white transition-colors">
                      <span className="material-symbols-outlined text-[18px]">
                        picture_as_pdf
                      </span>
                    </div>
                    <div>
                      <span className="block">
                        Q3 Sustainability &amp; Conservation Compliance
                      </span>
                      <span className="text-[11px] font-medium text-slate-400">
                        Q3-COMP-2024
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4 font-medium text-slate-600">
                    Jul 01 – Sep 30, 2024
                  </td>
                  <td className="py-4 px-4">
                    <span className="px-2 py-0.5 rounded-md text-[11px] font-extrabold bg-rose-50 text-rose-700 border border-rose-100">
                      PDF
                    </span>
                  </td>
                  <td className="py-4 px-4 text-slate-500 text-[11px]">
                    6.2 MB
                  </td>
                  <td className="py-4 px-4 text-slate-600">
                    Oct 02, 2024 • 14:22
                  </td>
                  <td className="py-4 px-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      {' '}Verified
                    </span>
                  </td>
                  <td className="py-4 pr-2 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button title="Download report" className="w-8 h-8 rounded-full bg-slate-100 hover:bg-black hover:text-white flex items-center justify-center text-slate-600 transition-colors">
                        <span className="material-symbols-outlined text-[18px]">
                          download
                        </span>
                      </button>
                      <button title="Share link" className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-800 transition-colors">
                        <span className="material-symbols-outlined text-[18px]">
                          share
                        </span>
                      </button>
                    </div>
                  </td>
                </tr>
                <tr className="group hover:bg-slate-50/60 transition-colors">
                  <td className="py-4 pl-2 font-bold text-slate-900 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-600 group-hover:bg-black group-hover:text-white transition-colors">
                      <span className="material-symbols-outlined text-[18px]">
                        science
                      </span>
                    </div>
                    <div>
                      <span className="block">
                        Biochemical Purity &amp; Spectrometry Dossier
                      </span>
                      <span className="text-[11px] font-medium text-slate-400">
                        SPEC-LAB-2024-Q3
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4 font-medium text-slate-600">
                    Jul 01 – Sep 30, 2024
                  </td>
                  <td className="py-4 px-4">
                    <span className="px-2 py-0.5 rounded-md text-[11px] font-extrabold bg-rose-50 text-rose-700 border border-rose-100">
                      PDF
                    </span>
                  </td>
                  <td className="py-4 px-4 text-slate-500 text-[11px]">
                    4.1 MB
                  </td>
                  <td className="py-4 px-4 text-slate-600">
                    Sep 30, 2024 • 19:40
                  </td>
                  <td className="py-4 px-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      {' '}Verified
                    </span>
                  </td>
                  <td className="py-4 pr-2 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button title="Download report" className="w-8 h-8 rounded-full bg-slate-100 hover:bg-black hover:text-white flex items-center justify-center text-slate-600 transition-colors">
                        <span className="material-symbols-outlined text-[18px]">
                          download
                        </span>
                      </button>
                      <button title="Share link" className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-800 transition-colors">
                        <span className="material-symbols-outlined text-[18px]">
                          share
                        </span>
                      </button>
                    </div>
                  </td>
                </tr>
                <tr className="group hover:bg-slate-50/60 transition-colors">
                  <td className="py-4 pl-2 font-bold text-slate-900 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-600 group-hover:bg-black group-hover:text-white transition-colors">
                      <span className="material-symbols-outlined text-[18px]">
                        table_chart
                      </span>
                    </div>
                    <div>
                      <span className="block">
                        Acoustic FFT &amp; Vibration Frequency Log
                      </span>
                      <span className="text-[11px] font-medium text-slate-400">
                        ACOUSTIC-DIAG-OCT
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4 font-medium text-slate-600">
                    Oct 01 – Oct 15, 2024
                  </td>
                  <td className="py-4 px-4">
                    <span className="px-2 py-0.5 rounded-md text-[11px] font-extrabold bg-emerald-50 text-emerald-700 border border-emerald-100">
                      CSV
                    </span>
                  </td>
                  <td className="py-4 px-4 text-slate-500 text-[11px]">
                    1.2 MB
                  </td>
                  <td className="py-4 px-4 text-slate-600">
                    Oct 16, 2024 • 03:30
                  </td>
                  <td className="py-4 px-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      {' '}Verified
                    </span>
                  </td>
                  <td className="py-4 pr-2 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button title="Download report" className="w-8 h-8 rounded-full bg-slate-100 hover:bg-black hover:text-white flex items-center justify-center text-slate-600 transition-colors">
                        <span className="material-symbols-outlined text-[18px]">
                          download
                        </span>
                      </button>
                      <button title="Share link" className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-800 transition-colors">
                        <span className="material-symbols-outlined text-[18px]">
                          share
                        </span>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-5 pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-500">
            <span>
              Showing{' '}
              <strong className="text-slate-800">
                1–5
              </strong>
              {' '}of{' '}
              <strong className="text-slate-800">
                28
              </strong>
              {' '}archived reports
            </span>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1.5 rounded-full border border-slate-200 text-slate-400 cursor-not-allowed">
                Previous
              </button>
              <button className="w-7 h-7 rounded-full bg-black text-white font-semibold flex items-center justify-center">
                1
              </button>
              <button className="w-7 h-7 rounded-full text-slate-600 hover:bg-slate-100 font-semibold flex items-center justify-center transition-colors">
                2
              </button>
              <button className="w-7 h-7 rounded-full text-slate-600 hover:bg-slate-100 font-semibold flex items-center justify-center transition-colors">
                3
              </button>
              <button className="px-3 py-1.5 rounded-full border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors">
                Next
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
    </>
  );
}
