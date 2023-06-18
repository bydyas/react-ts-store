import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { FirebaseProvider } from './providers/FirebaseProvider.tsx';
import { theme } from './configs/theme.ts';
import CssBaseline from '@mui/material/CssBaseline';
import { AuthForm } from './components/auth/AuthForm.tsx';
import { Profile } from './components/profile/Profile.tsx';

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <FirebaseProvider>
          <Routes>
            <Route path={'/'} element={<h1>home</h1>} />
            <Route path={'/profile'} element={<Profile />} />
            <Route path={'/login'} element={<AuthForm />} />
            <Route path={'/register'} element={<AuthForm />} />
          </Routes>
        </FirebaseProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
