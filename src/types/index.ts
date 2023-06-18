export type User = {
  uid: string;
  displayName: string;
  email: string;
  photoURL: string;
};

export type AuthError = {
  code: number | string;
  message: string;
};

export interface IFirebaseContext {
  user?: User | null;
  loading: boolean;
  error?: AuthError;
  login: (email: string, password: string) => void;
  register: (email: string, password: string, displayNamename: string) => void;
  logout: () => void;
}
