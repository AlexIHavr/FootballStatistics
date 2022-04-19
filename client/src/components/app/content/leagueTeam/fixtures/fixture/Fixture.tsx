import { ListItem } from '@mui/material';
import classNames from 'classnames';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../../../hooks/redux';
import { setFixtureDetails } from '../../../../../../redux/leagueTeam/thunks';
import { FixtureProps } from '../../../../../../types/props';

import './fixture.scss';

const Fixture: React.FC<FixtureProps> = ({
  teamFixture: {
    id,
    homeTeam,
    awayTeam,
    score: { fullTime },
    utcDate,
  },
  active = false,
  showFixtureDetails = false,
}) => {
  const dispatch = useAppDispatch();
  const { fixtureDetails } = useAppSelector((state) => state.leagueTeam);

  useEffect(() => {
    if (showFixtureDetails) dispatch(setFixtureDetails(id));
  }, [dispatch, id, showFixtureDetails]);

  return (
    <ListItem className={classNames('teamFixture teamItem', { active })}>
      <span>
        {homeTeam.name} - {awayTeam.name}{' '}
        {fullTime.homeTeam !== null && fullTime.awayTeam !== null && (
          <span>
            {fullTime.homeTeam} - {fullTime.awayTeam}
          </span>
        )}
      </span>

      <span>Date: {new Date(utcDate).toDateString()}</span>

      {showFixtureDetails && fixtureDetails && (
        <>
          <div className="hr" />
          <span>Statistics:</span>
          <span>
            {fixtureDetails.homeTeam.name} wins: {fixtureDetails.homeTeam.wins}
          </span>
          <span>
            {fixtureDetails.awayTeam.name} wins: {fixtureDetails.awayTeam.wins}
          </span>
          <span>Draws: {fixtureDetails.homeTeam.draws}</span>
        </>
      )}
    </ListItem>
  );
};

export default Fixture;
