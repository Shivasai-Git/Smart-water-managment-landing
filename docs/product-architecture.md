# Aquasight demo — product architecture

## Purpose

Aquasight is a presentation-only Smart Water Management SaaS demo. Every reading, alert, device state and command is explicitly simulated. It demonstrates normal operation → anomaly detection → investigation → valve isolation → contained incident.

## Recommended stack

| Layer | Demo implementation | Production direction |
|---|---|---|
| UI | React 19, TypeScript, Vite, CSS design tokens | Same, with a component library only if it preserves the visual system |
| State | React local state and typed fixture data | TanStack Query plus a lightweight client store |
| API | Static adapter boundary | Node/NestJS or FastAPI REST API, OpenAPI contract |
| Stream ingestion | Deterministic scenario state | MQTT broker → ingestion service → time-series pipeline |
| Primary data | In-memory fixtures | PostgreSQL for tenancy/configuration; TimescaleDB or InfluxDB for telemetry |
| Authentication | Deliberately omitted | SSO/OIDC, RBAC, tenant isolation, audit trails |
| Device control | Simulated confirmation and acknowledgement | Signed commands, device acknowledgement, approvals, safety interlocks |

## Frontend structure

```text
src/
  App.tsx                  # shell, navigation, presentation state machine
  dashboard.css            # SaaS design system and responsive component styles
  index.css                # base styles
  data/                    # next: typed fixture data and scenario timelines
  components/              # next: page, chart, device and control components
  services/                # next: telemetry/control adapters with mock + API implementations
docs/product-architecture.md
```

The current single-file dashboard is intentionally compact for a pitch prototype. Before implementation grows, split into `features/overview`, `features/quality`, `features/incidents`, `features/devices`, and `features/control`, keeping each feature's types, API adapter and UI together.

## Core data model

```text
Tenant → Site → Zone → Asset (tank / valve / meter / sensor)
Asset → TelemetryReading (timestamp, metric, value, unit, quality)
Zone + time window → ConsumptionAggregate
DetectionRun → Insight / Alert → Incident → ControlCommand → AuditEvent
```

Required records: `Tenant`, `User`, `Site`, `Zone`, `Asset`, `Device`, `TelemetryReading`, `QualityReading`, `TankReading`, `Alert`, `Incident`, `Insight`, `ControlCommand`, `AuditEvent`, and `ThresholdPolicy`.

## Simulation strategy

The "Run incident demo" control advances a deterministic state machine: normal → leak → contained. The leak step drives Zone B to 78.6 L/min, creates an AI insight and high-priority alert. The contained state closes the simulated valve and shows estimated loss avoided.

Production telemetry must never be mixed with demo fixtures. Use an explicit `dataSource: 'simulated' | 'live'` field and render the provenance badge throughout the UI.

## SaaS UX system

- Restrained utility palette: deep teal navigation, white surfaces, mint for normal operations, red only for urgent action.
- Information hierarchy: system state first, four executive metrics second, then monitoring, insight and actionable detail.
- All high-consequence actions use a confirmation surface and tell the presenter the command is simulated.
- WCAG-aware contrast, keyboard-visible controls and responsive layout are included; live alerts should additionally use accessible status announcements in production.

## Items needing user input before production

- Customer/site names, zones, asset naming conventions, units and locale.
- Actual sensor/device protocol, payload schemas, sampling rate and offline behaviour.
- Regulatory thresholds and which water-quality metrics define the score.
- Alert routing/escalation, valve authority and safety/approval rules.
- Brand identity, users/roles, tenancy model, retention and compliance requirements.
