import { getProjectsForWorkspace, getWorkspaceBySlug } from '../../../../../lib/data';

export default function ProjectActivity({ params }: { params: { workspaceSlug: string; projectId: string } }) {
  const workspace = getWorkspaceBySlug(params.workspaceSlug);
  const project = workspace
    ? getProjectsForWorkspace(workspace.id).find((item) => item.id === params.projectId)
    : null;

  if (!project) return null;

  return (
    <article className="card">
      <p className="eyebrow">Activity</p>
      <ul>
        <li>Synced events for {project.name}</li>
        <li>Updated status to {project.status}</li>
        <li>Notified members about dashboard changes</li>
      </ul>
    </article>
  );
}
