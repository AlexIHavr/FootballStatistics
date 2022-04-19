/* eslint-disable no-unused-vars */
export enum urls {
  table = '/',
  teams = '/teams',
}

export enum params {
  teamId = 'teamId',
}

export const PLAYERS_DISPLAY_COUNT: number = 10;
export const FIXTURES_DISPLAY_COUNT: number = 5;

export const DATE_REGEX: RegExp = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
