import Link from 'next/link';
import { redirect } from 'next/navigation';
import { createSession, register } from '../../lib/auth';
import { getWorkspaceById } from '../../lib/data';

async function registerAction(formData: FormData) {
  'use server';
  const name = String(formData.get('name'));
  const email = String(formData.get('email'));
  const password = String(formData.get('password'));

  const user = register(name, email, password);
  createSession(user.id);
  const workspace = getWorkspaceById(user.defaultWorkspaceId);
  redirect(workspace ? `/${workspace.slug}/app/dashboard` : '/app');
}

export default function RegisterPage() {
  return (
    <div className="page auth-page">
      <div className="card form-card">
        <p className="eyebrow">Register</p>
        <h1>Create your first workspace</h1>
        <form action={registerAction} className="stack">
          <label>
            <span>Name</span>
            <input name="name" required />
          </label>
          <label>
            <span>Email</span>
            <input name="email" type="email" required />
          </label>
          <label>
            <span>Password</span>
            <input name="password" type="password" required />
          </label>
          <button type="submit" className="button">
            Create account
          </button>
        </form>
        <p className="muted">
          Already have an account? <Link href="/auth/login">Log in</Link>
        </p>
      </div>
    </div>
  );
}
