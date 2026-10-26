import Dashboard from '@/components/Dashboard';
import { getWeather } from '@/lib/weather';
export const revalidate = 1800;
export default async function Home() {
  const wx = await getWeather();
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', timeZone: 'America/Los_Angeles' });
  return <Dashboard wx={wx} today={today} />;
}
