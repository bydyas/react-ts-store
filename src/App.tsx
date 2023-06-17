import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { FirebaseProvider } from './providers/FirebaseProvider.tsx';
import theme from './configs/theme.ts';
import CssBaseline from '@mui/material/CssBaseline';
import { Login } from './components/auth/Login.tsx';
import { Profile } from './components/profile/Profile.tsx';

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <FirebaseProvider>
          <Routes>
            <Route path={'/'} element={<Profile />} />
            <Route path={'/login'} element={<Login />} />
          </Routes>
        </FirebaseProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
