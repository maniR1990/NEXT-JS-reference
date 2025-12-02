import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getSessionUser } from '../../lib/auth';
import { getUserWorkspaces, getWorkspaceBySlug } from '../../lib/data';

export default function WorkspaceLayout({
  params,
  children,
}: {
  params: { workspaceSlug: string };
  children: React.ReactNode;
}) {
  const user = getSessionUser();
  const workspace = getWorkspaceBySlug(params.workspaceSlug);

  if (!workspace || !user || !user.workspaceIds.includes(workspace.id)) {
    notFound();
  }

  const workspaces = getUserWorkspaces(user.id);

  return (
    <div className="workspace-shell">
      <aside className="workspace-sidebar">
        <p className="eyebrow">Workspaces</p>
        <ul className="nav-list">
          {workspaces.map((item) => (
            <li key={item.id} className={item.id === workspace.id ? 'active' : ''}>
              <Link href={`/${item.slug}/app/dashboard`}>{item.name}</Link>
            </li>
          ))}
        </ul>
        <p className="eyebrow">Navigation</p>
        <ul className="nav-list">
          <li>
            <Link href={`/${workspace.slug}/app/dashboard`}>Dashboard</Link>
          </li>
          <li>
            <Link href={`/${workspace.slug}/app/projects`}>Projects</Link>
          </li>
          <li>
            <Link href={`/${workspace.slug}/app/reports`}>Reports</Link>
          </li>
          <li>
            <Link href={`/${workspace.slug}/app/settings`}>Settings</Link>
          </li>
        </ul>
      </aside>
      <section className="workspace-main">{children}</section>
    </div>
  );
}
