import { Avatar, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { urls } from '../../../constants/app';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { toggleFavoritesTeam } from '../../../redux/leagueTeams/reducer';
import { TeamItemProps } from '../../../types/props';

import './teamItem.scss';

const TeamItem: React.FC<TeamItemProps> = ({ id, name, shortName, crestUrl, tabControl }) => {
  const dispatch = useAppDispatch();
  const { favoritesTeams } = useAppSelector((state) => state.leagueTeams);

  const toggleFavoritesTeamOnClick = useCallback(
    (id: number) => {
      dispatch(toggleFavoritesTeam(id));
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

            <a
              className="addToFavorites waves-effect btn"
              onClick={() => toggleFavoritesTeamOnClick(id)}
            >
              {!favoritesTeams.find((teamId) => teamId === id)
                ? 'Add to favorites'
                : ' Remove from favorites'}
            </a>
          </>
        }
      />
      {tabControl && tabControl}
    </ListItem>
  );
};

export default TeamItem;
