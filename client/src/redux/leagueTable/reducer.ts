import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { InitialState, LeagueSelector, LeagueTableData } from './types';
import { LEAGUE_SELECTORS } from './constants';
import { setLeagueTableData } from './thunks';

const initialState: InitialState = {
  selectedLeagueSelector: LEAGUE_SELECTORS[0],
  leagueTableData: {},
};

export const leagueTableSlice = createSlice({
  name: 'leagueTable',
  initialState,
  reducers: {
    setSelectedLeagueSelector: (state, action: PayloadAction<LeagueSelector>) => {
      state.selectedLeagueSelector = action.payload;
    },
  },
  extraReducers: {
    [setLeagueTableData.fulfilled.type]: (state, action: PayloadAction<LeagueTableData>) => {
      state.leagueTableData[action.payload.shortName] = action.payload.table;
    },
  },
});

export const { setSelectedLeagueSelector } = leagueTableSlice.actions;

export default leagueTableSlice.reducer;
