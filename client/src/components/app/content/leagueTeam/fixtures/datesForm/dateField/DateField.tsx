import { TextField } from '@mui/material';
import classNames from 'classnames';
import React from 'react';
import { useController } from 'react-hook-form';
import { DATE_REGEX } from '../../../../../../../constants/app';
import { datesFormNames } from '../../../../../../../redux/leagueTeam/constants';
import { DateFieldProps } from '../../../../../../../types/props';

import './dateField.scss';

const DateField: React.FC<DateFieldProps> = ({ fieldName, control, errors }) => {
  const { field } = useController({
    name: datesFormNames[fieldName],
    control,
    rules: {
      required: { value: true, message: 'Field is required' },
      pattern: { value: DATE_REGEX, message: 'Date must have format: YYYY-MM-DD' },
    },
  });

  return (
    <TextField
      {...field}
      className={classNames({ errorDateField: !!errors[fieldName] })}
      helperText={errors[fieldName] ? errors[fieldName]?.message : ''}
      error={!!errors[fieldName]}
    />
  );
};

export default DateField;
