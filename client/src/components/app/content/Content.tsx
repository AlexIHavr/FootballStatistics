import { Route, Routes } from 'react-router-dom';
import { PARAMS, URLS } from '../../../constants/app';
import LeagueTable from './leagueTable/LeagueTable';
import LeagueTeams from './leagueTeams/LeagueTeams';
import './content.scss';
import LeagueTeam from './leagueTeam/LeagueTeam';

const Content: React.FC = () => {
  return (
    <Routes>
      <Route path={URLS.table} element={<LeagueTable />} />
      <Route path={URLS.teams} element={<LeagueTeams />} />
      <Route path={`${URLS.teams}/:${PARAMS.teamId}`} element={<LeagueTeam />} />
      <Route path="/*" element={<LeagueTable />} />
    </Routes>
  );
};

export default Content;
