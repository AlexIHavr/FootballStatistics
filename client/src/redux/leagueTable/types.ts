import { SHORT_LEAGUE_NAMES } from './constants';

export type ShortLeagueNames = keyof typeof SHORT_LEAGUE_NAMES;

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
  leagueTableData: Partial<Record<ShortLeagueNames, LeagueTable>>;
};

export type LeagueTableData = {
  shortName: ShortLeagueNames;
  table: LeagueTable;
};
