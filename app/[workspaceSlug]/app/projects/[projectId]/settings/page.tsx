import { getProjectsForWorkspace, getWorkspaceBySlug } from '../../../../../lib/data';

export default function ProjectSettings({ params }: { params: { workspaceSlug: string; projectId: string } }) {
  const workspace = getWorkspaceBySlug(params.workspaceSlug);
  const project = workspace
    ? getProjectsForWorkspace(workspace.id).find((item) => item.id === params.projectId)
    : null;

  if (!project) return null;

  return (
    <article className="card stack">
      <p className="eyebrow">Project settings</p>
      <label>
        <span>Project name</span>
        <input defaultValue={project.name} readOnly />
      </label>
      <p className="muted">Settings are mocked; in a real app this would persist via an API route.</p>
    </article>
  );
}
