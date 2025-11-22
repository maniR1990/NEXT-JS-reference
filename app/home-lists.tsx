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
        <NameListSection fetcher={() => fetchHomeApiE(delayForE)} />
      </Suspense>

      <Suspense
        fallback={
          <SectionSkeleton
            title="Home API F"
            description={`Waiting ${delayForF} ms for Home API F`}
          />
        }
      >
        <NameListSection fetcher={() => fetchHomeApiF(delayForF)} />
      </Suspense>

      <Suspense
        fallback={
          <SectionSkeleton
            title="Home API G"
            description={`Waiting ${delayForG} ms for Home API G`}
          />
        }
      >
        <NameListSection fetcher={() => fetchHomeApiG(delayForG)} />
      </Suspense>
    </div>
  );
}

export default async function HomeLists() {
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

      <HomeListGroup delayMsList={preliminary.delayMsList} />
    </div>
  );
}
