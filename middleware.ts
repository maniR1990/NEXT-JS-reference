import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getUserById, getWorkspaceById, getWorkspaceBySlug } from './app/lib/data';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname.startsWith('/_next') || pathname.startsWith('/api') || pathname === '/favicon.ico') {
    return NextResponse.next();
  }

  const session = request.cookies.get('session')?.value;
  const user = session ? getUserById(session) : null;
  const isAuthRoute = pathname.startsWith('/auth');
  const isAppRoute = pathname.includes('/app');

  if (!user && isAppRoute) {
    const loginUrl = new URL('/auth/login', request.url);
    loginUrl.searchParams.set('redirectTo', pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (user && isAuthRoute) {
    const defaultWorkspace = getWorkspaceById(user.defaultWorkspaceId) ?? getWorkspaceBySlug('acme');
    const redirectSlug = defaultWorkspace?.slug ?? 'acme';
    return NextResponse.redirect(new URL(`/${redirectSlug}/app/dashboard`, request.url));
  }

  if (user && isAppRoute) {
    const segments = pathname.split('/').filter(Boolean);
    const slug = segments[0];

    if (slug === 'app') {
      const defaultWorkspace = getWorkspaceById(user.defaultWorkspaceId) ?? getWorkspaceBySlug('acme');
      const redirectSlug = defaultWorkspace?.slug ?? 'acme';
      return NextResponse.redirect(new URL(`/${redirectSlug}/app/dashboard`, request.url));
    }

    const workspace = getWorkspaceBySlug(slug);
    if (!workspace || !user.workspaceIds.includes(workspace.id)) {
      const fallbackWorkspace = getWorkspaceById(user.defaultWorkspaceId) ?? getWorkspaceBySlug('acme');
      const redirectSlug = fallbackWorkspace?.slug ?? 'acme';
      return NextResponse.redirect(new URL(`/${redirectSlug}/app/dashboard`, request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
