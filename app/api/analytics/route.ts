import { NextResponse } from 'next/server';
import { getAnalytics } from '../../lib/data';

export async function GET(request: Request) {
  const workspaceId = new URL(request.url).searchParams.get('workspaceId');
  if (!workspaceId) return NextResponse.json({ error: 'workspaceId required' }, { status: 400 });
  return NextResponse.json(getAnalytics(workspaceId));
}
