import { shortLeagueNamesType } from './../leagueTable/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initialStateType, leagueTeamsDataType } from './types';

const initialState: initialStateType = {
  leagueTeamsData: {},
};

export const leagueTeamsSlice = createSlice({
  name: 'leagueTeams',
  initialState,
  reducers: {
    setLeagueTeams: (
      state,
      action: PayloadAction<{ shortName: shortLeagueNamesType; teams: leagueTeamsDataType }>
    ) => {
      state.leagueTeamsData[action.payload.shortName] = action.payload.teams;
    },
  },
});

export const { setLeagueTeams } = leagueTeamsSlice.actions;

export default leagueTeamsSlice.reducer;
