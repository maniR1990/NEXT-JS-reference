import React from 'react';
import { fetchSidebarDelayProvider, fetchSidebarLists } from './utils/apicalls';
import NameListSection from './components/NameListSection';

export default async function Sidebar() {
  const delayProvider = await fetchSidebarDelayProvider();
  const lists = await fetchSidebarLists(delayProvider.delayMsList);

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

      {lists.map((list) => (
        <NameListSection key={list.id} data={list} />
      ))}
    </div>
  );
}
