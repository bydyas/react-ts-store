import React from 'react';
import { Outlet } from 'react-router-dom';

import { Wrapper } from '../../ui/Wrapper';
import Header from './components/Header/Header';
import Footer from './components/Footer';
import { styled } from '@mui/material';

const App = styled('div')({
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
});

const Layout: React.FC = () => {
  return (
    <App>
      <Header />
      <main style={{ flexGrow: 1 }}>
        <Wrapper>
          <Outlet />
        </Wrapper>
      </main>
      <Footer />
    </App>
  );
};

export default Layout;
