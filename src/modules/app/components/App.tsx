import { styled } from '@mui/system';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { FirebaseProvider } from '../../auth/providers/FirebaseProvider.tsx';
import theme from '../../../configs/theme.ts';

import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';

import AppNavigation from './AppNavigation.tsx';

const Background = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  height: '100vh',
  width: '100%',
}));

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <FirebaseProvider>
          <CssBaseline />
          <Background>
            <AppNavigation />
          </Background>
        </FirebaseProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
