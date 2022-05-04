import { createAsyncThunk } from '@reduxjs/toolkit';

import { footballApi } from '../../api/api';

import { LeagueTableData, ShortLeagueNames } from './types';

export const setLeagueTableData = createAsyncThunk<LeagueTableData, ShortLeagueNames>(
  'setLeagueTableData',
  async (shortName) => {
    const response = await footballApi.get(`/competitions/${shortName}/standings`);

    return {
      shortName,
      table: response.data.standings[0].table,
    };
  },
);
