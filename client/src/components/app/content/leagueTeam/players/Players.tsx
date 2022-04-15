import { Grid, ListItem, ListItemText } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../../../hooks/redux';
import { useEffect, useState } from 'react';
import TeamPagination from '../../../../common/teamPagination/TeamPagination';
import Player from './player/Player';
import { paginationDisplayCount } from '../../../../../constants/app';
import { setTeamTweets } from '../../../../../redux/leagueTeam/thunks';
import { setTweetsQuery } from '../../../../../redux/leagueTeam/reducer';

const Players: React.FC = () => {
  const dispatch = useAppDispatch();

  const { selectedTeam, teamTweets, tweetsQuery } = useAppSelector((state) => state.leagueTeam);
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    if (selectedTeam?.shortName && selectedTeam.shortName !== tweetsQuery) {
      dispatch(setTeamTweets(selectedTeam.shortName));
      dispatch(setTweetsQuery(selectedTeam.shortName));
    }
  }, [dispatch, selectedTeam, tweetsQuery]);

  return (
    <Grid container spacing={2} className="leagueTeamCards">
      <Grid item xs={6}>
        <div className="card">Players</div>
      </Grid>
      <Grid item xs={6}>
        <div className="card">{`Tweets for tag #${selectedTeam?.shortName}`}</div>
      </Grid>
      <Grid item xs={6} paddingTop={0}>
        <Grid container direction="column" className="playersList" spacing={2}>
          <Grid item>
            <TeamPagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              itemsCount={selectedTeam?.squad.length || 0}
            />
          </Grid>

          {selectedTeam &&
            selectedTeam.squad
              .filter(
                (_, index) =>
                  index >= (currentPage - 1) * paginationDisplayCount &&
                  index < currentPage * paginationDisplayCount
              )
              .map(({ id, name, position, dateOfBirth, shirtNumber }) => (
                <Grid key={id} item>
                  <Player
                    name={name}
                    position={position}
                    dateOfBirth={dateOfBirth}
                    shirtNumber={shirtNumber}
                  />
                </Grid>
              ))}
        </Grid>
      </Grid>

      <Grid item xs={6} paddingTop={0}>
        <Grid container direction="column" className="tweetsList" spacing={2}>
          {selectedTeam &&
            (teamTweets.length ? (
              teamTweets.map(({ id, text, created_at, username }) => (
                <Grid key={id} item>
                  <ListItem className="teamItem">
                    <ListItemText
                      primary={<h6>{`@${username} at ${new Date(created_at).toDateString()}`}</h6>}
                      secondary={text}
                    />
                  </ListItem>
                </Grid>
              ))
            ) : (
              <Grid item>
                <ListItem className="teamItem">
                  No tweets found for {selectedTeam.shortName}
                </ListItem>
              </Grid>
            ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Players;
