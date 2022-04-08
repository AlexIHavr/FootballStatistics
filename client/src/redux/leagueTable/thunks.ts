import { shortLeagueNamesType } from './types';
import { dispatchType } from './../store';
import { footballApi } from '../../api/api';
import { setLeagueTableData } from './reducer';

export const leagueTableDataRequest =
  (shortName: shortLeagueNamesType) => async (dispatch: dispatchType) => {
    try {
      const response = await footballApi.get(`competitions/${shortName}/standings`);

      dispatch(
        setLeagueTableData({
          shortName,
          table: response.data.standings[0].table,
        })
      );
    } catch (err) {
      console.log(err);
    }
  };
