import { setSelectedTeam, setTeamTweets } from './thunks';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { controls } from './constants';
import { Controls, InitialState, TeamData, TeamTweets } from './types';

const initialState: InitialState = {
  selectedTeam: null,
  selectedControl: controls.players,
  teamTweets: [],
  tweetsQuery: '',
};

export const leagueTeamSlice = createSlice({
  name: 'leagueTeam',
  initialState,
  reducers: {
    setSelectedControl: (state, action: PayloadAction<Controls>) => {
      state.selectedControl = action.payload;
    },
    setTweetsQuery: (state, action: PayloadAction<string>) => {
      state.tweetsQuery = action.payload;
    },
  },
  extraReducers: {
    [setSelectedTeam.fulfilled.type]: (state, action: PayloadAction<TeamData>) => {
      state.selectedTeam = action.payload;
    },
    [setTeamTweets.fulfilled.type]: (state, action: PayloadAction<TeamTweets>) => {
      state.teamTweets = action.payload;
    },
  },
});

export const { setSelectedControl, setTweetsQuery } = leagueTeamSlice.actions;

export default leagueTeamSlice.reducer;
