import { NextResponse } from 'next/server';
import { createProject, getProjectsForWorkspace } from '../../lib/data';

export async function GET(request: Request) {
  const workspaceId = new URL(request.url).searchParams.get('workspaceId');
  if (!workspaceId) return NextResponse.json({ error: 'workspaceId required' }, { status: 400 });
  return NextResponse.json(getProjectsForWorkspace(workspaceId));
}

export async function POST(request: Request) {
  const { workspaceId, name } = await request.json();
  if (!workspaceId || !name) return NextResponse.json({ error: 'missing fields' }, { status: 400 });
  const project = createProject(workspaceId, name);
  return NextResponse.json(project, { status: 201 });
}
