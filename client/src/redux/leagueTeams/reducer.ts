import { setLeagueTeamsData } from './thunks';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { InitialState, LeagueTeams } from './types';

const initialState: InitialState = {
  leagueTeamsData: {},
  favoritesTeams: [],
};

export const leagueTeamsSlice = createSlice({
  name: 'leagueTeams',
  initialState,
  reducers: {
    toggleFavoritesTeam: (state, action: PayloadAction<number>) => {
      state.favoritesTeams.find((id) => id === action.payload)
        ? (state.favoritesTeams = state.favoritesTeams.filter((id) => id !== action.payload))
        : state.favoritesTeams.push(action.payload);
    },
  },
  extraReducers: {
    [setLeagueTeamsData.fulfilled.type]: (state, action: PayloadAction<LeagueTeams>) => {
      state.leagueTeamsData[action.payload.shortName] = action.payload.teams;
    },
  },
});

export const { toggleFavoritesTeam } = leagueTeamsSlice.actions;

export default leagueTeamsSlice.reducer;
