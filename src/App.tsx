import { useMemo, useState } from 'react';
import './dashboard.css';

type Page = 'Overview' | 'Live Monitoring' | 'Water Quality' | 'Leak Detection' | 'Analytics & Forecasts' | 'Device Management' | 'Remote Valve Control';

const quality = [
  ['pH', '7.2', '6.5–8.5', 'Optimal'],
  ['TDS', '340 ppm', '0–500 ppm', 'Good'],
  ['Turbidity', '1.8 NTU', '0–5 NTU', 'Good'],
  ['Temperature', '26.4°C', '20–30°C', 'Normal'],
  ['EC', '520 µS/cm', '300–800 µS/cm', 'Normal'],
  ['Dissolved oxygen', '6.8 mg/L', '> 5 mg/L', 'Good'],
];

const devices = [
  ['Flow sensor', 'FS-ENG-021', 'Engineering Block · Zone B', 'Online', '12 sec ago'],
  ['Quality probe', 'WQ-ENG-004', 'Engineering Block · Inlet', 'Online', '18 sec ago'],
  ['Valve controller', 'VC-ENG-002', 'Engineering Block · Zone B', 'Attention', '1 min ago'],
  ['Gateway', 'GW-CMP-001', 'Campus core', 'Online', '8 sec ago'],
];

const sensorArray = [
  { label: 'pH Balance', value: '7.2', unit: '', note: 'Std: 6.5 – 8.5' },
  { label: 'TDS (Solids)', value: '340', unit: 'ppm', note: 'Ideal: < 500' },
  { label: 'Turbidity', value: '1.8', unit: 'NTU', note: 'Safe: < 5.0' },
  { label: 'Temperature', value: '26.4', unit: '°C', note: 'Line ambient' },
  { label: 'Conductivity (EC)', value: '520', unit: 'µS/cm', note: 'Mineralized' },
  { label: 'Dissolved O₂', value: '6.8', unit: 'mg/L', note: 'Optimal' },
];

/* ---------------------------------- icons --------------------------------- */

type IconProps = { size?: number; className?: string };

function icon(paths: JSX.Element) {
  return function Icon({ size = 16, className }: IconProps) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
        {paths}
      </svg>
    );
  };
}

const IconGrid = icon(<><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></>);
const IconActivity = icon(<polyline points="2,13 8,13 10,7 14,19 16,11 19,15 22,15" />);
const IconDroplet = icon(<path d="M12 2.5c3.6 4.4 7 8.7 7 12.4a7 7 0 1 1-14 0c0-3.7 3.4-8 7-12.4Z" />);
const IconAlertTriangle = icon(<><path d="M10.7 3.5 2.3 18a1.6 1.6 0 0 0 1.4 2.4h16.6a1.6 1.6 0 0 0 1.4-2.4L13.3 3.5a1.6 1.6 0 0 0-2.6 0Z" /><line x1="12" y1="9.5" x2="12" y2="13.5" /><circle cx="12" cy="16.7" r=".9" fill="currentColor" stroke="none" /></>);
const IconBarChart = icon(<><rect x="3" y="11" width="4.5" height="9.5" rx="1" /><rect x="9.8" y="6" width="4.5" height="14.5" rx="1" /><rect x="16.5" y="2.5" width="4.5" height="18" rx="1" /></>);
const IconCpu = icon(<><rect x="6" y="6" width="12" height="12" rx="2" /><rect x="9.5" y="9.5" width="5" height="5" rx="1" /><line x1="12" y1="1.5" x2="12" y2="4" /><line x1="12" y1="20" x2="12" y2="22.5" /><line x1="1.5" y1="12" x2="4" y2="12" /><line x1="20" y1="12" x2="22.5" y2="12" /></>);
const IconSliders = icon(<><line x1="4" y1="6" x2="20" y2="6" /><circle cx="9" cy="6" r="2" fill="currentColor" stroke="none" /><line x1="4" y1="12" x2="20" y2="12" /><circle cx="15" cy="12" r="2" fill="currentColor" stroke="none" /><line x1="4" y1="18" x2="20" y2="18" /><circle cx="11" cy="18" r="2" fill="currentColor" stroke="none" /></>);
const IconChevronDown = icon(<polyline points="6,9 12,15 18,9" />);
const IconChevronRight = icon(<polyline points="9,6 15,12 9,18" />);
const IconBell = icon(<><path d="M6 9.5a6 6 0 0 1 12 0c0 4.5 1.5 6 1.5 6h-15s1.5-1.5 1.5-6Z" /><path d="M10 19a2 2 0 0 0 4 0" /></>);
const IconSpark = icon(<path d="M12 2.5 13.8 9 20 11l-6.2 2L12 19.5 10.2 13 4 11l6.2-2Z" />);
const IconArrowUpRight = icon(<><line x1="6" y1="18" x2="18" y2="6" /><polyline points="8,6 18,6 18,16" /></>);
const IconCheck = icon(<polyline points="4,13 9,18 20,6" />);
const IconAlert = icon(<><line x1="12" y1="7" x2="12" y2="13" /><circle cx="12" cy="16.5" r="1" fill="currentColor" stroke="none" /></>);
const IconLayers = icon(<><path d="M12 3 21 8 12 13 3 8Z" /><path d="M3 14l9 5 9-5" /><path d="M3 11l9 5 9-5" /></>);
const IconValve = icon(<><circle cx="12" cy="12" r="8.5" /><path d="M12 4v3M12 17v3M4 12h3M17 12h3M6.5 6.5l2 2M15.5 15.5l2 2M17.5 6.5l-2 2M8.5 15.5l-2 2" /></>);
const IconPlus = icon(<><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></>);
const IconExport = icon(<><path d="M12 16V4M8 8l4-4 4 4" /><path d="M4 15v3.5A1.5 1.5 0 0 0 5.5 20h13a1.5 1.5 0 0 0 1.5-1.5V15" /></>);
const IconHeart = icon(<path d="M12 20.2S3.5 14.8 3.5 8.9C3.5 6 5.8 4 8.3 4c1.6 0 3 .8 3.7 2.1C12.7 4.8 14.1 4 15.7 4c2.5 0 4.8 2 4.8 4.9 0 5.9-8.5 11.3-8.5 11.3Z" />);
const IconRadio = icon(<><circle cx="12" cy="12" r="2" fill="currentColor" stroke="none" /><path d="M8.5 8.5a5 5 0 0 0 0 7M15.5 8.5a5 5 0 0 1 0 7M5.3 5.3a9.5 9.5 0 0 0 0 13.4M18.7 5.3a9.5 9.5 0 0 1 0 13.4" /></>);
const IconSettings = icon(<><circle cx="12" cy="12" r="3" /><path d="M19.4 13.5a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.9 2.9l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6V20a2 2 0 1 1-4 0v-.2a1.7 1.7 0 0 0-1.1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 1 1-2.9-2.9l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.6-1H4a2 2 0 1 1 0-4h.2a1.7 1.7 0 0 0 1.6-1.1 1.7 1.7 0 0 0-.3-1.9l-.1-.1a2 2 0 1 1 2.9-2.9l.1.1a1.7 1.7 0 0 0 1.9.3H10.5a1.7 1.7 0 0 0 1-1.6V4a2 2 0 1 1 4 0v.2a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1a2 2 0 1 1 2.9 2.9l-.1.1a1.7 1.7 0 0 0-.3 1.9V10.5a1.7 1.7 0 0 0 1.6 1H20a2 2 0 1 1 0 4h-.2a1.7 1.7 0 0 0-1.6 1Z" /></>);
const IconBook = icon(<><path d="M4 5.2A2.2 2.2 0 0 1 6.2 3H20v15.5H6.2A2.2 2.2 0 0 0 4 20.7Z" /><path d="M4 5.2v15.5" /></>);
const IconLogout = icon(<><path d="M9 21H5.5A1.5 1.5 0 0 1 4 19.5v-15A1.5 1.5 0 0 1 5.5 3H9" /><path d="M15.5 16 20 12l-4.5-4" /><line x1="20" y1="12" x2="9" y2="12" /></>);
const IconRobot = icon(<><rect x="4" y="8" width="16" height="11" rx="3" /><circle cx="9" cy="13.5" r="1.2" fill="currentColor" stroke="none" /><circle cx="15" cy="13.5" r="1.2" fill="currentColor" stroke="none" /><path d="M12 8V4.5" /><circle cx="12" cy="3.5" r="1" fill="currentColor" stroke="none" /></>);
const IconFileText = icon(<><path d="M6 3.5h9l4 4v13H6Z" /><line x1="9" y1="12" x2="15" y2="12" /><line x1="9" y1="15.5" x2="15" y2="15.5" /></>);
const IconFilter = icon(<path d="M4 5h16l-6 7.5V19l-4 2v-8.5Z" />);
const IconCalendar = icon(<><rect x="3.5" y="5" width="17" height="15.5" rx="2" /><line x1="3.5" y1="9.5" x2="20.5" y2="9.5" /><line x1="8" y1="3" x2="8" y2="6.5" /><line x1="16" y1="3" x2="16" y2="6.5" /></>);

const nav: { name: Page; icon: (p: IconProps) => JSX.Element }[] = [
  { name: 'Overview', icon: IconGrid },
  { name: 'Live Monitoring', icon: IconActivity },
  { name: 'Water Quality', icon: IconDroplet },
  { name: 'Leak Detection', icon: IconAlertTriangle },
  { name: 'Analytics & Forecasts', icon: IconBarChart },
  { name: 'Device Management', icon: IconCpu },
  { name: 'Remote Valve Control', icon: IconSliders },
];

/* --------------------------------- widgets --------------------------------- */

function Sparkline({ accent = false }: { accent?: boolean }) {
  return (
    <svg viewBox="0 0 240 55" className="spark" aria-label="simulated activity trend">
      <path d="M0 39 C17 35 22 42 37 35 S58 23 76 30 S95 40 113 25 S132 29 147 18 S169 25 185 11 S205 18 240 8" fill="none" stroke={accent ? '#e5484d' : '#5b5fee'} strokeWidth="2.5" />
      <path d="M0 52 V39 C17 35 22 42 37 35 S58 23 76 30 S95 40 113 25 S132 29 147 18 S169 25 185 11 S205 18 240 8 V52Z" fill={accent ? 'url(#rose)' : 'url(#indigo)'} opacity=".22" />
      <defs>
        <linearGradient id={accent ? 'rose' : 'indigo'} x1="0" x2="0" y1="0" y2="1">
          <stop stopColor={accent ? '#e5484d' : '#5b5fee'} />
          <stop offset="1" stopColor="transparent" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/* ----------------------------------- app ----------------------------------- */

export default function App() {
  const [page, setPage] = useState<Page>('Overview');
  const [scenario, setScenario] = useState<'normal' | 'leak' | 'isolated'>('normal');
  const [confirmValve, setConfirmValve] = useState(false);
  const [selectedZone] = useState('Engineering Block');

  const leak = scenario === 'leak';
  const isolated = scenario === 'isolated';
  const currentFlow = leak ? '78.6' : isolated ? '0.0' : '42.8';
  const headline = useMemo(
    () => (isolated ? 'Zone B isolated — incident contained' : leak ? 'Continuous flow anomaly detected in Zone B' : 'System operating normally — all 6 zones balanced'),
    [isolated, leak],
  );
  const runScenario = () => setScenario(scenario === 'normal' ? 'leak' : scenario === 'leak' ? 'isolated' : 'normal');

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark"><IconDroplet size={16} /></div>
          <span>Aquasight</span>
          <em>DEMO</em>
        </div>
        <div className="workspace">
          <span>FACILITY CAMPUS</span>
          <button><i><IconGrid size={13} /></i>{selectedZone}<small><IconChevronDown size={13} /></small></button>
        </div>
        <p className="nav-group-label">Operations Monitor</p>
        <nav>
          {nav.map((item) => (
            <button key={item.name} className={page === item.name ? 'active' : ''} onClick={() => setPage(item.name)}>
              <i><item.icon size={16} /></i>
              {item.name}
              {item.name === 'Leak Detection' && leak && <b>1</b>}
            </button>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="gateway-status">
            <span className="gateway-dot" />
            <div><strong>14/14 Gateways</strong><small>LoRaWAN sync 99.8%</small></div>
            <i><IconRadio size={15} /></i>
          </div>
          <div className="sidebar-links">
            <button><IconSettings size={14} /> Settings</button>
            <button><IconBook size={14} /> Docs</button>
          </div>
          <div className="person">
            <span>AP</span>
            <div><strong>Alex Patel</strong><small>Head of Facilities</small></div>
            <i><IconLogout size={14} /></i>
          </div>
        </div>
      </aside>

      <section className="content">
        <header className="topbar">
          <div className="breadcrumb">
            <span>Campus Portfolio</span>
            <IconChevronRight size={13} />
            <strong>{page}</strong>
            <span className={leak ? 'sync-pill warn' : 'sync-pill'}><i />{leak ? 'Telemetry degraded' : 'Telemetry synced 4s ago'}</span>
          </div>
          <div className="top-actions">
            <button className="filter-pill"><IconFilter size={13} /> All Campus Zones<IconChevronDown size={12} /></button>
            <button className="filter-pill"><IconCalendar size={13} /> Today · Live Stream<IconChevronDown size={12} /></button>
            <button className="icon-button" aria-label="Notifications"><IconBell size={16} />{leak && <b />}</button>
            <button className="avatar">AP</button>
          </div>
        </header>

        <div className="demo-banner">
          <span><IconLayers size={15} /></span>
          <strong>Presentation mode</strong>
          <p>All readings, alerts and actions below are simulated for demonstration purposes.</p>
          <button onClick={runScenario}>
            {scenario === 'normal' ? 'Run incident demo' : scenario === 'leak' ? 'Contain incident' : 'Reset demo'}
            <IconArrowUpRight size={13} />
          </button>
        </div>

        {page === 'Overview' ? (
          <Overview currentFlow={currentFlow} leak={leak} isolated={isolated} headline={headline} setPage={setPage} setConfirmValve={setConfirmValve} />
        ) : (
          <DetailPage page={page} leak={leak} isolated={isolated} setConfirmValve={setConfirmValve} />
        )}
      </section>

      {confirmValve && (
        <div className="modal-backdrop" role="dialog" aria-modal="true">
          <section className="modal">
            <span className="modal-icon"><IconAlertTriangle size={20} /></span>
            <h2>Isolate Zone B?</h2>
            <p>This will send a simulated close command to valve <b>VC-ENG-002</b>. No physical equipment is connected in this demo.</p>
            <div>
              <button className="secondary" onClick={() => setConfirmValve(false)}>Cancel</button>
              <button className="danger" onClick={() => { setConfirmValve(false); setScenario('isolated'); }}>Isolate simulated valve</button>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}

function Overview({ currentFlow, leak, isolated, headline, setPage, setConfirmValve }: { currentFlow: string; leak: boolean; isolated: boolean; headline: string; setPage: (p: Page) => void; setConfirmValve: (v: boolean) => void }) {
  const zoneBFlow = leak ? '78.6 L/min' : isolated ? '0.0 L/min' : '16.2 L/min';
  const zoneBStatus = leak ? 'Alert' : isolated ? 'Isolated' : 'Nominal';
  const opsLog = [
    leak
      ? { level: 'WARN', text: 'Continuous-flow anomaly flagged on Zone B riser — AI confidence 94%', time: 'Just now' }
      : isolated
        ? { level: 'INFO', text: 'Zone B valve VC-ENG-002 closed via supervised control', time: 'Just now' }
        : { level: 'INFO', text: 'Daily telemetry calibration cycle finalized for Western Campus', time: '06:00 AM' },
    { level: 'WARN', text: 'Maintenance scheduled: Flow sensor FS-ENG-021 battery replacement due in 72h', time: '05:12 AM' },
    { level: 'NORMAL', text: 'Hydro-pneumatic booster pressure restored to 4.2 bar baseline', time: '04:30 AM' },
  ];
  const hydraulicZones = [
    { name: 'Zone A — Admin & Lecture Hall', valve: 'Valve V-01 (Open 100%)', flow: '12.4 L/min', status: 'Nominal', tone: 'green' },
    { name: 'Zone B — Engineering Riser', valve: 'Valve V-04 (' + (isolated ? 'Closed' : 'Open 100%') + ')', flow: zoneBFlow, status: zoneBStatus, tone: leak ? 'red' : isolated ? 'blue' : 'green' },
    { name: 'Zone C — Student Residences', valve: 'Valve V-02 (Open 100%)', flow: '8.9 L/min', status: 'Nominal', tone: 'green' },
    { name: 'Zone D — Central Chiller Secondary', valve: 'Valve V-07 (Standby Off)', flow: '0.0 L/min', status: 'Standby', tone: 'muted' },
  ];

  return (
    <div className="dashboard-view">
      <section className={leak ? 'ops-banner warning' : isolated ? 'ops-banner contained' : 'ops-banner'}>
        <span className="ops-banner-icon">{leak ? <IconAlert size={18} /> : isolated ? <IconCheck size={17} /> : <IconHeart size={17} />}</span>
        <div className="ops-banner-body">
          <div className="ops-banner-title">
            <h2>{headline}</h2>
            <span className="pill">{leak ? 'AI confidence 94%' : isolated ? 'Contained' : '99.4% Uptime'}</span>
          </div>
          <p>{leak ? 'Zone B riser flow continues 83% above baseline during an expected low-use period.' : isolated ? 'Simulated loss prevented: 1,120 L since isolation.' : 'Pressure gradients nominal (4.1 to 4.3 bar across North Wing risers). Telemetry ping active across 14 gateways.'}</p>
        </div>
        <div className="ops-banner-side">
          {leak ? <button className="danger" onClick={() => setConfirmValve(true)}>Isolate Zone B</button> : <><IconCheck size={13} /> Audit passed 06:00 EST</>}
        </div>
      </section>

      <section className="metric-grid four-col">
        <article className="metric rich">
          <div className="metric-top"><p>Current instantaneous flow</p><span className={leak ? 'chip red' : 'chip'}>{leak ? '+83% vs avg' : isolated ? 'Valve closed' : '-4.1% vs avg'}</span></div>
          <h2>{currentFlow}<small> L/min</small></h2>
          <small className="metric-note">Target range: 38.0 – 46.5 L/min</small>
          <Sparkline accent={leak} />
        </article>
        <article className="metric rich">
          <div className="metric-top"><p>Today's consumption</p><span className="chip">{leak ? '84.0% of cap' : '76.8% of cap'}</span></div>
          <h2>{leak ? '20,145' : '18,420'}<small> Liters</small></h2>
          <small className="metric-note">Daily budget: 24,000 L ceiling</small>
          <div className="budget-track"><i style={{ width: leak ? '84%' : '76.8%' }} /></div>
        </article>
        <article className="metric rich">
          <div className="metric-top"><p>Water quality index</p><span className="chip green">Grade A Potable</span></div>
          <h2>92<small> / 100</small></h2>
          <small className="metric-note">pH 7.2 · TDS 340 ppm · Turbidity 1.8 NTU</small>
          <span className="metric-tag green"><IconArrowUpRight size={11} /> Nominal · Certified for surgical wing rinse</span>
        </article>
        <article className="metric rich">
          <div className="metric-top"><p>Active system alerts</p><span className={leak ? 'chip red' : 'chip'}>{leak ? '2 Scheduled Tasks' : '1 Scheduled Task'}</span></div>
          <h2>{leak ? '03' : '01'}<small> Actionable</small></h2>
          <small className="metric-note">Flow sensor FS-ENG-021 routine calibration in 72h</small>
          <button className="metric-link" onClick={() => setPage('Leak Detection')}>Severity: {leak ? 'High' : 'Low'} · View queue <IconArrowUpRight size={11} /></button>
        </article>
      </section>

      <section className="panel chart-panel">
        <div className="chart-panel-head">
          <div>
            <div className="chart-panel-title"><h3>Campus real-time water consumption</h3><span className="chip">Dual axis</span></div>
            <p>Continuous acoustic and magnetic pulse flow meters across North Wing sub-circuits</p>
          </div>
          <div className="chart-panel-controls">
            <div className="legend"><span><i className="dot blue" />Main inlet</span><span><i className="dot violet" />Zone B (Engineering)</span><span><i className="dot muted" />Residence</span></div>
            <div className="range-tabs"><span>1H</span><span>6H</span><span className="active">24H</span><span>7D</span><span>30D</span></div>
          </div>
        </div>
        <AreaChart accent={leak} />
        <div className="chart-x-axis">
          <span>00:00 (Night baselining)</span><span>04:00</span><span>08:00 (Shift influx)</span><span>12:00 (Peak utilization)</span><span>16:00</span><span className="now">Now (Live telemetry)</span>
        </div>
      </section>

      <section className="split-grid two-col">
        <article className="panel copilot-panel">
          <div className="copilot-head">
            <span className="copilot-badge"><IconRobot size={18} /></span>
            <div><h3>Aquasight FlowAI™ Copilot</h3><small>Autonomous hydraulic reasoning engine</small></div>
            <span className={leak ? 'chip red' : 'chip green'}><IconSpark size={11} /> {leak ? 'Investigating anomaly' : 'Consumption is tracking efficiently'}</span>
          </div>
          <p className="copilot-text">
            {leak
              ? <>Zone B riser flow is <b>83% above</b> its normal operating pattern and continues during an expected low-use period. No corresponding fixture activity was logged — pattern is consistent with a continuous-flow leak signature.</>
              : <>Night-time baseline flow between 02:00–04:00 was <b>4.2 L/min</b>, well within historical seasonal variance. Zone B HVAC chiller circuit demand stabilized after morning thermal equilibration. No micro-leak vibration patterns detected.</>}
          </p>
          <div className="copilot-stats">
            <div><small>Baseline variance</small><b className={leak ? 'red' : 'green'}>{leak ? '+83.4%' : '+1.2%'}</b><span>Historical 30-day</span></div>
            <div><small>Anomaly probability</small><b>{leak ? '94.0%' : '3.1%'}</b><span>Confidence band</span></div>
            <div><small>Efficiency index</small><b>{leak ? '61 / 100' : '96 / 100'}</b><span>LEED Gold rating</span></div>
          </div>
          <div className="copilot-foot">
            <button className="text-button"><IconFileText size={13} /> Download automated daily report (PDF)</button>
            <small>Model checkpoint: v4.28-prod</small>
          </div>
        </article>

        <article className="panel sensor-panel">
          <div className="copilot-head">
            <span className="copilot-badge alt"><IconDroplet size={17} /></span>
            <div><h3>Potability &amp; sensor array</h3><small>Continuously sensed physicochemical telemetry</small></div>
            <span className="chip green">Safe potable</span>
          </div>
          <div className="sensor-grid">
            {sensorArray.map((s) => (
              <div className="sensor-cell" key={s.label}>
                <p>{s.label}</p>
                <h4>{s.value}<small>{s.unit}</small><i className="dot green" /></h4>
                <small>{s.note}</small>
              </div>
            ))}
          </div>
          <button className="text-button full">View full lab spectrometry &amp; diagnostics <IconArrowUpRight size={12} /></button>
        </article>
      </section>

      <section className="split-grid two-col">
        <article className="panel log-panel">
          <div className="panel-header"><div><h3>Operational log &amp; events</h3></div><small className="muted-tag">Auto-refreshed 4s ago</small></div>
          <div className="log-list">
            {opsLog.map((entry, i) => (
              <div className="log-row" key={i}>
                <span className={`log-tag ${entry.level.toLowerCase()}`}>{entry.level}</span>
                <p>{entry.text}</p>
                <small>{entry.time}</small>
              </div>
            ))}
          </div>
        </article>

        <article className="panel zones-panel">
          <div className="panel-header"><div><h3>Campus hydraulic zones</h3></div><small className="muted-tag">4 active feeds</small></div>
          <div className="zones-list">
            {hydraulicZones.map((z) => (
              <div className="zone-row" key={z.name}>
                <span className={`zone-row-dot ${z.tone}`} />
                <div><b>{z.name}</b><small>{z.valve}</small></div>
                <div className="zone-row-metric"><strong>{z.flow}</strong><small className={z.tone}>{z.status}</small></div>
              </div>
            ))}
          </div>
          <button className="text-button full"><IconSliders size={13} /> Open dynamic actuator control matrix</button>
        </article>
      </section>
    </div>
  );
}

function AreaChart({ accent }: { accent: boolean }) {
  const stroke = accent ? '#e5484d' : '#5b5fee';
  return (
    <svg viewBox="0 0 960 220" className="area-chart" aria-label="campus consumption over 24 hours" preserveAspectRatio="none">
      <line x1="0" y1="70" x2="960" y2="70" stroke="#c7cbe6" strokeDasharray="3 5" strokeWidth="1.2" />
      <path d="M0 150 C120 148 200 152 260 140 S 360 88 430 82 S 560 96 640 100 S 800 104 880 92 L 960 78" fill="none" stroke={stroke} strokeWidth="2.6" strokeLinecap="round" />
      <path d="M0 150 C120 148 200 152 260 140 S 360 88 430 82 S 560 96 640 100 S 800 104 880 92 L 960 78 V220 H0 Z" fill="url(#area-fill)" />
      <circle cx="960" cy="78" r="5" fill="#fff" stroke={stroke} strokeWidth="2.5" />
      <defs>
        <linearGradient id="area-fill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor={stroke} stopOpacity="0.22" />
          <stop offset="1" stopColor={stroke} stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function DetailPage({ page, leak, isolated, setConfirmValve }: { page: Page; leak: boolean; isolated: boolean; setConfirmValve: (v: boolean) => void }) {
  if (page === 'Water Quality') {
    return (
      <div className="detail-layout">
        <section className="panel large">
          <div className="panel-header">
            <div><p>DEMO SENSOR READINGS</p><h2>Water quality profile</h2></div>
            <span className="severity">Good · 92/100</span>
          </div>
          <div className="quality-grid">
            {quality.map(([name, value, range, status]) => (
              <article key={name}>
                <p>{name}</p>
                <h3>{value}</h3>
                <small>Target: {range}</small>
                <b><IconCheck size={11} /> {status}</b>
              </article>
            ))}
          </div>
          <div className="explain">
            <strong>AI observation</strong>
            <p>All simulated quality indicators are stable. A real deployment should apply local regulatory limits and laboratory verification before any compliance decision.</p>
          </div>
        </section>
      </div>
    );
  }

  if (page === 'Device Management') {
    return (
      <div className="detail-layout">
        <section className="panel large">
          <div className="panel-header">
            <div><p>ASSET INVENTORY</p><h2>Connected devices</h2></div>
            <button className="secondary"><IconPlus size={13} /> Add device</button>
          </div>
          <div className="data-table">
            <div className="table-head"><span>DEVICE</span><span>LOCATION</span><span>STATUS</span><span>LAST SEEN</span></div>
            {devices.map((d) => (
              <div className="table-row" key={d[1]}>
                <span><b>{d[0]}</b><small>{d[1]}</small></span>
                <span>{d[2]}</span>
                <span className={d[3] === 'Attention' ? 'device-status attention' : 'device-status'}><i />{d[3]}</span>
                <span>{d[4]}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    );
  }

  if (page === 'Remote Valve Control') {
    return (
      <div className="detail-layout">
        <section className="panel large">
          <div className="panel-header">
            <div><p>SUPERVISED CONTROL</p><h2>Valve command centre</h2></div>
            <span className="simulated"><i /> SIMULATION ONLY</span>
          </div>
          <div className="valve-list">
            <Valve name="Main inlet valve" id="VC-CMP-001" state="Auto" />
            <Valve name="Engineering Block · Zone A" id="VC-ENG-001" state="Open" />
            <Valve name="Engineering Block · Zone B" id="VC-ENG-002" state={isolated ? 'Closed' : leak ? 'Attention' : 'Auto'} action={() => setConfirmValve(true)} />
          </div>
          <div className="explain">
            <strong>Safe operating model</strong>
            <p>Production commands need device authentication, role-based approval, an audit log, command acknowledgement, and a physical fail-safe. None are connected in this presentation demo.</p>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="detail-layout">
      <section className="panel large">
        <div className="panel-header">
          <div><p>{page.toUpperCase()}</p><h2>{page === 'Leak Detection' ? 'Leak investigation workspace' : `${page} workspace`}</h2></div>
          <button className="text-button"><IconExport size={13} /> Export simulated report</button>
        </div>
        <div className="empty-workspace">
          <div>{page === 'Leak Detection' ? <IconAlertTriangle size={24} /> : <IconBarChart size={24} />}</div>
          <h3>{leak ? 'Zone B needs attention' : 'Ready for your demo narrative'}</h3>
          <p>{leak ? 'The scenario identified sustained unexpected flow. Review the affected zone, then isolate its simulated valve.' : 'This area is structured for the production module. Use the incident demo button to show the end-to-end detection and response flow.'}</p>
          {page === 'Leak Detection' && leak && <button className="danger" onClick={() => setConfirmValve(true)}>Isolate Zone B</button>}
        </div>
      </section>
    </div>
  );
}

function Valve({ name, id, state, action }: { name: string; id: string; state: string; action?: () => void }) {
  return (
    <article className="valve">
      <div className={state === 'Closed' ? 'valve-wheel closed' : 'valve-wheel'}><IconValve size={19} /></div>
      <div><h3>{name}</h3><p>{id} · Command acknowledgement simulated</p></div>
      <span className={state === 'Attention' ? 'device-status attention' : 'device-status'}><i />{state}</span>
      {action ? <button className="secondary" onClick={action}>{state === 'Closed' ? 'Open' : 'Isolate'}</button> : <button className="secondary">View</button>}
    </article>
  );
}
