type Urls = {
  [key: string]: { path: string; private?: boolean };
};

export const URLS: Urls = {
  table: { path: '/' },
  teams: { path: '/teams' },
  favorites: { path: '/favorites', private: true },
  profile: { path: '/profile', private: true },
};

export const URLS_ENTRIES = Object.entries(URLS);

export const PLAYERS_DISPLAY_COUNT: number = 10;
export const FIXTURES_DISPLAY_COUNT: number = 5;

export const FOOTBALL_API: string = 'https://api.football-data.org/v2';

export enum PARAMS {
  // eslint-disable-next-line no-unused-vars
  teamId = 'teamId',
}
