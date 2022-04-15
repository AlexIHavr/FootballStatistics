import { createAsyncThunk } from '@reduxjs/toolkit';
import { footballApi } from '../../api/api';
import { Dispatch } from '../store';
import { setLeagueTableDataFulfilled } from './reducer';
import { ShortLeagueNames } from './types';

export const setLeagueTableData = createAsyncThunk<void, ShortLeagueNames, { dispatch: Dispatch }>(
  'setLeagueTableData',
  async (shortName, { dispatch }) => {
    const response = await footballApi.get(`/competitions/${shortName}/standings`);

    dispatch(
      setLeagueTableDataFulfilled({
        shortName,
        table: response.data.standings[0].table,
      })
    );
  }
);
