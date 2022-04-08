import { LEAGUE_SELECTORS } from './constants';
import {
  initialStateType,
  leagueSelectorType,
  leagueTableResponseType,
  shortLeagueNamesType,
} from './types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: initialStateType = {
  selectedLeagueSelector: LEAGUE_SELECTORS[0],
  leagueTableData: {},
};

export const leagueTableSlice = createSlice({
  name: 'leagueTable',
  initialState,
  reducers: {
    setSelectedLeagueSelector: (state, action: PayloadAction<leagueSelectorType>) => {
      state.selectedLeagueSelector = action.payload;
    },
    setLeagueTableData: (
      state,
      action: PayloadAction<{ shortName: shortLeagueNamesType; table: leagueTableResponseType }>
    ) => {
      state.leagueTableData[action.payload.shortName] = action.payload.table;
    },
  },
});

export const { setSelectedLeagueSelector, setLeagueTableData } = leagueTableSlice.actions;

export default leagueTableSlice.reducer;
