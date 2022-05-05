import { Grid, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useCallback } from 'react';

import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import { LEAGUE_SELECTORS } from '../../../../redux/leagueTable/constants';
import { setSelectedLeagueSelector } from '../../../../redux/leagueTable/reducer';
import { ShortLeagueNames } from '../../../../redux/leagueTable/types';
import TeamItem from '../../../common/teamItem/TeamItem';
import './leagueTeams.scss';

const LeagueTeams: React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    leagueTable: { selectedLeagueSelector },
    leagueTeams: { leagueTeamsData },
  } = useAppSelector((state) => state);

  const selectLeagueSelector = useCallback(
    (e: SelectChangeEvent<ShortLeagueNames>) => {
      dispatch(
        setSelectedLeagueSelector(
          LEAGUE_SELECTORS.find(({ shortName }) => shortName === e.target.value) ||
            selectedLeagueSelector,
        ),
      );
    },
    [dispatch, selectedLeagueSelector],
  );

  return (
    <div className="leagueTeamsContent">
      <div className="leagueTeamsHeader card">
        <div className="card-content white-text">
          <span className="card-title">{selectedLeagueSelector.name}</span>
        </div>
      </div>

      <Select
        onChange={selectLeagueSelector}
        value={selectedLeagueSelector.shortName}
        id="demo-simple-select"
        className="leagueSelectors"
      >
        {LEAGUE_SELECTORS.map(({ name, shortName }) => (
          <MenuItem key={shortName} value={shortName}>
            {name}
          </MenuItem>
        ))}
      </Select>

      <Grid container spacing={2} className="teamsList">
        {leagueTeamsData[selectedLeagueSelector.shortName]?.map(
          ({ id, name, shortName, crestUrl }) => (
            <Grid item xs={6} key={id} className="teamItemWrapper">
              <TeamItem id={id} name={name} shortName={shortName} crestUrl={crestUrl} />
            </Grid>
          ),
        )}
      </Grid>
    </div>
  );
};

export default LeagueTeams;
