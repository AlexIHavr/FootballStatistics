import { configureStore } from '@reduxjs/toolkit';

import twitterReducer from './twitterAuth/reducer';
import leagueTableReducer from './leagueTable/reducer';
import leagueTeamsReducer from './leagueTeams/reducer';
import leagueTeamReducer from './leagueTeam/reducer';

export const store = configureStore({
  reducer: {
    twitterAuth: twitterReducer,
    leagueTable: leagueTableReducer,
    leagueTeams: leagueTeamsReducer,
    leagueTeam: leagueTeamReducer,
  },
});

export type Store = ReturnType<typeof store.getState>;
export type Dispatch = typeof store.dispatch;
