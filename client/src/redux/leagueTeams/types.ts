import { ShortLeagueNames } from './../leagueTable/types';

export type LeagueTeamData = {
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
};

export type LeagueTeamsData = LeagueTeamData[];

export type InitialState = {
  leagueTeamsData: Partial<Record<ShortLeagueNames, LeagueTeamsData>>;
  favoriteTeams: number[];
};

export type LeagueTeams = {
  shortName: ShortLeagueNames;
  teams: LeagueTeamsData;
};

export type GetFavoriteTeamsResponse = number[];
