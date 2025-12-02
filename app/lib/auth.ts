import { cookies } from 'next/headers';
import { createDefaultWorkspaceForUser, getUserByEmail, getUserById, registerUser } from './data';

export function createSession(userId: string) {
  cookies().set('session', userId, { httpOnly: true, sameSite: 'lax', path: '/' });
}

export function clearSession() {
  cookies().delete('session');
}

export function getSessionUser(sessionId?: string) {
  const id = sessionId ?? cookies().get('session')?.value;
  return id ? getUserById(id) ?? null : null;
}

export function authenticate(email: string, password: string) {
  const user = getUserByEmail(email);
  if (!user || user.password !== password) {
    return null;
  }
  return user;
}

export function register(name: string, email: string, password: string) {
  const user = registerUser({ name, email, password });
  if (!user.defaultWorkspaceId) {
    createDefaultWorkspaceForUser(user);
  }
  return user;
}
