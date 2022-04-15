import { ShortLeagueNames } from './../leagueTable/types';
export type LeagueTeamsData = {
  id: number;
  area: {
    id: number;
    name: string;
  };
  name: string;
  shortName: string;
  tla: string;
  crestUrl: string;
  address: string;
  phone: string;
  website: string;
  email: string | null;
  founded: number;
  clubColors: string;
  venue: string;
  lastUpdated: string;
}[];

export type InitialState = {
  leagueTeamsData: Partial<{
    -readonly // eslint-disable-next-line no-unused-vars
    [index in ShortLeagueNames]: LeagueTeamsData;
  }>;
};

export type LeagueTeams = {
  shortName: ShortLeagueNames;
  teams: LeagueTeamsData;
};
