import SnowMap from '@/components/SnowMap';
import { Top } from '@/components/ui';
import { getWeather } from '@/lib/weather';
export const revalidate = 1800;
export default async function Page() {
  const wx = await getWeather();
  return <div className="page"><Top t="Snow map" s="Base depth across the Tahoe basin" /><div className="card" style={{ padding: 12 }}><SnowMap wx={wx} /></div></div>;
}
