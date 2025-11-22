import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Sidebar from './sidebar';

const inter = Inter({ subsets: ['latin'] });

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
      <body className={inter.className}>
        <div className="app-shell">
          <aside className="sidebar">
            <h2 className="section-title">Sidebar</h2>
            <Sidebar />
          </aside>
          <main className="main">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
