import Link from 'next/link';
import { RESORTS } from '@/lib/resorts';
import { dayName, getWeather, icon } from '@/lib/weather';
import { fmt, sv, Top } from '@/components/ui';
export const revalidate = 1800;
export default async function Page() {
  const wx = await getWeather();
  return (
    <div className="page"><Top t="Forecast" s="7-day outlook at each summit" />
      <div style={{ display: 'grid', gap: 14 }}>{RESORTS.map((r, i) => { const w = wx[r.id]; return (
        <Link key={r.id} href={`/resorts/${r.id}`} className="card" style={sv({ '--i': i })}><p className="lab">{r.name}</p>
          {w ? <div className="days">{w.days.map(d => <div key={d.date}>{dayName(d.date)}<span>{icon(d.code)}</span>{fmt(d.hi, '°')}<small className="up" style={{ display: 'block' }}>{d.snow >= 0.1 ? d.snow.toFixed(1) + '"' : '\u00a0'}</small></div>)}</div> : <p className="dim">Unavailable right now</p>}
        </Link>); })}</div>
    </div>
  );
}
