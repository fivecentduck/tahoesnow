import { RESORTS } from './resorts';
export type Day = { date: string; snow: number; hi: number; lo: number; code: number };
export type Wx = { depth: number | null; d24: number; w7: number; temp: number | null; wind: number | null; days: Day[]; series: number[] };
const U: Record<string, number> = { m: 39.3701, ft: 12, cm: 1 / 2.54, mm: 1 / 25.4, inch: 1, in: 1 };
const toIn = (v: number | null | undefined, u: string) => (v == null ? null : v * (U[u] ?? 1));
export const icon = (c: number) => c === 0 ? '☀️' : c <= 2 ? '⛅' : c === 3 ? '☁️' : c <= 48 ? '🌫️' : c <= 57 ? '🌦️' : c <= 67 ? '🌧️' : c <= 77 ? '❄️' : c <= 82 ? '🌧️' : c <= 86 ? '❄️' : '⛈️';
export const dayName = (d: string, f: 'short' | 'narrow' = 'short') => new Date(d + 'T12:00:00').toLocaleDateString('en-US', { weekday: f });
export const score = (w: Wx) => Math.max(0, Math.min(100, Math.round(w.d24 * 8 + (w.depth ?? 0) * 0.35 + w.w7 * 1.2 + (30 - (w.wind ?? 15)) * 0.6 + 15)));

function parse(x: any): Wx {
  const hu = x.hourly_units, du = x.daily_units, h = x.hourly, d = x.daily;
  const hr = +new Date().toLocaleString('en-US', { hour: 'numeric', hour12: false, timeZone: 'America/Los_Angeles' }) % 24;
  const i = Math.min(168 + hr, h.time.length - 1); // past_days=7 -> "now" is 168h in
  const series: number[] = [];
  for (let k = 0; k <= i; k += 12) series.push(toIn(h.snow_depth[k], hu.snow_depth) ?? 0);
  const sn = (k: number) => toIn(d.snowfall_sum[k], du.snowfall_sum) ?? 0;
  let w7 = 0; for (let k = 1; k <= 7; k++) w7 += sn(k);
  return {
    depth: toIn(h.snow_depth[i], hu.snow_depth), d24: sn(7), w7,
    temp: h.temperature_2m[i] ?? null, wind: h.wind_speed_10m[i] ?? null, series,
    days: d.time.slice(7).map((t: string, k: number) => ({ date: t, snow: sn(7 + k), hi: d.temperature_2m_max[7 + k], lo: d.temperature_2m_min[7 + k], code: d.weather_code[7 + k] })),
  };
}

// One Open-Meteo request for every resort (free, no API key). Cached 30 min.
export async function getWeather(): Promise<Record<string, Wx>> {
  const q = new URLSearchParams({
    latitude: RESORTS.map(r => r.lat).join(','), longitude: RESORTS.map(r => r.lon).join(','),
    elevation: RESORTS.map(r => Math.round(r.top * 0.3048)).join(','),
    hourly: 'snow_depth,temperature_2m,wind_speed_10m',
    daily: 'snowfall_sum,temperature_2m_max,temperature_2m_min,weather_code',
    past_days: '7', forecast_days: '7', temperature_unit: 'fahrenheit', wind_speed_unit: 'mph', timezone: 'America/Los_Angeles',
  });
  try {
    const res = await fetch('https://api.open-meteo.com/v1/forecast?' + q, { next: { revalidate: 1800 } });
    if (!res.ok) throw new Error(String(res.status));
    const j = await res.json();
    return Object.fromEntries((Array.isArray(j) ? j : [j]).map((x: any, i: number) => [RESORTS[i].id, parse(x)]));
  } catch { return {}; }
}
