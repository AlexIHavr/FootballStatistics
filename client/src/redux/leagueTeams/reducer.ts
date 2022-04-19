import { setLeagueTeamsData } from './thunks';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { InitialState, LeagueTeams } from './types';

const initialState: InitialState = {
  leagueTeamsData: {},
};

export const leagueTeamsSlice = createSlice({
  name: 'leagueTeams',
  initialState,
  reducers: {},
  extraReducers: {
    [setLeagueTeamsData.fulfilled.type]: (state, action: PayloadAction<LeagueTeams>) => {
      state.leagueTeamsData[action.payload.shortName] = action.payload.teams;
    },
  },
});

export default leagueTeamsSlice.reducer;
