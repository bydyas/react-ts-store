import React from 'react';
import { TextField, TextFieldProps, Grid } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

type IFormInputProps = {
  sm?: number;
  name: string;
  label: string;
  type?: React.HTMLInputTypeAttribute;
} & TextFieldProps;

const FormInput: React.FC<IFormInputProps> = ({ type, label, sm, name, ...otherProps }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Grid item xs={12} sm={sm}>
      <Controller
        control={control}
        defaultValue={''}
        name={name}
        render={({ field }) => (
          <TextField
            {...otherProps}
            {...field}
            fullWidth
            label={label}
            type={type}
            error={!!errors[name]}
            helperText={errors[name] ? (errors[name]?.message as string) : ''}
          />
        )}
      />
    </Grid>
  );
};

export default FormInput;
