/* eslint-disable no-unused-vars */
import { LeagueSelector } from './types';

export enum SHORT_LEAGUE_NAMES {
  PL = 'PL',
  BL1 = 'BL1',
  PD = 'PD',
  SA = 'SA',
  FL1 = 'FL1',
}

export const LEAGUE_SELECTORS: LeagueSelector[] = [
  {
    name: 'English Premier League',
    shortName: SHORT_LEAGUE_NAMES.PL,
  },
  {
    name: 'German 1. Bundesliga',
    shortName: SHORT_LEAGUE_NAMES.BL1,
  },
  {
    name: 'Spanish Primera',
    shortName: SHORT_LEAGUE_NAMES.PD,
  },
  {
    name: 'Italian Serie A',
    shortName: SHORT_LEAGUE_NAMES.SA,
  },
  {
    name: 'French League 1',
    shortName: SHORT_LEAGUE_NAMES.FL1,
  },
];
