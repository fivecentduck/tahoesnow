import Link from 'next/link';
import { RESORTS } from '@/lib/resorts';
import { getWeather, score, type Wx } from '@/lib/weather';
import { fmt, Top } from '@/components/ui';
export const revalidate = 1800;
export default async function Page() {
  const wx = await getWeather();
  const list = RESORTS.filter(r => wx[r.id]);
  if (!list.length) return <div className="page"><Top t="Summary" s="Today at a glance" /><div className="card"><p className="dim">Live data is unavailable right now. Check back in a few minutes.</p></div></div>;
  const avg = (f: (w: Wx) => number) => list.reduce((s, r) => s + f(wx[r.id]), 0) / list.length;
  const best = [...list].sort((a, b) => score(wx[b.id]) - score(wx[a.id]))[0], bw = wx[best.id];
  const next3 = avg(w => w.days.slice(0, 3).reduce((s, d) => s + d.snow, 0));
  return (
    <div className="page"><Top t="Summary" s="Today at a glance" />
      <div className="card" style={{ marginBottom: 14, padding: 28 }}>
        <p className="hero">{best.short} has the best conditions right now.</p>
        <p className="sub" style={{ marginTop: 14, maxWidth: '56ch' }}>It reports a {fmt(bw.depth)} base and {fmt(bw.d24)} of new snow today. The basin averages {fmt(next3)} more over the next three days.</p>
      </div>
      <div className="grid">
        <Link href={`/resorts/${best.id}`} className="card tile"><p className="lab">Best bet</p><b>{best.short}</b><p className="dim">Powder score {score(bw)}</p></Link>
        <div className="card tile"><p className="lab">Past 7 days, basin average</p><b>{fmt(avg(w => w.w7))}</b></div>
        <div className="card tile"><p className="lab">Next 3 days, basin average</p><b>{fmt(next3)}</b></div>
      </div>
    </div>
  );
}
