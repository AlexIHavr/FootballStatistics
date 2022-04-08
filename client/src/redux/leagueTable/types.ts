import { shortLeagueNames } from './constants';

export type shortLeagueNamesType = keyof typeof shortLeagueNames;

export type leagueSelectorType = {
  name: string;
  shortName: shortLeagueNamesType;
};

export type leagueTableResponseType = {
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

export type initialStateType = {
  selectedLeagueSelector: leagueSelectorType;
  leagueTableData: Partial<{
    -readonly // eslint-disable-next-line no-unused-vars
    [index in shortLeagueNamesType]: leagueTableResponseType;
  }>;
};
