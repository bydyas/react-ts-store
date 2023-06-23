import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import { routes } from '../../models';
import Protected from './components/Protected.tsx';
import Loading from './components/Loading.tsx';

const AuthPage = React.lazy(() => import('../auth-page/AuthPage.tsx'));
const ProfilePage = React.lazy(() => import('../profile-page/components/ProfilePage.tsx'));

const TestHome: React.FC = () => {
  return (
    <>
      <h1>Test Home</h1>
      <Link to={routes.LOGIN}>Go to sign in</Link>
      <br />
      <Link to={routes.PROFILE}>Go to profile</Link>
    </>
  );
};

const AppNavigation: React.FC = () => {
  return (
    <React.Suspense fallback={<Loading />}>
      <Routes>
        <Route path={routes.HOME} element={<TestHome />} />
        <Route
          path={routes.PROFILE}
          element={
            <Protected>
              <ProfilePage />
            </Protected>
          }
        />
        <Route path={routes.LOGIN} element={<AuthPage />} />
        <Route path={routes.REGISTER} element={<AuthPage />} />
      </Routes>
    </React.Suspense>
  );
};

export default AppNavigation;
