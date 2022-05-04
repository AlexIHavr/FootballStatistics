import { Avatar, Card, ListItemAvatar, ListItemText } from '@mui/material';

import playerShirtSrc from '../../../../../../assets/images/playerShirt.png';

import './player.scss';

type PlayerProps = {
  name: string;
  position: string;
  dateOfBirth: string;
  shirtNumber: number | null;
};

const Player: React.FC<PlayerProps> = ({ name, position, dateOfBirth, shirtNumber }) => {
  return (
    <Card className="teamItem">
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
    </Card>
  );
};

export default Player;
