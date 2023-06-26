import { styled } from '@mui/system';
import { NavLink as BaseNavLink } from 'react-router-dom';

export const NavLink = styled(BaseNavLink)(({ theme }) => ({
  display: 'block',
  fontSize: '1.25rem',
  lineHeight: 1.6,
  marginLeft: theme.spacing(2),
  marginRight: theme.spacing(2),
  textDecoration: 'none',
  color: theme.palette.text.primary,
  '&.active': {
    color: theme.palette.text.secondary,
  },
  '&:hover': {
    color: theme.palette.text.secondary,
  },
}));
