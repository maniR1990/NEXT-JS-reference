import { redirect } from 'next/navigation';
import NewProjectForm from '../../../../components/NewProjectForm';
import { createProject, getWorkspaceBySlug } from '../../../../lib/data';

async function createProjectAction(
  workspaceId: string,
  workspaceSlug: string,
  _prevState: { error?: string },
  formData: FormData,
) {
  'use server';
  const name = String(formData.get('name'));
  if (!name) {
    return { error: 'Name required' };
  }
  const project = createProject(workspaceId, name);
  redirect(`/${workspaceSlug}/app/projects/${project.id}/overview`);
}

export default function NewProjectPage({ params }: { params: { workspaceSlug: string } }) {
  const workspace = getWorkspaceBySlug(params.workspaceSlug);
  if (!workspace) return null;

  const action = createProjectAction.bind(null, workspace.id, workspace.slug);

  return (
    <div className="stack">
      <h1>New project</h1>
      <p className="muted">Client form with server action submission.</p>
      <NewProjectForm action={action} />
    </div>
  );
}
