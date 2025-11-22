import React from 'react';

export default function SectionSkeleton({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <section className="card skeleton-card" aria-busy>
      <header className="card-header">
        <p className="eyebrow">Loading…</p>
        <h3>{title}</h3>
        {description ? <p className="muted">{description}</p> : null}
      </header>
      <div className="skeleton-lines">
        <span className="skeleton-block" />
        <span className="skeleton-block" />
        <span className="skeleton-block short" />
      </div>
    </section>
  );
}
