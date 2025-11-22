import React, { Suspense } from 'react';
import {
  fetchHomeApiD,
  fetchHomeApiE,
  fetchHomeApiF,
  fetchHomeApiG,
} from './utils/apicalls';
import NameListSection from './components/NameListSection';
import SectionSkeleton from './components/SectionSkeleton';

async function HomeListGroup({ delayMsList }: { delayMsList: readonly number[] }) {
  const [delayForE, delayForF, delayForG] = delayMsList;

  // Start the three dependent data calls immediately so they can resolve in parallel.
  const homeEPromise = fetchHomeApiE(delayForE);
  const homeFPromise = fetchHomeApiF(delayForF);
  const homeGPromise = fetchHomeApiG(delayForG);

  return (
    <div className="grid">
      <Suspense
        fallback={
          <SectionSkeleton
            title="Home API E"
            description={`Waiting ${delayForE} ms for Home API E`}
          />
        }
      >
        <NameListSection dataPromise={homeEPromise} />
      </Suspense>

      <Suspense
        fallback={
          <SectionSkeleton
            title="Home API F"
            description={`Waiting ${delayForF} ms for Home API F`}
          />
        }
      >
        <NameListSection dataPromise={homeFPromise} />
      </Suspense>

      <Suspense
        fallback={
          <SectionSkeleton
            title="Home API G"
            description={`Waiting ${delayForG} ms for Home API G`}
          />
        }
      >
        <NameListSection dataPromise={homeGPromise} />
      </Suspense>
    </div>
  );
}

export default async function HomeLists() {
  // 1) Fetch preliminary delay values on the server for the home area.
  const preliminary = await fetchHomeApiD();

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

      {/* 2) Stream the dependent calls in parallel using individual Suspense boundaries. */}
      <HomeListGroup delayMsList={preliminary.delayMsList} />
    </div>
  );
}
