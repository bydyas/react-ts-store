import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { styled } from '@mui/system';

import { useFirebase } from '../../hooks/useFirebase';
import { routes } from '../../models';
import { FormInputs, FormProps } from '../../models';
import AuthForm from './components/AuthForm';
import Copyright from './components/Copyright';

import SpaOutlinedIcon from '@mui/icons-material/SpaOutlined';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const Content = styled(Box)(({ theme }) => ({
  paddingTop: theme.spacing(8),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

const IconWrapper = styled(Avatar)(({ theme }) => ({
  margin: theme.spacing(2),
  backgroundColor: theme.palette.primary.main,
}));

const FlexBox = styled(Box)({
  display: 'flex',
  alignItems: 'center',
});

const AuthPage: React.FC = () => {
  const { user, login, register, loading, error } = useFirebase();
  const navigate = useNavigate();
  const { pathname } = useLocation();

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

  const onAuth = ({ email, password, firstName, lastName }: FormInputs) => {
    if (pathname === routes.LOGIN) {
      login(email, password);
    } else {
      register(email, password, `${firstName} ${lastName}`);
    }
  };

  const formProps: FormProps = {
    onAuth,
    loading,
    error,
    pathname,
    btnLabel: pathname === routes.LOGIN ? 'sign in' : 'sign up',
    hintLabel:
      pathname === routes.LOGIN
        ? "Don't have an account? Sign Up"
        : 'Already have an account? Sign in',
    hintPath: pathname === routes.LOGIN ? routes.REGISTER : routes.LOGIN,
    showFull: !(pathname === routes.LOGIN),
  };

  return (
    <Container component="main" maxWidth="xs">
      <Content>
        <FlexBox>
          <IconWrapper>
            <SpaOutlinedIcon />
          </IconWrapper>
          <Typography component="h1" sx={{ fontSize: '1.25em' }}>
            Greenmind
          </Typography>
        </FlexBox>
        <Typography component="h1" variant="h5">
          {pathname === routes.LOGIN ? 'Sign In' : 'Sign Up'}
        </Typography>
        <AuthForm {...formProps} />
      </Content>
      <Copyright title={'Greenmind'} />
    </Container>
  );
};

export default AuthPage;
