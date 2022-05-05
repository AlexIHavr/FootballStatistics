import './leagueTable.scss';
import LeagueTbody from './leagueTbody/LeagueTbody';
import LeagueThead from './leagueThead/LeagueThead';

const LeagueTable: React.FC = () => {
  return (
    <table className="leagueTable centered">
      <LeagueThead />
      <LeagueTbody />
    </table>
  );
};

export default LeagueTable;
