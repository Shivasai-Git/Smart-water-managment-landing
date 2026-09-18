# Residential monitoring & control platform — design

Status: approved by user, 2026-09-18
Scope: sub-project 1 of 2 (commerce/shop is a separate future cycle, not covered here)

## Purpose

Rebuild the Smart Water Flow web app as a frontend-only demo/prototype that
matches the developer handoff report (`Smart_Water_Flow_Developer_Handoff_Report-1.docx`,
sections 1–19; commerce in sections 20–22 is explicitly out of scope for this
cycle). It replaces the current single-file "Aquasight" campus-facility demo,
which uses the wrong branding, generic zones, and an unrelated color theme.

This is a **presentation-only demo**: no real backend, auth, database, or
device connection. Every reading, alert, and command is simulated, and the UI
must say so wherever it matters (provenance badges, "pending" command states,
never silently claiming success).

## Non-goals

- No real authentication, database, or API — all state is client-side fixture
  data plus a lightweight auth/role context.
- No commerce/shop/service-booking (report §20–22) — separate future cycle.
- No real device protocol (MQTT/ESP32) integration.
- No production security/compliance implementation — the report's safety
  rules (§10–12) are reflected in UI copy and interaction design (pending
  states, "possible leak" language, no drinking-safety claims), not in real
  hardware interlocks.

## Information architecture / routing

Add `react-router-dom`. Route tree:

```
/                          marketing landing (existing sections, re-themed)
/login                     simulated auth (sign in / sign up toggle)
/app                       customer shell; index redirects to /app/dashboard
  /app/dashboard
  /app/sections            "My Home" — 7 section list (riser layout)
  /app/sections/:id        section detail (flow, usage history, leak events, valve state)
  /app/usage               Water Usage
  /app/tank                Tank Monitoring
  /app/quality             Water Quality
  /app/alerts              Leakage & Alerts
  /app/pump                Pump Control
  /app/valves              Valve Control
  /app/insights            AI Insights
  /app/reports             Reports
  /app/devices             Devices & Settings
/admin                     admin shell; index redirects to /admin/overview
  /admin/overview
  /admin/customers
  /admin/devices
  /admin/alerts
  /admin/audit
```

A role switcher in the customer sidebar (labeled as a demo affordance) jumps
between `/app` and `/admin`. There is no real session/logout; `/login`
"signing in" just sets the auth context and navigates to `/app/dashboard`.

## Data & fixtures layer

- `src/data/types.ts` — TypeScript types mirroring the report's data model
  (§8): `Property`, `Section`, `Device`, `SensorReading`, `Alert`, `Command`,
  `PumpRun`, `AuditLog`. Every record carries `dataSource: 'simulated'`.
- `src/data/fixtures/*.ts` — one file per domain (sections, tank, quality,
  alerts, devices, audit) with realistic residential sample data for the 7
  named sections: Bathroom 1, Bathroom 2, Bathroom 3, Kitchen, Washing Area,
  Parking, Garden, plus tank/sump/pump.
- `src/state/scenario.tsx` — React context driving the normal → possible-leak
  → contained demo narrative, scoped to a specific section (default: Kitchen)
  rather than a generic "Zone B." Commands transition through
  pending → acknowledged/failed/timed-out; never instant success.
- `src/state/auth.tsx` — React context holding `{ role: 'customer' | 'admin',
  signedIn: boolean }`, backing simulated login and the role switcher.

All UI components read from these fixtures/contexts — no inline sample data
literals in page components.

## Pages (customer, `/app/*`)

Each implements the report's §6 minimum behavior:

- **Dashboard** — connectivity, current flow, today's usage, tank levels,
  water-quality snapshot, active alerts, pump state. One glanceable summary.
- **My Home / Sections** — 7 sections in the riser layout (see Visual design);
  click into a section detail page (flow, usage history, leak events, valve
  state).
- **Water Usage** — current flow, total volume, daily/weekly/monthly trend
  chart, section filter.
- **Tank Monitoring** — sump + overhead tank level gauges, configurable
  thresholds, history chart, sensor health.
- **Water Quality** — pH/TDS/turbidity/temperature cards with units,
  timestamps, calibration-reminder banner. Copy must not claim "safe to
  drink" from these readings alone (report §12).
- **Leakage & Alerts** — table: severity, section, event time, evidence,
  acknowledge/resolve actions, history. New alerts are labeled "possible
  leak," never asserted as certain.
- **Pump Control** — state, mode (manual/auto/off), start/stop request with
  pending → acknowledged/failed lifecycle, run-time history, faults.
- **Valve Control** — per-section state, open/close request with the same
  pending/ack/fail lifecycle, last-update timestamp.
- **AI Insights** — rule-based observations, explicitly labeled "Beta ·
  rule-based" — no trained-model claims.
- **Reports** — date-range filter, consumption/incident summary, CSV/PDF
  export buttons (may be inert, but present and clearly labeled).
- **Devices & Settings** — device list (type, assignment, online/offline,
  last-seen, firmware placeholder), troubleshooting notes.

## Pages (admin, `/admin/*`)

- **Overview** — system-wide connectivity/alert summary.
- **Customers & Properties** — list, device assignment.
- **Devices** — cross-property device inventory.
- **Alerts** — system-wide alert feed.
- **Audit** — audit trail table (actor, action, target, timestamp, result).

## Login/Signup

Tabbed sign-in/sign-up form, password-reset link (present but inert, labeled
as such), no real validation against a backend. Submitting either form sets
the auth context to `role: 'customer', signedIn: true` and navigates to
`/app/dashboard`.

## Visual design system

Palette (base is fixed by the report's own brief: dark navy/blue + aqua/cyan;
the rest is a deliberate choice for this rebuild):

| Token | Hex | Use |
|---|---|---|
| `--bg` | `#0B1E33` | page background (ink-navy) |
| `--surface` | `#122A44` | panel surface |
| `--accent` | `#2DD4C8` | primary actions, live/normal status |
| `--danger` | `#FF6B5B` | alerts/leaks |
| `--good` | `#57C2A0` | normal/good status (distinct from accent) |
| `--text` | `#C8D6E5` | primary text on navy |
| `--text-muted` | `#6E86A0` | secondary text |

Type — three families, each with one job:
- **Fraunces** (serif) — page/section headlines, one or two hero numbers per
  screen.
- **IBM Plex Mono** — live sensor readouts only (flow rate, liters, ppm,
  pressure) — reads like a physical meter's digit display.
- **IBM Plex Sans** — nav, labels, body copy, buttons, everything else.

Layout:
- No identical rounded-shadow card grid. Panels are flat surfaces separated
  by hairline borders; border-radius reserved for tappable controls only.
- Recurring identity element: a vertical liquid-fill gauge (sight-glass) for
  tank level, pressure, and water-quality score — used on Dashboard, Tank
  Monitoring, Water Quality.
- "My Home / Sections" uses a connected-riser layout (sections branching off
  one vertical supply line) instead of a generic card grid.

Principles:
1. Every screen reads like a well-designed physical control panel, not a
   generic analytics dashboard.
2. Status is always color + icon + word together, never color alone.
3. Copy is plain and homeowner-facing, not ops jargon (no "hydraulic riser,"
   "FlowAI Copilot," "supervised control").
4. Commands always show pending before acknowledged/failed.
5. Avoid generic AI-design tells: no ALL-CAPS eyebrow labels, no middot-joined
   meta strings, no arrow-suffixed button text, no identical drop-shadow
   cards on every panel.

## Marketing landing page

The existing unused landing components (`Header`, `Footer`, `HeroSection`,
`ProblemSection`, etc., plus the 3D tank visuals) are wired in as the public
`/` route and re-themed to the new token palette/type system. Content
structure stays; visual treatment changes to match. `/login` and any
"open dashboard" CTA on the landing page route into the app.

## Component/folder structure

```
src/
  app/                    router setup, role-based route guards
  features/
    marketing/            restyled landing sections
    auth/                 Login/Signup
    dashboard/
    sections/             My Home + section detail
    usage/
    tank/
    quality/
    alerts/
    pump/
    valves/
    insights/
    reports/
    devices/
    admin/                overview, customers, devices, alerts, audit
  components/ui/          Gauge, StatusPill, DataTable, RiserList, MetricReadout
  data/                   types + fixtures
  state/                  auth context, scenario context
  styles/                 design tokens (tokens.css)
```

- New dependency: `react-router-dom`. No chart library — hand-rolled SVG as
  today, to avoid a generic library look.
- Existing icon helper/paths reused; a few new icons added as needed (gauge,
  house). No commerce-related icons this cycle.
- `docs/product-architecture.md` updated to reflect residential scope, route
  tree, and this file layout (it currently describes the old campus-style
  single-file structure).

## Testing

- No backend, so testing is UI-level: component rendering, route navigation,
  and interaction states (pending → acknowledged/failed command flows,
  scenario transitions). Manual verification via the `run` skill / dev server
  is the primary check, per this project's frontend-only nature.

## Open follow-ups (explicitly deferred, not blocking this cycle)

- Commerce/shop/service-booking (report §20–22) — separate brainstorm/spec.
- Any real backend, auth, or device integration.
