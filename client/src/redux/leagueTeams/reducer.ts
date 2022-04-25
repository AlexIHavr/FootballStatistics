import {
  addFavoriteTeam,
  getFavoriteTeams,
  removeFavoriteTeam,
  setLeagueTeamsData,
} from './thunks';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GetFavoriteTeamsResponse, InitialState, LeagueTeams } from './types';

const initialState: InitialState = {
  leagueTeamsData: {},
  favoriteTeams: [],
};

export const leagueTeamsSlice = createSlice({
  name: 'leagueTeams',
  initialState,
  reducers: {},
  extraReducers: {
    [setLeagueTeamsData.fulfilled.type]: (state, action: PayloadAction<LeagueTeams>) => {
      state.leagueTeamsData[action.payload.shortName] = action.payload.teams;
    },
    [getFavoriteTeams.fulfilled.type]: (state, action: PayloadAction<GetFavoriteTeamsResponse>) => {
      state.favoriteTeams = action.payload;
    },
    [addFavoriteTeam.fulfilled.type]: (state, action: PayloadAction<number>) => {
      state.favoriteTeams.push(action.payload);
    },
    [removeFavoriteTeam.fulfilled.type]: (state, action: PayloadAction<number>) => {
      state.favoriteTeams = state.favoriteTeams.filter((id) => id !== action.payload);
    },
  },
});

export default leagueTeamsSlice.reducer;
