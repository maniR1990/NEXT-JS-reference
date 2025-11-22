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

  // Kick off both dependent data fetches immediately after we know the delays.
  const sidebarBPromise = fetchSidebarApiB(delayForB);
  const sidebarCPromise = fetchSidebarApiC(delayForC);

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
        <NameListSection dataPromise={sidebarBPromise} />
      </Suspense>

      <Suspense
        fallback={
          <SectionSkeleton
            title="Sidebar API C"
            description={`Waiting ${delayForC} ms for Sidebar API C`}
          />
        }
      >
        <NameListSection dataPromise={sidebarCPromise} />
      </Suspense>
    </div>
  );
}

export default async function Sidebar() {
  // 1) Fetch preliminary delay values on the server.
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

      {/* 2) Stream dependent calls inside Suspense so each list reveals independently. */}
      <SidebarLists delayMsList={preliminary.delayMsList} />
    </div>
  );
}
