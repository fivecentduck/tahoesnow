'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
const T = [['/', 'Home'], ['/map', 'Snow map'], ['/forecast', 'Forecast'], ['/webcams', 'Webcams'], ['/resorts', 'Resorts'], ['/summary', 'Summary']];
export default function Nav() {
  const p = usePathname(), ref = useRef<HTMLElement>(null), [s, setS] = useState({ x: 0, w: 0 });
  const on = (h: string) => (h === '/' ? p === '/' : p.startsWith(h));
  useEffect(() => {
    const move = () => { const a = ref.current?.querySelector('a.on') as HTMLElement | null; if (a) setS({ x: a.offsetLeft, w: a.offsetWidth }); };
    move(); addEventListener('resize', move); return () => removeEventListener('resize', move);
  }, [p]);
  useEffect(() => { const t = localStorage.getItem('theme'); if (t) document.documentElement.dataset.theme = t; }, []);
  const toggle = () => {
    const r = document.documentElement, dark = r.dataset.theme ? r.dataset.theme === 'dark' : matchMedia('(prefers-color-scheme:dark)').matches;
    r.dataset.theme = dark ? 'light' : 'dark'; localStorage.setItem('theme', r.dataset.theme);
  };
  return (
    <nav ref={ref} className="nav glass">
      <b style={{ width: s.w, transform: `translateX(${s.x}px)` }} />
      {T.map(([h, l]) => <Link key={h} href={h} className={on(h) ? 'on' : ''}>{l}</Link>)}
      <button onClick={toggle} aria-label="Toggle light and dark theme">◐</button>
    </nav>
  );
}
