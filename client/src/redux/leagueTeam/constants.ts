/* eslint-disable no-unused-vars */
export enum controls {
  players = 'players',
  fixtures = 'fixtures',
}

export enum datesFormNames {
  dateFrom = 'dateFrom',
  dateTo = 'dateTo',
}

export const DEFAULT_VALUES_DATES = {
  [datesFormNames.dateFrom]: new Date().toLocaleDateString('sv-SE'),
  [datesFormNames.dateTo]: new Date(
    new Date().getTime() + 60 * 60 * 24 * 1000 * 14
  ).toLocaleDateString('sv-SE'),
};
