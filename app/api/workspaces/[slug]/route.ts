import { NextResponse } from 'next/server';
import { getWorkspaceBySlug } from '../../../lib/data';

export async function GET(_request: Request, { params }: { params: { slug: string } }) {
  const workspace = getWorkspaceBySlug(params.slug);
  if (!workspace) return NextResponse.json({ error: 'not found' }, { status: 404 });
  return NextResponse.json(workspace);
}
