import { NextResponse } from 'next/server';
import { authenticate, createSession, clearSession } from '../../../lib/auth';

export async function POST(request: Request) {
  const { email, password } = await request.json();
  const user = authenticate(email, password);
  if (!user) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }
  clearSession();
  createSession(user.id);
  return NextResponse.json({ ok: true, userId: user.id });
}
