import Link from 'next/link';
import { RESORTS } from '@/lib/resorts';
import type { Wx } from '@/lib/weather';
import { fmt } from './ui';
const P: Record<string, number[]> = { sugarbowl: [95, 58, 9, -6], palisades: [150, 88, 9, 6], northstar: [225, 72, 9, -6], mtrose: [305, 98, -37, 18], heavenly: [265, 212, 9, 16], kirkwood: [190, 268, 9, 6] };
export default function SnowMap({ wx }: { wx: Record<string, Wx> }) {
  return (
    <div className="map pop">
      <svg viewBox="0 0 400 300">
        <rect width="400" height="300" fill="#0f2a43" />
        <g fill="none" stroke="#fff" strokeOpacity=".07"><ellipse cx="200" cy="150" rx="190" ry="130" /><ellipse cx="200" cy="150" rx="150" ry="100" /><ellipse cx="200" cy="150" rx="110" ry="72" /></g>
        {RESORTS.map(r => <circle key={r.id} cx={P[r.id][0]} cy={P[r.id][1]} r={15 + (wx[r.id]?.depth ?? 0) * 0.42} fill="#0a84ff" opacity=".55" style={{ filter: 'blur(14px)' }} />)}
        <path d="M165 122C185 100 225 106 232 136C240 166 225 196 200 201C170 206 150 172 165 122Z" fill="#2f7fd1" fillOpacity=".85" stroke="#8fd3ff" strokeOpacity=".5" />
        {RESORTS.map(r => {
          const [x, y, dx, dy] = P[r.id];
          return (
            <Link key={r.id} href={`/resorts/${r.id}`}>
              <g fill="#fff" fontSize="10" fontWeight="600" style={{ cursor: 'pointer' }}>
                <circle cx={x} cy={y} r="20" fill="transparent" /><circle cx={x} cy={y} r="5" />
                <circle cx={x} cy={y} r="5" fill="none" stroke="#fff" strokeWidth="1.5"><animate attributeName="r" values="5;16" dur="2.4s" repeatCount="indefinite" /><animate attributeName="opacity" values=".9;0" dur="2.4s" repeatCount="indefinite" /></circle>
                <text x={x + dx} y={y + dy}>{r.short} {fmt(wx[r.id]?.depth)}</text>
              </g>
            </Link>
          );
        })}
      </svg>
    </div>
  );
}
