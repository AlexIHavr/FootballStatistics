import { Grid } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { FIXTURES_DISPLAY_COUNT } from '../../../../../constants/app';
import { filterByCurrentPage } from '../../../../../helpers/app';
import { useAppDispatch, useAppSelector } from '../../../../../hooks/redux';
import { setSelectedTeamFixture } from '../../../../../redux/leagueTeam/reducer';
import { setSelectedTeamFixtureLastGames } from '../../../../../redux/leagueTeam/thunks';
import { TeamFixture } from '../../../../../redux/leagueTeam/types';
import TeamPagination from '../../../../common/teamPagination/TeamPagination';
import DatesForm from './datesForm/DatesForm';
import Fixture from './fixture/Fixture';

import './fixtures.scss';

const Fixtures: React.FC = () => {
  const dispatch = useAppDispatch();
  const { teamFixtures, teamFixturesError, selectedTeamFixture, selectedTeamFixtureLastGames } =
    useAppSelector((state) => state.leagueTeam);

  const [currentPage, setCurrentPage] = useState<number>(1);

  const setSelectedTeamFixtureOnClick = useCallback(
    (elem: TeamFixture) => {
      dispatch(setSelectedTeamFixture(elem));
    },
    [dispatch]
  );

  useEffect(() => {
    if (selectedTeamFixture) dispatch(setSelectedTeamFixtureLastGames(selectedTeamFixture));
  }, [dispatch, selectedTeamFixture]);

  return (
    <Grid container spacing={2} className="fixturesContent">
      <Grid item xs={6}>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <div className="card">Fixtures</div>
          </Grid>

          <Grid item>
            <DatesForm />
          </Grid>

          {teamFixturesError && (
            <Grid item>
              <div className="teamItem error">{teamFixturesError}</div>
            </Grid>
          )}

          <Grid item>
            {teamFixtures.length ? (
              <TeamPagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                itemsCount={teamFixtures.length}
                displayCount={FIXTURES_DISPLAY_COUNT}
              />
            ) : (
              <div className="card">No results</div>
            )}
          </Grid>

          {filterByCurrentPage({
            items: teamFixtures,
            currentPage,
            displayCount: FIXTURES_DISPLAY_COUNT,
          }).map((teamFixture) => (
            <Grid
              key={teamFixture.id}
              item
              className="fixtureItem"
              onClick={() => setSelectedTeamFixtureOnClick(teamFixture)}
            >
              <Fixture
                teamFixture={teamFixture}
                active={selectedTeamFixture?.id === teamFixture.id}
              />
            </Grid>
          ))}
        </Grid>
      </Grid>

      <Grid item xs={6}>
        {selectedTeamFixture && (
          <Grid container direction="column" spacing={2}>
            <Grid item marginTop="0.5rem">
              <Fixture teamFixture={selectedTeamFixture} showFixtureDetails />
            </Grid>
            {selectedTeamFixtureLastGames.map((game) => (
              <Grid key={game.id} item>
                <Fixture teamFixture={game} active={game.id === selectedTeamFixture.id} />
              </Grid>
            ))}
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};

export default Fixtures;
