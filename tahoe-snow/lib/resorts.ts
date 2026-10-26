// ---- Webcams -------------------------------------------------------------
// Each resort can have any number of cams. A cam can use any of these fields:
//   image: direct link to a JPG/PNG that the resort refreshes (refetched every 2 min)
//          e.g. 'https://example.com/cams/summit.jpg'
//   embed: a page that is allowed to be shown in an iframe (live video)
//          e.g. 'https://www.youtube.com/embed/VIDEO_ID'
//   link:  a normal page to open in a new tab (used when there is no image/embed,
//          or in addition to image)
// URLs must start with https://. Check each resort's terms before embedding.
export type CamSrc = { title: string; image?: string; embed?: string; link?: string };
export type Resort = {
  id: string; name: string; short: string; region: string;
  lat: number; lon: number; base: number; top: number;
  tint: [string, string]; // placeholder colors shown until a cam has a feed
  cams: CamSrc[];
};
export const RESORTS: Resort[] = [
  { id: 'palisades', name: 'Palisades Tahoe', short: 'Palisades', region: 'Olympic Valley, CA', lat: 39.197, lon: -120.235, base: 6200, top: 9050, tint: ['#6fb1fc', '#dbeafe'], cams: [{ title: 'Summit' }] },
  { id: 'heavenly', name: 'Heavenly', short: 'Heavenly', region: 'South Lake Tahoe, CA/NV', lat: 38.935, lon: -119.94, base: 6540, top: 10067, tint: ['#8aa4d6', '#e8def8'], cams: [{ title: 'Sky Deck' }] },
  { id: 'northstar', name: 'Northstar', short: 'Northstar', region: 'Truckee, CA', lat: 39.274, lon: -120.121, base: 6330, top: 8610, tint: ['#5b8bd0', '#cfe3f5'], cams: [{ title: 'Village' }] },
  { id: 'kirkwood', name: 'Kirkwood', short: 'Kirkwood', region: 'Alpine County, CA', lat: 38.685, lon: -120.065, base: 7800, top: 9800, tint: ['#7a9cc8', '#f1e3d3'], cams: [{ title: 'Cornice' }] },
  { id: 'sugarbowl', name: 'Sugar Bowl', short: 'Sugar Bowl', region: 'Donner Summit, CA', lat: 39.306, lon: -120.334, base: 6883, top: 8383, tint: ['#4f7fbf', '#d6ecf7'], cams: [{ title: 'Mt. Lincoln' }] },
  { id: 'mtrose', name: 'Mt Rose', short: 'Mt Rose', region: 'Reno, NV', lat: 39.315, lon: -119.886, base: 8260, top: 9700, tint: ['#9bb7e0', '#fbe8dc'], cams: [{ title: 'Chute 7' }] },
];
