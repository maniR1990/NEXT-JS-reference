import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProjectsForWorkspace, getWorkspaceBySlug } from '../../../../lib/data';

export function generateMetadata({ params }: { params: { workspaceSlug: string; projectId: string } }) {
  const workspace = getWorkspaceBySlug(params.workspaceSlug);
  const project = workspace
    ? getProjectsForWorkspace(workspace.id).find((item) => item.id === params.projectId)
    : null;
  return {
    title: project ? `${project.name} · Workspace Analytics` : 'Project not found',
  };
}

export default function ProjectLayout({
  params,
  children,
}: {
  params: { workspaceSlug: string; projectId: string };
  children: React.ReactNode;
}) {
  const workspace = getWorkspaceBySlug(params.workspaceSlug);
  const project = workspace
    ? getProjectsForWorkspace(workspace.id).find((item) => item.id === params.projectId)
    : null;

  if (!workspace || !project) {
    notFound();
  }

  const base = `/${workspace.slug}/app/projects/${project.id}`;

  return (
    <div className="stack">
      <header className="section-heading">
        <p className="eyebrow">Project</p>
        <h1>{project.name}</h1>
        <p className="muted">URL-based tabs rendered through nested routes.</p>
      </header>
      <div className="tabs">
        <Link href={`${base}/overview`}>Overview</Link>
        <Link href={`${base}/activity`}>Activity</Link>
        <Link href={`${base}/settings`}>Settings</Link>
      </div>
      {children}
    </div>
  );
}
