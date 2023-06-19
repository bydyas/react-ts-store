import { styled } from '@mui/system';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { FirebaseProvider } from './modules/auth/providers/FirebaseProvider.tsx';
import theme from './configs/theme.ts';
import { AuthForm } from './modules/auth/components/AuthForm.tsx';
import { Profile } from './modules/profile/components/Profile.tsx';

import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';

const Background = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  height: '100vh',
  width: '100%',
}));

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <FirebaseProvider>
          <CssBaseline />
          <Background>
            <Routes>
              <Route path={'/'} element={<h1>home</h1>} />
              <Route path={'/profile'} element={<Profile />} />
              <Route path={'/login'} element={<AuthForm />} />
              <Route path={'/register'} element={<AuthForm />} />
            </Routes>
          </Background>
        </FirebaseProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
