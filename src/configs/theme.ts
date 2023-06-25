import { createTheme } from '@mui/material/styles';
import { green } from '@mui/material/colors';

const theme = createTheme({
  typography: {
    fontFamily: ['Poppins', '"Helvetica Neue"', 'Arial', 'sans-serif'].join(','),
  },
  palette: {
    primary: {
      main: green[500],
    },
    background: {
      // default: green[50],
    },
    text: {
      primary: '#1E1E1E',
      secondary: '#1E1E1E80',
    },
  },
});

export default theme;
