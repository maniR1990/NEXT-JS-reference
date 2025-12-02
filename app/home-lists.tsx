import React from 'react';
import {
  fetchHomeApiD,
  fetchHomeApiE,
  fetchHomeApiF,
  fetchHomeApiG,
} from './utils/apicalls';
import PreliminaryCard from './components/PreliminaryCard';
import SuspenseNameSection from './components/SuspenseNameSection';

type HomeConfig = {
  title: string;
  delayMs: number;
  dataPromise: ReturnType<typeof fetchHomeApiE>;
};

const createHomeConfigs = (delayMsList: readonly number[]): HomeConfig[] => [
  { title: 'Home API E', delayMs: delayMsList[0], dataPromise: fetchHomeApiE(delayMsList[0]) },
  { title: 'Home API F', delayMs: delayMsList[1], dataPromise: fetchHomeApiF(delayMsList[1]) },
  { title: 'Home API G', delayMs: delayMsList[2], dataPromise: fetchHomeApiG(delayMsList[2]) },
];

export default async function HomeLists() {
  const preliminary = await fetchHomeApiD();
  const homeConfigs = createHomeConfigs(preliminary.delayMsList);

  return (
    <div className="stack">
      <PreliminaryCard data={preliminary} description="Home preliminary fetch" />

      <div className="grid">
        {homeConfigs.map((config) => (
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
