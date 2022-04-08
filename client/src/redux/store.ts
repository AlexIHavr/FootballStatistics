import { configureStore } from '@reduxjs/toolkit';
import twitterReducer from './twitterAuth/reducer';
import leagueTableReducer from './leagueTable/reducer';
import leagueTeamsReducer from './leagueTeams/reducer';

export const store = configureStore({
  reducer: {
    twitterAuth: twitterReducer,
    leagueTable: leagueTableReducer,
    leagueTeams: leagueTeamsReducer,
  },
});

export type storeType = ReturnType<typeof store.getState>;
export type dispatchType = typeof store.dispatch;
