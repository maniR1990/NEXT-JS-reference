export type NameList = {
  id: string;
  title: string;
  names: string[];
  delayMs?: number;
};

export type DelayProvider = {
  id: string;
  title: string;
  delayMsList: readonly number[];
  loadedAt: string;
};

const sleep = (delayMs: number) =>
  new Promise<void>((resolve) => {
    setTimeout(resolve, delayMs);
  });

const basicNames = ['Alice', 'Bob', 'Charlie', 'Dana', 'Elliot', 'Farah', 'Gabe'];

const createList = (config: NameList): Promise<NameList> => {
  if (!config.delayMs) return Promise.resolve(config);

  return sleep(config.delayMs).then(() => config);
};

const createDelayProvider = (config: {
  id: string;
  title: string;
  delayMsList: readonly number[];
  delayMs: number;
}): Promise<DelayProvider> =>
  sleep(config.delayMs).then(() => ({
    id: config.id,
    title: config.title,
    delayMsList: config.delayMsList,
    loadedAt: new Date().toISOString(),
  }));

export const fetchSidebarDelayProvider = () =>
  createDelayProvider({
    id: 'sidebar-delay-provider',
    title: 'Sidebar delay provider',
    delayMs: 400,
    delayMsList: [500, 700],
  });

export const fetchSidebarLists = (delayMsList: readonly number[]) =>
  Promise.all([
    createList({
      id: 'sidebar-team',
      title: 'Sidebar team',
      delayMs: delayMsList[0],
      names: basicNames.slice(0, 4),
    }),
    createList({
      id: 'sidebar-favorites',
      title: 'Sidebar favorites',
      delayMs: delayMsList[1] ?? delayMsList[0],
      names: basicNames.slice(3),
    }),
  ]);

export const fetchHomeDelayProvider = () =>
  createDelayProvider({
    id: 'home-delay-provider',
    title: 'Home delay provider',
    delayMs: 600,
    delayMsList: [300, 400, 500],
  });

export const fetchHomeLists = (delayMsList: readonly number[]) =>
  Promise.all([
    createList({
      id: 'home-recent',
      title: 'Recently viewed',
      delayMs: delayMsList[0],
      names: basicNames,
    }),
    createList({
      id: 'home-popular',
      title: 'Popular choices',
      delayMs: delayMsList[1] ?? delayMsList[0],
      names: [...basicNames].reverse(),
    }),
    createList({
      id: 'home-featured',
      title: 'Featured',
      delayMs: delayMsList[2] ?? delayMsList[0],
      names: ['Hana', 'Ivan', 'Jules'],
    }),
  ]);
