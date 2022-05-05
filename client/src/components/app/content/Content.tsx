import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { PARAMS, URLS } from '../../../constants/app';
import { LEAGUE_SELECTORS } from '../../../redux/leagueTable/constants';
import { getFavoriteTeams, setLeagueTeamsData } from '../../../redux/leagueTeams/thunks';

import LeagueTable from './leagueTable/LeagueTable';
import LeagueTeams from './leagueTeams/LeagueTeams';
import LeagueTeam from './leagueTeam/LeagueTeam';
import FavoriteTeams from './favoriteTeams/FavoriteTeams';

import './content.scss';

const Content: React.FC = () => {
  const { isAuth } = useAppSelector((state) => state.twitterAuth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isAuth) dispatch(getFavoriteTeams());
  }, [dispatch, isAuth]);

  useEffect(() => {
    LEAGUE_SELECTORS.forEach(({ shortName }) => {
      dispatch(setLeagueTeamsData(shortName));
    });
  }, [dispatch]);

  return (
    <Routes>
      <Route path={URLS.table} element={<LeagueTable />} />

      <Route path={URLS.teams} element={<LeagueTeams />} />
      <Route path={`${URLS.teams}/:${PARAMS.teamId}`} element={<LeagueTeam />} />

      <Route path={URLS.favorites} element={<FavoriteTeams />} />

      <Route path="/*" element={<LeagueTable />} />
    </Routes>
  );
};

export default Content;
