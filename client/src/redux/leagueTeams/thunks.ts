import { createAsyncThunk } from '@reduxjs/toolkit';
import { footballApi, userApi } from './../../api/api';
import { ShortLeagueNames } from './../leagueTable/types';
import { GetFavoriteTeamsResponse, LeagueTeams } from './types';

export const setLeagueTeamsData = createAsyncThunk<LeagueTeams, ShortLeagueNames>(
  'setLeagueTeamsData',
  async (shortName) => {
    const response = await footballApi.get(`/competitions/${shortName}/teams`);
    return {
      shortName,
      teams: response.data.teams,
    };
  }
);

export const getFavoriteTeams = createAsyncThunk<GetFavoriteTeamsResponse>(
  'getFavoriteTeams',
  async () => {
    const response = await userApi.get<GetFavoriteTeamsResponse>('/getFavoriteTeams');
    return response.data;
  }
);

export const addFavoriteTeam = createAsyncThunk<number, number>('addFavoriteTeam', async (id) => {
  await userApi.put('/addFavoriteTeam', { id });
  return id;
});

export const removeFavoriteTeam = createAsyncThunk<number, number>(
  'removeFavoriteTeam',
  async (id) => {
    await userApi.delete('/deleteFavoriteTeam', { data: { id } });
    return id;
  }
);
