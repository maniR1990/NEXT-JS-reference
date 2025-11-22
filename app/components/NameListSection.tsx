import React from 'react';
import { ApiNameListResponse } from '../utils/apicalls';

/**
 * Server component that awaits a pre-started data fetch and renders the list once available.
 * Each instance is intended to sit behind its own Suspense boundary so streaming keeps the
 * rest of the UI unblocked while the fetch resolves.
 */
export default async function NameListSection({
  dataPromise,
}: {
  dataPromise: Promise<ApiNameListResponse>;
}) {
  const data = await dataPromise;

  return (
    <section className="card">
      <header className="card-header">
        <p className="eyebrow">{data.id}</p>
        <h3>{data.title}</h3>
        <p className="muted">
          Delay: {data.delayMs} ms · Loaded at {new Date(data.loadedAt).toLocaleTimeString()}
        </p>
      </header>
      <ul className="name-list">
        {data.names.map((name, index) => (
          <li key={`${data.id}-${index}`}>{name}</li>
        ))}
      </ul>
    </section>
  );
}
