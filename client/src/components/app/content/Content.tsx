import { Route, Routes } from 'react-router-dom';
import { params, urls } from '../../../constants/app';
import LeagueTable from './leagueTable/LeagueTable';
import LeagueTeams from './leagueTeams/LeagueTeams';
import './content.scss';
import LeagueTeam from './leagueTeam/LeagueTeam';
import FavoritesTeams from './favoritesTeams/FavoritesTeams';

const Content: React.FC = () => {
  return (
    <Routes>
      <Route path={urls.table} element={<LeagueTable />} />

      <Route path={urls.teams} element={<LeagueTeams />} />
      <Route path={`${urls.teams}/:${params.teamId}`} element={<LeagueTeam />} />

      <Route path={urls.favorites} element={<FavoritesTeams />} />

      <Route path="/*" element={<LeagueTable />} />
    </Routes>
  );
};

export default Content;
