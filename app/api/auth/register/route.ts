import { NextResponse } from 'next/server';
import { createSession, register } from '../../../lib/auth';

export async function POST(request: Request) {
  const { name, email, password } = await request.json();
  const user = register(name, email, password);
  createSession(user.id);
  return NextResponse.json({ ok: true, userId: user.id });
}
