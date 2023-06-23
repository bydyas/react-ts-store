import { styled } from '@mui/system';
import { HashRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { FirebaseProvider } from './providers/FirebaseProvider.tsx';
import theme from './configs/theme.ts';

import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';

import AppNavigation from './views/app-navigation/AppNavigation.tsx';

const Background = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  width: '100%',
}));

const App: React.FC = () => {
  return (
    <HashRouter>
      <ThemeProvider theme={theme}>
        <FirebaseProvider>
          <CssBaseline />
          <Background>
            <AppNavigation />
          </Background>
        </FirebaseProvider>
      </ThemeProvider>
    </HashRouter>
  );
};

export default App;
