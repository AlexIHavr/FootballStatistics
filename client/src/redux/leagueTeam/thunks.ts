import { createAsyncThunk } from '@reduxjs/toolkit';
import { footballApi, twitterApi } from './../../api/api';
import { TeamData, TeamTweets } from './types';

export const setSelectedTeam = createAsyncThunk<TeamData, string>(
  'setSelectedTeam',
  async (teamId) => {
    const response = await footballApi.get<TeamData>(`/teams/${teamId}`);
    return response.data;
  }
);

export const setTeamTweets = createAsyncThunk<TeamTweets, string>(
  'setTeamTweets',
  async (query) => {
    const response = await twitterApi.post<TeamTweets>('/getTweets', { query });
    return response.data;
  }
);
