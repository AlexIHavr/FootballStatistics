import { TextField } from '@mui/material';
import React from 'react';
import { Control, Controller } from 'react-hook-form';

import './formField.scss';

type DateFieldProps = {
  fieldName: string;
  control: Control<any>;
  type?: React.InputHTMLAttributes<unknown>['type'];
  required?: boolean;
};

const FormField: React.FC<DateFieldProps> = ({ fieldName, control, type, required }) => {
  return (
    <Controller
      name={fieldName}
      control={control}
      render={({ field }) => (
        <TextField {...field} type={type} label={fieldName} required={required} />
      )}
    />
  );
};

export default FormField;
