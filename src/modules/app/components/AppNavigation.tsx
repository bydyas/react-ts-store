import React from 'react';
import { Route, Routes } from 'react-router-dom';

const AuthPage = React.lazy(() => import('../../auth/components/AuthForm.tsx'));
const ProfilePage = React.lazy(() => import('../../profile/components/Profile.tsx'));

const AppNavigation: React.FC = () => {
  return (
    <React.Suspense fallback={'Loading...'}>
      <Routes>
        <Route path={'/'} element={<h1>home</h1>} />
        <Route path={'/profile'} element={<ProfilePage />} />
        <Route path={'/login'} element={<AuthPage />} />
        <Route path={'/register'} element={<AuthPage />} />
      </Routes>
    </React.Suspense>
  );
};

export default AppNavigation;
