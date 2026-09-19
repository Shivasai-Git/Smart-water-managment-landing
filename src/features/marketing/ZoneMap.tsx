// Schematic floor plan for the topology section. The active zone is toggled by
// setupLanding() (behaviors.ts) via the `is-active` class on each [data-zid] group.
interface Zone {
  id: string;
  label: string;
  x: number;
  y: number;
  w: number;
  h: number;
  /** point on the trunk line the branch leaves from */
  tap: [number, number];
}

const TRUNK_Y = 195;

const ZONES: Zone[] = [
  { id: 'kitchen', label: 'Kitchen', x: 20, y: 90, w: 150, h: 95, tap: [95, TRUNK_Y] },
  { id: 'bath1', label: 'Bathroom 1', x: 180, y: 90, w: 100, h: 95, tap: [230, TRUNK_Y] },
  { id: 'bath2', label: 'Bathroom 2', x: 290, y: 90, w: 100, h: 95, tap: [340, TRUNK_Y] },
  { id: 'washing', label: 'Washing Area', x: 20, y: 205, w: 150, h: 115, tap: [95, TRUNK_Y] },
  { id: 'bath3', label: 'Bathroom 3', x: 180, y: 205, w: 100, h: 115, tap: [230, TRUNK_Y] },
  { id: 'parking', label: 'Parking', x: 410, y: 80, w: 180, h: 240, tap: [500, TRUNK_Y] },
  { id: 'garden', label: 'Garden', x: 10, y: 10, w: 580, h: 60, tap: [175, TRUNK_Y] },
];

export default function ZoneMap() {
  return (
    <svg
      id="zone-map"
      className="zone-map w-full h-full"
      viewBox="0 0 600 330"
      role="img"
      aria-label="Schematic floor plan of the seven monitored residential water zones"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <pattern id="zm-grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M20 0H0V20" fill="none" stroke="#e2e8f0" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="600" height="330" fill="url(#zm-grid)" />

      {/* trunk line + meter */}
      <path className="zone-trunk" d={`M20 ${TRUNK_Y}H590`} />
      <path className="zone-flow" d={`M340 ${TRUNK_Y}H20`} />
      <path className="zone-flow" d={`M340 ${TRUNK_Y}H590`} />
      <path className="zone-trunk" d={`M340 ${TRUNK_Y}V300`} />
      <path className="zone-flow" d={`M340 300V${TRUNK_Y}`} />
      <g transform="translate(300 232)">
        <rect width="80" height="88" rx="10" className="zone-plant" />
        <text x="40" y="34" textAnchor="middle" className="zone-caption">Main Meter</text>
        <text x="40" y="50" textAnchor="middle" className="zone-caption">& Tank</text>
        <circle cx="40" cy="70" r="5" className="zone-sensor" />
      </g>

      {ZONES.map((z) => {
        const cx = z.x + z.w / 2;
        const cy = z.y + z.h / 2;
        const branchEnd = z.id === 'garden' ? z.y + z.h : z.y < TRUNK_Y ? z.y + z.h : z.y;
        return (
          <g key={z.id} data-zid={z.id} className={`zone-g${z.id === 'kitchen' ? ' is-active' : ''}`}>
            <path className="zone-branch" d={`M${z.tap[0]} ${TRUNK_Y}V${branchEnd}`} />
            <rect x={z.x} y={z.y} width={z.w} height={z.h} rx="10" className="zone-room" />
            <text x={cx} y={cy - 4} textAnchor="middle" className="zone-label">{z.label}</text>
            <circle cx={cx} cy={cy + 12} r="4" className="zone-sensor" />
          </g>
        );
      })}
    </svg>
  );
}
