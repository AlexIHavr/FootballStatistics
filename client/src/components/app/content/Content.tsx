import { Route, Routes } from 'react-router-dom';
import { params, urls } from '../../../constants/app';
import LeagueTable from './leagueTable/LeagueTable';
import LeagueTeams from './leagueTeams/LeagueTeams';
import './content.scss';
import LeagueTeam from './leagueTeam/LeagueTeam';
import FavoriteTeams from './favoriteTeams/FavoriteTeams';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { useEffect } from 'react';
import { getFavoriteTeams, setLeagueTeamsData } from '../../../redux/leagueTeams/thunks';
import { LEAGUE_SELECTORS } from '../../../redux/leagueTable/constants';

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
      <Route path={urls.table} element={<LeagueTable />} />

      <Route path={urls.teams} element={<LeagueTeams />} />
      <Route path={`${urls.teams}/:${params.teamId}`} element={<LeagueTeam />} />

      <Route path={urls.favorites} element={<FavoriteTeams />} />

      <Route path="/*" element={<LeagueTable />} />
    </Routes>
  );
};

export default Content;
