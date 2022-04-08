import {
  Avatar,
  FormControl,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import { LEAGUE_SELECTORS } from '../../../../redux/leagueTable/constants';
import { setSelectedLeagueSelector } from '../../../../redux/leagueTable/reducer';
import { shortLeagueNamesType } from '../../../../redux/leagueTable/types';
import { leagueTeamsDataRequest } from '../../../../redux/leagueTeams/thunks';
import './leagueTeams.scss';

const LeagueTeams: React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    leagueTable: { selectedLeagueSelector },
    leagueTeams: { leagueTeamsData },
  } = useAppSelector((state) => state);

  const selectLeagueSelector = useCallback(
    (e: SelectChangeEvent<shortLeagueNamesType>) => {
      dispatch(
        setSelectedLeagueSelector(
          LEAGUE_SELECTORS.find(({ shortName }) => shortName === e.target.value) ||
            selectedLeagueSelector
        )
      );
    },
    [dispatch, selectedLeagueSelector]
  );

  useEffect(() => {
    if (!leagueTeamsData[selectedLeagueSelector.shortName]?.length)
      dispatch(leagueTeamsDataRequest(selectedLeagueSelector.shortName));
  }, [dispatch, leagueTeamsData, selectedLeagueSelector]);

  return (
    <div className="leagueTeamsContent">
      <div className="leagueTeamsHeader card">
        <div className="card-content white-text">
          <span className="card-title">{selectedLeagueSelector.name}</span>
        </div>
      </div>
      <FormControl className="leagueSelectors">
        <Select
          onChange={selectLeagueSelector}
          value={selectedLeagueSelector.shortName}
          id="demo-simple-select"
        >
          {LEAGUE_SELECTORS.map(({ name, shortName }) => (
            <MenuItem key={shortName} value={shortName}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <List className="teamsList">
        {leagueTeamsData[selectedLeagueSelector.shortName]?.map(
          ({ id, name, shortName, crestUrl }) => (
            <div key={id} className="teamItemWrapper">
              <ListItem alignItems="center" className="teamItem">
                <ListItemAvatar>
                  <Avatar className="teamItemAvatar" src={crestUrl} />
                </ListItemAvatar>
                <ListItemText
                  primary={<Link to="/">{name}</Link>}
                  secondary={
                    <>
                      <span>shortName: {shortName}</span>
                      <br />
                      <a className="addToFavorites waves-effect btn">Add team to favorites</a>
                    </>
                  }
                />
              </ListItem>
            </div>
          )
        )}
      </List>
    </div>
  );
};

export default LeagueTeams;
