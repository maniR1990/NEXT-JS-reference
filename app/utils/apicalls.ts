export type ApiNameListResponse = {
  id: string;
  title: string;
  delayMs: number;
  loadedAt: string;
  names: string[];
};

export type ApiDelayListResponse<DelayMsList> = {
  id: string;
  title: string;
  loadedAt: string;
  delayMsList: DelayMsList;
};

const sleep = (delayMs: number) =>
  new Promise<void>((resolve) => {
    setTimeout(resolve, delayMs);
  });

const baseNames: string[] = [
  "Ada Lovelace",
  "Alan Turing",
  "Grace Hopper",
  "Donald Knuth",
  "Edsger Dijkstra",
  "Barbara Liskov",
  "Linus Torvalds",
  "Margaret Hamilton",
  "Ken Thompson",
  "Dennis Ritchie",
  "Guido van Rossum",
  "Bjarne Stroustrup",
  "James Gosling",
  "Brendan Eich",
  "John Carmack",
  "Leslie Lamport",
  "Niklaus Wirth",
  "John McCarthy",
  "Robin Milner",
  "Yukihiro Matsumoto",
  "Anders Hejlsberg",
  "Brian Kernighan",
  "Rob Pike",
  "Martin Fowler",
  "Kent Beck",
  "Eric Evans",
  "Rich Hickey",
  "Evan You",
  "Misko Hevery",
  "Dan Abramov",
  "Ryan Dahl",
  "David Heinemeier Hansson",
  "TJ Holowaychuk",
  "Douglas Crockford",
  "Sandi Metz",
];

const getRandomIntInclusive = (min: number, max: number) => {
  const minCeil = Math.ceil(min);
  const maxFloor = Math.floor(max);

  return Math.floor(Math.random() * (maxFloor - minCeil + 1)) + minCeil;
};

const createRandomNameList = () => {
  const listLength = getRandomIntInclusive(12, 36);

  return Array.from({ length: listLength }, () => {
    const index = getRandomIntInclusive(0, baseNames.length - 1);
    return baseNames[index];
  });
};

const createNameListResponse = (config: {
  id: string;
  title: string;
  delayMs: number;
}): Promise<ApiNameListResponse> =>
  sleep(config.delayMs).then(() => ({
    id: config.id,
    title: config.title,
    delayMs: config.delayMs,
    loadedAt: new Date().toISOString(),
    names: createRandomNameList(),
  }));

const createDelayListResponse = <DelayMsList>(config: {
  id: string;
  title: string;
  delayMs: number;
  delayMsList: DelayMsList;
}): Promise<ApiDelayListResponse<DelayMsList>> =>
  sleep(config.delayMs).then(() => ({
    id: config.id,
    title: config.title,
    loadedAt: new Date().toISOString(),
    delayMsList: config.delayMsList,
  }));

export const fetchSidebarApiA = () =>
  createDelayListResponse({
    id: "sidebar-api-a",
    title: "Sidebar API A",
    delayMs: 750,
    delayMsList: [1000, 3000] as const,
  });

export const fetchSidebarApiB = (delayMs: number) =>
  createNameListResponse({
    id: "sidebar-api-b",
    title: "Sidebar API B",
    delayMs,
  });

export const fetchSidebarApiC = (delayMs: number) =>
  createNameListResponse({
    id: "sidebar-api-c",
    title: "Sidebar API C",
    delayMs,
  });

export const fetchHomeApiD = () =>
  createDelayListResponse({
    id: "home-api-d",
    title: "Home API D",
    delayMs: 1500,
    delayMsList: [1000, 3000, 5000] as const,
  });

export const fetchHomeApiE = (delayMs: number) =>
  createNameListResponse({
    id: "home-api-e",
    title: "Home API E",
    delayMs,
  });

export const fetchHomeApiF = (delayMs: number) =>
  createNameListResponse({
    id: "home-api-f",
    title: "Home API F",
    delayMs,
  });

export const fetchHomeApiG = (delayMs: number) =>
  createNameListResponse({
    id: "home-api-g",
    title: "Home API G",
    delayMs,
  });