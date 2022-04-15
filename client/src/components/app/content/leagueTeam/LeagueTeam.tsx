import { Grid } from '@mui/material';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { PARAMS } from '../../../../constants/app';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import TeamItem from '../../../common/teamItem/TeamItem';
import { controls } from '../../../../redux/leagueTeam/constants';
import Players from './players/Players';
import Fixtures from './fixtures/Fixtures';
import TabControl from './tabControl/TabControl';

import './leagueTeam.scss';
import { setSelectedTeam } from '../../../../redux/leagueTeam/thunks';

const LeagueTeam: React.FC = () => {
  const dispatch = useAppDispatch();
  const { selectedTeam, selectedControl } = useAppSelector((state) => state.leagueTeam);

  const { [PARAMS.teamId]: teamId } = useParams();

  useEffect(() => {
    if (teamId && selectedTeam?.id !== Number(teamId)) {
      dispatch(setSelectedTeam(teamId));
    }
  }, [dispatch, selectedTeam, teamId]);

  return (
    <div className="leagueTeamContent">
      {selectedTeam && selectedTeam.id === Number(teamId) && (
        <>
          <Grid container spacing={2} marginBottom={1}>
            <Grid item xs={6}>
              <TeamItem
                id={selectedTeam.id}
                name={selectedTeam.name}
                shortName={selectedTeam.shortName}
                crestUrl={selectedTeam.crestUrl}
                tabControl={<TabControl />}
              />
            </Grid>
          </Grid>
          {selectedControl === controls.players ? <Players /> : <Fixtures />}
        </>
      )}
    </div>
  );
};

export default LeagueTeam;
