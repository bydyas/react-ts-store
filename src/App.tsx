import { HashRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { FirebaseProvider } from './providers/FirebaseProvider.tsx';
import theme from './configs/theme.ts';

import CssBaseline from '@mui/material/CssBaseline';

import AppNavigation from './views/app-navigation/AppNavigation.tsx';

const App: React.FC = () => {
  return (
    <HashRouter>
      <ThemeProvider theme={theme}>
        <FirebaseProvider>
          <CssBaseline />
          <AppNavigation />
        </FirebaseProvider>
      </ThemeProvider>
    </HashRouter>
  );
};

export default App;
