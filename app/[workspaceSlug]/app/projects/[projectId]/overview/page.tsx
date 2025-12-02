import { getProjectsForWorkspace, getWorkspaceBySlug } from '../../../../../lib/data';

export default function ProjectOverview({ params }: { params: { workspaceSlug: string; projectId: string } }) {
  const workspace = getWorkspaceBySlug(params.workspaceSlug);
  const project = workspace
    ? getProjectsForWorkspace(workspace.id).find((item) => item.id === params.projectId)
    : null;

  if (!project) return null;

  return (
    <article className="card">
      <p className="eyebrow">Overview</p>
      <p className="muted">Status: {project.status}</p>
      <p className="muted">Last updated: {new Date(project.updatedAt).toLocaleString()}</p>
    </article>
  );
}
