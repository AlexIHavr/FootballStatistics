import { shortLeagueNames } from './constants';

export type ShortLeagueNames = keyof typeof shortLeagueNames;

export type LeagueSelector = {
  name: string;
  shortName: ShortLeagueNames;
};

export type LeagueTable = {
  position: number;
  team: {
    id: number;
    name: string;
    crestUrl: string;
  };
  playedGames: number;
  form: null;
  won: number;
  draw: number;
  lost: number;
  points: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
}[];

export type InitialState = {
  selectedLeagueSelector: LeagueSelector;
  leagueTableData: Partial<{
    -readonly // eslint-disable-next-line no-unused-vars
    [index in ShortLeagueNames]: LeagueTable;
  }>;
};

export type LeagueTableData = {
  shortName: ShortLeagueNames;
  table: LeagueTable;
};
