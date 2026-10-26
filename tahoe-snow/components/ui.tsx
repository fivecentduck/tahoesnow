import Link from 'next/link';
import type { CSSProperties, ReactNode } from 'react';
export const sv = (o: Record<string, string | number>) => o as CSSProperties;
export const fmt = (n: number | null | undefined, u = '"') => (n == null ? '—' : Math.round(n) + u);
export const Top = ({ t, s, back, children }: { t: string; s?: string; back?: string; children?: ReactNode }) => (
  <div className="top"><div>{back && <Link href={back} className="back">‹ Back</Link>}<h1>{t}</h1>{s && <p className="sub">{s}</p>}</div>{children}</div>
);
export const curve = (a: number[], max: number) => {
  const n = Math.max(a.length - 1, 1), p = a.map((v, i) => [6 + (i * 288) / n, 84 - Math.min(v / max, 1) * 76]);
  return p.reduce((s, q, i) => (i ? s + `C${p[i - 1][0] + 144 / n},${p[i - 1][1]} ${q[0] - 144 / n},${q[1]} ${q[0]},${q[1]}` : `M${q[0]},${q[1]}`), '');
};
export const Ring = ({ s, z = 48 }: { s: number; z?: number }) => (
  <svg className="ring" width={z} height={z} viewBox="0 0 36 36" role="img" aria-label={`Powder score ${s}`}>
    <circle cx="18" cy="18" r="15" fill="none" stroke="currentColor" strokeOpacity=".12" strokeWidth="4" />
    <circle className="rg" cx="18" cy="18" r="15" fill="none" stroke={s >= 85 ? '#30b455' : s >= 65 ? '#0a84ff' : '#ff9f0a'} strokeWidth="4" strokeLinecap="round" strokeDasharray={`${s * 0.942} 100`} transform="rotate(-90 18 18)" />
    <text x="18" y="22" textAnchor="middle" fontSize="11" fontWeight="700" fill="currentColor">{s}</text>
  </svg>
);
export { default as Cam } from './Cam';
