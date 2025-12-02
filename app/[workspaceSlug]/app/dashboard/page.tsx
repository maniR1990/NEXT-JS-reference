import { getAnalytics, getWorkspaceBySlug } from '../../../lib/data';

function TrendChart({ points }: { points: { label: string; value: number }[] }) {
  return (
    <div className="chart">
      {points.map((point) => (
        <div key={point.label} className="chart-bar" style={{ height: `${point.value}%` }}>
          <span>{point.label}</span>
          <strong>{point.value}</strong>
        </div>
      ))}
    </div>
  );
}

export default function DashboardPage({ params }: { params: { workspaceSlug: string } }) {
  const workspace = getWorkspaceBySlug(params.workspaceSlug);
  if (!workspace) return null;

  const analytics = getAnalytics(workspace.id);

  return (
    <div className="stack">
      <header className="section-heading">
        <p className="eyebrow">Dashboard</p>
        <h1>{workspace.name}</h1>
        <p className="muted">Server component fetching analytics data before hydrating charts.</p>
      </header>
      <div className="grid">
        <article className="card">
          <p className="eyebrow">Projects</p>
          <h3>{analytics.totals.projects}</h3>
          <p className="muted">Tracked across this workspace.</p>
        </article>
        <article className="card">
          <p className="eyebrow">Reports</p>
          <h3>{analytics.totals.reports}</h3>
          <p className="muted">Scheduled or completed.</p>
        </article>
        <article className="card">
          <p className="eyebrow">Members</p>
          <h3>{analytics.totals.activeMembers}</h3>
          <p className="muted">Active collaborators in this workspace.</p>
        </article>
      </div>
      <article className="card">
        <p className="eyebrow">Velocity</p>
        <h3>Client chart hydrated from server data</h3>
        <TrendChart points={analytics.trend} />
      </article>
    </div>
  );
}
