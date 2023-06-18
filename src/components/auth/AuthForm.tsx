import * as React from 'react';

import { useNavigate, useLocation, Link as RouterLink } from 'react-router-dom';
import { useFirebase } from '../../hooks/useFirebase';
import { useForm, Controller, SubmitHandler, Control } from 'react-hook-form';
import { styled } from '@mui/system';

import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';

const ErrorParagraph = styled(Typography)(({ theme }) => ({
  color: theme.palette.error.dark,
  marginTop: theme.spacing(3),
  marginBottom: theme.spacing(2),
  textAlign: 'center',
}));

const Content = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(8),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

const BtnOrSpinnerWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  marginTop: theme.spacing(3),
  marginBottom: theme.spacing(2),
}));

const Form = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(3),
}));

const IconWrapper = styled(Avatar)(({ theme }) => ({
  margin: theme.spacing(1),
  backgroundColor: theme.palette.secondary.main,
}));

interface IFormInputs {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

interface IControlledInput {
  name: 'email' | 'password' | 'firstName' | 'lastName';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<IFormInputs, any>;
  label: string;
  sm?: number;
  type?: React.HTMLInputTypeAttribute;
}

const ControlledInput: React.FC<IControlledInput> = ({ name, control, label, sm, type }) => {
  return (
    <Grid item xs={12} sm={sm}>
      <Controller
        name={name}
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange, value } }) => (
          <TextField onChange={onChange} value={value} label={label} fullWidth type={type} />
        )}
      />
    </Grid>
  );
};

const Copyright: React.FC<{ title: string }> = ({ title }) => {
  return (
    <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 5 }}>
      {'Copyright © '}
      <Link color="inherit" component={RouterLink} to="/">
        {title}
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
};

export const AuthForm: React.FC = () => {
  const { user, login, register, loading, error } = useFirebase();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { handleSubmit, control } = useForm<IFormInputs>({
    defaultValues: {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
    },
  });

  React.useEffect(() => {
    if (pathname === '/login') {
      document.title = 'Greenmind | Login';
    } else {
      document.title = 'Greenmind | Sign up';
    }

    if (user?.uid) {
      navigate('/');
    }
  }, []);

  const onSubmit: SubmitHandler<IFormInputs> = ({ email, password, firstName, lastName }) => {
    if (pathname === '/login') {
      login(email, password);
    } else {
      register(email, password, `${firstName} ${lastName}`);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Content>
        <IconWrapper>
          <LockOutlinedIcon />
        </IconWrapper>
        <Typography component="h1" variant="h5">
          {pathname === '/login' ? 'Sign in' : 'Sign up'}
        </Typography>
        <Form component="form" onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            {pathname !== '/login' && (
              <>
                <ControlledInput name="firstName" control={control} label="First Name" sm={6} />
                <ControlledInput name="lastName" control={control} label="Last Name" sm={6} />
              </>
            )}
            <ControlledInput name="email" control={control} label="Email Address" type="email" />
            <ControlledInput name="password" control={control} label="Password" type="password" />
          </Grid>
          {error?.message && <ErrorParagraph>{error?.message}</ErrorParagraph>}
          <BtnOrSpinnerWrapper>
            {loading ? (
              <LinearProgress />
            ) : (
              <Button type="submit" fullWidth variant="contained">
                Sign Up
              </Button>
            )}
          </BtnOrSpinnerWrapper>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link
                variant="body2"
                component={RouterLink}
                to={pathname === '/login' ? '/register' : '/login'}>
                {pathname === '/login'
                  ? "Don't have an account? Sign Up"
                  : 'Already have an account? Sign in'}
              </Link>
            </Grid>
          </Grid>
        </Form>
      </Content>
      <Copyright title={'Greenmind'} />
    </Container>
  );
};
