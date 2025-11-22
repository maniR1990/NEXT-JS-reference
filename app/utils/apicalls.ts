export type NameList = {
  id: string;
  title: string;
  names: string[];
  delayMs?: number;
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

export const fetchSidebarLists = () =>
  Promise.all([
    createList({
      id: 'sidebar-team',
      title: 'Sidebar team',
      delayMs: 500,
      names: basicNames.slice(0, 4),
    }),
    createList({
      id: 'sidebar-favorites',
      title: 'Sidebar favorites',
      delayMs: 500,
      names: basicNames.slice(3),
    }),
  ]);

export const fetchHomeLists = () =>
  Promise.all([
    createList({
      id: 'home-recent',
      title: 'Recently viewed',
      delayMs: 300,
      names: basicNames,
    }),
    createList({
      id: 'home-popular',
      title: 'Popular choices',
      delayMs: 300,
      names: [...basicNames].reverse(),
    }),
    createList({
      id: 'home-featured',
      title: 'Featured',
      delayMs: 300,
      names: ['Hana', 'Ivan', 'Jules'],
    }),
  ]);
