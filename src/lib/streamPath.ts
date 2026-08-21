export const NDROPS = 8;
export const SN = 560;

export interface StreamState {
  L: number;
  samples: Float32Array | null;
  stageOff: [number, number][];
  built: boolean;
  d: string;
  joints: [number, number][];
  W: number;
  H: number;
}

export function buildStreamPath(): StreamState {
  if (typeof document === 'undefined') {
    return { L: 0, samples: null, stageOff: [], built: false, d: '', joints: [], W: 0, H: 0 };
  }

  const root = document.documentElement;
  const W = root.clientWidth;
  const H = Math.max(root.scrollHeight, document.body.scrollHeight);

  const narrow = W < 900;
  const sy = window.scrollY;
  const gutter = W < 480 ? Math.max(12, W * 0.04) : W < 900 ? 22 : 34;

  const nodeEls = Array.from(document.querySelectorAll<HTMLElement>('[data-node]'));
  let pts: [number, number][] = nodeEls
    .map((n) => {
      const r = n.getBoundingClientRect();
      const ratio = Number.parseFloat(n.dataset.node || '0.5');
      const x = narrow ? gutter : Math.min(Math.max(W * (Number.isFinite(ratio) ? ratio : 0.5), gutter), W - gutter);
      return [x, r.top + sy + r.height / 2] as [number, number];
    })
    .filter((p) => Number.isFinite(p[0]) && Number.isFinite(p[1]))
    .sort((a, b) => a[1] - b[1]);

  if (pts.length < 2) {
    return { L: 0, samples: null, stageOff: [], built: false, d: '', joints: [], W, H };
  }

  pts = pts.filter((p, i, a) => !i || p[1] - a[i - 1][1] > 2);
  pts.unshift([pts[0][0], Math.max(0, pts[0][1] - 280)]);

  const inlet = document.getElementById('tankInlet');
  if (inlet) {
    const ir = inlet.getBoundingClientRect();
    pts.push([Math.min(Math.max(ir.left + window.scrollX, gutter), W - gutter), ir.top + sy]);
  } else {
    pts.push([pts[pts.length - 1][0], H - 40]);
  }

  let d = `M ${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`;
  for (let i = 1; i < pts.length; i++) {
    const [x0, y0] = pts[i - 1];
    const [x1, y1] = pts[i];
    const m = (y1 - y0) * 0.5;
    d += ` C ${x0.toFixed(1)} ${(y0 + m).toFixed(1)}, ${x1.toFixed(1)} ${(y1 - m).toFixed(1)}, ${x1.toFixed(1)} ${y1.toFixed(1)}`;
  }

  const svgNs = 'http://www.w3.org/2000/svg';
  const tempPath = document.createElementNS(svgNs, 'path');
  tempPath.setAttribute('d', d);
  const L = tempPath.getTotalLength();

  if (!Number.isFinite(L) || L <= 1) {
    return { L: 0, samples: null, stageOff: [], built: false, d: '', joints: [], W, H };
  }

  const samples = new Float32Array((SN + 1) * 2);
  for (let i = 0; i <= SN; i++) {
    const q = tempPath.getPointAtLength((i / SN) * L);
    samples[i * 2] = q.x;
    samples[i * 2 + 1] = q.y;
  }

  const joints: [number, number][] = pts.slice(1, -1);
  const stages = Array.from(document.querySelectorAll<HTMLElement>('.stage'));
  const stageOff: [number, number][] = stages.map((el) => {
    const r = el.getBoundingClientRect();
    return [r.top + sy, r.height];
  });

  return { L, samples, stageOff, built: true, d, joints, W, H };
}

export function progressAtY(y: number, samples: Float32Array | null): number {
  if (!samples) return 0;
  const first = samples[1];
  const last = samples[SN * 2 + 1];
  if (y <= first) return 0;
  if (y >= last) return 1;
  let lo = 0;
  let hi = SN;
  while (hi - lo > 1) {
    const mid = (lo + hi) >> 1;
    if (samples[mid * 2 + 1] < y) lo = mid;
    else hi = mid;
  }
  const ya = samples[lo * 2 + 1];
  const yb = samples[hi * 2 + 1];
  const f = (y - ya) / Math.max(0.001, yb - ya);
  return Math.min(1, Math.max(0, (lo + f) / SN));
}
