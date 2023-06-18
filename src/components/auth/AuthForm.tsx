import * as React from 'react';

import { useNavigate, useLocation, Link as RouterLink } from 'react-router-dom';
import { useFirebase } from '../../hooks/useFirebase';

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

function Copyright({ title }: { title: string }) {
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
}

export const AuthForm: React.FC = () => {
  const { user, login, register, loading, error } = useFirebase();
  const navigate = useNavigate();
  const { pathname } = useLocation();

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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    if (pathname === '/login') {
      const email = data.get('email') as string;
      const password = data.get('password') as string;
      if (email && password) {
        login(email, password);
      }
    } else {
      const email = data.get('email') as string;
      const password = data.get('password') as string;
      const displayName = `${data.get('firstName')} ${data.get('lastName')}` as string;

      if (email && password && displayName) {
        register(email, password, displayName);
      }
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {pathname === '/login' ? 'Sign in' : 'Sign up'}
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            {pathname !== '/login' && (
              <>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                  />
                </Grid>
              </>
            )}
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
              />
            </Grid>
          </Grid>
          {error?.message && (
            <Typography color="danger" textAlign={'center'} sx={{ mt: 3, mb: 2 }}>
              {error?.message}
            </Typography>
          )}
          <Box sx={{ width: '100%', mt: 3, mb: 2 }}>
            {loading ? (
              <LinearProgress />
            ) : (
              <Button type="submit" fullWidth variant="contained">
                Sign Up
              </Button>
            )}
          </Box>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link
                href="#"
                variant="body2"
                component={RouterLink}
                to={pathname === '/login' ? '/register' : '/login'}>
                {pathname === '/login'
                  ? "Don't have an account? Sign Up"
                  : 'Already have an account? Sign in'}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright title={'Greenmind'} />
    </Container>
  );
};
