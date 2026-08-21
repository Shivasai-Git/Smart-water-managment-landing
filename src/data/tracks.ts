export interface TrackData {
  title: string;
  body: string;
  label: string;
  list: [string, string][];
  svg: string;
}

export const TRACKS: TrackData[] = [
  {
    title: 'Track two — no-drill retrofit',
    body: 'No cutting pipes. No breaking walls. No electrician required. Sensors that clamp, sit or stick. Wireless links between them. A hub that plugs into a standard socket. This is the one that opens the real market.',
    label: 'Existing plumbing · untouched',
    list: [
      ['Fit time', 'About 90 minutes per flat'],
      ['Water shut off', 'Never'],
      ['Plumber needed', 'No'],
      ['Reversible', 'Comes off without a trace'],
    ],
    svg: `<svg viewBox="0 0 520 300" class="w-full h-auto"><defs><linearGradient id="wg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3FA9F0" stop-opacity=".55"/><stop offset="1" stop-color="#3FA9F0" stop-opacity=".16"/></linearGradient></defs>
  <rect x="60" y="60" width="180" height="140" rx="14" fill="none" stroke="#7C99BA" stroke-width="2" class="draw"/>
  <rect x="68" y="118" width="164" height="74" rx="9" fill="url(#wg)"/>
  <path d="M68 122 q20 -8 41 0 t41 0 t41 0 t41 0" fill="none" stroke="#3FA9F0" stroke-width="2" opacity=".8"/>
  <rect x="128" y="40" width="44" height="20" rx="7" fill="#3FA9F0"/><circle cx="150" cy="50" r="4.5" fill="#04121E" class="pulse-dot"/>
  <path d="M150 62 v50" stroke="#3FA9F0" stroke-width="1.5" stroke-dasharray="3 5" opacity=".7"/>
  <path d="M240 168 H460" stroke="#7C99BA" stroke-width="10" stroke-linecap="round" opacity=".3"/>
  <path d="M240 168 H460" stroke="#3FA9F0" stroke-width="3" stroke-linecap="round" class="flowdash"/>
  <rect x="336" y="150" width="30" height="36" rx="9" fill="none" stroke="#3FA9F0" stroke-width="3"/><circle cx="351" cy="140" r="4.5" fill="#3FA9F0" class="pulse-dot"/>
  <rect x="392" y="222" width="68" height="44" rx="10" fill="none" stroke="#7C99BA" stroke-width="2" class="draw"/><circle cx="426" cy="244" r="5" fill="#3FA9F0" class="pulse-dot"/>
  <path d="M351 190 q0 40 60 44" fill="none" stroke="#3FA9F0" stroke-width="1.5" stroke-dasharray="3 5" opacity=".7"/>
  <text x="60" y="286" fill="#7C99BA" font-family="IBM Plex Mono, monospace" font-size="11">CLAMP ON · NOTHING CUT</text></svg>`,
  },
  {
    title: 'Track one — wired, new construction',
    body: 'When a building is going up, sensors and wiring go in with the plumbing. Clean, permanent, complete coverage from day one. This is the ideal version — designed in, not bolted on.',
    label: 'Inline · fitted during construction',
    list: [
      ['Fit time', 'With the plumbing stage'],
      ['Water shut off', 'During fit-out only'],
      ['Plumber needed', 'Yes, at rough-in'],
      ['Adds', 'Automatic shut-off valve'],
    ],
    svg: `<svg viewBox="0 0 520 300" class="w-full h-auto"><defs><linearGradient id="wg2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3FA9F0" stop-opacity=".55"/><stop offset="1" stop-color="#3FA9F0" stop-opacity=".16"/></linearGradient></defs>
  <rect x="60" y="60" width="180" height="140" rx="14" fill="none" stroke="#7C99BA" stroke-width="2" class="draw"/>
  <rect x="68" y="100" width="164" height="92" rx="9" fill="url(#wg2)"/>
  <path d="M68 104 q20 -8 41 0 t41 0 t41 0 t41 0" fill="none" stroke="#3FA9F0" stroke-width="2" opacity=".8"/>
  <path d="M150 60 v46" stroke="#3FA9F0" stroke-width="4" stroke-linecap="round"/><circle cx="150" cy="54" r="5" fill="#3FA9F0" class="pulse-dot"/>
  <path d="M240 168 H460" stroke="#7C99BA" stroke-width="10" stroke-linecap="round" opacity=".3"/>
  <path d="M240 168 H330" stroke="#3FA9F0" stroke-width="3" stroke-linecap="round" class="flowdash"/>
  <path d="M372 168 H460" stroke="#3FA9F0" stroke-width="3" stroke-linecap="round" class="flowdash"/>
  <circle cx="351" cy="168" r="21" fill="#04121E" stroke="#FFA03C" stroke-width="3"/><path d="M341 168h20M351 158v20" stroke="#FFA03C" stroke-width="2.5" stroke-linecap="round"/>
  <text x="316" y="212" fill="#FFA03C" font-family="IBM Plex Mono, monospace" font-size="10">SHUT-OFF</text>
  <rect x="392" y="232" width="68" height="44" rx="10" fill="none" stroke="#7C99BA" stroke-width="2" class="draw"/><circle cx="426" cy="254" r="5" fill="#3FA9F0" class="pulse-dot"/>
  <text x="60" y="286" fill="#7C99BA" font-family="IBM Plex Mono, monospace" font-size="11">INLINE · FULL CONTROL</text></svg>`,
  },
];
