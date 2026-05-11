import { Palette, Shape } from "@/types";

const PALETTES: Record<Palette, string[]> = {
  vivid: ['#C9F23D', '#FF3D8E', '#2D4EFF', '#FFD93D', '#FF7043', '#4DDFB5', '#9D5BFF'],
  pastel: ['#FFD6E8', '#C7E9FF', '#D4F4C5', '#FFE7B5', '#E5D4FF', '#FFCFC2', '#B5F0E0'],
  mono: ['#0F0F0F', '#FFFFFF', '#F0EDE4', '#C8C2B2', '#7A7A7A'],
};

function strHash(str: string): number {
  let h = 1779033703 ^ str.length;
  for (let i = 0; i < str.length; i++) {
    h = Math.imul(h ^ str.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  return h >>> 0;
}

function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

interface AvatarProps {
  seed: string;
  size?: number;
  palette?: Palette;
  shape?: Shape;
}

export function Avatar({ seed, size = 160, palette = 'mono', shape = 'mixed' }: AvatarProps) {
  const colors = PALETTES[palette] ?? PALETTES.mono;
  const rng = mulberry32(strHash(seed || 'seed'));

  let c1 = colors[Math.floor(rng() * colors.length)];
  let c2 = colors[Math.floor(rng() * colors.length)];
  while (c2 === c1 && colors.length > 1) c2 = colors[Math.floor(rng() * colors.length)];
  let c3 = colors[Math.floor(rng() * colors.length)];
  while ((c3 === c1 || c3 === c2) && colors.length > 2) c3 = colors[Math.floor(rng() * colors.length)];

  const shapeKind = shape === 'mixed'
    ? ['blob', 'geo', 'dot', 'arc'][Math.floor(rng() * 4)]
    : shape;

  const r = (a: number, b: number) => a + rng() * (b - a);
  const ink = '#0F0F0F';
  const clipId = `clip-${strHash(seed || 'x')}`;

  let primary: React.ReactNode = null;

  if (shapeKind === 'blob') {
    const cx = r(40, 60), cy = r(40, 60), rad = r(28, 36), pts = 6;
    const path: [number, number][] = [];
    for (let i = 0; i < pts; i++) {
      const a = (i / pts) * Math.PI * 2;
      path.push([cx + Math.cos(a) * rad * (0.85 + rng() * 0.3), cy + Math.sin(a) * rad * (0.85 + rng() * 0.3)]);
    }
    let d = `M${path[0][0]},${path[0][1]}`;
    for (let i = 0; i < pts; i++) {
      const p1 = path[i], p2 = path[(i + 1) % pts];
      d += ` Q${p1[0]},${p1[1]} ${(p1[0] + p2[0]) / 2},${(p1[1] + p2[1]) / 2}`;
    }
    d += ' Z';
    primary = <path d={d} fill={c2} />;
  } else if (shapeKind === 'geo') {
    const kind = Math.floor(rng() * 3);
    if (kind === 0) {
      primary = <circle cx={r(35, 65)} cy={r(35, 65)} r={r(26, 34)} fill={c2} />;
    } else if (kind === 1) {
      const w = r(48, 64), h = r(48, 64);
      primary = <rect x={50 - w / 2} y={50 - h / 2} width={w} height={h} rx={r(0, 16)} fill={c2} transform={`rotate(${r(-15, 15)} 50 50)`} />;
    } else {
      const s = r(50, 70), cx = 50, cy = 55;
      primary = <polygon points={`${cx},${cy - s / 2} ${cx + s / 2},${cy + s / 2} ${cx - s / 2},${cy + s / 2}`} fill={c2} transform={`rotate(${r(-30, 30)} ${cx} ${cy})`} />;
    }
  } else if (shapeKind === 'arc') {
    const cy = rng() > 0.5 ? 0 : 100;
    primary = <circle cx={50} cy={cy} r={r(60, 80)} fill={c2} />;
  } else {
    const dots: React.ReactNode[] = [];
    for (let y = 0; y < 4; y++)
      for (let x = 0; x < 4; x++)
        if (rng() > 0.45)
          dots.push(<circle key={`${x}-${y}`} cx={15 + x * 23} cy={15 + y * 23} r={r(5, 9)} fill={c2} />);
    primary = <g>{dots}</g>;
  }

  const accents: React.ReactNode[] = [];
  for (let i = 0; i < 1 + Math.floor(rng() * 3); i++) {
    const t = Math.floor(rng() * 4);
    const ax = r(10, 90), ay = r(10, 90);
    if (t === 0) accents.push(<circle key={`a${i}`} cx={ax} cy={ay} r={r(3, 7)} fill={c3} />);
    else if (t === 1) accents.push(<rect key={`a${i}`} x={ax} y={ay} width={r(4, 10)} height={r(4, 10)} fill={c3} />);
    else if (t === 2) accents.push(<line key={`a${i}`} x1={ax} y1={ay} x2={ax + r(-15, 15)} y2={ay + r(-15, 15)} stroke={c3} strokeWidth={r(2, 4)} strokeLinecap="round" />);
    else accents.push(<circle key={`a${i}`} cx={ax} cy={ay} r={r(4, 8)} fill="none" stroke={c3} strokeWidth={2} />);
  }

  const ribbon = rng() > 0.5
    ? <rect x="0" y={r(15, 85)} width="100" height={r(2, 5)} fill={ink} opacity={0.85} />
    : null;

  return (
    <svg viewBox="0 0 100 100" width={size} height={size} style={{ display: 'block', borderRadius: 'inherit' }}>
      <defs>
        <clipPath id={clipId}><rect x="0" y="0" width="100" height="100" /></clipPath>
      </defs>
      <g clipPath={`url(#${clipId})`}>
        <rect x="0" y="0" width="100" height="100" fill={c1} />
        {primary}
        {ribbon}
        {accents}
      </g>
    </svg>
  );
}
