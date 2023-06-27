import React from 'react';

import { routes } from '../../../../../models';

import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { NavLink } from '../../../../../ui/NavLink';

type SettingsProps = {
  logout: () => void;
  photoURL: string;
  displayName: string;
};

const Settings: React.FC<SettingsProps> = ({ logout, photoURL, displayName }) => {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const firstName: string = displayName.split(' ')[0];
  const lastName: string = displayName.split(' ')[1];
  const initials = `${firstName[0]}${lastName[0]}`;

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const logOut = () => {
    handleCloseUserMenu();
    logout();
  };

  console.log(initials);

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar src={null || photoURL} alt={photoURL || displayName}>
            {photoURL || initials}
          </Avatar>
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: '45px' }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}>
        <MenuItem onClick={handleCloseUserMenu}>
          <NavLink to={routes.PROFILE}>
            <Typography textAlign="center">Profile</Typography>
          </NavLink>
        </MenuItem>
        <MenuItem onClick={logOut}>
          <Typography textAlign="center" p={1}>
            Log Out
          </Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default Settings;
