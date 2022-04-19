import {
  setSelectedTeam,
  setTeamTweets,
  setTeamFixtures,
  setFixtureDetails,
  setSelectedTeamFixtureLastGames,
} from './thunks';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { controls } from './constants';
import {
  Controls,
  InitialState,
  Team,
  TeamTweets,
  TeamFixtures,
  TeamFixture,
  FixtureDetails,
} from './types';

const initialState: InitialState = {
  selectedTeam: null,
  selectedControl: controls.players,
  teamTweets: [],
  teamFixtures: [],
  selectedTeamFixtureLastGames: [],
  selectedTeamFixture: null,
  fixtureDetails: null,
  teamFixturesError: '',
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
    setSelectedTeamFixture: (state, action: PayloadAction<TeamFixture>) => {
      state.selectedTeamFixture = action.payload;
    },
  },
  extraReducers: {
    [setSelectedTeam.fulfilled.type]: (state, action: PayloadAction<Team>) => {
      state.selectedTeam = action.payload;
    },
    [setTeamTweets.fulfilled.type]: (state, action: PayloadAction<TeamTweets>) => {
      state.teamTweets = action.payload;
    },
    [setTeamFixtures.fulfilled.type]: (state, action: PayloadAction<TeamFixtures>) => {
      state.selectedTeamFixture = null;
      state.teamFixtures = action.payload;
      state.teamFixturesError = '';
    },
    [setTeamFixtures.rejected.type]: (state, action: PayloadAction<string | undefined>) => {
      state.teamFixturesError = action.payload;
    },
    [setFixtureDetails.fulfilled.type]: (state, action: PayloadAction<FixtureDetails>) => {
      state.fixtureDetails = action.payload;
    },
    [setSelectedTeamFixtureLastGames.fulfilled.type]: (
      state,
      action: PayloadAction<TeamFixtures>
    ) => {
      state.selectedTeamFixtureLastGames = action.payload;
    },
  },
});

export const { setSelectedControl, setTweetsQuery, setSelectedTeamFixture } =
  leagueTeamSlice.actions;

export default leagueTeamSlice.reducer;
