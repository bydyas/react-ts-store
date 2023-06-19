import { createTheme } from '@mui/material/styles';
import { green, amber } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: green[500],
    },
    background: {
      default: green[50],
    },
  },
});

export default theme;
