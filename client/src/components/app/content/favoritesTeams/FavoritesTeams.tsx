import { Grid } from '@mui/material';
import { useAppSelector } from '../../../../hooks/redux';
import { LeagueTeamData } from '../../../../redux/leagueTeams/types';
import TeamItem from '../../../common/teamItem/TeamItem';

const FavoritesTeams: React.FC = () => {
  const { leagueTeamsData, favoritesTeams } = useAppSelector((state) => state.leagueTeams);

  return (
    <div className="leagueTeamContent">
      <Grid container spacing={2} justifyContent="center">
        {favoritesTeams.length ? (
          favoritesTeams.map((id) => {
            const { name, shortName, crestUrl } = Object.values(leagueTeamsData)
              .flat(1)
              .find((team) => team.id === id) as LeagueTeamData;

            return (
              <Grid key={id} item>
                <TeamItem id={id} name={name} shortName={shortName} crestUrl={crestUrl} />
              </Grid>
            );
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

export default FavoritesTeams;
