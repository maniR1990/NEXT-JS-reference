import React from 'react';
import { fetchHomeDelayProvider, fetchHomeLists } from './utils/apicalls';
import NameListSection from './components/NameListSection';

export default async function HomeLists() {
  const delayProvider = await fetchHomeDelayProvider();
  const lists = await fetchHomeLists(delayProvider.delayMsList);

  return (
    <div className="stack">
      <section className="card">
        <header className="card-header">
          <p className="eyebrow">{delayProvider.id}</p>
          <h3>{delayProvider.title}</h3>
          <p className="muted">
            Loaded at {new Date(delayProvider.loadedAt).toLocaleTimeString()}. Delay values: [
            {delayProvider.delayMsList.join(', ')}] (ms)
          </p>
        </header>
      </section>

      <div className="grid">
        {lists.map((list) => (
          <NameListSection key={list.id} data={list} />
        ))}
      </div>
    </div>
  );
}
