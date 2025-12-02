import { redirect } from 'next/navigation';
import { getSessionUser } from '../lib/auth';
import { getWorkspaceById, getWorkspaceBySlug } from '../lib/data';

export default function AppRedirect() {
  const user = getSessionUser();
  const workspace = user
    ? getWorkspaceById(user.defaultWorkspaceId) ?? getWorkspaceBySlug('acme')
    : getWorkspaceBySlug('acme');

  redirect(`/${workspace?.slug ?? 'acme'}/app/dashboard`);
}
