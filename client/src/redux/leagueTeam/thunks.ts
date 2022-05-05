import { createAsyncThunk } from '@reduxjs/toolkit';

import { Store } from '../store';

import { footballApi, twitterApi } from './../../api/api';
import {
  FixtureDetails,
  SetTeamFixturesParams,
  Team,
  TeamFixture,
  TeamFixtures,
  TeamTweets,
} from './types';

export const setSelectedTeam = createAsyncThunk<Team, string>('setSelectedTeam', async (teamId) => {
  const response = await footballApi.get<Team>(`/teams/${teamId}`);
  return response.data;
});

export const setTeamTweets = createAsyncThunk<TeamTweets, string>(
  'setTeamTweets',
  async (query) => {
    const response = await twitterApi.post<TeamTweets>('/getTweets', { query });
    return response.data;
  },
);

export const setTeamFixtures = createAsyncThunk<
  TeamFixtures,
  SetTeamFixturesParams,
  { rejectValue: string | undefined }
>('setTeamFixtures', async ({ teamId, dateFrom, dateTo }, { rejectWithValue }) => {
  try {
    const response = await footballApi.get(
      `/teams/${teamId}/matches?dateFrom=${dateFrom}&dateTo=${dateTo}`,
    );
    return response.data.matches;
  } catch (err: any) {
    return rejectWithValue(err?.response?.data?.message);
  }
});

export const setFixtureDetails = createAsyncThunk<FixtureDetails, number>(
  'setFixtureDetails',
  async (id) => {
    const response = await footballApi.get(`/matches/${id}`);
    return response.data.head2head;
  },
);

//BUG with {state: Store}!
export const setSelectedTeamFixtureLastGames = createAsyncThunk<TeamFixtures, TeamFixture>(
  'setSelectedTeamFixtureLastGames',
  async ({ homeTeam, awayTeam }, { getState }) => {
    const { dateFrom, dateTo } = (getState() as Store).leagueTeam.datesFormFields;

    //BUG as string!
    const matchesUrl: string = `/teams/${homeTeam.id}/matches?dateFrom=${dateFrom}&dateTo=${dateTo}`;

    const response = await footballApi.get<{ matches: TeamFixtures }>(matchesUrl);

    return response.data.matches.reduceRight<TeamFixtures>((games, fixture) => {
      if (
        games.length !== 10 &&
        (fixture.homeTeam.id === homeTeam.id || fixture.homeTeam.id === awayTeam.id) &&
        (fixture.awayTeam.id === homeTeam.id || fixture.awayTeam.id === awayTeam.id)
      ) {
        games.push(fixture);
      }

      return games;
    }, []);
  },
);
