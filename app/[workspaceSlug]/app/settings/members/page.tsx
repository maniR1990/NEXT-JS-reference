import { getWorkspaceBySlug, getUserById } from '../../../../lib/data';

export default function MembersPage({ params }: { params: { workspaceSlug: string } }) {
  const workspace = getWorkspaceBySlug(params.workspaceSlug);
  if (!workspace) return null;

  return (
    <div className="stack">
      <h1>Members</h1>
      <p className="muted">Invite and remove members (mocked for demo).</p>
      <ul className="card member-list">
        {workspace.memberIds.map((memberId) => {
          const member = getUserById(memberId);
          return (
            <li key={memberId}>
              <div>
                <strong>{member?.name ?? 'Unknown'}</strong>
                <p className="muted">{member?.email}</p>
              </div>
              <button className="button ghost" type="button">
                Remove
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
