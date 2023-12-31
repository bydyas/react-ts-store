import React from 'react';
import { styled } from '@mui/system';
import { Link } from 'react-router-dom';

import Settings from './components/Settings';
import BurgerMenu from './components/BurgerMenu';

import { useFirebase } from '../../../../hooks/useFirebase';
import { Wrapper } from '../../../../ui/Wrapper';
import { NavLink } from '../../../../ui/NavLink';
import { Page, routes } from '../../../../models';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import SpaOutlinedIcon from '@mui/icons-material/SpaOutlined';

const pages: Page[] = [
  { title: 'Home', path: routes.HOME },
  { title: 'Products', path: routes.PRDOUCTS },
  { title: 'Contacts', path: routes.CONTACTS },
  { title: 'Cart', path: routes.CART },
];

const StyledAppBar = styled(AppBar)({
  height: '123px',
  boxShadow: 'none',
  backgroundColor: 'transparent',
});

const StyledSpaOutlinedIcon = styled(SpaOutlinedIcon)({
  marginRight: '3px',
});

const StyledBtn = styled(Button)({
  lineHeight: 1.6,
  fontSize: '1.25rem',
});

const Header: React.FC = () => {
  const { user, logout } = useFirebase();

  return (
    <StyledAppBar position="static">
      <Wrapper>
        <Toolbar disableGutters sx={{ height: '100%' }}>
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to={routes.HOME}
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}>
            GREEN
            <StyledSpaOutlinedIcon />
            MIND
          </Typography>

          <BurgerMenu pages={pages} />

          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}>
            GREEN <StyledSpaOutlinedIcon /> MIND
          </Typography>
          <Box component={'nav'} sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map(({ title, path }) => (
              <NavLink key={title} to={path}>
                {title}
              </NavLink>
            ))}
          </Box>

          {user ? (
            <Settings logout={logout} photoURL={user?.photoURL} displayName={user?.displayName} />
          ) : (
            <Link to={routes.LOGIN} style={{ display: 'block' }}>
              <StyledBtn variant="outlined">Sign In</StyledBtn>
            </Link>
          )}
        </Toolbar>
      </Wrapper>
    </StyledAppBar>
  );
};

export default Header;
