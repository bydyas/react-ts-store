import { useContext } from 'react';
import { FirebaseContext } from '../providers/FirebaseProvider.tsx';
import { IFirebaseContext } from '../types';

export const useFirebase = () => {
  return useContext<IFirebaseContext>(FirebaseContext);
};
