import React from 'react';
import { Navigate } from 'react-router-dom';
import { useFirebase } from '../../auth/hooks/useFirebase';
import { routes } from '../models';

type ProtectedProps = {
  children: React.ReactNode;
};

const Protected: React.FC<ProtectedProps> = ({ children }) => {
  const { user } = useFirebase();

  if (!user) {
    return <Navigate to={routes.LOGIN} replace />;
  }

  return children;
};
export default Protected;
