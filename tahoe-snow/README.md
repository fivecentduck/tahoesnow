# Tahoe Snow

Snow dashboard for Lake Tahoe ski resorts. Next.js 14 (App Router) + TypeScript. Live data from [Open-Meteo](https://open-meteo.com) (free, no API key).

## Run locally
    npm install
    npm run dev        # http://localhost:3000

## Deploy (GitHub + Vercel)
1. Create an empty GitHub repo, then in this folder:
   `git init && git add . && git commit -m "Initial commit" && git branch -M main && git remote add origin <your-repo-url> && git push -u origin main`
2. On vercel.com choose **Add New → Project**, import the repo, and click **Deploy**. No settings or environment variables are needed.

## Add webcams
Open `lib/resorts.ts`. Each resort has a `cams` list; add as many entries as you like:

    cams: [
      { title: 'Summit', image: 'https://example.com/summit.jpg' },          // refreshing still image
      { title: 'Village', embed: 'https://www.youtube.com/embed/VIDEO_ID' }, // live video in an iframe
      { title: 'Base', link: 'https://example.com/base-cam' },               // opens in a new tab
    ]

URLs must be `https://`. Images refresh every 2 minutes. Some sites block iframes; use `link` for those.
Check each resort's terms before embedding its feed.

## Where things live
- `lib/resorts.ts` resort list (add resorts or regions here)
- `lib/weather.ts` data fetching, 30-minute cache, powder score
- `components/Dashboard.tsx` pinnable home widgets (saved in localStorage)
- `app/*` pages: home, map, forecast, webcams, resorts, resorts/[id], summary
- `app/globals.css` the Apple-style design system

## Notes
Open-Meteo snow depth is modeled, not measured. Planned: SNOTEL/CDEC station data, lift status.
