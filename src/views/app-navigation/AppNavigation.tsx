import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { routes } from '../../models';
import Protected from './components/Protected.tsx';
import Loading from './components/Loading.tsx';
import Layout from '../layout/Layout.tsx';

import ProductsPage from '../products-page/ProductsPage.tsx';
import CartPage from '../cart-page/CartPage.tsx';
import ContactPage from '../contact-page/ContactPage.tsx';

const AuthPage = React.lazy(() => import('../auth-page/AuthPage.tsx'));
const ProfilePage = React.lazy(() => import('../profile-page/components/ProfilePage.tsx'));

const TestHome: React.FC = () => {
  return <h2>Home</h2>;
};

const AppNavigation: React.FC = () => {
  return (
    <React.Suspense fallback={<Loading />}>
      <Routes>
        <Route element={<Layout />}>
          <Route path={routes.HOME} element={<TestHome />} />
          <Route path={routes.PRDOUCTS} element={<ProductsPage />} />
          <Route path={routes.CONTACTS} element={<ContactPage />} />
          <Route path={routes.CART} element={<CartPage />} />
          <Route
            path={routes.PROFILE}
            element={
              <Protected>
                <ProfilePage />
              </Protected>
            }
          />
        </Route>
        <Route path={routes.LOGIN} element={<AuthPage />} />
        <Route path={routes.REGISTER} element={<AuthPage />} />
      </Routes>
    </React.Suspense>
  );
};

export default AppNavigation;
