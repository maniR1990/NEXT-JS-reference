import './globals.css';
import type { Metadata } from 'next';
import Sidebar from './sidebar';
import { Suspense } from 'react';
import SectionSkeleton from './components/SectionSkeleton';

export const metadata: Metadata = {
  title: 'Streaming App Router Demo',
  description:
    'Demonstrates dependent server-side fetching with progressive streaming UI states.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="app-shell">
          <aside className="sidebar">
            <h2 className="section-title">Sidebar (2 lists)</h2>
            <Suspense
              fallback={
                <SectionSkeleton
                  title="Sidebar preliminary fetch"
                  description="Waiting for sidebar delay values"
                />
              }
            >
              <Sidebar />
            </Suspense>
          </aside>
          <main className="main">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
