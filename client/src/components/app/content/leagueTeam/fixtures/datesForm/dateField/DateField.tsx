import { TextField } from '@mui/material';
import React from 'react';
import { Control, Controller } from 'react-hook-form';

import { DATES_FORM_NAMES } from '../../../../../../../redux/leagueTeam/constants';
import { DatesFormFields, DatesFormNames } from '../../../../../../../redux/leagueTeam/types';

import './dateField.scss';

type DateFieldProps = {
  fieldName: DatesFormNames;
  control: Control<DatesFormFields>;
};

const DateField: React.FC<DateFieldProps> = ({ fieldName, control }) => {
  return (
    <Controller
      name={DATES_FORM_NAMES[fieldName]}
      control={control}
      render={({ field }) => <TextField {...field} type="date" />}
    />
  );
};

export default DateField;
