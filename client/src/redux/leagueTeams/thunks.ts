import { footballApi } from './../../api/api';
import { dispatchType } from './../store';
import { shortLeagueNamesType } from './../leagueTable/types';
import { setLeagueTeams } from './reducer';

export const leagueTeamsDataRequest =
  (shortName: shortLeagueNamesType) => async (dispatch: dispatchType) => {
    try {
      const response = await footballApi.get(`competitions/${shortName}/teams`);
      dispatch(
        setLeagueTeams({
          shortName,
          teams: response.data.teams,
        })
      );
    } catch (err) {
      console.log(err);
    }
  };
