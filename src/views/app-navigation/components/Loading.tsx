import React from 'react';

import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Loading: React.FC = () => {
  return (
    <Box sx={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <CircularProgress size="3rem" />
    </Box>
  );
};

export default Loading;
