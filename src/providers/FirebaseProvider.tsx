import React, { createContext, useState, useCallback, useMemo, useEffect } from 'react';
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { FirebaseError } from '@firebase/util';
import { useNavigate, useLocation } from 'react-router-dom';
import { auth } from '../configs/firebase';
import { User, AuthError, IFirebaseContext } from '../types';

type FirebaseProviderProps = {
  children: React.ReactNode;
};

export const FirebaseContext = createContext<IFirebaseContext>({} as IFirebaseContext);

const initError = { code: 0, message: '' };

export const FirebaseProvider: React.FC<FirebaseProviderProps> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<AuthError>(initError);
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setError(initError);
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
      navigate('/profile');
    } catch (error: unknown) {
      setLoading(false);
      if (error instanceof FirebaseError) {
        setError({ code: error.code, message: error.message });
      }
    }
  }, []);

  const register = useCallback(async (email: string, password: string, displayName: string) => {
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await updateUser(auth.currentUser, { displayName });
      setLoading(false);
      setUser(getCurrentUser());
      navigate('/profile');
    } catch (error: unknown) {
      setLoading(false);
      if (error instanceof FirebaseError) {
        setError({ code: error.code, message: error.message });
      }
    }
  }, []);

  const updateUser = async (currentUser: any, details: object) => {
    try {
      await updateProfile(currentUser, details);
    } catch (error) {
      if (error instanceof FirebaseError) {
        setError({ code: error.code, message: error.message });
      }
    }
  };

  const logout = useCallback(async (): Promise<void> => {
    try {
      await signOut(auth);
      setUser(null);
      navigate('/login');
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        setError({ code: error.code, message: error.message });
      }
    }
  }, []);

  const getCurrentUser = (): User | null => {
    const user = auth.currentUser;
    if (user !== null) {
      return {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        emailVerified: user.emailVerified,
      } as User;
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
