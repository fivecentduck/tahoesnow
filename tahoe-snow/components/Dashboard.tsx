'use client';
import Link from 'next/link';
import { useEffect, useState, type ReactNode } from 'react';
import { RESORTS } from '@/lib/resorts';
import { icon, dayName, type Wx } from '@/lib/weather';
import { Cam, fmt, sv, Top } from './ui';
import SnowMap from './SnowMap';

export default function Dashboard({ wx, today }: { wx: Record<string, Wx>; today: string }) {
  const all = RESORTS.filter(r => wx[r.id]);
  const avg = (f: (w: Wx) => number) => (all.length ? all.reduce((s, r) => s + f(wx[r.id]), 0) / all.length : null);
  const ranked = [...all].sort((a, b) => (wx[b.id].depth ?? 0) - (wx[a.id].depth ?? 0));
  const lead = ranked[0], lw = lead && wx[lead.id];
  const W: { id: string; label: string; s: number; el: ReactNode }[] = [
    { id: 'depth', label: 'Base depth', s: 1, el: <><p className="lab">Average base depth</p><p className="big">{fmt(avg(w => w.depth ?? 0))}</p><p className="dim" style={{ marginTop: 8 }}>Across {all.length} resorts</p></> },
    { id: 'new', label: 'New snow', s: 1, el: <><p className="lab">New snow today</p><p className="big">{fmt(avg(w => w.d24))}</p><p className="dim" style={{ marginTop: 8 }}>{lead ? `Deepest base: ${lead.short}` : 'No data'}</p></> },
    { id: 'fc', label: 'Forecast', s: 2, el: <><p className="lab">5-day forecast{lead && ` · ${lead.short}`}</p><div className="days">{(lw?.days ?? []).slice(0, 5).map(d => <div key={d.date}>{dayName(d.date)}<span>{icon(d.code)}</span>{fmt(d.hi, '°')}</div>)}</div></> },
    { id: 'map', label: 'Snow map', s: 2, el: <><p className="lab">Snow depth map</p><SnowMap wx={wx} /></> },
    { id: 'cam', label: 'Webcam', s: 1, el: <><p className="lab">Webcam</p><Cam r={RESORTS[0]} /></> },
    { id: 'res', label: 'Deepest bases', s: 1, el: <><p className="lab">Deepest bases</p>{ranked.slice(0, 3).map(r => <Link key={r.id} href={`/resorts/${r.id}`} className="row"><span className="n">{r.short}</span><span style={{ fontWeight: 600 }}>{fmt(wx[r.id].depth)}</span></Link>)}</> },
  ];
  const [pins, setPins] = useState<string[]>(W.map(w => w.id)), [open, setOpen] = useState(false);
  useEffect(() => { try { const p = JSON.parse(localStorage.getItem('pins') || ''); if (Array.isArray(p)) setPins(p); } catch {} }, []);
  useEffect(() => { document.body.classList.toggle('sheet-on', open); return () => document.body.classList.remove('sheet-on'); }, [open]);
  const save = (p: string[]) => { setPins(p); localStorage.setItem('pins', JSON.stringify(p)); };
  const shown = W.filter(w => pins.includes(w.id));
  return (
    <div className="page">
      <Top t="Tahoe" s={today}><div className="btns"><button className="pill" onClick={() => setOpen(true)}>Add widget</button></div></Top>
      {!all.length && <div className="card" style={{ marginBottom: 14 }}><p className="dim">Live data is unavailable right now. It refreshes automatically, so check back in a few minutes.</p></div>}
      {shown.length ? <div className="grid" style={{ gridAutoFlow: 'dense' }}>{shown.map((w, i) => <div key={w.id} className="w glass" data-s={w.s} style={sv({ '--i': i })}>{w.el}</div>)}</div>
        : <div className="card"><p className="dim">Nothing is pinned. Tap Add widget to build your dashboard.</p></div>}
      <div className="scrim" onClick={() => setOpen(false)} />
      <div className="sheet glass"><h2>Home widgets</h2><p className="dim">Tap to pin or unpin. Your choices are saved on this device.</p>
        <div className="chips">{W.map(w => <button key={w.id} className={'chip' + (pins.includes(w.id) ? ' on' : '')} onClick={() => save(pins.includes(w.id) ? pins.filter(x => x !== w.id) : [...pins, w.id])}>{w.label}</button>)}</div>
        <button className="pill" onClick={() => setOpen(false)}>Done</button></div>
    </div>
  );
}
