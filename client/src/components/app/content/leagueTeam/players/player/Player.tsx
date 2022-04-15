import { Avatar, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import { PlayerProps } from '../../../../../../types/props';
import playerShirtSrc from '../../../../../../assets/images/playerShirt.png';

import './player.scss';

const Player: React.FC<PlayerProps> = ({ name, position, dateOfBirth, shirtNumber }) => {
  return (
    <ListItem className="teamItem">
      <ListItemText
        primary={<h6>{name}</h6>}
        secondary={
          <>
            <span>{`position: ${position}`}</span>
            <br />
            <span>{`date of birth: ${new Date(dateOfBirth).toDateString()}`}</span>
          </>
        }
      />
      <ListItemAvatar className="playerShirt">
        <h4 className="playerNumber">{shirtNumber}</h4>
        <Avatar className="teamItemAvatar" src={playerShirtSrc} />
      </ListItemAvatar>
    </ListItem>
  );
};

export default Player;
