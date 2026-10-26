'use client';
import { useEffect, useState, type CSSProperties } from 'react';
import type { CamSrc, Resort } from '@/lib/resorts';

export default function Cam({ r, c = r.cams[0] }: { r: Resort; c?: CamSrc }) {
  const [t, setT] = useState(0);
  useEffect(() => {
    if (!c.image) return;
    const id = setInterval(() => setT(Date.now()), 120000);
    return () => clearInterval(id);
  }, [c.image]);
  const live = !!(c.image || c.embed);
  const src = c.image && (t ? c.image + (c.image.includes('?') ? '&' : '?') + 't=' + t : c.image);
  const el = (
    <div className={'cam' + (live ? ' img' : '')} style={{ '--a': r.tint[0], '--b': r.tint[1] } as CSSProperties}>
      {c.embed ? <iframe src={c.embed} title={`${r.short} ${c.title}`} loading="lazy" allow="autoplay; fullscreen" allowFullScreen style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0 }} />
        : src && <img src={src} alt={`${r.short} ${c.title} webcam`} />}
      <span className={'live' + (live ? '' : ' off')} style={{ pointerEvents: 'none' }}>{live ? 'LIVE' : 'No feed yet'}</span>
      <div className="cap" style={c.embed ? { pointerEvents: 'none' } : undefined}>{r.short} {c.title}<small>{r.region}</small></div>
    </div>
  );
  return c.link && !c.embed ? <a href={c.link} target="_blank" rel="noreferrer">{el}</a> : el;
}
