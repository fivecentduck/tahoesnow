import { notFound } from 'next/navigation';
import { RESORTS } from '@/lib/resorts';
import { dayName, getWeather, icon, score } from '@/lib/weather';
import { Cam, curve, fmt, Ring, sv, Top } from '@/components/ui';
export const revalidate = 1800;
export const generateStaticParams = () => RESORTS.map(r => ({ id: r.id }));
export default async function Page({ params }: { params: { id: string } }) {
  const r = RESORTS.find(x => x.id === params.id);
  if (!r) notFound();
  const w = (await getWeather())[r.id];
  const mx = Math.max(...(w?.days.map(d => d.snow) ?? [0]), 0.1);
  return (
    <div className="page">
      <Top t={r.name} s={`${r.region} · ${r.base.toLocaleString()}–${r.top.toLocaleString()} ft`} back="/resorts">{w && <Ring s={score(w)} z={56} />}</Top>
      {!w ? <div className="card"><p className="dim">Live conditions are unavailable right now. Try again in a few minutes.</p></div> : <>
        <div className="grid" style={{ marginBottom: 14 }}>
          <div className="card tile"><p className="lab">Base depth</p><b>{fmt(w.depth)}</b></div>
          <div className="card tile"><p className="lab">New snow today</p><b>{fmt(w.d24)}</b></div>
          <div className="card tile"><p className="lab">Last 7 days</p><b>{fmt(w.w7)}</b></div>
          <div className="card tile"><p className="lab">Summit now</p><b>{fmt(w.temp, '°F')}</b><p className="dim">Wind {fmt(w.wind, ' mph')}</p></div>
        </div>
        <div className="grid">
          <div className="card wide"><p className="lab">Snow depth, past 7 days</p>
            <svg viewBox="0 0 300 90" width="100%"><path d={`${curve(w.series, Math.max(...w.series, 1) * 1.1)}L294,84L6,84Z`} style={{ fill: 'var(--blue)', opacity: 0.12 }} /><path className="line" style={{ strokeWidth: 1.8 }} d={curve(w.series, Math.max(...w.series, 1) * 1.1)} /></svg></div>
          <div className="card"><p className="lab">Snowfall forecast</p><div className="bars">{w.days.map((d, i) => <div key={d.date}><b>{d.snow >= 0.1 ? d.snow.toFixed(1) + '"' : '0"'}</b><i style={sv({ '--h': Math.max((d.snow / mx) * 100, 3) + '%', animationDelay: i * 70 + 'ms' })} /><span>{dayName(d.date, 'narrow')}</span></div>)}</div></div>
          <div className="card wide"><p className="lab">7-day forecast</p><div className="days">{w.days.map(d => <div key={d.date}>{dayName(d.date)}<span>{icon(d.code)}</span>{fmt(d.hi, '°')}<small className="dim" style={{ display: 'block' }}>{fmt(d.lo, '°')}</small></div>)}</div></div>
          <div className="card wide"><p className="lab">Live views</p><div className="grid">{r.cams.map((c, i) => <Cam key={i} r={r} c={c} />)}</div></div>
        </div></>}
    </div>
  );
}
