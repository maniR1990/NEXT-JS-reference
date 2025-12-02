import { NextResponse } from 'next/server';
import { getProjectById } from '../../../lib/data';

export async function GET(_request: Request, { params }: { params: { projectId: string } }) {
  const project = getProjectById(params.projectId);
  if (!project) return NextResponse.json({ error: 'not found' }, { status: 404 });
  return NextResponse.json(project);
}
