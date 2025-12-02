import Link from 'next/link';
import { getProjectsForWorkspace, getWorkspaceBySlug } from '../../../lib/data';

export default function ProjectsPage({ params }: { params: { workspaceSlug: string } }) {
  const workspace = getWorkspaceBySlug(params.workspaceSlug);
  if (!workspace) return null;

  const projects = getProjectsForWorkspace(workspace.id);

  return (
    <div className="stack">
      <header className="section-heading">
        <p className="eyebrow">Projects</p>
        <h1>All projects</h1>
        <p className="muted">Server component list scoped to the active workspace.</p>
        <Link className="button" href={`/${workspace.slug}/app/projects/new`}>
          New project
        </Link>
      </header>
      <div className="stack">
        {projects.map((project) => (
          <article key={project.id} className="card">
            <p className="eyebrow">{project.status}</p>
            <h3>
              <Link href={`/${workspace.slug}/app/projects/${project.id}/overview`}>{project.name}</Link>
            </h3>
            <p className="muted">Updated {new Date(project.updatedAt).toLocaleString()}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
