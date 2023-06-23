import React, { createContext, useState, useCallback, useMemo, useEffect } from 'react';
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  createUserWithEmailAndPassword,
  updateProfile,
  User,
} from 'firebase/auth';
import { FirebaseError } from '@firebase/util';
import { useNavigate, useLocation } from 'react-router-dom';
import { auth } from '../configs/firebase';
import { TUser, IFirebaseContext } from '../models';
import { routes } from '../models';

type FirebaseProviderProps = {
  children: React.ReactNode;
};

export const FirebaseContext = createContext<IFirebaseContext>({} as IFirebaseContext);

export const FirebaseProvider: React.FC<FirebaseProviderProps> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [user, setUser] = useState<TUser | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setError('');
  }, [location.pathname]);

  useEffect((): void => {
    onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        setUser(getCurrentUser());
      } else {
        setUser(null);
      }
    });
  }, []);

  const login = useCallback(async (email: string, password: string): Promise<void> => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setLoading(false);
      setUser(getCurrentUser());
      navigate(routes.PROFILE);
    } catch (error: unknown) {
      setLoading(false);
      if (error instanceof FirebaseError) {
        console.log(error.code);
        setError(error.code);
      }
    }
  }, []);

  const register = useCallback(async (email: string, password: string, displayName: string) => {
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await updateUser({ displayName });
      setLoading(false);
      setUser(getCurrentUser());
      navigate(routes.PROFILE);
    } catch (error: unknown) {
      setLoading(false);
      if (error instanceof FirebaseError) {
        setError(error.code);
      }
    }
  }, []);

  const updateUser = async (details: object) => {
    try {
      await updateProfile(auth.currentUser as User, details);
    } catch (error) {
      if (error instanceof FirebaseError) {
        setError(error.code);
      }
    }
  };

  const logout = useCallback(async (): Promise<void> => {
    try {
      await signOut(auth);
      setUser(null);
      navigate(routes.LOGIN);
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        setError(error.code);
      }
    }
  }, []);

  const getCurrentUser = (): TUser | null => {
    const user = auth.currentUser;
    if (user !== null) {
      return {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        emailVerified: user.emailVerified,
      } as TUser;
    }
    return null;
  };

  const value: IFirebaseContext = useMemo(
    () => ({
      user,
      loading,
      error,
      login,
      logout,
      register,
    }),
    [user, error, loading, login, logout],
  );

  return <FirebaseContext.Provider value={value}>{children}</FirebaseContext.Provider>;
};
