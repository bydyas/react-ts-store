import React, { createContext, useState, useCallback, useMemo, useEffect } from 'react';
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import { FirebaseError } from '@firebase/util';
import { auth } from '../configs/firebase';
import { User, AuthError, IFirebaseContext } from '../types';

type FirebaseProviderProps = {
  children: React.ReactNode;
};

export const FirebaseContext = createContext<IFirebaseContext>({} as IFirebaseContext);

export const FirebaseProvider: React.FC<FirebaseProviderProps> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<AuthError>({ code: 0, message: '' });
  const [user, setUser] = useState<User | null>(null);

  useEffect((): void => {
    onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        setUser(getCurrentUser());
      } else {
        setUser(null);
      }
    });
  }, []);

  // const login = useCallback(async (email: string, password: string): Promise<void> => {
  //   setLoading(true);
  //   try {
  //     await signInWithEmailAndPassword(auth, email, password);
  //     setLoading(false);
  //     setUser(getCurrentUser());
  //   } catch (error: unknown) {
  //     setLoading(false);
  //     if (error instanceof FirebaseError) {
  //       setError({ code: error.code, message: error.message });
  //     }
  //   }
  // }, []);

  const login = useCallback((email: string, password: string) => {
    setLoading(true);

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        setLoading(false);
        setUser(getCurrentUser());
      })
      .catch((error) => {
        setLoading(false);
        if (error instanceof FirebaseError) {
          setError({ code: error.code, message: error.message });
        }
      });
  }, []);

  // const logout = useCallback(async (): Promise<void> => {
  //   try {
  //     await signOut(auth);
  //     setUser(null);
  //   } catch (error: unknown) {
  //     if (error instanceof FirebaseError) {
  //       setError({ code: error.code, message: error.message });
  //     }
  //   }
  // }, []);

  const logout = useCallback(() => {
    signOut(auth)
      .then(() => setUser(null))
      .catch((error) => {
        if (error instanceof FirebaseError) {
          setError({ code: error.code, message: error.message });
        }
      });
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
    }),
    [user, error, loading, login, logout],
  );

  return <FirebaseContext.Provider value={value}>{children}</FirebaseContext.Provider>;
};
