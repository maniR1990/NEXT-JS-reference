import { getReportsForWorkspace, getWorkspaceBySlug } from '../../../lib/data';

const PAGE_SIZE = 3;

export default function ReportsPage({ params, searchParams }: { params: { workspaceSlug: string }; searchParams: { page?: string; status?: string } }) {
  const workspace = getWorkspaceBySlug(params.workspaceSlug);
  if (!workspace) return null;

  const page = Number(searchParams.page ?? 1);
  const status = searchParams.status as 'draft' | 'scheduled' | 'completed' | undefined;
  const reports = getReportsForWorkspace(workspace.id).filter((report) => (status ? report.status === status : true));
  const totalPages = Math.ceil(reports.length / PAGE_SIZE);
  const start = (page - 1) * PAGE_SIZE;
  const pageItems = reports.slice(start, start + PAGE_SIZE);

  return (
    <div className="stack">
      <header className="section-heading">
        <p className="eyebrow">Reports</p>
        <h1>Scheduled and completed</h1>
        <p className="muted">Server-side pagination and filtering driven by search params.</p>
      </header>
      <div className="filters">
        <a href={`/${workspace.slug}/app/reports`}>All</a>
        <a href={`/${workspace.slug}/app/reports?status=completed`}>Completed</a>
        <a href={`/${workspace.slug}/app/reports?status=draft`}>Draft</a>
      </div>
      <div className="stack">
        {pageItems.map((report) => (
          <article key={report.id} className="card">
            <p className="eyebrow">{report.status}</p>
            <h3>{report.title}</h3>
            <p className="muted">{new Date(report.createdAt).toLocaleString()}</p>
          </article>
        ))}
      </div>
      <div className="pagination">
        {Array.from({ length: totalPages }).map((_, index) => {
          const pageNumber = index + 1;
          const paramsFragment = new URLSearchParams();
          if (status) paramsFragment.set('status', status);
          if (pageNumber > 1) paramsFragment.set('page', String(pageNumber));
          const hrefParams = paramsFragment.toString();
          const href = `/${workspace.slug}/app/reports${hrefParams ? `?${hrefParams}` : ''}`;

          return (
            <a key={pageNumber} href={href} className={pageNumber === page ? 'active' : ''}>
              {pageNumber}
            </a>
          );
        })}
      </div>
    </div>
  );
}
