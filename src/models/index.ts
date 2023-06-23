import { TypeOf } from 'zod';
import { authSchema } from '../validation/authSchema';

export enum routes {
  HOME = '/',
  PROFILE = '/profile',
  LOGIN = '/sign-in',
  REGISTER = '/sign-up',
}

export type TUser = {
  uid: string;
  displayName: string;
  email: string;
  photoURL: string;
};

export interface IFirebaseContext {
  user?: TUser | null;
  loading: boolean;
  error?: string;
  login: (email: string, password: string) => void;
  register: (email: string, password: string, displayNamename: string) => void;
  logout: () => void;
}

export type FormProps = {
  onAuth: (credentials: FormInputs) => void;
  pathname: string;
  error?: string;
  loading: boolean;
  showFull: boolean;
  btnLabel: 'sign in' | 'sign up';
  hintLabel: "Don't have an account? Sign Up" | 'Already have an account? Sign in';
  hintPath: routes;
};

export type FormInputs = TypeOf<typeof authSchema>;
