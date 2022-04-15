import { Link } from 'react-router-dom';
import { URLS } from '../../../../../constants/app';
import { useAppSelector } from '../../../../../hooks/redux';
import './leagueTbody.scss';

const LeagueTbody: React.FC = () => {
  const {
    selectedLeagueSelector: { shortName },
    leagueTableData,
  } = useAppSelector((state) => state.leagueTable);

  return (
    <tbody>
      {leagueTableData[shortName] &&
        leagueTableData[shortName]?.map(
          ({
            position,
            team: { id, name },
            playedGames,
            won,
            draw,
            lost,
            goalsFor,
            goalsAgainst,
            points,
          }) => (
            <tr key={id}>
              <th>{position}</th>
              <th>
                <Link to={`${URLS.teams}/${id}`}>{name}</Link>
              </th>
              <th>{playedGames}</th>
              <th>{won}</th>
              <th>{draw}</th>
              <th>{lost}</th>
              <th>{goalsFor}</th>
              <th>{goalsAgainst}</th>
              <th>{points}</th>
            </tr>
          )
        )}
    </tbody>
  );
};
export default LeagueTbody;
