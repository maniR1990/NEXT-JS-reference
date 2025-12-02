import { getPlans, getWorkspaceBySlug, updateWorkspacePlan } from '../../../lib/data';

async function updatePlanAction(formData: FormData) {
  'use server';
  const workspaceId = String(formData.get('workspaceId'));
  const planId = String(formData.get('planId'));
  updateWorkspacePlan(workspaceId, planId);
}

export default function WorkspaceSettings({ params }: { params: { workspaceSlug: string } }) {
  const workspace = getWorkspaceBySlug(params.workspaceSlug);
  const plans = getPlans();
  if (!workspace) return null;

  return (
    <div className="stack">
      <h1>Workspace settings</h1>
      <form action={updatePlanAction} className="card">
        <input type="hidden" name="workspaceId" value={workspace.id} />
        <p className="eyebrow">Plan</p>
        <p className="muted">Update billing configuration via a server action.</p>
        <select name="planId" defaultValue={workspace.planId}>
          {plans.map((plan) => (
            <option key={plan.id} value={plan.id}>
              {plan.name} (${plan.price}/mo)
            </option>
          ))}
        </select>
        <button type="submit" className="button">
          Save changes
        </button>
      </form>
    </div>
  );
}
