# Residential Monitoring Platform Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the Smart Water Flow app from the generic "Aquasight" campus demo into the residential monitoring/control platform described in the developer handoff report, restore the dormant marketing landing page as the public site, and gate the customer/admin app behind a simulated login.

**Architecture:** `react-router-dom` routes: `/` (existing marketing components, restored as-is), `/login` (simulated auth), `/app/*` (customer shell + 11 pages), `/admin/*` (admin shell + 5 pages). All data comes from a typed fixture layer under `src/data/`; two React contexts (`auth`, `scenario`) drive role state and the normal→leak→contained demo narrative. Styling is Tailwind utility classes against the landing page's existing `ink/ink2/aqua/mist/steel/saffron` theme, extended with two new tokens (`good`, `danger`).

**Tech Stack:** React 19, TypeScript, Vite, Tailwind CSS, react-router-dom (new dependency). No test framework is added — this is a frontend-only demo with no backend, so verification is `tsc -b` (type check), `oxlint` (lint), and manual dev-server checks, per the spec.

**Spec:** `docs/superpowers/specs/2026-09-18-residential-monitoring-platform-design.md`

## Global Constraints

- No real backend, auth, database, or device protocol — everything is simulated fixture data (spec "Non-goals").
- Every reading/alert/command carries `dataSource: 'simulated'` and the UI never claims certainty it doesn't have: leaks are "possible leak," not confirmed.
- Commands (pump/valve) always render `pending` before `acknowledged`/`failed`/`timed-out` — never instant success on click.
- Water-quality copy never claims water is "safe to drink" from pH/TDS/turbidity alone.
- Status is always color + icon + word together, never color alone.
- No ALL-CAPS eyebrow labels, no middot-joined meta strings (`A · B · C`), no arrow-suffixed button text, no identical drop-shadow card grids.
- Tailwind theme tokens only for color (`ink`, `ink2`, `aqua`, `mist`, `steel`, `saffron`, `good`, `danger`) — no new hex literals scattered in components.
- Three font roles only: `font-display` (Bricolage Grotesque, headlines/hero numbers), `font-mono` (IBM Plex Mono, live sensor readouts only), `font-body` (IBM Plex Sans, everything else).
- Commerce/shop/service-booking (report §20–22) is out of scope for this plan.
- Every `git commit` step uses the message format and trailer already used in this repo's history; end commit messages with `Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>`.

---

## Task 1: Add react-router-dom and fix missing font links

**Files:**
- Modify: `package.json`
- Modify: `index.html`
- Modify: `src/index.css`

**Interfaces:**
- Produces: `react-router-dom` available for import in all later tasks.

- [ ] **Step 1: Install the dependency**

Run: `npm install react-router-dom`

- [ ] **Step 2: Verify it installed**

Run: `node -e "console.log(require('react-router-dom/package.json').version)"`
Expected: prints a version string (6.x or 7.x), no error.

- [ ] **Step 3: Fix missing font links in index.html**

`tailwind.config.js` declares `font-display: "Bricolage Grotesque"` and `font-body: "IBM Plex Sans"`, but `index.html` only loads Inter and IBM Plex Mono — so the landing page has been silently falling back to system fonts. Replace the `<link>` block and `<title>`:

```html
<!doctype html>
<html lang="en" class="scroll-smooth">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Smart Water Flow — intelligent water management</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@400;500;600;700;800&family=IBM+Plex+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap"
      rel="stylesheet"
    />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

- [ ] **Step 4: Fix the body font and color-scheme in index.css**

`src/index.css` currently hardcodes `font-family: "Inter", ...` and `color-scheme: light`, which is wrong for a navy-themed dark app. Replace the `body`/`html` rules:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
* { box-sizing: border-box; }
html { color-scheme: dark; }
body { margin: 0; min-width: 320px; background: #04121E; color: #E4EFFA; font-family: "IBM Plex Sans", ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; -webkit-font-smoothing: antialiased; text-rendering: optimizeLegibility; }
button { font: inherit; }
::selection { background: #3FA9F0; color: #04121E; }
```

- [ ] **Step 5: Verify the app still builds**

Run: `npm run build`
Expected: exits 0, no TypeScript or Vite errors.

- [ ] **Step 6: Commit**

```bash
git add package.json package-lock.json index.html src/index.css
git commit -m "$(cat <<'EOF'
fix: load Bricolage Grotesque/Plex Sans fonts, add react-router-dom

The landing page's Tailwind theme declared font-display and font-body
families that were never loaded, so headings and body text silently
fell back to system fonts. Also switches the base page to the dark
navy theme and adds react-router-dom for the upcoming route tree.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

## Task 2: Extend the Tailwind theme with status tokens

**Files:**
- Modify: `tailwind.config.js`

**Interfaces:**
- Consumes: existing `theme.extend.colors` (`ink`, `ink2`, `mist`, `steel`, `aqua`, `saffron`).
- Produces: `good` (`#57C2A0`) and `danger` (`#FF6B5B`) Tailwind color tokens, usable as `bg-good`, `text-danger`, etc. in every later task.

- [ ] **Step 1: Add the two tokens**

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#04121E',
        ink2: '#0A2135',
        mist: '#E4EFFA',
        steel: '#7C99BA',
        aqua: '#3FA9F0',
        saffron: '#FFA03C',
        good: '#57C2A0',
        danger: '#FF6B5B',
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"', 'sans-serif'],
        body: ['"IBM Plex Sans"', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      maxWidth: {
        shell: '1180px',
      },
    },
  },
  plugins: [],
}
```

- [ ] **Step 2: Verify Tailwind picks up the new tokens**

Run: `npm run build`
Expected: exits 0. (Tailwind only errors on invalid config, not unused tokens.)

- [ ] **Step 3: Commit**

```bash
git add tailwind.config.js
git commit -m "$(cat <<'EOF'
feat: add good/danger status color tokens to the theme

The dashboard needs a normal/good status color distinct from the aqua
accent, and a critical-alert red distinct from the existing saffron
warning tone.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

## Task 3: Data model types

**Files:**
- Create: `src/data/types.ts`

**Interfaces:**
- Produces: `Property`, `Section`, `SectionId`, `Device`, `SensorReading`, `Alert`, `AlertSeverity`, `CommandStatus`, `Command`, `PumpRun`, `AuditLogEntry`, `QualityMetric`, `AdminCustomer` types, imported by every fixture and page task below.

- [ ] **Step 1: Write the types**

```typescript
// src/data/types.ts
export type SectionId =
  | 'bathroom-1'
  | 'bathroom-2'
  | 'bathroom-3'
  | 'kitchen'
  | 'washing-area'
  | 'parking'
  | 'garden';

export interface Section {
  id: SectionId;
  name: string;
  flowLpm: number;
  status: 'nominal' | 'idle' | 'attention' | 'offline';
  valveState: 'open' | 'closed' | 'auto';
  lastEventAt: string | null;
  dataSource: 'simulated';
}

export interface Property {
  id: string;
  name: string;
  ownerName: string;
  timezone: string;
  dataSource: 'simulated';
}

export type DeviceStatus = 'online' | 'offline' | 'attention';

export interface Device {
  id: string;
  type: 'flow-sensor' | 'tank-level' | 'quality-probe' | 'valve-controller' | 'pump-controller' | 'gateway';
  label: string;
  sectionId: SectionId | null;
  status: DeviceStatus;
  lastSeen: string;
  firmwareVersion: string;
  dataSource: 'simulated';
}

export interface SensorReading {
  id: string;
  deviceId: string;
  metric: string;
  value: number;
  unit: string;
  timestamp: string;
  qualityFlag: 'good' | 'stale' | 'fault';
  dataSource: 'simulated';
}

export type AlertSeverity = 'low' | 'medium' | 'high';
export type AlertStatus = 'open' | 'acknowledged' | 'resolved';

export interface Alert {
  id: string;
  sectionId: SectionId;
  severity: AlertSeverity;
  status: AlertStatus;
  title: string;
  evidence: string;
  openedAt: string;
  acknowledgedAt: string | null;
  resolvedAt: string | null;
  dataSource: 'simulated';
}

export type CommandStatus = 'pending' | 'acknowledged' | 'failed' | 'timed-out';

export interface Command {
  id: string;
  targetId: string;
  action: 'open-valve' | 'close-valve' | 'start-pump' | 'stop-pump';
  requestedBy: string;
  requestedAt: string;
  status: CommandStatus;
  acknowledgedAt: string | null;
  failureReason: string | null;
  dataSource: 'simulated';
}

export interface PumpRun {
  id: string;
  pumpId: string;
  startedAt: string;
  stoppedAt: string | null;
  durationMinutes: number | null;
  stopReason: string | null;
  fault: boolean;
  dataSource: 'simulated';
}

export interface AuditLogEntry {
  id: string;
  actor: string;
  action: string;
  target: string;
  timestamp: string;
  result: 'success' | 'failed';
  dataSource: 'simulated';
}

export interface QualityMetric {
  id: string;
  label: string;
  value: number;
  unit: string;
  targetRange: string;
  status: 'good' | 'attention';
  timestamp: string;
  dataSource: 'simulated';
}

export interface AdminCustomer {
  id: string;
  name: string;
  propertyName: string;
  status: 'active' | 'pending' | 'suspended';
  deviceCount: number;
  joinedAt: string;
  dataSource: 'simulated';
}
```

- [ ] **Step 2: Verify it type-checks in isolation**

Run: `npx tsc --noEmit src/data/types.ts --strict --skipLibCheck`
Expected: exits 0, no errors.

- [ ] **Step 3: Commit**

```bash
git add src/data/types.ts
git commit -m "$(cat <<'EOF'
feat: add data model types for the residential platform

Mirrors the handoff report's suggested data model (Property, Section,
Device, SensorReading, Alert, Command, PumpRun, AuditLog) so every
fixture and page shares one typed vocabulary.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

## Task 4: Section and device fixtures

**Files:**
- Create: `src/data/fixtures/sections.ts`
- Create: `src/data/fixtures/devices.ts`

**Interfaces:**
- Consumes: `Section`, `SectionId`, `Device` from `src/data/types.ts` (Task 3).
- Produces: `sections: Section[]`, `sectionById(id: SectionId): Section | undefined`, `devices: Device[]` — read by the scenario context (Task 10), Dashboard, Sections, Devices, and Admin pages.

- [ ] **Step 1: Write the section fixtures**

```typescript
// src/data/fixtures/sections.ts
import type { Section, SectionId } from '../types';

export const sections: Section[] = [
  { id: 'kitchen', name: 'Kitchen', flowLpm: 4.6, status: 'nominal', valveState: 'auto', lastEventAt: null, dataSource: 'simulated' },
  { id: 'bathroom-1', name: 'Bathroom 1', flowLpm: 0, status: 'idle', valveState: 'auto', lastEventAt: null, dataSource: 'simulated' },
  { id: 'bathroom-2', name: 'Bathroom 2', flowLpm: 0, status: 'idle', valveState: 'auto', lastEventAt: null, dataSource: 'simulated' },
  { id: 'bathroom-3', name: 'Bathroom 3', flowLpm: 0, status: 'offline', valveState: 'auto', lastEventAt: '2026-09-16T09:12:00+05:30', dataSource: 'simulated' },
  { id: 'washing-area', name: 'Washing Area', flowLpm: 6.1, status: 'nominal', valveState: 'auto', lastEventAt: null, dataSource: 'simulated' },
  { id: 'garden', name: 'Garden', flowLpm: 0, status: 'idle', valveState: 'closed', lastEventAt: null, dataSource: 'simulated' },
  { id: 'parking', name: 'Parking', flowLpm: 0, status: 'idle', valveState: 'auto', lastEventAt: null, dataSource: 'simulated' },
];

export function sectionById(id: SectionId): Section | undefined {
  return sections.find((s) => s.id === id);
}
```

- [ ] **Step 2: Write the device fixtures**

```typescript
// src/data/fixtures/devices.ts
import type { Device } from '../types';

export const devices: Device[] = [
  { id: 'FS-KIT-01', type: 'flow-sensor', label: 'Kitchen flow sensor', sectionId: 'kitchen', status: 'online', lastSeen: '12 sec ago', firmwareVersion: '1.4.2', dataSource: 'simulated' },
  { id: 'FS-BTH1-01', type: 'flow-sensor', label: 'Bathroom 1 flow sensor', sectionId: 'bathroom-1', status: 'online', lastSeen: '18 sec ago', firmwareVersion: '1.4.2', dataSource: 'simulated' },
  { id: 'FS-BTH2-01', type: 'flow-sensor', label: 'Bathroom 2 flow sensor', sectionId: 'bathroom-2', status: 'online', lastSeen: '20 sec ago', firmwareVersion: '1.4.2', dataSource: 'simulated' },
  { id: 'FS-BTH3-01', type: 'flow-sensor', label: 'Bathroom 3 flow sensor', sectionId: 'bathroom-3', status: 'offline', lastSeen: '2 days ago', firmwareVersion: '1.3.9', dataSource: 'simulated' },
  { id: 'FS-WSH-01', type: 'flow-sensor', label: 'Washing area flow sensor', sectionId: 'washing-area', status: 'online', lastSeen: '9 sec ago', firmwareVersion: '1.4.2', dataSource: 'simulated' },
  { id: 'FS-GDN-01', type: 'flow-sensor', label: 'Garden flow sensor', sectionId: 'garden', status: 'online', lastSeen: '15 sec ago', firmwareVersion: '1.4.2', dataSource: 'simulated' },
  { id: 'FS-PRK-01', type: 'flow-sensor', label: 'Parking flow sensor', sectionId: 'parking', status: 'online', lastSeen: '11 sec ago', firmwareVersion: '1.4.2', dataSource: 'simulated' },
  { id: 'TL-SUMP-01', type: 'tank-level', label: 'Sump level sensor', sectionId: null, status: 'online', lastSeen: '6 sec ago', firmwareVersion: '1.2.0', dataSource: 'simulated' },
  { id: 'TL-OHT-01', type: 'tank-level', label: 'Overhead tank level sensor', sectionId: null, status: 'online', lastSeen: '6 sec ago', firmwareVersion: '1.2.0', dataSource: 'simulated' },
  { id: 'WQ-INL-01', type: 'quality-probe', label: 'Inlet quality probe', sectionId: null, status: 'online', lastSeen: '30 sec ago', firmwareVersion: '2.0.1', dataSource: 'simulated' },
  { id: 'VC-KIT-01', type: 'valve-controller', label: 'Kitchen valve controller', sectionId: 'kitchen', status: 'attention', lastSeen: '1 min ago', firmwareVersion: '1.1.5', dataSource: 'simulated' },
  { id: 'PC-MAIN-01', type: 'pump-controller', label: 'Main pump controller', sectionId: null, status: 'online', lastSeen: '4 sec ago', firmwareVersion: '1.5.0', dataSource: 'simulated' },
  { id: 'GW-HOME-01', type: 'gateway', label: 'Home gateway', sectionId: null, status: 'online', lastSeen: '2 sec ago', firmwareVersion: '3.1.0', dataSource: 'simulated' },
];
```

- [ ] **Step 3: Verify type-check**

Run: `npx tsc --noEmit src/data/fixtures/sections.ts src/data/fixtures/devices.ts --strict --skipLibCheck --esModuleInterop`
Expected: exits 0.

- [ ] **Step 4: Commit**

```bash
git add src/data/fixtures/sections.ts src/data/fixtures/devices.ts
git commit -m "$(cat <<'EOF'
feat: add section and device fixtures for the 7 residential sections

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

## Task 5: Tank, quality, and alert fixtures

**Files:**
- Create: `src/data/fixtures/tank.ts`
- Create: `src/data/fixtures/quality.ts`
- Create: `src/data/fixtures/alerts.ts`

**Interfaces:**
- Consumes: `SensorReading`, `QualityMetric`, `Alert` from `src/data/types.ts` (Task 3).
- Produces: `sumpLevel`, `overheadTankLevel` (`SensorReading`), `qualityMetrics: QualityMetric[]`, `alerts: Alert[]` — read by Tank, Quality, Alerts, Dashboard, and Admin pages.

- [ ] **Step 1: Write the tank fixtures**

```typescript
// src/data/fixtures/tank.ts
import type { SensorReading } from '../types';

export const sumpLevel: SensorReading = {
  id: 'reading-sump-01',
  deviceId: 'TL-SUMP-01',
  metric: 'tank-level-percent',
  value: 68,
  unit: '%',
  timestamp: '2026-09-18T08:14:00+05:30',
  qualityFlag: 'good',
  dataSource: 'simulated',
};

export const overheadTankLevel: SensorReading = {
  id: 'reading-oht-01',
  deviceId: 'TL-OHT-01',
  metric: 'tank-level-percent',
  value: 82,
  unit: '%',
  timestamp: '2026-09-18T08:14:00+05:30',
  qualityFlag: 'good',
  dataSource: 'simulated',
};

export const tankThresholds = {
  lowPercent: 20,
  highPercent: 95,
};
```

- [ ] **Step 2: Write the quality fixtures**

```typescript
// src/data/fixtures/quality.ts
import type { QualityMetric } from '../types';

export const qualityMetrics: QualityMetric[] = [
  { id: 'q-ph', label: 'pH', value: 7.2, unit: '', targetRange: '6.5 – 8.5', status: 'good', timestamp: '2026-09-18T08:10:00+05:30', dataSource: 'simulated' },
  { id: 'q-tds', label: 'TDS', value: 340, unit: 'ppm', targetRange: '0 – 500 ppm', status: 'good', timestamp: '2026-09-18T08:10:00+05:30', dataSource: 'simulated' },
  { id: 'q-turbidity', label: 'Turbidity', value: 1.8, unit: 'NTU', targetRange: '0 – 5 NTU', status: 'good', timestamp: '2026-09-18T08:10:00+05:30', dataSource: 'simulated' },
  { id: 'q-temp', label: 'Temperature', value: 26.4, unit: '°C', targetRange: '20 – 30°C', status: 'good', timestamp: '2026-09-18T08:10:00+05:30', dataSource: 'simulated' },
];

export const calibrationReminder = {
  deviceLabel: 'Inlet quality probe (WQ-INL-01)',
  dueInDays: 12,
};
```

- [ ] **Step 3: Write the alert fixtures**

```typescript
// src/data/fixtures/alerts.ts
import type { Alert } from '../types';

export const baselineAlerts: Alert[] = [
  {
    id: 'alert-01',
    sectionId: 'bathroom-3',
    severity: 'medium',
    status: 'open',
    title: 'Bathroom 3 sensor offline',
    evidence: 'No telemetry from FS-BTH3-01 for 2 days.',
    openedAt: '2026-09-16T09:12:00+05:30',
    acknowledgedAt: null,
    resolvedAt: null,
    dataSource: 'simulated',
  },
];

export const leakAlert: Alert = {
  id: 'alert-leak-kitchen',
  sectionId: 'kitchen',
  severity: 'high',
  status: 'open',
  title: 'Possible leak — Kitchen line',
  evidence: 'Continuous flow of 42.8 L/min for 18 minutes during an expected low-use period. No corresponding fixture activity logged.',
  openedAt: '',
  acknowledgedAt: null,
  resolvedAt: null,
  dataSource: 'simulated',
};
```

- [ ] **Step 4: Verify type-check**

Run: `npx tsc --noEmit src/data/fixtures/tank.ts src/data/fixtures/quality.ts src/data/fixtures/alerts.ts --strict --skipLibCheck --esModuleInterop`
Expected: exits 0.

- [ ] **Step 5: Commit**

```bash
git add src/data/fixtures/tank.ts src/data/fixtures/quality.ts src/data/fixtures/alerts.ts
git commit -m "$(cat <<'EOF'
feat: add tank, water-quality, and alert fixtures

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

## Task 6: Admin fixtures (customers, audit log)

**Files:**
- Create: `src/data/fixtures/admin.ts`

**Interfaces:**
- Consumes: `AdminCustomer`, `AuditLogEntry` from `src/data/types.ts` (Task 3).
- Produces: `adminCustomers: AdminCustomer[]`, `auditLog: AuditLogEntry[]` — read by the Admin pages (Task 24-26).

- [ ] **Step 1: Write the fixtures**

```typescript
// src/data/fixtures/admin.ts
import type { AdminCustomer, AuditLogEntry } from '../types';

export const adminCustomers: AdminCustomer[] = [
  { id: 'cust-01', name: 'L. Pranay Kumar Goud', propertyName: 'Founder residence', status: 'active', deviceCount: 13, joinedAt: '2026-06-02', dataSource: 'simulated' },
  { id: 'cust-02', name: 'Asha Reddy', propertyName: 'Lakeview apartment', status: 'active', deviceCount: 9, joinedAt: '2026-07-14', dataSource: 'simulated' },
  { id: 'cust-03', name: 'Vikram Shah', propertyName: 'Whitefield villa', status: 'pending', deviceCount: 0, joinedAt: '2026-09-10', dataSource: 'simulated' },
];

export const auditLog: AuditLogEntry[] = [
  { id: 'audit-01', actor: 'admin:priya.k', action: 'Assigned device VC-KIT-01', target: 'cust-01', timestamp: '2026-09-17T11:02:00+05:30', result: 'success', dataSource: 'simulated' },
  { id: 'audit-02', actor: 'customer:cust-01', action: 'Requested close valve VC-KIT-01', target: 'VC-KIT-01', timestamp: '2026-09-18T08:16:00+05:30', result: 'success', dataSource: 'simulated' },
  { id: 'audit-03', actor: 'admin:priya.k', action: 'Registered property Whitefield villa', target: 'cust-03', timestamp: '2026-09-10T14:20:00+05:30', result: 'success', dataSource: 'simulated' },
];
```

- [ ] **Step 2: Verify type-check**

Run: `npx tsc --noEmit src/data/fixtures/admin.ts --strict --skipLibCheck --esModuleInterop`
Expected: exits 0.

- [ ] **Step 3: Commit**

```bash
git add src/data/fixtures/admin.ts
git commit -m "$(cat <<'EOF'
feat: add admin customer and audit-log fixtures

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

## Task 7: Auth context

**Files:**
- Create: `src/state/auth.tsx`

**Interfaces:**
- Produces: `AuthProvider` (React component), `useAuth()` returning `{ role: 'customer' | 'admin' | null; signedIn: boolean; signIn: () => void; switchRole: () => void; signOut: () => void }` — consumed by Task 11 (router), Task 13 (login), Task 14 (shells).

- [ ] **Step 1: Write the context**

```tsx
// src/state/auth.tsx
import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';

type Role = 'customer' | 'admin';

interface AuthState {
  role: Role | null;
  signedIn: boolean;
  signIn: () => void;
  switchRole: () => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<Role | null>(null);
  const [signedIn, setSignedIn] = useState(false);

  const value = useMemo<AuthState>(
    () => ({
      role,
      signedIn,
      signIn: () => {
        setRole('customer');
        setSignedIn(true);
      },
      switchRole: () => setRole((r) => (r === 'admin' ? 'customer' : 'admin')),
      signOut: () => {
        setRole(null);
        setSignedIn(false);
      },
    }),
    [role, signedIn],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthState {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
```

- [ ] **Step 2: Verify type-check**

Run: `npx tsc --noEmit --jsx react-jsx src/state/auth.tsx --strict --skipLibCheck --esModuleInterop`
Expected: exits 0.

- [ ] **Step 3: Commit**

```bash
git add src/state/auth.tsx
git commit -m "$(cat <<'EOF'
feat: add auth context for simulated login and role switching

No real backend session exists in this demo, so signing in just sets
role/signedIn state; a role switcher toggles customer/admin for
demo purposes.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

## Task 8: Scenario context

**Files:**
- Create: `src/state/scenario.tsx`

**Interfaces:**
- Consumes: `sections`, `sectionById` from `src/data/fixtures/sections.ts` (Task 4); `leakAlert` from `src/data/fixtures/alerts.ts` (Task 5); `SectionId`, `Command`, `CommandStatus` from `src/data/types.ts` (Task 3).
- Produces: `ScenarioProvider`, `useScenario()` returning `{ phase: 'normal' | 'leak' | 'contained'; affectedSectionId: SectionId; sections: Section[]; activeAlert: Alert | null; lastCommand: Command | null; runIncidentDemo: () => void; requestCloseValve: (sectionId: SectionId) => void; reset: () => void }` — consumed by Dashboard, Sections, Alerts, Valves, Pump pages (Tasks 16-23).

- [ ] **Step 1: Write the context**

```tsx
// src/state/scenario.tsx
import { createContext, useContext, useMemo, useRef, useState, type ReactNode } from 'react';
import { sections as baseSections } from '../data/fixtures/sections';
import { leakAlert } from '../data/fixtures/alerts';
import type { Alert, Command, Section, SectionId } from '../data/types';

type Phase = 'normal' | 'leak' | 'contained';

interface ScenarioState {
  phase: Phase;
  affectedSectionId: SectionId;
  sections: Section[];
  activeAlert: Alert | null;
  lastCommand: Command | null;
  runIncidentDemo: () => void;
  requestCloseValve: (sectionId: SectionId) => void;
  reset: () => void;
}

const AFFECTED: SectionId = 'kitchen';
const ScenarioContext = createContext<ScenarioState | null>(null);

export function ScenarioProvider({ children }: { children: ReactNode }) {
  const [phase, setPhase] = useState<Phase>('normal');
  const [lastCommand, setLastCommand] = useState<Command | null>(null);
  const commandCounter = useRef(0);

  const sections = useMemo<Section[]>(
    () =>
      baseSections.map((s) =>
        s.id !== AFFECTED
          ? s
          : {
              ...s,
              flowLpm: phase === 'leak' ? 42.8 : phase === 'contained' ? 0 : s.flowLpm,
              status: phase === 'leak' ? 'attention' : phase === 'contained' ? 'idle' : s.status,
              valveState: phase === 'contained' ? 'closed' : s.valveState,
            },
      ),
    [phase],
  );

  const activeAlert = useMemo<Alert | null>(
    () => (phase === 'normal' ? null : { ...leakAlert, openedAt: '2026-09-18T08:16:00+05:30' }),
    [phase],
  );

  const runIncidentDemo = () => setPhase((p) => (p === 'normal' ? 'leak' : p === 'leak' ? 'contained' : 'normal'));

  const requestCloseValve = (sectionId: SectionId) => {
    commandCounter.current += 1;
    const id = `cmd-${commandCounter.current}`;
    setLastCommand({
      id,
      targetId: sectionId,
      action: 'close-valve',
      requestedBy: 'customer:demo-user',
      requestedAt: new Date().toISOString(),
      status: 'pending',
      acknowledgedAt: null,
      failureReason: null,
      dataSource: 'simulated',
    });
    setTimeout(() => {
      setLastCommand((cmd) =>
        cmd && cmd.id === id ? { ...cmd, status: 'acknowledged', acknowledgedAt: new Date().toISOString() } : cmd,
      );
      setPhase('contained');
    }, 1200);
  };

  const reset = () => {
    setPhase('normal');
    setLastCommand(null);
  };

  const value: ScenarioState = { phase, affectedSectionId: AFFECTED, sections, activeAlert, lastCommand, runIncidentDemo, requestCloseValve, reset };

  return <ScenarioContext.Provider value={value}>{children}</ScenarioContext.Provider>;
}

export function useScenario(): ScenarioState {
  const ctx = useContext(ScenarioContext);
  if (!ctx) throw new Error('useScenario must be used within ScenarioProvider');
  return ctx;
}
```

- [ ] **Step 2: Verify type-check**

Run: `npx tsc --noEmit --jsx react-jsx src/state/scenario.tsx --strict --skipLibCheck --esModuleInterop`
Expected: exits 0.

- [ ] **Step 3: Commit**

```bash
git add src/state/scenario.tsx
git commit -m "$(cat <<'EOF'
feat: add scenario context driving the normal-leak-contained demo

Replaces the old campus-demo's local useState with a shared context
so Dashboard, Sections, Alerts, and Valve Control all reflect the same
incident narrative. Valve-close commands go through a pending step
before resolving, per the report's command-lifecycle requirement.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

## Task 9: Icon set and StatusPill

**Files:**
- Create: `src/components/ui/icons.tsx`
- Create: `src/components/ui/StatusPill.tsx`

**Interfaces:**
- Produces: `Icon` components (`IconGrid`, `IconDroplet`, `IconAlertTriangle`, `IconGauge`, `IconHouse`, `IconValve`, `IconBell`, `IconSettings`, `IconLogout`, `IconCheck`, `IconChevronDown`, `IconChevronRight`, `IconFilter`, `IconCalendar`, `IconExport`, `IconPlus`, `IconRadio`, `IconFileText`); `StatusPill` component with props `{ tone: 'good' | 'attention' | 'danger' | 'idle'; label: string }` — consumed by every page task below.

- [ ] **Step 1: Write the icon helper (adapted from the old App.tsx, plus two new icons)**

```tsx
// src/components/ui/icons.tsx
type IconProps = { size?: number; className?: string };

function icon(paths: JSX.Element) {
  return function IconComponent({ size = 16, className }: IconProps) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
        {paths}
      </svg>
    );
  };
}

export const IconGrid = icon(<><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></>);
export const IconDroplet = icon(<path d="M12 2.5c3.6 4.4 7 8.7 7 12.4a7 7 0 1 1-14 0c0-3.7 3.4-8 7-12.4Z" />);
export const IconAlertTriangle = icon(<><path d="M10.7 3.5 2.3 18a1.6 1.6 0 0 0 1.4 2.4h16.6a1.6 1.6 0 0 0 1.4-2.4L13.3 3.5a1.6 1.6 0 0 0-2.6 0Z" /><line x1="12" y1="9.5" x2="12" y2="13.5" /><circle cx="12" cy="16.7" r=".9" fill="currentColor" stroke="none" /></>);
export const IconGauge = icon(<><path d="M4 15.5a8 8 0 1 1 16 0" /><line x1="12" y1="15.5" x2="15.5" y2="10.5" /><circle cx="12" cy="15.5" r="1.1" fill="currentColor" stroke="none" /></>);
export const IconHouse = icon(<><path d="M4 11.5 12 4l8 7.5" /><path d="M6 10v9.5h12V10" /><path d="M10 19.5v-6h4v6" /></>);
export const IconValve = icon(<><circle cx="12" cy="12" r="8.5" /><path d="M12 4v3M12 17v3M4 12h3M17 12h3M6.5 6.5l2 2M15.5 15.5l2 2M17.5 6.5l-2 2M8.5 15.5l-2 2" /></>);
export const IconBell = icon(<><path d="M6 9.5a6 6 0 0 1 12 0c0 4.5 1.5 6 1.5 6h-15s1.5-1.5 1.5-6Z" /><path d="M10 19a2 2 0 0 0 4 0" /></>);
export const IconSettings = icon(<><circle cx="12" cy="12" r="3" /><path d="M19.4 13.5a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.9 2.9l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6V20a2 2 0 1 1-4 0v-.2a1.7 1.7 0 0 0-1.1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 1 1-2.9-2.9l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.6-1H4a2 2 0 1 1 0-4h.2a1.7 1.7 0 0 0 1.6-1.1 1.7 1.7 0 0 0-.3-1.9l-.1-.1a2 2 0 1 1 2.9-2.9l.1.1a1.7 1.7 0 0 0 1.9.3H10.5a1.7 1.7 0 0 0 1-1.6V4a2 2 0 1 1 4 0v.2a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1a2 2 0 1 1 2.9 2.9l-.1.1a1.7 1.7 0 0 0-.3 1.9V10.5a1.7 1.7 0 0 0 1.6 1H20a2 2 0 1 1 0 4h-.2a1.7 1.7 0 0 0-1.6 1Z" /></>);
export const IconLogout = icon(<><path d="M9 21H5.5A1.5 1.5 0 0 1 4 19.5v-15A1.5 1.5 0 0 1 5.5 3H9" /><path d="M15.5 16 20 12l-4.5-4" /><line x1="20" y1="12" x2="9" y2="12" /></>);
export const IconCheck = icon(<polyline points="4,13 9,18 20,6" />);
export const IconChevronDown = icon(<polyline points="6,9 12,15 18,9" />);
export const IconChevronRight = icon(<polyline points="9,6 15,12 9,18" />);
export const IconFilter = icon(<path d="M4 5h16l-6 7.5V19l-4 2v-8.5Z" />);
export const IconCalendar = icon(<><rect x="3.5" y="5" width="17" height="15.5" rx="2" /><line x1="3.5" y1="9.5" x2="20.5" y2="9.5" /><line x1="8" y1="3" x2="8" y2="6.5" /><line x1="16" y1="3" x2="16" y2="6.5" /></>);
export const IconExport = icon(<><path d="M12 16V4M8 8l4-4 4 4" /><path d="M4 15v3.5A1.5 1.5 0 0 0 5.5 20h13a1.5 1.5 0 0 0 1.5-1.5V15" /></>);
export const IconPlus = icon(<><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></>);
export const IconRadio = icon(<><circle cx="12" cy="12" r="2" fill="currentColor" stroke="none" /><path d="M8.5 8.5a5 5 0 0 0 0 7M15.5 8.5a5 5 0 0 1 0 7M5.3 5.3a9.5 9.5 0 0 0 0 13.4M18.7 5.3a9.5 9.5 0 0 1 0 13.4" /></>);
export const IconFileText = icon(<><path d="M6 3.5h9l4 4v13H6Z" /><line x1="9" y1="12" x2="15" y2="12" /><line x1="9" y1="15.5" x2="15" y2="15.5" /></>);
```

- [ ] **Step 2: Write StatusPill**

```tsx
// src/components/ui/StatusPill.tsx
import { IconCheck, IconAlertTriangle, IconRadio } from './icons';

type Tone = 'good' | 'attention' | 'danger' | 'idle';

const TONE_STYLES: Record<Tone, string> = {
  good: 'bg-good/10 text-good border-good/30',
  attention: 'bg-saffron/10 text-saffron border-saffron/30',
  danger: 'bg-danger/10 text-danger border-danger/30',
  idle: 'bg-steel/10 text-steel border-steel/30',
};

export function StatusPill({ tone, label }: { tone: Tone; label: string }) {
  const Icon = tone === 'danger' || tone === 'attention' ? IconAlertTriangle : tone === 'good' ? IconCheck : IconRadio;
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-body font-medium ${TONE_STYLES[tone]}`}>
      <Icon size={12} />
      {label}
    </span>
  );
}
```

- [ ] **Step 3: Verify type-check**

Run: `npx tsc --noEmit --jsx react-jsx src/components/ui/icons.tsx src/components/ui/StatusPill.tsx --strict --skipLibCheck --esModuleInterop`
Expected: exits 0.

- [ ] **Step 4: Commit**

```bash
git add src/components/ui/icons.tsx src/components/ui/StatusPill.tsx
git commit -m "$(cat <<'EOF'
feat: add shared icon set and StatusPill component

StatusPill always pairs color with an icon and a word, per the
report's requirement to never rely on color alone for status.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

## Task 10: Gauge component (sight-glass)

**Files:**
- Create: `src/components/ui/Gauge.tsx`

**Interfaces:**
- Produces: `Gauge` component with props `{ percent: number; label: string; toneClassName?: string }` — consumed by Dashboard (Task 15), Tank (Task 18), Water Quality (Task 19).

- [ ] **Step 1: Write the component**

```tsx
// src/components/ui/Gauge.tsx
export function Gauge({ percent, label, toneClassName = 'fill-aqua' }: { percent: number; label: string; toneClassName?: string }) {
  const clamped = Math.max(0, Math.min(100, percent));
  const fillY = 100 - clamped;
  return (
    <div className="flex flex-col items-center gap-2">
      <svg width="48" height="112" viewBox="0 0 48 112" aria-label={`${label}: ${clamped}%`}>
        <rect x="4" y="4" width="40" height="100" rx="16" fill="none" stroke="#7C99BA" strokeOpacity="0.35" strokeWidth="2" />
        <clipPath id={`gauge-clip-${label.replace(/\s+/g, '-')}`}>
          <rect x="4" y="4" width="40" height="100" rx="16" />
        </clipPath>
        <rect
          x="4"
          y={4 + fillY}
          width="40"
          height={100 - fillY}
          className={toneClassName}
          clipPath={`url(#gauge-clip-${label.replace(/\s+/g, '-')})`}
        />
      </svg>
      <span className="font-mono text-sm text-mist">{clamped}%</span>
      <span className="font-body text-xs text-steel text-center">{label}</span>
    </div>
  );
}
```

- [ ] **Step 2: Verify type-check**

Run: `npx tsc --noEmit --jsx react-jsx src/components/ui/Gauge.tsx --strict --skipLibCheck --esModuleInterop`
Expected: exits 0.

- [ ] **Step 3: Commit**

```bash
git add src/components/ui/Gauge.tsx
git commit -m "$(cat <<'EOF'
feat: add Gauge sight-glass component for tank/quality readouts

The recurring bold visual element from the design spec: a vertical
liquid-fill gauge standing in for a physical sight-glass, used
wherever a level or score is shown.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

## Task 11: MetricReadout and RiserList components

**Files:**
- Create: `src/components/ui/MetricReadout.tsx`
- Create: `src/components/ui/RiserList.tsx`

**Interfaces:**
- Consumes: `Section` from `src/data/types.ts` (Task 3); `StatusPill` from Task 9.
- Produces: `MetricReadout` component `{ label: string; value: string | number; unit?: string; note?: string }`; `RiserList` component `{ sections: Section[]; onSelect?: (id: SectionId) => void }` — consumed by Dashboard (Task 15), Sections (Task 16), Usage (Task 17).

- [ ] **Step 1: Write MetricReadout**

```tsx
// src/components/ui/MetricReadout.tsx
export function MetricReadout({ label, value, unit, note }: { label: string; value: string | number; unit?: string; note?: string }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="font-body text-xs text-steel">{label}</span>
      <span className="font-mono text-3xl text-mist">
        {value}
        {unit ? <span className="text-base text-steel ml-1">{unit}</span> : null}
      </span>
      {note ? <span className="font-body text-xs text-steel">{note}</span> : null}
    </div>
  );
}
```

- [ ] **Step 2: Write RiserList**

```tsx
// src/components/ui/RiserList.tsx
import type { Section, SectionId } from '../../data/types';
import { StatusPill } from './StatusPill';

const STATUS_TONE: Record<Section['status'], 'good' | 'attention' | 'danger' | 'idle'> = {
  nominal: 'good',
  idle: 'idle',
  attention: 'danger',
  offline: 'attention',
};

const STATUS_LABEL: Record<Section['status'], string> = {
  nominal: 'Nominal',
  idle: 'Idle',
  attention: 'Possible leak',
  offline: 'Offline',
};

export function RiserList({ sections, onSelect }: { sections: Section[]; onSelect?: (id: SectionId) => void }) {
  return (
    <ul className="relative pl-6">
      <span aria-hidden="true" className="absolute left-2 top-2 bottom-2 w-px bg-steel/30" />
      {sections.map((s) => (
        <li key={s.id} className="relative py-2.5">
          <span aria-hidden="true" className="absolute -left-4 top-1/2 -translate-y-1/2 w-3 border-t border-steel/40" />
          <button
            type="button"
            onClick={() => onSelect?.(s.id)}
            className="w-full flex items-center justify-between gap-3 rounded-lg px-3 py-2 text-left hover:bg-ink2 transition-colors"
          >
            <span className="font-body text-sm text-mist">{s.name}</span>
            <span className="flex items-center gap-3">
              <span className="font-mono text-sm text-steel">{s.flowLpm.toFixed(1)} L/min</span>
              <StatusPill tone={STATUS_TONE[s.status]} label={STATUS_LABEL[s.status]} />
            </span>
          </button>
        </li>
      ))}
    </ul>
  );
}
```

- [ ] **Step 3: Verify type-check**

Run: `npx tsc --noEmit --jsx react-jsx src/components/ui/MetricReadout.tsx src/components/ui/RiserList.tsx --strict --skipLibCheck --esModuleInterop`
Expected: exits 0.

- [ ] **Step 4: Commit**

```bash
git add src/components/ui/MetricReadout.tsx src/components/ui/RiserList.tsx
git commit -m "$(cat <<'EOF'
feat: add MetricReadout and RiserList shared components

RiserList replaces a generic card grid with the sections branching
off one supply line, matching the design spec's riser motif.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

## Task 12: DataTable component

**Files:**
- Create: `src/components/ui/DataTable.tsx`

**Interfaces:**
- Produces: `DataTable` generic component `{ columns: { key: string; label: string }[]; rows: Record<string, ReactNode>[]; emptyLabel?: string }` — consumed by Alerts, Devices, Pump, Reports, and all Admin pages (Tasks 20, 22, 23, 25, 27-29).

- [ ] **Step 1: Write the component**

```tsx
// src/components/ui/DataTable.tsx
import type { ReactNode } from 'react';

export interface DataTableColumn {
  key: string;
  label: string;
}

export function DataTable({
  columns,
  rows,
  emptyLabel = 'No records yet.',
}: {
  columns: DataTableColumn[];
  rows: Record<string, ReactNode>[];
  emptyLabel?: string;
}) {
  if (rows.length === 0) {
    return <p className="font-body text-sm text-steel py-6 text-center">{emptyLabel}</p>;
  }
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-steel/20">
            {columns.map((col) => (
              <th key={col.key} className="text-left font-body text-xs text-steel font-medium py-2 pr-4">
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-steel/10">
              {columns.map((col) => (
                <td key={col.key} className="font-body text-sm text-mist py-3 pr-4">
                  {row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
```

- [ ] **Step 2: Verify type-check**

Run: `npx tsc --noEmit --jsx react-jsx src/components/ui/DataTable.tsx --strict --skipLibCheck --esModuleInterop`
Expected: exits 0.

- [ ] **Step 3: Commit**

```bash
git add src/components/ui/DataTable.tsx
git commit -m "$(cat <<'EOF'
feat: add shared DataTable component

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

## Task 13: Restore the marketing landing page

**Files:**
- Create: `src/features/marketing/MarketingPage.tsx`
- Modify: `src/components/layout/Header.tsx`

**Interfaces:**
- Consumes: existing `IndustrialBackground`, `WaterStream`, `Header`, `Footer`, `useRevealObserver`, and all `src/components/sections/*` components (already in the repo, unchanged).
- Produces: `MarketingPage` default export, mounted at `/` by the router (Task 16).

- [ ] **Step 1: Restore the composition from git history into a feature file**

This composition previously lived directly in `App.tsx` (see commit `9240706`) before the dashboard rewrite replaced it. Recreate it as its own component:

```tsx
// src/features/marketing/MarketingPage.tsx
import { IndustrialBackground } from '../../components/effects/IndustrialBackground';
import { WaterStream } from '../../components/effects/WaterStream';
import { Header } from '../../components/layout/Header';
import { Footer } from '../../components/layout/Footer';
import { useRevealObserver } from '../../hooks/useRevealObserver';

import { HeroSection } from '../../components/sections/HeroSection';
import { ProblemSection } from '../../components/sections/ProblemSection';
import { HowItWorksSection } from '../../components/sections/HowItWorksSection';
import { CapabilitiesSection } from '../../components/sections/CapabilitiesSection';
import { ConnectedDashboardSection } from '../../components/sections/ConnectedDashboardSection';
import { AudienceSection } from '../../components/sections/AudienceSection';
import { CloseSection } from '../../components/sections/CloseSection';

export default function MarketingPage() {
  useRevealObserver();

  return (
    <div className="font-body text-mist min-h-screen bg-[#031014] relative selection:bg-aqua selection:text-ink">
      <IndustrialBackground />
      <WaterStream />
      <Header />
      <main className="relative z-10">
        <HeroSection />
        <ProblemSection />
        <HowItWorksSection />
        <CapabilitiesSection />
        <ConnectedDashboardSection />
        <AudienceSection />
        <CloseSection />
      </main>
      <Footer />
    </div>
  );
}
```

- [ ] **Step 2: Add a sign-in CTA to the header**

The header currently has no way into the app. Replace the "Explore System" anchor with a router link to `/login`, keeping the anchor nav for in-page sections:

```tsx
// src/components/layout/Header.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useMobileNav } from '../../hooks/useMobileNav';
import { MobileNav } from './MobileNav';

export const Header: React.FC = () => {
  const { isOpen, toggle, close } = useMobileNav();

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-[#031014]/90 backdrop-blur-md border-b border-white/8">
      <div className="nav-shell max-w-shell mx-auto px-6 h-16 flex items-center justify-between gap-3">
        <a href="#top" className="flex items-center gap-2.5">
          <span className="relative w-2.5 h-2.5 rounded-full bg-aqua">
            <span className="absolute inset-0 rounded-full bg-aqua animate-ping opacity-60" />
          </span>
          <span className="brand-label font-display font-semibold tracking-tight text-[15px] whitespace-nowrap text-mist">
            Smart Water Flow
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-7 font-mono text-[11px] tracking-[.14em] uppercase text-steel">
          <a href="#problem" className="hover:text-mist transition-colors">
            The Problem
          </a>
          <a href="#how-it-works" className="hover:text-mist transition-colors">
            How It Works
          </a>
          <a href="#capabilities" className="hover:text-mist transition-colors">
            Capabilities
          </a>
          <a href="#dashboard" className="hover:text-mist transition-colors">
            Dashboard
          </a>
          <a href="#audience" className="hover:text-mist transition-colors">
            Who It Is For
          </a>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/login"
            className="hidden sm:inline-flex font-mono text-[11px] tracking-[.12em] uppercase px-4 py-2 rounded-full bg-aqua text-ink font-medium hover:bg-mist transition-colors shadow-[0_0_12px_rgba(24,191,242,0.3)]"
          >
            Sign in
          </Link>
          <button
            id="menuBtn"
            type="button"
            className="lg:hidden w-10 h-10 rounded-full border border-white/15 flex flex-col items-center justify-center gap-1.5 hover:border-aqua/60 transition-colors"
            aria-expanded={isOpen}
            aria-controls="mobileNav"
            aria-label={isOpen ? 'Close navigation' : 'Open navigation'}
            onClick={toggle}
          >
            <span className="menu-line block w-4 h-px bg-mist" />
            <span className="menu-line block w-4 h-px bg-mist" />
          </button>
        </div>
      </div>
      <MobileNav isOpen={isOpen} onClose={close} />
    </header>
  );
};
```

- [ ] **Step 3: Verify type-check**

Run: `npx tsc --noEmit --jsx react-jsx src/features/marketing/MarketingPage.tsx src/components/layout/Header.tsx --strict --skipLibCheck --esModuleInterop`
Expected: exits 0. (This checks the files parse and import correctly; full resolution happens once the router wires them in at Task 16.)

- [ ] **Step 4: Commit**

```bash
git add src/features/marketing/MarketingPage.tsx src/components/layout/Header.tsx
git commit -m "$(cat <<'EOF'
feat: restore the marketing landing page as a routable feature

Recreates the pre-dashboard-rewrite landing composition (hero,
problem, how-it-works, capabilities, connected dashboard, audience,
close, footer) as its own component, and points the header's CTA at
/login instead of an in-page anchor.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

## Task 14: Login/Signup page

**Files:**
- Create: `src/features/auth/LoginPage.tsx`

**Interfaces:**
- Consumes: `useAuth` from `src/state/auth.tsx` (Task 7).
- Produces: `LoginPage` default export, mounted at `/login` by the router (Task 16); on submit, navigates to `/app/dashboard`.

- [ ] **Step 1: Write the page**

```tsx
// src/features/auth/LoginPage.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../state/auth';

export default function LoginPage() {
  const [mode, setMode] = useState<'sign-in' | 'sign-up'>('sign-in');
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    signIn();
    navigate('/app/dashboard');
  };

  return (
    <div className="min-h-screen bg-ink flex items-center justify-center px-6 font-body">
      <div className="w-full max-w-sm">
        <div className="flex items-center gap-2.5 mb-8 justify-center">
          <span className="w-2.5 h-2.5 rounded-full bg-aqua" />
          <span className="font-display font-semibold text-mist text-lg">Smart Water Flow</span>
        </div>

        <div className="bg-ink2 rounded-2xl border border-steel/20 p-6">
          <div className="flex gap-1 mb-6 rounded-lg bg-ink p-1">
            <button
              type="button"
              onClick={() => setMode('sign-in')}
              className={`flex-1 rounded-md py-2 text-sm font-medium transition-colors ${mode === 'sign-in' ? 'bg-aqua text-ink' : 'text-steel'}`}
            >
              Sign in
            </button>
            <button
              type="button"
              onClick={() => setMode('sign-up')}
              className={`flex-1 rounded-md py-2 text-sm font-medium transition-colors ${mode === 'sign-up' ? 'bg-aqua text-ink' : 'text-steel'}`}
            >
              Create account
            </button>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {mode === 'sign-up' && (
              <label className="flex flex-col gap-1.5">
                <span className="text-xs text-steel">Full name</span>
                <input required className="rounded-lg bg-ink border border-steel/30 px-3 py-2 text-mist text-sm outline-none focus:border-aqua" type="text" />
              </label>
            )}
            <label className="flex flex-col gap-1.5">
              <span className="text-xs text-steel">Email</span>
              <input required className="rounded-lg bg-ink border border-steel/30 px-3 py-2 text-mist text-sm outline-none focus:border-aqua" type="email" />
            </label>
            <label className="flex flex-col gap-1.5">
              <span className="text-xs text-steel">Password</span>
              <input required className="rounded-lg bg-ink border border-steel/30 px-3 py-2 text-mist text-sm outline-none focus:border-aqua" type="password" minLength={8} />
            </label>

            {mode === 'sign-in' && (
              <button type="button" className="text-xs text-steel text-left hover:text-aqua transition-colors">
                Forgot password? (not available in this demo)
              </button>
            )}

            <button type="submit" className="mt-2 rounded-lg bg-aqua text-ink font-medium py-2.5 text-sm hover:bg-mist transition-colors">
              {mode === 'sign-in' ? 'Sign in' : 'Create account'}
            </button>
          </form>
        </div>

        <p className="text-xs text-steel text-center mt-4">
          This is a demo. No account data leaves your browser.
        </p>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify type-check**

Run: `npx tsc --noEmit --jsx react-jsx src/features/auth/LoginPage.tsx --strict --skipLibCheck --esModuleInterop`
Expected: exits 0.

- [ ] **Step 3: Commit**

```bash
git add src/features/auth/LoginPage.tsx
git commit -m "$(cat <<'EOF'
feat: add simulated Login/Signup page

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

## Task 15: Customer and admin app shells

**Files:**
- Create: `src/features/app-shell/AppShell.tsx`
- Create: `src/features/app-shell/AdminShell.tsx`

**Interfaces:**
- Consumes: `useAuth` from `src/state/auth.tsx` (Task 7); icons from Task 9; `Outlet`, `NavLink` from `react-router-dom`.
- Produces: `AppShell` default export (sidebar + topbar + `<Outlet/>` for customer routes), `AdminShell` default export (separate sidebar + `<Outlet/>` for admin routes) — both mounted as layout routes by the router (Task 16).

- [ ] **Step 1: Write the customer shell**

```tsx
// src/features/app-shell/AppShell.tsx
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../state/auth';
import {
  IconGrid, IconHouse, IconDroplet, IconGauge, IconAlertTriangle,
  IconValve, IconChevronRight, IconBell, IconSettings, IconLogout,
} from '../../components/ui/icons';

const NAV = [
  { to: '/app/dashboard', label: 'Dashboard', icon: IconGrid },
  { to: '/app/sections', label: 'My Home', icon: IconHouse },
  { to: '/app/usage', label: 'Water Usage', icon: IconDroplet },
  { to: '/app/tank', label: 'Tank Monitoring', icon: IconGauge },
  { to: '/app/quality', label: 'Water Quality', icon: IconDroplet },
  { to: '/app/alerts', label: 'Leakage & Alerts', icon: IconAlertTriangle },
  { to: '/app/pump', label: 'Pump Control', icon: IconSettings },
  { to: '/app/valves', label: 'Valve Control', icon: IconValve },
  { to: '/app/insights', label: 'AI Insights', icon: IconGrid },
  { to: '/app/reports', label: 'Reports', icon: IconGrid },
  { to: '/app/devices', label: 'Devices & Settings', icon: IconSettings },
];

export default function AppShell() {
  const { switchRole, signOut } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-ink flex font-body">
      <aside className="w-64 bg-ink2 border-r border-steel/15 flex flex-col p-4 sticky top-0 h-screen">
        <div className="flex items-center gap-2 px-2 pb-6">
          <span className="w-2 h-2 rounded-full bg-aqua" />
          <span className="font-display font-semibold text-mist text-sm">Smart Water Flow</span>
        </div>
        <nav className="flex flex-col gap-1 flex-1">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors ${isActive ? 'bg-aqua/10 text-aqua' : 'text-steel hover:text-mist hover:bg-ink'}`
              }
            >
              <item.icon size={15} />
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="border-t border-steel/15 pt-3 flex flex-col gap-1">
          <button
            type="button"
            onClick={() => {
              switchRole();
              navigate('/admin/overview');
            }}
            className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-steel hover:text-mist hover:bg-ink transition-colors"
          >
            <IconChevronRight size={15} />
            Switch to admin view (demo)
          </button>
          <button
            type="button"
            onClick={() => {
              signOut();
              navigate('/');
            }}
            className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-steel hover:text-mist hover:bg-ink transition-colors"
          >
            <IconLogout size={15} />
            Sign out
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col">
        <header className="h-14 border-b border-steel/15 flex items-center justify-between px-6">
          <span className="font-body text-sm text-steel">Founder residence</span>
          <button type="button" aria-label="Notifications" className="text-steel hover:text-mist transition-colors">
            <IconBell size={16} />
          </button>
        </header>
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Write the admin shell**

```tsx
// src/features/app-shell/AdminShell.tsx
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../state/auth';
import { IconGrid, IconHouse, IconSettings, IconAlertTriangle, IconFileText, IconChevronRight, IconLogout } from '../../components/ui/icons';

const NAV = [
  { to: '/admin/overview', label: 'Overview', icon: IconGrid },
  { to: '/admin/customers', label: 'Customers & Properties', icon: IconHouse },
  { to: '/admin/devices', label: 'Devices', icon: IconSettings },
  { to: '/admin/alerts', label: 'System Alerts', icon: IconAlertTriangle },
  { to: '/admin/audit', label: 'Audit Trail', icon: IconFileText },
];

export default function AdminShell() {
  const { switchRole, signOut } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-ink flex font-body">
      <aside className="w-64 bg-ink2 border-r border-steel/15 flex flex-col p-4 sticky top-0 h-screen">
        <div className="flex items-center gap-2 px-2 pb-2">
          <span className="w-2 h-2 rounded-full bg-aqua" />
          <span className="font-display font-semibold text-mist text-sm">Smart Water Flow</span>
        </div>
        <p className="px-2 pb-4 text-xs text-steel">Admin console</p>
        <nav className="flex flex-col gap-1 flex-1">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors ${isActive ? 'bg-aqua/10 text-aqua' : 'text-steel hover:text-mist hover:bg-ink'}`
              }
            >
              <item.icon size={15} />
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="border-t border-steel/15 pt-3 flex flex-col gap-1">
          <button
            type="button"
            onClick={() => {
              switchRole();
              navigate('/app/dashboard');
            }}
            className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-steel hover:text-mist hover:bg-ink transition-colors"
          >
            <IconChevronRight size={15} />
            Switch to customer view (demo)
          </button>
          <button
            type="button"
            onClick={() => {
              signOut();
              navigate('/');
            }}
            className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-steel hover:text-mist hover:bg-ink transition-colors"
          >
            <IconLogout size={15} />
            Sign out
          </button>
        </div>
      </aside>
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}
```

- [ ] **Step 3: Verify type-check**

Run: `npx tsc --noEmit --jsx react-jsx src/features/app-shell/AppShell.tsx src/features/app-shell/AdminShell.tsx --strict --skipLibCheck --esModuleInterop`
Expected: exits 0.

- [ ] **Step 4: Commit**

```bash
git add src/features/app-shell/AppShell.tsx src/features/app-shell/AdminShell.tsx
git commit -m "$(cat <<'EOF'
feat: add customer and admin app shells

Separate sidebars/nav for /app/* and /admin/* routes, each with a
demo role switcher instead of a real session boundary.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

## Task 16: Dashboard page

**Files:**
- Create: `src/features/dashboard/DashboardPage.tsx`

**Interfaces:**
- Consumes: `useScenario` (Task 8); `sumpLevel`, `overheadTankLevel` (Task 5); `qualityMetrics` (Task 5); `Gauge` (Task 10); `MetricReadout` (Task 11); `StatusPill` (Task 9).
- Produces: `DashboardPage` default export, mounted at `/app/dashboard` by Task 32.

- [ ] **Step 1: Write the page**

```tsx
// src/features/dashboard/DashboardPage.tsx
import { useScenario } from '../../state/scenario';
import { sumpLevel, overheadTankLevel } from '../../data/fixtures/tank';
import { qualityMetrics } from '../../data/fixtures/quality';
import { Gauge } from '../../components/ui/Gauge';
import { MetricReadout } from '../../components/ui/MetricReadout';
import { StatusPill } from '../../components/ui/StatusPill';

export default function DashboardPage() {
  const { phase, sections, activeAlert, runIncidentDemo } = useScenario();
  const kitchen = sections.find((s) => s.id === 'kitchen')!;
  const qualityGood = qualityMetrics.every((m) => m.status === 'good');

  const headline =
    phase === 'leak'
      ? 'Possible leak detected — Kitchen line'
      : phase === 'contained'
        ? 'Kitchen valve closed — flow stopped'
        : 'All sections operating normally';

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl text-mist">Dashboard</h1>
        <StatusPill tone="good" label="Gateway connected" />
      </div>

      <section className={`rounded-2xl border p-5 flex items-center justify-between gap-4 ${phase === 'leak' ? 'border-danger/40 bg-danger/5' : 'border-steel/20 bg-ink2'}`}>
        <div>
          <h2 className="font-display text-lg text-mist mb-1">{headline}</h2>
          {activeAlert && <p className="font-body text-sm text-steel">{activeAlert.evidence}</p>}
        </div>
        <button
          type="button"
          onClick={runIncidentDemo}
          className="shrink-0 rounded-lg bg-aqua text-ink text-sm font-medium px-4 py-2 hover:bg-mist transition-colors"
        >
          {phase === 'normal' ? 'Run incident demo' : phase === 'leak' ? 'Close Kitchen valve' : 'Reset demo'}
        </button>
      </section>

      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-steel/20 bg-ink2 p-4">
          <MetricReadout label="Kitchen flow" value={kitchen.flowLpm.toFixed(1)} unit="L/min" note={phase === 'leak' ? 'Above expected baseline' : 'Within expected range'} />
        </div>
        <div className="rounded-2xl border border-steel/20 bg-ink2 p-4">
          <MetricReadout label="Today's usage" value={phase === 'leak' ? '412' : '286'} unit="L" note="Daily budget 600 L" />
        </div>
        <div className="rounded-2xl border border-steel/20 bg-ink2 p-4">
          <MetricReadout label="Water quality" value={qualityGood ? 'Good' : 'Attention'} note="pH · TDS · Turbidity · Temp" />
        </div>
        <div className="rounded-2xl border border-steel/20 bg-ink2 p-4">
          <MetricReadout label="Active alerts" value={activeAlert ? 1 : 0} note={activeAlert ? 'Kitchen — possible leak' : 'None open'} />
        </div>
      </section>

      <section className="rounded-2xl border border-steel/20 bg-ink2 p-5 flex flex-wrap gap-8 justify-around">
        <Gauge percent={overheadTankLevel.value} label="Overhead tank" />
        <Gauge percent={sumpLevel.value} label="Sump" toneClassName="fill-good" />
        <Gauge percent={92} label="Water quality score" toneClassName="fill-good" />
      </section>
    </div>
  );
}
```

- [ ] **Step 2: Verify type-check**

Run: `npx tsc --noEmit --jsx react-jsx src/features/dashboard/DashboardPage.tsx --strict --skipLibCheck --esModuleInterop`
Expected: exits 0.

- [ ] **Step 3: Commit**

```bash
git add src/features/dashboard/DashboardPage.tsx
git commit -m "$(cat <<'EOF'
feat: add Dashboard page

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

## Task 17: My Home / Sections pages

**Files:**
- Create: `src/features/sections/SectionsPage.tsx`
- Create: `src/features/sections/SectionDetailPage.tsx`

**Interfaces:**
- Consumes: `useScenario` (Task 8); `RiserList` (Task 11); `StatusPill` (Task 9); `useNavigate`/`useParams` from `react-router-dom`; `SectionId` (Task 3).
- Produces: `SectionsPage`, `SectionDetailPage` default exports, mounted at `/app/sections` and `/app/sections/:sectionId` by Task 32.

- [ ] **Step 1: Write the list page**

```tsx
// src/features/sections/SectionsPage.tsx
import { useNavigate } from 'react-router-dom';
import { useScenario } from '../../state/scenario';
import { RiserList } from '../../components/ui/RiserList';

export default function SectionsPage() {
  const { sections } = useScenario();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-display text-2xl text-mist">My Home</h1>
      <p className="font-body text-sm text-steel max-w-lg">
        Every section below is fed from the same main supply line. Select one to see its flow history, leak events, and valve state.
      </p>
      <section className="rounded-2xl border border-steel/20 bg-ink2 p-5">
        <RiserList sections={sections} onSelect={(id) => navigate(`/app/sections/${id}`)} />
      </section>
    </div>
  );
}
```

- [ ] **Step 2: Write the detail page**

```tsx
// src/features/sections/SectionDetailPage.tsx
import { Link, useParams } from 'react-router-dom';
import { useScenario } from '../../state/scenario';
import { StatusPill } from '../../components/ui/StatusPill';
import { MetricReadout } from '../../components/ui/MetricReadout';
import type { Section } from '../../data/types';

const STATUS_TONE: Record<Section['status'], 'good' | 'attention' | 'danger' | 'idle'> = {
  nominal: 'good',
  idle: 'idle',
  attention: 'danger',
  offline: 'attention',
};

export default function SectionDetailPage() {
  const { sectionId } = useParams<{ sectionId: string }>();
  const { sections } = useScenario();
  const section = sections.find((s) => s.id === sectionId);

  if (!section) {
    return (
      <div className="flex flex-col gap-4">
        <p className="font-body text-sm text-steel">Section not found.</p>
        <Link to="/app/sections" className="font-body text-sm text-aqua">Back to My Home</Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <Link to="/app/sections" className="font-body text-sm text-steel hover:text-mist transition-colors w-fit">
        ← Back to My Home
      </Link>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl text-mist">{section.name}</h1>
        <StatusPill tone={STATUS_TONE[section.status]} label={section.status === 'attention' ? 'Possible leak' : section.status} />
      </div>
      <section className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="rounded-2xl border border-steel/20 bg-ink2 p-4">
          <MetricReadout label="Current flow" value={section.flowLpm.toFixed(1)} unit="L/min" />
        </div>
        <div className="rounded-2xl border border-steel/20 bg-ink2 p-4">
          <MetricReadout label="Valve state" value={section.valveState} />
        </div>
        <div className="rounded-2xl border border-steel/20 bg-ink2 p-4">
          <MetricReadout label="Last event" value={section.lastEventAt ? new Date(section.lastEventAt).toLocaleString() : 'None'} />
        </div>
      </section>
      <section className="rounded-2xl border border-steel/20 bg-ink2 p-5">
        <h2 className="font-display text-base text-mist mb-2">Usage history</h2>
        <p className="font-body text-sm text-steel">Historical trend charts for this section will appear here once at least 24 hours of simulated readings have accumulated.</p>
      </section>
    </div>
  );
}
```

- [ ] **Step 3: Verify type-check**

Run: `npx tsc --noEmit --jsx react-jsx src/features/sections/SectionsPage.tsx src/features/sections/SectionDetailPage.tsx --strict --skipLibCheck --esModuleInterop`
Expected: exits 0.

- [ ] **Step 4: Commit**

```bash
git add src/features/sections/SectionsPage.tsx src/features/sections/SectionDetailPage.tsx
git commit -m "$(cat <<'EOF'
feat: add My Home sections list and section detail pages

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

## Task 18: Water Usage page

**Files:**
- Create: `src/features/usage/UsagePage.tsx`

**Interfaces:**
- Consumes: `useScenario` (Task 8); `MetricReadout` (Task 11).
- Produces: `UsagePage` default export, mounted at `/app/usage` by Task 32.

- [ ] **Step 1: Write the page**

```tsx
// src/features/usage/UsagePage.tsx
import { useMemo, useState } from 'react';
import { useScenario } from '../../state/scenario';
import { MetricReadout } from '../../components/ui/MetricReadout';

const RANGES = ['Today', '7 days', '30 days'] as const;

export default function UsagePage() {
  const { sections } = useScenario();
  const [sectionFilter, setSectionFilter] = useState<string>('all');
  const [range, setRange] = useState<(typeof RANGES)[number]>('Today');

  const totalFlow = useMemo(
    () => sections.filter((s) => sectionFilter === 'all' || s.id === sectionFilter).reduce((sum, s) => sum + s.flowLpm, 0),
    [sections, sectionFilter],
  );

  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-display text-2xl text-mist">Water Usage</h1>

      <div className="flex flex-wrap gap-3">
        <select
          value={sectionFilter}
          onChange={(e) => setSectionFilter(e.target.value)}
          className="rounded-lg bg-ink2 border border-steel/30 text-mist text-sm px-3 py-2"
        >
          <option value="all">All sections</option>
          {sections.map((s) => (
            <option key={s.id} value={s.id}>{s.name}</option>
          ))}
        </select>
        <div className="flex gap-1 rounded-lg bg-ink2 border border-steel/30 p-1">
          {RANGES.map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRange(r)}
              className={`rounded-md px-3 py-1.5 text-sm transition-colors ${range === r ? 'bg-aqua text-ink' : 'text-steel'}`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      <section className="grid grid-cols-2 gap-4">
        <div className="rounded-2xl border border-steel/20 bg-ink2 p-4">
          <MetricReadout label="Combined current flow" value={totalFlow.toFixed(1)} unit="L/min" />
        </div>
        <div className="rounded-2xl border border-steel/20 bg-ink2 p-4">
          <MetricReadout label={`Total volume — ${range}`} value={range === 'Today' ? '286' : range === '7 days' ? '1,940' : '8,120'} unit="L" />
        </div>
      </section>

      <section className="rounded-2xl border border-steel/20 bg-ink2 p-5">
        <h2 className="font-display text-base text-mist mb-3">Consumption trend</h2>
        <svg viewBox="0 0 480 120" className="w-full h-28" preserveAspectRatio="none" aria-label="simulated consumption trend">
          <path d="M0 90 C60 85 90 95 130 70 S 200 40 260 50 S 340 60 400 35 L 480 20" fill="none" stroke="#3FA9F0" strokeWidth="2.5" />
        </svg>
      </section>
    </div>
  );
}
```

- [ ] **Step 2: Verify type-check**

Run: `npx tsc --noEmit --jsx react-jsx src/features/usage/UsagePage.tsx --strict --skipLibCheck --esModuleInterop`
Expected: exits 0.

- [ ] **Step 3: Commit**

```bash
git add src/features/usage/UsagePage.tsx
git commit -m "$(cat <<'EOF'
feat: add Water Usage page

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

## Task 19: Tank Monitoring page

**Files:**
- Create: `src/features/tank/TankPage.tsx`

**Interfaces:**
- Consumes: `sumpLevel`, `overheadTankLevel`, `tankThresholds` (Task 5); `Gauge` (Task 10); `MetricReadout` (Task 11); `StatusPill` (Task 9).
- Produces: `TankPage` default export, mounted at `/app/tank` by Task 32.

- [ ] **Step 1: Write the page**

```tsx
// src/features/tank/TankPage.tsx
import { sumpLevel, overheadTankLevel, tankThresholds } from '../../data/fixtures/tank';
import { Gauge } from '../../components/ui/Gauge';
import { MetricReadout } from '../../components/ui/MetricReadout';
import { StatusPill } from '../../components/ui/StatusPill';

export default function TankPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-display text-2xl text-mist">Tank Monitoring</h1>

      <section className="rounded-2xl border border-steel/20 bg-ink2 p-6 flex flex-wrap gap-10 justify-around">
        <div className="flex flex-col items-center gap-2">
          <Gauge percent={overheadTankLevel.value} label="Overhead tank" />
          <StatusPill tone="good" label="Sensor healthy" />
        </div>
        <div className="flex flex-col items-center gap-2">
          <Gauge percent={sumpLevel.value} label="Sump" toneClassName="fill-good" />
          <StatusPill tone="good" label="Sensor healthy" />
        </div>
      </section>

      <section className="grid grid-cols-2 gap-4">
        <div className="rounded-2xl border border-steel/20 bg-ink2 p-4">
          <MetricReadout label="Low-level threshold" value={tankThresholds.lowPercent} unit="%" note="Alert triggers below this level" />
        </div>
        <div className="rounded-2xl border border-steel/20 bg-ink2 p-4">
          <MetricReadout label="High-level threshold" value={tankThresholds.highPercent} unit="%" note="Overflow warning above this level" />
        </div>
      </section>

      <section className="rounded-2xl border border-steel/20 bg-ink2 p-5">
        <h2 className="font-display text-base text-mist mb-3">Level history — 24 hours</h2>
        <svg viewBox="0 0 480 120" className="w-full h-28" preserveAspectRatio="none" aria-label="simulated tank level trend">
          <path d="M0 40 C60 45 90 38 130 42 S 200 55 260 50 S 340 44 400 40 L 480 38" fill="none" stroke="#3FA9F0" strokeWidth="2.5" />
        </svg>
      </section>
    </div>
  );
}
```

- [ ] **Step 2: Verify type-check**

Run: `npx tsc --noEmit --jsx react-jsx src/features/tank/TankPage.tsx --strict --skipLibCheck --esModuleInterop`
Expected: exits 0.

- [ ] **Step 3: Commit**

```bash
git add src/features/tank/TankPage.tsx
git commit -m "$(cat <<'EOF'
feat: add Tank Monitoring page

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

## Task 20: Water Quality page

**Files:**
- Create: `src/features/quality/QualityPage.tsx`

**Interfaces:**
- Consumes: `qualityMetrics`, `calibrationReminder` (Task 5); `StatusPill` (Task 9); `Gauge` (Task 10).
- Produces: `QualityPage` default export, mounted at `/app/quality` by Task 32.

- [ ] **Step 1: Write the page**

```tsx
// src/features/quality/QualityPage.tsx
import { qualityMetrics, calibrationReminder } from '../../data/fixtures/quality';
import { StatusPill } from '../../components/ui/StatusPill';
import { Gauge } from '../../components/ui/Gauge';

export default function QualityPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-display text-2xl text-mist">Water Quality</h1>

      <section className="rounded-2xl border border-steel/20 bg-ink2 p-6 flex items-center gap-8">
        <Gauge percent={92} label="Quality score" toneClassName="fill-good" />
        <div>
          <StatusPill tone="good" label="Readings within target range" />
          <p className="font-body text-sm text-steel mt-3 max-w-md">
            These readings describe what the sensors measured, not a certification of drinking-water safety.
            pH, TDS, and turbidity alone do not confirm water is safe to drink — treatment decisions require
            source-water testing and qualified guidance.
          </p>
        </div>
      </section>

      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {qualityMetrics.map((m) => (
          <div key={m.id} className="rounded-2xl border border-steel/20 bg-ink2 p-4 flex flex-col gap-1">
            <span className="font-body text-xs text-steel">{m.label}</span>
            <span className="font-mono text-2xl text-mist">
              {m.value}
              {m.unit && <span className="text-sm text-steel ml-1">{m.unit}</span>}
            </span>
            <span className="font-body text-xs text-steel">Target: {m.targetRange}</span>
            <StatusPill tone={m.status} label={m.status === 'good' ? 'Good' : 'Needs attention'} />
          </div>
        ))}
      </section>

      <section className="rounded-2xl border border-saffron/30 bg-saffron/5 p-4">
        <p className="font-body text-sm text-mist">
          Calibration reminder: {calibrationReminder.deviceLabel} is due for calibration in {calibrationReminder.dueInDays} days.
        </p>
      </section>
    </div>
  );
}
```

- [ ] **Step 2: Verify type-check**

Run: `npx tsc --noEmit --jsx react-jsx src/features/quality/QualityPage.tsx --strict --skipLibCheck --esModuleInterop`
Expected: exits 0.

- [ ] **Step 3: Commit**

```bash
git add src/features/quality/QualityPage.tsx
git commit -m "$(cat <<'EOF'
feat: add Water Quality page

Copy explicitly avoids implying drinking-water safety from pH/TDS/
turbidity readings alone, per the handoff report's compliance rule.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

## Task 21: Leakage & Alerts page

**Files:**
- Create: `src/features/alerts/AlertsPage.tsx`

**Interfaces:**
- Consumes: `useScenario` (Task 8); `baselineAlerts` (Task 5); `DataTable`, `DataTableColumn` (Task 12); `StatusPill` (Task 9); `Section` names via `useScenario().sections`.
- Produces: `AlertsPage` default export, mounted at `/app/alerts` by Task 32.

- [ ] **Step 1: Write the page**

```tsx
// src/features/alerts/AlertsPage.tsx
import { useMemo, useState } from 'react';
import { useScenario } from '../../state/scenario';
import { baselineAlerts } from '../../data/fixtures/alerts';
import { DataTable } from '../../components/ui/DataTable';
import { StatusPill } from '../../components/ui/StatusPill';
import type { Alert } from '../../data/types';

const SEVERITY_TONE: Record<Alert['severity'], 'good' | 'attention' | 'danger'> = {
  low: 'good',
  medium: 'attention',
  high: 'danger',
};

export default function AlertsPage() {
  const { sections, activeAlert } = useScenario();
  const [acknowledged, setAcknowledged] = useState<Record<string, boolean>>({});

  const allAlerts = useMemo(() => (activeAlert ? [activeAlert, ...baselineAlerts] : baselineAlerts), [activeAlert]);

  const rows = allAlerts.map((a) => {
    const section = sections.find((s) => s.id === a.sectionId);
    const isAck = acknowledged[a.id];
    return {
      severity: <StatusPill tone={SEVERITY_TONE[a.severity]} label={a.severity} />,
      section: section?.name ?? a.sectionId,
      title: a.title,
      openedAt: a.openedAt ? new Date(a.openedAt).toLocaleString() : '—',
      status: isAck ? (
        <StatusPill tone="good" label="Acknowledged" />
      ) : (
        <button
          type="button"
          onClick={() => setAcknowledged((prev) => ({ ...prev, [a.id]: true }))}
          className="text-aqua text-sm hover:text-mist transition-colors"
        >
          Acknowledge
        </button>
      ),
    };
  });

  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-display text-2xl text-mist">Leakage & Alerts</h1>
      <p className="font-body text-sm text-steel max-w-lg">
        New alerts are labeled as possible leaks, not confirmed ones, until reviewed.
      </p>
      <section className="rounded-2xl border border-steel/20 bg-ink2 p-5">
        <DataTable
          columns={[
            { key: 'severity', label: 'Severity' },
            { key: 'section', label: 'Section' },
            { key: 'title', label: 'Event' },
            { key: 'openedAt', label: 'Opened' },
            { key: 'status', label: 'Status' },
          ]}
          rows={rows}
          emptyLabel="No alerts — everything is operating normally."
        />
      </section>
    </div>
  );
}
```

- [ ] **Step 2: Verify type-check**

Run: `npx tsc --noEmit --jsx react-jsx src/features/alerts/AlertsPage.tsx --strict --skipLibCheck --esModuleInterop`
Expected: exits 0.

- [ ] **Step 3: Commit**

```bash
git add src/features/alerts/AlertsPage.tsx
git commit -m "$(cat <<'EOF'
feat: add Leakage & Alerts page

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

## Task 22: Pump Control page

**Files:**
- Create: `src/features/pump/PumpPage.tsx`

**Interfaces:**
- Produces: `PumpPage` default export, mounted at `/app/pump` by Task 32. Self-contained local pending/acknowledged command state (no shared fixture needed — mirrors the report's PumpRun/Command shape from `src/data/types.ts`, Task 3).

- [ ] **Step 1: Write the page**

```tsx
// src/features/pump/PumpPage.tsx
import { useState } from 'react';
import { StatusPill } from '../../components/ui/StatusPill';
import { DataTable } from '../../components/ui/DataTable';
import type { CommandStatus } from '../../data/types';

const RUN_HISTORY = [
  { id: 'run-1', started: '2026-09-18 06:02', duration: '18 min', reason: 'Scheduled fill', fault: false },
  { id: 'run-2', started: '2026-09-17 19:40', duration: '22 min', reason: 'Manual start', fault: false },
  { id: 'run-3', started: '2026-09-16 06:00', duration: '4 min', reason: 'Dry-run cutoff', fault: true },
];

export default function PumpPage() {
  const [mode, setMode] = useState<'manual' | 'auto' | 'off'>('auto');
  const [running, setRunning] = useState(false);
  const [commandStatus, setCommandStatus] = useState<CommandStatus | null>(null);

  const requestToggle = () => {
    setCommandStatus('pending');
    setTimeout(() => {
      setCommandStatus('acknowledged');
      setRunning((r) => !r);
    }, 1000);
  };

  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-display text-2xl text-mist">Pump Control</h1>

      <section className="rounded-2xl border border-steel/20 bg-ink2 p-5 flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <StatusPill tone={running ? 'good' : 'idle'} label={running ? 'Running' : 'Stopped'} />
          {commandStatus === 'pending' && <StatusPill tone="attention" label="Command pending" />}
        </div>
        <div className="flex items-center gap-3">
          <div className="flex gap-1 rounded-lg bg-ink border border-steel/30 p-1">
            {(['manual', 'auto', 'off'] as const).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setMode(m)}
                className={`rounded-md px-3 py-1.5 text-sm capitalize transition-colors ${mode === m ? 'bg-aqua text-ink' : 'text-steel'}`}
              >
                {m}
              </button>
            ))}
          </div>
          <button
            type="button"
            disabled={mode === 'off' || commandStatus === 'pending'}
            onClick={requestToggle}
            className="rounded-lg bg-aqua text-ink text-sm font-medium px-4 py-2 hover:bg-mist transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {running ? 'Request stop' : 'Request start'}
          </button>
        </div>
      </section>

      <section className="rounded-2xl border border-steel/20 bg-ink2 p-5">
        <h2 className="font-display text-base text-mist mb-3">Run-time history</h2>
        <DataTable
          columns={[
            { key: 'started', label: 'Started' },
            { key: 'duration', label: 'Duration' },
            { key: 'reason', label: 'Stop reason' },
            { key: 'fault', label: 'Fault' },
          ]}
          rows={RUN_HISTORY.map((r) => ({
            started: r.started,
            duration: r.duration,
            reason: r.reason,
            fault: r.fault ? <StatusPill tone="danger" label="Fault" /> : <StatusPill tone="good" label="Normal" />,
          }))}
        />
      </section>
    </div>
  );
}
```

- [ ] **Step 2: Verify type-check**

Run: `npx tsc --noEmit --jsx react-jsx src/features/pump/PumpPage.tsx --strict --skipLibCheck --esModuleInterop`
Expected: exits 0.

- [ ] **Step 3: Commit**

```bash
git add src/features/pump/PumpPage.tsx
git commit -m "$(cat <<'EOF'
feat: add Pump Control page

Start/stop requests show pending before acknowledged, never instant
success.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

## Task 23: Valve Control page

**Files:**
- Create: `src/features/valves/ValvesPage.tsx`

**Interfaces:**
- Consumes: `useScenario` (Task 8) for the Kitchen valve's live state and `requestCloseValve`; `StatusPill` (Task 9).
- Produces: `ValvesPage` default export, mounted at `/app/valves` by Task 32.

- [ ] **Step 1: Write the page**

```tsx
// src/features/valves/ValvesPage.tsx
import { useScenario } from '../../state/scenario';
import { StatusPill } from '../../components/ui/StatusPill';
import { IconValve } from '../../components/ui/icons';

export default function ValvesPage() {
  const { sections, lastCommand, requestCloseValve } = useScenario();
  const pendingOnKitchen = lastCommand?.targetId === 'kitchen' && lastCommand.status === 'pending';

  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-display text-2xl text-mist">Valve Control</h1>
      <p className="font-body text-sm text-steel max-w-lg">
        Every close/open request is sent for acknowledgement before it takes effect. Production installations
        also require a local hardware fail-safe independent of this app.
      </p>

      <section className="rounded-2xl border border-steel/20 bg-ink2 divide-y divide-steel/10">
        {sections.map((s) => (
          <div key={s.id} className="flex items-center justify-between px-5 py-4">
            <div className="flex items-center gap-3">
              <span className={`text-steel ${s.valveState === 'closed' ? 'opacity-50' : ''}`}>
                <IconValve size={20} />
              </span>
              <div>
                <p className="font-body text-sm text-mist">{s.name}</p>
                <p className="font-body text-xs text-steel">Last update: {s.lastEventAt ? new Date(s.lastEventAt).toLocaleString() : 'no recent change'}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <StatusPill tone={s.valveState === 'closed' ? 'attention' : 'good'} label={s.valveState} />
              {s.id === 'kitchen' && (
                <button
                  type="button"
                  disabled={pendingOnKitchen || s.valveState === 'closed'}
                  onClick={() => requestCloseValve('kitchen')}
                  className="rounded-lg bg-danger/10 text-danger text-sm font-medium px-3 py-1.5 hover:bg-danger/20 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {pendingOnKitchen ? 'Pending…' : 'Close valve'}
                </button>
              )}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
```

- [ ] **Step 2: Verify type-check**

Run: `npx tsc --noEmit --jsx react-jsx src/features/valves/ValvesPage.tsx --strict --skipLibCheck --esModuleInterop`
Expected: exits 0.

- [ ] **Step 3: Commit**

```bash
git add src/features/valves/ValvesPage.tsx
git commit -m "$(cat <<'EOF'
feat: add Valve Control page

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

## Task 24: AI Insights page

**Files:**
- Create: `src/features/insights/InsightsPage.tsx`

**Interfaces:**
- Consumes: `useScenario` (Task 8).
- Produces: `InsightsPage` default export, mounted at `/app/insights` by Task 32.

- [ ] **Step 1: Write the page**

```tsx
// src/features/insights/InsightsPage.tsx
import { useScenario } from '../../state/scenario';
import { StatusPill } from '../../components/ui/StatusPill';

export default function InsightsPage() {
  const { phase } = useScenario();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <h1 className="font-display text-2xl text-mist">AI Insights</h1>
        <StatusPill tone="attention" label="Beta · rule-based" />
      </div>
      <p className="font-body text-sm text-steel max-w-lg">
        These are transparent, rule-based observations, not predictions from a trained model. A trained model
        will be introduced only after enough real-world data has been collected.
      </p>

      <section className="rounded-2xl border border-steel/20 bg-ink2 p-5 flex flex-col gap-3">
        {phase === 'leak' ? (
          <p className="font-body text-sm text-mist">
            Kitchen line flow has held above its expected range for longer than the configured confirmation
            window, with no matching fixture activity logged. This pattern matches the rule for a possible
            continuous-flow leak.
          </p>
        ) : (
          <p className="font-body text-sm text-mist">
            No section has shown a sustained flow pattern outside its configured baseline in the last 24 hours.
          </p>
        )}
      </section>
    </div>
  );
}
```

- [ ] **Step 2: Verify type-check**

Run: `npx tsc --noEmit --jsx react-jsx src/features/insights/InsightsPage.tsx --strict --skipLibCheck --esModuleInterop`
Expected: exits 0.

- [ ] **Step 3: Commit**

```bash
git add src/features/insights/InsightsPage.tsx
git commit -m "$(cat <<'EOF'
feat: add AI Insights page

Explicitly labeled beta/rule-based, no trained-model claims, per the
handoff report's guidance to introduce ML only after real data exists.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

## Task 25: Reports page

**Files:**
- Create: `src/features/reports/ReportsPage.tsx`

**Interfaces:**
- Produces: `ReportsPage` default export, mounted at `/app/reports` by Task 32.

- [ ] **Step 1: Write the page**

```tsx
// src/features/reports/ReportsPage.tsx
import { useState } from 'react';
import { IconExport, IconFileText } from '../../components/ui/icons';

export default function ReportsPage() {
  const [from, setFrom] = useState('2026-09-01');
  const [to, setTo] = useState('2026-09-18');

  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-display text-2xl text-mist">Reports</h1>

      <section className="rounded-2xl border border-steel/20 bg-ink2 p-5 flex flex-wrap items-end gap-4">
        <label className="flex flex-col gap-1.5">
          <span className="text-xs text-steel">From</span>
          <input type="date" value={from} onChange={(e) => setFrom(e.target.value)} className="rounded-lg bg-ink border border-steel/30 px-3 py-2 text-mist text-sm" />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="text-xs text-steel">To</span>
          <input type="date" value={to} onChange={(e) => setTo(e.target.value)} className="rounded-lg bg-ink border border-steel/30 px-3 py-2 text-mist text-sm" />
        </label>
        <button type="button" className="rounded-lg bg-aqua text-ink text-sm font-medium px-4 py-2 hover:bg-mist transition-colors">
          Generate report
        </button>
      </section>

      <section className="rounded-2xl border border-steel/20 bg-ink2 p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-base text-mist">Consumption & incident summary</h2>
          <div className="flex gap-2">
            <button type="button" className="flex items-center gap-1.5 text-sm text-steel hover:text-mist transition-colors">
              <IconFileText size={14} /> PDF
            </button>
            <button type="button" className="flex items-center gap-1.5 text-sm text-steel hover:text-mist transition-colors">
              <IconExport size={14} /> CSV
            </button>
          </div>
        </div>
        <p className="font-body text-sm text-steel">
          {from} to {to}: 8,940 L total consumption across 7 sections, 1 possible-leak alert (Kitchen, resolved),
          0 pump faults.
        </p>
      </section>
    </div>
  );
}
```

- [ ] **Step 2: Verify type-check**

Run: `npx tsc --noEmit --jsx react-jsx src/features/reports/ReportsPage.tsx --strict --skipLibCheck --esModuleInterop`
Expected: exits 0.

- [ ] **Step 3: Commit**

```bash
git add src/features/reports/ReportsPage.tsx
git commit -m "$(cat <<'EOF'
feat: add Reports page

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

## Task 26: Devices & Settings page

**Files:**
- Create: `src/features/devices/DevicesPage.tsx`

**Interfaces:**
- Consumes: `devices` (Task 4); `DataTable` (Task 12); `StatusPill` (Task 9); `IconPlus` (Task 9).
- Produces: `DevicesPage` default export, mounted at `/app/devices` by Task 32.

- [ ] **Step 1: Write the page**

```tsx
// src/features/devices/DevicesPage.tsx
import { devices } from '../../data/fixtures/devices';
import { DataTable } from '../../components/ui/DataTable';
import { StatusPill } from '../../components/ui/StatusPill';
import { IconPlus } from '../../components/ui/icons';
import type { DeviceStatus } from '../../data/types';

const STATUS_TONE: Record<DeviceStatus, 'good' | 'attention' | 'danger'> = {
  online: 'good',
  attention: 'attention',
  offline: 'danger',
};

export default function DevicesPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl text-mist">Devices & Settings</h1>
        <button type="button" className="flex items-center gap-1.5 rounded-lg bg-ink2 border border-steel/30 text-mist text-sm px-3 py-2 hover:border-aqua/50 transition-colors">
          <IconPlus size={14} /> Add device
        </button>
      </div>

      <section className="rounded-2xl border border-steel/20 bg-ink2 p-5">
        <DataTable
          columns={[
            { key: 'label', label: 'Device' },
            { key: 'type', label: 'Type' },
            { key: 'status', label: 'Status' },
            { key: 'lastSeen', label: 'Last seen' },
            { key: 'firmware', label: 'Firmware' },
          ]}
          rows={devices.map((d) => ({
            label: <><span className="text-mist">{d.label}</span><br /><span className="text-xs text-steel">{d.id}</span></>,
            type: d.type,
            status: <StatusPill tone={STATUS_TONE[d.status]} label={d.status} />,
            lastSeen: d.lastSeen,
            firmware: d.firmwareVersion,
          }))}
        />
      </section>
    </div>
  );
}
```

- [ ] **Step 2: Verify type-check**

Run: `npx tsc --noEmit --jsx react-jsx src/features/devices/DevicesPage.tsx --strict --skipLibCheck --esModuleInterop`
Expected: exits 0.

- [ ] **Step 3: Commit**

```bash
git add src/features/devices/DevicesPage.tsx
git commit -m "$(cat <<'EOF'
feat: add Devices & Settings page

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

## Task 27: Admin Overview page

**Files:**
- Create: `src/features/admin/AdminOverviewPage.tsx`

**Interfaces:**
- Consumes: `adminCustomers` (Task 6); `devices` (Task 4); `baselineAlerts` (Task 5); `MetricReadout` (Task 11).
- Produces: `AdminOverviewPage` default export, mounted at `/admin/overview` by Task 32.

- [ ] **Step 1: Write the page**

```tsx
// src/features/admin/AdminOverviewPage.tsx
import { adminCustomers } from '../../data/fixtures/admin';
import { devices } from '../../data/fixtures/devices';
import { baselineAlerts } from '../../data/fixtures/alerts';
import { MetricReadout } from '../../components/ui/MetricReadout';

export default function AdminOverviewPage() {
  const onlineDevices = devices.filter((d) => d.status === 'online').length;

  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-display text-2xl text-mist">Overview</h1>
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-steel/20 bg-ink2 p-4">
          <MetricReadout label="Active customers" value={adminCustomers.filter((c) => c.status === 'active').length} />
        </div>
        <div className="rounded-2xl border border-steel/20 bg-ink2 p-4">
          <MetricReadout label="Devices online" value={`${onlineDevices}/${devices.length}`} />
        </div>
        <div className="rounded-2xl border border-steel/20 bg-ink2 p-4">
          <MetricReadout label="Open system alerts" value={baselineAlerts.length} />
        </div>
        <div className="rounded-2xl border border-steel/20 bg-ink2 p-4">
          <MetricReadout label="Pending onboarding" value={adminCustomers.filter((c) => c.status === 'pending').length} />
        </div>
      </section>
    </div>
  );
}
```

- [ ] **Step 2: Verify type-check**

Run: `npx tsc --noEmit --jsx react-jsx src/features/admin/AdminOverviewPage.tsx --strict --skipLibCheck --esModuleInterop`
Expected: exits 0.

- [ ] **Step 3: Commit**

```bash
git add src/features/admin/AdminOverviewPage.tsx
git commit -m "$(cat <<'EOF'
feat: add Admin Overview page

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

## Task 28: Admin Customers & Properties page

**Files:**
- Create: `src/features/admin/AdminCustomersPage.tsx`

**Interfaces:**
- Consumes: `adminCustomers` (Task 6); `DataTable` (Task 12); `StatusPill` (Task 9).
- Produces: `AdminCustomersPage` default export, mounted at `/admin/customers` by Task 32.

- [ ] **Step 1: Write the page**

```tsx
// src/features/admin/AdminCustomersPage.tsx
import { adminCustomers } from '../../data/fixtures/admin';
import { DataTable } from '../../components/ui/DataTable';
import { StatusPill } from '../../components/ui/StatusPill';
import type { AdminCustomer } from '../../data/types';

const STATUS_TONE: Record<AdminCustomer['status'], 'good' | 'attention' | 'danger'> = {
  active: 'good',
  pending: 'attention',
  suspended: 'danger',
};

export default function AdminCustomersPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-display text-2xl text-mist">Customers & Properties</h1>
      <section className="rounded-2xl border border-steel/20 bg-ink2 p-5">
        <DataTable
          columns={[
            { key: 'name', label: 'Customer' },
            { key: 'property', label: 'Property' },
            { key: 'status', label: 'Status' },
            { key: 'devices', label: 'Devices' },
            { key: 'joined', label: 'Joined' },
          ]}
          rows={adminCustomers.map((c) => ({
            name: c.name,
            property: c.propertyName,
            status: <StatusPill tone={STATUS_TONE[c.status]} label={c.status} />,
            devices: c.deviceCount,
            joined: c.joinedAt,
          }))}
        />
      </section>
    </div>
  );
}
```

- [ ] **Step 2: Verify type-check**

Run: `npx tsc --noEmit --jsx react-jsx src/features/admin/AdminCustomersPage.tsx --strict --skipLibCheck --esModuleInterop`
Expected: exits 0.

- [ ] **Step 3: Commit**

```bash
git add src/features/admin/AdminCustomersPage.tsx
git commit -m "$(cat <<'EOF'
feat: add Admin Customers & Properties page

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

## Task 29: Admin Devices page

**Files:**
- Create: `src/features/admin/AdminDevicesPage.tsx`

**Interfaces:**
- Consumes: `devices` (Task 4); `DataTable` (Task 12); `StatusPill` (Task 9).
- Produces: `AdminDevicesPage` default export, mounted at `/admin/devices` by Task 32.

- [ ] **Step 1: Write the page**

```tsx
// src/features/admin/AdminDevicesPage.tsx
import { devices } from '../../data/fixtures/devices';
import { DataTable } from '../../components/ui/DataTable';
import { StatusPill } from '../../components/ui/StatusPill';
import type { DeviceStatus } from '../../data/types';

const STATUS_TONE: Record<DeviceStatus, 'good' | 'attention' | 'danger'> = {
  online: 'good',
  attention: 'attention',
  offline: 'danger',
};

export default function AdminDevicesPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-display text-2xl text-mist">Devices</h1>
      <section className="rounded-2xl border border-steel/20 bg-ink2 p-5">
        <DataTable
          columns={[
            { key: 'id', label: 'Device ID' },
            { key: 'type', label: 'Type' },
            { key: 'status', label: 'Status' },
            { key: 'lastSeen', label: 'Last seen' },
          ]}
          rows={devices.map((d) => ({
            id: d.id,
            type: d.type,
            status: <StatusPill tone={STATUS_TONE[d.status]} label={d.status} />,
            lastSeen: d.lastSeen,
          }))}
        />
      </section>
    </div>
  );
}
```

- [ ] **Step 2: Verify type-check**

Run: `npx tsc --noEmit --jsx react-jsx src/features/admin/AdminDevicesPage.tsx --strict --skipLibCheck --esModuleInterop`
Expected: exits 0.

- [ ] **Step 3: Commit**

```bash
git add src/features/admin/AdminDevicesPage.tsx
git commit -m "$(cat <<'EOF'
feat: add Admin Devices page

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

## Task 30: Admin System Alerts page

**Files:**
- Create: `src/features/admin/AdminAlertsPage.tsx`

**Interfaces:**
- Consumes: `baselineAlerts` (Task 5); `useScenario` for `activeAlert` (Task 8); `DataTable` (Task 12); `StatusPill` (Task 9).
- Produces: `AdminAlertsPage` default export, mounted at `/admin/alerts` by Task 32.

- [ ] **Step 1: Write the page**

```tsx
// src/features/admin/AdminAlertsPage.tsx
import { useMemo } from 'react';
import { useScenario } from '../../state/scenario';
import { baselineAlerts } from '../../data/fixtures/alerts';
import { DataTable } from '../../components/ui/DataTable';
import { StatusPill } from '../../components/ui/StatusPill';
import type { Alert } from '../../data/types';

const SEVERITY_TONE: Record<Alert['severity'], 'good' | 'attention' | 'danger'> = {
  low: 'good',
  medium: 'attention',
  high: 'danger',
};

export default function AdminAlertsPage() {
  const { activeAlert } = useScenario();
  const allAlerts = useMemo(() => (activeAlert ? [activeAlert, ...baselineAlerts] : baselineAlerts), [activeAlert]);

  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-display text-2xl text-mist">System Alerts</h1>
      <section className="rounded-2xl border border-steel/20 bg-ink2 p-5">
        <DataTable
          columns={[
            { key: 'severity', label: 'Severity' },
            { key: 'section', label: 'Section' },
            { key: 'title', label: 'Event' },
            { key: 'status', label: 'Status' },
          ]}
          rows={allAlerts.map((a) => ({
            severity: <StatusPill tone={SEVERITY_TONE[a.severity]} label={a.severity} />,
            section: a.sectionId,
            title: a.title,
            status: <StatusPill tone={a.status === 'open' ? 'attention' : 'good'} label={a.status} />,
          }))}
          emptyLabel="No system-wide alerts."
        />
      </section>
    </div>
  );
}
```

- [ ] **Step 2: Verify type-check**

Run: `npx tsc --noEmit --jsx react-jsx src/features/admin/AdminAlertsPage.tsx --strict --skipLibCheck --esModuleInterop`
Expected: exits 0.

- [ ] **Step 3: Commit**

```bash
git add src/features/admin/AdminAlertsPage.tsx
git commit -m "$(cat <<'EOF'
feat: add Admin System Alerts page

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

## Task 31: Admin Audit Trail page

**Files:**
- Create: `src/features/admin/AdminAuditPage.tsx`

**Interfaces:**
- Consumes: `auditLog` (Task 6); `DataTable` (Task 12); `StatusPill` (Task 9).
- Produces: `AdminAuditPage` default export, mounted at `/admin/audit` by Task 32.

- [ ] **Step 1: Write the page**

```tsx
// src/features/admin/AdminAuditPage.tsx
import { auditLog } from '../../data/fixtures/admin';
import { DataTable } from '../../components/ui/DataTable';
import { StatusPill } from '../../components/ui/StatusPill';

export default function AdminAuditPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-display text-2xl text-mist">Audit Trail</h1>
      <section className="rounded-2xl border border-steel/20 bg-ink2 p-5">
        <DataTable
          columns={[
            { key: 'actor', label: 'Actor' },
            { key: 'action', label: 'Action' },
            { key: 'target', label: 'Target' },
            { key: 'timestamp', label: 'Timestamp' },
            { key: 'result', label: 'Result' },
          ]}
          rows={auditLog.map((entry) => ({
            actor: entry.actor,
            action: entry.action,
            target: entry.target,
            timestamp: new Date(entry.timestamp).toLocaleString(),
            result: <StatusPill tone={entry.result === 'success' ? 'good' : 'danger'} label={entry.result} />,
          }))}
        />
      </section>
    </div>
  );
}
```

- [ ] **Step 2: Verify type-check**

Run: `npx tsc --noEmit --jsx react-jsx src/features/admin/AdminAuditPage.tsx --strict --skipLibCheck --esModuleInterop`
Expected: exits 0.

- [ ] **Step 3: Commit**

```bash
git add src/features/admin/AdminAuditPage.tsx
git commit -m "$(cat <<'EOF'
feat: add Admin Audit Trail page

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

## Task 32: Router setup — replace App.tsx, delete the old campus dashboard

**Do this task last**, after every page component in Tasks 16–31 exists — this task's imports must all resolve on the first pass, with no placeholder components.

**Files:**
- Modify: `src/App.tsx` (full rewrite)
- Delete: `src/dashboard.css`

**Interfaces:**
- Consumes: `AuthProvider`/`useAuth` (Task 7), `ScenarioProvider` (Task 8), `MarketingPage` (Task 13), `LoginPage` (Task 14), `AppShell`/`AdminShell` (Task 15), and every page component produced by Tasks 16–31.

- [ ] **Step 1: Write the router**

```tsx
// src/App.tsx
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AuthProvider, useAuth } from './state/auth';
import { ScenarioProvider } from './state/scenario';

import MarketingPage from './features/marketing/MarketingPage';
import LoginPage from './features/auth/LoginPage';
import AppShell from './features/app-shell/AppShell';
import AdminShell from './features/app-shell/AdminShell';

import DashboardPage from './features/dashboard/DashboardPage';
import SectionsPage from './features/sections/SectionsPage';
import SectionDetailPage from './features/sections/SectionDetailPage';
import UsagePage from './features/usage/UsagePage';
import TankPage from './features/tank/TankPage';
import QualityPage from './features/quality/QualityPage';
import AlertsPage from './features/alerts/AlertsPage';
import PumpPage from './features/pump/PumpPage';
import ValvesPage from './features/valves/ValvesPage';
import InsightsPage from './features/insights/InsightsPage';
import ReportsPage from './features/reports/ReportsPage';
import DevicesPage from './features/devices/DevicesPage';

import AdminOverviewPage from './features/admin/AdminOverviewPage';
import AdminCustomersPage from './features/admin/AdminCustomersPage';
import AdminDevicesPage from './features/admin/AdminDevicesPage';
import AdminAlertsPage from './features/admin/AdminAlertsPage';
import AdminAuditPage from './features/admin/AdminAuditPage';

function RequireRole({ role, children }: { role: 'customer' | 'admin'; children: React.ReactNode }) {
  const { role: currentRole, signedIn } = useAuth();
  if (!signedIn) return <Navigate to="/login" replace />;
  if (currentRole !== role) return <Navigate to={role === 'admin' ? '/app/dashboard' : '/admin/overview'} replace />;
  return <>{children}</>;
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ScenarioProvider>
          <Routes>
            <Route path="/" element={<MarketingPage />} />
            <Route path="/login" element={<LoginPage />} />

            <Route
              path="/app"
              element={
                <RequireRole role="customer">
                  <AppShell />
                </RequireRole>
              }
            >
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<DashboardPage />} />
              <Route path="sections" element={<SectionsPage />} />
              <Route path="sections/:sectionId" element={<SectionDetailPage />} />
              <Route path="usage" element={<UsagePage />} />
              <Route path="tank" element={<TankPage />} />
              <Route path="quality" element={<QualityPage />} />
              <Route path="alerts" element={<AlertsPage />} />
              <Route path="pump" element={<PumpPage />} />
              <Route path="valves" element={<ValvesPage />} />
              <Route path="insights" element={<InsightsPage />} />
              <Route path="reports" element={<ReportsPage />} />
              <Route path="devices" element={<DevicesPage />} />
            </Route>

            <Route
              path="/admin"
              element={
                <RequireRole role="admin">
                  <AdminShell />
                </RequireRole>
              }
            >
              <Route index element={<Navigate to="overview" replace />} />
              <Route path="overview" element={<AdminOverviewPage />} />
              <Route path="customers" element={<AdminCustomersPage />} />
              <Route path="devices" element={<AdminDevicesPage />} />
              <Route path="alerts" element={<AdminAlertsPage />} />
              <Route path="audit" element={<AdminAuditPage />} />
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </ScenarioProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
```

- [ ] **Step 2: Delete the old dashboard stylesheet**

```bash
git rm src/dashboard.css
```

- [ ] **Step 3: Verify the app builds end-to-end**

Run: `npm run build`
Expected: exits 0, no missing-module or type errors. If this fails because a page task below hasn't landed yet, stop and complete the missing task first — do not add placeholder components here.

- [ ] **Step 4: Manual verification**

Run: `npm run dev`, open the printed local URL in a browser, and confirm:
- `/` shows the restored marketing landing page.
- Clicking "Sign in" goes to `/login`.
- Submitting either login tab navigates to `/app/dashboard`.
- The sidebar's "Switch to admin view" link navigates to `/admin/overview`.
- Visiting `/app/dashboard` directly without signing in redirects to `/login`.

- [ ] **Step 5: Commit**

```bash
git add src/App.tsx
git commit -m "$(cat <<'EOF'
feat: wire up the route tree, retire the campus-demo App.tsx

Replaces the old single-file Aquasight dashboard with react-router
routes: marketing site, simulated login, role-gated /app and /admin
shells. This is the last integration point, done only after every
page component it imports exists.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

## Task 33: Update the architecture doc

**Files:**
- Modify: `docs/product-architecture.md`

**Interfaces:**
- None — documentation only, no code interfaces.

- [ ] **Step 1: Replace the "Frontend structure" section**

The doc currently describes the old single-file `App.tsx` + `dashboard.css` layout. Replace it with the actual structure built in Tasks 1-32:

```text
src/
  App.tsx                   router setup, auth/scenario providers, route tree
  state/
    auth.tsx                simulated sign-in/role-switch context
    scenario.tsx            normal -> possible-leak -> contained demo narrative
  data/
    types.ts                data model types
    fixtures/               typed sample data per domain
  components/ui/            Gauge, StatusPill, DataTable, RiserList, MetricReadout, icons
  features/
    marketing/              public landing page (existing sections, unchanged)
    auth/                   Login/Signup
    app-shell/              customer + admin shell layouts
    dashboard/ sections/ usage/ tank/ quality/ alerts/
    pump/ valves/ insights/ reports/ devices/    (customer pages)
    admin/                  overview, customers, devices, alerts, audit
docs/product-architecture.md
```

- [ ] **Step 2: Update the "Suggested starting data model" section**

Note that `src/data/types.ts` (Task 3) now implements this model directly in the demo, rather than it being aspirational.

- [ ] **Step 3: Commit**

```bash
git add docs/product-architecture.md
git commit -m "$(cat <<'EOF'
docs: update architecture doc to match the built residential platform

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

## Task 34: Full acceptance smoke test

**Files:** none (verification only).

**Interfaces:** none.

- [ ] **Step 1: Type-check and lint the whole app**

Run: `npm run build && npm run lint`
Expected: both exit 0.

- [ ] **Step 2: Manual click-through against the report's MVP checklist (§15)**

Run: `npm run dev`, and in the browser walk through each item, checking it against what the report requires (adapted for a frontend-only demo — items needing a real backend, like "live data only when received from a device," are verified as "clearly labeled simulated" instead):

- [ ] Landing page (`/`) loads with the Smart Water Flow brand, navy/aqua theme, and working fonts (Bricolage Grotesque headlines, IBM Plex Sans body — inspect via browser devtools that neither falls back to a system font).
- [ ] `/login` sign-in and sign-up tabs both work and land on `/app/dashboard`.
- [ ] All 7 sections (Bathroom 1/2/3, Kitchen, Washing Area, Parking, Garden) appear on `/app/sections` with correct names.
- [ ] Every reading on Dashboard/Usage/Tank/Quality shows a unit; timestamps are human-readable, not raw ISO strings, on Sections detail and Audit pages.
- [ ] Water Usage's section filter changes the combined flow number.
- [ ] Water Quality page never states or implies the water is "safe to drink."
- [ ] Clicking "Run incident demo" on Dashboard flips the Kitchen section to "Possible leak," and the same alert appears on `/app/alerts` and `/admin/alerts`.
- [ ] Clicking "Close valve" on `/app/valves` (or "Close Kitchen valve" on Dashboard) shows a pending state before the valve reports closed — never instant.
- [ ] Pump Control's start/stop button shows "Command pending" before flipping state.
- [ ] Reports page accepts a date range and shows PDF/CSV export buttons (may be inert).
- [ ] `/admin/customers` lists the 3 seeded customers with correct statuses.
- [ ] `/admin/audit` lists the 3 seeded audit entries.
- [ ] Switching role (customer ↔ admin) via the sidebar button moves between `/app/*` and `/admin/*`.
- [ ] Every page and the marketing site render without horizontal scroll at a 375px-wide mobile viewport (use browser devtools device toolbar).
- [ ] No ALL-CAPS eyebrow labels, no `A · B · C` middot strings, no arrow-suffixed button text anywhere in the app (grep the page visually, not just the source, since Tailwind's `uppercase` class can be applied without literal caps in the source).

- [ ] **Step 3: Fix anything that fails**

If any checklist item fails, identify which task's file is responsible, fix it in place, and re-run the relevant step from that task before continuing. Do not commit a fix without re-verifying the specific checklist item it addresses.

- [ ] **Step 4: Final commit (if fixes were made)**

```bash
git add -A
git commit -m "$(cat <<'EOF'
fix: resolve issues found in final acceptance smoke test

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

If no fixes were needed, this task ends at Step 2 with no commit.
