import { InitialState, LeagueSelector, LeagueTableData } from './types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LEAGUE_SELECTORS } from './constants';

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
    setLeagueTableDataFulfilled: (state, action: PayloadAction<LeagueTableData>) => {
      state.leagueTableData[action.payload.shortName] = action.payload.table;
    },
  },

  //BUG!!!
  // extraReducers: {
  //   [setLeagueTableData.fulfilled.type]: (state, action: PayloadAction<LeagueTableData>) => {
  //     state.leagueTableData[action.payload.shortName] = action.payload.table;
  //   },
  // },
});

export const { setSelectedLeagueSelector, setLeagueTableDataFulfilled } = leagueTableSlice.actions;

export default leagueTableSlice.reducer;
