import { redirect } from 'next/navigation';

export default function ProjectIndex({ params }: { params: { workspaceSlug: string; projectId: string } }) {
  redirect(`/${params.workspaceSlug}/app/projects/${params.projectId}/overview`);
}
