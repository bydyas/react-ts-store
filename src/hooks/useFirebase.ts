import { useContext } from 'react';
import { FirebaseContext } from '../providers/FirebaseProvider.tsx';
import { IFirebaseContext } from '../models/index.ts';

export const useFirebase = () => {
  return useContext<IFirebaseContext>(FirebaseContext);
};
