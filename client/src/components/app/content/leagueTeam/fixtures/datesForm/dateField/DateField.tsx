import { TextField } from '@mui/material';
import classNames from 'classnames';
import { useMemo } from 'react';
import { Controller } from 'react-hook-form';
import { DATE_REGEX } from '../../../../../../../constants/app';
import { datesFormNames } from '../../../../../../../redux/leagueTeam/constants';
import { DateFieldProps } from '../../../../../../../types/props';

import './dateField.scss';

const DateField: React.FC<DateFieldProps> = ({ fieldValue, control, errors }) => {
  const rules = useMemo(
    () => ({
      required: { value: true, message: 'Field is required' },
      pattern: { value: DATE_REGEX, message: 'Date must have format: YYYY-MM-DD' },
    }),
    []
  );

  return (
    <Controller
      name={datesFormNames[fieldValue]}
      control={control}
      rules={rules}
      render={({ field }) => (
        <TextField
          {...field}
          className={classNames({ errorDateField: !!errors[fieldValue] })}
          helperText={errors[fieldValue] ? errors[fieldValue]?.message : ''}
          error={!!errors[fieldValue]}
        />
      )}
    />
  );
};

export default DateField;
