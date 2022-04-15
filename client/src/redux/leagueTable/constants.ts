/* eslint-disable no-unused-vars */
import { LeagueSelector } from './types';

export enum shortLeagueNames {
  PL = 'PL',
  BL1 = 'BL1',
  PD = 'PD',
  SA = 'SA',
  FL1 = 'FL1',
}

export const LEAGUE_SELECTORS: LeagueSelector[] = [
  {
    name: 'English Premier League',
    shortName: shortLeagueNames.PL,
  },
  {
    name: 'German 1. Bundesliga',
    shortName: shortLeagueNames.BL1,
  },
  {
    name: 'Spanish Primera',
    shortName: shortLeagueNames.PD,
  },
  {
    name: 'Italian Serie A',
    shortName: shortLeagueNames.SA,
  },
  {
    name: 'French League 1',
    shortName: shortLeagueNames.FL1,
  },
];
