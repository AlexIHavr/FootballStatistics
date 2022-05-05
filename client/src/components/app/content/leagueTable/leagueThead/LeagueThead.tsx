import classNames from 'classnames';
import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../../../../hooks/redux';
import { LEAGUE_SELECTORS } from '../../../../../redux/leagueTable/constants';
import { setSelectedLeagueSelector } from '../../../../../redux/leagueTable/reducer';
import { setLeagueTableData } from '../../../../../redux/leagueTable/thunks';

import './leagueThead.scss';

const LeagueThead: React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    selectedLeagueSelector: { shortName },
    leagueTableData,
  } = useAppSelector((state) => state.leagueTable);

  useEffect(() => {
    if (!leagueTableData[shortName]?.length) dispatch(setLeagueTableData(shortName));
  }, [dispatch, shortName, leagueTableData]);

  return (
    <thead>
      <tr className="leagueSelectors">
        {LEAGUE_SELECTORS.map((leagueSelector) => (
          <th
            key={leagueSelector.shortName}
            onClick={() => dispatch(setSelectedLeagueSelector(leagueSelector))}
            className={classNames({
              active: shortName === leagueSelector.shortName,
            })}
          >
            {leagueSelector.name}
          </th>
        ))}
      </tr>
      <tr>
        <th>Position</th>
        <th>Team</th>
        <th>G</th>
        <th>W</th>
        <th>D</th>
        <th>L</th>
        <th>GS</th>
        <th>GC</th>
        <th>P</th>
      </tr>
    </thead>
  );
};

export default LeagueThead;
