import React, { Suspense } from 'react';
import HomeLists from './home-lists';
import SectionSkeleton from './components/SectionSkeleton';

export default function Page() {
  return (
    <div className="page">
      <header className="page-header">
        <p className="eyebrow">Streaming demo</p>
        <h1>Dependent server fetches with progressive rendering</h1>
        <p className="muted">
          Both the sidebar and the page call their preliminary API first, then stream three
          dependent data calls per region. Each list is wrapped in its own Suspense boundary so
          the UI updates as soon as data arrives.
        </p>
      </header>

      <Suspense
        fallback={
          <SectionSkeleton
            title="Home preliminary fetch"
            description="Waiting for home delay values"
          />
        }
      >
        <HomeLists />
      </Suspense>
    </div>
  );
}
