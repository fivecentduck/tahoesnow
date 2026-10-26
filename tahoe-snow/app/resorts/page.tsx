import Link from 'next/link';
import { RESORTS } from '@/lib/resorts';
import { getWeather, score } from '@/lib/weather';
import { fmt, Ring, sv, Top } from '@/components/ui';
export const revalidate = 1800;
export default async function Page() {
  const wx = await getWeather();
  return (
    <div className="page"><Top t="Resorts" s="Live conditions and powder score" />
      <div className="grid">{RESORTS.map((r, i) => { const w = wx[r.id]; return (
        <Link key={r.id} href={`/resorts/${r.id}`} className="card rs" style={sv({ '--i': i })}>
          <h3>{r.name}</h3>
          <div className="stats"><div><b>{fmt(w?.depth)}</b><span className="dim">Base</span></div><div><b>{fmt(w?.d24)}</b><span className="dim">Today</span></div><div><b>{fmt(w?.w7)}</b><span className="dim">7 day</span></div>
            {w && <div style={{ marginLeft: 'auto', alignSelf: 'center' }}><Ring s={score(w)} /></div>}</div>
          <p className="dim">{r.region}</p>
        </Link>); })}</div>
    </div>
  );
}
