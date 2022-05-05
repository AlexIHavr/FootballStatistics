import { Grid } from '@mui/material';
import classNames from 'classnames';
import { useCallback } from 'react';

import { useAppDispatch, useAppSelector } from '../../../../../hooks/redux';
import { CONTROLS_VALUES } from '../../../../../redux/leagueTeam/constants';
import { setSelectedControl } from '../../../../../redux/leagueTeam/reducer';
import { Controls } from '../../../../../redux/leagueTeam/types';

import './tabControl.scss';

const TabControl = () => {
  const dispatch = useAppDispatch();
  const { selectedControl } = useAppSelector((state) => state.leagueTeam);

  const setSelectedControlOnClick = useCallback(
    (control) => {
      dispatch(setSelectedControl(control as Controls));
    },
    [dispatch],
  );

  return (
    <Grid container spacing={1} className="tabControl">
      {CONTROLS_VALUES.map((control) => (
        <Grid key={control} item xs={12 / CONTROLS_VALUES.length}>
          <div
            className={classNames('btn waves-effect', {
              active: selectedControl === control,
            })}
            onClick={() => setSelectedControlOnClick(control)}
          >
            {control}
          </div>
        </Grid>
      ))}
    </Grid>
  );
};

export default TabControl;
