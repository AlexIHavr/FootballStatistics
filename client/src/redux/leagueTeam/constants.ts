/* eslint-disable no-unused-vars */
export enum CONTROLS {
  players = 'players',
  fixtures = 'fixtures',
}

export const CONTROLS_VALUES = Object.keys(CONTROLS);

export enum DATES_FORM_NAMES {
  dateFrom = 'dateFrom',
  dateTo = 'dateTo',
}

export const DEFAULT_VALUES_DATES = {
  [DATES_FORM_NAMES.dateFrom]: new Date().toLocaleDateString('sv-SE'),
  [DATES_FORM_NAMES.dateTo]: new Date(
    new Date().getTime() + 60 * 60 * 24 * 1000 * 14,
  ).toLocaleDateString('sv-SE'),
};
