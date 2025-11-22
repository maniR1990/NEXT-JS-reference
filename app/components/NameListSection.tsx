import React from 'react';
import { ApiNameListResponse } from '../utils/apicalls';

export default async function NameListSection({
  fetcher,
}: {
  fetcher: () => Promise<ApiNameListResponse>;
}) {
  const data = await fetcher();

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
