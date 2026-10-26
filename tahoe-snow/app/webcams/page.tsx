import { Cam, Top } from '@/components/ui';
import { RESORTS } from '@/lib/resorts';
export default function Page() {
  return <div className="page"><Top t="Webcams" s="Add feed URLs in lib/resorts.ts to go live" /><div className="grid">{RESORTS.flatMap(r => r.cams.map((c, i) => <Cam key={r.id + i} r={r} c={c} />))}</div></div>;
}
