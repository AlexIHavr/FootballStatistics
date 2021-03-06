import { Grid } from '@mui/material';

import { useAppSelector } from '../../../../hooks/redux';
import TeamItem from '../../../common/teamItem/TeamItem';

const FavoriteTeams: React.FC = () => {
  const { leagueTeamsData, favoriteTeams } = useAppSelector((state) => state.leagueTeams);

  return (
    <div className="leagueTeamContent">
      <Grid container spacing={2} justifyContent="center">
        {favoriteTeams.length ? (
          favoriteTeams.map((id) => {
            const team = Object.values(leagueTeamsData)
              ?.flat(1)
              .find((team) => team.id === id);

            if (team)
              return (
                <Grid key={id} item>
                  <TeamItem
                    id={id}
                    name={team.name}
                    shortName={team.shortName}
                    crestUrl={team.crestUrl}
                  />
                </Grid>
              );

            return 0;
          })
        ) : (
          <Grid item>
            <div className="card">No favorites</div>
          </Grid>
        )}
      </Grid>
    </div>
  );
};

export default FavoriteTeams;
