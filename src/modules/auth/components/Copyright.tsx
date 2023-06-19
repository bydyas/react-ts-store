import React from 'react';

import { Link as RouterLink } from 'react-router-dom';

import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

type CopyrightProps = {
  title: string;
};

const Copyright: React.FC<CopyrightProps> = ({ title }) => {
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

export default Copyright;
