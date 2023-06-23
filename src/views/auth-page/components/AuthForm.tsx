import React from 'react';

import { Link as RouterLink } from 'react-router-dom';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { styled } from '@mui/system';

import FormInput from './FormInput';
import { authSchema } from '../../../validation/authSchema.ts';
import { FormInputs, FormProps } from '../../../models/index.ts';

import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';

const ErrorParagraph = styled(Typography)(({ theme }) => ({
  color: theme.palette.error.dark,
  marginTop: theme.spacing(1),
  marginBottom: theme.spacing(1),
  textAlign: 'center',
}));

const BtnOrSpinnerWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  marginTop: theme.spacing(3),
  marginBottom: theme.spacing(2),
}));

const Btn = styled(Button)({
  width: '100%',
  color: '#FFFFFF',
});

const AuthForm: React.FC<FormProps> = ({
  btnLabel,
  hintLabel,
  hintPath,
  showFull,
  error,
  loading,
  pathname,
  onAuth,
}) => {
  const methods = useForm<FormInputs>({
    resolver: zodResolver(authSchema),
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitSuccessful },
  } = methods;

  React.useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  React.useEffect(() => reset({}), [pathname]);

  const onSubmit: SubmitHandler<FormInputs> = (credentials) => onAuth(credentials);

  return (
    <FormProvider {...methods}>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          {showFull && (
            <>
              <FormInput name="firstName" label="First Name" sm={6} />
              <FormInput name="lastName" label="Last Name" sm={6} />
            </>
          )}
          <FormInput name="email" label="Email Address" type="email" />
          <FormInput name="password" label="Password" type="password" />
        </Grid>
        {error && <ErrorParagraph>{error}</ErrorParagraph>}
        <BtnOrSpinnerWrapper>
          {loading ? (
            <LinearProgress />
          ) : (
            <Btn type="submit" variant="contained">
              {btnLabel}
            </Btn>
          )}
        </BtnOrSpinnerWrapper>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link variant="body2" component={RouterLink} to={hintPath}>
              {hintLabel}
            </Link>
          </Grid>
        </Grid>
      </Box>
    </FormProvider>
  );
};

export default AuthForm;
