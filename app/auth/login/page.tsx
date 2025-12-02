import Link from 'next/link';
import { redirect } from 'next/navigation';
import { authenticate, createSession } from '../../lib/auth';
import { getWorkspaceById } from '../../lib/data';

async function loginAction(formData: FormData) {
  'use server';
  const email = String(formData.get('email'));
  const password = String(formData.get('password'));
  const redirectTo = String(formData.get('redirectTo') ?? '/app');

  const user = authenticate(email, password);
  if (!user) {
    return { error: 'Invalid credentials' };
  }

  createSession(user.id);
  const workspace = getWorkspaceById(user.defaultWorkspaceId);
  redirect(workspace ? `/${workspace.slug}/app/dashboard` : redirectTo);
}

export default function LoginPage({ searchParams }: { searchParams: { redirectTo?: string } }) {
  const { redirectTo } = searchParams;

  return (
    <div className="page auth-page">
      <div className="card form-card">
        <p className="eyebrow">Log in</p>
        <h1>Access your workspace</h1>
        <form action={loginAction} className="stack">
          <input type="hidden" name="redirectTo" value={redirectTo} />
          <label>
            <span>Email</span>
            <input name="email" type="email" required defaultValue="demo@workspace.dev" />
          </label>
          <label>
            <span>Password</span>
            <input name="password" type="password" required defaultValue="demo" />
          </label>
          <button type="submit" className="button">
            Sign in
          </button>
        </form>
        <p className="muted">
          Need an account? <Link href="/auth/register">Register</Link>
        </p>
      </div>
    </div>
  );
}
