export interface PipeNode {
  id: string;
  type: 'tank' | 'sensor' | 'controller' | 'valve' | 'pump' | 'cloud' | 'flowmeter';
  label: string;
  sublabel?: string;
  x: number;
  y: number;
  status: 'normal' | 'active' | 'warning' | 'standby';
}

export interface IndustrialSystemNetwork {
  waterPath: string;
  dataPath: string;
  nodes: PipeNode[];
  totalWaterLength: number;
  totalDataLength: number;
  width: number;
  height: number;
}

/**
 * Builds an engineered orthogonal industrial pipe path with rounded fillet bends (radius r).
 */
export function buildFilletedPath(points: [number, number][], radius = 28): string {
  if (points.length < 2) return '';
  if (points.length === 2) {
    const [p0, p1] = points;
    return `M ${p0[0].toFixed(1)} ${p0[1].toFixed(1)} L ${p1[0].toFixed(1)} ${p1[1].toFixed(1)}`;
  }

  let d = `M ${points[0][0].toFixed(1)} ${points[0][1].toFixed(1)}`;

  for (let i = 1; i < points.length - 1; i++) {
    const pPrev = points[i - 1];
    const pCurr = points[i];
    const pNext = points[i + 1];

    // Vectors
    const vInX = pCurr[0] - pPrev[0];
    const vInY = pCurr[1] - pPrev[1];
    const lenIn = Math.hypot(vInX, vInY);

    const vOutX = pNext[0] - pCurr[0];
    const vOutY = pNext[1] - pCurr[1];
    const lenOut = Math.hypot(vOutX, vOutY);

    if (lenIn < 1 || lenOut < 1) {
      d += ` L ${pCurr[0].toFixed(1)} ${pCurr[1].toFixed(1)}`;
      continue;
    }

    const r = Math.min(radius, lenIn / 2, lenOut / 2);

    const uInX = vInX / lenIn;
    const uInY = vInY / lenIn;
    const uOutX = vOutX / lenOut;
    const uOutY = vOutY / lenOut;

    const cornerStartX = pCurr[0] - uInX * r;
    const cornerStartY = pCurr[1] - uInY * r;

    const cornerEndX = pCurr[0] + uOutX * r;
    const cornerEndY = pCurr[1] + uOutY * r;

    // Line to start of curve
    d += ` L ${cornerStartX.toFixed(1)} ${cornerStartY.toFixed(1)}`;
    // Quadratic bezier through the vertex
    d += ` Q ${pCurr[0].toFixed(1)} ${pCurr[1].toFixed(1)} ${cornerEndX.toFixed(1)} ${cornerEndY.toFixed(1)}`;
  }

  const last = points[points.length - 1];
  d += ` L ${last[0].toFixed(1)} ${last[1].toFixed(1)}`;

  return d;
}

/**
 * Builds the complete industrial water and digital telemetry network across the document.
 */
export function buildIndustrialNetwork(): IndustrialSystemNetwork {
  if (typeof document === 'undefined') {
    return { waterPath: '', dataPath: '', nodes: [], totalWaterLength: 0, totalDataLength: 0, width: 0, height: 0 };
  }

  const root = document.documentElement;
  const W = root.clientWidth;
  const H = Math.max(root.scrollHeight, document.body.scrollHeight);
  const isMobile = W < 768;

  // Retrieve functional sections
  const heroEl = document.getElementById('top');
  const problemEl = document.getElementById('problem');
  const howEl = document.getElementById('how-it-works');
  const capEl = document.getElementById('capabilities');
  const dashEl = document.getElementById('dashboard');
  const audEl = document.getElementById('audience');
  const visEl = document.getElementById('vision');

  const sy = window.scrollY;
  const getY = (el: HTMLElement | null, fallbackRatio: number) => {
    if (!el) return H * fallbackRatio;
    const r = el.getBoundingClientRect();
    return r.top + sy + r.height * 0.45;
  };

  const yHero = getY(heroEl, 0.08);
  const yProblem = getY(problemEl, 0.22);
  const yHow = getY(howEl, 0.38);
  const yCap = getY(capEl, 0.55);
  const yDash = getY(dashEl, 0.72);
  const yAud = getY(audEl, 0.86);
  const yVis = getY(visEl, 0.96);

  const nodes: PipeNode[] = [];

  let waterPoints: [number, number][] = [];
  let dataPoints: [number, number][] = [];

  if (isMobile) {
    // --- Streamlined Vertical Architecture on Mobile ---
    const spineX = Math.min(W - 24, Math.max(24, W * 0.92));

    waterPoints = [
      [spineX, 80],
      [spineX, yHero],
      [spineX, yProblem],
      [spineX, yHow],
      [spineX, yCap],
      [spineX, yDash],
      [spineX, yAud],
      [spineX, yVis],
    ];

    dataPoints = [
      [spineX - 10, yHero + 20],
      [spineX - 10, yHow],
      [spineX - 10, yCap],
      [spineX - 10, yDash],
      [spineX - 10, yVis],
    ];

    nodes.push(
      { id: 'node-tank', type: 'tank', label: 'Tank Inflow', x: spineX, y: yHero, status: 'active' },
      { id: 'node-sensor', type: 'sensor', label: 'Telemetry', x: spineX, y: yProblem, status: 'normal' },
      { id: 'node-ctrl', type: 'controller', label: 'Edge MCU', x: spineX, y: yHow, status: 'active' },
      { id: 'node-valve', type: 'valve', label: 'Cutoff Solenoid', x: spineX, y: yCap, status: 'normal' },
      { id: 'node-pump', type: 'pump', label: 'Smart Pump', x: spineX, y: yDash, status: 'active' },
      { id: 'node-vis', type: 'sensor', label: 'System Guard', x: spineX, y: yVis, status: 'active' }
    );
  } else {
    // --- Structured Engineered Industrial Grid on Desktop ---
    const leftMargin = Math.max(48, (W - 1280) / 2 + 24);
    const rightMargin = Math.min(W - 48, W - (W - 1280) / 2 - 24);

    const xTank = rightMargin - 80;
    const xMidRight = rightMargin - 180;
    const xCenter = W * 0.5;
    const xMidLeft = leftMargin + 160;
    const xLeft = leftMargin + 40;

    // Engineered Full-Page Water Main Route:
    // Tank -> Problem Sensor -> Controller -> Capabilities Valve -> Dashboard Pump -> Audience Grid -> Final Stable System
    waterPoints = [
      [xTank, 90],
      [xTank, yHero],
      [xMidRight, yHero],
      [xMidRight, yProblem - 30],
      [(xMidRight + xCenter) / 2, yProblem - 30],
      [(xMidRight + xCenter) / 2, yHow],
      [xCenter, yHow],
      [xCenter, yCap - 40],
      [xMidLeft, yCap - 40],
      [xMidLeft, yDash],
      [xLeft + 80, yDash],
      [xLeft + 80, yAud],
      [xCenter, yAud],
      [xCenter, yVis],
    ];

    // Digital Data Telemetry Route:
    dataPoints = [
      [xTank - 18, yHero + 30],
      [xTank - 18, yHero + 140],
      [xCenter + 70, yHero + 140],
      [xCenter + 70, yHow - 30],
      [xCenter + 150, yHow - 30],
      [xCenter + 150, yCap + 30],
      [xMidLeft + 30, yCap + 30],
      [xMidLeft + 30, yDash - 20],
      [xCenter, yDash + 50],
      [xCenter, yVis],
    ];

    nodes.push(
      { id: 'node-tank', type: 'tank', label: 'Rooftop Storage', sublabel: 'Overhead Level Node', x: xTank, y: yHero, status: 'active' },
      { id: 'node-flow', type: 'flowmeter', label: 'Flow Rate Sensor', sublabel: 'Inlet Turbine', x: xMidRight, y: yProblem - 30, status: 'normal' },
      { id: 'node-ctrl', type: 'controller', label: 'Core Controller', sublabel: '32-Bit Edge Logic', x: xCenter, y: yHow, status: 'active' },
      { id: 'node-cloud', type: 'cloud', label: 'IoT Telemetry', sublabel: 'Real-time TSDB', x: xCenter + 150, y: yCap + 30, status: 'normal' },
      { id: 'node-valve', type: 'valve', label: 'Auto Cutoff Valve', sublabel: 'Overflow Safeguard', x: xMidLeft, y: yCap - 40, status: 'normal' },
      { id: 'node-pump', type: 'pump', label: 'Motor Actuator', sublabel: 'Smart Relay', x: xMidLeft, y: yDash, status: 'active' },
      { id: 'node-vis', type: 'sensor', label: 'Distribution Hub', sublabel: 'Building Endpoints', x: xCenter, y: yVis, status: 'active' }
    );
  }

  const waterPath = buildFilletedPath(waterPoints, isMobile ? 18 : 34);
  const dataPath = buildFilletedPath(dataPoints, isMobile ? 12 : 22);

  // Compute lengths for stroke-dash calculations
  const svgNs = 'http://www.w3.org/2000/svg';
  let totalWaterLength = 1200;
  let totalDataLength = 900;

  try {
    const tempW = document.createElementNS(svgNs, 'path');
    tempW.setAttribute('d', waterPath);
    totalWaterLength = tempW.getTotalLength() || 1200;

    const tempD = document.createElementNS(svgNs, 'path');
    tempD.setAttribute('d', dataPath);
    totalDataLength = tempD.getTotalLength() || 900;
  } catch {
    // fallback
  }

  return {
    waterPath,
    dataPath,
    nodes,
    totalWaterLength,
    totalDataLength,
    width: W,
    height: H,
  };
}
