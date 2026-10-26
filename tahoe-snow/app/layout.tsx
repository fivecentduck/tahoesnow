import './globals.css';
import type { Metadata, Viewport } from 'next';
import Nav from '@/components/Nav';
export const metadata: Metadata = { title: 'Tahoe Snow', description: 'Snow reports, webcams and forecasts for Lake Tahoe ski resorts' };
export const viewport: Viewport = { width: 'device-width', initialScale: 1, viewportFit: 'cover' };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en"><body>
      <div className="bg"><i /><i /><i /></div>
      <Nav /><main>{children}</main>
    </body></html>
  );
}
