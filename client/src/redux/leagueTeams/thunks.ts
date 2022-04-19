import { createAsyncThunk } from '@reduxjs/toolkit';
import { footballApi } from './../../api/api';
import { ShortLeagueNames } from './../leagueTable/types';
import { LeagueTeams } from './types';

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
