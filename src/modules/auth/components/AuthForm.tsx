import * as React from 'react';

import { useNavigate, useLocation, Link as RouterLink } from 'react-router-dom';
import { useFirebase } from '../hooks/useFirebase';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import { routes } from '../../app/models';
import { zodResolver } from '@hookform/resolvers/zod';
import { styled } from '@mui/system';

import FormInput from './FormInput';
import Copyright from './Copyright';
import { schema, FormInputs } from '../zod/schema';

import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import SpaOutlinedIcon from '@mui/icons-material/SpaOutlined';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';

const ErrorParagraph = styled(Typography)(({ theme }) => ({
  color: theme.palette.error.dark,
  marginTop: theme.spacing(1),
  marginBottom: theme.spacing(1),
  textAlign: 'center',
}));

const Content = styled(Box)(({ theme }) => ({
  paddingTop: theme.spacing(8),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
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

const IconWrapper = styled(Avatar)(({ theme }) => ({
  margin: theme.spacing(1),
  backgroundColor: theme.palette.primary.main,
}));

const AuthForm: React.FC = () => {
  const { user, login, register, loading, error } = useFirebase();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const methods = useForm<FormInputs>({
    resolver: zodResolver(schema),
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

  React.useEffect(() => {
    if (pathname === routes.LOGIN) {
      document.title = 'Greenmind | Sign in';
    } else {
      document.title = 'Greenmind | Sign up';
    }

    if (user?.uid) {
      navigate(routes.HOME);
    }
  }, []);

  React.useEffect(() => reset({}), [pathname]);

  const onSubmit: SubmitHandler<FormInputs> = ({ email, password, firstName, lastName }) => {
    if (pathname === routes.LOGIN) {
      login(email, password);
    } else {
      register(email, password, `${firstName} ${lastName}`);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Content>
        <IconWrapper>
          <SpaOutlinedIcon />
        </IconWrapper>
        <Typography component="h1" variant="h5">
          {pathname === routes.LOGIN ? 'Sign in' : 'Sign up'}
        </Typography>
        <FormProvider {...methods}>
          <Box
            component="form"
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              {pathname !== routes.LOGIN && (
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
                  {pathname === routes.LOGIN ? 'Sign In' : 'Sign Up'}
                </Btn>
              )}
            </BtnOrSpinnerWrapper>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link
                  variant="body2"
                  component={RouterLink}
                  to={pathname === routes.LOGIN ? routes.REGISTER : routes.LOGIN}>
                  {pathname === routes.LOGIN
                    ? "Don't have an account? Sign Up"
                    : 'Already have an account? Sign in'}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </FormProvider>
      </Content>
      <Copyright title={'Greenmind'} />
    </Container>
  );
};

export default AuthForm;
