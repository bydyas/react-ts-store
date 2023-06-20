import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { routes } from '../models/index.ts';

const AuthPage = React.lazy(() => import('../../auth/components/AuthForm.tsx'));
const ProfilePage = React.lazy(() => import('../../profile/components/Profile.tsx'));

const AppNavigation: React.FC = () => {
  return (
    <React.Suspense fallback={'Loading...'}>
      <Routes>
        <Route path={routes.HOME} element={<h1>home</h1>} />
        <Route path={routes.PROFILE} element={<ProfilePage />} />
        <Route path={routes.LOGIN} element={<AuthPage />} />
        <Route path={routes.REGISTER} element={<AuthPage />} />
      </Routes>
    </React.Suspense>
  );
};

export default AppNavigation;
