import { Avatar, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';
import { urls } from '../../../constants/app';
import { TeamItemProps } from '../../../types/props';

import './teamItem.scss';

const TeamItem: React.FC<TeamItemProps> = ({ id, name, shortName, crestUrl, tabControl }) => {
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
            <a className="addToFavorites waves-effect btn">Add team to favorites</a>
          </>
        }
      />
      {tabControl && tabControl}
    </ListItem>
  );
};

export default TeamItem;
