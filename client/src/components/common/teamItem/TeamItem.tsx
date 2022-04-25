import { Avatar, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { urls } from '../../../constants/app';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { addFavoriteTeam, removeFavoriteTeam } from '../../../redux/leagueTeams/thunks';
import { TeamItemProps } from '../../../types/props';

import './teamItem.scss';

const TeamItem: React.FC<TeamItemProps> = ({ id, name, shortName, crestUrl, tabControl }) => {
  const dispatch = useAppDispatch();
  const {
    leagueTeams: { favoriteTeams },
    twitterAuth: { isAuth },
  } = useAppSelector((state) => state);

  const addFavoriteTeamOnClick = useCallback(
    (id: number) => {
      dispatch(addFavoriteTeam(id));
    },
    [dispatch]
  );

  const removeFavoriteTeamOnClick = useCallback(
    (id: number) => {
      dispatch(removeFavoriteTeam(id));
    },
    [dispatch]
  );

  return (
    <ListItem className="teamItem">
      <ListItemAvatar>
        <Avatar className="teamItemAvatar" src={crestUrl} />
      </ListItemAvatar>
      <ListItemText
        primary={<Link to={`${urls.teams}/${id}`}>{name}</Link>}
        secondary={
          <>
            <span>shortName: {shortName}</span>
            <br />

            {isAuth &&
              (!favoriteTeams.find((teamId) => teamId === id) ? (
                <a
                  className="toggleToFavorites waves-effect btn"
                  onClick={() => addFavoriteTeamOnClick(id)}
                >
                  Add to favorites
                </a>
              ) : (
                <a
                  className="toggleToFavorites waves-effect btn"
                  onClick={() => removeFavoriteTeamOnClick(id)}
                >
                  Remove from favorites
                </a>
              ))}
          </>
        }
      />
      {tabControl && tabControl}
    </ListItem>
  );
};

export default TeamItem;
