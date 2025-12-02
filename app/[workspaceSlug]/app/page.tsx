import { redirect } from 'next/navigation';

export default function WorkspaceIndex({ params }: { params: { workspaceSlug: string } }) {
  redirect(`/${params.workspaceSlug}/app/dashboard`);
}
