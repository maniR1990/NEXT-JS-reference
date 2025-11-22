import React, { Suspense } from 'react';
import {
  fetchSidebarApiA,
  fetchSidebarApiB,
  fetchSidebarApiC,
} from './utils/apicalls';
import NameListSection from './components/NameListSection';
import SectionSkeleton from './components/SectionSkeleton';

async function SidebarLists({ delayMsList }: { delayMsList: readonly number[] }) {
  const [delayForB, delayForC] = delayMsList;

  return (
    <div className="stack">
      <Suspense
        fallback={
          <SectionSkeleton
            title="Sidebar API B"
            description={`Waiting ${delayForB} ms for Sidebar API B`}
          />
        }
      >
        <NameListSection fetcher={() => fetchSidebarApiB(delayForB)} />
      </Suspense>

      <Suspense
        fallback={
          <SectionSkeleton
            title="Sidebar API C"
            description={`Waiting ${delayForC} ms for Sidebar API C`}
          />
        }
      >
        <NameListSection fetcher={() => fetchSidebarApiC(delayForC)} />
      </Suspense>
    </div>
  );
}

export default async function Sidebar() {
  const preliminary = await fetchSidebarApiA();

  return (
    <div className="stack">
      <section className="card">
        <header className="card-header">
          <p className="eyebrow">{preliminary.id}</p>
          <h3>{preliminary.title}</h3>
          <p className="muted">
            Loaded at {new Date(preliminary.loadedAt).toLocaleTimeString()}. Delay values: [
            {preliminary.delayMsList.join(', ')}] (ms)
          </p>
        </header>
      </section>

      <SidebarLists delayMsList={preliminary.delayMsList} />
    </div>
  );
}
