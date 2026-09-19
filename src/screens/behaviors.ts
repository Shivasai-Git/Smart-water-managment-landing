/**
 * Interactions from the Stitch exports' inline scripts, ported so each returns a cleanup
 * (safe under React StrictMode). They act on the DOM the screens render.
 */
type Cleanup = () => void;

const byId = <T extends HTMLElement = HTMLElement>(id: string) => document.getElementById(id) as T | null;

function listen(cleanups: Cleanup[], el: Element | null, type: string, fn: (e: Event) => void) {
  if (!el) return;
  el.addEventListener(type, fn);
  cleanups.push(() => el.removeEventListener(type, fn));
}

function later(cleanups: Cleanup[], fn: () => void, ms: number) {
  const id = window.setTimeout(fn, ms);
  cleanups.push(() => window.clearTimeout(id));
}

const done = (cleanups: Cleanup[]): Cleanup => () => cleanups.forEach((c) => c());

/** Wires the exports' `onclick="fn(args)"` attributes (kept as data-onclick) to handlers. */
function wireInline(cleanups: Cleanup[], handlers: Record<string, (el: HTMLElement, ...args: (string | number)[]) => void>) {
  document.querySelectorAll<HTMLElement>('[data-onclick]').forEach((el) => {
    const m = /^(\w+)\((.*)\)$/.exec(el.dataset.onclick ?? '');
    const fn = m && handlers[m[1]];
    if (!m || !fn) return;
    const args = m[2]
      .split(',')
      .map((a) => a.trim())
      .filter((a) => a && a !== 'this')
      .map((a) => (/^['"].*['"]$/.test(a) ? a.slice(1, -1) : Number(a)));
    listen(cleanups, el, 'click', () => fn(el, ...args));
  });
}

/* ------------------------------ My Home (spatial) ------------------------------ */

const VALVE_OPEN = 'valve-toggle-btn px-3 py-1 rounded-full bg-primary text-on-primary font-label-button text-label-button tracking-wider hover:opacity-90 active:scale-95 transition-all';
const VALVE_CLOSED = 'valve-toggle-btn px-3 py-1 rounded-full bg-surface-container-high text-on-surface font-label-button text-label-button tracking-wider hover:bg-surface-variant active:scale-95 transition-all';
const VALVE_ISOLATED = 'valve-toggle-btn px-3 py-1 rounded-full bg-error text-on-error font-label-button text-label-button tracking-wider active:scale-95 transition-all';
const CARD_ON = ['ring-2', 'ring-primary', 'bg-surface-container-lowest'];

export function setupHomeSpatial(): Cleanup {
  const cleanups: Cleanup[] = [];
  wireInline(cleanups, {
    switchFloor: (_el, floor) => {
      document.querySelectorAll('.floor-pill').forEach((btn) => {
        btn.classList.remove('bg-surface-container-lowest', 'text-on-surface', 'shadow-sm');
        btn.classList.add('text-on-surface-variant');
      });
      const active = byId('floor-btn-' + floor);
      active?.classList.remove('text-on-surface-variant');
      active?.classList.add('bg-surface-container-lowest', 'text-on-surface', 'shadow-sm');
    },
    selectZone: (_el, zone) => {
      for (let z = 1; z <= 5; z++) {
        const card = byId('card-zone-' + z);
        if (!card) continue;
        if (z === zone) {
          card.classList.add(...CARD_ON);
          card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        } else {
          card.classList.remove(...CARD_ON);
        }
      }
    },
    resetZoneZoom: () => {
      for (let z = 1; z <= 5; z++) byId('card-zone-' + z)?.classList.remove(...CARD_ON);
    },
    toggleValve: (btn) => {
      const closed = btn.innerText.trim() === 'OPEN';
      btn.innerText = closed ? 'CLOSED' : 'OPEN';
      btn.className = closed ? VALVE_CLOSED : VALVE_OPEN;
    },
    emergencyIsolationConfirm: () => {
      if (!window.confirm('Initiate EMERGENCY HYDRAULIC ISOLATION across all residential manifolds?')) return;
      document.querySelectorAll<HTMLElement>('.valve-toggle-btn').forEach((btn) => {
        btn.innerText = 'CLOSED';
        btn.className = VALVE_ISOLATED;
      });
    },
  });
  return done(cleanups);
}

/* ------------------------------ Water quality lab ------------------------------ */

export function setupQuality(): Cleanup {
  const cleanups: Cleanup[] = [];
  wireInline(cleanups, {
    setActiveRange: (_el, range) => {
      ['live', '24h', '30d'].forEach((t) => {
        const btn = byId('tab-' + t);
        if (!btn) return;
        btn.className =
          t === range
            ? 'px-4 py-1.5 rounded-full font-label-button text-label-button transition-all bg-surface-container-lowest text-on-surface shadow-sm'
            : 'px-4 py-1.5 rounded-full font-label-button text-label-button transition-all text-on-surface-variant hover:text-on-surface';
      });
    },
    triggerCalibration: () => {
      const icon = byId('calib-icon');
      const text = byId('calib-text');
      if (!icon || !text) return;
      icon.classList.add('animate-spin');
      text.innerText = 'Calibrating Optic Cells...';
      later(cleanups, () => {
        icon.classList.remove('animate-spin');
        text.innerText = 'Sensors Zeroed (0.00%)';
        later(cleanups, () => {
          text.innerText = 'Calibrate Sensors';
        }, 3000);
      }, 1600);
    },
  });
  return done(cleanups);
}

/* ------------------------------ Leakage & incident ------------------------------ */

export function setupAlerts(): Cleanup {
  const cleanups: Cleanup[] = [];
  const shutoff = byId('btn-emergency-shutoff');
  const modal = byId('modal-confirm');
  const testBtn = byId('btn-acoustic-test');
  const hide = () => {
    modal?.classList.add('hidden');
    modal?.classList.remove('flex');
  };

  listen(cleanups, shutoff, 'click', () => {
    modal?.classList.remove('hidden');
    modal?.classList.add('flex');
  });
  listen(cleanups, byId('btn-cancel-modal'), 'click', hide);
  listen(cleanups, byId('btn-confirm-modal'), 'click', () => {
    hide();
    if (shutoff) {
      shutoff.innerHTML = '<span class="material-symbols-outlined text-[18px]">lock</span><span>System Isolated</span>';
      shutoff.classList.replace('bg-primary', 'bg-error');
    }
  });
  listen(cleanups, testBtn, 'click', () => {
    if (!testBtn) return;
    const original = testBtn.innerHTML;
    testBtn.innerHTML = '<span class="material-symbols-outlined text-[18px] animate-spin">sync</span><span>Listening Pulse Sent...</span>';
    later(cleanups, () => {
      testBtn.innerHTML = '<span class="material-symbols-outlined text-[18px] text-secondary">check</span><span>Acoustic Grid Verified (0 dB Distortion)</span>';
      later(cleanups, () => {
        testBtn.innerHTML = original;
      }, 2400);
    }, 1200);
  });
  return done(cleanups);
}

/* ------------------------------ Pump & valve control ------------------------------ */

export function setupPumpValve(): Cleanup {
  const cleanups: Cleanup[] = [];

  const slider = byId<HTMLInputElement>('vfd-slider');
  const speed = byId('speed-val');
  listen(cleanups, slider, 'input', () => {
    if (slider && speed) speed.textContent = slider.value + '%';
  });

  const toggle = byId('btn-toggle-pmp1');
  let active = true;
  listen(cleanups, toggle, 'click', () => {
    if (!toggle) return;
    active = !active;
    if (!active) {
      toggle.innerHTML = '<span class="material-symbols-outlined text-[16px]">play_arrow</span><span>Start Motor</span>';
      toggle.classList.replace('bg-primary', 'bg-secondary');
    } else {
      toggle.innerHTML = '<span class="material-symbols-outlined text-[16px]">pause</span><span>Soft Stop</span>';
      toggle.classList.replace('bg-secondary', 'bg-primary');
    }
  });

  const interlock = byId('btn-interlock');
  listen(cleanups, interlock, 'click', () => {
    if (!interlock) return;
    if (window.confirm('Confirm Emergency Global Interlock? All 14 motorized valves and booster pumps will immediately isolate within 0.1s.')) {
      interlock.textContent = 'GLOBAL INTERLOCK ACTIVE';
      interlock.classList.add('animate-pulse');
    }
  });
  return done(cleanups);
}

/* ------------------------------ Tank monitoring ------------------------------ */

const PILL = 'time-pill px-3.5 py-1.5 rounded-full font-label-button text-label-button';

export function setupTank(): Cleanup {
  const cleanups: Cleanup[] = [];

  const toggle = byId('toggle-refill');
  const dot = byId('toggle-refill-dot');
  const status = byId('refill-status-text');
  let enabled = true;
  listen(cleanups, toggle, 'click', () => {
    if (!toggle || !dot || !status) return;
    enabled = !enabled;
    toggle.className = `relative inline-flex h-5 w-9 items-center rounded-full ${enabled ? 'bg-secondary' : 'bg-surface-container-highest'} transition-colors focus:outline-none`;
    dot.className = `inline-block h-3.5 w-3.5 transform rounded-full bg-surface-container-lowest transition-transform ${enabled ? 'translate-x-4' : 'translate-x-1'}`;
    status.textContent = enabled ? 'Enabled' : 'Standby';
    status.className = `font-body-sm text-body-sm font-medium ${enabled ? 'text-secondary' : 'text-on-surface-variant'}`;
  });

  const pills = document.querySelectorAll<HTMLElement>('.time-pill');
  pills.forEach((pill) => {
    listen(cleanups, pill, 'click', () => {
      pills.forEach((p) => {
        p.className = `${PILL} text-on-surface-variant hover:text-on-surface transition-all`;
      });
      pill.className = `${PILL} text-on-primary bg-primary transition-all`;
    });
  });

  const modal = byId('manual-fill-modal');
  const open = () => {
    modal?.classList.remove('hidden');
    modal?.classList.add('flex');
  };
  const close = () => {
    modal?.classList.add('hidden');
    modal?.classList.remove('flex');
  };
  listen(cleanups, byId('btn-manual-fill'), 'click', open);
  listen(cleanups, byId('close-modal'), 'click', close);
  listen(cleanups, byId('cancel-fill'), 'click', close);
  const confirm = byId('confirm-fill');
  listen(cleanups, confirm, 'click', () => {
    if (!confirm) return;
    confirm.textContent = 'Transfer Engaged';
    confirm.classList.add('bg-secondary');
    later(cleanups, () => {
      close();
      confirm.textContent = 'Start Cycle';
      confirm.classList.remove('bg-secondary');
    }, 1000);
  });
  return done(cleanups);
}

/* ------------------------------ Water usage & analytics ------------------------------ */

export function setupUsage(): Cleanup {
  const cleanups: Cleanup[] = [];

  const slider = byId<HTMLInputElement>('budgetSlider');
  const label = byId('budgetValue');
  listen(cleanups, slider, 'input', () => {
    if (slider && label) label.textContent = `${slider.value} L`;
  });

  const buttons = document.querySelectorAll<HTMLElement>('#period-toggle-group button');
  buttons.forEach((btn) => {
    listen(cleanups, btn, 'click', () => {
      buttons.forEach((b) => {
        b.className = 'px-3.5 py-1.5 rounded-full font-label-button text-label-button text-on-surface-variant hover:text-on-surface transition-all duration-200';
      });
      btn.className = 'px-3.5 py-1.5 rounded-full font-label-button text-label-button font-semibold bg-primary text-on-primary transition-all duration-200';
    });
  });
  return done(cleanups);
}

/* ------------------------------ Landing page ------------------------------ */

interface ZoneInfo {
  title: string;
  desc: string;
  status: string;
  pressure: string;
  jitter: string;
  tds: string;
  db: string;
}

const ZONES: Record<string, ZoneInfo> = {
  kitchen: { title: 'Kitchen & Utility Inflow • Normal', desc: 'Dedicated residential line equipped with pulse flow metering, section motorized shutoff valve, and local telemetry reporting.', status: 'Monitored', pressure: '2.1', jitter: 'Open', tds: 'None', db: 'Online' },
  bath1: { title: 'Bathroom 1 (Master En-suite) • Normal', desc: 'High-draw domestic supply branch monitored for unexpected continuous night flow and over-duration draw events.', status: 'Monitored', pressure: '1.8', jitter: 'Open', tds: 'None', db: 'Online' },
  bath2: { title: 'Bathroom 2 (Guest Bath) • Standby', desc: 'Monitored fixture supply branch with automated abnormal flow alert triggers and physical shutoff actuator.', status: 'Standby', pressure: '0.0', jitter: 'Open', tds: 'None', db: 'Online' },
  bath3: { title: 'Bathroom 3 (Upper Level) • Normal', desc: 'Gravity-fed upper residential branch tracking static line pressure and potential concealed joint leaks.', status: 'Monitored', pressure: '0.9', jitter: 'Open', tds: 'None', db: 'Online' },
  washing: { title: 'Washing Area & Laundry • Normal', desc: 'Appliance water feed line configured with automatic run-time threshold rules to guard against solenoid failures.', status: 'Monitored', pressure: '0.0', jitter: 'Open', tds: 'None', db: 'Online' },
  parking: { title: 'Parking & Exterior Wash Point • Standby', desc: 'Isolated exterior outlet with scheduled shutoff windows and pressure monitoring to prevent unauthorized draws.', status: 'Standby', pressure: '0.0', jitter: 'Closed', tds: 'None', db: 'Online' },
  garden: { title: 'Garden & Drip Irrigation • Scheduled', desc: 'Irrigation feed line integrating timed valve cycles with continuous volume recording to avoid over-watering.', status: 'Scheduled', pressure: '3.4', jitter: 'Active', tds: 'None', db: 'Online' },
};

interface CycleStep {
  gravity: number;
  cistern: number;
  pressure: string;
  flow: string;
  acoustic: string;
  wave: string;
}

const CYCLE: CycleStep[] = [
  { gravity: 78, cistern: 64, pressure: '2.4', flow: '4.6', acoustic: 'Connected', wave: 'M0,120 Q60,115 120,70 T240,40 T360,50 T480,95 T600,85' },
  { gravity: 88, cistern: 55, pressure: '2.6', flow: '6.8', acoustic: 'Active (48s)', wave: 'M0,100 Q60,85 120,40 T240,25 T360,35 T480,75 T600,60' },
  { gravity: 62, cistern: 82, pressure: '2.2', flow: '1.2', acoustic: 'Standby', wave: 'M0,135 Q60,130 120,110 T240,85 T360,95 T480,120 T600,115' },
];

export function setupLanding(): Cleanup {
  const cleanups: Cleanup[] = [];
  const set = (id: string, text: string) => {
    const el = byId(id);
    if (el) el.innerText = text;
  };

  let step = 0;
  listen(cleanups, byId('system-cycle-btn'), 'click', () => {
    step = (step + 1) % CYCLE.length;
    const s = CYCLE[step];
    const gravity = byId('tank-gravity');
    const cistern = byId('tank-cistern');
    if (gravity) gravity.style.height = `${s.gravity}%`;
    if (cistern) cistern.style.height = `${s.cistern}%`;
    set('val-gravity', `${s.gravity}% (Simulated)`);
    set('val-cistern', `${s.cistern}% (Simulated)`);
    set('tele-pressure', s.pressure);
    set('tele-flow', s.flow);
    set('tele-acoustic', s.acoustic);
    byId('telemetry-wave')?.setAttribute('d', s.wave);
  });

  const buttons = document.querySelectorAll<HTMLElement>('.topology-btn');
  buttons.forEach((btn) => {
    listen(cleanups, btn, 'click', () => {
      const data = ZONES[btn.dataset.zone ?? ''];
      if (!data) return;
      buttons.forEach((b) => {
        b.classList.remove('bg-primary', 'text-on-primary');
        b.classList.add('bg-surface-container', 'text-on-surface');
      });
      btn.classList.remove('bg-surface-container', 'text-on-surface');
      btn.classList.add('bg-primary', 'text-on-primary');
      set('zone-display-title', data.title);
      set('zone-desc', data.desc);
      set('zone-status', data.status);
      set('zone-pressure', data.pressure);
      set('zone-jitter', data.jitter);
      set('zone-tds', data.tds);
      set('zone-db', data.db);
      document.querySelectorAll('#zone-map [data-zid]').forEach((g) => g.classList.toggle('is-active', g.getAttribute('data-zid') === btn.dataset.zone));
    });
  });

  const form = byId('estate-intake-form');
  listen(cleanups, form, 'submit', (e) => {
    e.preventDefault();
    byId('intake-success')?.classList.remove('hidden');
    form?.classList.add('hidden');
  });
  return done(cleanups);
}
