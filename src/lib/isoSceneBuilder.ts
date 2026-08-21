export function buildIsoSvgContent(): string {
  const S = 30;
  const OX = 520;
  const OY = 420;

  const P = (x: number, y: number, z = 0): [number, number] => [
    OX + (x - y) * 25.9808,
    OY + (x + y) * 15 - z * S,
  ];

  const s = (a: [number, number]) => a[0].toFixed(1) + ',' + a[1].toFixed(1);

  const pg = (p: [number, number][], f: string, st?: string, sw?: number) =>
    `<polygon points="${p.map(s).join(' ')}" fill="${f}"${st ? ` stroke="${st}" stroke-width="${sw || 1}" stroke-linejoin="round"` : ''}/>`;

  const ln = (a: [number, number], b: [number, number], c: string, w: number, cls?: string) =>
    `<line x1="${a[0].toFixed(1)}" y1="${a[1].toFixed(1)}" x2="${b[0].toFixed(1)}" y2="${b[1].toFixed(1)}" stroke="${c}" stroke-width="${w}" stroke-linecap="round"${cls ? ` class="${cls}"` : ''}/>`;

  function box(
    x: number,
    y: number,
    z: number,
    w: number,
    d: number,
    h: number,
    t: string,
    r: string,
    l: string,
    st?: string
  ) {
    const A = P(x, y, z + h),
      B = P(x + w, y, z + h),
      C = P(x + w, y + d, z + h),
      D = P(x, y + d, z + h),
      b = P(x + w, y, z),
      c = P(x + w, y + d, z),
      e = P(x, y + d, z);
    return pg([A, B, C, D], t, st) + pg([B, C, c, b], r, st) + pg([D, C, c, e], l, st);
  }

  function cyl(
    x: number,
    y: number,
    zb: number,
    zt: number,
    R: number,
    body: string,
    top: string,
    st?: string
  ) {
    const Ct = P(x, y, zt),
      Cb = P(x, y, zb),
      rx = 1.2247 * R * S,
      ry = 0.7071 * R * S;
    return (
      `<path d="M${(Ct[0] - rx).toFixed(1)},${Ct[1].toFixed(1)} L${(Cb[0] - rx).toFixed(1)},${Cb[1].toFixed(1)} A${rx.toFixed(1)},${ry.toFixed(1)} 0 0 0 ${(Cb[0] + rx).toFixed(1)},${Cb[1].toFixed(1)} L${(Ct[0] + rx).toFixed(1)},${Ct[1].toFixed(1)} Z" fill="${body}" stroke="${st}" stroke-width="1.1"/>` +
      `<ellipse cx="${Ct[0].toFixed(1)}" cy="${Ct[1].toFixed(1)}" rx="${rx.toFixed(1)}" ry="${ry.toFixed(1)}" fill="${top}" stroke="${st}" stroke-width="1.1"/>`
    );
  }

  const ST = '#3C6A99',
    AQ = '#3FA9F0',
    SAF = '#FFA03C',
    STL = '#7C99BA',
    MST = '#E4EFFA',
    TILE = '#8A5433';

  const layer = (inner: string, delay: number) =>
    `<g class="part" style="transition-delay:${delay}s">${inner}</g>`;

  const TKX = 2.3,
    TKY = 2.3,
    TR = 1.75,
    CUT = 4.6;

  const Ct = P(TKX, TKY, 11.3),
    Cb = P(TKX, TKY, 7.5),
    TRX = 1.2247 * TR * S,
    TRY = 0.7071 * TR * S,
    botY = Cb[1] - 6;

  const pumpC = P(7.4, 1.8, 7.6),
    geyC = P(8.8, 2.3, 2.7),
    roC = P(6.4, 8.9, 1.9),
    hubC = P(0, 7.2, 2.0),
    leakA = P(TKX, TKY, 2.4);

  let g = `<defs>
    <linearGradient id="tankWaterGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#BDEAFF"/><stop offset=".24" stop-color="#64C3FF"/><stop offset="1" stop-color="#1479C9"/>
    </linearGradient>
    <filter id="tankWaterGlow" x="-35%" y="-20%" width="170%" height="150%">
      <feGaussianBlur stdDeviation="2.4" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>`;

  /* --- ground grid --- */
  let grid = '';
  for (let i = -2.5; i <= 13; i += 1.5)
    grid += ln(P(i, -2.5, 0), P(i, 13, 0), '#1B3A5C', 0.7) + ln(P(-2.5, i, 0), P(13, i, 0), '#1B3A5C', 0.7);
  g += layer(`<g opacity=".55">${grid}</g>`, 0);

  /* --- plinth + floor --- */
  g += layer(
    box(-0.5, -0.5, -0.5, 11, 11, 0.5, '#0C2440', '#081930', '#061322', ST) +
      pg([P(0, 0, 0), P(10, 0, 0), P(10, 10, 0), P(0, 10, 0)], '#122F4E', ST) +
      (function () {
        let t = '';
        for (let i = 2; i < 10; i += 2) {
          t += ln(P(i, 0, 0), P(i, 10, 0), '#1A3C60', 0.7) + ln(P(0, i, 0), P(10, i, 0), '#1A3C60', 0.7);
        }
        return t;
      })(),
    0.08
  );

  /* --- walls with tile grid --- */
  g += layer(
    box(0, -0.28, 0, 10, 0.28, 6, '#2A5A8E', '#1B426C', '#1D4570', ST) +
      box(-0.28, 0, 0, 0.28, 10, 6, '#2A5A8E', '#1F4A77', '#1B426C', ST) +
      (function () {
        let t = '';
        for (let i = 1; i < 10; i++) {
          t += ln(P(i, 0, 0), P(i, 0, 6), '#2D5E95', 0.6) + ln(P(0, i, 0), P(0, i, 6), '#2D5E95', 0.6);
        }
        for (let k = 1; k < 6; k++) {
          t += ln(P(0, 0, k), P(10, 0, k), '#2D5E95', 0.6) + ln(P(0, 0, k), P(0, 10, k), '#2D5E95', 0.6);
        }
        return t;
      })(),
    0.16
  );

  /* --- indoor pipework --- */
  const rTop = P(TKX, TKY, 6.05),
    rBot = P(TKX, TKY, 1.2),
    bA1 = P(8.8, TKY, 1.2),
    bA2 = P(8.8, 2.3, 1.8),
    bB1 = P(TKX, 8.9, 1.2),
    bB2 = P(6.4, 8.9, 1.2);
  const pipe = (a: [number, number], b: [number, number]) =>
    ln(a, b, '#2E5A90', 9) + ln(a, b, AQ, 3.2, 'pipeflow');
  g += layer(pipe(rTop, rBot) + pipe(rBot, bA1) + pipe(bA1, bA2) + pipe(rBot, bB1) + pipe(bB1, bB2), 0.5);

  /* --- indoor devices --- */
  g += layer(
    cyl(8.8, 2.3, 1.8, 3.7, 0.5, '#235486', '#2D6BA6', ST) +
      `<circle cx="${(geyC[0] + 13).toFixed(1)}" cy="${(geyC[1] - 30).toFixed(1)}" r="3.6" fill="${AQ}" class="node"/>` +
      box(5.8, 8.3, 0, 1.3, 1.2, 1.9, '#275E98', '#1B4572', '#183D64', ST) +
      `<rect x="${(roC[0] - 12).toFixed(1)}" y="${(roC[1] + 7).toFixed(1)}" width="24" height="7" rx="3" fill="${AQ}" opacity=".6"/>` +
      `<circle cx="${(roC[0] + 15).toFixed(1)}" cy="${(roC[1] - 3).toFixed(1)}" r="3.6" fill="${AQ}" class="node"/>` +
      box(-0.3, 6.7, 1.6, 0.34, 1.3, 1, '#2D6AA4', '#1F4E80', '#1B4672', ST) +
      `<circle cx="${(hubC[0] - 4).toFixed(1)}" cy="${(hubC[1] - 8).toFixed(1)}" r="4.4" fill="${SAF}" class="node"/>` +
      `<rect x="${(leakA[0] - 11).toFixed(1)}" y="${(leakA[1] - 13).toFixed(1)}" width="22" height="26" rx="8" fill="none" stroke="${AQ}" stroke-width="2.6"/>` +
      `<circle cx="${(leakA[0] + 16).toFixed(1)}" cy="${(leakA[1] - 15).toFixed(1)}" r="3.6" fill="${AQ}" class="node"/>`,
    0.58
  );

  /* --- cutaway roof --- */
  const R6 = (x: number, y: number) => P(x, y, 6),
    R64 = (x: number, y: number) => P(x, y, 6.4);
  g += layer(
    pg(
      [
        R64(-0.5, -0.5),
        R64(10.5, -0.5),
        R64(10.5, CUT),
        R64(CUT, CUT),
        R64(CUT, 10.5),
        R64(-0.5, 10.5),
      ],
      '#214E82',
      ST
    ) +
      pg([R64(10.5, -0.5), R64(10.5, CUT), R6(10.5, CUT), R6(10.5, -0.5)], '#143566', ST) +
      pg([R64(10.5, CUT), R64(CUT, CUT), R6(CUT, CUT), R6(10.5, CUT)], '#0E2952', ST) +
      pg([R64(CUT, CUT), R64(CUT, 10.5), R6(CUT, 10.5), R6(CUT, CUT)], '#143566', ST) +
      pg([R64(CUT, 10.5), R64(-0.5, 10.5), R6(-0.5, 10.5), R6(CUT, 10.5)], '#0E2952', ST) +
      box(-0.5, -0.5, 6.4, 11, 0.3, 0.6, '#295D95', '#193E68', '#193E68', ST) +
      box(-0.5, -0.5, 6.4, 0.3, 11, 0.6, '#295D95', '#193E68', '#193E68', ST) +
      box(-0.7, 10.25, 5.72, 5.5, 0.5, 0.28, TILE, '#6B4028', '#6B4028', '#4A2C1C') +
      box(10.25, -0.7, 5.72, 0.5, 5.5, 0.28, TILE, '#6B4028', '#6B4028', '#4A2C1C'),
    0.24
  );

  /* --- tank, legs, water --- */
  let legs = '';
  [
    [-1.05, -1.05],
    [1.05, -1.05],
    [-1.05, 1.05],
    [1.05, 1.05],
  ].forEach(([a, b]) => {
    legs += ln(P(TKX + a, TKY + b, 6.4), P(TKX + a, TKY + b, 7.6), '#3C6A99', 3.6);
  });
  const tankBody = `M${(Ct[0] - TRX + 4).toFixed(1)},${Ct[1].toFixed(1)} L${(Cb[0] - TRX + 4).toFixed(1)},${Cb[1].toFixed(1)} A${(TRX - 4).toFixed(1)},${(TRY - 3).toFixed(1)} 0 0 0 ${(Cb[0] + TRX - 4).toFixed(1)},${Cb[1].toFixed(1)} L${(Ct[0] + TRX - 4).toFixed(1)},${Ct[1].toFixed(1)} Z`;
  g += layer(
    legs +
      ln(P(7.4, 1.8, 7.15), P(TKX, 1.8, 7.15), '#2E5A90', 7) +
      ln(P(TKX, 1.8, 7.15), [Cb[0], Cb[1] + 3], '#2E5A90', 7) +
      ln(P(7.4, 1.8, 7.15), P(TKX, 1.8, 7.15), AQ, 2.6, 'pipeflow') +
      `<clipPath id="tankClip"><path d="${tankBody}"/></clipPath>` +
      cyl(TKX, TKY, 7.5, 11.3, TR, 'rgba(170,206,238,.24)', 'rgba(170,206,238,.30)', '#6EA8DA') +
      `<g clip-path="url(#tankClip)">
       <rect id="wRect" x="${(Ct[0] - TRX).toFixed(1)}" y="${botY.toFixed(1)}" width="${(TRX * 2).toFixed(1)}" height="4" fill="url(#tankWaterGrad)" opacity=".88"/>
       <rect id="wRect2" x="${(Ct[0] - TRX).toFixed(1)}" y="${botY.toFixed(1)}" width="${(TRX * 2).toFixed(1)}" height="4" fill="#BDEAFF" opacity=".30"/>
     </g>` +
      `<ellipse id="wSurf" cx="${Ct[0].toFixed(1)}" cy="${botY.toFixed(1)}" rx="${(TRX - 5).toFixed(1)}" ry="${(TRY - 4).toFixed(1)}" fill="#BDEAFF" stroke="#E4F7FF" stroke-width="1.3" opacity="0"/>` +
      `<ellipse id="wRipple" cx="${Ct[0].toFixed(1)}" cy="${botY.toFixed(1)}" rx="${(TRX - 9).toFixed(1)}" ry="${(TRY - 6).toFixed(1)}" fill="none" stroke="#E4F7FF" stroke-width="2" opacity="0"/>` +
      `<path d="${tankBody}" fill="none" stroke="#8FD3FF" stroke-width="2.2" opacity=".72"/>` +
      (function () {
        let r = '';
        for (let i = 1; i < 4; i++) {
          const y = Ct[1] + i * ((Cb[1] - Ct[1]) / 4);
          r += `<path d="M${(Ct[0] - TRX).toFixed(1)},${y.toFixed(1)} A${TRX.toFixed(1)},${TRY.toFixed(1)} 0 0 0 ${(Ct[0] + TRX).toFixed(1)},${y.toFixed(1)}" fill="none" stroke="${ST}" stroke-width="1" opacity=".7"/>`;
        }
        return r;
      })() +
      `<path d="M${Ct[0].toFixed(1)},${(Ct[1] - 2).toFixed(1)} L${(Ct[0] - 13).toFixed(1)},${(Ct[1] + 30).toFixed(1)} L${(Ct[0] + 13).toFixed(1)},${(Ct[1] + 30).toFixed(1)} Z" fill="${AQ}" opacity=".10"/>` +
      `<rect x="${(Ct[0] - 15).toFixed(1)}" y="${(Ct[1] - 16).toFixed(1)}" width="30" height="13" rx="5" fill="${AQ}"/>` +
      `<circle cx="${Ct[0].toFixed(1)}" cy="${(Ct[1] - 9.5).toFixed(1)}" r="3" fill="#04121E" class="node"/>` +
      ln([Ct[0], Ct[1] - 74], [Ct[0], Ct[1] - 16], AQ, 3, 'pipeflow'),
    0.34
  );

  /* --- pump --- */
  g += layer(
    box(6.5, 1.1, 6.4, 1.9, 1.4, 0.5, '#295D95', '#1B426C', '#173B60', ST) +
      cyl(7.2, 1.8, 6.9, 7.95, 0.58, '#2760A2', '#3378B6', ST) +
      box(8.3, 1.25, 6.9, 0.7, 1.15, 0.85, '#295D95', '#1C4670', '#193F66', ST) +
      `<circle cx="${pumpC[0].toFixed(1)}" cy="${(pumpC[1] - 26).toFixed(1)}" r="4" fill="${SAF}" class="node"/>`,
    0.42
  );

  /* --- phone --- */
  const PX = 800,
    PY = 520,
    PW = 112,
    PH = 224;
  g += layer(
    `<rect x="${PX}" y="${PY}" width="${PW}" height="${PH}" rx="17" fill="#0A1D36" stroke="${ST}" stroke-width="1.6"/>
     <rect x="${PX + 7}" y="${PY + 7}" width="${PW - 14}" height="${PH - 14}" rx="12" fill="#102E52"/>
     <rect x="${PX + 42}" y="${PY + 12}" width="28" height="4" rx="2" fill="#0A1D36"/>
     <text x="${PX + 15}" y="${PY + 38}" fill="${STL}" font-family="IBM Plex Mono, monospace" font-size="8" letter-spacing="1">TANK 01</text>
     <path d="M${PX + 22},${PY + 94} A38,38 0 0 1 ${PX + 90},${PY + 94}" fill="none" stroke="#1C4374" stroke-width="7" stroke-linecap="round"/>
     <path id="gauge" d="M${PX + 22},${PY + 94} A38,38 0 0 1 ${PX + 90},${PY + 94}" fill="none" stroke="${AQ}" stroke-width="7" stroke-linecap="round" stroke-dasharray="119.4" stroke-dashoffset="119.4" style="transition:stroke-dashoffset 1.1s cubic-bezier(.16,1,.3,1)"/>
     <text id="gaugeTxt" x="${PX + 56}" y="${PY + 118}" text-anchor="middle" fill="${MST}" font-family="IBM Plex Sans, sans-serif" font-size="19" font-weight="600">0%</text>
     <rect class="bar" x="${PX + 18}" y="${PY + 170}" width="12" height="0" rx="3" fill="${AQ}" opacity=".85"/>
     <rect class="bar" x="${PX + 36}" y="${PY + 170}" width="12" height="0" rx="3" fill="${AQ}" opacity=".85"/>
     <rect class="bar" x="${PX + 54}" y="${PY + 170}" width="12" height="0" rx="3" fill="${SAF}" opacity=".85"/>
     <rect class="bar" x="${PX + 72}" y="${PY + 170}" width="12" height="0" rx="3" fill="${AQ}" opacity=".85"/>
     <text x="${PX + 15}" y="${PY + 198}" fill="${STL}" font-family="IBM Plex Mono, monospace" font-size="7.5" letter-spacing=".8">ALL DEVICES OK</text>`,
    0.66
  );

  /* --- wireless links --- */
  const HUB: [number, number] = [hubC[0] - 4, hubC[1] - 8];
  const arc = (a: [number, number], b: [number, number], c: string) => {
    const mx = (a[0] + b[0]) / 2,
      my = (a[1] + b[1]) / 2 - Math.abs(a[0] - b[0]) * 0.2 - 26;
    return `<path d="M${a[0].toFixed(1)},${a[1].toFixed(1)} Q${mx.toFixed(1)},${my.toFixed(1)} ${b[0].toFixed(1)},${b[1].toFixed(1)}" fill="none" stroke="${c}" stroke-width="1.5" class="sig" opacity=".75"/>`;
  };
  g += layer(
    arc([Ct[0], Ct[1] - 9], HUB, SAF) +
      arc([pumpC[0], pumpC[1] - 26], HUB, SAF) +
      arc([leakA[0] + 16, leakA[1] - 15], HUB, SAF) +
      arc([geyC[0] + 13, geyC[1] - 30], HUB, SAF) +
      arc([roC[0] + 15, roC[1] - 3], HUB, SAF) +
      arc(HUB, [PX + 8, PY + 46], AQ),
    0.74
  );

  /* --- labels --- */
  const LABELS: [[number, number], number, number, string, 'start' | 'end'][] = [
    [[Ct[0], Ct[1] - 16], 946, 96, 'Tank level sensor', 'start'],
    [[pumpC[0], pumpC[1] - 26], 946, 244, 'Pump controller', 'start'],
    [[geyC[0] + 13, geyC[1] - 30], 946, 436, 'Geyser monitor', 'start'],
    [[PX + PW - 4, PY + 160], 962, 772, 'Mobile app', 'start'],
    [[leakA[0] - 11, leakA[1]], 232, 332, 'Leak detector', 'end'],
    [[HUB[0], HUB[1]], 232, 486, 'IoT hub', 'end'],
    [[roC[0] - 12, roC[1] + 10], 232, 650, 'RO / quality sensor', 'end'],
  ];

  LABELS.forEach(([a, tx, ty, txt, al], i) => {
    const right = al === 'start',
      ex = right ? tx - 14 : tx + 14,
      bend = (a[0] + ex) / 2;
    g += `<g class="lab" style="transition-delay:${(0.95 + i * 0.13).toFixed(2)}s">
      <polyline points="${a[0].toFixed(1)},${a[1].toFixed(1)} ${bend.toFixed(1)},${ty} ${ex},${ty}" fill="none" stroke="${STL}" stroke-width="1" opacity=".6"/>
      <circle cx="${a[0].toFixed(1)}" cy="${a[1].toFixed(1)}" r="2.8" fill="${STL}"/>
      <text x="${tx}" y="${ty + 4}" text-anchor="${al}" fill="${MST}" font-family="IBM Plex Mono, monospace" font-size="12.5" letter-spacing=".6">${txt}</text></g>`;
  });

  return g;
}
