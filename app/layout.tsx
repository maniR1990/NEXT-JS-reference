import './globals.css';
import type { Metadata } from 'next';
import Link from 'next/link';
import { cookies } from 'next/headers';
import { getSessionUser } from './lib/auth';

export const metadata: Metadata = {
  title: 'Workspace Analytics',
  description: 'A multi-tenant SaaS dashboard built with Next.js App Router.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const sessionCookie = cookies().get('session')?.value;
  const sessionUser = sessionCookie ? getSessionUser(sessionCookie) : null;

  return (
    <html lang="en">
      <body>
        <div className="site-shell">
          <header className="site-header">
            <Link href="/" className="brand">
              Workspace Analytics
            </Link>
            <nav className="nav">
              <Link href="/pricing">Pricing</Link>
              <Link href="/blog">Blog</Link>
              {sessionUser ? (
                <Link href="/app">Go to app</Link>
              ) : (
                <Link href="/auth/login">Log in</Link>
              )}
            </nav>
          </header>
          <main className="site-main">{children}</main>
          <footer className="site-footer">
            <p>Built with Next.js · Streaming, caching, middleware, and more.</p>
          </footer>
        </div>
      </body>
    </html>
  );
}
