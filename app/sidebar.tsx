import React from 'react';
import {
  fetchSidebarApiA,
  fetchSidebarApiB,
  fetchSidebarApiC,
} from './utils/apicalls';
import PreliminaryCard from './components/PreliminaryCard';
import SuspenseNameSection from './components/SuspenseNameSection';

type SidebarConfig = {
  title: string;
  delayMs: number;
  dataPromise: ReturnType<typeof fetchSidebarApiB>;
};

const createSidebarConfigs = (delayMsList: readonly number[]): SidebarConfig[] => [
  { title: 'Sidebar API B', delayMs: delayMsList[0], dataPromise: fetchSidebarApiB(delayMsList[0]) },
  { title: 'Sidebar API C', delayMs: delayMsList[1], dataPromise: fetchSidebarApiC(delayMsList[1]) },
];

export default async function Sidebar() {
  const preliminary = await fetchSidebarApiA();
  const sidebarConfigs = createSidebarConfigs(preliminary.delayMsList);

  return (
    <div className="stack">
      <PreliminaryCard data={preliminary} description="Sidebar preliminary fetch" />

      <div className="stack">
        {sidebarConfigs.map((config) => (
          <SuspenseNameSection
            key={config.title}
            title={config.title}
            delayMs={config.delayMs}
            dataPromise={config.dataPromise}
          />
        ))}
      </div>
    </div>
  );
}
