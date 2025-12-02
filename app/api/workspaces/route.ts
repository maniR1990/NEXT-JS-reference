import { NextResponse } from 'next/server';
import { createWorkspace, getUserById, getUserWorkspaces } from '../../lib/data';

export async function GET(request: Request) {
  const userId = new URL(request.url).searchParams.get('userId');
  if (!userId) return NextResponse.json({ error: 'userId required' }, { status: 400 });
  return NextResponse.json(getUserWorkspaces(userId));
}

export async function POST(request: Request) {
  const { userId, name } = await request.json();
  const user = getUserById(userId);
  if (!user) return NextResponse.json({ error: 'user not found' }, { status: 404 });
  const workspace = createWorkspace({ name, ownerId: userId });
  return NextResponse.json(workspace, { status: 201 });
}
